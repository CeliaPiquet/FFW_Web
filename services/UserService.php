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

        var_dump($user);
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

        var_dump($jsonUser);
        $response=$curl->curlPost($url,$jsonUser, array());

        var_dump($response);

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
        return ($byteRight & (1 << $pos)) != 0;
    }

}
