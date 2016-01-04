<?php

namespace PaperManageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use PaperManageBundle\Entity\QuestionType;
use PaperManageBundle\Form\QuestionTypeNewType;

/**
 * 题型 controller.
 *
 * @Route("/manage/question_type")
 */
class QuestionTypeController extends Controller
{
    /**
     * 显示试题类型列表.
     *
     * @Route("/", name="question_type_index")
     * @Method("GET")
     * @Template("PaperManageBundle:QuestionType:index.html.twig")
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $question_type = $em->getRepository('PaperManageBundle:QuestionType')->findAll();
        $paginator = $this->get('knp_paginator');
        $question_types = $paginator->paginate($question_type, $request->query->getInt('page', 1));

        return array(
            'question_types' => $question_types
        );
    }

    /**
     * 添加题型信息.
     *
     * @Route("/new", name="question_type_new")
     * 
     * @Template("PaperManageBundle:QuestionType:new.html.twig")
     */
    public function newAction(Request $request)
    {
        $question_type = new QuestionType();

        $new_form = $this->createForm(new QuestionTypeNewType(), $question_type, array(
            'action' => $this->generateUrl('question_type_new'),
            'method' => 'GET'
        ));
        
        $new_form->handleRequest($request);

        if ($new_form->isValid()) {
            //添加成功跳转到列表页面，不成功跳转到本页面
            try{
                $em = $this->getDoctrine()->getManager();
                $success = $em->getRepository('PaperManageBundle:QuestionType')->add($question_type);
                
                if($success){
                    $this->addFlash('success', $question_type->getNameEn().'('.$question_type->getNameCh().')'.'添加成功');
                }else{
                    $this->addFlash('error', '网络原因或数据库故障，添加失败. 请重新尝试添111加！');
                    return $this->redirect($this->generateUrl('question_type_new'));
                }
                return $this->redirect($this->generateUrl('question_type_index'));
                
            } catch(\Exception $e){
                $this->addFlash('error', '网络原因或数据库故障，添加失败. 请重新尝试添加！');
                return $this->redirect($this->generateUrl('question_type_new'));
            }
        }

        return array(
            'new_form' => $new_form->createView()
        );
    }

    /**
     * 可编辑div.
     *
     * @Route("/editable", name="question_type_editable")
     * @Template("PaperManageBundle:QuestionType:editable.html.twig")
     */
    public function editableAction(Request $request)
    {
        //测试富文本
        $import_form = $this->createFormBuilder()
                            ->setMethod('POST')
                            ->setAction($this->generateUrl('upload_image'))
                            ->add('fileUrl', 'file', array(
                                    'label' => '文件位置：'
                                ))
                            ->getForm();

        $import_form->handleRequest($request);
          
        return array(
            'upload_form' => $import_form->createView()
        );
    }



    /**
     * 显示题型信息.
     *
     * @Route("/show/{id}", name="question_type_show")
     * @Method("GET")
     * @Template("PaperManageBundle:QuestionType:show.html.twig")
     */
    public function showAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $question_type = $em->getRepository('PaperManageBundle:QuestionType')->find($id);

        //调试错误提示
        // if (!$question_type) {
        //     // throw $this->createNotFoundException('Unable to find Student entity.');
        // }
        
        return array(
            'student' => $question_type
        );
    }

    /**
     * 编辑题型信息.
     *
     * @Route("/edit/{id}", name="question_type_edit")
     * @Method("GET")
     * @Template("PaperManageBundle:QuestionType:edit.html.twig")
     */
    public function editAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $question_type = $em->getRepository('PaperManageBundle:QuestionType')->find($id);

        $edit_form = $this->createForm(new StudentEditType($this->getDoctrine()), $question_type, array(
            'action' => $this->generateUrl('question_type_edit', array('id' => $id ) ),
            'method' => 'GET'
        ));
        
        $edit_form->handleRequest($request);

        if ($edit_form->isValid()) {
            try{
                $em = $this->getDoctrine()->getManager();
                $success = $em->getRepository('PaperManageBundle:QuestionType')->add($question_type);
                if($success){
                    $this->addFlash('success', $question_type->getName().'修改成功');
                }else{
                    $this->addFlash('error', '网络原因或数据库故障，修改失败. 请重新修改！');
                }
            } catch(\Exception $e){
                $this->addFlash('error', '网络原因或数据库故障，修改失败. 请重新修改！');
            }

            return $this->redirect($this->generateUrl('question_type_edit', array(
                'id' => $id
            )));
        }

        return array(
            'edit_form' => $edit_form->createView(),
        );
    }

    /**
     * 删除题型信息.
     *
     * @Route("/delete/{id}", name="question_type_delete")
     * @Method("GET")
     * @Template()
     */
    public function deleteAction(Request $request, $id)
    {
        try{
            $em = $this->getDoctrine()->getManager();
            $success = $em->getRepository('PaperManageBundle:QuestionType')->delete($id);
            if($success){
                $this->addFlash('success', '删除成功!');
            }else{
                $this->addFlash('error', '网络原因或数据库故障，删除失败. 请重新删除！');
            }
        } catch(\Exception $e){
            $this->addFlash('error', '网络原因或数据库故障，删除失败. 请重新删除！');
        }

        return $this->redirect($this->generateUrl('question_type_index'));
    }

    /**
     * 批量删除题型信息.
     *
     * @Route("/multi-delete", name="question_type_multi_delete")
     * @Method("POST")
     */
    public function multiDeleteAction(Request $request)
    {
        $ids = $request->request->get('ids');
        
        try{
            $em = $this->getDoctrine()->getManager();
            $success = $em->getRepository('PaperManageBundle:QuestionType')->multiDelete($ids);

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