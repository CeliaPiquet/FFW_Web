<?php

class Address implements JsonSerializable {
    private $adid;
    private $houseNumber;
    private $streetAddress;
    private $complement;
    private $cityName;
    private $cityCode;
    private $country;
    private $latitude;
    private $longitude;

    public function __construct(array $fields=null) {
        $this->adid = isset($fields['adid']) ? $fields['adid'] : NULL;
        $this->houseNumber = isset($fields['houseNumber']) ? $fields['houseNumber'] : NULL;
        $this->streetAddress = isset($fields['streetAddress'])?$fields['streetAddress']:NULL;
        $this->complement = isset($fields['complement'])?$fields['complement']:NULL;
        $this->cityName = isset($fields['cityName'])?$fields['cityName']:NULL;
        $this->cityCode = isset($fields['cityCode'])?$fields['cityCode']:NULL;
        $this->country = isset($fields['country'])?$fields['country']:NULL;
        $this->latitude = isset($fields['latitude'])?$fields['latitude']: 0;
        $this->longitude = isset($fields['longitude'])?$fields['longitude']:0;
    }

    /**
     * @return mixed|null
     */
    public function getAdid()
    {
        return $this->adid;
    }

    /**
     * @param mixed|null $adid
     */
    public function setAdid($adid): void
    {
        $this->adid = $adid;
    }

    /**
     * @return mixed|null
     */
    public function getHouseNumber()
    {
        return $this->houseNumber;
    }

    /**
     * @param mixed|null $houseNumber
     */
    public function setHouseNumber($houseNumber): void
    {
        $this->houseNumber = $houseNumber;
    }

    /**
     * @return mixed|null
     */
    public function getStreetAddress()
    {
        return $this->streetAddress;
    }

    /**
     * @param mixed|null $streetAddress
     */
    public function setStreetAddress($streetAddress): void
    {
        $this->streetAddress = $streetAddress;
    }

    /**
     * @return mixed|null
     */
    public function getComplement()
    {
        return $this->complement;
    }

    /**
     * @param mixed|null $complement
     */
    public function setComplement($complement): void
    {
        $this->complement = $complement;
    }

    /**
     * @return mixed|null
     */
    public function getCityName()
    {
        return $this->cityName;
    }

    /**
     * @param mixed|null $cityName
     */
    public function setCityName($cityName): void
    {
        $this->cityName = $cityName;
    }

    /**
     * @return mixed|null
     */
    public function getCityCode()
    {
        return $this->cityCode;
    }

    /**
     * @param mixed|null $cityCode
     */
    public function setCityCode($cityCode): void
    {
        $this->cityCode = $cityCode;
    }

    /**
     * @return mixed|null
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * @param mixed|null $country
     */
    public function setCountry($country): void
    {
        $this->country = $country;
    }

    /**
     * @return int|mixed
     */
    public function getLatitude()
    {
        return $this->latitude;
    }

    /**
     * @param int|mixed $latitude
     */
    public function setLatitude($latitude): void
    {
        $this->latitude = $latitude;
    }

    /**
     * @return int|mixed
     */
    public function getLongitude()
    {
        return $this->longitude;
    }

    /**
     * @param int|mixed $longitude
     */
    public function setLongitude($longitude): void
    {
        $this->longitude = $longitude;
    }



    public function JsonSerialize() {
        return get_object_vars($this);
    }

    public function __toString(){
        return $this->houseNumber.' '.$this->streetAddress.' '.$this->cityName.' '.$this->cityName.' '.$this->country;
    }
}



?>