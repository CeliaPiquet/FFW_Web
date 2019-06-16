<td>
    <select type="text" class="form-control"     id="status">
        <option selected></option>
        <?php
            foreach($arrBasketStatus as $basketStatus){
                echo "<option value='".$basketStatus."'>".ucfirst($basketStatus)."</option>";
            }
        ?>
    </select>
</td>
<td>
    <select type="text" class="form-control" class="form-control"  id="role">
        <option selected></option>
        <?php
            foreach($arrBasketRole as $basketRole){
                echo "<option value='".$basketRole."'>".ucfirst($basketRole)."</option>";
            }
        ?>
    </select>
</td>
<td>
    <input type="date" class="form-control"  id="createTime">
</td>
<td>
    <button class="btn col-md-2 mx-auto" id="collapseBtnProduct" type="button" >Products</button>
</td>
<td>
    <button class="btn col-md-2 mx-auto" id="validateBtn" type="button" onclick="validateBasket(this)" >Validate</button>
</td>
<td>
    <button class="btn col-md-2 mx-auto" id="cancelBtn" type="button" onclick="cancelBasket(this)" >Cancel</button>
</td>
<td>
    <div class="alert alert-dark">Total quantity : <span id="totalQuantity"></span></div>
</td>

