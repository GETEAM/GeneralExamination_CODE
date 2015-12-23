<?php

namespace UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Student
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="UserBundle\Entity\StudentRepository")
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
     * @ORM\Column(name="student_id", type="string", length=255)
     */
    private $studentId;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=255)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="telephone", type="string", length=255)
     */
    private $telephone;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=255)
     */
    private $password;

    /**
     * @ORM\ManyToOne(targetEntity="\SystemManageBundle\Entity\Grade", inversedBy="students")
     * @ORM\JoinColumn(name="grade_id", referencedColumnName="id")
     */
    protected $grade;

    /**
     * @ORM\ManyToOne(targetEntity="\SystemManageBundle\Entity\Academy", inversedBy="students")
     * @ORM\JoinColumn(name="academy_id", referencedColumnName="id")
     */
    protected $academy;


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
     * Set studentId
     *
     * @param string $studentId
     *
     * @return Student
     */
    public function setStudentId($studentId)
    {
        $this->studentId = $studentId;

        return $this;
    }

    /**
     * Get studentId
     *
     * @return string
     */
    public function getStudentId()
    {
        return $this->studentId;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Student
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
     * Set email
     *
     * @param string $email
     *
     * @return Student
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set telephone
     *
     * @param string $telephone
     *
     * @return Student
     */
    public function setTelephone($telephone)
    {
        $this->telephone = $telephone;

        return $this;
    }

    /**
     * Get telephone
     *
     * @return string
     */
    public function getTelephone()
    {
        return $this->telephone;
    }

    /**
     * Set password
     *
     * @param string $password
     *
     * @return Student
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set grade
     *
     * @param \SystemManageBundle\Entity\Grade $grade
     *
     * @return Student
     */
    public function setGrade(\SystemManageBundle\Entity\Grade $grade = null)
    {
        $this->grade = $grade;

        return $this;
    }

    /**
     * Get grade
     *
     * @return \SystemManageBundle\Entity\Grade
     */
    public function getGrade()
    {
        return $this->grade;
    }

    /**
     * Set academy
     *
     * @param \SystemManageBundle\Entity\Academy $academy
     *
     * @return Student
     */
    public function setAcademy(\SystemManageBundle\Entity\Academy $academy = null)
    {
        $this->academy = $academy;

        return $this;
    }

    /**
     * Get academy
     *
     * @return \SystemManageBundle\Entity\Academy
     */
    public function getAcademy()
    {
        return $this->academy;
    }
}
