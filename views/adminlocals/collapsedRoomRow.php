<td colspan="5">
    <div class="collapse my-auto" id="collapseRooms">
        <table class="table table-striped table-hover " id="localsTable">
            <thead>
            <tr>
                <th> <?php echo _("Category"); ?></th>
                <th> <?php echo _("Name"); ?> </th>
                <th> <?php echo _("Limit date"); ?> </th>
                <th> <?php echo _("Condition"); ?> </th>
                <th> <?php echo _("Check product"); ?> </th>
            </tr>
            <tr >
                <td>
                    <input type="text" class="form-control" onkeyup="sortProductByFilter()" name="sortProductInput" id="articleCategory" placeholder="<?php echo _("Category");?>">
                </td>
                <td>
                    <input type="text" class="form-control" onkeyup="sortProductByFilter()" name="sortProductInput" id="articleName" placeholder="<?php echo _("Name"); ?>">
                </td>
                <td>
                    <input type="date" class="form-control" onchange="sortProductByFilter()" name="sortProductInput" id="limitDate" placeholder="<?php echo _("Limit date");?>">
                </td>
                <td>
                    <select id="state"  name="sortProductInput" onchange="sortProductByFilter()">
                        <option></option>
                        <?php
                        foreach($arrProductConditions as $productCondition){
                            echo "<option value='".$productCondition."'>".ucfirst($productCondition)."</option>";
                        }
                        ?>
                    </select>
                </td>
                <td>
                    <input type="checkbox" class="form-control" onclick="checkAllProduct()" id="checkProductInput">
                </td>
            </tr>
            </thead>
            <tbody id="roomsContainer">

            </tbody>
        </table>
    </div>
</td>
