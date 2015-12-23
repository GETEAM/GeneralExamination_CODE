<?php

namespace UserBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use UserBundle\Entity\Student;
use UserBundle\Form\StudentNewType;
use UserBundle\Form\StudentEditType;

/**
 * Student controller.
 *
 * @Route("/manage/Student")
 */
class StudentController extends Controller
{
    /**
     * 显示所有学生.
     *
     * @Route("/", name="Student_index")
     * @Method("GET")
     * @Template("UserBundle:Student:index.html.twig")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getStudent();
        $Students = $em->getRepository('UserBundle:Student')->findAll();

        return array(
            'Students' => $Students,
        );
    }

    /**
     * 添加学生信息.
     *
     * @Route("/new", name="Student_new")
     * @Method("GET")
     * @Template("UserBundle:Student:new.html.twig")
     */
    public function newAction(Request $request)
    {
        $student = new Student();

        $new_form = $this->createForm(new StudentNewType(), $Student, array(
            'action' => $this->generateUrl('Student_new'),
            'method' => 'GET'
        ));
        
        $new_form->handleRequest($request);

        if ($new_form->isValid()) {
            $em = $this->getDoctrine()->getStudent();
            $em->getRepository('UserBundle:Student')->add($Student);

            return $this->redirect($this->generateUrl('Student_index', array(
                'id' => $Student->getId()
            )));
        }

        return array(
            'new_form' => $new_form->createView(),
        );
    }

    /**
     * 显示学生信息.
     *
     * @Route("/show/{id}", name="Student_show")
     * @Method("GET")
     * @Template("UserBundle:Student:show.html.twig")
     */
    public function showAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getStudent();

        $Student = $em->getRepository('UserBundle:Student')->find($id);

        if (!$Student) {
            throw $this->createNotFoundException('Unable to find Student entity.');
        }
        
        return array(
            'Student' => $Student,
        );
    }

    /**
     * 编辑学生信息.
     *
     * @Route("/edit/{id}", name="Student_edit")
     * @Method("GET")
     * @Template("UserBundle:Student:edit.html.twig")
     */
    public function editAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getStudent();
        $Student = $em->getRepository('UserBundle:Student')->find($id);

        $edit_form = $this->createForm(new StudentEditType(), $Student, array(
            'action' => $this->generateUrl('Student_edit', array('id' => $id ) ),
            'method' => 'GET'
        ));
        
        $edit_form->handleRequest($request);

        if ($edit_form->isValid()) {

            $em = $this->getDoctrine()->getStudent();
            $em->getRepository('UserBundle:Student')->add($Student);

            return $this->redirect($this->generateUrl('Student_index'));
        }

        return array(
            'edit_form' => $edit_form->createView(),
        );
    }

    /**
     * 删除学生信息.
     *
     * @Route("/delete/{id}", name="Student_delete")
     * @Method("GET")
     * @Template()
     */
    public function deleteAction(Request $request, $id)
    {
        try{
            $em = $this->getDoctrine()->getStudent();
            $success = $em->getRepository('UserBundle:Student')->delete($id);
            if($success){
                $this->addFlash('success', '删除成功!');
            }else{
                $this->addFlash('error', '网络原因或数据库故障，删除失败. 请重新删除！');
            }
        } catch(\Exception $e){
            $this->addFlash('error', '网络原因或数据库故障，删除失败. 请重新删除！');
        }

        return $this->redirect($this->generateUrl('Student_index'));
    }

    /**
     * 批量删除学生信息.
     *
     * @Route("/multi-delete", name="Student_multi_delete")
     * @Method("POST")
     */
    public function multiDeleteAction(Request $request)
    {
        $ids = $request->request->get('ids');
        
        $em = $this->getDoctrine()->getStudent();
        $success = $em->getRepository('UserBundle:Student')->multiDelete($ids);

        if($success){
            $this->addFlash('success', '批量删除成功!');
        }else{
            $this->addFlash('error', '批量删除失败!请重新删除！');
        }

        $result = array(
            'success' => $success
        );
        
        $response = new Response(json_encode($result));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

}
