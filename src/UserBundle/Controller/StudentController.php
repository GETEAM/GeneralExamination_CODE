<?php

namespace UserBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use SystemManageBundle\Entity\Grade;
use SystemManageBundle\Entity\Academy;
use UserBundle\Entity\Student;
use UserBundle\Form\StudentNewType;
use UserBundle\Form\StudentEditType;
use UserBundle\Form\StudentImportType;
use UserBundle\Form\StudentFindType;
use Ddeboer\DataImport\Workflow;
use Ddeboer\DataImport\Writer\DoctrineWriter;
use Ddeboer\DataImport\Filter;
use Ddeboer\DataImport\Reader\CsvReader;
use Ddeboer\DataImport\Reader\OneToManyReader;
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
    public function indexAction(Request $request)
    {   
        //查找表单
        $student = new Student();
        $find_form = $this->createForm(new StudentFindType($this->getDoctrine()), $student,array(
            'action' => $this->generateUrl('student_find' ),
            'method' => 'GET'
        ));
        
        $find_form->handleRequest($request);

        if ($find_form->isValid()) {
            //添加成功跳转到列表页面，不成功跳转到本页面
            try{

                $studentId=$find_form['studentId']->getData();
                $name=$find_form['name']->getData();
                $grade=$find_form['grade']->getData();
                $academy=$find_form['academy']->getData();
                
                $em = $this->getDoctrine()->getManager();
                $students = $em->getRepository('UserBundle:Student')->findStudent($studentId,$name,$grade,$academy);

            } catch(\Exception $e){
                $this->addFlash('error', '网络原因或数据库故障，添加失败. 请重新尝试添加！');
                return $this->redirect($this->generateUrl('student_index'));
            } 
        }




        //首页显示的学生信息
        $em = $this->getDoctrine()->getManager();
        $stus = $em->getRepository('UserBundle:Student')->findAll();
        $paginator = $this->get('knp_paginator');
        $students = $paginator->paginate($stus, $request->query->getInt('page', 1));

        return array(
            'find_form' => $find_form->createView(),
            'students' => $students
        );
    }

    /**
     * 添加学生信息.
     *
     * @Route("/new", name="student_new")
     * 
     * @Template("UserBundle:Student:new.html.twig")
     */
    public function newAction(Request $request)
    {
        $student = new Student();

        $new_form = $this->createForm(new StudentNewType($this->getDoctrine()), $student, array(
            'action' => $this->generateUrl('student_new'),
            'method' => 'POST'
        ));
          
        $new_form->handleRequest($request);     

        if ($new_form->isValid()) {
            //添加成功跳转到列表页面，不成功跳转到本页面
            try{
                $em = $this->getDoctrine()->getManager();
                $success = $em->getRepository('UserBundle:Student')->add($student);
                if($success){
                    $this->addFlash('success', $student->getName().'添加成功');
                }else{
                    $this->addFlash('error', '网络原因或数据库故障，添加失败. 请重新尝试添加！');
                    return $this->redirect($this->generateUrl('student_new'));
                }
                return $this->redirect($this->generateUrl('student_index'));
                
            } catch(\Exception $e){
                $this->addFlash('error', '网络原因或数据库故障，添加失败. 请重新尝试添加！');
                return $this->redirect($this->generateUrl('student_new'));
            } 
        }

        //批量导入学生信息
        $import_form = $this
                    ->createFormBuilder()
                    ->setMethod('POST')
                    ->setAction($this->generateUrl('student_new'))
                    ->add('fileUrl', 'file', array(
                              'label' => '文件位置：',
                           ))
                    ->add('import', 'submit', array('label' => '导入'))
                     ->add('cancel', 'reset', array('label' => '取消'))
                    ->getForm();

        $import_form->handleRequest($request);

        if ($import_form->isValid()) {
            if(!is_dir("upload/import/student_import")){
                mkdir("upload/import/student_import");
            }
            $file=$import_form['fileUrl']->getData();
            $filename = explode(".", $file->getClientOriginalName());
            $extension = $filename[count($filename) - 1];
            $newefilename = $filename[0] . "_" . rand(1, 9999) . "." . $extension;

            $file->move("upload/import/student_import", $newefilename);

            $upfile = new \SplFileObject("upload/import/student_import/" . $newefilename);
            $csvReader = new CsvReader($upfile);

            $csvReader->setStrict(false)
                   ->setHeaderRowNumber(0)
                   ->setColumnHeaders(['grade' => 'SystemManageBundle\Entity\Grade', 'academy' => 'SystemManageBundle\Entity\Academy','studentId','name','email','telephone','password']);

            $em = $this->getDoctrine()->getManager();
            $doctrineWriter = new DoctrineWriter($em, 'UserBundle:Student');
            $doctrineWriter->disableTruncate();

            $workflow = new Workflow($csvReader);
            $workflow->addWriter($doctrineWriter)
                     ->process();
        }
        return array(
            'new_form' => $new_form->createView(),
            'import_form' => $import_form->createView()
        );        
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

        $student = $em->getRepository('UserBundle:Student')->find($id);

        //调试错误提示
        // if (!$student) {
        //     // throw $this->createNotFoundException('Unable to find Student entity.');
        // }
        
        return array(
            'student' => $student
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
        $student = $em->getRepository('UserBundle:Student')->find($id);

        $edit_form = $this->createForm(new StudentEditType($this->getDoctrine()), $student, array(
            'action' => $this->generateUrl('student_edit', array('id' => $id ) ),
            'method' => 'GET'
        ));
        
        $edit_form->handleRequest($request);

        if ($edit_form->isValid()) {
            try{
                $em = $this->getDoctrine()->getManager();
                $success = $em->getRepository('UserBundle:Student')->add($student);
                if($success){
                    $this->addFlash('success', $student->getName().'修改成功');
                }else{
                    $this->addFlash('error', '网络原因或数据库故障，修改失败. 请重新修改！');
                }
            } catch(\Exception $e){
                $this->addFlash('error', '网络原因或数据库故障，修改失败. 请重新修改！');
            }

            return $this->redirect($this->generateUrl('student_edit', array(
                'id' => $id
            )));
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
        
        try{
            $em = $this->getDoctrine()->getManager();
            $success = $em->getRepository('UserBundle:Student')->multiDelete($ids);

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
     * 查找学生信息
     *
     * @Route("/find", name="student_find")
     * @Method("GET")
     * @Template("UserBundle:Student:find.html.twig")
     */
    public function findAction(Request $request)
    {   

        //$em = $this->getDoctrine()->getManager();
        //$students = $em->getRepository('UserBundle:Student')->findAll();

        $student = new Student();
        $find_form = $this->createForm(new StudentFindType($this->getDoctrine()), $student,array(
            'action' => $this->generateUrl('student_find' ),
            'method' => 'GET'
        ));
        
        $find_form->handleRequest($request);

        //根据学号查
        $em = $this->getDoctrine()->getManager();
        //$students = $em->getRepository('UserBundle:Student')->findStudentById('saaa');
        //根据年级学院查,第一步根据年级描述找到所有符合的学生，再根据学生找到。。。。。

        //$grade = $em->getRepository('SystemManageBundle:Grade')->findOneByDescription('2013级本科生');
        //$students=$grade->getStudents();
        //测试通过了年级和学院查找
        //$students = $em->getRepository('UserBundle:Student')->findStudentByGrade('2013级本科生','软件学院');
        //测试通过不严格匹配查找
        $students = $em->getRepository('UserBundle:Student')->findStudentByName('a');
        return array(
            'find_form' => $find_form->createView(),
            'students' =>$students
        );

      
    }



}