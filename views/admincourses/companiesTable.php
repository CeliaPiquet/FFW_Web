<thead>
<tr>
    <th> <?php echo _("SIRET"); ?></th>
    <th> <?php echo _("Name"); ?> </th>
    <th> <?php echo _("City"); ?> </th>
</tr>
<tr >
    <td>
        <input type="text" name="filterInput" class="form-control" onkeyup="findCompaniesByFilter(this)" id="siretInput" placeholder="<?php echo _("Mail");?>">
    </td>
    <td>
        <input type="text" name="filterInput" class="form-control" onkeyup="findCompaniesByFilter(this)" id="nameInput" placeholder="<?php echo _("Name"); ?>">
    </td>
    <td>
        <input type="text" name="filterInput" class="form-control" onkeyup="findCompaniesByFilter(this)" id="cityInput" placeholder="<?php echo _("City"); ?>">
    </td>
</tr>
</thead>
<tbody class="genericRowContainer"   id="companyRowsContainer"></tbody>
