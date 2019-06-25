<td>
    <input type="text" name="courseInput" class="form-control to-update" onkeyup="controlCourseToAPIUpdate(this)" id="name" object="service" placeholder="Name">
</td>
<td>
    <input type="text" name="courseInput" class="form-control to-update" onkeyup="controlCourseToAPIUpdate(this)" id="description" object="service" placeholder="Description">
</td>
<td>
    <select type="text" name="courseInput" class="form-control" object="service" onchange="controlCourseToAPIUpdate(this)" id="status">
        <?php
            foreach($arrRouteState as $routeState){
                echo "<option value='".$routeState."'>".ucfirst($routeState)."</option>";
            }
        ?>
    </select>
</td>
<td>
    <input type="date" name="courseInput" class="form-control"  id="createDate" object="service" readonly>
</td>
<td>
    <input type="date" name="courseInput"  class="form-control" id="serviceStartDate" onchange="changeServiceTime(this);" object="service">
    <input type="time" name="courseInput"  class="form-control dateLock" id="serviceStartTime" onchange="changeServiceTime(this);"  object="service" step="1" >
</td>
<td>
    <input type="time" name="courseInput" class="form-control"  id="durationTime" onchange="changeServiceTime(this);" object="service" step="1">
</td>
<td>
    <input type="date" name="courseInput"  class="form-control" id="serviceEndDate" onchange="changeServiceTime(this);" object="service">
    <input type="time" name="courseInput"  class="form-control dateLock" id="serviceEndTime" onchange="changeServiceTime(this);" object="service" step="1" >
</td>
<td>
    <button class="btn  mx-auto dateLock"   name="courseInput" id="description" object="vehicle" onclick="openVehiclesModal(this);" type="button" disabled ><?php echo _("Select vehicle");?></button>
</td>
<td>
    <button class="btn  mx-auto"   name="courseInput" id="openMapModal"  onclick="openMapModal(this);" type="button" ><?php echo _("Course map");?></button>
</td>
<td>
    <button class="btn  mx-auto"  name="courseInput" id="collapseBaskets" type="button"  onclick="collapseBasketRow(this);" ><?php echo _("Baskets");?></button>
</td>
<td>
    <button class="btn  mx-auto dateLock" name="courseInput"  id="lastname" object="user" type="button" onclick="openDriversModal(this);" disabled ><?php echo _("Select driver");?></button>
</td>
