<?php

namespace GE\SystemManageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use GE\SystemManageBundle\Entity\Academy;
use GE\SystemManageBundle\Form\AcademyType;

/**
 * Academy controller.
 *
 * @Route("/academy")
 */
class AcademyController extends Controller
{

    /**
     * Lists all Academy entities.
     *
     * @Route("/", name="academy")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('GESystemManageBundle:Academy')->findAll();

        return array(
            'entities' => $entities,
        );
    }
    /**
     * Creates a new Academy entity.
     *
     * @Route("/", name="academy_create")
     * @Method("POST")
     * @Template("GESystemManageBundle:Academy:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new Academy();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('academy_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a form to create a Academy entity.
     *
     * @param Academy $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(Academy $entity)
    {
        $form = $this->createForm(new AcademyType(), $entity, array(
            'action' => $this->generateUrl('academy_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => '创建'));

        return $form;
    }

    /**
     * Displays a form to create a new Academy entity.
     *
     * @Route("/new", name="academy_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Academy();
        $form   = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Academy entity.
     *
     * @Route("/{id}", name="academy_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('GESystemManageBundle:Academy')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Academy entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Academy entity.
     *
     * @Route("/{id}/edit", name="academy_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('GESystemManageBundle:Academy')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Academy entity.');
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
    * Creates a form to edit a Academy entity.
    *
    * @param Academy $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(Academy $entity)
    {
        $form = $this->createForm(new AcademyType(), $entity, array(
            'action' => $this->generateUrl('academy_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->add('submit', 'submit', array('label' => '更新'));

        return $form;
    }
    /**
     * Edits an existing Academy entity.
     *
     * @Route("/{id}", name="academy_update")
     * @Method("PUT")
     * @Template("GESystemManageBundle:Academy:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('GESystemManageBundle:Academy')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Academy entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('academy_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a Academy entity.
     *
     * @Route("/delete/{id}", name="academy_delete")
     * @Method("GET")
     */
    public function deleteAction(Request $request, $id)
    {
        if ($id) {
            $academyid = $this->getDoctrine()->getRepository('GESystemManageBundle:Academy')->delete($id);
        }
        return $this->redirect($this->generateUrl('academy'));
    }

    /**
     * Creates a form to delete a Academy entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('academy_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => '删除'))
            ->getForm()
        ;
    }
}
