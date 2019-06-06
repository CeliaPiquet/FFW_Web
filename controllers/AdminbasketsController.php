<?php


require_once 'framework/Controller.php';
require_once 'services/LocalService.php';
require_once 'services/AddressService.php';


class AdminbasketsController extends Controller
{

    public function __construct(){
//        $this->addView('script',null);
    }

    public function index(){

        $arrBasketStatus=["pending","validated","canceled","transit","delivered"];
        $arrBasketRole=["import","export"];
        $arrProductConditions=["good","average","bad"];

        $this->addView($this->action,["arrBasketStatus"=>$arrBasketStatus,"arrBasketRole"=>$arrBasketRole, "arrProductConditions"=>$arrProductConditions]);

        $this->addView('script',array("gMapApiKey"=>Configuration::get("gMapApiKey")));

        $this->loadTemplate(parent::getTemplateData(),$this->action);
    }

    public function collapsedAddressRow(){
        $this->loadView([],$this->action);
    }

    public function productRow(){
        $this->loadView([],$this->action);
    }

    public function localRow(){
        $this->loadView([],$this->action);
    }

}