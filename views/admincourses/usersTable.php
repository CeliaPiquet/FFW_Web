<thead>
<tr>
    <th> <?php echo _("Mail"); ?></th>
    <th> <?php echo _("Last name"); ?> </th>
    <th> <?php echo _("First name"); ?> </th>
    <th> <?php echo _("City"); ?>  </th>
</tr>
<tr >
    <td>
        <input type="text" class="form-control" onkeyup="findUsersByFilter(this)" id="mailInput" placeholder="<?php echo _("Mail");?>">
    </td>
    <td>
        <input type="text" class="form-control" onkeyup="findUsersByFilter(this)" id="lastnameInput" placeholder="<?php echo _("Last name"); ?>">
    </td>
    <td>
        <input type="text" class="form-control" onkeyup="findUsersByFilter(this)" id="firstnameInput" placeholder="<?php echo _("First name"); ?>">
    </td>
    <td>
        <input type="text" class="form-control" onkeyup="findUsersByFilter(this)" id="cityInput" placeholder="<?php echo _("City"); ?>">
    </td>
</tr>
</thead>
<tbody id="userRowsContainer"></tbody>
