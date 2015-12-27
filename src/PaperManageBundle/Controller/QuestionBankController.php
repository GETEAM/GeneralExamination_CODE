<?php

namespace PaperManageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use PaperManageBundle\Entity\QuestionBank;
use PaperManageBundle\Form\QuestionBankType;

/**
 * QuestionBank controller.
 *
 * @Route("/questionbank")
 */
class QuestionBankController extends Controller
{

    /**
     * Lists all QuestionBank entities.
     *
     * @Route("/", name="questionBank_index")
     * @Method("GET")
     * @Template()
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $question = $em->getRepository('PaperManageBundle:QuestionBank')->findAll();


        $paginator = $this->get('knp_paginator');
        $questions = $paginator->paginate($question, $request->query->getInt('page', 1));

        return array(
            'questions' => $questions,
        );
    }
    /**
     * Creates a new QuestionBank entity.
     *
     * @Route("/", name="questionbank_create")
     * @Method("POST")
     * @Template("PaperManageBundle:QuestionBank:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new QuestionBank();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('questionbank_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a form to create a QuestionBank entity.
     *
     * @param QuestionBank $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(QuestionBank $entity)
    {
        $form = $this->createForm(new QuestionBankType(), $entity, array(
            'action' => $this->generateUrl('questionbank_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new QuestionBank entity.
     *
     * @Route("/new", name="questionbank_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new QuestionBank();
        $form   = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a QuestionBank entity.
     *
     * @Route("/{id}", name="questionbank_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('PaperManageBundle:QuestionBank')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find QuestionBank entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing QuestionBank entity.
     *
     * @Route("/{id}/edit", name="questionbank_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('PaperManageBundle:QuestionBank')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find QuestionBank entity.');
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
    * Creates a form to edit a QuestionBank entity.
    *
    * @param QuestionBank $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(QuestionBank $entity)
    {
        $form = $this->createForm(new QuestionBankType(), $entity, array(
            'action' => $this->generateUrl('questionbank_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->add('submit', 'submit', array('label' => 'Update'));

        return $form;
    }
    /**
     * Edits an existing QuestionBank entity.
     *
     * @Route("/{id}", name="questionbank_update")
     * @Method("PUT")
     * @Template("PaperManageBundle:QuestionBank:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('PaperManageBundle:QuestionBank')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find QuestionBank entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('questionbank_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a QuestionBank entity.
     *
     * @Route("/{id}", name="questionbank_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('PaperManageBundle:QuestionBank')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find QuestionBank entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('questionbank'));
    }

    /**
     * Creates a form to delete a QuestionBank entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('questionbank_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm()
        ;
    }
}
