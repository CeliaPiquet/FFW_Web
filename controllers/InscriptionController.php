<?php

require_once 'framework/Controller.php';
require_once 'framework/Configuration.php';
require_once 'services/UserService.php';
require_once 'services/AddressService.php';
require_once 'services/CompanyService.php';
require_once 'services/LocalService.php';
require_once 'models/User.php';
require_once 'models/Address.php';

class InscriptionController extends Controller {



    public function index() {

        $this->addView($this->action,null);


        $this->addView('script',array("gMapApiKey"=>Configuration::get("gMapApiKey")));

        $this->loadTemplate(parent::getTemplateData(),$this->action);

    }

    // Ajoute un commentaire sur un billet
    public function controlForm() {


        $websiteRoot = Configuration::get("websiteRoot", "/");
        $arrUserAddress=$this->getRequest()->getArrParameters();

        if($arrUserAddress["password"]!=$arrUserAddress["passwordConfirm"]){
            header("Location:$websiteRoot/inscription/error");
        }

        $user=new User($arrUserAddress);
        $address=new Address($arrUserAddress);

        $addressManager=AddressService::getInstance();
        $userManager=UserService::getInstance();

        $address=$addressManager->gMapGeolocate($address);
        $address=$addressManager->createOne($address);


        if(isset($address) && !empty($address)){
            $user->setAddressId($address->getAdId());
        }

        $user=$userManager->create($user);

        if(isset($user) && !empty($user)){
            session_start();
            $_SESSION['user']=serialize($user);
            header("Location:$websiteRoot/inscription/accountChoice");
        }
        else{
            header("Location:$websiteRoot/home/noInscription");
        }
    }

    public function accountChoice() {

        $this->addView($this->action,null);
//        $this->addView('script',null);

        $this->loadTemplate(parent::getTemplateData(),$this->action);

    }


    public function volunteer() {


        $websiteRoot = Configuration::get("websiteRoot", "/");
        $arrChoice=$this->getRequest()->getArrParameters();


//        $user=new User($arrUserAddress);
//        $address=new Address($arrUserAddress);
//
//        $addressManager=AddressService::getInstance();
//        $userManager=UserService::getInstance();
//
//        $address=$addressManager->createOne($address);
//
//        if(isset($address) && !empty($address)){
//            $user->setAddressId($address->getAdId());
//        }
//
//        $user=$userManager->create($user);
//
//        if(isset($user) && !empty($user)){
//            session_start();
//            $_SESSION['user']=serialize($user);
//            header("Location:$websiteRoot/inscription/accountChoice");
//        }
//        else{
//            header("Location:$websiteRoot/home/noInscription");
//        }

    }

    public function subscriber() {

    }


    public function error() {

        $this->addView($this->action,null);

        $this->loadTemplate(parent::getTemplateData(),$this->action);

    }


}