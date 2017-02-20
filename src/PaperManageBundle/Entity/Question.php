<?php

namespace PaperManageBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Question
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="PaperManageBundle\Entity\QuestionRepository")
 */
class Question
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
     * @var integer
     *
     * @ORM\Column(name="question_type_id", type="integer")
     */
    private $questionTypeId;

    /**
     * @var string
     *
     * @ORM\Column(name="question_name", type="string")
     */
    private $questionName;

    /**
     * @var array
     *
     * @ORM\Column(name="question_content", type="json_array")
     */
    private $questionContent;

    /**
     * @var integer
     *
     * @ORM\Column(name="score", type="integer")
     */
    private $score;

    /**
     * @var integer
     *
     * @ORM\Column(name="usage_counter", type="integer")
     */
    private $usageCounter;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="create_time", type="datetime")
     */
    private $createTime;

    /**
     * @var integer
     *
     * @ORM\Column(name="question_duration", type="integer")
     */
    private $questionDuration;

    /**
     * @ORM\ManyToOne(targetEntity="QuestionType", inversedBy="questions")
     * @var QuestionType
     */
    protected $questionType;


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
     * Set questionTypeId
     *
     * @param integer $questionTypeId
     *
     * @return Question
     */
    public function setQuestionTypeId($questionTypeId)
    {
        $this->questionTypeId = $questionTypeId;

        return $this;
    }

    /**
     * Get questionTypeId
     *
     * @return integer
     */
    public function getQuestionTypeId()
    {
        return $this->questionTypeId;
    }

    /**
     * Set questionContent
     *
     * @param array $questionContent
     *
     * @return Question
     */
    public function setQuestionContent($questionContent)
    {
        $this->questionContent = $questionContent;

        return $this;
    }

    /**
     * Get questionContent
     *
     * @return array
     */
    public function getQuestionContent()
    {
        return $this->questionContent;
    }

    /**
     * Set score
     *
     * @param integer $score
     *
     * @return Question
     */
    public function setScore($score)
    {
        $this->score = $score;

        return $this;
    }

    /**
     * Get score
     *
     * @return integer
     */
    public function getScore()
    {
        return $this->score;
    }

    /**
     * Set usageCounter
     *
     * @param integer $usageCounter
     *
     * @return Question
     */
    public function setUsageCounter($usageCounter)
    {
        $this->usageCounter = $usageCounter;

        return $this;
    }

    /**
     * Get usageCounter
     *
     * @return integer
     */
    public function getUsageCounter()
    {
        return $this->usageCounter;
    }

    /**
     * Set createTime
     *
     * @param \DateTime $createTime
     *
     * @return Question
     */
    public function setCreateTime($createTime)
    {
        $this->createTime = $createTime;

        return $this;
    }

    /**
     * Get createTime
     *
     * @return \DateTime
     */
    public function getCreateTime()
    {
        return $this->createTime;
    }

    /**
     * Set questionDuration
     *
     * @param integer $questionDuration
     *
     * @return Question
     */
    public function setQuestionDuration($questionDuration)
    {
        $this->questionDuration = $questionDuration;

        return $this;
    }

    /**
     * Get questionDuration
     *
     * @return integer
     */
    public function getQuestionDuration()
    {
        return $this->questionDuration;
    }

    /**
     * Set questionType
     *
     * @param \PaperManageBundle\Entity\QuestionType $questionType
     *
     * @return Question
     */
    public function setQuestionType(\PaperManageBundle\Entity\QuestionType $questionType = null)
    {
        $this->questionType = $questionType;

        return $this;
    }

    /**
     * Get questionType
     *
     * @return \PaperManageBundle\Entity\QuestionType
     */
    public function getQuestionType()
    {
        return $this->questionType;
    }

    /**
     * Set questionName
     *
     * @param string $questionName
     *
     * @return Question
     */
    public function setQuestionName($questionName)
    {
        $this->questionName = $questionName;

        return $this;
    }

    /**
     * Get questionName
     *
     * @return string
     */
    public function getQuestionName()
    {
        return $this->questionName;
    }
}
