<?php


require_once 'framework/Controller.php';
require_once 'services/LocalService.php';
require_once 'services/AddressService.php';


class LocalController extends Controller
{

    public function __construct(){
        $this->addView('script',null);
    }

    public function index(){


        $localManager=LocalService::getInstance();
        $addressManager=AddressService::getInstance();

        $arrLocals=$localManager->getAll();

        foreach ($arrLocals as $key => $local){
            $address=$addressManager->getOneById($local->getAdid());
            $arrLocals[$key]->setAddress($address);
        }
        $this->addView($this->getAction(),array("arrLocals"=>$arrLocals));
        $this->loadTemplate(parent::getTemplateData(),$this->action);
    }

    public function getLocalCardByLocalId(){

        $localManager=LocalService::getInstance();
        $addressManager=AddressService::getInstance();

        $local=$localManager->getAll();

        $address=$addressManager->getOneById($local->getAdid());
        $local->setAddress($address);

        $this->addView($this->getAction(),array('local'=>$local));

    }
//    public function index(){
//
//
//        $localManager=LocalService::getInstance();
//        $addressManager=AddressService::getInstance();
//
//        $arrLocals=$localManager->getAllLocal();
//
//        foreach ($arrLocals as $key => $local){
//            $address=$addressManager->getOneById($local->getAdid());
//            $arrLocals[$key]->setAddress($address);
//        }
//        $this->addView($this->getAction(),array("arrLocals"=>$arrLocals));
//        $this->loadTemplate(parent::getTemplateData(),$this->action);
//    }

}