<?php

namespace UserBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use UserBundle\Entity\Manager;
use UserBundle\Form\ManagerNewType;
use UserBundle\Form\ManagerEditType;

/**
 * Manager controller.
 *
 * @Route("/manage/manager")
 */
class ManagerController extends Controller
{
    /**
     * 显示所有管理者.
     *
     * @Route("/", name="manager_index")
     * @Method("GET")
     * @Template("UserBundle:Manager:index.html.twig")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $managers = $em->getRepository('UserBundle:Manager')->findAll();

        return array(
            'managers' => $managers,
        );
    }

    /**
     * 添加管理者信息.
     *
     * @Route("/new", name="manager_new")
     * @Method("GET")
     * @Template("UserBundle:Manager:new.html.twig")
     */
    public function newAction(Request $request)
    {
        $manager = new Manager();

        $new_form = $this->createForm(new ManagerNewType(), $manager, array(
            'action' => $this->generateUrl('manager_new'),
            'method' => 'GET'
        ));
        
        $new_form->handleRequest($request);

        if ($new_form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->getRepository('UserBundle:Manager')->add($manager);

            return $this->redirect($this->generateUrl('manager_show', array(
                'id' => $manager->getId()
            )));
        }

        return array(
            'new_form' => $new_form->createView(),
        );
    }

    /**
     * 显示管理者信息.
     *
     * @Route("/show/{id}", name="manager_show")
     * @Method("GET")
     * @Template("UserBundle:Manager:show.html.twig")
     */
    public function showAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $manager = $em->getRepository('UserBundle:Manager')->find($id);

        if (!$manager) {
            throw $this->createNotFoundException('Unable to find manager entity.');
        }
        
        return array(
            'manager' => $manager,
        );
    }

    /**
     * 编辑管理者信息.
     *
     * @Route("/edit/{id}", name="manager_edit")
     * @Method("GET")
     * @Template("UserBundle:Manager:edit.html.twig")
     */
    public function editAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $manager = $em->getRepository('UserBundle:Manager')->find($id);

        $edit_form = $this->createForm(new ManagerEditType(), $manager, array(
            'action' => $this->generateUrl('manager_edit', array('id' => $id ) ),
            'method' => 'GET'
        ));
        
        $edit_form->handleRequest($request);

        if ($edit_form->isValid()) {

            $em = $this->getDoctrine()->getManager();
            $em->getRepository('UserBundle:Manager')->add($manager);

            return $this->redirect($this->generateUrl('manager_index'));
        }

        return array(
            'edit_form' => $edit_form->createView(),
        );
    }

    /**
     * 删除管理者信息.
     *
     * @Route("/delete/{id}", name="manager_delete")
     * @Method("GET")
     * @Template()
     */
    public function deleteAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $em->getRepository('UserBundle:Manager')->delete($id);

        return $this->redirect($this->generateUrl('manager_index'));
    }

    /**
     * 批量删除管理者信息.
     *
     * @Route("/multi-delete", name="manager_multi_delete")
     * @Method("GET")
     * @Template()
     */
    public function multiDeleteAction(Request $request, $ids)
    {
        $ids = $request->request->get('ids');

        $success = $em->getRepository('UserBundle:Manager')->multiDelete($ids);        
        $result = array(
                'success' => $success
                );
        $this->get('session')->getFlashBag()->add(
            'notice',
            '选中项删除成功!'
        ); 
        $response = new Response(json_encode($result));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

}
