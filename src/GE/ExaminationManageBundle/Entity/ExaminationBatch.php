<?php

namespace GE\ExaminationManageBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ExaminationBatch
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="GE\ExaminationManageBundle\Entity\ExaminationBatchRepository")
 */
class ExaminationBatch
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
     * @ORM\Column(name="ExaminationID", type="integer")
     */
    private $examinationID;

    /**
     * @var integer
     *
     * @ORM\Column(name="RoomID", type="integer")
     */
    private $roomID;

    /**
     * @var integer
     *
     * @ORM\Column(name="PaperID", type="integer")
     */
    private $paperID;

    /**
     * @var string
     *
     * @ORM\Column(name="StarTime", type="string", length=255)
     */
    private $starTime;

    /**
     * @var string
     *
     * @ORM\Column(name="EndTime", type="string", length=255)
     */
    private $endTime;

    /**
     * @var string
     *
     * @ORM\Column(name="DegreeState", type="string", length=255)
     */
    private $degreeState;

    /**
     * @var integer
     *
     * @ORM\Column(name="TeacherID", type="integer")
     */
    private $teacherID;

    /**
     * @var string
     *
     * @ORM\Column(name="StudentNum", type="string", length=255)
     */
    private $studentNum;


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
     * Set examinationID
     *
     * @param integer $examinationID
     *
     * @return ExaminationBatch
     */
    public function setExaminationID($examinationID)
    {
        $this->examinationID = $examinationID;

        return $this;
    }

    /**
     * Get examinationID
     *
     * @return integer
     */
    public function getExaminationID()
    {
        return $this->examinationID;
    }

    /**
     * Set roomID
     *
     * @param integer $roomID
     *
     * @return ExaminationBatch
     */
    public function setRoomID($roomID)
    {
        $this->roomID = $roomID;

        return $this;
    }

    /**
     * Get roomID
     *
     * @return integer
     */
    public function getRoomID()
    {
        return $this->roomID;
    }

    /**
     * Set paperID
     *
     * @param integer $paperID
     *
     * @return ExaminationBatch
     */
    public function setPaperID($paperID)
    {
        $this->paperID = $paperID;

        return $this;
    }

    /**
     * Get paperID
     *
     * @return integer
     */
    public function getPaperID()
    {
        return $this->paperID;
    }

    /**
     * Set starTime
     *
     * @param string $starTime
     *
     * @return ExaminationBatch
     */
    public function setStarTime($starTime)
    {
        $this->starTime = $starTime;

        return $this;
    }

    /**
     * Get starTime
     *
     * @return string
     */
    public function getStarTime()
    {
        return $this->starTime;
    }

    /**
     * Set endTime
     *
     * @param string $endTime
     *
     * @return ExaminationBatch
     */
    public function setEndTime($endTime)
    {
        $this->endTime = $endTime;

        return $this;
    }

    /**
     * Get endTime
     *
     * @return string
     */
    public function getEndTime()
    {
        return $this->endTime;
    }

    /**
     * Set degreeState
     *
     * @param string $degreeState
     *
     * @return ExaminationBatch
     */
    public function setDegreeState($degreeState)
    {
        $this->degreeState = $degreeState;

        return $this;
    }

    /**
     * Get degreeState
     *
     * @return string
     */
    public function getDegreeState()
    {
        return $this->degreeState;
    }

    /**
     * Set teacherID
     *
     * @param integer $teacherID
     *
     * @return ExaminationBatch
     */
    public function setTeacherID($teacherID)
    {
        $this->teacherID = $teacherID;

        return $this;
    }

    /**
     * Get teacherID
     *
     * @return integer
     */
    public function getTeacherID()
    {
        return $this->teacherID;
    }

    /**
     * Set studentNum
     *
     * @param string $studentNum
     *
     * @return ExaminationBatch
     */
    public function setStudentNum($studentNum)
    {
        $this->studentNum = $studentNum;

        return $this;
    }

    /**
     * Get studentNum
     *
     * @return string
     */
    public function getStudentNum()
    {
        return $this->studentNum;
    }
}

