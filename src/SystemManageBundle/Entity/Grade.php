<?php

namespace SystemManageBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Grade
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="SystemManageBundle\Entity\GradeRepository")
 */
class Grade
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
     * @ORM\Column(name="grade", type="string", length=255)
     */
    private $grade;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=255)
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity="\UserBundle\Entity\Student", mappedBy="grade")
     */
    protected $students;

    public function __construct()
    {
        $this->students = new ArrayCollection();
    }

    public function __toString()
    {
        return (string) $this->getDescription();
    }

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
     * Set grade
     *
     * @param string $grade
     *
     * @return Grade
     */
    public function setGrade($grade)
    {
        $this->grade = $grade;

        return $this;
    }

    /**
     * Get grade
     *
     * @return string
     */
    public function getGrade()
    {
        return $this->grade;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Grade
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
     * Add student
     *
     * @param \UserBundle\Entity\Student $student
     *
     * @return Grade
     */
    public function addStudent(\UserBundle\Entity\Student $student)
    {
        $this->students[] = $student;

        return $this;
    }

    /**
     * Remove student
     *
     * @param \UserBundle\Entity\Student $student
     */
    public function removeStudent(\UserBundle\Entity\Student $student)
    {
        $this->students->removeElement($student);
    }

    /**
     * Get students
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getStudents()
    {
        return $this->students;
    }
}
