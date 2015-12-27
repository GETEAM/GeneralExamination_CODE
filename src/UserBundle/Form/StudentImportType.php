<?php

namespace UserBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Doctrine\ORM\EntityRepository as EntityRepository; 
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Doctrine\Bundle\DoctrineBundle\Registry as Doctrine;

class StudentImportType extends AbstractType
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
            ->add('fileUrl', 'file', array(
                'label' => '文件位置：',
            ))
            ->add('import', 'submit', array('label' => '导入'))
            ->add('cancel', 'reset', array('label' => '取消'));
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
        return 'user_student_import';
    }
}