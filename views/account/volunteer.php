<?php $this->setName('content') ?>

<div class="row">
    <div class="col-md-8 mx-auto">
        <h1 class="text-center"> <?php echo  _("My calendar");?> </h1>
        <div id="calendar" class="card">

        </div>


    </div>
    <div class="col-md-4 mx-auto">
        <h1 class="text-center"> <?php echo  _("Skills");?> </h1>
        <div class="row py-2">
            <div class="col-md-12">
                <div class="row">
                    <h2 class="text-center col-md-12"><?php echo  _("Ask for new skill");?></h2>
                </div>
                <div class="row ">
                    <select id="skillsSelect"  class="text-center col-md-9" >
                        <option></option>
                        <?php
                        foreach ($arrSkills as $skill){
                            echo "<option value='".$skill->getSkid()."'>".$skill->getName()."</option>";
                        }
                        ?>
                    </select>
                    <a class="btn col-md-2 " id="addSkillBtn" onclick="addSkill()" disabled><?php echo  _("Add");?></a>
                </div>

            </div>
        </div>
        <div class="row py-2">
            <div class="col-md-11 mx-auto">
                <div class="row">
                    <h2 class="text-center col-md-12"><?php echo  _("My skills");?></h2>
                </div>
                <div class="row ">
                    <div class="list-group col-md-12" id="skillsUserContainer">
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<!-- Modal to add product to room -->
<div class="modal fade" id="skillModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p><?php echo  _("You will receive confirmation message to this email : ");?><a id="email"></a></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"><?php echo  _("Cancel");?></button>
                    <button type="button" onclick="skillAPI()" class="btn btn-primary" data-dismiss="modal"><?php echo  _("Confirm");?></button>
                </div>
            </div>
        </div>
    </div>
</div>

<?php if(isset($userSkills)){echo "<script type='text/javascript'>var userSkills=" .$userSkills. "; var user=".$user.";</script>";}?>

<script src='<?=$websiteRoot?>/public/fullcalendar-4.1.0/packages/core/main.js'></script>
<script src='<?=$websiteRoot?>/public/fullcalendar-4.1.0/packages/daygrid/main.js'></script>
<script src='<?=$websiteRoot?>/public/fullcalendar-4.1.0/packages/timegrid/main.js'></script>
<script src='<?=$websiteRoot?>/public/fullcalendar-4.1.0/packages/list/main.js'></script>
<script src='<?=$websiteRoot?>/public/fullcalendar-4.1.0/packages/interaction/main.js'></script>
<script src='<?=$websiteRoot?>/public/js/mySkills.js'></script>
<script type="text/javascript" src="<?=$websiteRoot?>/public/js/calendar.js"></script>
<script src='<?=$websiteRoot?>/public/js/myEvents.js'></script>

