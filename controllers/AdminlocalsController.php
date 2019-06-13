<?php


require_once 'framework/Controller.php';
require_once 'services/LocalService.php';
require_once 'services/AddressService.php';


class AdminlocalsController extends Controller
{

    public function __construct(){
        $this->addView('script',null);
    }

    public function index(){

        $this->addView($this->action);
        $this->addView('script',array("gMapApiKey"=>Configuration::get("gMapApiKey")));



        $this->loadTemplate(parent::getTemplateData(),$this->action);

    }

    public function collapsedAddressRow(){
        $this->loadView($this->action);
    }

    public function localRow(){
        $this->loadView($this->action);
    }
    public function roomRow(){
        $this->loadView($this->action);
    }
    public function collapsedRoomRow(){
        $this->loadView($this->action);
    }

//    public function index(){
//
//
//        $localManager=LocalService::getInstance();
//        $addressManager=AddressService::getInstance();
//
//        $arrLocals=$localManager->getAllLocal();
//
//        foreach ($arrLocals as $key => $adminlocals){
//            $address=$addressManager->getOneById($adminlocals->getAdid());
//            $arrLocals[$key]->setAddress($address);
//        }
//        $this->addView($this->getAction(),array("arrLocals"=>$arrLocals));
//        $this->loadTemplate(parent::getTemplateData(),$this->action);
//    }

}