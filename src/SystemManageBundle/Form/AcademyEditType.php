<?php

namespace SystemManageBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class AcademyEditType extends AbstractType
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
            'data_class' => 'SystemManageBundle\Entity\Academy'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'systemmanage_academy_edit';
    }
}
