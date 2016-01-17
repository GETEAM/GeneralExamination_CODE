<?php

namespace PaperManageBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class QuestionTypeNewType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('nameEn', 'text', array('label' => '类型名(英文)'))
            ->add('nameCh', 'text', array('label' => '类型名(中文)'))
            ->add('flowable', 'choice', array(
                'label' => '流程性试题',
                'choices' => array(
                    '1' => '是',
                    '0' => '否'
                ),
                'expanded' => true,
                'multiple' => false
                ))
            ->add('questionsNumLimit', 'choice', array(
                'label' => '限制小题数量',
                'choices' => array(
                    '1' => '是',
                    '0' => '否'
                ),
                'expanded' => true,
                'multiple' => false
                ))
            ->add('description', 'textarea', array('label' => '题型描述'))
            ->add('structure', 'textarea', array('label' => '类型结构'))
            ->add('save', 'submit', array('label' => '添加题型'));
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'PaperManageBundle\Entity\QuestionType'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'papermanage_question_type_new';
    }
}
