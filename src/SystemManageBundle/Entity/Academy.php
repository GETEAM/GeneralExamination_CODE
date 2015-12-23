<?php

namespace SystemManageBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Academy
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="SystemManageBundle\Entity\AcademyRepository")
 */
class Academy
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
     * @ORM\Column(name="AcademyID", type="string", length=255)
     */
    private $academyID;

    /**
     * @var string
     *
     * @ORM\Column(name="AcademyName", type="string", length=255)
     */
    private $academyName;

    /**
     * @ORM\OneToMany(targetEntity="\UserBundle\Entity\Student", mappedBy="academy")
     */
    protected $students;

    public function __construct()
    {
        $this->students = new ArrayCollection();
    }

    public function __toString()
    {
        return (string) $this->getAcademyName();
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
     * Set academyID
     *
     * @param string $academyID
     *
     * @return Academy
     */
    public function setAcademyID($academyID)
    {
        $this->academyID = $academyID;

        return $this;
    }

    /**
     * Get academyID
     *
     * @return string
     */
    public function getAcademyID()
    {
        return $this->academyID;
    }

    /**
     * Set academyName
     *
     * @param string $academyName
     *
     * @return Academy
     */
    public function setAcademyName($academyName)
    {
        $this->academyName = $academyName;

        return $this;
    }

    /**
     * Get academyName
     *
     * @return string
     */
    public function getAcademyName()
    {
        return $this->academyName;
    }

    /**
     * Add student
     *
     * @param \UserBundle\Entity\Student $student
     *
     * @return Academy
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
