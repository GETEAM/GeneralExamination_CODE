<?php

namespace GE\SystemManageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use GE\SystemManageBundle\Entity\Grade;
use GE\SystemManageBundle\Form\GradeNewType;
use GE\SystemManageBundle\Form\GradeEditType;

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
     * @Template("GESystemManageBundle:Grade:index.html.twig")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $grades = $em->getRepository('GESystemManageBundle:Grade')->findAll();

        return array(
            'grades' => $grades
        );
    }

    /**
     * 添加年级信息.
     *
     * @Route("/new", name="grade_new")
     * @Method("GET")
     * @Template("GESystemManageBundle:Grade:new.html.twig")
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
            $em->getRepository('GESystemManageBundle:Grade')->add($grade);

            return $this->redirect($this->generateUrl('grade_show', array(
                'id' => $grade->getId()
            )));
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
     * @Template("GESystemManageBundle:Grade:show.html.twig")
     */
    public function showAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $grade = $em->getRepository('GESystemManageBundle:Grade')->find($id);

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
     * @Template("GESystemManageBundle:Grade:edit.html.twig")
     */
    public function editAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $grade = $em->getRepository('GESystemManageBundle:Grade')->find($id);

        $edit_form = $this->createForm(new GradeEditType(), $grade, array(
            'action' => $this->generateUrl('grade_edit', array('id' => $id ) ),
            'method' => 'GET'
        ));
        
        $edit_form->handleRequest($request);

        if ($edit_form->isValid()) {

            $em = $this->getDoctrine()->getManager();
            $em->getRepository('GESystemManageBundle:Grade')->add($grade);

            return $this->redirect($this->generateUrl('grade_index'));
        }

        return array(
            'edit_form' => $edit_form->createView(),
        );
    }

    /**
     * 删除年级信息.
     *
     * @Route("/delete/{id}", name="grade_delete")
     * @Method("GET")
     * @Template()
     */
    public function deleteAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $em->getRepository('GESystemManageBundle:Grade')->delete($id);

        return $this->redirect($this->generateUrl('grade_index'));
    }
}
