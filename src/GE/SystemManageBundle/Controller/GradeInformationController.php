<?php

namespace GE\SystemManageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use GE\SystemManageBundle\Entity\GradeInformation;
use GE\SystemManageBundle\Form\GradeInformationType;

/**
 * GradeInformation controller.
 *
 * @Route("/gradeinformation")
 */
class GradeInformationController extends Controller
{

    /**
     * Lists all GradeInformation entities.
     *
     * @Route("/", name="gradeinformation")
     * @Method("GET")
     * @Template("GESystemManageBundle:GradeInformation:index.html.twig")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $grades = $em->getRepository('GESystemManageBundle:GradeInformation')->findAll();

        return array(
            'grades' => $grades,
        );
    }
    /**
     * Creates a new GradeInformation entity.
     *
     * @Route("/", name="gradeinformation_create")
     * @Method("POST")
     * @Template("GESystemManageBundle:GradeInformation:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new GradeInformation();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('gradeinformation_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a form to create a GradeInformation entity.
     *
     * @param GradeInformation $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(GradeInformation $entity)
    {
        $form = $this->createForm(new GradeInformationType(), $entity, array(
            'action' => $this->generateUrl('gradeinformation_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => '创建'));

        return $form;
    }

    /**
     * Displays a form to create a new GradeInformation entity.
     *
     * @Route("/new", name="gradeinformation_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new GradeInformation();
        $form   = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a GradeInformation entity.
     *
     * @Route("/{id}", name="gradeinformation_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $grade = $em->getRepository('GESystemManageBundle:GradeInformation')->find($id);

        if (!$grade) {
            throw $this->createNotFoundException('Unable to find GradeInformation entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'grade'      => $grade,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing GradeInformation entity.
     *
     * @Route("/edit/{id}", name="gradeinformation_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('GESystemManageBundle:GradeInformation')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find GradeInformation entity.');
        }

        $editForm = $this->createEditForm($entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
    * Creates a form to edit a GradeInformation entity.
    *
    * @param GradeInformation $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(GradeInformation $entity)
    {
        $form = $this->createForm(new GradeInformationType(), $entity, array(
            'action' => $this->generateUrl('gradeinformation_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->add('submit', 'submit', array('label' => '更新'));

        return $form;
    }
    /**
     * Edits an existing GradeInformation entity.
     *
     * @Route("/{id}", name="gradeinformation_update")
     * @Method("PUT")
     * @Template("GESystemManageBundle:GradeInformation:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('GESystemManageBundle:GradeInformation')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find GradeInformation entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('gradeinformation'));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a GradeInformation entity.
     *
     * @Route("/delete/{id}", name="gradeinformation_delete")
     * @Method("GET")
     */
    public function deleteAction(Request $request, $id)
    {
        if($id) {
            $em = $this->getDoctrine()->getManager();
            $grade = $em->getRepository('GESystemManageBundle:GradeInformation')->find($id);
            $em->remove($grade);
            $em->flush();
        }
        return $this->redirect($this->generateUrl('gradeinformation'));
    }

    /**
     * Creates a form to delete a GradeInformation entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('gradeinformation_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => '删除'))
            ->getForm()
        ;
    }
}
