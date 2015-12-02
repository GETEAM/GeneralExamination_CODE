<?php

namespace ManageBundle\SystemManagementBundle\ExaminationRoomInfomationBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use ManageBundle\SystemManagementBundle\ExaminationRoomInfomationBundle\Entity\ExaminationRoomInfomation;
use ManageBundle\SystemManagementBundle\ExaminationRoomInfomationBundle\Form\ExaminationRoomInfomationType;

/**
 * ExaminationRoomInfomation controller.
 *
 * @Route("/examinationroominfomation")
 */
class ExaminationRoomInfomationController extends Controller
{

    /**
     * Lists all ExaminationRoomInfomation entities.
     *
     * @Route("/", name="examinationroominfomation")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('ManageBundleSystemManagementBundleExaminationRoomInfomationBundle:ExaminationRoomInfomation')->findAll();

        return array(
            'entities' => $entities,
        );
    }
    /**
     * Creates a new ExaminationRoomInfomation entity.
     *
     * @Route("/", name="examinationroominfomation_create")
     * @Method("POST")
     * @Template("ManageBundleSystemManagementBundleExaminationRoomInfomationBundle:ExaminationRoomInfomation:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new ExaminationRoomInfomation();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('examinationroominfomation_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a form to create a ExaminationRoomInfomation entity.
     *
     * @param ExaminationRoomInfomation $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(ExaminationRoomInfomation $entity)
    {
        $form = $this->createForm(new ExaminationRoomInfomationType(), $entity, array(
            'action' => $this->generateUrl('examinationroominfomation_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new ExaminationRoomInfomation entity.
     *
     * @Route("/new", name="examinationroominfomation_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new ExaminationRoomInfomation();
        $form   = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a ExaminationRoomInfomation entity.
     *
     * @Route("/{id}", name="examinationroominfomation_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ManageBundleSystemManagementBundleExaminationRoomInfomationBundle:ExaminationRoomInfomation')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find ExaminationRoomInfomation entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing ExaminationRoomInfomation entity.
     *
     * @Route("/{id}/edit", name="examinationroominfomation_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ManageBundleSystemManagementBundleExaminationRoomInfomationBundle:ExaminationRoomInfomation')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find ExaminationRoomInfomation entity.');
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
    * Creates a form to edit a ExaminationRoomInfomation entity.
    *
    * @param ExaminationRoomInfomation $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(ExaminationRoomInfomation $entity)
    {
        $form = $this->createForm(new ExaminationRoomInfomationType(), $entity, array(
            'action' => $this->generateUrl('examinationroominfomation_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->add('submit', 'submit', array('label' => 'Update'));

        return $form;
    }
    /**
     * Edits an existing ExaminationRoomInfomation entity.
     *
     * @Route("/{id}", name="examinationroominfomation_update")
     * @Method("PUT")
     * @Template("ManageBundleSystemManagementBundleExaminationRoomInfomationBundle:ExaminationRoomInfomation:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ManageBundleSystemManagementBundleExaminationRoomInfomationBundle:ExaminationRoomInfomation')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find ExaminationRoomInfomation entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('examinationroominfomation_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a ExaminationRoomInfomation entity.
     *
     * @Route("/{id}", name="examinationroominfomation_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ManageBundleSystemManagementBundleExaminationRoomInfomationBundle:ExaminationRoomInfomation')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find ExaminationRoomInfomation entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('examinationroominfomation'));
    }

    /**
     * Creates a form to delete a ExaminationRoomInfomation entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('examinationroominfomation_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm()
        ;
    }
}
