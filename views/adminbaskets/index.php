

<?php $this->setName("content"); ?>

<div class="container">
    <div class="col-lg-12 ">
        <h1 class="text-center"> Manage baskets</h1>
        <button class="btn col-md-2 " type="button" id="displayBasketModal" onclick="openLocalModal()">Create basket</button>
    </div>

    <table class="table table-striped table-hover " id="basketsTable">
        <thead id="basketsTableHeader">
        <tr>
            <th> <?php echo _("Status"); ?></th>
            <th> <?php echo _("Role"); ?> </th>
            <th> <?php echo _("Create date"); ?> </th>
            <th> <?php echo _("Order by quantity"); ?> </th>
        </tr>
        <tr >
            <td>
                <select type="text" class="form-control" onchange="findBasketsByFilter()" id="basketStatusSelect">
                    <option selected></option>
                    <?php
                    foreach($arrBasketStatus as $basketStatus){
                        echo "<option value='".$basketStatus."'>".ucfirst($basketStatus)."</option>";
                    }
                    ?>
                </select>
            </td>
            <td>
                <select type="text" class="form-control" onchange="findBasketsByFilter()" id="basketRoleSelect">
                    <option selected></option>
                    <?php
                    foreach($arrBasketRole as $basketRole){
                        echo "<option value='".$basketRole."'>".ucfirst($basketRole)."</option>";
                    }
                    ?>
                </select>
            </td>
            <td>
                <input type="date" class="list-group-item list-group-item-action text-center" onchange="findBasketsByFilter();" id="createDateInput">
            </td>
            <td>
            <button type="button" class="list-group-item list-group-item-action text-center" onclick="changeBasketQuantityOrder();" id="quantityOrderBtn"><i id="arrowBasketOrder" class="fas fa-arrow-up"></i></button>
            </td>
        </tr>
        </thead>
        <tbody id="basketRowsContainer">

        </tbody>
    </table>
</div>



<div class="modal fade" id="selectLocalModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <div id="createBasketGeneral">
                        <div class="col-md-12">
                            <table class="table table-striped table-hover " id="localsTable">
                                <thead>
                                <tr>
                                    <th> <?php echo _("Name"); ?></th>
                                    <th> <?php echo _("City"); ?> </th>
                                    <th> <?php echo _("Quantity order"); ?> </th>
                                </tr>
                                <tr >
                                    <td>
                                        <input type="text" class="form-control" onkeyup="findLocalsByFilter()" id="nameInput" placeholder="<?php echo _("Name");?>">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" onkeyup="findLocalsByFilter()" id="cityNameInput" placeholder="<?php echo _("City"); ?>">
                                    </td>
                                    <td>
                                        <button type="button" class="list-group-item list-group-item-action text-center" onclick="changeLocalQuantityOrder();" id="quantityOrderBtn"><i id="arrowLocalOrder" class="fas fa-arrow-up"></i></button>
                                    </td>
                                </tr>
                                </thead>
                                <tbody id="localRowsContainer">

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" onclick="updateUser()" class="btn btn-primary" data-dismiss="modal">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="createBasketModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
    <div class="modal-dialog modal-lg role="document">
        <div class="modal-content">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <div id="createBasketGeneral">
                        <div class="col-md-12">
                            <table class="table table-striped table-hover " id="productsTable">
                                <thead>
                                <tr>
                                    <th> <?php echo _("Category"); ?></th>
                                    <th> <?php echo _("Name"); ?> </th>
                                    <th> <?php echo _("Limit date"); ?> </th>
                                    <th> <?php echo _("Condition"); ?> </th>
                                    <th> <?php echo _("Check product"); ?> </th>
                                </tr>
                                <tr >
                                    <td>
                                        <input type="text" class="form-control" onkeyup="sortProductByFilter(this)" name="sortProductInput" id="articleCategory" placeholder="<?php echo _("Category");?>">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" onkeyup="sortProductByFilter(this)" name="sortProductInput" id="articleName" placeholder="<?php echo _("Name"); ?>">
                                    </td>
                                    <td>
                                        <input type="date" class="form-control" onchange="sortProductByFilter(this)" name="sortProductInput" id="limitDate" placeholder="<?php echo _("Limit date");?>">
                                    </td>
                                    <td>
                                        <select id="state"  name="sortProductInput" class="form-control"  onchange="sortProductByFilter(this)">
                                            <option></option>
                                            <?php
                                                foreach($arrProductConditions as $productCondition){
                                                    echo "<option value='".$productCondition."'>".ucfirst($productCondition)."</option>";
                                                }
                                            ?>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="checkbox" class="form-control" onclick="checkAllProduct(this)" id="checkProductInput">
                                    </td>
                                </tr>
                                </thead>
                                <tbody id="productRowsContainer">

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" onclick="basketToAPI()" class="btn btn-primary" data-dismiss="modal">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</div>
