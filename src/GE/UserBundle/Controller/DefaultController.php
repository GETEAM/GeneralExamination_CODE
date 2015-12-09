<?php
namespace GE\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\Security\Core\SecurityContext;

class DefaultController extends Controller
{
    /**
     * @Route("/login", name="@Login")
     * @Template()
     */
    public function loginAction()
    {
        $request = $this->getRequest();
        $session = $request->getSession();
        $csrfToken = $this->get('form.csrf_provider')->generateCsrfToken('authenticate');
        $error = $session->get(SecurityContext::AUTHENTICATION_ERROR);
        return array(
            'csrfToken' => $csrfToken,
            'lastUsername' => $session->get(SecurityContext::LAST_USERNAME),
            'error' => ($error?$error->getMessage():null),
        );
    }
}