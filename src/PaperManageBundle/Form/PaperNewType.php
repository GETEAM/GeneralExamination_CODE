<?php

namespace PaperManageBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;


class PaperNewType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name','text', array('label' => '试卷名'))
            ->add('testModes', 'choice', array(
                'label' => '测试模式',
                'choices' => array(
                    'strictMode' => '严格模式','practiceMode' =>'练习模式' ),
                'expanded' => true,
                'multiple' => false,
                'data' => 'strictMode'
                ))
            ->add('groupWay', 'choice', array(
                'label' => '组卷方式',
                'choices' =>array(
                    'artificial' => '手动组卷','automatic' =>'自动组卷'),
                'expanded' => true,
                'multiple' => false,
                'data' => 'artificial'
                ))
            ->add('groupUser', 'text', array('label' => '出卷人'))
            ->add('isPublic', null, array('label' => '对外可见'))
            ->add('duration','text', array('label' => '试卷时长'))
            ->add('score','text', array('label' => '试卷分值'))
            ->add('content','textarea', array('label' => '试卷json'))
            ->add('usageCounter', 'text', array('label' => '使用次数'))
            ->add('createTime', 'date',array('label' => '出题时间'))
            ->add('save', 'submit', array('label' => '添加试卷'));
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'PaperManageBundle\Entity\Paper'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'papermanagebundle_paper';
    }
}
