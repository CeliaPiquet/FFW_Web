

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
        <p> <?php echo _('Pick a adminlocals in order to see the stocks and a room to edit its content') ?> </p>
        <div class="row" id="actionList" style="display: none">
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
                        <select class="form-control form-control" id="status" name="status">
                            <option><?php echo _('Good shape') ?></option>
                            <option><?php echo _('Good shape') ?></option>
                            <option><?php echo _('Damaged') ?></option>
                            <option><?php echo _('Unconsumable') ?></option>
                        </select>
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