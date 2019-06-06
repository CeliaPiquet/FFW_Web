<?php

class Configuration {

    private static $parameters;

    // Renvoie la valeur d'un paramètre de configuration
    public static function get($name, $defaultValue = null) {
        if (isset(self::getParamaters()[$name])) {
            $value = self::getParamaters()[$name];
        }
        else {
            $value = $defaultValue;
        }
        return $value;
    }

    // Renvoie le tableau des paramètres en le chargeant au besoin
    private static function getParamaters() {
        if (self::$parameters == null) {
            $filePath = "config/prod.ini";
            if (!file_exists($filePath)) {
                $filePath = "config/dev.ini";
            }
            if (!file_exists($filePath)) {
                throw new Exception("No config file founded");
            }
            else {
                self::$parameters = parse_ini_file($filePath);
            }
        }
        return self::$parameters;
    }
}