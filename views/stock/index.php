

<?php $this->setName("content"); ?>

<div class="alert alert-success alert-dismissible invisible" role="alert" id="successAlert">
    <?php echo _('Success!') ?>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class="alert alert-danger alert-dismissible invisible" role="alert" id="successAlert">
    <?php echo _('Error!') ?>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<h1> <?php echo _('Stock Managements') ?> </h1>
<div class="container localisationList" id="localisationFilter">

</div>
<div class="container" id="noResultLocals">

</div>
<div class="container">
        <p> <?php echo _('Pick a local in order to see the stocks and a room to edit its content') ?> </p>
        <div class="row">
            <div class="col-lg-3">
                <button class="btn" id="createArticle" disabled onclick="openArticleCreationModal();"><?php echo _("Create an article")?></button>
            </div>
            <div class="row" id="actionList"   style="display: none">
                <div class="col-md-3">
                    <h5><?php echo _('Actions:') ?> </h5>
                </div>
                <div class="col-md-3">
                    <a class="btn" id="addNewProduct" onclick="modalToggle('addProduct')"><?php echo _('Add a product to a room') ?></a>
                </div>
                <div class="col-md-3">
                    <a class="btn" id="changeProductRoom" onclick="modalToggle('changeRoomModal')"><?php echo _('Affect another room to a product') ?></a>
                </div>
                <div class="col-md-3">
                    <a class="btn" id="removeProduct" onclick="modalToggle('removeModal')"><?php echo _("Delete a product from the room"); ?></a>
                </div>
            </div>
        </div>
        <div class="row" id="alertMessage"> </div>
        <div class="row" id="newInputs"> </div>
        <table class="table" id="">
            <thead>
                <tr>
                    <th> <?php echo _("Article"); ?></th>
                    <th> <?php echo _("Category"); ?> </th>
                    <th> <?php echo _("Quantity") ;?> </th>
                    <th> <?php echo _("Code"); ?> </th>
                    <th>  </th>
                </tr>
                <tr>
                    <td>
                        <input type="text" class="form-control" onkeyup="findArticleByFilter()" id="nameArticleInput" placeholder="<?php echo _("Article name");?>">
                    </td>
                    <td>
                        <input type="text" class="form-control" onkeyup="findArticleByFilter()" id="categoryArticleInput" placeholder="<?php echo _("Category"); ?>">
                    </td>
                    <td>

                    </td> <!-- ajouter croissant/decroissant -->
                    <td>
                        <input type="number" class="form-control" onkeyup="findArticleByFilter()" id="codeArticleInput" /> </td>   <!-- onkeyup peut etre bien pour des petites quantités de données-->
                </tr>
            </thead>
            <tbody id="articleResultsContainer">

            </tbody>
        </table>
        <div id="emptyResultArticle">

        </div>
</div>



<div class="modal fade" id="changeRoomModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"><?php echo _("Change product rooms");?></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <div class="localisationList">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="btn" data-dismiss="modal"><?php echo _("Cancel"); ?></a>
                <button type="button" class="btn" onclick="changeRoom()"><?php echo _("Validate") ; ?></button>
            </div>
        </div>
    </div>
</div>

<!-- Modal to remove product to room -->
<div class="modal fade" id="removeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"><?php echo _("Delete products") ;?></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p> <?php echo _("Do you really want to delete this product?"); ?> </p>
            </div>
            <div class="modal-footer">
                <a class="btn" data-dismiss="modal"><?php echo _('Cancel') ?></a>
                <button type="button" class="btn" onclick="removeProduct()"><?php echo _('Confirm') ?></button>
            </div>
        </div>
    </div>
</div>


<!-- Modal to add product to room -->
<div class="modal fade" id="addProduct" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"><?php echo _('Add a product') ?></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form name="addProductForm">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="articleId"><?php echo _('Product code') ?></label>
                        <input required type="text" class="form-control" id="articleId" name="articleId" onkeyup=checkArticle()>
                        <p id="articleNamePlacement"></p>
                    </div>
                    <div class="form-group">
                        <label for="endDate"> <?php echo _('Peremption date') ?> </label>
                        <input type="date" class="form-control" id="endDate" name="endDate">
                    </div>
                    <div class="form-group">
                        <label for="status"> <?php echo _('State') ?> </label>
                        <td>
                            <select type="text" class="form-control" onchange="findCourseByFilter();" id="routeStateSelect">
                                <?php
                                foreach($arrPeremptionState as $peremptionState){
                                    echo "<option value='".$peremptionState."'>".ucfirst($peremptionState)."</option>";
                                }
                                ?>
                            </select>
                        </td>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="form-group">
                        <input type="number" class="form-control" id="numberNewProduct" placeholder="nb" min="1" max="50" value="1"/>
                    </div>
                    <a class="btn" data-dismiss="modal"><?php echo _('Cancel') ?></a>
                    <button type="button" class="btn" onclick="addProduct()"><?php echo _('Confirm') ?></button>
                </div>
            </form>
        </div>
    </div>
</div>


<div class="modal fade genericModal" id="createArticleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
    <div class="modal-dialog modal-xl   " role="document">
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
                                        <th> <?php echo _("Status"); ?> </th>
                                        <th> <?php echo _("City"); ?> </th>
                                        <th> <?php echo _("Create date"); ?> </th>
                                        <th> <?php echo _("Order by quantity"); ?> </th>
                                    </tr>
                                    <tr >
                                        <td>
                                            <select type="text" class="form-control" onchange="findBasketsByFilter(this);" id="basketRoleSelect">
                                                <?php
                                                foreach($arrBasketRole as $basketRole){
                                                    echo "<option value='".$basketRole."'>".ucfirst($basketRole)."</option>";
                                                }
                                                ?>
                                            </select>
                                        </td>
                                        <td>
                                            <select type="text" class="form-control" onchange="findBasketsByFilter(this);" id="basketStatusSelect">
                                                <?php
                                                foreach($arrBasketStatus as $basketStatus){
                                                    echo "<option value='".$basketStatus."'>".ucfirst($basketStatus)."</option>";
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
            <div class="modal-footer align-items-center">
                <div class="col-lg-3">
                    <label for="courseNameInput">
                        <?php echo _("Set course name"); ?>
                        <input type="text" class="list-group-item list-group-item-action text-center" onkeyup="setCourseName(this);" object="course" id="courseNameInput">
                    </label>
                </div>
                <button type="button" class="btn" data-dismiss="modal" ><?php echo _("Cancel"); ?></button>
                <button type="button" class="btn" id="createCourseBtn" onclick="getBasketsOrder();" disabled ><?php echo _("Create course"); ?></button>
            </div>
        </div>
    </div>
</div>