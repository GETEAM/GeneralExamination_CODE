<?php

namespace PaperManageBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Paper
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="PaperManageBundle\Entity\PaperRepository")
 */
class Paper
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
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var array
     *
     * @ORM\Column(name="testModes", type="array")
     */
    private $testModes;

    /**
     * @var array
     *
     * @ORM\Column(name="groupWay", type="array")
     */
    private $groupWay;

    /**
     * @var string
     *
     * @ORM\Column(name="groupUser", type="string",length=255)
     */
    private $groupUser;

    /**
     * @var boolean
     *
     * @ORM\Column(name="isPublic", type="boolean")
     */
    private $isPublic;

    /**
     * @var integer
     *
     * @ORM\Column(name="duration", type="integer")
     */
    private $duration;

    /**
     * @var integer
     *
     * @ORM\Column(name="score", type="integer")
     */
    private $score;

    /**
     * @var array
     *
     * @ORM\Column(name="content", type="json_array")
     */
    private $content;

    /**
     * @var integer
     *
     * @ORM\Column(name="usageCounter", type="integer")
     */
    private $usageCounter;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createTime", type="datetime")
     */
    private $createTime;


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
     * Set name
     *
     * @param string $name
     *
     * @return Paper
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set testModes
     *
     * @param array $testModes
     *
     * @return Paper
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
     * Set groupWay
     *
     * @param array $groupWay
     *
     * @return Paper
     */
    public function setGroupWay($groupWay)
    {
        $this->groupWay = $groupWay;

        return $this;
    }

    /**
     * Get groupWay
     *
     * @return array
     */
    public function getGroupWay()
    {
        return $this->groupWay;
    }

    /**
     * Set groupUser
     *
     * @param string $groupUser
     *
     * @return Paper
     */
    public function setGroupUser($groupUser)
    {
        $this->groupUser = $groupUser;

        return $this;
    }

    /**
     * Get groupUser
     *
     * @return string
     */
    public function getGroupUser()
    {
        return $this->groupUser;
    }

    /**
     * Set isPublic
     *
     * @param boolean $isPublic
     *
     * @return Paper
     */
    public function setIsPublic($isPublic)
    {
        $this->isPublic = $isPublic;

        return $this;
    }

    /**
     * Get isPublic
     *
     * @return boolean
     */
    public function getIsPublic()
    {
        return $this->isPublic;
    }

    /**
     * Set duration
     *
     * @param integer $duration
     *
     * @return Paper
     */
    public function setDuration($duration)
    {
        $this->duration = $duration;

        return $this;
    }

    /**
     * Get duration
     *
     * @return integer
     */
    public function getDuration()
    {
        return $this->duration;
    }

    /**
     * Set content
     *
     * @param array $content
     *
     * @return Paper
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get content
     *
     * @return array
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Set usageCounter
     *
     * @param integer $usageCounter
     *
     * @return Paper
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
     * @return Paper
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
     * Set score
     *
     * @param integer $score
     *
     * @return Paper
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
}
