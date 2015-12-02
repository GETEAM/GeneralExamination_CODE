<?php

namespace ManageBundle\SystemManagementBundle\ExaminationRoomInfomationBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ExaminationRoomInfomationType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('roomName')
            ->add('row')
            ->add('list')
            ->add('availableMachineNumber')
            ->add('faultMachine')
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ManageBundle\SystemManagementBundle\ExaminationRoomInfomationBundle\Entity\ExaminationRoomInfomation'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'managebundle_systemmanagementbundle_examinationroominfomationbundle_examinationroominfomation';
    }
}
