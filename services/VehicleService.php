<?php
require_once "models/Vehicle.php";
require_once "framework/CurlManager.php";



class VehicleService {

    private static $instance;

    private function __construct(){}

    public static function getInstance(): VehicleService {
        if (!isset(self::$instance)) {
            self::$instance = new VehicleService();
        }
        return self::$instance;
    }


    public function getAll():?array {

        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("ffwApiUrl", "/");

        $response=["httpCode"=>0,"result"=>[]];
        $curlVehicles=array();
        $offset=0;
        $limit=20;
        $response["result"]=null;
        do{

            $offset=sizeof($curlVehicles);
            $url="$apiUrl/vehicles?offset=$offset&limit=$limit";

            $response= $curl->curlGet($url,array());

            if($response["result"]) {
                $curlVehicles = array_merge($curlVehicles, json_decode($response["result"], true));
            }
        }while(count($curlVehicles)==$limit);

        if(isset($curlVehicles) && !empty($curlVehicles)){
            foreach($curlVehicles as $key=>$vehicle){
                $vehciles[]=new Vehicle($vehicle);
            }
            return $vehciles;
        }

        return null;
    }

}
