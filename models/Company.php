<?php

class Company implements JsonSerializable {
    private $coid;
    private $siret;
    private $status;
    private $name;
    private $tel;
    private $addressId;
    private $userId;

    private $address;



    public function __construct(array $fields=null) {

        if(isset($fields)&& !empty($fields)){
            $this->coid = isset($fields['coid']) ? $fields['coid'] : NULL;
            $this->siret = isset($fields['siret'])?$fields['siret']:NULL;
            $this->status = isset($fields['status']) ? $fields['status'] : NULL;
            $this->name = isset($fields['name']) ? $fields['name'] : NULL;
            $this->tel = isset($fields['tel']) ? $fields['tel']: NULL;
            $this->addressId = isset($fields['addressId']) ? $fields['addressId'] : NULL;
            $this->userId = isset($fields['userId']) ? $fields['userId'] : NULL;
            $this->address = isset($fields['address']) ? $fields['address'] : NULL;
        }
    }

    /**
     * @return mixed
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @param mixed $address
     */
    public function setAddress($address): void
    {
        $this->address = $address;
    }

    /**
     * @return mixed|null
     */
    public function getCoid()
    {
        return $this->coid;
    }

    /**
     * @param mixed|null $coid
     */
    public function setCoid( $coid): void
    {
        $this->coid = $coid;
    }

    /**
     * @return mixed
     */
    public function getSiret()
    {
        return $this->siret;
    }

    /**
     * @param mixed $siret
     */
    public function setSiret($siret): void
    {
        $this->siret = $siret;
    }

    /**
     * @return mixed
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param mixed $status
     */
    public function setStatus($status): void
    {
        $this->status = $status;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name): void
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getTel()
    {
        return $this->tel;
    }

    /**
     * @param mixed $tel
     */
    public function setTel($tel): void
    {
        $this->tel = $tel;
    }

    /**
     * @return mixed
     */
    public function getAddressId()
    {
        return $this->addressId;
    }

    /**
     * @param mixed $addressId
     */
    public function setAddressId($addressId): void
    {
        $this->addressId = $addressId;
    }

    /**
     * @return mixed
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * @param mixed $userId
     */
    public function setUserId($userId): void
    {
        $this->userId = $userId;
    }


    public function JsonSerialize() {
        return get_object_vars($this);
    }
}



?>