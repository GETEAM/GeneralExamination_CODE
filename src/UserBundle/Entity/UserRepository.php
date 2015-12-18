<?php

namespace GE\UserBundle\Entity;

use Doctrine\ORM\EntityRepository;

class UserRepository extends \Doctrine\ORM\EntityRepository
{
	public function findAllTeacherByAuthority()
    {
        return $this->getEntityManager()
            ->createQuery(
                'SELECT p FROM UserBundle:User p ORDER BY p.authority TEACHER'
            )
            ->getResult();
    }

    public function findAllStudentByAuthority()
    {
        return $this->getEntityManager()
            ->createQuery(
                'SELECT p FROM UserBundle:User p ORDER BY p.authority STUDENT'
            )
            ->getResult();
    }	

    public function findOneUserByUserID($UserID)
    {
        return $this->getEntityManager()
            ->createQuery(
                'SELECT p FROM UserBundle:User p ORDER BY p.UserID $UserID'
            )
            ->getResult();
    }
    public function findOneUserByUserName($UserName)
    {
        return $this->getEntityManager()
            ->createQuery(
                'SELECT p FROM UserBundle:User p ORDER BY p.UserID $UserName'
            )
            ->getResult();
    }	
    public function findAllStudentByGread($gradeID)
    {
        return $this->getEntityManager()
            ->createQuery(
                'SELECT p FROM UserBundle:User p ORDER BY p.gradeID $gradeID'
            )
            ->getResult();
    }
}
