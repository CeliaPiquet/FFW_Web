<td colspan="5">
    <div class="collapse my-auto" id="collapsedAddress">
        <div class="col-md-12 mx-auto py-3 visible" id="addressForm">
            <div class="form-group row col-md-11 mx-auto">
                <div class="col-md-3 mx-auto">
                    <label for="street_number"><?php echo  _("Number");?></label>
                    <input type="text" class="form-control mx-auto to-update" id="houseNumber" placeholder="<?php echo  _("Number");?>  object="address" readonly>
                </div>
                <div class="col-md-9 mx-auto">
                    <label for="route" ><?php echo  _("Address");?></label>
                    <input type="text" class="form-control mx-auto to-update" id="streetAddress" placeholder="<?php echo  _("Address");?>"object="address" readonly>
                </div>
            </div>
            <div class="form-group row col-md-11 mx-auto">
                <div class="form-group col-md-7">
                    <label for="complement"><?php echo  _("Complement");?></label>
                    <input type="text" id="complement" class="form-control mx-auto to-update" placeholder="<?php echo  _("Complement");?>" object="address" readonly >
                </div>
            </div>
            <div class="form-group row col-md-11  mx-auto">
                <div class="form-group col-md-4">
                    <label for="locality" ><?php echo  _("City");?></label>
                    <input type="text" class="form-control mx-auto to-update" id="cityName"  object="address" readonly>
                </div>
                <div class="form-group col-md-3">
                    <label for="postal_code" ><?php echo  _("Zip code");?></label>
                    <input type="text" class="form-control mx-auto to-update" id="cityCode"  object="address" readonly>
                </div>
                <div class="form-group col-md-3 ">
                    <label for="country"><?php echo  _("Country");?></label>
                    <select id="country" name="country to-update" class="form-control mx-auto"  object="address" readonly>
                        <option value="france" selected><?php echo  _("France");?></option>
                        <option value="italie"><?php echo  _("Italy");?></option>
                        <option value="portugal"><?php echo  _("Portugal");?></option>
                        <option value="irlande"><?php echo  _("Ireland");?></option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</td>

