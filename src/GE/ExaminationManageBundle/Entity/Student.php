<?php

namespace GE\ExaminationManageBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Student
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="GE\ExaminationManageBundle\Entity\StudentRepository")
 */
class Student
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
     * @ORM\Column(name="StudentID", type="string", length=255)
     */
    private $studentID;

    /**
     * @var string
     *
     * @ORM\Column(name="StudentName", type="string", length=255)
     */
    private $studentName;

    /**
     * @var string
     *
     * @ORM\Column(name="StudentEmail", type="string", length=255)
     */
    private $studentEmail;

    /**
     * @var string
     *
     * @ORM\Column(name="StudentPassword", type="string", length=255)
     */
    private $studentPassword;

    /**
     * @var string
     *
     * @ORM\Column(name="academicID", type="string", length=255)
     */
    private $academicID;

    /**
     * @var integer
     *
     * @ORM\Column(name="gradeID", type="integer")
     */
    private $gradeID;


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
     * Set studentID
     *
     * @param string $studentID
     *
     * @return Student
     */
    public function setStudentID($studentID)
    {
        $this->studentID = $studentID;

        return $this;
    }

    /**
     * Get studentID
     *
     * @return string
     */
    public function getStudentID()
    {
        return $this->studentID;
    }

    /**
     * Set studentName
     *
     * @param string $studentName
     *
     * @return Student
     */
    public function setStudentName($studentName)
    {
        $this->studentName = $studentName;

        return $this;
    }

    /**
     * Get studentName
     *
     * @return string
     */
    public function getStudentName()
    {
        return $this->studentName;
    }

    /**
     * Set studentEmail
     *
     * @param string $studentEmail
     *
     * @return Student
     */
    public function setStudentEmail($studentEmail)
    {
        $this->studentEmail = $studentEmail;

        return $this;
    }

    /**
     * Get studentEmail
     *
     * @return string
     */
    public function getStudentEmail()
    {
        return $this->studentEmail;
    }

    /**
     * Set studentPassword
     *
     * @param string $studentPassword
     *
     * @return Student
     */
    public function setStudentPassword($studentPassword)
    {
        $this->studentPassword = $studentPassword;

        return $this;
    }

    /**
     * Get studentPassword
     *
     * @return string
     */
    public function getStudentPassword()
    {
        return $this->studentPassword;
    }

    /**
     * Set academicID
     *
     * @param string $academicID
     *
     * @return Student
     */
    public function setAcademicID($academicID)
    {
        $this->academicID = $academicID;

        return $this;
    }

    /**
     * Get academicID
     *
     * @return string
     */
    public function getAcademicID()
    {
        return $this->academicID;
    }

    /**
     * Set gradeID
     *
     * @param integer $gradeID
     *
     * @return Student
     */
    public function setGradeID($gradeID)
    {
        $this->gradeID = $gradeID;

        return $this;
    }

    /**
     * Get gradeID
     *
     * @return integer
     */
    public function getGradeID()
    {
        return $this->gradeID;
    }
}

