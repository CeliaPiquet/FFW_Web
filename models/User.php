<?php


class User implements JsonSerializable {
    private $uid;
    private $email;
    private $tel;
    private $password;
    private $firstname;
    private $lastname;
    private $status;
    private $rights;
    private $lastSubscription;
    private $endSubscription;
    private $lastEdit;
    private $companyName;
    private $addressId;

    public function __construct(array $fields) {

        $this->uid = isset($fields['uid']) ? $fields['uid'] : NULL;
        $this->email = isset($fields['email'])?$fields['email'] : NULL;
        $this->tel = isset($fields['tel']) ? $fields['tel'] : NULL;
        $this->password = isset( $fields['password'] ) ? $fields['password'] : NULL;
        $this->firstname = isset($fields['firstname']) ? $fields['firstname'] : NULL;
        $this->lastname = isset($fields['lastname'])  ? $fields['lastname'] : NULL;
        $this->status = isset($fields['status']) ? $fields['status'] : NULL;
        $this->rights = isset($fields['rights']) ? $fields['rights'] : NULL;
        $this->lastSubscription = isset($fields['lastSubcription']) ? $fields['lastSubcription'] : NULL;
        $this->endSubscription = isset($fields['endSubscription']) ? $fields['endSubscription'] : NULL;
        $this->lastEdit = isset($fields['lastEdit']) ? $fields['lastEdit'] : NULL;
        $this->companyName = isset($fields['companyName']) ? $fields['companyName'] : NULL;
        $this->addressId = isset($fields['addressId']) ? $fields['addressId'] : NULL;
    }

    /**
     * @return mixed|null
     */
    public function getUid()
    {
        return $this->uid;
    }

    /**
     * @param mixed|null $uid
     */
    public function setUid( $uid): void
    {
        $this->uid = $uid;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email): void
    {
        $this->email = $email;
    }

    /**
     * @return mixed|null
     */
    public function getTel()
    {
        return $this->tel;
    }

    /**
     * @param mixed|null $tel
     */
    public function setTel( $tel): void
    {
        $this->tel = $tel;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param mixed $password
     */
    public function setPassword($password): void
    {
        $this->password = $password;
    }

    /**
     * @return mixed
     */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * @param mixed $firstname
     */
    public function setFirstname($firstname): void
    {
        $this->firstname = $firstname;
    }

    /**
     * @return mixed
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * @param mixed $lastname
     */
    public function setLastname($lastname): void
    {
        $this->lastname = $lastname;
    }

    /**
     * @return mixed|null
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param mixed|null $status
     */
    public function setStatus( $status): void
    {
        $this->status = $status;
    }

    /**
     * @return mixed|null
     */
    public function getRights(): ?string
    {
        return $this->rights;
    }

    /**
     * @param mixed|null $rights
     */
    public function setRights( $rights): void
    {
        $this->rights = $rights;
    }

    /**
     * @return mixed|null
     */
    public function getLastSubscription()
    {
        return $this->lastSubscription;
    }

    /**
     * @param mixed|null $lastSubscription
     */
    public function setLastSubscription( $lastSubscription): void
    {
        $this->lastSubscription = $lastSubscription;
    }

    /**
     * @return mixed|null
     */
    public function getEndSubscription()
    {
        return $this->endSubscription;
    }

    /**
     * @param mixed|null $endSubscription
     */
    public function setEndSubscription( $endSubscription): void
    {
        $this->endSubscription = $endSubscription;
    }

    /**
     * @return mixed|null
     */
    public function getLastEdit()
    {
        return $this->lastEdit;
    }

    /**
     * @param mixed|null $lastEdit
     */
    public function setLastEdit( $lastEdit): void
    {
        $this->lastEdit = $lastEdit;
    }

    /**
     * @return mixed|null
     */
    public function getCompanyName()
    {
        return $this->companyName;
    }

    /**
     * @param mixed|null $companyName
     */
    public function setCompanyName( $companyName): void
    {
        $this->companyName = $companyName;
    }

    /**
     * @return mixed|null
     */
    public function getAddressId()
    {
        return $this->addressId;
    }

    /**
     * @param mixed|null $addressId
     */
    public function setAddressId( $addressId): void
    {
        $this->addressId = $addressId;
    }

    public function __sleep()
    {
        return array(
        'uid',
        'email',
        'tel',
        'password',
        'firstname',
        'lastname',
        'status',
        'rights',
        'lastSubscription',
        'endSubscription',
        'lastEdit',
        'companyName',
        'addressId');

    }

    public function __wakeup()
    {

    }


    public function JsonSerialize() {
        return get_object_vars($this);
    }
}



?>