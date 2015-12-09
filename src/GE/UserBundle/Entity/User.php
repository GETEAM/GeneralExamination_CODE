<?php

namespace GE\UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;

/**
 * User
 *
 * @ORM\Table(name="fos_user")
 * @ORM\Entity
 */
class User extends BaseUser
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
     * @ORM\Column(name="UserID", type="string", length=255)
     */
    private $UserID;

    /**
     * @var string
     *
     * @ORM\Column(name="UserName", type="string", length=255)
     */
    private $UserName;

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
     * @var integer
     *
     * @ORM\Column(name="Telenumber", type="integer")
     */
    private $telenumber;
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
     * Set userID
     *
     * @param string $userID
     *
     * @return User
     */
    public function setUserID($userID)
    {
        $this->UserID = $userID;

        return $this;
    }

    /**
     * Get userID
     *
     * @return string
     */
    public function getUserID()
    {
        return $this->UserID;
    }

    /**
     * Set academicID
     *
     * @param string $academicID
     *
     * @return User
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
     * @return User
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

    /**
     * Set telenumber
     *
     * @param integer $telenumber
     *
     * @return User
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
     * Set authority
     *
     * @param string $authority
     *
     * @return User
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
