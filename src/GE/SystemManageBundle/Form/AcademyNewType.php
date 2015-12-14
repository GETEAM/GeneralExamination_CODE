<?php

namespace GE\SystemManageBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class AcademyNewType extends AbstractType
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
            ->add('save', 'submit', array('label' => '修改'));
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'GE\SystemManageBundle\Entity\Academy'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'ge_systemmanage_academy_new';
    }
}
