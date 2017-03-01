<?php

namespace PaperManageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use PaperManageBundle\Entity\Question;
use PaperManageBundle\Entity\QuestionType;
use PaperManageBundle\Form\QuestionNewType;
use PaperManageBundle\Form\QuestionEditType;

/**
 * Question controller.
 *
 * @Route("/manage/question")
 */
class QuestionController extends Controller
{

    /**
     * 试题列表
     *
     * @Route("/", name="question_index")
     * @Method("GET")
     * @Template("PaperManageBundle:Question:index.html.twig")
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $allquestions = $em->getRepository('PaperManageBundle:Question')->findAll();

        $paginator = $this->get('knp_paginator');
        $questions = $paginator->paginate($allquestions, $request->query->getInt('page', 1));

        return array(
            'questions' => $questions,
        );
    }

    /**
     * 添加题型
     *
     * @Route("/new", name="question_new")
     * @Method({"GET","POST"})
     * @Template("PaperManageBundle:Question:new.html.twig")
     */
    public function newAction(Request $request)
    {

        //第一步是想把类型列表加载出来
        $em = $this->getDoctrine()->getManager();
        $question_types = $em->getRepository('PaperManageBundle:QuestionType')->findAll();



        $question = new Question();
        $new_form = $this->createForm(new QuestionNewType(), $question, array(
            'action' => $this->generateUrl('question_new'),
            'method' => 'POST',
        ));
        
        $new_form->handleRequest($request);
        if ($new_form->isValid()) {
            //添加成功跳转到列表页面，不成功跳转到本页面

            try{
                $em = $this->getDoctrine()->getManager();
                $question->setCreateTime(new \DateTime('today'));//创建时间和
                
                $em->persist($question);
                $em->flush();
                return $this->redirect($this->generateUrl('question_index'));
                
            } catch(\Exception $e){
                $this->addFlash('error', 'HHHH网络原因或数据库故障，添加失败. 请重新尝试添加！');
                //print_r($e);
                return $this->redirect($this->generateUrl('question_new'));
            }
        }

        return array(
            'question_types' => $question_types,
            'new_form'   => $new_form->createView(),
        );
    }

     /**
     * 显示试题信息.
     *
     * @Route("/show/{id}", name="question_show")
     * @Template("PaperManageBundle:Question:show.html.twig")
     */
    public function showAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $question = $em->getRepository('PaperManageBundle:Question')->find($id);

        //调试错误提示
        if (!$question) {
            throw $this->createNotFoundException('Unable to find Student entity.');
        }
        
        return array(
            'question' => $question
        );
    }

    /**
     * Edits an existing Question entity.
     *
     * @Route("/{id}", name="question_edit")
     * @Method("PUT")
     * @Template("PaperManageBundle:Question:edit.html.twig")
     */
    public function editAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $question_type = $em->getRepository('PaperManageBundle:Question')->find($id);


        $edit_form = $this->createForm(new QuestionEditType(), $question_type, array(
            'action' => $this->generateUrl('question_edit', array(
                'id' => $id
            )),
            'method' => 'GET'
        ));
        
        $edit_form->handleRequest($request);

        if ($edit_form->isValid()) {
            try{
                $em = $this->getDoctrine()->getManager();
                $success = $em->getRepository('PaperManageBundle:Question')->add($question);
                if($success){
                    $this->addFlash('success', $questionName->getQuestionName().'修改成功');
                }else{
                    $this->addFlash('error', '网络原因或数据库故障，修改失败. 请重新修改！');
                }
            } catch(\Exception $e){
                $this->addFlash('error', '网络原因或数据库故障，修改失败. 请重新修改！');
            }

            return $this->redirect($this->generateUrl('question_edit', array(
                'id' => $id
            )));
        }

        return array(
            'edit_form' => $edit_form->createView(),
            'id' => $question->getId()
        );
    }


    /**
     * 删除题型信息.
     *
     * @Route("/delete/{id}", name="question_delete")
     * @Method("GET")
     * @Template()
     */
    public function deleteAction(Request $request, $id)
    {
        try{
            $em = $this->getDoctrine()->getManager();
            $success = $em->getRepository('PaperManageBundle:Question')->delete($id);
            if($success){
                $this->addFlash('success', '试题删除成功!');
            }else{
                $this->addFlash('error', '网络原因或数据库故障，删除失败. 请重新删除！');
            }
        } catch(\Exception $e){
            $this->addFlash('error', '网络原因或数据库故障，删除失败. 请重新删除！');
        }

        return $this->redirect($this->generateUrl('question_index'));
    }


     /**
     * 批量删除题型信息.
     *
     * @Route("/multi-delete", name="question_multi_delete")
     * @Method("POST")
     */
    public function multiDeleteAction(Request $request)
    {
        $ids = $request->request->get('ids');
        
        try{
            $em = $this->getDoctrine()->getManager();
            $success = $em->getRepository('PaperManageBundle:Question')->multiDelete($ids);

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

    /**
     * 获取指定题型的JSON数据.
     *
     * @Route("/QTJSON/{id}", name="question_type_getJSON")
     * @Method("GET")
     * @Template()
     */
    public function QTJSONAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $question = $em->getRepository('PaperManageBundle:Question')->findById($id);

        $item = $question[0] -> getQuestionContent();

        $result = array(
            'item' => $item
        );
        
        $response = new Response(json_encode($result));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
  
}
