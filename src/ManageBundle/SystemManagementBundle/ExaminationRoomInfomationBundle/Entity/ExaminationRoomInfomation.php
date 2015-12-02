<?php

namespace ManageBundle\SystemManagementBundle\ExaminationRoomInfomationBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ExaminationRoomInfomation
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="ManageBundle\SystemManagementBundle\ExaminationRoomInfomationBundle\Entity\ExaminationRoomInfomationRepository")
 */
class ExaminationRoomInfomation
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
     * @var string
     *
     * @ORM\Column(name="row", type="string", length=255)
     */
    private $row;

    /**
     * @var string
     *
     * @ORM\Column(name="list", type="string", length=255)
     */
    private $list;

    /**
     * @var string
     *
     * @ORM\Column(name="AvailableMachineNumber", type="string", length=255)
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
     * @return ExaminationRoomInfomation
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
     * @return ExaminationRoomInfomation
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
     * Set list
     *
     * @param string $list
     *
     * @return ExaminationRoomInfomation
     */
    public function setList($list)
    {
        $this->list = $list;

        return $this;
    }

    /**
     * Get list
     *
     * @return string
     */
    public function getList()
    {
        return $this->list;
    }

    /**
     * Set availableMachineNumber
     *
     * @param string $availableMachineNumber
     *
     * @return ExaminationRoomInfomation
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
     * @return ExaminationRoomInfomation
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

