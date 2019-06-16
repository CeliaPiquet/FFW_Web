<?php
require_once "models/Skill.php";
require_once "models/CompleteSkill.php";
require_once "models/User.php";
require_once "framework/CurlManager.php";



class SkillService {

    private static $instance;

    private function __construct(){}

    public static function getInstance(): SkillService {
        if (!isset(self::$instance)) {
            self::$instance = new SkillService();
        }
        return self::$instance;
    }

    public function createOne(Skill $skill):?Skill {

        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("ffwApiUrl", "/");


        $url = "$apiUrl/skills";
        $jsonSkill=json_encode($skill);
        $response=$curl->curlPost($url,$jsonSkill, array());

        if($response["httpCode"]>=400){
            return null;
        }
        $curlSkill= json_decode($response["result"],true);

        if(isset($curlSkill) && !empty($curlSkill)){
            return new Skill($curlSkill);
        }

        return null;
    }

    public function updateOne(Skill $skill):?Skill {

        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("ffwApiUrl", "/");


        $url = "$apiUrl/skills/".$skill->getAdid();
        $jsonSkill=json_encode($skill);

        $response=$curl->curlPut($url,$jsonSkill, array());

        if($response["httpCode"]>=400){
            return null;
        }
        $curlSkill= json_decode($response["result"],true);

        if(isset($curlSkill) && !empty($curlSkill)){
            return new Skill($curlSkill);
        }

        return null;

    }


    public function getOneById($skillId):?Skill {

        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("ffwApiUrl", "/");

        $url = "$apiUrl/skills/$skillId";
        $response= $curl->curlGet($url,array(),array());

        if($response["httpCode"]>=400){
            return null;
        }
        $curlSkill= json_decode($response["result"],true);

        if(isset($curlSkill) && !empty($curlSkill)){
            return new Skill($curlSkill);
        }
        return null;
    }

    public function getAllByUser($userId,$skStatus=null):?array {

        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("ffwApiUrl", "/");

        $response=["httpCode"=>0,"result"=>[]];
        $curlSkills=array();
        $offset=0;
        $limit=20;
        $response["result"]=null;
        do{

            $offset=sizeof($curlSkills);
            $url="$apiUrl/users/$userId/skills?offset=$offset&limit=$limit";

            $response= $curl->curlGet($url,array());

            if($response["result"]) {
                $curlSkills = array_merge($curlSkills, json_decode($response["result"], true));
            }
        }while(count($curlSkills)==$limit);


        $filteredSkills=[];
        if(isset($curlSkills) && !empty($curlSkills)){
            foreach($curlSkills as $key=>$skill){
                if((isset($skStatus)&&$skill['skStatus']==$skStatus)||!isset($skStatus)){
                    $filteredSkills[]=new Skill($skill);
                }
            }
            return $filteredSkills;
        }

        return null;
    }

    public function affectSkillToUser(User $user,Skill $skill ):?bool {

        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("ffwApiUrl", "/");

        $url = "$apiUrl/users/".$user->getUid()."/skills";

        $body=array("skid"=>$skill->getSkId(),'status'=>"pending");

        $jsonBody=json_encode($body);

        $response=$curl->curlPost($url,$jsonBody, array());

        if($response["httpCode"]>=400){
            return false;
        }
        return $response['result'];

    }

    public function getAll($skStatus=null):?array {


        $curl=CurlManager::getManager();

        $apiUrl = Configuration::get("ffwApiUrl", "/");

        $response=["httpCode"=>0,"result"=>[]];
        $curlSkills=array();
        $offset=0;
        while($response["httpCode"]<400){


            if($response["result"]){
                $curlSkills=array_merge($curlSkills, json_decode($response["result"],true));
            }

            $offset=sizeof($curlSkills);
            $url="$apiUrl/skills?offset=$offset&limit=20";
            $response= $curl->curlGet($url,array());
            echo $offset;

        }

        $filteredSkills=[];
        if(isset($curlSkills) && !empty($curlSkills)){
            foreach($curlSkills as $key=>$skill){
                if((isset($skStatus)&&$skill['skStatus']==$skStatus)||!isset($skStatus)){
                    $filteredSkills[]=new Skill($skill);
                }
            }

            return $filteredSkills;
        }

        return null;
    }


}
