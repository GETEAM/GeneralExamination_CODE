<?php

namespace GE\SystemManageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use GE\SystemManageBundle\Entity\ExaminationRoom;
use GE\SystemManageBundle\Form\ExaminationRoomEditType;
use GE\SystemManageBundle\Form\ExaminationRoomNewType;

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
     * @Template("GESystemManageBundle:ExaminationRoom:index.html.twig")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $examinationrooms = $em->getRepository('GESystemManageBundle:ExaminationRoom')->findAll();

        return array(
            'examinationrooms' => $examinationrooms,
        );
    }

    /**
     * 添加考场信息.
     *
     * @Route("/new", name="examinationroom_new")
     * @Method("GET")
     * @Template("GESystemManageBundle:ExaminationRoom:new.html.twig")
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
            $em->getRepository('GESystemManageBundle:ExaminationRoom')->add($examinationroom);

            return $this->redirect($this->generateUrl('examinationroom_show', array(
                'id' => $examinationroom->getId()
            )));
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
     * @Template("GESystemManageBundle:ExaminationRoom:show.html.twig")
     */
    public function showAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $examinationroom = $em->getRepository('GESystemManageBundle:ExaminationRoom')->find($id);

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
     * @Template("GESystemManageBundle:ExaminationRoom:edit.html.twig")
     */
     public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $examinationroom = $em->getRepository('GESystemManageBundle:ExaminationRoom')->find($id);

        $edit_form = $this->createForm(new ExaminationRoomEditType(), $examinationroom, array(
            'action' => $this->generateUrl('examinationroom_edit', array('id' => $id ) ),
            'method' => 'GET'
        ));
        
        $edit_form->handleRequest($request);

        if ($edit_form->isValid()) {

            $em = $this->getDoctrine()->getManager();
            $em->getRepository('GESystemManageBundle:ExaminationRoom')->add($examinationroom);

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
        $em->getRepository('GESystemManageBundle:ExaminationRoom')->delete($id);

        return $this->redirect($this->generateUrl('examinationroom_index'));
    }
}
