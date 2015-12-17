<?php

namespace GE\SystemManageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use GE\SystemManageBundle\Entity\Academy;
use GE\SystemManageBundle\Form\AcademyNewType;
use GE\SystemManageBundle\Form\AcademyEditType;


/**
 * 学院信息管理controller.
 *
 * @Route("/manage/academy")
 */
class AcademyController extends Controller
{

    /**
     * 获取显示学院信息列表.
     *
     * @Route("/", name="academy_index")
     * @Method("GET")
     * @Template("GESystemManageBundle:Academy:index.html.twig")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $academies = $em->getRepository('GESystemManageBundle:Academy')->findAll();

        return array(
            'academies' => $academies
        );
    }
    /**
     * 添加学院信息.
     *
     * @Route("/new", name="academy_new")
     * @Method("GET")
     * @Template("GESystemManageBundle:Academy:new.html.twig")
     */
    public function newAction(Request $request)
    {
        $academy = new Academy();

        $new_form = $this->createForm(new AcademyNewType(), $academy, array(
            'action' => $this->generateUrl('academy_new'),
            'method' => 'GET'
        ));
        
        $new_form->handleRequest($request);

        if ($new_form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->getRepository('GESystemManageBundle:Academy')->add($academy);
            
            $this->addFlash('success',
                $academy->getAcademyName().'添加成功'
            );

            return $this->redirect($this->generateUrl('academy_index'));
        }

        return array(
            'new_form' => $new_form->createView()
        );
    }

    /**
     * 显示学院.
     *
     * @Route("/show/{id}", name="academy_show")
     * @Method("GET")
     * @Template("GESystemManageBundle:Academy:show.html.twig")
     */
    public function showAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $academy = $em->getRepository('GESystemManageBundle:Academy')->find($id);

        if (!$academy) {
            throw $this->createNotFoundException('Unable to find Academy entity.');
        }
        return array(
            'academy' => $academy
        );
    }

    /**
     * 编辑学院信息.
     *
     * @Route("/edit/{id}", name="academy_edit")
     * @Method("GET")
     * @Template("GESystemManageBundle:Academy:edit.html.twig")
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $academy = $em->getRepository('GESystemManageBundle:Academy')->find($id);

        $edit_form = $this->createForm(new AcademyEditType(), $academy, array(
            'action' => $this->generateUrl('academy_edit', array('id' => $id ) ),
            'method' => 'GET'
        ));
        
        $edit_form->handleRequest($request);

        if ($edit_form->isValid()) {

            $em = $this->getDoctrine()->getManager();
            $em->getRepository('GESystemManageBundle:Academy')->add($academy);

            $this->addFlash('success','学院信息修改成功');

            return $this->redirect($this->generateUrl('academy_index'));
        }

        return array(
            'edit_form' => $edit_form->createView(),
        );
    }
    /**
     * 删除学院信息.
     *
     * @Route("/delete/{id}", name="academy_delete")
     * @Method("GET")
     * @Template()
     */
    public function deleteAction(Request $request, $id)
    {
        try{
            $em = $this->getDoctrine()->getManager();
            $success = $em->getRepository('GESystemManageBundle:Academy')->delete($id);
            $this->addFlash('success','删除成功');
        }catch(\Exception $e){
            $this->addFlash('error','网络原因或数据库故障，删除失败');
        }
        

        return $this->redirect($this->generateUrl('academy_index'));
    }
}
