<td>
    <input type="text" name="courseInput" class="form-control to-update"  id="name" object="service" placeholder="Name">
</td>
<td>
    <input type="text" name="courseInput" class="form-control to-update"  id="description" object="service" placeholder="Description">
</td>
<td>
    <select type="text" name="courseInput" class="form-control" object="service"  id="status">
        <option selected></option>
        <?php
            foreach($arrRouteState as $routeState){
                echo "<option value='".$routeState."'>".ucfirst($routeState)."</option>";
            }
        ?>
    </select>
</td>
<td>
    <input type="date" name="courseInput" class="form-control"  id="createTime" object="service" readonly>
</td>
<td>
    <input type="date" name="courseInput"  class="form-control" id="serviceDate" object="service">
    <input type="time" name="courseInput"  class="form-control" id="serviceTime" object="service">
</td>
<td>
    <button class="btn  mx-auto"  id="description" object="vehicle" onclick="openVehiclesModal(this);" type="button" ><?php echo _("Select vehicle");?></button>
</td>
<td>
    <button class="btn  mx-auto" id="openMapModal"  onclick="openMapModal(this);" type="button" ><?php echo _("Course map");?></button>
</td>
<td>
    <button class="btn  mx-auto" id="collapseBaskets" type="button" ><?php echo _("Baskets");?></button>
</td>
<td>
    <button class="btn  mx-auto" id="lastname" object="user" type="button" onclick="openDriversModal(this);" disabled ><?php echo _("Select driver");?></button>
</td>
