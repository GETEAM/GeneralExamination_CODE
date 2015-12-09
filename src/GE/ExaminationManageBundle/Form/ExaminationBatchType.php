<?php

namespace GE\ExaminationManageBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ExaminationBatchType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('examinationID')
            ->add('roomID')
            ->add('paperID')
            ->add('starTime')
            ->add('endTime')
            ->add('degreeState')
            ->add('teacherID')
            ->add('studentNum')
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'GE\ExaminationManageBundle\Entity\ExaminationBatch'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'ge_examinationmanagebundle_examinationbatch';
    }
}
