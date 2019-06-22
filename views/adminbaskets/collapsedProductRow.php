<td colspan="5">
    <div class="collapse my-auto" id="collapseProducts">
        <table class="table table-striped table-hover " id="productsTable">
            <thead>
            <tr>
                <th> <?php echo _("Category"); ?></th>
                <th> <?php echo _("Name"); ?> </th>
                <th> <?php echo _("Limit date"); ?> </th>
                <th> <?php echo _("Condition"); ?> </th>
                <th> <?php echo _("Check product"); ?> </th>
                <th> <?php echo _("Action"); ?> </th>
            </tr>
            <tr >
                <td>
                    <input type="text" class="form-control" onkeyup="sortProductByFilter(this)" name="sortProductInput" id="articleCategory" placeholder="<?php echo _("Category");?>">
                </td>
                <td>
                    <input type="text" class="form-control" onkeyup="sortProductByFilter(this)" name="sortProductInput" id="articleName" placeholder="<?php echo _("Name"); ?>">
                </td>
                <td>
                    <input type="date" class="form-control" onchange="sortProductByFilter(this)" name="sortProductInput" id="createTime" placeholder="<?php echo _("Limit date");?>">
                </td>
                <td>
                    <select id="state"  name="sortProductInput" onchange="sortProductByFilter(this)">
                        <option></option>
                        <?php
                        foreach($arrProductConditions as $productCondition){
                            echo "<option value='".$productCondition."'>".ucfirst($productCondition)."</option>";
                        }
                        ?>
                    </select>
                </td>
                <td>
                    <input type="checkbox" class="form-control" onclick="checkAllProduct(this)" id="checkProductInput">
                </td>
                <td>
                        <button type="checkbox" class=" btn" onclick="removeProduct(this)" id="removeProduct">Remove product</button>
                </td>
            </tr>
            </thead>
            <tbody id="productRowsContainer">

            </tbody>
        </table>
    </div>
</td>
