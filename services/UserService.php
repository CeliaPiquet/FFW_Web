<?php
require_once "models/User.php";
require_once "framework/CurlManager.php";


class UserService {

    private static $instance;

    private function __construct(){}

    public static function getInstance(): UserService {
        if (!isset(self::$instance)) {
            self::$instance = new UserService();
        }
        return self::$instance;
    }

    public function authentication(User $user):?User {

        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("ffwApiUrl", "/");

        $userGet=[
            "email"=>$user->getEmail(),
            "password"=>$user->getPassword(),
        ];

        $url = "$apiUrl/users/authentication";

        $response=$curl->curlGet($url,$userGet);

        if($response["httpCode"]>=400){
            return null;
        }
        $curlUser= json_decode($response["result"],true);

        if(isset($curlUser) && !empty($curlUser)){
            return new User($curlUser);
        }

        return null;

    }

    public function create(User $user):?User {

        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("ffwApiUrl", "/");

        $url = "$apiUrl/users";
        $user->setRights(2);
        $jsonUser=json_encode($user);

        $response=$curl->curlPost($url,$jsonUser, array());

        if($response["httpCode"]>=400){
            return null;
        }
        $curlUser= json_decode($response["result"],true);

        if(isset($curlUser) && !empty($curlUser)){
            return new User($curlUser);
        }

        return null;
    }


    static public  function isRightSet($byteRight, $pos) {
        return ($byteRight & (1 << $pos)) ;
//        return ($byteRight  (1 >> $pos));
    }

    static public function fillRights($binRights){

    $arrTextRights=[
        "deleted"=>false,
        "just created"=>false,
        "volunteer"=>false,
        "adherent"=>false,
        "company"=>false,
        "stock collect and vehicles admin"=>false,
        "subscription admin"=>false,
        "events and articles admin"=>false,
        "volunteers and employees admin"=>false,
        "super admin"=>false];

    $i=0;
    foreach($arrTextRights as $key=>$textRight){
        $arrTextRights[$key]=self::isRightSet($binRights,$i);
        $i++;
    }

    return $arrTextRights;
    }

}
