<thead>
<tr>
    <th> <?php echo _("Mail"); ?></th>
    <th> <?php echo _("Name"); ?> </th>
    <th> <?php echo _("City"); ?>  </th>
</tr>
<tr >
    <td>
        <input type="text" class="form-control" name="filterInput" onkeyup="findExternalsByFilter(this)" id="mailInput" placeholder="<?php echo _("Mail");?>">
    </td>
    <td>
        <input type="text" class="form-control" name="filterInput" onkeyup="findExternalsByFilter(this)" id="nameInput" placeholder="<?php echo _("Name"); ?>">
    </td>
    <td>
        <input type="text" class="form-control" name="filterInput"  onkeyup="findExternalsByFilter(this)" id="cityInput" placeholder="<?php echo _("City"); ?>">
    </td>
</tr>
</thead>
<tbody class="genericRowContainer" id="externalRowsContainer"></tbody>
