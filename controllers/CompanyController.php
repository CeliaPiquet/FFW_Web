<?php

require_once 'framework/Controller.php';
require_once 'services/CompanyService.php';
require_once 'services/AddressService.php';
require_once 'models/Company.php';
require_once 'models/Address.php';

class CompanyController extends Controller
{

    public function index() {

//        $this->addView($this->action,null);
//
//        $this->loadTemplate(parent::getTemplateData(),$this->action);

    }

    public function listBySiren(){

        header('Content-Type: application/json');

        $companyManager=CompanyService::getInstance();
        $siren=$this->getRequest()->getParameterByName("id");


        $companyList=$companyManager->getAllSiretBySiren($siren);
        $companyList=json_encode($companyList);

        if(isset($companyList)&&!empty($companyList)){
            http_response_code(200);
            echo $companyList;

        }
        else{
            http_response_code(400);
        }

    }

    public function createOne(){

        header('Content-Type: application/json');

        $companyManager=CompanyService::getInstance();
        $addressManager=AddressService::getInstance();

        $obj = file_get_contents('php://input');
        $jsonCompany=json_decode($obj, true);

        $company =new Company($jsonCompany);
        $address=new Address($jsonCompany['address']);

        $address=$addressManager->gMapGeolocate($address);
        $address=$addressManager->createOne($address);
        var_dump($address);

        $company->setAddressId($address->getAdid());
        $company=$companyManager->createOne($company);
        $company->setAddress($address);


        if(isset($company)&&!empty($company)){
            http_response_code(200);
            echo json_encode($company);

        }
        else{
            http_response_code(400);
        }

    }

    public function updateOne(){

        header('Content-Type: application/json');
        $companyManager=CompanyService::getInstance();
        $addressManager=AddressService::getInstance();

        $obj = file_get_contents('php://input');
        $jsonCompany=json_decode($obj, true);

        $company =new Company($jsonCompany);
        $address=new Address($jsonCompany['address']);

        $address=$addressManager->gMapGeolocate($address);

        $updatedAddress=$addressManager->updateOne($address);
        $updatedCompany=$companyManager->updateOne($company);

        if($updatedCompany!=null){
            $company=$updatedCompany;
        }
        if($updatedAddress!=null){
            $company->setAddress($updatedAddress);
        }
        else{
            $company->setAddress($address);
        }
        if(isset($company)&&!empty($company)){
            http_response_code(200);
            echo json_encode($company);
        }
        else{
            http_response_code(304);
        }

    }
}