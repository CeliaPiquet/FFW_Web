
<?php $this->setName("content"); ?>

<div class="back">
    <div class="container">
        <h1> <?php echo _("Inscription"); ?> </h1>
        <form formclass="col-lg-6" method="post"  id="addressForm" action="<?=$websiteRoot?>/inscription/controlForm">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="lastname"><?php echo _("Last name"); ?></label>
                    <input required type="text" class="form-control" id="lastname" placeholder="<?php echo _("Last name"); ?>" name="lastname">
                </div>
                <div class="form-group col-md-6">
                    <label for="firstname"><?php echo _("First name"); ?></label>
                    <input required type="text" class="form-control" id="firstname" placeholder="<?php echo _("First name"); ?>" name="firstname">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="email"><?php echo _("Mail address"); ?></label>
                    <input required type="email" class="form-control" id="email" placeholder="exemple@mail.com" name="email">
                </div>
                <div class="form-group col-md">
                    <label for="password"><?php echo _("Password"); ?></label>
                    <input required type="password" class="form-control" id="password" placeholder="<?php echo _("Password (8 characters, 1 capital, 1 lower, 1 digit)"); ?>" name="password">
                </div>
                <div class="form-group col-md">
                    <label for="pwdConfirm"><?php echo _("Password confirm"); ?> </label>
                    <input required type="password" class="form-control" id="passwordConfirm" placeholder="<?php echo _("Rewrite your password"); ?>" name="passwordConfirm">
                </div>
            </div>
            <div class="form-group">
                <label for="autocomplete"><?php echo _("Address"); ?></label>
                <input type="text" class="form-control" id="autocomplete" name="autocomplete" placeholder="<?php echo _("Enter your address..."); ?>" >
            </div>
            <div class="form-row">
                <div class="col-md-2">
                    <label for="streetAddress"><?php echo _("House number"); ?></label>
                    <input type="text" class="form-control" id="street_number" placeholder="<?php echo _("House number and street name"); ?>" name="houseNumber" disabled>
                </div>
                <div class="col-md-10">
                    <label for="streetAddress"><?php echo _("Street address"); ?></label>
                    <input type="text" class="form-control" id="route" placeholder="<?php echo _("House number and street name"); ?>" name="streetAddress" disabled>
                </div>
            </div>

            <div class="form-row">
                <label for="complement"><?php echo _("Complement"); ?></label>
                <input type="text" class="form-control" id="complement" placeholder="<?php echo _("Complement "); ?>" name="complement" disabled>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="cityName"><?php echo _("City") ;?></label>
                    <input type="text" class="form-control" id="locality" name="cityName" disabled>
                </div>
                <div class="form-group col-md-2">
                    <label for="cityCode"><?php echo _("Zip code"); ?></label>
                    <input type="text" class="form-control" id="postal_code" name="cityCode" disabled>
                </div>
                <div class="form-group col-md-4">
                    <label for="country"><?php echo _("Country"); ?></label>
                    <select id="country" class="form-control" name="country" disabled>
                        <option value="france" selected><?php echo _("France") ?></option>
                        <option value="italy"> <?php echo _("Italy") ?></option>
                        <option value="portugal"><?php echo _("Portugal") ; ?></option>
                        <option value="ireland"><?php echo _("Ireland") ;?></option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <div class="form-check">
                    <input required class="form-check-input" type="checkbox" id="checkCG" name="checkCG">
                    <label class="form-check-label" for="checkCG">
                        <?php echo _("Agree FFW general conditions"); ?>
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="checkNews" name="checkNews">
                    <label class="form-check-label" for="checkNews">
                        <?php echo _("I want to receive by mail actuality and event information from FFW"); ?>
                    </label>
                </div>
            </div>
            <button type="submit" class="btn"><?php echo _("Next step") ; ?></button>
        </form>
    </div>
</div>