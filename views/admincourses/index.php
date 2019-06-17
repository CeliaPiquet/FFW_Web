

<?php $this->setName("content"); ?>

<div class="container-fluid">


    <div class="col-lg-12 ">
        <h1 class="text-center"><?php echo _("Manage courses"); ?></h1>
        <button class="btn col-md-2 " type="button" id="changeCourse" onclick="openNewCourseModal()"><?php echo _("New course"); ?></button>
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
    <div class="modal-dialog modal-lg   " role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitle"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">

                <div class="col-md-12">

                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 ">
                                <table class=" table table-striped table-hover table-responsive-md" id="basketsTable">
                                    <thead id="basketsTableHeader">
                                    <tr>
                                        <th> <?php echo _("Role"); ?> </th>
                                        <th> <?php echo _("City"); ?> </th>
                                        <th> <?php echo _("Create date"); ?> </th>
                                        <th> <?php echo _("Order by quantity"); ?> </th>
                                    </tr>
                                    <tr >
                                        <td>
                                            <select type="text" class="form-control" onchange="findBasketsByFilter()" id="basketRoleSelect">
                                                <?php
                                                foreach($arrBasketRole as $basketRole){
                                                    echo "<option value='".$basketRole."'>".ucfirst($basketRole)."</option>";
                                                }
                                                ?>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" class="list-group-item list-group-item-action text-center" onkeyup="findBasketsByFilter();" id="cityNameInput">
                                        </td>
                                        <td>
                                            <input type="date" class="list-group-item list-group-item-action text-center" onkeyup="findBasketsByFilter();" id="createDateInput">
                                        </td>
                                        <td>
                                            <button type="button" class="list-group-item list-group-item-action text-center" onclick="changeBasketQuantityOrder();" id="quantityOrderBtn"><i id="arrowBasketOrder" class="fas fa-arrow-up"></i></button>
                                        </td>
                                        <td>
                                            <button class="btn" class="list-group-item list-group-item-action text-center" onclick="openLocalModal();" id="displayLocalModal"><?php echo _("Select local"); ?></button>
                                        </td>
                                    </tr>
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
                <button type="button" class="btn" data-dismiss="modal" ><?php echo _("Cancel"); ?></button>
                <button type="button" class="btn" id="createCourseBtn" onclick="createCourse();" disabled ><?php echo _("Create course"); ?></button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="localModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitle"></h5>
                <button type="button" class="close"  onclick="closeLocalModal();" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 ">
                            <table class=" table table-striped table-hover genericTable" id="localsTable">
                                <thead>
                                <tr>
                                    <th> <?php echo _("Name"); ?></th>
                                    <th> <?php echo _("City"); ?> </th>
                                </tr>
                                <tr >
                                    <td>
                                        <input type="text" class="list-group-item list-group-item-action text-center" onkeyup="findLocalsByFilter(this);" id="nameInput">
                                    </td>
                                    <td>
                                        <input type="text" class="list-group-item list-group-item-action text-center" onkeyup="findLocalsByFilter(this);" id="cityInput">
                                    </td>
                                </tr>
                                </thead>
                                <tbody id="localRowsContainer">
                                </tbody>
                            </table>
                        </div
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn" onclick="removeAffect(this);" ><?php echo _("Remove affected local"); ?></button>
                <button type="button" class="btn" onclick="closeLocalModal(this);" ><?php echo _("Cancel"); ?></button>
                <button type="button" class="btn" onclick="closeLocalModal();"><?php echo _("Confirm"); ?></button>
            </div>
        </div>
    </div>
</div>

}
