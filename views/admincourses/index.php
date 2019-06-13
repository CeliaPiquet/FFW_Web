

<?php $this->setName("content"); ?>

<div class="container-fluid">


    <div class="col-lg-12 ">
        <h1 class="text-center"> Manage courses</h1>
        <button class="btn col-md-2 " type="button" id="changeCourse" onclick="openNewCourseModal()">New course </button>
    </div>

    <table class="table table-striped table-hover " id="coursesTable">
        <thead id="coursesTableHeader">
        <tr>
            <th> <?php echo _("Name"); ?></th>
            <th> <?php echo _("Description"); ?> </th>
            <th> <?php echo _("Route state"); ?> </th>
            <th> <?php echo _("Create date"); ?>  </th>
            <th> <?php echo _("Course date") ;?> </th>
            <th> <?php echo _("Vehicle") ;?> </th>
        </tr>
        <tr >
            <td>
                <input type="text" class="list-group-item list-group-item-action" onkeyup="findCourseByFilter();" id="nameInput">
            </td>
            <td scope=""1>
            </td>
            <td>
                <select type="text" class="form-control" onchange="findCourseByFilter()" id="routeStateSelect">
                    <option selected></option>
                    <?php
                        foreach($arrRouteState as $routeState){
                            echo "<option value='".$routeState."'>".ucfirst($routeState)."</option>";
                        }
                    ?>
                </select>
            </td>
            <td>
                <input type="date" class="form-control" onkeyup="findCourseByFilter()" id="createDateInput">
            </td>
            <td>
                <input type="date" class="list-group-item list-group-item-action text-center" onkeyup="findCourseByFilter();" id="courseDateInput">
            </td>
            <td>
                <select type="text" class="form-control" onchange="findCourseByFilter()" id="vehicleSelect">
                    <option selected></option>
                    <?php
                    foreach($arrVehicles as $vehicle){
                        echo "<option value='".$vehicle->getVid()."'>".ucfirst($vehicle->getDescription())."</option>";
                    }
                    ?>
                </select>
            </td>
        </tr>
        </thead>

        <tbody id="coursesRowsContainer"></tbody>
    </table>
</div>


<div class="modal fade" id="courseModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
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
<!---->
<!--                        <div class="container">-->
<!--                            <div class="row">-->
<!--                                <div class="col-md-12 ">-->
<!--                                    <table class=" table table-striped table-hover table-responsive-md" id="basketsAffectedToCourseTable">-->
<!--                                    </table>-->
<!--                                </div-->
<!--                            </div>-->
<!--                        </div>-->

                    </div>

                    <div class="col-md-12">

                        <div class="container">
                            <div class="row">
                                <div class="col-md-12 ">
                                    <table class=" table table-striped table-hover table-responsive-md" id="basketsTable">
                                        <thead>
                                            <th> <?php echo _("contact"); ?></th>
                                            <th> <?php echo _("createDate"); ?> </th>
                                        </thead>
                                        <tbody id="basketRowsContainer">

                                        </tbody>
                                    </table>
                                </div
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
<!--                    <button type="button" onclick="updateSkills()" class="btn btn-primary" data-dismiss="modal">Confirm</button>-->
                </div>
            </div>
        </div>
    </div>
</div>
<!---->
<!---->
<!-- Modal to add product to room -->
<!--<div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">-->
<!--    <div class="modal-dialog modal-xl" role="document">-->
<!--        <div class="modal-content">-->
<!--            <div class="modal-content">-->
<!--                <div class="modal-header">-->
<!--                    <h5 class="modal-title" id="modalTitle"></h5>-->
<!--                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
<!--                        <span aria-hidden="true">&times;</span>-->
<!--                    </button>-->
<!--                </div>-->
<!--                <div class="modal-body">-->
<!--                    <div id="userGeneral">-->
<!--                        <div class="col-md-12">-->
<!--                            <div class="row mt-3 ">-->
<!--                                <div class="col-md-8">-->
<!---->
<!--                                    <div class="form-row my-auto mx-auto">-->
<!--                                        <div class="col-md-6">-->
<!--                                            <label for="lastname">--><?php //echo _("Last name"); ?><!--</label>-->
<!--                                            <input  type="text" class="form-control" id="lastname" readonly>-->
<!--                                        </div>-->
<!--                                        <div class="col-md-6">-->
<!--                                            <label for="firstname">--><?php //echo _("First name"); ?><!--</label>-->
<!--                                            <input  type="text" class="form-control" id="firstname" readonly>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                    <div class="form-row my-auto mx-auto">-->
<!--                                        <div class="col-md-6">-->
<!--                                            <label for="email">--><?php //echo _("Mail address"); ?><!--</label>-->
<!--                                            <input  class="form-control" id="email"readonly >-->
<!--                                        </div>-->
<!--                                        <div class="col-md-6">-->
<!--                                            <label for="tel">--><?php //echo _("Phone"); ?><!--</label>-->
<!--                                            <input class="form-control" id="tel" readonly>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!---->
<!--                                    <div class="row my-3">-->
<!--                                        <div class="col-md-6">-->
<!--                                            <label for="skillsSelectEditable">User skills</label>-->
<!--                                            <select type="text" class="form-control"  id="skillsSelectEditable">-->
<!--                                            </select>-->
<!--                                        </div>-->
<!--                                        <div class="col-md-6">-->
<!--                                            <label for="skillsStatusSelectEditable">Skills status</label>-->
<!--                                            <select type="text" class="form-control" id="skillsStatusSelectEditable">-->
<!--                                                --><?php
//                                                foreach($arrSkillsStatus as $skillStatus){
//                                                    echo "<option value='".$skillStatus."'>".ucfirst($skillStatus)."</option>";
//                                                }
//                                                ?>
<!--                                            </select>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!---->
<!--                                </div>-->
<!--                                <div class="col-md-4 list-group">-->
<!--                                    <div class="list-group" id="userRightsList">-->
<!--                                        --><?php
//                                        foreach($arrRights as $key=>$value){
//                                            echo '<button type="button" class="list-group-item list-group-item-action" id="'.$key.'">'.$value.'</button>';
//                                        }
//                                        ?>
<!--                                    </div>-->
<!--                                </div>-->
<!---->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="row mt-3">-->
<!--                            <button class="btn col-md-2 mx-auto" type="button" data-toggle="collapse" data-target="#collapseAddress" aria-expanded="false" aria-controls="collapseExample">-->
<!--                                Address-->
<!--                            </button>-->
<!--                            <button class="btn col-md-2 mx-auto" type="button" data-toggle="collapse" data-target="#collapsedCompanies" aria-expanded="false" aria-controls="collapseExample">-->
<!--                                Companies-->
<!--                            </button>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="collapse my-auto" id="collapseAddress">-->
<!--                        <div class="form-row">-->
<!--                            <div class="col-md-2">-->
<!--                                <label for="houseNumber">--><?php //echo _("House number"); ?><!--</label>-->
<!--                                <input type="text" class="form-control" id="houseNumber" readonly>-->
<!--                            </div>-->
<!--                            <div class="col-md-10">-->
<!--                                <label for="streetAddress">--><?php //echo _("Street address"); ?><!--</label>-->
<!--                                <input type="text" class="form-control" id="streetAddress" readonly>-->
<!--                            </div>-->
<!--                        </div>-->
<!---->
<!--                        <div class="form-row">-->
<!--                            <label for="complement">--><?php //echo _("Complement"); ?><!--</label>-->
<!--                            <input type="text" class="form-control" id="complement" readonly>-->
<!--                        </div>-->
<!---->
<!--                        <div class="form-row">-->
<!--                            <div class="col-md-6">-->
<!--                                <label for="cityName">--><?php //echo _("City") ;?><!--</label>-->
<!--                                <input type="text" class="form-control" id="cityName"  readonly>-->
<!--                            </div>-->
<!--                            <div class="col-md-2">-->
<!--                                <label for="cityCode">--><?php //echo _("Zip code"); ?><!--</label>-->
<!--                                <input type="text" class="form-control" id="cityCode" readonly>-->
<!--                            </div>-->
<!--                            <div class="col-md-4">-->
<!--                                <label for="country">--><?php //echo _("Country"); ?><!--</label>-->
<!--                                <input id="country" class="form-control" name="country" readonly>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="collapse my-auto "  id="collapsedCompanies">-->
<!--                        <table class="table table-striped table-hover " >-->
<!--                            <thead>-->
<!--                            <tr>-->
<!--                                <th> --><?php //echo _("Name"); ?><!--</th>-->
<!--                                <th> --><?php //echo _("SIRET"); ?><!-- </th>-->
<!--                                <th> --><?php //echo _("Phone"); ?><!-- </th>-->
<!--                            </tr>-->
<!--                            </thead>-->
<!--                            <tbody id="companiesTable"></tbody>-->
<!--                        </table>-->
<!---->
<!--                    </div>-->
<!---->
<!--                </div>-->
<!--                <div class="modal-footer">-->
<!--                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>-->
<!--                    <button type="button" onclick="updateUser()" class="btn btn-primary" data-dismiss="modal">Confirm</button>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->

