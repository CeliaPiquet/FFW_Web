<td colspan="5">
    <div class="collapse my-auto" id="collapseAddress">
        <div class="col-md-12 mx-auto py-3 visible" id="addressForm">
            <div class="form-group row col-md-11 mx-auto">
                <div class="col-md-3 mx-auto">
                    <label for="street_number">Numéro</label>
                    <input type="text" class="form-control mx-auto to-update" id="street_number" name="houseNumber" placeholder="Numéro"  readonly>
                </div>
                <div class="col-md-9 mx-auto">
                    <label for="route" >Addresse</label>
                    <input type="text" class="form-control mx-auto to-update" id="route" name="streetAddress" placeholder="Adresse"  readonly>
                </div>
            </div>
            <div class="form-group row col-md-11 mx-auto">
                <div class="form-group col-md-7">
                    <label for="complement">Complement</label>
                    <input type="text" id="complement" class="form-control mx-auto to-update" name="complement" placeholder="Complement" readonly >
                </div>
            </div>
            <div class="form-group row col-md-11  mx-auto">
                <div class="form-group col-md-4">
                    <label for="locality" >Ville</label>
                    <input type="text" class="form-control mx-auto to-update" id="locality" name="cityName"  readonly>
                </div>
                <div class="form-group col-md-3">
                    <label for="postal_code" >Code postal</label>
                    <input type="text" class="form-control mx-auto to-update" name="cityCode" id="postal_code"  readonly>
                </div>
                <div class="form-group col-md-3 ">
                    <label for="country">Pays</label>
                    <select id="country" name="country to-update" class="form-control mx-auto"  readonly>
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