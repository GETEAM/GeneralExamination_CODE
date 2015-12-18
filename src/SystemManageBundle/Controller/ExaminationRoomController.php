<?php

namespace SystemManageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use SystemManageBundle\Entity\ExaminationRoom;
use SystemManageBundle\Form\ExaminationRoomEditType;
use SystemManageBundle\Form\ExaminationRoomNewType;

/**
 * 考场信息controller.
 *
 * @Route("/manage/examinationroom")
 */
class ExaminationRoomController extends Controller
{

    /**
     * 获取显示考场信息列表.
     *
     * @Route("/", name="examinationroom_index")
     * @Method("GET")
     * @Template("SystemManageBundle:ExaminationRoom:index.html.twig")
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
<<<<<<< HEAD:src/GE/SystemManageBundle/Controller/ExaminationRoomController.php
        $examinationroom = $em->getRepository('GESystemManageBundle:ExaminationRoom')->findAll();
        $paginator = $this->get('knp_paginator');
        $examinationrooms = $paginator->paginate($examinationroom, $request->query->getInt('page', 1));
        return $this->render('GESystemManageBundle:ExaminationRoom:index.html.twig', [
        'examinationrooms' => $examinationrooms,
    ]);
=======

        $examinationrooms = $em->getRepository('SystemManageBundle:ExaminationRoom')->findAll();

        return array(
            'examinationrooms' => $examinationrooms,
        );
>>>>>>> c6b639e65dc4ee10760fb0d7bff2b82ea8b86a0f:src/SystemManageBundle/Controller/ExaminationRoomController.php
    }
    /**
     * 添加考场信息.
     *
     * @Route("/new", name="examinationroom_new")
     * @Method("GET")
     * @Template("SystemManageBundle:ExaminationRoom:new.html.twig")
     */
    public function newAction(Request $request)
    {
        $examinationroom = new ExaminationRoom();

        $new_form = $this->createForm(new ExaminationRoomNewType(), $examinationroom, array(
            'action' => $this->generateUrl('examinationroom_new'),
            'method' => 'GET'
        ));
        
        $new_form->handleRequest($request);

        if ($new_form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->getRepository('SystemManageBundle:ExaminationRoom')->add($examinationroom);

            return $this->redirect($this->generateUrl('examinationroom_index'));
        }

        return array(
            'new_form' => $new_form->createView()
        );
    }

    /**
     * 显示考场信息.
     *
     * @Route("/show/{id}", name="examinationroom_show")
     * @Method("GET")
     * @Template("SystemManageBundle:ExaminationRoom:show.html.twig")
     */
    public function showAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $examinationroom = $em->getRepository('SystemManageBundle:ExaminationRoom')->find($id);

        if (!$examinationroom) {
            throw $this->createNotFoundException('Unable to find ExaminationRoom entity.');
        }
        return array(
            'examinationroom' => $examinationroom
        );
    }

    /**
     * 编辑考场信息.
     *
     * @Route("/edit/{id}", name="examinationroom_edit")
     * @Method("GET")
     * @Template("SystemManageBundle:ExaminationRoom:edit.html.twig")
     */
     public function editAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $examinationroom = $em->getRepository('SystemManageBundle:ExaminationRoom')->find($id);

        $edit_form = $this->createForm(new ExaminationRoomEditType(), $examinationroom, array(
            'action' => $this->generateUrl('examinationroom_edit', array('id' => $id ) ),
            'method' => 'GET'
        ));
        
        $edit_form->handleRequest($request);

        if ($edit_form->isValid()) {

            $em = $this->getDoctrine()->getManager();
            $em->getRepository('SystemManageBundle:ExaminationRoom')->add($examinationroom);

            return $this->redirect($this->generateUrl('examinationroom_index'));
        }

        return array(
            'edit_form' => $edit_form->createView(),
        );
    }  
    /**
     * 删除考场信息.
     *
     * @Route("/delete/{id}", name="examinationroom_delete")
     * @Method("GET")
     */
    public function deleteAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $em->getRepository('SystemManageBundle:ExaminationRoom')->delete($id);

        return $this->redirect($this->generateUrl('examinationroom_index'));
    }
}
