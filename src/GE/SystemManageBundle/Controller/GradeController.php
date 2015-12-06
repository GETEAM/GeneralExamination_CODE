<?php

namespace GE\SystemManageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use GE\SystemManageBundle\Entity\Grade;
use GE\SystemManageBundle\Form\GradeType;

/**
 * Grade controller.
 *
 * @Route("/grade")
 */
class GradeController extends Controller
{

    /**
     * Lists all Grade entities.
     *
     * @Route("/", name="grade")
     * @Method("GET")
     * @Template("GESystemManageBundle:Grade:index.html.twig")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $grades = $em->getRepository('GESystemManageBundle:Grade')->findAll();

        return array(
            'grades' => $grades,
        );
    }
    /**
     * Creates a new Grade entity.
     *
     * @Route("/", name="grade_create")
     * @Method("POST")
     * @Template("GESystemManageBundle:Grade:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new Grade();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('grade_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a form to create a Grade entity.
     *
     * @param Grade $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(Grade $entity)
    {
        $form = $this->createForm(new GradeType(), $entity, array(
            'action' => $this->generateUrl('grade_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => '创建'));

        return $form;
    }

    /**
     * Displays a form to create a new Grade entity.
     *
     * @Route("/new", name="grade_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Grade();
        $form   = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Grade entity.
     *
     * @Route("/{id}", name="grade_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $grade = $em->getRepository('GESystemManageBundle:Grade')->find($id);

        if (!$grade) {
            throw $this->createNotFoundException('Unable to find Grade entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'grade'      => $grade,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Grade entity.
     *
     * @Route("/edit/{id}", name="grade_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $grade = $em->getRepository('GESystemManageBundle:Grade')->find($id);

        if (!$grade) {
            throw $this->createNotFoundException('Unable to find Grade entity.');
        }

        $editForm = $this->createEditForm($grade);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $grade,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
    * Creates a form to edit a Grade entity.
    *
    * @param Grade $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(Grade $entity)
    {
        $form = $this->createForm(new GradeType(), $entity, array(
            'action' => $this->generateUrl('grade_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->add('submit', 'submit', array('label' => '更新'));

        return $form;
    }
    /**
     * Edits an existing Grade entity.
     *
     * @Route("/{id}", name="grade_update")
     * @Method("PUT")
     * @Template("GESystemManageBundle:Grade:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $grade = $em->getRepository('GESystemManageBundle:Grade')->find($id);

        if (!$grade) {
            throw $this->createNotFoundException('Unable to find Grade entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($grade);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('grade'));
        }

        return array(
            'entity'      => $grade,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a Grade entity.
     *
     * @Route("/delete/{id}", name="grade_delete")
     * @Method("GET")
     */
   public function deleteAction(Request $request, $id)
    {
        if($id) {
            $greadid = $this->getDoctrine()->getRepository('GESystemManageBundle:Grade')->delete($id);
        }
        return $this->redirect($this->generateUrl('grade'));
    }

    /**
     * Creates a form to delete a Grade entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('grade_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => '删除'))
            ->getForm()
        ;
    }
}
