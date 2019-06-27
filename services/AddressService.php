<?php
require_once "models/Address.php";
require_once "framework/CurlManager.php";



class AddressService {

    private static $instance;

    private function __construct(){}

    public static function getInstance(): AddressService {
        if (!isset(self::$instance)) {
            self::$instance = new AddressService();
        }
        return self::$instance;
    }

    public function createOne(Address $address):?Address {

        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("ffwApiUrl", "/");


        $url = "$apiUrl/addresses";
        $jsonAddress=json_encode($address);


        $response=$curl->curlPost($url,$jsonAddress, array());

        if($response["httpCode"]>=400){
            return null;
        }
        $curlAddress= json_decode($response["result"],true);

        if(isset($curlAddress) && !empty($curlAddress)){
            return new Address($curlAddress);
        }

        return null;

    }

    public function updateOne(Address $address):?Address {

        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("ffwApiUrl", "/");


        $url = "$apiUrl/addresses";
        $jsonAddress=json_encode($address);

        $response=$curl->curlPut($url,$jsonAddress, array());

        if($response["httpCode"]>=400){
            return null;
        }
        $curlAddress= json_decode($response["result"],true);

        if(isset($curlAddress) && !empty($curlAddress)){
            return new Address($curlAddress);
        }

        return null;

    }


    public function getOneById($addressId):?Address {

        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("ffwApiUrl", "/");

        $url = "$apiUrl/addresses/$addressId";
        $response= $curl->curlGet($url,array(),array());

        if($response["httpCode"]>=400){
            return null;
        }
        $curlAddress= json_decode($response["result"],true);

        if(isset($curlAddress) && !empty($curlAddress)){
            return new Address($curlAddress);
        }
        return null;
    }

    public function gMapGeolocate(Address $address):?Address{

        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("gMapGeolocateUrl", "/");
        $apiKey = Configuration::get("gMapApiKey", "/");

        $response= $curl->curlGet($apiUrl,array("key"=>$apiKey,"address"=>strval($address),"sensor"=>"false", "region"=>"fr_FR"),array());

        if($response["httpCode"]>=400){
            return null;
        }
        $response= json_decode($response['result'],true);

        if(isset($response['results'][0]['geometry']['location'])){
            $location=$response['results'][0]['geometry']['location'];
            $address->setLatitude($location['lat']);
            $address->setLongitude($location['lng']);
        }
        return $address;
    }
}
