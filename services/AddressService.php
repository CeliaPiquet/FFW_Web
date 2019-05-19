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


        $url = "$apiUrl/api/addresses/create.php";
        $jsonAddress=json_encode($address);

        $curlAddress= json_decode($curl->curlPost($url,$jsonAddress, array()),true);


        if(isset($curlAddress) && !empty($curlAddress)){
            return new Address($curlAddress);
        }

        return null;

    }

}
