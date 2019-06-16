<div class="col-md-4 mx-auto py-3 visible" id="addressForm">
    <div class="card mx-auto py-3">
        <div class="row justify-content-between col-md-12 mx-auto">
            <div class="col 2">
                <i id="checkFlag" class="far fa-check-circle h1 mx-auto my-auto"></i>
            </div>
            <div class="col-2">
                <button id="removeCompany" class="btn error" ><i class="far fa-times-circle h1 mx-auto my-auto"></i></button>
            </div>
        </div>
        <div class="form-group row col-md-11 mx-auto">
            <label for="siret" > Name </label>
            <input  type="text" id="name" class="form-control mx-auto" name="name" required>
        </div>
        <div class="form-group row col-md-11 mx-auto">
            <label for="siret"> SIRET </label>
            <input  type="text" id="siret" class="form-control mx-auto" name="siret" required>
        </div>
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
            <div class="col-2">
                <button id="updateCompany" class="btn error" ><i class="fas fa-pen h1 mx-auto my-auto"></i></button>
            </div>

        </div>
    </div>
</div>
