<?php

namespace GE\ExaminationManageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use GE\ExaminationManageBundle\Entity\ExaminationBatch;
use GE\ExaminationManageBundle\Form\ExaminationBatchType;

/**
 * ExaminationBatch controller.
 *
 * @Route("/examinationbatch")
 */
class ExaminationBatchController extends Controller
{

    /**
     * Lists all ExaminationBatch entities.
     *
     * @Route("/", name="examinationbatch")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('GEExaminationManageBundle:ExaminationBatch')->findAll();

        return array(
            'entities' => $entities,
        );
    }
    /**
     * Creates a new ExaminationBatch entity.
     *
     * @Route("/", name="examinationbatch_create")
     * @Method("POST")
     * @Template("GEExaminationManageBundle:ExaminationBatch:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new ExaminationBatch();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('examinationbatch_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a form to create a ExaminationBatch entity.
     *
     * @param ExaminationBatch $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(ExaminationBatch $entity)
    {
        $form = $this->createForm(new ExaminationBatchType(), $entity, array(
            'action' => $this->generateUrl('examinationbatch_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => '创建'));

        return $form;
    }

    /**
     * Displays a form to create a new ExaminationBatch entity.
     *
     * @Route("/new", name="examinationbatch_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new ExaminationBatch();
        $form   = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a ExaminationBatch entity.
     *
     * @Route("/{id}", name="examinationbatch_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('GEExaminationManageBundle:ExaminationBatch')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find ExaminationBatch entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing ExaminationBatch entity.
     *
     * @Route("/{id}/edit", name="examinationbatch_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('GEExaminationManageBundle:ExaminationBatch')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find ExaminationBatch entity.');
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
    * Creates a form to edit a ExaminationBatch entity.
    *
    * @param ExaminationBatch $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(ExaminationBatch $entity)
    {
        $form = $this->createForm(new ExaminationBatchType(), $entity, array(
            'action' => $this->generateUrl('examinationbatch_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->add('submit', 'submit', array('label' => '更新'));

        return $form;
    }
    /**
     * Edits an existing ExaminationBatch entity.
     *
     * @Route("/{id}", name="examinationbatch_update")
     * @Method("PUT")
     * @Template("GEExaminationManageBundle:ExaminationBatch:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('GEExaminationManageBundle:ExaminationBatch')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find ExaminationBatch entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('examinationbatch_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a ExaminationBatch entity.
     *
     * @Route("/{id}", name="examinationbatch_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('GEExaminationManageBundle:ExaminationBatch')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find ExaminationBatch entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('examinationbatch'));
    }

    /**
     * Creates a form to delete a ExaminationBatch entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('examinationbatch_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => '删除'))
            ->getForm()
        ;
    }
}
