<?php

namespace PaperManageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use PaperManageBundle\Entity\Paper;
use PaperManageBundle\Form\PaperNewType;
use PaperManageBundle\Form\PaperEditType;
use PaperManageBundle\Entity\Question;
use PaperManageBundle\Entity\QuestionType;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Paper controller.
 *
 * @Route("/manage/paper")
 */
class PaperController extends Controller
{

    /**
     * 试卷列表.
     *
     * @Route("/", name="paper_index")
     * @Method("GET")
     * @Template("PaperManageBundle:Paper:index.html.twig")
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $allpaper = $em->getRepository('PaperManageBundle:Paper')->findAll();

        $paginator = $this->get('knp_paginator');
        $papers = $paginator->paginate($allpaper, $request->query->getInt('page', 1));

        return array(
            'papers' => $papers,
        );
    }


     /**
     * 添加试卷，即手动组卷
     *
     * @Route("/new", name="paper_new")
     * @Method({"GET","POST"})
     * @Template("PaperManageBundle:Paper:new.html.twig")
     */
    public function newAction(Request $request)
    {

        $paper = new Paper();
        $new_form = $this->createForm(new PaperNewType(), $paper, array(
            'action' => $this->generateUrl('paper_new'),
            'method' => 'POST',
        ));
        
        $new_form->handleRequest($request);
        if ($new_form->isValid()) {
            //添加成功跳转到列表页面，不成功跳转到本页面
            try{
                $em = $this->getDoctrine()->getManager();
                $paper->setCreateTime(new \DateTime('today'));//创建时间和
                $em->persist($paper);
                $em->flush();
                return $this->redirect($this->generateUrl('paper_index'));
                
            } catch(\Exception $e){
                $this->addFlash('error', '网络原因或数据库故障，添加失败. 请重新尝试添加！');
                //print_r($e);
                return $this->redirect($this->generateUrl('paper_new'));
            }
        }

        return array(
            'new_form'   => $new_form->createView(),
        );
    }
    /**
     * 查找question列表
     *
     * @Route("/questionGet", name="questionGet")
     * @Method({"GET", "POST"})
     */
    public function questionGetAction()
    {
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery(
            'SELECT q.id, qt.nameCh, q.questionName,q.questionContent,q.score,q.usageCounter,q.createTime,q.questionDuration,qt.shuffle,qt.flowable
        FROM PaperManageBundle:Question q
        LEFT JOIN q.questionType qt'
        );
        $questionList = $query->getArrayResult();
        return new JsonResponse(json_encode($questionList,true));
    }

    /**
     * 试卷查找预览
     *
     * @Route("/{id}", name="paper_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $paper = $em->getRepository('PaperManageBundle:Paper')->find($id);

        if (!$paper) {
            throw $this->createNotFoundException('Unable to find Paper paper.');
        }

        return array(
            'paper'      => $paper,
        );
    }

    /**
     * 试卷编辑.
     *
     * @Route("/edit/{id}", name="paper_edit")
     * @Method("GET")
     * @Template("PaperManageBundle:Paper:edit.html.twig")
     */
    public function editAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $paper = $em->getRepository('PaperManageBundle:Paper')->find($id);


        $edit_form = $this->createForm(new PaperEditType(), $paper, array(
            'action' => $this->generateUrl('paper_edit', array(
                'id' => $id
            )),
            'method' => 'GET'
        ));
        
        $edit_form->handleRequest($request);

        if ($edit_form->isValid()) {
            try{
                $em = $this->getDoctrine()->getManager();
                $success = $em->getRepository('PaperManageBundle:Paper')->add($paper);
                if($success){
                    $this->addFlash('success', $paper->getName().'修改成功');
                }else{
                    $this->addFlash('error', '网络原因或数据库故障，修改失败. 请重新修改！');
                }
            } catch(\Exception $e){
                $this->addFlash('error', '网络原因或数据库故障，修改失败. 请重新修改！');
            }

            return $this->redirect($this->generateUrl('paper_edit', array(
                'id' => $id
            )));
        }

        return array(
            'edit_form' => $edit_form->createView(),
            'id' => $paper->getId()
        );
    }
     /**
     * 删除指定试卷.
     *
     * @Route("/delete/{id}", name="paper_delete")
     * @Method("GET")
     * @Template()
     */
    public function deleteAction(Request $request, $id)
    {
        try{
            $em = $this->getDoctrine()->getManager();
            $success = $em->getRepository('PaperManageBundle:Paper')->delete($id);
            if($success){
                $this->addFlash('success', '试卷删除成功!');
            }else{
                $this->addFlash('error', '网络原因或数据库故障，删除失败. 请重新删除！');
            }
        } catch(\Exception $e){
            $this->addFlash('error', '网络原因或数据库故障，删除失败. 请重新删除！');
        }

        return $this->redirect($this->generateUrl('paper_index'));
    }


     /**
     * 批量删除题型信息.
     *
     * @Route("/multi-delete", name="paper_multi_delete")
     * @Method("POST")
     */
    public function multiDeleteAction(Request $request)
    {
        $ids = $request->request->get('ids');
        
        try{
            $em = $this->getDoctrine()->getManager();
            $success = $em->getRepository('PaperManageBundle:Paper')->multiDelete($ids);

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
     * 获取指定试卷的JSON数据.
     *
     * @Route("/QTJSON/{id}", name="paper_getJSON")
     * @Method("GET")
     * @Template()
     */
    public function QTJSONAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery(
            'SELECT p.content FROM PaperManageBundle:Paper p WHERE p.id =:id'
        )->setParameter('id', $id);;
        $questionList = $query->getArrayResult()[0];
        return new JsonResponse(json_encode($questionList,true));
    }
}
