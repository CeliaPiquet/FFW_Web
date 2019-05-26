<?php

require_once 'framework/Controller.php';
require_once 'framework/Configuration.php';
require_once 'services/CompanyService.php';
require_once 'services/SkillService.php';
require_once 'services/AddressService.php';
require_once 'models/Company.php';
require_once 'models/User.php';
require_once 'models/Skill.php';
require_once 'models/Address.php';

class AdminusersController extends Controller
{
    private $user;

    public function __construct(){
        if(!isset($_SESSION)||empty($_SESSION)){
            session_start();
        }
        $this->user=isset($_SESSION['user'])?unserialize($_SESSION['user']):NULL;
    }

    public function index() {

//        $usersManager = UserService::getInstance();




        //List with mail
        //List skills
        //

//        $addressManager=AddressService::getInstance();
//        $address=$addressManager->getOneById($this->user->getAddressId());
//
        $this->addView($this->action,array());
//        $this->addView('script',array("gMapApiKey"=>Configuration::get("gMapApiKey")));
//
//
        $this->loadTemplate(parent::getTemplateData(),$this->action);

    }

}