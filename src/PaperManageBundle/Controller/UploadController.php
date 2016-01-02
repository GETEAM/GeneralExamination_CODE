<?php

namespace PaperManageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\Validator\Constraints\Date;

/**
 * 文件上传 controller.
 *
 * @Route("/manage/upload")
 */
class UploadController extends Controller
{
    /**
     * 上传图片.
     *
     * @Route("/image", name="upload_image")
     * @Method("POST")
     */
    public function uploadImageAction(Request $request)
    {
        $file = $request->files->get('form')['fileUrl'];

        if(!is_dir("upload/image")){
            mkdir("upload/image");
        }

        $filename = explode(".", $file->getClientOriginalName());
        $extension = $filename[count($filename) - 1];
        $newefilename = (new \Datetime())->format('Ymd-H-i-s') . "_" . rand(1, 9999) . "." . $extension;

        $file->move("upload/image", $newefilename);

        $result = array(
            'success' => 1111
        );
        
        $response = new Response(json_encode($result));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}