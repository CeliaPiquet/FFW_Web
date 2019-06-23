<td>
    <input type="text" name="eventInput" class="form-control to-update" id="name" object="service" placeholder="Name">
</td>
<td>
    <input type="text" name="eventInput" class="form-control to-update"  id="description" object="service" placeholder="Description">
</td>
<td>
    <select type="text" name="eventInput" class="form-control" object="service"  id="status">
        <option selected></option>
        <?php
        foreach($arrEventState as $eventState){
            echo "<option value='".$eventState."'>".ucfirst($eventState)."</option>";
        }
        ?>
    </select>
</td>
<td>
    <input type="date" name="eventInput" class="form-control"  id="createDate" object="service" readonly>
</td>
<td>
    <input type="date" name="eventInput"  class="form-control" id="serviceStartDate" onchange="changeServiceTime(this);" object="service">
    <input type="time" name="eventInput"  class="form-control" id="serviceStartTime" onchange="changeServiceTime(this);"  object="service" step="1" disabled>
</td>
<!--<td>-->
<!--    <input type="time" name="eventInput" class="form-control"  id="durationTime" object="service" readonly>-->
<!--</td>-->
<td>
    <input type="date" name="eventInput"  class="form-control" id="serviceEndDate" onchange="changeServiceTime(this);" object="service">
    <input type="time" name="eventInput"  class="form-control" id="serviceEndTime" onchange="changeServiceTime(this);" object="service" step="1" disabled>
</td>
<!--<td>-->
<!--    <button class="btn  mx-auto dateLock"   name="eventInput" id="description" object="vehicle" onclick="openVehiclesModal(this);" type="button" disabled >--><?php //echo _("Select vehicle");?><!--</button>-->
<!--</td>-->
<!--<td>-->
<!--    <button class="btn  mx-auto"   name="eventInput" id="openMapModal"  onclick="openMapModal(this);" type="button" >--><?php //echo _("Course map");?><!--</button>-->
</td>
<!--<td>-->
<!--    <button class="btn  mx-auto"  name="eventInput" id="collapseBaskets" type="button"  onclick="collapseBasketRow(this);" >--><?php //echo _("Baskets");?><!--</button>-->
<!--</td>-->
<!--<td>-->
<!--    <button class="btn  mx-auto dateLock" name="eventInput"  id="lastname" object="user" type="button" onclick="openDriversModal(this);" disabled >--><?php //echo _("Select driver");?><!--</button>-->
<!--</td>-->
