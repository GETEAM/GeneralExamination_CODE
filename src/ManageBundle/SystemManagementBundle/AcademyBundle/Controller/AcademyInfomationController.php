<?php

namespace ManageBundle\SystemManagementBundle\AcademyBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use ManageBundle\SystemManagementBundle\AcademyBundle\Entity\AcademyInfomation;
use ManageBundle\SystemManagementBundle\AcademyBundle\Form\AcademyInfomationType;

/**
 * AcademyInfomation controller.
 *
 * @Route("/academyinfomation")
 */
class AcademyInfomationController extends Controller
{

    /**
     * Lists all AcademyInfomation entities.
     *
     * @Route("/", name="academyinfomation")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('ManageBundleSystemManagementBundleAcademyBundle:AcademyInfomation')->findAll();

        return array(
            'entities' => $entities,
        );
    }
    /**
     * Creates a new AcademyInfomation entity.
     *
     * @Route("/", name="academyinfomation_create")
     * @Method("POST")
     * @Template("ManageBundleSystemManagementBundleAcademyBundle:AcademyInfomation:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new AcademyInfomation();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('academyinfomation_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a form to create a AcademyInfomation entity.
     *
     * @param AcademyInfomation $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(AcademyInfomation $entity)
    {
        $form = $this->createForm(new AcademyInfomationType(), $entity, array(
            'action' => $this->generateUrl('academyinfomation_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new AcademyInfomation entity.
     *
     * @Route("/new", name="academyinfomation_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new AcademyInfomation();
        $form   = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a AcademyInfomation entity.
     *
     * @Route("/{id}", name="academyinfomation_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ManageBundleSystemManagementBundleAcademyBundle:AcademyInfomation')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find AcademyInfomation entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing AcademyInfomation entity.
     *
     * @Route("/{id}/edit", name="academyinfomation_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ManageBundleSystemManagementBundleAcademyBundle:AcademyInfomation')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find AcademyInfomation entity.');
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
    * Creates a form to edit a AcademyInfomation entity.
    *
    * @param AcademyInfomation $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(AcademyInfomation $entity)
    {
        $form = $this->createForm(new AcademyInfomationType(), $entity, array(
            'action' => $this->generateUrl('academyinfomation_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->add('submit', 'submit', array('label' => 'Update'));

        return $form;
    }
    /**
     * Edits an existing AcademyInfomation entity.
     *
     * @Route("/{id}", name="academyinfomation_update")
     * @Method("PUT")
     * @Template("ManageBundleSystemManagementBundleAcademyBundle:AcademyInfomation:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ManageBundleSystemManagementBundleAcademyBundle:AcademyInfomation')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find AcademyInfomation entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('academyinfomation_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a AcademyInfomation entity.
     *
     * @Route("/{id}", name="academyinfomation_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ManageBundleSystemManagementBundleAcademyBundle:AcademyInfomation')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find AcademyInfomation entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('academyinfomation'));
    }

    /**
     * Creates a form to delete a AcademyInfomation entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('academyinfomation_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm()
        ;
    }
}
