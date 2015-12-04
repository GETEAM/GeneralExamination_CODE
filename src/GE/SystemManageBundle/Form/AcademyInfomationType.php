<?php

namespace GE\SystemManageBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class AcademyInfomationType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('academyID', 'text', array('label' => '学院代号'))
            ->add('academyName', 'text', array('label' => '学院名称'))
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'GE\SystemManageBundle\Entity\AcademyInfomation'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'GE_systemmanagebundle_academyinfomation';
    }
}
