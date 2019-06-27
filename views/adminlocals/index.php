

<?php $this->setName("content"); ?>

<div class="container">
    <h1 class="text-center"><?php echo  _("Manage locals");?></h1>

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
                <button type="button" class="list-group-item list-group-item-action text-center" onclick="changeQuantityOrder();" id="quantityOrderBtn"><i id="arrowOrder" class="fas fa-arrow-up"></i></button>
            </td>
            <td>
                <button type="button" class="btn" onclick="addLocal()" id="addLocal"><?php echo _("Add local"); ?></button>
            </td>
        </tr>
        </thead>
        <tbody id="localRowsContainer">

        </tbody>
    </table>
</div>
