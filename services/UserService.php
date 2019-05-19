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

    public function authentification(User $user):?User {

        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("ffwApiUrl", "/");

        $userGet=[
            "email"=>$user->getEmail(),
            "password"=>$user->getPassword(),
        ];


        $url = "$apiUrl/api/users/authentication.php";

        $curlUser = json_decode($curl->curlGet($url,$userGet), true);

        if(isset($curlUser) && !empty($curlUser)){
            return new User($curlUser);
        }

        return null;

    }

    public function create(User $user):?User {

        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("ffwApiUrl", "/");

        $url = "$apiUrl/api/users/create.php";
        $jsonUser=json_encode($user);

        $curlUser= json_decode($curl->curlPost($url,$jsonUser, array()),true);


        if(isset($curlUser) && !empty($curlUser)){
            return new User($curlUser);
        }

        return null;

    }

}
