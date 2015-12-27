<?php

namespace PaperManageBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * QuestionBank
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="PaperManageBundle\Entity\QuestionBankRepository")
 */
class QuestionBank
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="stem", type="string", length=255)
     */
    private $stem;

    /**
     * @var integer
     *
     * @ORM\Column(name="length", type="integer")
     */
    private $length;

    /**
     * @var string
     *
     * @ORM\Column(name="options", type="string", length=255)
     */
    private $options;

    /**
     * @var boolean
     *
     * @ORM\Column(name="shuffle", type="boolean")
     */
    private $shuffle;

    /**
     * @var boolean
     *
     * @ORM\Column(name="preShow", type="boolean")
     */
    private $preShow;

    /**
     * @var string
     *
     * @ORM\Column(name="questions", type="string", length=65535)
     */
    private $questions;


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set stem
     *
     * @param string $stem
     *
     * @return QuestionBank
     */
    public function setStem($stem)
    {
        $this->stem = $stem;

        return $this;
    }

    /**
     * Get stem
     *
     * @return string
     */
    public function getStem()
    {
        return $this->stem;
    }

    /**
     * Set length
     *
     * @param integer $length
     *
     * @return QuestionBank
     */
    public function setLength($length)
    {
        $this->length = $length;

        return $this;
    }

    /**
     * Get length
     *
     * @return integer
     */
    public function getLength()
    {
        return $this->length;
    }

    /**
     * Set options
     *
     * @param string $options
     *
     * @return QuestionBank
     */
    public function setOptions($options)
    {
        $this->options = $options;

        return $this;
    }

    /**
     * Get options
     *
     * @return string
     */
    public function getOptions()
    {
        return $this->options;
    }

    /**
     * Set shuffle
     *
     * @param boolean $shuffle
     *
     * @return QuestionBank
     */
    public function setShuffle($shuffle)
    {
        $this->shuffle = $shuffle;

        return $this;
    }

    /**
     * Get shuffle
     *
     * @return boolean
     */
    public function getShuffle()
    {
        return $this->shuffle;
    }

    /**
     * Set preShow
     *
     * @param boolean $preShow
     *
     * @return QuestionBank
     */
    public function setPreShow($preShow)
    {
        $this->preShow = $preShow;

        return $this;
    }

    /**
     * Get preShow
     *
     * @return boolean
     */
    public function getPreShow()
    {
        return $this->preShow;
    }

    /**
     * Set questions
     *
     * @param string $questions
     *
     * @return QuestionBank
     */
    public function setQuestions($questions)
    {
        $this->questions = $questions;

        return $this;
    }

    /**
     * Get questions
     *
     * @return string
     */
    public function getQuestions()
    {
        return $this->questions;
    }
}

