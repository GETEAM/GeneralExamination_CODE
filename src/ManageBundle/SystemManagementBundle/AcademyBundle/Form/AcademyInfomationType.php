<?php

namespace ManageBundle\SystemManagementBundle\AcademyBundle\Form;

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
            ->add('academyID')
            ->add('academyName')
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ManageBundle\SystemManagementBundle\AcademyBundle\Entity\AcademyInfomation'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'managebundle_systemmanagementbundle_academybundle_academyinfomation';
    }
}
