<?php

namespace GE\UserBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class UserType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name','text',array('label' => '教师姓名'))
            ->add('telephone','text',array('label' => '教师电话'))
            ->add('authority','text',array('label' => '教师权限'))
        ;
    }
 

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'GE\UserBundle\Entity\Manager'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'ge_userbundle_user';
    }
}
