<?php

class Local implements JsonSerializable {
    private $loid;
    private $name;
    private $adid;
    private $address;

    public function __construct(array $fields) {
        $this->loid = isset($fields['loid']) ? $fields['loid'] : NULL;
        $this->name = $fields['name'];
        $this->adid = isset($fields['adid']) ? $fields['adid'] : NULL;
        $this->address = isset($fields['address']) ? $fields['address'] : NULL;
    }

    /**
     * @return mixed|null
     */
    public function getLoid()
    {
        return $this->loid;
    }

    /**
     * @param mixed|null $loid
     */
    public function setLoid($loid): void
    {
        $this->loid = $loid;
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
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @param mixed|null $address
     */
    public function setAddress($address): void
    {
        $this->address = $address;
    }


    public function JsonSerialize() {
        return get_object_vars($this);
    }
}



?>