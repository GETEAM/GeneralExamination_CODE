<?php

namespace PaperManageBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class QuestionNewType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('questionName','text', array('label' => '试题名称'))
            ->add('questionTypeId','text',array('label' => '试题类型'))
            ->add('questionContent','textarea', array('label' => '试题结构'))
            ->add('score','text',array('label' => '分值'))
            ->add('usageCounter','text',array('label' => '使用次数'))
            ->add('createTime','date',array('label' => '出题时间'))
            ->add('questionDuration','text',array('label' => '试题用时'))
            ->add('save','submit',array('label' => '添加试题'));
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'PaperManageBundle\Entity\Question'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'papermanage_question_new';
    }
}
