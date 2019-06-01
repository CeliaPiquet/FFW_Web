

<?php $this->setName("content"); ?>

<div class="container">
    <h1 class="text-center"> Manage users</h1>

    <table class="table table-striped table-hover " id="usersTable">
        <thead>
        <tr>
            <th> <?php echo _("Name"); ?></th>
            <th> <?php echo _("City"); ?> </th>
            <th> <?php echo _("Filling"); ?> </th>
        </tr>
        <tr >
            <td>
                <input type="text" class="form-control" onkeyup="findLocalsByFilter()" id="nameInput" placeholder="<?php echo _("Name");?>">
            </td>
            <td>
                <input type="text" class="form-control" onkeyup="findLocalsByFilter()" id="cityNameInput" placeholder="<?php echo _("City"); ?>">
            </td>
            <td>
                <button type="button" class="list-group-item list-group-item-action text-center" onclick="changeQuantityOrder();" id="quantityOrderBtn"><?php echo _("Most filled"); ?></button>
            </td>
        </tr>
        </thead>
        <tbody id="localRowsContainer">
            <tr>
                <td>
                    <input type="text" class="form-control"  id="nameInput" placeholder="<?php echo _("Name");?>">
                </td>
                <td>
                    <input type="text" class="form-control" id="cityNameInput" placeholder="<?php echo _("City"); ?>">
                </td>
                <td>
                    <button class="btn col-md-2 mx-auto" type="button" data-toggle="collapse" data-target="#collapseAddress" aria-expanded="false" aria-controls="collapseAddress">Address</button>
                </td>
                <td>
                    <button class="btn col-md-2 mx-auto" type="button" data-toggle="collapse" data-target="#collapseRooms" aria-expanded="false" aria-controls="collapseExample">Rooms</button>
                </td>
                <td>
                    <div class="alert alert-dark">Total quantity : <span id="totalQuantity"></span></div>
                </td>
            </tr>
            <tr>
                <td colspan="5">
                    <div class="collapse my-auto" id="collapseAddress">
                        <div class="col-md-12 mx-auto py-3 visible" id="addressForm">
                            <div class="form-group row col-md-11 mx-auto">
                                <label for="autocomplete"><?php echo _("Address"); ?></label>
                                <input type="text" class="form-control" name="autocomplete" placeholder="<?php echo _("Enter your address..."); ?>" >
                            </div>
                            <div class="form-group row col-md-11 mx-auto">
                                <div class="col-md-3 mx-auto">
                                    <label for="street_number">Numéro</label>
                                    <input type="text" class="form-control mx-auto" id="street_number" name="houseNumber" placeholder="Numéro" required disabled>
                                </div>
                                <div class="col-md-9 mx-auto">
                                    <label for="route" >Addresse</label>
                                    <input type="text" class="form-control mx-auto" id="route" name="streetAddress" placeholder="Adresse" required disabled>
                                </div>
                            </div>
                            <div class="form-group row col-md-11 mx-auto">
                                <div class="form-group col-md-7">
                                    <label for="complement">Complement</label>
                                    <input type="text" id="complement" class="form-control mx-auto" name="complement" placeholder="Complement" required>
                                </div>
                                <div class="form-group col-md-5">
                                    <label for="complement">Phone</label>
                                    <input type="text" id="tel" class="form-control mx-auto" name="tel" placeholder="Phone" required >
                                </div>
                            </div>
                            <div class="form-group row col-md-11  mx-auto">
                                <div class="form-group col-md-4">
                                    <label for="locality" >Ville</label>
                                    <input type="text" class="form-control mx-auto" id="locality" name="cityName" required disabled>
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="postal_code" >Code postal</label>
                                    <input type="text" class="form-control mx-auto" name="cityCode" id="postal_code" required disabled>
                                </div>
                                <div class="form-group col-md-3 ">
                                    <label for="country">Pays</label>
                                    <select id="country" name="country" class="form-control mx-auto" required disabled>
                                        <option value="france" selected>France</option>
                                        <option value="italie">Italie</option>
                                        <option value="portugal">Portugal</option>
                                        <option value="irlande">Irlande</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="5">
                    <div class="collapse my-auto" id="collapseRooms">
                        <table class="table table-striped table-hover " id="roomsTable">
                            <thead>
                            <tr>
                                <th> <?php echo _("Name"); ?></th>
                                <th> <?php echo _("Availability"); ?> </th>
                                <th> <?php echo _("Is stockroom"); ?> </th>
                                <th> <?php echo _("Total quantity"); ?> </th>
                            </tr>
                            </thead>
                            <tbody id="roomsContainer">
                                <tr>
                                    <td>
                                        <input type="text" class="form-control"  id="nameInput" placeholder="Name">
                                    </td>
                                    <td>
                                        <button type="button" class="list-group-item list-group-item-action text-center"  id="availabilityBtn">Yes</button>
                                    </td>
                                    <td>
                                        <button type="button" class="list-group-item list-group-item-action text-center"  id="stockRoomBtn">Yes</button>
                                    </td>
                                    <td>
                                        <div class="alert alert-dark">Total quantity : <span id="totalQuantity"></span></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
