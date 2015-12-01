<?php

namespace ManageBundle\SystemManagementBundle\GradeInformationBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class GradeInformationType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('grade')
            ->add('description')
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ManageBundle\SystemManagementBundle\GradeInformationBundle\Entity\GradeInformation'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'managebundle_systemmanagementbundle_gradeinformationbundle_gradeinformation';
    }
}
