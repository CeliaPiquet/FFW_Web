<?php

require_once 'framework/Controller.php';
require_once 'framework/Configuration.php';
require_once 'services/CompanyService.php';
require_once 'services/SkillService.php';
require_once 'services/AddressService.php';
require_once 'models/Company.php';
require_once 'models/User.php';
require_once 'models/CompleteSkill.php';
require_once 'models/Address.php';

class AdminusersController extends Controller
{
    private $user;

    public function __construct(){
        if(!session_id()){
            session_start();
        }
        $this->user=isset($_SESSION['user'])?unserialize($_SESSION['user']):NULL;
    }

    public function index() {

        $skillsManager = SkillService::getInstance();

        $arrSkills=$skillsManager->getAll("enabled");

        $arrRights=array(
            0=>"Deleted",
            1=>"Just created",
            2=>"Volunteer",
            3=>"Adherent",
            4=>"Company",
            5=>"Stock, collect and vehicles admin ",
            6=>"Subscription admin",
            7=>"Events and articles admin",
            8=>"Volunteers and employees admin"
        );
        $arrSkillsStatus=array(
            "deleted",
            "refused",
            "activated",
            "pending activate",
            "pending delete"
        );


        $this->addView($this->action,array("arrSkills"=>$arrSkills,"arrRights"=>$arrRights, "arrSkillsStatus"=>$arrSkillsStatus));
        $this->addView('script',array());


        $this->loadTemplate(parent::getTemplateData(),$this->action);

    }

    public function companyRow(){
        $this->loadView($this->action);
    }

    public function userRow(){
        $this->loadView($this->action);
    }

    public function collapsedAddressRow(){
        $this->loadView($this->action);
    }
}