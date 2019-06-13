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
    }

    public function index(){

        $vehiclesManager=VehicleService::getInstance();
        $arrVehicles=$vehiclesManager->getAll();

//        var_dump($arrVehicles);
        $this->addView($this->action, ["arrRouteState"=>$this->arrRouteState,"arrVehicles"=>$arrVehicles]);

        $this->loadTemplate(parent::getTemplateData(),$this->action);

    }

    public function basketRow(){
        $this->loadView($this->action);
    }

    public function courseRow(){
        $this->loadView($this->action);
    }

    public function collapsedAddressRow(){
        $this->loadView($this->action);
    }
}