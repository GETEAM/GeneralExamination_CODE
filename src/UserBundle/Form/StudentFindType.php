<?php

namespace UserBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Doctrine\ORM\EntityRepository as EntityRepository; 
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Doctrine\Bundle\DoctrineBundle\Registry as Doctrine;

class StudentFindType extends AbstractType
{

    /** @var \Doctrine\ORM\EntityManager */
    public $em;

    /**
     * Constructor
     * 
     * @param Doctrine $doctrine
     */
    public function __construct(Doctrine $doctrine)
    {
        $this->em = $doctrine->getManager();
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('student_id', 'text', array('label' => '学号', 'required' => false))
            ->add('name', 'text', array('label' => '姓名','required' => false))
            ->add('grade', 'entity', array(
                'placeholder' => '选择年级',
                'label' => '年级',
                'class' => 'SystemManageBundle:Grade',
                'query_builder' => function (EntityRepository $er) {
                    return $er->createQueryBuilder('g')
                        ->orderBy('g.description', 'ASC');
                },
                'required' => false
            ))
            ->add('academy', 'entity', array(
                'placeholder' => '选择学院',
                'label' => '学院',
                'class' => 'SystemManageBundle:Academy',
                'query_builder' => function (EntityRepository $er) {
                    return $er->createQueryBuilder('a')
                        ->orderBy('a.academyName', 'ASC');
                },
                'required' => false
            ))
            ->add('save', 'submit', array('label' => '查找'));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'UserBundle\Entity\Student'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'user_student_new';
    }
}