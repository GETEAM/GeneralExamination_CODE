<?php

namespace UserBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Doctrine\ORM\EntityRepository as EntityRepository; 
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Doctrine\Bundle\DoctrineBundle\Registry as Doctrine;

class StudentNewType extends AbstractType
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
            ->add('student_id', 'text', array('label' => '学号'))
            ->add('name', 'text', array('label' => '姓名'))
            ->add('email', 'text', array('label' => '邮箱'))
            ->add('telephone', 'text', array('label' => '电话'))
            ->add('password', 'text', array('label' => '密码'))
            ->add('grade', 'entity', array(
                'label' => '年级',
                'class' => 'SystemManageBundle:Grade',
                'query_builder' => function (EntityRepository $er) {
                    return $er->createQueryBuilder('g')
                        ->orderBy('g.description', 'ASC');
                }
            ))
            ->add('academy', 'entity', array(
                'label' => '学院',
                'class' => 'SystemManageBundle:Academy',
                'query_builder' => function (EntityRepository $er) {
                    return $er->createQueryBuilder('a')
                        ->orderBy('a.academyName', 'ASC');
                }
            ))
            ->add('save', 'submit', array('label' => '添加'));
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