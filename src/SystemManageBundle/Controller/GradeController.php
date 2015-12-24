<?php

namespace SystemManageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use SystemManageBundle\Entity\Grade;
use SystemManageBundle\Entity\Document;
use SystemManageBundle\Form\GradeNewType;
use SystemManageBundle\Form\GradeEditType;
use Ddeboer\DataImport\Workflow;
use Ddeboer\DataImport\Writer\DoctrineWriter;
use Ddeboer\DataImport\Filter;
use Ddeboer\DataImport\Reader\CsvReader;

/**
 * 年级信息管理Controller.
 *
 * @Route("/manage/grade")
 */
class GradeController extends Controller
{

    /**
     * 获取并显示年级信息列表.
     *
     * @Route("/", name="grade_index")
     * @Method("GET")
     * @Template("SystemManageBundle:Grade:index.html.twig")
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $grade = $em->getRepository('SystemManageBundle:Grade')->findAll();
        $paginator = $this->get('knp_paginator');
        $grades = $paginator->paginate($grade, $request->query->getInt('page', 1));
        
        return array(
            'grades' => $grades,
        );
    }

    /**
     * 添加年级信息.
     *
     * @Route("/new", name="grade_new")
     * @Method("GET")
     * @Template("SystemManageBundle:Grade:new.html.twig")
     */
    public function newAction(Request $request)
    {
        $grade = new Grade();

        $new_form = $this->createForm(new GradeNewType(), $grade, array(
            'action' => $this->generateUrl('grade_new'),
            'method' => 'GET'
        ));
        
        $new_form->handleRequest($request);

        if ($new_form->isValid()) {
            try{
                $em = $this->getDoctrine()->getManager();
                $success = $em->getRepository('SystemManageBundle:Grade')->add($grade);
                if($success){
                    $this->addFlash('success', $grade->getDescription().'添加成功');
                }else{
                    $this->addFlash('error', '网络原因或数据库故障，添加失败. 请重新添加！');
                }
            } catch(\Exception $e){
                $this->addFlash('error', '网络原因或数据库故障，添加失败. 请重新添加！');
            }

            return $this->redirect($this->generateUrl('grade_index'));
        }

        return array(
            'new_form' => $new_form->createView()
        );
    }

    /**
     * 显示年级信息.
     *
     * @Route("/show/{id}", name="grade_show")
     * @Method("GET")
     * @Template("SystemManageBundle:Grade:show.html.twig")
     */
    public function showAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $grade = $em->getRepository('SystemManageBundle:Grade')->find($id);

        if (!$grade) {
            throw $this->createNotFoundException('没有找到指定年级信息.');
        }
        
        return array(
            'grade' => $grade
        );
    }

    /**
     * 编辑年级信息.
     *
     * @Route("/edit/{id}", name="grade_edit")
     * @Method("GET")
     * @Template("SystemManageBundle:Grade:edit.html.twig")
     */
    public function editAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $grade = $em->getRepository('SystemManageBundle:Grade')->find($id);

        $edit_form = $this->createForm(new GradeEditType(), $grade, array(
            'action' => $this->generateUrl('grade_edit', array('id' => $id ) ),
            'method' => 'GET'
        ));
        
        $edit_form->handleRequest($request);

        if ($edit_form->isValid()) {
            try{
                $em = $this->getDoctrine()->getManager();
                $success = $em->getRepository('SystemManageBundle:Grade')->add($grade);
                if($success){
                    $this->addFlash('success', '年级信息修改成功!');
                }else{
                    $this->addFlash('error', '网络原因或数据库故障，修改失败. 请重新修改！');
                }
            } catch(\Exception $e){
                $this->addFlash('error', '网络原因或数据库故障，修改失败. 请重新修改！');
            }

            return $this->redirect($this->generateUrl('grade_index'));
        }

        return array(
            'edit_form' => $edit_form->createView()
        );
    }
    /**
     * 批量导入年级信息.
     *
     * @Route("/import", name="grade_import")
     *
     * @Template()
     */
    public function importAction(Request $request)
    {   
        $form = $this->createFormBuilder()
        ->setMethod('POST')
        ->setAction($this->generateUrl('grade_import'))
        ->add('fileUrl', 'file', array(
                'label' => '文件位置：',
            ))
        ->add('import', 'submit', array('label' => '导入'))
        ->add('cancel', 'reset', array('label' => '取消'))
        ->getForm();
       
       $form->handleRequest($request);
        if ($form->isValid()) 
        {
            //导入学生文件
            if(!is_dir("grade_import")){
                mkdir("grade_import");
            }
            //获取文件框到内容
            $file=$form['fileUrl']->getData();
            //将原文档到文件名以“.”分割
            $filename = explode(".", $file->getClientOriginalName());
            //获取原文档到扩展名
            $extension = $filename[count($filename) - 1];
            //构造新到文件名
            $newefilename = $filename[0] . "_" . rand(1, 9999) . "." . $extension;
        
            $file->move("grade_import", $newefilename);

            $upfile = new \SplFileObject("grade_import/" . $newefilename);
            $csvReader = new CsvReader($upfile);

            $csvReader->setStrict(false)
                   ->setHeaderRowNumber(0)
                   ->setColumnHeaders(['grade', 'description']);

            $em = $this->getDoctrine()->getManager();
            $doctrineWriter = new DoctrineWriter($em, 'SystemManageBundle:Grade');
            $doctrineWriter->disableTruncate();

            $workflow = new Workflow($csvReader);
            $workflow->addWriter($doctrineWriter)
                     ->process();
        }
        return array('form' => $form->createView());
    }

    /**
     * 删除年级信息.
     *
     * @Route("/delete/{id}", name="grade_delete")
     * @Method("GET")
     */
    public function deleteAction(Request $request, $id)
    {
        try{
            $em = $this->getDoctrine()->getManager();
            $success = $em->getRepository('SystemManageBundle:Grade')->delete($id);
            if($success){
                $this->addFlash('success', '删除成功!');
            }else{
                $this->addFlash('error', '网络原因或数据库故障，删除失败. 请重新删除！');
            }
        } catch(\Exception $e){
            $this->addFlash('error', '网络原因或数据库故障，删除失败. 请重新删除！');
        }

        return $this->redirect($this->generateUrl('grade_index'));
    }

    /**
     * 批量删除年级信息.
     *
     * @Route("/multi-delete", name="grade_multi_delete")
     * @Method("POST")
     */
    public function multiDeleteAction(Request $request)
    {   
        $ids = $request->request->get('ids');
        
        $em = $this->getDoctrine()->getManager();
        $success = $em->getRepository('SystemManageBundle:Grade')->multiDelete($ids);

        if($success){
            $this->addFlash('success', '批量删除成功!');
        }else{
            $this->addFlash('error', '批量删除失败!请重新删除！');
        }

        $result = array(
            'success' => $success
        );
        
        $response = new Response(json_encode($result));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}
