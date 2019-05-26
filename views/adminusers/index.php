

<?php $this->setName("content"); ?>

<div class="container">
    <div class="row" id="actionList" style="display: none">
        <div class="col-md-3">
            <h5><?php echo _('Actions:') ?> </h5>
        </div>
        <div class="col-md-3">
            <a class="btn" id="addNewProduct" onclick="modalDisplay('addProduct')"><?php echo _('Add a product to a room') ?></a>
        </div>
        <div class="col-md-3">
            <a class="btn" id="changeProductRoom" onclick="modalDisplay('changeRoomModal')"><?php echo _('Affect another room to a product') ?></a>
        </div>
        <div class="col-md-3">
            <a class="btn" id="removeProduct" onclick="modalDisplay('removeModal')"><?php echo _("Delete a product from the room"); ?></a>
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
