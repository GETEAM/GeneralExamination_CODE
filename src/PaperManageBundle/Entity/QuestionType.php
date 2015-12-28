<?php

namespace PaperManageBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * QuestionType
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="PaperManageBundle\Entity\QuestionTypeRepository")
 */
class QuestionType
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
     * @ORM\Column(name="name_en", type="string", length=255)
     */
    private $nameEn;

    /**
     * @var string
     *
     * @ORM\Column(name="name_ch", type="string", length=255)
     */
    private $nameCh;

    /**
     * @var array
     *
     * @ORM\Column(name="structure", type="json_array")
     */
    private $structure;


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
     * Set nameEn
     *
     * @param string $nameEn
     *
     * @return QuestionType
     */
    public function setNameEn($nameEn)
    {
        $this->nameEn = $nameEn;

        return $this;
    }

    /**
     * Get nameEn
     *
     * @return string
     */
    public function getNameEn()
    {
        return $this->nameEn;
    }

    /**
     * Set nameCh
     *
     * @param string $nameCh
     *
     * @return QuestionType
     */
    public function setNameCh($nameCh)
    {
        $this->nameCh = $nameCh;

        return $this;
    }

    /**
     * Get nameCh
     *
     * @return string
     */
    public function getNameCh()
    {
        return $this->nameCh;
    }

    /**
     * Set structure
     *
     * @param array $structure
     *
     * @return QuestionType
     */
    public function setStructure($structure)
    {
        $this->structure = $structure;

        return $this;
    }

    /**
     * Get structure
     *
     * @return array
     */
    public function getStructure()
    {
        return $this->structure;
    }
}
