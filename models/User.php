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
        $this->email = $fields['email'];
        $this->tel = isset($fields['tel']) ? $fields['tel'] : NULL;
        $this->password = $fields['password'];
        $this->firstname = $fields['firstname'];
        $this->lastname = $fields['lastname'];
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
    public function getUid(): ?mixed
    {
        return $this->uid;
    }

    /**
     * @param mixed|null $uid
     */
    public function setUid(?mixed $uid): void
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
    public function getTel(): ?mixed
    {
        return $this->tel;
    }

    /**
     * @param mixed|null $tel
     */
    public function setTel(?mixed $tel): void
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
    public function getStatus(): ?mixed
    {
        return $this->status;
    }

    /**
     * @param mixed|null $status
     */
    public function setStatus(?mixed $status): void
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
    public function setRights(?mixed $rights): void
    {
        $this->rights = $rights;
    }

    /**
     * @return mixed|null
     */
    public function getLastSubscription(): ?mixed
    {
        return $this->lastSubscription;
    }

    /**
     * @param mixed|null $lastSubscription
     */
    public function setLastSubscription(?mixed $lastSubscription): void
    {
        $this->lastSubscription = $lastSubscription;
    }

    /**
     * @return mixed|null
     */
    public function getEndSubscription(): ?mixed
    {
        return $this->endSubscription;
    }

    /**
     * @param mixed|null $endSubscription
     */
    public function setEndSubscription(?mixed $endSubscription): void
    {
        $this->endSubscription = $endSubscription;
    }

    /**
     * @return mixed|null
     */
    public function getLastEdit(): ?mixed
    {
        return $this->lastEdit;
    }

    /**
     * @param mixed|null $lastEdit
     */
    public function setLastEdit(?mixed $lastEdit): void
    {
        $this->lastEdit = $lastEdit;
    }

    /**
     * @return mixed|null
     */
    public function getCompanyName(): ?mixed
    {
        return $this->companyName;
    }

    /**
     * @param mixed|null $companyName
     */
    public function setCompanyName(?mixed $companyName): void
    {
        $this->companyName = $companyName;
    }

    /**
     * @return mixed|null
     */
    public function getAddressId(): ?mixed
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