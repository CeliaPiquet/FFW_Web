<td>
    <input type="text" class="form-control to-update"  id="name" object="service" placeholder="Name">
</td>
<td>
    <input type="text" class="form-control to-update"  id="description" object="service" placeholder="Description">
</td>
<td>
    <select type="text" class="form-control"  id="routeState">
        <option selected></option>
        <?php
            foreach($arrRouteState as $routeState){
                echo "<option value='".$routeState."'>".ucfirst($routeState)."</option>";
            }
        ?>
    </select>
</td>
<td>
    <input type="date" class="form-control"  id="createTime">
</td>
<td>
    <input type="date" class="form-control" id="serviceTime">
</td>
<td>
    <select type="text" class="form-control" onchange="findCourseByFilter()" id="description" object="vehicle">
        <option selected></option>
        <?php
        foreach($arrVehicles as $vehicle){
            echo "<option value='".$vehicle->getVid()."'>".ucfirst($vehicle->getDescription())."</option>";
        }
        ?>
    </select>
</td>
<td>
    <select type="text" class="form-control" onchange="findCourseByFilter()" id="description" object="affectation">
        <option selected></option>
        <?php
        foreach($arrVehicles as $vehicle){
            echo "<option value='".$vehicle->getVid()."'>".ucfirst($vehicle->getDescription())."</option>";
        }
        ?>
    </select>
</td>
<td>
    <button class="btn col-md-2 mx-auto" id="collapseBaskets" type="button" ><?php echo _("Baskets");?></button>
</td>
<td>
    <button class="btn col-md-2 mx-auto" id="displayModalDriver" type="button" ><?php echo _("Driver");?></button>
</td>
