<td colspan="5">
    <div class="collapse my-auto" id="collapsedBasketDest">
        <div class="row">
            <div class="btn-group btn-group-toggle" data-toggle="buttons" id="displayTablesBtnContainer">
                <label class="btn mx-auto">
                    <input type="radio" name="options" id="displayUsersTable"   onfocus="displayUsersTable(this);" autocomplete="off" checked><?php echo _("Users") ?>
                </label>
                <label class="btn mx-auto">
                    <input type="radio" name="options" id="displayCompaniesTable" onfocus="displayCompaniesTable(this);" autocomplete="off"> <?php echo _("Companies") ?>
                </label>
                <label class="btn mx-auto">
                    <input type="radio" name="options" id="displayExternalsTable" onfocus="displayExternalsTable(this);" autocomplete="off"> <?php echo _("Externals") ?>
                </label>
            </div>
        </div>
        <div class="row" id="tableContainer">

        </div>
    </div>
</td>