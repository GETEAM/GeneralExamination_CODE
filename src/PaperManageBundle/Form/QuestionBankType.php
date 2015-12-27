<?php

namespace PaperManageBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class QuestionBankType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('stem')
            ->add('length')
            ->add('options')
            ->add('shuffle')
            ->add('preShow')
            ->add('questions')
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'PaperManageBundle\Entity\QuestionBank'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'papermanagebundle_questionbank';
    }
}
