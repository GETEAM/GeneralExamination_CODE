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
     * @Method("GET")
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
                $success = $em->getRepository('PaperManageBundle:Question')->add($question);
                
                if($success){
                    $this->addFlash('success', $questionName->getQuestionName().'添加成功');
                }else{
                    $this->addFlash('error', '网络原因或数据库故障，添加失败. 请重新尝试添加！');
                    return $this->redirect($this->generateUrl('question_new'));
                }
                return $this->redirect($this->generateUrl('question_index'));
                
            } catch(\Exception $e){
                $this->addFlash('error', '网络原因或数据库故障，添加失败. 请重新尝试添加！');
                return $this->redirect($this->generateUrl('question_new'));
            }
        }

        return array(
            'question_types' => $question_types,
            'new_form'   => $new_form->createView(),
        );
    }

    /**
     * Finds and displays a Question entity.
     *
     * @Route("/{id}", name="question_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('PaperManageBundle:Question')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Question entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
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
     * Deletes a Question entity.
     *
     * @Route("/{id}", name="manage_question_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('PaperManageBundle:Question')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Question entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('manage_question'));
    }

    /**
     * Creates a form to delete a Question entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('manage_question_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm()
        ;
    }
}
