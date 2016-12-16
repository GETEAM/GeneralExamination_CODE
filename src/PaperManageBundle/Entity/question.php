<?php

namespace PaperManageBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * question
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="PaperManageBundle\Entity\questionRepository")
 */
class question
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
     * @var array
     *
     * @ORM\Column(name="test_modes", type="json_array")
     */
    private $testModes;

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
     * @return question
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
     * Set testModes
     *
     * @param array $testModes
     *
     * @return question
     */
    public function setTestModes($testModes)
    {
        $this->testModes = $testModes;

        return $this;
    }

    /**
     * Get testModes
     *
     * @return array
     */
    public function getTestModes()
    {
        return $this->testModes;
    }

    /**
     * Set questionContent
     *
     * @param array $questionContent
     *
     * @return question
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
     * @return question
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
     * @return question
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
     * @return question
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
     * @return question
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
}

