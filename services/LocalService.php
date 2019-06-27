<?php
require_once "models/Local.php";
require_once "models/Address.php";
require_once "framework/CurlManager.php";


class LocalService {

    private static $instance;

    private function __construct(){}

    public static function getInstance(): LocalService {
        if (!isset(self::$instance)) {
            self::$instance = new LocalService();
        }
        return self::$instance;
    }

    public function getAll():?array {

        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("ffwApiUrl", "/");

        $response=["httpCode"=>0,"result"=>[]];
        $curlLocals=array();
        $offset=0;
        while($response["httpCode"]!=400){

            if($response["result"]){
                if($offset==0){
                    $curlLocals = json_decode($response["result"],true);
                }
                else{
                    array_merge($curlLocals, json_decode($response["result"],true));
                }
            }

            $offset=sizeof($curlLocals);
            $url="$apiUrl/locals?offset=$offset&limit=20";
            $response= $curl->curlGet($url,array());

        }
        if(isset($curlLocals) && !empty($curlLocals)){
            foreach($curlLocals as $key=>$local){
                $curlLocals[$key] =new Local($local);
            }
            return $curlLocals;
        }

        return null;
    }

    public function getLocalById($loid):?array {

        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("ffwApiUrl", "/");

        $url="$apiUrl/locals/$loid";

        $response= $curl->curlGet($url,array());

        if($response["httpCode"]>=400){
            return null;
        }
        $curLocal= json_decode($response["result"],true);

        if(isset($curLocal) && !empty($curLocal)){
            return new Local($curLocal);
        }
        return null;

    }

//
//    public function create(Local $user):?Local {
//
//        $curl=CurlManager::getManager();
//
//        $apiUrl = Configuration::post("ffwApiUrl", "/");
//
//        $url = "$apiUrl/users";
//
//        $jsonLocal=json_encode($user);
//
//        $response=$curl->curlPost($url,$jsonLocal, array());
//
//        if($response["httpCode"]>=400){
//            return null;
//        }
//        $curlLocal= json_decode($response["result"],true);
//
//
//        if(isset($curlLocal) && !empty($curlLocal)){
//            return new Local($curlLocal);
//        }
//
//        return null;
//
//    }

//    public function create(Local $user):?Local {
//
//        $curl=CurlManager::getManager();
//
//        $apiUrl = Configuration::get("ffwApiUrl", "/");
//
//        $url = "$apiUrl/api/users/create.php";
//
//        $jsonLocal=json_encode($user);
//
//        $response=$curl->curlPost($url,$jsonLocal, array());
//
//        if($response["httpCode"]>=400){
//            return null;
//        }
//        $curlLocal= json_decode($response["result"],true);
//
//
//        if(isset($curlLocal) && !empty($curlLocal)){
//            return new Local($curlLocal);
//        }
//
//        return null;
//
//    }

}
