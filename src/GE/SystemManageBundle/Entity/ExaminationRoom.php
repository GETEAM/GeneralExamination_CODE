<?php

namespace GE\SystemManageBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ExaminationRoom
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="GE\SystemManageBundle\Entity\ExaminationRoomRepository")
 */
class ExaminationRoom
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
     * @ORM\Column(name="RoomName", type="string", length=255)
     */
    private $roomName;

    /**
     * @var integer
     *
     * @ORM\Column(name="row", type="integer", length=255)
     */
    private $row;

    /**
     * @var integer
     *
     * @ORM\Column(name="col", type="integer", length=255)
     */
    private $col;

    /**
     * @var integer
     *
     * @ORM\Column(name="AvailableMachineNumber", type="integer", length=255)
     */
    private $availableMachineNumber;

    /**
     * @var string
     *
     * @ORM\Column(name="FaultMachine", type="string", length=255)
     */
    private $faultMachine;


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
     * Set roomName
     *
     * @param string $roomName
     *
     * @return ExaminationRoom
     */
    public function setRoomName($roomName)
    {
        $this->roomName = $roomName;

        return $this;
    }

    /**
     * Get roomName
     *
     * @return string
     */
    public function getRoomName()
    {
        return $this->roomName;
    }

    /**
     * Set row
     *
     * @param string $row
     *
     * @return ExaminationRoom
     */
    public function setRow($row)
    {
        $this->row = $row;

        return $this;
    }

    /**
     * Get row
     *
     * @return string
     */
    public function getRow()
    {
        return $this->row;
    }

    /**
     * Set col
     *
     * @param string $col
     *
     * @return ExaminationRoom
     */
    public function setCol($col)
    {
        $this->col = $col;

        return $this;
    }

    /**
     * Get col
     *
     * @return string
     */
    public function getCol()
    {
        return $this->col;
    }

    /**
     * Set availableMachineNumber
     *
     * @param string $availableMachineNumber
     *
     * @return ExaminationRoom
     */
    public function setAvailableMachineNumber($availableMachineNumber)
    {
        $this->availableMachineNumber = $availableMachineNumber;

        return $this;
    }

    /**
     * Get availableMachineNumber
     *
     * @return string
     */
    public function getAvailableMachineNumber()
    {
        return $this->availableMachineNumber;
    }

    /**
     * Set faultMachine
     *
     * @param string $faultMachine
     *
     * @return ExaminationRoom
     */
    public function setFaultMachine($faultMachine)
    {
        $this->faultMachine = $faultMachine;

        return $this;
    }

    /**
     * Get faultMachine
     *
     * @return string
     */
    public function getFaultMachine()
    {
        return $this->faultMachine;
    }
}

