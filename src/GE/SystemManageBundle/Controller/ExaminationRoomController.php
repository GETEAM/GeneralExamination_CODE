<?php

namespace GE\SystemManageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use GE\SystemManageBundle\Entity\ExaminationRoom;
use GE\SystemManageBundle\Form\ExaminationRoomType;

/**
 * ExaminationRoom controller.
 *
 * @Route("/examinationroom")
 */
class ExaminationRoomController extends Controller
{

    /**
     * Lists all ExaminationRoom entities.
     *
     * @Route("/", name="examinationroom")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('GESystemManageBundle:ExaminationRoom')->findAll();

        return array(
            'entities' => $entities,
        );
    }
    /**
     * Creates a new ExaminationRoom entity.
     *
     * @Route("/", name="examinationroom_create")
     * @Method("POST")
     * @Template("GESystemManageBundle:ExaminationRoom:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new ExaminationRoom();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('examinationroom_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a form to create a ExaminationRoom entity.
     *
     * @param ExaminationRoom $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(ExaminationRoom $entity)
    {
        $form = $this->createForm(new ExaminationRoomType(), $entity, array(
            'action' => $this->generateUrl('examinationroom_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new ExaminationRoom entity.
     *
     * @Route("/new", name="examinationroom_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new ExaminationRoom();
        $form   = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a ExaminationRoom entity.
     *
     * @Route("/{id}", name="examinationroom_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('GESystemManageBundle:ExaminationRoom')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find ExaminationRoom entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing ExaminationRoom entity.
     *
     * @Route("/{id}/edit", name="examinationroom_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('GESystemManageBundle:ExaminationRoom')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find ExaminationRoom entity.');
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
    * Creates a form to edit a ExaminationRoom entity.
    *
    * @param ExaminationRoom $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(ExaminationRoom $entity)
    {
        $form = $this->createForm(new ExaminationRoomType(), $entity, array(
            'action' => $this->generateUrl('examinationroom_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->add('submit', 'submit', array('label' => 'Update'));

        return $form;
    }
    /**
     * Edits an existing ExaminationRoom entity.
     *
     * @Route("/{id}", name="examinationroom_update")
     * @Method("PUT")
     * @Template("GESystemManageBundle:ExaminationRoom:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('GESystemManageBundle:ExaminationRoom')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find ExaminationRoom entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('examinationroom_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a ExaminationRoom entity.
     *
     * @Route("/{id}", name="examinationroom_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('GESystemManageBundle:ExaminationRoom')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find ExaminationRoom entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('examinationroom'));
    }

    /**
     * Creates a form to delete a ExaminationRoom entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('examinationroom_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm()
        ;
    }
}
