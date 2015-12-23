<?php

namespace UserBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use UserBundle\Entity\Student;
use SystemManageBundle\Entity\Grade;
use SystemManageBundle\Entity\Academy;
use UserBundle\Form\StudentNewType;

/**
 * Student controller.
 *
 * @Route("/manage/student")
 */
class StudentController extends Controller
{
    /**
     * 显示所有学生.
     *
     * @Route("/", name="student_index")
     * @Method("GET")
     * @Template("UserBundle:Student:index.html.twig")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $students = $em->getRepository('UserBundle:Student')->findAll();

        return array(
            'students' => $students
        );
    }

    /**
     * 添加学生信息.
     *
     * @Route("/new", name="student_new")
     * @Method("GET")
     * @Template("UserBundle:Student:new.html.twig")
     */
    public function newAction(Request $request)
    {
        $student = new Student();

        $new_form = $this->createForm(new StudentNewType($this->getDoctrine()), $student, array(
            'action' => $this->generateUrl('student_new'),
            'method' => 'GET'
        ));
        
        $new_form->handleRequest($request);

        if ($new_form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->getRepository('UserBundle:Student')->add($student);

            $this->addFlash(
                'success',
                $grade->getDescription().'添加成功'
            );

            return $this->redirect($this->generateUrl('student_index'));
        }

        return array(
            'new_form' => $new_form->createView()
        );

        // $grade = new Grade();
        // $grade->setGrade('B2013');
        // $grade->setDescription('本科2013级');

        // $academy= new academy();
        // $academy->setAcademyID('225');
        // $academy->setAcademyName('软件学院');

        // $student = new Student();
        // $student->setStudentId('SA13225006');
        // $student->setName('高峰');
        // $student->setAcademy($academy);
        // $student->setGrade($grade);
        // $student->setEmail('dd@qq.com');
        // $student->setTelephone('1111');
        // $student->setPassword('23');

        // $em = $this->getDoctrine()->getManager();
        // $em->persist($grade);
        // $em->persist($academy);
        // $em->persist($student);
        // $em->flush();

        // return new Response(
        //     'Created product id: '.$grade->getId()
        //     .' and category id: '.$student->getId()
        // );
        // 
        
    }

    /**
     * 显示学生信息.
     *
     * @Route("/show/{id}", name="student_show")
     * @Method("GET")
     * @Template("UserBundle:Student:show.html.twig")
     */
    public function showAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $manager = $em->getRepository('UserBundle:Student')->find($id);

        if (!$manager) {
            throw $this->createNotFoundException('Unable to find manager entity.');
        }
        
        return array(
            'manager' => $manager,
        );
    }

    /**
     * 编辑学生信息.
     *
     * @Route("/edit/{id}", name="student_edit")
     * @Method("GET")
     * @Template("UserBundle:Student:edit.html.twig")
     */
    public function editAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $manager = $em->getRepository('UserBundle:Student')->find($id);

        $edit_form = $this->createForm(new ManagerEditType(), $manager, array(
            'action' => $this->generateUrl('student_edit', array('id' => $id ) ),
            'method' => 'GET'
        ));
        
        $edit_form->handleRequest($request);

        if ($edit_form->isValid()) {

            $em = $this->getDoctrine()->getManager();
            $em->getRepository('UserBundle:Student')->add($manager);

            return $this->redirect($this->generateUrl('student_index'));
        }

        return array(
            'edit_form' => $edit_form->createView(),
        );
    }

    /**
     * 删除学生信息.
     *
     * @Route("/delete/{id}", name="student_delete")
     * @Method("GET")
     * @Template()
     */
    public function deleteAction(Request $request, $id)
    {
        try{
            $em = $this->getDoctrine()->getManager();
            $success = $em->getRepository('UserBundle:Student')->delete($id);
            if($success){
                $this->addFlash('success', '删除成功!');
            }else{
                $this->addFlash('error', '网络原因或数据库故障，删除失败. 请重新删除！');
            }
        } catch(\Exception $e){
            $this->addFlash('error', '网络原因或数据库故障，删除失败. 请重新删除！');
        }

        return $this->redirect($this->generateUrl('student_index'));
    }

    /**
     * 批量删除学生信息.
     *
     * @Route("/multi-delete", name="student_multi_delete")
     * @Method("POST")
     */
    public function multiDeleteAction(Request $request)
    {
        $ids = $request->request->get('ids');
        
        $em = $this->getDoctrine()->getManager();
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
