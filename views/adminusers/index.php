

<?php $this->setName("content"); ?>

<div class="container-fluid">


    <div class="col-lg-12 ">
        <h1 class="text-center"> Manage users</h1>
        <button class="btn col-md-2 " type="button" id="changeSkills" onclick="openSkillsModal()">Change skills </button>
    </div>

    <table class="table table-striped table-hover " id="usersTable">
        <thead>
        <tr>
            <th> <?php echo _("Mail"); ?></th>
            <th> <?php echo _("Last name"); ?> </th>
            <th> <?php echo _("First name"); ?> </th>
            <th> <?php echo _("City"); ?>  </th>
            <th> <?php echo _("Skills") ;?> </th>
            <th> <?php echo _("Skills status") ;?> </th>
            <th> <?php echo _("Right"); ?> </th>
        </tr>
        <tr >
            <td>
                <input type="text" class="form-control" onkeyup="findusersByFilter()" id="mailInput" placeholder="<?php echo _("Mail");?>">
            </td>
            <td>
                <input type="text" class="form-control" onkeyup="findusersByFilter()" id="lastnameInput" placeholder="<?php echo _("Last name"); ?>">
            </td>
            <td>
                <input type="text" class="form-control" onkeyup="findusersByFilter()" id="firstnameInput" placeholder="<?php echo _("First name"); ?>">
            </td>
            <td>
                <input type="text" class="form-control" onkeyup="findusersByFilter()" id="cityInput" placeholder="<?php echo _("City"); ?>">
            </td>

            <td>
                <select type="text" class="form-control" onchange="findusersByFilter()" id="skillsSelect">
                    <option selected></option>
                <?php
                    foreach($arrSkills as $skill){
                        echo "<option value='".$skill->getSkId()."'>".$skill->getName()."</option>";
                    }
                ?>
                </select>
            </td>
            <td>
                <select type="text" class="form-control" onchange="findusersByFilter()" id="skillsStatusSelect">
                    <option selected></option>
                    <?php
                    foreach($arrSkillsStatus as $skillStatus){
                        echo "<option value='".$skillStatus."'>".ucfirst($skillStatus)."</option>";
                    }
                    ?>
                </select>
            </td>User
            <td>
                <select type="text" class="form-control" onchange="findusersByFilter()" id="rightsSelect">
                    <option selected></option>
                    <?php
                    foreach($arrRights as $key=>$value){
                        echo "<option value='".$key."'>".$value."</option>";
                    }
                ?>
                </select>
            </td>
        </tr>
        </thead>
        <tbody id="userRowsContainer"></tbody>
    </table>
</div>


<div class="modal fade" id="userModal" tabindex="-1" role="dialog"  aria-hidden="false">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitle"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="userGeneral">
                    <div class="col-md-12">
                        <div class="row mt-3 ">
                            <div class="col-md-8">

                                <div class="form-row my-auto mx-auto">
                                    <div class="col-md-6">
                                        <label for="lastname"><?php echo _("Last name"); ?></label>
                                        <input  type="text" class="form-control" id="lastname" readonly>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="firstname"><?php echo _("First name"); ?></label>
                                        <input  type="text" class="form-control" id="firstname" readonly>
                                    </div>
                                </div>
                                <div class="form-row my-auto mx-auto">
                                    <div class="col-md-6">
                                        <label for="email"><?php echo _("Mail address"); ?></label>
                                        <input  class="form-control" id="email"readonly >
                                    </div>
                                    <div class="col-md-6">
                                        <label for="tel"><?php echo _("Phone"); ?></label>
                                        <input class="form-control" id="tel" readonly>
                                    </div>
                                </div>

                                <div class="row my-3">
                                    <div class="col-md-6">
                                        <label for="skillsSelectEditable">User skills</label>
                                        <select type="text" class="form-control"  id="skillsSelectEditable">
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="skillsStatusSelectEditable">Skills status</label>
                                        <select type="text" class="form-control" id="skillsStatusSelectEditable">
                                            <?php
                                            foreach($arrSkillsStatus as $skillStatus){
                                                echo "<option value='".$skillStatus."'>".ucfirst($skillStatus)."</option>";
                                            }
                                            ?>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-4 list-group">
                                <div class="list-group" id="userRightsList">
                                    <?php
                                    foreach($arrRights as $key=>$value){
                                        echo '<button type="button" class="list-group-item list-group-item-action" id="'.$key.'">'.$value.'</button>';
                                    }
                                    ?>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="row mt-3">
                        <button class="btn col-md-2 mx-auto" type="button" data-toggle="collapse" data-target="#collapseAddress" aria-expanded="false" aria-controls="collapseExample">
                            Address
                        </button>
                        <button class="btn col-md-2 mx-auto" type="button" data-toggle="collapse" data-target="#collapsedCompanies" aria-expanded="false" aria-controls="collapseExample">
                            Companies
                        </button>
                    </div>
                </div>
                <div class="collapse my-auto" id="collapseAddress">
                    <div class="form-row">
                        <div class="col-md-2">
                            <label for="houseNumber"><?php echo _("House number"); ?></label>
                            <input type="text" class="form-control" id="houseNumber" readonly>
                        </div>
                        <div class="col-md-10">
                            <label for="streetAddress"><?php echo _("Street address"); ?></label>
                            <input type="text" class="form-control" id="streetAddress" readonly>
                        </div>
                    </div>

                    <div class="form-row">
                        <label for="complement"><?php echo _("Complement"); ?></label>
                        <input type="text" class="form-control" id="complement" readonly>
                    </div>

                    <div class="form-row">
                        <div class="col-md-6">
                            <label for="cityName"><?php echo _("City") ;?></label>
                            <input type="text" class="form-control" id="cityName"  readonly>
                        </div>
                        <div class="col-md-2">
                            <label for="cityCode"><?php echo _("Zip code"); ?></label>
                            <input type="text" class="form-control" id="cityCode" readonly>
                        </div>
                        <div class="col-md-4">
                            <label for="country"><?php echo _("Country"); ?></label>
                            <input id="country" class="form-control" name="country" readonly>
                        </div>
                    </div>
                </div>
                <div class="collapse my-auto "  id="collapsedCompanies">
                    <table class="table table-striped table-hover " >
                        <thead>
                        <tr>
                            <th> <?php echo _("Name"); ?></th>
                            <th> <?php echo _("SIRET"); ?> </th>
                            <th> <?php echo _("Phone"); ?> </th>
                        </tr>
                        </thead>
                        <tbody id="companiesTable"></tbody>
                    </table>

                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" onclick="updateUser()" class="btn btn-primary" data-dismiss="modal">Confirm</button>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" id="skillsModal" tabindex="-1" role="dialog"  aria-hidden="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-8">
                                <input type="text" class="form-control" id="skillEdit">
                            </div>
                            <button class="btn col-md-2 mx-auto" id="addSkillBtn" onclick="addSkill();">
                                Add skill
                            </button>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <ul class="list-group list-group-horizontal">
                                    <button type="button" class="list-group-item list-group-item-action text-center" onclick="showEnabledSkills();" id="enabledSkills">Enabled</button>
                                    <button type="button" class="list-group-item list-group-item-action text-center" onclick="showDisabledSkills();"  id="disabledSkills">Disabled</button>
                                </ul
                            </div>
                        </div>
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12 ">
                                    <table class=" table table-striped table-hover table-responsive-md" >
                                        <thead>
                                        <tr scope="row" >
                                            <th scope="col"> <?php echo _("Name"); ?></th>
                                            <th scope="col"> <?php echo _("Change status"); ?> </th>
                                        </tr>
                                        </thead>
                                        <tbody id="skillsTable"></tbody>
                                    </table>
                                </div
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" onclick="updateSkills()" class="btn btn-primary" data-dismiss="modal">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</div>


