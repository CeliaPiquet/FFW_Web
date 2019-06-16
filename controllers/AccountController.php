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

class AccountController extends Controller
{
    private $user;

    public function __construct(){
        $this->addView('navbar',null);

        if(!isset($_SESSION)||empty($_SESSION)){
            session_start();
        }
        $this->user=isset($_SESSION['user'])?unserialize($_SESSION['user']):NULL;
    }

    public function index() {

        $addressManager=AddressService::getInstance();
        $address=$addressManager->getOneById($this->user->getAddressId());

        if(!$address){
            $address=new Address();
        }

        $this->addView($this->action,array('user'=>$this->user,'address'=>$address));
        $this->addView('script',array("gMapApiKey"=>Configuration::get("gMapApiKey")));

//        var_dump($this->user);


        $this->loadTemplate(parent::getTemplateData(),$this->action);

    }
    public function company() {

        $companyManager=CompanyService::getInstance();
        $addressManager=AddressService::getInstance();

        $companies=$companyManager->getAllByUser($this->user->getUid());

        foreach($companies as $key=>$company){
            if($company->getStatus()==0||$company->getStatus()==null){
                unset($companies[$key]);
            }
            else{
                $company->setUserId($this->user->getUid());
                $company->setAddress($addressManager->getOneById($company->getAddressId()));
            }
        }
        $companies=array_values($companies);
        $this->addView($this->action,array('companies'=>json_encode($companies),'companiesCount'=>sizeof($companies),"userId"=>$this->user->getUid()));
        $this->addView('script',array("gMapApiKey"=>Configuration::get("gMapApiKey")));

        $this->loadTemplate(parent::getTemplateData(),$this->action);
    }

    public function companyAddressForm(){

        $this->loadView($this->action);

    }

    public function volunteer() {
        $this->volunteerEmployee();
    }
    public function employee(){
        $this->volunteerEmployee();
    }

    private function volunteerEmployee(){
        $skillManager=SkillService::getInstance();


        $arrSkills=$skillManager->getAll("enabled");
        $arrUserSkills=$skillManager->getAllByUser($this->user->getUid(),"enabled");


        $lightUser=array("uid"=>$this->user->getUid(),"email"=>$this->user->getEmail());

        $this->addView($this->action,array('userSkills'=>json_encode($arrUserSkills),'arrSkills'=>$arrSkills,"user"=>json_encode($lightUser)));
        $this->addView('script',array());
        $this->addView('head',array());

        $this->loadTemplate(parent::getTemplateData(),'volunteerEmployee');
    }
//    public function addCompanies(){
//
//        session_start();
//        $arrRequest=$this->getRequest()->getArrParameters();
//        $addressManager=AddressService::getInstance();
//        $companyManager=CompanyService::getInstance();
//
//        $i=0;
//
//        foreach($arrRequest["siret"] as $key=>$value){
//
//            $address=new Address(array(
//                    "streetAddress"=>$arrRequest["streetAddress"][$i],
//                    "cityName"=>$arrRequest["cityName"][$i],
//                    "cityCode"=>$arrRequest["cityCode"][$i],
//                    "country"=>$arrRequest["country"][$i])
//            );
//            $address=$addressManager->createOne($address);
//            $company=new Company(array(
//                    "siret"=>$arrRequest["siret"][$i],
//                    "name"=>$arrRequest["name"][$i],
//                    "addressId"=>$address->getAdid(),
//                    "userId"=>7)
//            );
//
////            var_dump($address);
////            var_dump($company);
//            $company=$companyManager->createOne($company);
//        }
//    }

//    public function getAllByUser(){
//
//
//        header('Content-Type: application/json');
//
//
//        if(!isset($_SESSION)||empty($_SESSION)){
//            session_start();
//        }
//        if(!isset($_SESSION['user'])||empty($_SESSION['user'])){
//            http_response_code(400);
//        }
//
//
//        $companyManager=CompanyService::getInstance();
//        $siren=$this->getRequest()->getParameterByName("id");
//
//
//        $companyList=$companyManager->getAllSiretBySiren($siren);
//        $companyList=json_encode($companyList);
//
//        if(isset($companyList)&&!empty($companyList)){
//            http_response_code(200);
//            echo $companyList;
//
//        }
//        else{
//            http_response_code(400);
//        }
//
//    }


}