<?php


require_once 'framework/Controller.php';
require_once 'services/LocalService.php';
require_once 'services/AddressService.php';


class AdminbasketsController extends Controller
{

    private $arrBasketStatus;
    private $arrBasketRole;
    private $arrProductConditions;

    public function __construct(){

        $this->arrBasketStatus=["pending","validated","affected","canceled","transit","delivered","refused"];
        $this->arrBasketRole=["import","export"];
        $this->arrProductConditions=["good","average","bad"];
    }

    public function index(){

        $this->addView($this->action,["arrBasketStatus"=>$this->arrBasketStatus,"arrBasketRole"=>$this->arrBasketRole, "arrProductConditions"=>$this->arrProductConditions]);

        $this->addView('script',array("gMapApiKey"=>Configuration::get("gMapApiKey")));

        $this->loadTemplate(parent::getTemplateData(),$this->action);
    }

    public function collapsedAddressRow(){
        $this->loadView($this->action);
    }

    public function collapsedProductRow(){
        $this->loadView($this->action,["arrProductConditions"=>$this->arrProductConditions]);
    }

    public function productRow(){
        $this->loadView($this->action);
    }

    public function basketRow(){
        $this->loadView($this->action,["arrBasketStatus"=>$this->arrBasketStatus,"arrBasketRole"=>$this->arrBasketRole]);
    }

    public function localRow(){
        $this->loadView($this->action);
    }

}