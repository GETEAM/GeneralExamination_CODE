<?php

namespace GE\SystemManageBundle\Form;

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
            ->add('roomName', 'text', array('label' => '考场名称'))
            ->add('row', 'text', array('label' => '机器行数'))
            ->add('list', 'text', array('label' => '机器列数'))
            ->add('availableMachineNumber', 'text', array('label' => '可用机器数'))
            ->add('faultMachine', 'text', array('label' => '故障机器'))
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
