<?php


require_once 'framework/Controller.php';
require_once 'services/VehicleService.php';

class AdmincoursesController extends Controller
{

    private $arrRouteState;
    private $arrBasketRole;
    private $arrBasketStatus;

    public function __construct(){
        $this->addView('script',array("gMapApiKey"=>Configuration::get("gMapApiKey")));
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
        $this->arrBasketStatus=array(
            "validated",
            "canceled"
        );
    }

    public function index(){

        $vehiclesManager=VehicleService::getInstance();
        $arrVehicles=$vehiclesManager->getAll();

        $this->addView($this->action, ["arrRouteState"=>$this->arrRouteState,"arrVehicles"=>$arrVehicles,"arrBasketRole"=>$this->arrBasketRole,"arrBasketStatus"=>$this->arrBasketStatus]);

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

    public function usersTable(){
        $this->loadView($this->action);
    }
    public function userRow(){
        $this->loadView($this->action);
    }

    public function externalsTable(){
        $this->loadView($this->action);
    }
    public function externalRow(){
        $this->loadView($this->action);
    }

    public function companiesTable(){
        $this->loadView($this->action);
    }
    public function companyRow(){
        $this->loadView($this->action);
    }

    public function vehiclesTable(){
        $this->loadView($this->action);
    }
    public function vehicleRow(){
        $this->loadView($this->action);
    }


    public function localRow(){
        $this->loadView($this->action);
    }
    public function collapsedBasketDestRow(){
        $this->loadView($this->action);
    }

    public function collapsedBasketRow(){
        $this->loadView($this->action);
    }
}