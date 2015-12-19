<?php

namespace SystemManageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use SystemManageBundle\Entity\Grade;
use SystemManageBundle\Form\GradeNewType;
use SystemManageBundle\Form\GradeEditType;

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
        return $this->render('SystemManageBundle:Grade:index.html.twig', [
        'grades' => $grades,
    ]);
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
            $em = $this->getDoctrine()->getManager();
            $em->getRepository('SystemManageBundle:Grade')->add($grade);

            $this->addFlash(
                'success',
                $grade->getDescription().'添加成功'
            );

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
            throw $this->createNotFoundException('Unable to find grade entity.');
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

            $em = $this->getDoctrine()->getManager();
            $em->getRepository('SystemManageBundle:Grade')->add($grade);

            $this->addFlash('success','年级信息修改成功');

            return $this->redirect($this->generateUrl('grade_index'));
        }

        return array(
            'edit_form' => $edit_form->createView()
        );
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
                $this->addFlash('error', '网络原因或数据库故障，删除失败');
            }
        } catch(\Exception $e){
            $this->addFlash('error', '网络原因或数据库故障，删除失败');
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
            $this->addFlash('error', '批量删除失败!');
        }

        $result = array(
            'success' => $success
        );
        
        $response = new Response(json_encode($result));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}
