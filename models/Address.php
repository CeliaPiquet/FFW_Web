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

    public function __construct(array $fields) {
        $this->adid = isset($fields['adid']) ? $fields['adid'] : NULL;
        $this->houseNumber = $fields['houseNumber'];
        $this->streetAddress = isset($fields['streetAddress'])?$fields['streetAddress']:NULL;
        $this->complement = isset($fields['complement'])?$fields['complement']:NULL;
        $this->cityName = isset($fields['cityName'])?$fields['cityName']:NULL;
        $this->cityCode = isset($fields['cityCode'])?$fields['cityCode']:NULL;
        $this->country = isset($fields['country'])?$fields['country']:NULL;
        $this->latitude = isset($fields['latitude'])?$fields['latitude']: 0;
        $this->longitude = isset($fields['longitude'])?$fields['longitude']:0;
    }


    public function getStreetAddress(): string {return $this->streetAddress;}
    public function getCityName(): string {return $this->cityName;}
    public function getCityCode(): string {return $this->cityCode;}
    public function getCountry(): string {return $this->country;}


    /**
     * @return mixed
     */
    public function getHouseNumber()
    {
        return $this->houseNumber;
    }

    /**
     * @param mixed $houseNumber
     */
    public function setHouseNumber($houseNumber)
    {
        $this->houseNumber = $houseNumber;
    }

    /**
     * @return mixed
     */
    public function getComplement()
    {
        return $this->complement;
    }

    /**
     * @param mixed $complement
     */
    public function setComplement($complement)
    {
        $this->complement = $complement;
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

    /**
     * @return mixed|null
     */
    public function getAdid()
    {
        return $this->adid;
    }


    public function setAdId(int $adid) {
        $this->adid = $adid;
    }

    public function JsonSerialize() {
        return get_object_vars($this);
    }

    public function __toString(){
        return $this->houseNumber.' '.$this->streetAddress.' '.$this->cityName.' '.$this->cityName.' '.$this->country;
    }
}



?>