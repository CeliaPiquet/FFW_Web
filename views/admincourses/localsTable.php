<thead>
<tr>
    <th> <?php echo _("Name"); ?></th>
    <th> <?php echo _("City"); ?> </th>
</tr>
<tr >
    <td>
        <input type="text" name="filterInput" class="form-control" onkeyup="findLocalsByFilter()" id="nameInput" placeholder="<?php echo _("Name");?>">
    </td>
    <td>
        <input type="text" name="filterInput" class="form-control" onkeyup="findLocalsByFilter()" id="cityInput" placeholder="<?php echo _("City"); ?>">
    </td>
</tr>
</thead>

<tbody class="genericRowContainer"  id="localRowsContainer"></tbody>

