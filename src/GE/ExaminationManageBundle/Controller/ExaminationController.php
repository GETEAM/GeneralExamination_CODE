<?php

namespace GE\ExaminationManageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use GE\ExaminationManageBundle\Entity\Examination;
use GE\ExaminationManageBundle\Form\ExaminationType;

/**
 * Examination controller.
 *
 * @Route("/examination")
 */
class ExaminationController extends Controller
{

    /**
     * Lists all Examination entities.
     *
     * @Route("/", name="examination")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('GEExaminationManageBundle:Examination')->findAll();

        return array(
            'entities' => $entities,
        );
    }
    /**
     * Creates a new Examination entity.
     *
     * @Route("/", name="examination_create")
     * @Method("POST")
     * @Template("GEExaminationManageBundle:Examination:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new Examination();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('examination_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a form to create a Examination entity.
     *
     * @param Examination $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(Examination $entity)
    {
        $form = $this->createForm(new ExaminationType(), $entity, array(
            'action' => $this->generateUrl('examination_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => '创建'));

        return $form;
    }

    /**
     * Displays a form to create a new Examination entity.
     *
     * @Route("/new", name="examination_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Examination();
        $form   = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Examination entity.
     *
     * @Route("/{id}", name="examination_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('GEExaminationManageBundle:Examination')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Examination entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Examination entity.
     *
     * @Route("/{id}/edit", name="examination_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('GEExaminationManageBundle:Examination')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Examination entity.');
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
    * Creates a form to edit a Examination entity.
    *
    * @param Examination $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(Examination $entity)
    {
        $form = $this->createForm(new ExaminationType(), $entity, array(
            'action' => $this->generateUrl('examination_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->add('submit', 'submit', array('label' => '更新'));

        return $form;
    }
    /**
     * Edits an existing Examination entity.
     *
     * @Route("/{id}", name="examination_update")
     * @Method("PUT")
     * @Template("GEExaminationManageBundle:Examination:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('GEExaminationManageBundle:Examination')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Examination entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('examination_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a Examination entity.
     *
     * @Route("/{id}", name="examination_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('GEExaminationManageBundle:Examination')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Examination entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('examination'));
    }

    /**
     * Creates a form to delete a Examination entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('examination_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => '删除'))
            ->getForm()
        ;
    }
}
