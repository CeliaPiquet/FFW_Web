<thead>
<tr>
    <th> <?php echo _("Description"); ?></th>
    <th> <?php echo _("Volume"); ?> </th>
    <th> <?php echo _("Insurance date"); ?> </th>
    <th> <?php echo _("Last revision"); ?>  </th>
    <th> <?php echo _("Availability"); ?> </th>
</tr>
<tr >
    <td>
        <input type="text" name="filterInput" class="form-control" id="descriptionInput" onkeyup="findVehiclesByFilter(this);" placeholder="<?php echo _("Description");?>">
    </td>
    <td>
        <input type="number" name="filterInput" class="form-control" id="volumeInput" onkeyup="findVehiclesByFilter(this);"  placeholder="<?php echo _("Volume"); ?>">
    </td>
    <td>
        <input type="date" name="filterInput" class="form-control" id="insuranceDateInput" onkeyup="findVehiclesByFilter(this);" placeholder="<?php echo _("Insurance date"); ?>">
    </td>
    <td>
        <input type="date" name="filterInput" class="form-control" id="lastRevisionInput" onkeyup="findVehiclesByFilter(this);" placeholder="<?php echo _("Last revision"); ?>">
    </td>
<!--    <td>-->
<!--        <button type="date" name="filterInput" class="form-control" id="lastRevisionInput" placeholder="--><?php //echo _("City"); ?><!--">-->
<!--    </td>-->
</tr>
</thead>
<tbody class="genericRowContainer"  id="vehicleRowsContainer"></tbody>
