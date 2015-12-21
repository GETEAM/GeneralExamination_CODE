<?php

namespace UserBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ManagerEditType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username', 'text', array('label' => '教师工号'))
            ->add('name', 'text', array('label' => '姓名'))
            ->add('email', 'text', array('label' => '电子邮箱'))
            ->add('telephone', 'text', array('label' => '电话'))
            ->add('roles', 'choice', array(
            	'label' => '权限',
            	'choices' => array(
            		'ROLE_SYSTEM_MANAGER' => '系统管理员',
            		'ROLE_SECRETARY' => '考务员',
            		'ROLE_TEACHER' => '英语教师',
            		'ROLE_MONITOR' => '调度员',
            		'ROLE_QUESTIONS_MANAGER' => '题库管理员'
            	),
            	'expanded' => true,
            	'multiple' => true
            ))
            ->add('save', 'submit', array('label' => '修改'));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'UserBundle\Entity\Manager'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'userbundle_manager_new';
    }
}