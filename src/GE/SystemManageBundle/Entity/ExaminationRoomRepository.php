<?php

namespace GE\SystemManageBundle\Entity;

use Doctrine\ORM\EntityRepository;
/**
 * ExaminationRoomRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ExaminationRoomRepository extends \Doctrine\ORM\EntityRepository
{
	public function delete($id)
    {
        // $grade = $this-> find($id);  
        // $this->getEntityManager()->remove($grade);
        // $this->getEntityManager()->flush();
        $examination = $this->find($id);
        if (!$examination) {
            throw $this->createNotFoundException('Unable to find ExaminationRoom entity.');
        }
        $this->getEntityManager()->remove($examination);
        $this->getEntityManager()->flush();
    }	
}
