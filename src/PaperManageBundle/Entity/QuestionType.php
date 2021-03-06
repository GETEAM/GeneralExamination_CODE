<?php

namespace PaperManageBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\OneToMany;

/**
 * QuestionType
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="PaperManageBundle\Entity\QuestionTypeRepository")
 */
class QuestionType
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
     * @ORM\Column(name="name_en", type="string", unique=true, length=255)
     */
    private $nameEn;

    /**
     * @var string
     *
     * @ORM\Column(name="name_ch", type="string", length=255)
     */
    private $nameCh;

    /**
     * @var boolean
     *
     * @ORM\Column(name="shuffle", type="boolean")
     */
    private $shuffle;

    /**
     * @var boolean
     *
     * @ORM\Column(name="flowable", type="boolean")
     */
    private $flowable;

    /**
     * @var array
     *
     * @ORM\Column(name="structure", type="json_array")
     */
    private $structure;

    /**
     * @var text
     *
     * @ORM\Column(name="description", type="text")
     */
    private $description;

    /**
     * @var Question
     *
     * @ORM\OneToMany(targetEntity="Question", mappedBy="questionType")
     */
    protected $questions;


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
     * Set nameEn
     *
     * @param string $nameEn
     *
     * @return QuestionType
     */
    public function setNameEn($nameEn)
    {
        $this->nameEn = $nameEn;

        return $this;
    }

    /**
     * Get nameEn
     *
     * @return string
     */
    public function getNameEn()
    {
        return $this->nameEn;
    }

    /**
     * Set nameCh
     *
     * @param string $nameCh
     *
     * @return QuestionType
     */
    public function setNameCh($nameCh)
    {
        $this->nameCh = $nameCh;

        return $this;
    }

    /**
     * Get nameCh
     *
     * @return string
     */
    public function getNameCh()
    {
        return $this->nameCh;
    }

    /**
     * Set structure
     *
     * @param array $structure
     *
     * @return QuestionType
     */
    public function setStructure($structure)
    {
        $this->structure = $structure;

        return $this;
    }

    /**
     * Get structure
     *
     * @return array
     */
    public function getStructure()
    {
        return $this->structure;
    }

    /**
     * Set flowable
     *
     * @param boolean $flowable
     *
     * @return QuestionType
     */
    public function setFlowable($flowable)
    {
        $this->flowable = $flowable;

        return $this;
    }

    /**
     * Get flowable
     *
     * @return boolean
     */
    public function getFlowable()
    {
        return $this->flowable;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return QuestionType
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set shuffle
     *
     * @param boolean $shuffle
     *
     * @return QuestionType
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
     * Constructor
     */
    public function __construct()
    {
        $this->questions = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add question
     *
     * @param \PaperManageBundle\Entity\Question $question
     *
     * @return QuestionType
     */
    public function addQuestion(\PaperManageBundle\Entity\Question $question)
    {
        $this->questions[] = $question;

        return $this;
    }

    /**
     * Remove question
     *
     * @param \PaperManageBundle\Entity\Question $question
     */
    public function removeQuestion(\PaperManageBundle\Entity\Question $question)
    {
        $this->questions->removeElement($question);
    }

    /**
     * Get questions
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getQuestions()
    {
        return $this->questions;
    }
}
