

<?php $this->setName("content"); ?>


<h1> <?php echo _('Locals Managements') ?> </h1>

<div class="container">

        <div class="row" id="actionList" style="display: none">
            <div class="col-md-3">
                <h5><?php echo _('Actions:') ?> </h5>
            </div>
            <div class="col-md-3">
                <a class="btn" id="addRoomLocal" onclick="modalDisplay('addProduct')"><?php echo _('Add a product to a room') ?></a>
            </div>
            <div class="col-md-3">
                <a class="btn" id="changeLocal" onclick="modalDisplay('changeRoomModal')"><?php echo _('Affect another room to a product') ?></a>
            </div>
            <div class="col-md-3">
                <a class="btn" id="removeProduct" onclick="modalDisplay('removeModal')"><?php echo _("Delete a product from the room"); ?></a>
            </div>
        </div>
        <div class="row">
            <label for="addressCityNameList"><?php echo _('Select local city') ?></label>
            <select id="addressCityNameList" class="form-control col-sm-5 mx-auto" onselect="changeLocalCityList()">
                <?php
                if(isset($arrLocals)){

                    foreach($arrLocals as $local){
                        echo "<option value=".$local->getAdid().">".$local->getAddress()->getCityName()."</option>";
                    }
                }
                ?>
            </select>
            <label for="addressCityNameList"><?php echo _('Select local name') ?></label>
            <select id="localNameList" class="form-control col-sm-5 mx-auto" onselect="changeLocalNameList()">
                <?php
                if(isset($arrLocals)){
                    foreach($arrLocals as $local){
                        echo "<option value=".$local->getLoid().">".$local->getName()."</option>";
                    }
                }
                ?>
            </select>
        </div>
</div>
