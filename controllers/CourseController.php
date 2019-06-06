<?php


require_once 'framework/Controller.php';
//require_once 'services/CourseService.php';
require_once 'services/AddressService.php';


class CourseController extends Controller
{

    public function __construct(){
        $this->addView('script',null);
    }

    public function index(){

        $this->addView($this->action, []);


        $this->loadTemplate(parent::getTemplateData(),$this->action);



        $routeState=array(
            "deleted",
            "created",
            "validated",
            "finished"
        );

    }

}