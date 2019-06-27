<td>
    <select type="text" class="form-control" name="basketsInput"  object="basket"   id="status">
        <option selected></option>
        <?php
            foreach($arrBasketStatus as $basketStatus){
                echo "<option value='".$basketStatus."'>".ucfirst($basketStatus)."</option>";
            }
        ?>
    </select>
</td>
<td>
    <select type="text" name="basketsInput" class="form-control" object="basket" class="form-control"  id="role">
        <option selected></option>
        <?php
            foreach($arrBasketRole as $basketRole){
                echo "<option value='".$basketRole."'>".ucfirst($basketRole)."</option>";
            }
        ?>
    </select>
</td>
<td>
    <input type="date" name="basketsInput" class="form-control" object="basket" id="createTime">
</td>
<td>
    <button class="btn mx-auto" id="collapseBtnProduct" type="button" ><?php echo _("Products") ;?></button>
</td>
<td>
    <button class="btn mx-auto" name="basketsInput" id="validated" value="validated " type="button" onclick="changeBasketStatus(this)" ><?php echo _("Validate") ;?></button>
</td>
<td>
    <button class="btn mx-auto" name="basketsInput"  id="refused" value="refused"  type="button" onclick="changeBasketStatus(this)" ><?php echo _("Refuse") ;?></button>
</td>
<td>
    <button class="btn mx-auto" name="basketsInput" id="canceled" value="canceled" type="button" onclick="changeBasketStatus(this)" > <?php echo _("Cancel") ; ?></button>
</td>
<td>
    <div class="alert alert-dark"><?php echo _("Total quantity :") ;?><span id="totalQuantity"></span></div>
</td>

