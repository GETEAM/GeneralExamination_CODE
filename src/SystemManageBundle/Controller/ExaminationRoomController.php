<?php

namespace SystemManageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
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
        $examinationroom = $em->getRepository('SystemManageBundle:ExaminationRoom')->findAll();
        $paginator = $this->get('knp_paginator');
        $examinationrooms = $paginator->paginate($examinationroom, $request->query->getInt('page', 1));

        return array(
            'examinationrooms' => $examinationrooms,
        );
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
            //添加成功跳转到列表页面，不成功跳转到本页面
            try{
                $em = $this->getDoctrine()->getManager();
                $success = $em->getRepository('SystemManageBundle:ExaminationRoom')->add($examinationroom);
                if($success){
                    $this->addFlash('success', $examinationroom->getRoomName().'添加成功');
                }else{
                    $this->addFlash('error', '网络原因或数据库故障，添加失败. 请重新尝试添加！');
                    return $this->redirect($this->generateUrl('examinationroom_new'));
                }
                return $this->redirect($this->generateUrl('examinationroom_index'));
                
            } catch(\Exception $e){
                $this->addFlash('error', '网络原因或数据库故障，添加失败. 请重新尝试添加！');
                return $this->redirect($this->generateUrl('examinationroom_new'));
            } 
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

        //调试错误提示
        // if (!$examinationroom) {
        //     throw $this->createNotFoundException('Unable to find ExaminationRoom entity.');
        // }
        
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
            try{
                $em = $this->getDoctrine()->getManager();
                $success = $em->getRepository('SystemManageBundle:ExaminationRoom')->add($examinationroom);
                if($success){
                    $this->addFlash('success', $examinationroom->getRoomName().'修改成功');
                }else{
                    $this->addFlash('error', '网络原因或数据库故障，修改失败. 请重新修改！');
                }
            } catch(\Exception $e){
                $this->addFlash('error', '网络原因或数据库故障，修改失败. 请重新修改！');
            }

            return $this->redirect($this->generateUrl('examinationroom_edit', array(
                'id' => $id
            )));
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
        try{
            $em = $this->getDoctrine()->getManager();
            $success = $em->getRepository('SystemManageBundle:ExaminationRoom')->delete($id);
            if($success){
                $this->addFlash('success', '删除成功!');
            }else{
                $this->addFlash('error', '网络原因或数据库故障，删除失败. 请重新删除！');
            }
        } catch(\Exception $e){
            $this->addFlash('error', '网络原因或数据库故障，删除失败. 请重新删除！');
        }

        return $this->redirect($this->generateUrl('examinationroom_index'));
    }

    /**
     * 批量删除年级信息.
     *
     * @Route("/multi-delete", name="examinationroom_multi_delete")
     * @Method("POST")
     */
    public function multiDeleteAction(Request $request)
    {   
        $ids = $request->request->get('ids');

        try{
            $em = $this->getDoctrine()->getManager();
            $success = $em->getRepository('SystemManageBundle:ExaminationRoom')->multiDelete($ids);

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
