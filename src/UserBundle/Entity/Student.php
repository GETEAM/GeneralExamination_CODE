<?php

namespace UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;

/**
 * Student
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="UserBundle\Entity\StudentRepository")
 */
class Student  extends BaseUser
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    /**
     * @var string
     *
     * @ORM\Column(name="StudentID", type="string", length=255)
     */
    private $StudentID;

    /**
     * @var string
     *
     * @ORM\Column(name="StudentName", type="string", length=255)
     */
    private $StudentName;

    /**
     * @var string
     *
     * @ORM\Column(name="Email", type="string", length=255)
     */
    private $Email;

    /**
     * @var string
     *
     * @ORM\Column(name="Password", type="string", length=255)
     */
    private $Password;

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
     * Set StudentID
     *
     * @param string $StudentID
     *
     * @return Student
     */
    public function setStudentID($StudentID)
    {
        $this->StudentID = $StudentID;

        return $this;
    }

    /**
     * Get StudentID
     *
     * @return string
     */
    public function getStudentID()
    {
        return $this->StudentID;
    }

     /**
     * Set StudentName
     *
     * @param string $StudentName
     *
     * @return Student
     */
    public function setStudentName($StudentName)
    {
        $this->StudentName = $StudentName;

        return $this;
    }

    /**
     * Get StudentName
     *
     * @return string
     */
    public function getStudentName()
    {
        return $this->StudentName;
    } 
}
