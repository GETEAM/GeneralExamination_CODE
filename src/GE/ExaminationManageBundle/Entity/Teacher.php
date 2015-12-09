<?php

namespace GE\ExaminationManageBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Teacher
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="GE\ExaminationManageBundle\Entity\TeacherRepository")
 */
class Teacher
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
     * @ORM\Column(name="TeacherID", type="string", length=255)
     */
    private $teacherID;

    /**
     * @var string
     *
     * @ORM\Column(name="Teachername", type="string", length=255)
     */
    private $teachername;

    /**
     * @var integer
     *
     * @ORM\Column(name="Telenumber", type="integer")
     */
    private $telenumber;

    /**
     * @var string
     *
     * @ORM\Column(name="TeacherMail", type="string", length=255)
     */
    private $teacherMail;

    /**
     * @var string
     *
     * @ORM\Column(name="TeacherPassword", type="string", length=255)
     */
    private $teacherPassword;

    /**
     * @var string
     *
     * @ORM\Column(name="Authority", type="string", length=255)
     */
    private $authority;


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
     * Set teacherID
     *
     * @param string $teacherID
     *
     * @return Teacher
     */
    public function setTeacherID($teacherID)
    {
        $this->teacherID = $teacherID;

        return $this;
    }

    /**
     * Get teacherID
     *
     * @return string
     */
    public function getTeacherID()
    {
        return $this->teacherID;
    }

    /**
     * Set teachername
     *
     * @param string $teachername
     *
     * @return Teacher
     */
    public function setTeachername($teachername)
    {
        $this->teachername = $teachername;

        return $this;
    }

    /**
     * Get teachername
     *
     * @return string
     */
    public function getTeachername()
    {
        return $this->teachername;
    }

    /**
     * Set telenumber
     *
     * @param integer $telenumber
     *
     * @return Teacher
     */
    public function setTelenumber($telenumber)
    {
        $this->telenumber = $telenumber;

        return $this;
    }

    /**
     * Get telenumber
     *
     * @return integer
     */
    public function getTelenumber()
    {
        return $this->telenumber;
    }

    /**
     * Set teacherMail
     *
     * @param string $teacherMail
     *
     * @return Teacher
     */
    public function setTeacherMail($teacherMail)
    {
        $this->teacherMail = $teacherMail;

        return $this;
    }

    /**
     * Get teacherMail
     *
     * @return string
     */
    public function getTeacherMail()
    {
        return $this->teacherMail;
    }

    /**
     * Set teacherPassword
     *
     * @param string $teacherPassword
     *
     * @return Teacher
     */
    public function setTeacherPassword($teacherPassword)
    {
        $this->teacherPassword = $teacherPassword;

        return $this;
    }

    /**
     * Get teacherPassword
     *
     * @return string
     */
    public function getTeacherPassword()
    {
        return $this->teacherPassword;
    }

    /**
     * Set authority
     *
     * @param string $authority
     *
     * @return Teacher
     */
    public function setAuthority($authority)
    {
        $this->authority = $authority;

        return $this;
    }

    /**
     * Get authority
     *
     * @return string
     */
    public function getAuthority()
    {
        return $this->authority;
    }
}

