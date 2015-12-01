<?php

namespace ManageBundle\SystemManagementBundle\AcademyBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="@Academy")
     * @Template()
     */
    public function indexAction()
    {
        return array();
    }
}
