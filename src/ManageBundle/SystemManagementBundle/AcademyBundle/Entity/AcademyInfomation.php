<?php

namespace ManageBundle\SystemManagementBundle\AcademyBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AcademyInfomation
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="ManageBundle\SystemManagementBundle\AcademyBundle\Entity\AcademyInfomationRepository")
 */
class AcademyInfomation
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
     * @return AcademyInfomation
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
     * @return AcademyInfomation
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
}

