<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class AppController extends Controller
{
    /**
     * 管理端首页
     * @Route("/manage", name="manage")
     */
    public function manageAction(Request $request)
    {
        return $this->render(':manage:manage_index.html.twig');
    }
}
