<?php

namespace PaperManageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use PaperManageBundle\Entity\question;
use PaperManageBundle\Form\questionType;

/**
 * question controller.
 *
 * @Route("/manage/question")
 */
class questionController extends Controller
{

    /**
     * Lists all question entities.
     *
     * @Route("/", name="manage_question")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('PaperManageBundle:question')->findAll();

        return array(
            'entities' => $entities,
        );
    }
    /**
     * Creates a new question entity.
     *
     * @Route("/", name="manage_question_create")
     * @Method("POST")
     * @Template("PaperManageBundle:question:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new question();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('manage_question_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a form to create a question entity.
     *
     * @param question $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(question $entity)
    {
        $form = $this->createForm(new questionType(), $entity, array(
            'action' => $this->generateUrl('manage_question_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new question entity.
     *
     * @Route("/new", name="manage_question_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new question();
        $form   = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a question entity.
     *
     * @Route("/{id}", name="manage_question_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('PaperManageBundle:question')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find question entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing question entity.
     *
     * @Route("/{id}/edit", name="manage_question_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('PaperManageBundle:question')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find question entity.');
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
    * Creates a form to edit a question entity.
    *
    * @param question $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(question $entity)
    {
        $form = $this->createForm(new questionType(), $entity, array(
            'action' => $this->generateUrl('manage_question_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->add('submit', 'submit', array('label' => 'Update'));

        return $form;
    }
    /**
     * Edits an existing question entity.
     *
     * @Route("/{id}", name="manage_question_update")
     * @Method("PUT")
     * @Template("PaperManageBundle:question:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('PaperManageBundle:question')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find question entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('manage_question_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a question entity.
     *
     * @Route("/{id}", name="manage_question_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('PaperManageBundle:question')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find question entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('manage_question'));
    }

    /**
     * Creates a form to delete a question entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('manage_question_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm()
        ;
    }
}
