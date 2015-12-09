<?php

namespace GE\ExaminationManageBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Examination
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="GE\ExaminationManageBundle\Entity\ExaminationRepository")
 */
class Examination
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
     * @ORM\Column(name="TestName", type="string", length=255)
     */
    private $testName;

    /**
     * @var string
     *
     * @ORM\Column(name="TestState", type="string", length=255)
     */
    private $testState;

    /**
     * @var string
     *
     * @ORM\Column(name="TestTime", type="string", length=255)
     */
    private $testTime;


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
     * Set testName
     *
     * @param string $testName
     *
     * @return Examination
     */
    public function setTestName($testName)
    {
        $this->testName = $testName;

        return $this;
    }

    /**
     * Get testName
     *
     * @return string
     */
    public function getTestName()
    {
        return $this->testName;
    }

    /**
     * Set testState
     *
     * @param string $testState
     *
     * @return Examination
     */
    public function setTestState($testState)
    {
        $this->testState = $testState;

        return $this;
    }

    /**
     * Get testState
     *
     * @return string
     */
    public function getTestState()
    {
        return $this->testState;
    }

    /**
     * Set testTime
     *
     * @param string $testTime
     *
     * @return Examination
     */
    public function setTestTime($testTime)
    {
        $this->testTime = $testTime;

        return $this;
    }

    /**
     * Get testTime
     *
     * @return string
     */
    public function getTestTime()
    {
        return $this->testTime;
    }
}

