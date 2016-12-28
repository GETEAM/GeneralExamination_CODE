<?php

namespace PaperManageBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class QuestionType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('questionTypeId')
            ->add('testModes')
            ->add('questionContent')
            ->add('score')
            ->add('usageCounter')
            ->add('createTime')
            ->add('questionDuration')
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'PaperManageBundle\Entity\question'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'papermanagebundle_question';
    }
}
