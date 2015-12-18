<?php

namespace SystemManageBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ExaminationRoomEditType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('roomName', 'text', array('label' => '考场名称'))
            ->add('row', 'number', array('label' => '机器行列数'))
            ->add('col', 'number', array('label' => ' x '))
            ->add('availableMachineNumber', 'text', array('label' => '可用机器数'))
            ->add('faultMachine', 'text', array('label' => '故障机器'))
            ->add('save', 'submit', array('label' => '修改')); 
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'SystemManageBundle\Entity\ExaminationRoom'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'systemmanage_examinationroom_edit';
    }
}
