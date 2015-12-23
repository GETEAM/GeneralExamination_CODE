<?php

namespace UserBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class StudentNewType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('StudentName', 'text', array('label' => '姓名'))
            ->add('academicID', 'text', array('label' => '学院'))
            ->add('gradeID', 'text', array('label' => '年级'))
            ->add('save', 'submit', array('label' => '添加'));
    }

    /**
     * 继承fos_user_registration的表单***
     *
     * @return [type] [description]
     */
    public function getParent()
    {
        return 'fos_user_registration';
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
        return 'userbundle_Student_new';
    }
}