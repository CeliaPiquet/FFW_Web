<?php
require_once "models/Address.php";
require_once "framework/CurlManager.php";
require_once "models/Company.php";


class CompanyService {

    private static $instance;

    private function __construct(){}

    public static function getInstance(): CompanyService {
        if (!isset(self::$instance)) {
            self::$instance = new CompanyService();
        }
        return self::$instance;
    }

    public function getAllSiretBySiren($siren):?array {

        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("sirenApiUrl", "/");

        $url = $apiUrl.$siren;

        $i=0;

        $response= $curl->curlGet($url,null, array(CURLOPT_TIMEOUT => 30));

        if($response["httpCode"]>=400){
            return null;
        }

        $siretList= json_decode($response["result"],true);

        foreach($siretList["records"] as $globalData ){

            $arrAddress["houseNumber"]=isset($globalData["fields"]["numerovoieetablissement"])?$globalData["fields"]["numerovoieetablissement"]:NULL;
            $arrAddress["streetAddress"]=isset($globalData["fields"]["typevoieetablissement"])?$globalData["fields"]["typevoieetablissement"]:NULL;
            $arrAddress["streetAddress"]= $arrAddress["streetAddress"] ." ". $globalData["fields"]["libellevoieetablissement"];
            $arrAddress["complement"]=isset($globalData["fields"]["complementadresseetablissement"])?$globalData["fields"]["complementadresseetablissement"]:NULL;
            $arrAddress["cityName"]=isset($globalData["fields"]["libellecommuneetablissement"])?$globalData["fields"]["libellecommuneetablissement"]:NULL;
            $arrAddress["cityCode"]=isset($globalData["fields"]["codepostaletablissement"])?$globalData["fields"]["codepostaletablissement"]:NULL;
            $arrAddress["latitude"]=isset($globalData["fields"]["geolocetablissement"][0])?$globalData["fields"]["geolocetablissement"][0]:NULL;
            $arrAddress["longitude"]=isset($globalData["fields"]["geolocetablissement"][1])?$globalData["fields"]["geolocetablissement"][1]:NULL;
            $arrAddress["country"]="France";

            if(isset($globalData["fields"]["denominationusuelle1unitelegale"])){
                $name[]=$globalData["fields"]["denominationusuelle1unitelegale"];
            }
            if(isset($globalData["fields"]["denominationunitelegale"])){
                $name[]=$globalData["fields"]["denominationunitelegale"];
            }
            $companyArr[$i]=new Company(array(
                "siret"=>$globalData["fields"]["siret"],
                "name"=>implode("-",$name),
                "address"=>new Address($arrAddress)));
            $i++;
        }
        return $companyArr;
    }

    public function getAllByUser($userId):?array {


        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("ffwApiUrl", "/");

        $response=["httpCode"=>0,"result"=>[]];
        $curlCompanies=array();
        $offset=0;
        $limit=20;
        do{

            $url="$apiUrl/users/$userId/companies?offset=$offset&limit=20";
            $response= $curl->curlGet($url,array());

            if($response["result"]){
                if($offset==0){
                    $curlCompanies = json_decode($response["result"],true);
                }
                else{
                    array_merge($curlCompanies, json_decode($response["result"],true));
                }
            }

            $offset=sizeof($curlCompanies);

        }while($response["result"] && sizeof($response["result"])==$limit);

        if(isset($curlCompanies) && !empty($curlCompanies)){
            foreach($curlCompanies as $key=>$company){
                $curlCompanies[$key] =new Company($company);
            }
            return $curlCompanies;
        }

        return null;
    }


    public function createOne(Company $company):?Company {

        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("ffwApiUrl", "/");

        $url = "$apiUrl/companies/";

        $jsonCompany=json_encode($company);

        $response= $curl->curlPost($url,$jsonCompany, array());

        if($response["httpCode"]>=400){
            return null;
        }

        $curlCompany= json_decode($response["result"],true);

        if(isset($curlCompany) && !empty($curlCompany)){
            return new Company($curlCompany);
        }

        return null;
    }

    public function updateOne(Company $company):?Company {

        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("ffwApiUrl", "/");
        $url = "$apiUrl/companies/".$company->getCoid();

        $jsonCompany=json_encode($company);

        $response= $curl->curlPut($url,$jsonCompany, array());

        if($response["httpCode"]>=400){
            return null;
        }

        $curlCompany= json_decode($response["result"],true);

        if(isset($curlCompany) && !empty($curlCompany)){
            return new Company($curlCompany);
        }

        return null;
    }
}
