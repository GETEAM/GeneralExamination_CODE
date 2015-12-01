<?php

namespace ManageBundle\SystemManagementBundle\GradeInformationBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="@GradeInformation")
     * @Template()
     */
    public function indexAction()
    {
        return array();
    }
}
