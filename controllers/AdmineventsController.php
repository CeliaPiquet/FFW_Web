<?php
/**
 * Created by PhpStorm.
 * User: landulu
 * Date: 23/06/19
 * Time: 15:17
 */




require_once 'framework/Controller.php';

class AdmineventsController extends Controller
{

    public function __construct()
    {
        $this->addView('script');
    }


    private $arrEventState;



    public function index()
    {
        $this->addView($this->action, ["arrEventState"=>$this->arrEventState]);

        $this->loadTemplate(parent::getTemplateData(),$this->action);
    }
}