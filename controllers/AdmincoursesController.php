<?php


require_once 'framework/Controller.php';
require_once 'services/VehicleService.php';

class AdmincoursesController extends Controller
{

    private $routeState;

    public function __construct(){
        $this->addView('script',null);
        $this->arrRouteState=array(
            "deleted",
            "created",
            "validated",
            "in progress",
            "finished"
        );
        $this->arrBasketRole=array(
            "import",
            "export"
        );
    }

    public function index(){

        $vehiclesManager=VehicleService::getInstance();
        $arrVehicles=$vehiclesManager->getAll();

        $this->addView($this->action, ["arrRouteState"=>$this->arrRouteState,"arrVehicles"=>$arrVehicles,"arrBasketRole"=>$this->arrBasketRole]);

        $this->loadTemplate(parent::getTemplateData(),$this->action);

    }

    public function basketRow(){
        $this->loadView($this->action);
    }

    public function courseRow(){
        $arrVehicles=VehicleService::getInstance()->getAll();

        $this->loadView($this->action, ["arrRouteState"=>$this->arrRouteState,"arrVehicles"=>$arrVehicles]);
    }

    public function collapsedAddressRow(){
        $this->loadView($this->action);
    }
}