<?php

namespace UserBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use UserBundle\Entity\Manager;
use UserBundle\Form\ManagerNewType;
use UserBundle\Form\ManagerEditType;
use Ddeboer\DataImport\Workflow;
use Ddeboer\DataImport\Writer\DoctrineWriter;
use Ddeboer\DataImport\Filter;
use Ddeboer\DataImport\Reader\CsvReader;
use Ddeboer\DataImport\Reader\OneToManyReader;

/**
 * Manager controller.
 *
 * @Route("/manage/manager")
 */
class ManagerController extends Controller
{
    /**
     * 显示所有管理者.
     *
     * @Route("/", name="manager_index")
     * @Method("GET")
     * @Template("UserBundle:Manager:index.html.twig")
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $manager = $em->getRepository('UserBundle:Manager')->findAll();
        $paginator = $this->get('knp_paginator');
        $managers = $paginator->paginate($manager, $request->query->getInt('page', 1)); 
        
        return array(
            'managers' => $managers,
        );
    }

    /**
     * 添加管理者信息.
     *
     * @Route("/new", name="manager_new")
     * 
     * @Template("UserBundle:Manager:new.html.twig")
     */
    public function newAction(Request $request)
    {
        $manager = new Manager();

        $new_form = $this->createForm(new ManagerNewType(), $manager, array(
            'action' => $this->generateUrl('manager_new'),
            'method' => 'GET'
        ));
        
        $new_form->handleRequest($request);

        if ($new_form->isValid()) {
            //添加成功跳转到列表页面，不成功跳转到本页面
            try{
                $em = $this->getDoctrine()->getManager();
                $success = $em->getRepository('UserBundle:Manager')->add($manager);

                if($success){
                    $this->addFlash('success', $manager->getName().'添加成功');
                }else{
                    $this->addFlash('error', '网络原因或数据库故障，添加失败. 请重新尝试添加！');
                    return $this->redirect($this->generateUrl('manager_new'));
                }
                return $this->redirect($this->generateUrl('manager_index'));
                
            } catch(\Exception $e){
                $this->addFlash('error', '网络原因或数据库故障，添加失败. 请重新尝试添加！');
                return $this->redirect($this->generateUrl('manager_new'));
            }
        }

        //批量导入管理员信息
        $import_form = $this
                    ->createFormBuilder()
                    ->setMethod('POST')
                    ->setAction($this->generateUrl('manager_new'))
                    ->add('fileUrl', 'file', array(
                              'label' => '文件位置：',
                           ))
                    ->add('import', 'submit', array('label' => '导入'))
                     ->add('cancel', 'reset', array('label' => '取消'))
                    ->getForm();

        $import_form->handleRequest($request);

        if ($import_form->isValid()) {
            if(!is_dir("upload/import/manager_import")){
                mkdir("upload/import/manager_import");
            }
            $file=$import_form['fileUrl']->getData();
            $filename = explode(".", $file->getClientOriginalName());
            $extension = $filename[count($filename) - 1];
            $newefilename = $filename[0] . "_" . rand(1, 9999) . "." . $extension;

            $file->move("upload/import/manager_import", $newefilename);

            $upfile = new \SplFileObject("upload/import/manager_import/" . $newefilename);
            $csvReader = new CsvReader($upfile);

            $csvReader->setStrict(false)
                   ->setHeaderRowNumber(0)
                   ->setColumnHeaders(['username', 'name','email','telephone','roles' => 'FOS\UserBundle\Model\User','password']);

            $em = $this->getDoctrine()->getManager();
            $doctrineWriter = new DoctrineWriter($em, 'UserBundle:Manager');
            $doctrineWriter->disableTruncate();

            $workflow = new Workflow($csvReader);
            $workflow->addWriter($doctrineWriter)
                     ->process();
        }
        return array(
            'new_form' => $new_form->createView(),
            'import_form' => $import_form->createView()
        );        
    }

    /**
     * 显示管理者信息.
     *
     * @Route("/show/{id}", name="manager_show")
     * @Method("GET")
     * @Template("UserBundle:Manager:show.html.twig")
     */
    public function showAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $manager = $em->getRepository('UserBundle:Manager')->find($id);

        //调试错误提示
        // if (!$manager) {
        //     throw $this->createNotFoundException('Unable to find manager entity.');
        // }
        
        return array(
            'manager' => $manager,
        );
    }

    /**
     * 编辑管理者信息.
     *
     * @Route("/edit/{id}", name="manager_edit")
     * @Method("GET")
     * @Template("UserBundle:Manager:edit.html.twig")
     */
    public function editAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $manager = $em->getRepository('UserBundle:Manager')->find($id);

        $edit_form = $this->createForm(new ManagerEditType(), $manager, array(
            'action' => $this->generateUrl('manager_edit', array('id' => $id ) ),
            'method' => 'GET'
        ));
        
        $edit_form->handleRequest($request);

        if ($edit_form->isValid()) {
            try{
                $em = $this->getDoctrine()->getManager();
                $success = $em->getRepository('UserBundle:Manager')->add($manager);

                if($success){
                    $this->addFlash('success', $manager->getName().'修改成功');
                }else{
                    $this->addFlash('error', '网络原因或数据库故障，修改失败. 请重新修改！');
                }
            } catch(\Exception $e){
                $this->addFlash('error', '网络原因或数据库故障，修改失败. 请重新修改！');
            }

            return $this->redirect($this->generateUrl('manager_edit', array(
                'id' => $id
            )));
        }

        return array(
            'edit_form' => $edit_form->createView(),
        );
    }

    /**
     * 删除管理者信息.
     *
     * @Route("/delete/{id}", name="manager_delete")
     * @Method("GET")
     * @Template()
     */
    public function deleteAction(Request $request, $id)
    {
        try{
            $em = $this->getDoctrine()->getManager();
            $success = $em->getRepository('UserBundle:Manager')->delete($id);
            if($success){
                $this->addFlash('success', '删除成功!');
            }else{
                $this->addFlash('error', '网络原因或数据库故障，删除失败. 请重新删除！');
            }
        } catch(\Exception $e){
            $this->addFlash('error', '网络原因或数据库故障，删除失败. 请重新删除！');
        }

        return $this->redirect($this->generateUrl('manager_index'));
    }

    /**
     * 批量删除管理者信息.
     *
     * @Route("/multi-delete", name="manager_multi_delete")
     * @Method("POST")
     */
    public function multiDeleteAction(Request $request)
    {
        $ids = $request->request->get('ids');

        try{
            $em = $this->getDoctrine()->getManager();
            $success = $em->getRepository('UserBundle:Manager')->multiDelete($ids);

            if($success){
                $this->addFlash('success', '批量删除成功!');
            }else{
                $this->addFlash('error', '网络原因或数据库故障，批量删除失败!请重新删除！');
            }
        } catch(\Exception $e){
            $this->addFlash('error', '网络原因或数据库故障，批量删除失败!请重新删除！');
        }

        $result = array(
            'success' => $success
        );
        
        $response = new Response(json_encode($result));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

}
