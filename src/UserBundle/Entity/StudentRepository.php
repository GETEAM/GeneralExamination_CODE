<?php

namespace UserBundle\Entity;

/**
 * StudentRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class StudentRepository extends \Doctrine\ORM\EntityRepository
{
	//添加/编辑单个学生(编辑学生时的操作和添加学生相似)
    public function add($student) {
    	$em = $this->getEntityManager();
        $em->persist($student);
        $em->flush();
        return true;
    }

	//删除单个学生
    public function delete($id) {
    	$em = $this->getEntityManager();
        $student=$this->findOneById($id);
        $em->remove($student);
        $em->flush();
        return true;
    }

    //批量删除学生
    public function multiDelete($ids) {
    	foreach( $ids as $id ) {
    		$this->delete($id);
    	}
    	return true;
    }

    //根据学号，姓名，年级和学院查找到学生列表
    public function findStudent($studentId,$name,$grade,$academy){
       return $this->getEntityManager()
            ->createQuery('SELECT s, g, a FROM UserBundle:Student s
            JOIN s.grade g JOIN s.academy a
            WHERE s.studentId like :studentId AND s.name like :name AND g.description = :gradeDescript AND a.academyName = :academyName'
            )
            ->setParameter('studentId','%'.$studentId.'%')
            ->setParameter('name','%'.$name.'%')
            ->setParameter('gradeDescript',$gradeDescript)
            ->setParameter('academyName',$academyName)
            ->getResult();
    }

    //测试用的一个小方法
    public function findStudentById($studentId){
        return $this->getEntityManager()
            ->createQuery('SELECT s FROM UserBundle:Student s 
                WHERE s.studentId = :studentId '
                )
            ->setParameter('studentId',$studentId)
            ->getResult();
    }

    //测试用的一个小方法，根据年级查
    public function findStudentByGA($gradeDescript,$academyName){
        return $this->getEntityManager()
            ->createQuery('SELECT s, g, a FROM UserBundle:Student s
            JOIN s.grade g JOIN s.academy a
            WHERE g.description = :gradeDescript AND a.academyName = :academyName'
            )
            ->setParameter('gradeDescript',$gradeDescript)
            ->setParameter('academyName',$academyName)
            ->getResult();
    }

    //测试用的一个小方法，姓名不严格匹配
    public function findStudentByName($name){
        return $this->getEntityManager()
            ->createQuery('SELECT s FROM UserBundle:Student s
            WHERE s.name like :name'
            )
            ->setParameter('name','%'.$name.'%')
            ->getResult();
    }
}
