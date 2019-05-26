
<?php $this->setName("content"); ?>

<div class="back">
    <div class="container">
        <h1> Inscription </h1>
        <div class="card-deck" style="margin-bottom:10px">
            <div class="card">
                <img src="<?=$websiteRoot?>/public/img/store.png" class="card-img-top" alt="logo" height=200>
                <div class="card-body">
                    <h5 class="card-title"><?php echo _("Merchant"); ?></h5>
                    <p class="card-text"> J'ai un commerce et je veux donner mes invendus à FFW ! </p>
                </div>
                <div class="card-footer">
                    <button class="btn" onclick="location.href='<?=$websiteRoot?>/inscription/company'"><?php echo _("Choose this option"); ?></button>
                </div>
            </div>
            <div class="card">
                <img src="<?=$websiteRoot?>/public/img/donate2.png" class="card-img-top" alt="logo" height=200>
                <div class="card-body">
                    <h5 class="card-title"><?php echo _("Adherent");?></h5>
                    <p class="card-text"><?php echo _("I want to donate and access to FFW services"); ?> </p>
                </div>
                <div class="card-footer">
                    <button class="btn" onclick="location.href='<?=$websiteRoot?>/inscription/subscriber'"><?php echo _("Choose this option"); ?></button>
                </div>
            </div>
            <div class="card">
                <img src="<?=$websiteRoot?>/public/img/benev2.png" class="card-img-top" alt="logo" height=200>
                <div class="card-body">
                    <h5 class="card-title"><?php echo _("Volunteer"); ?></h5>
                    <p class="card-text"> <?php echo _("Je veux faire profiter FFW de mes services et devenir bénévole !"); ?> </p>
                </div>
                <div class="card-footer">
                    <button class="btn" onclick="location.href='<?=$websiteRoot?>/inscription/volunteer'" ><?php echo _("Choisir cette option"); ?></button>
                </div>
            </div>
            <div class="card">
                <img src="<?=$websiteRoot?>/public/img/clock.png" class="card-img-top" alt="logo" height=200>
                <div class="card-body">
                   <!-- <p class="card-text"> Choisir l'option plus tard </p> -->
                </div>
                <div class="card-footer">
                    <button class="btn" onclick="location.href='<?=$websiteRoot?>/home'"  ><?php echo _("Choisir mon option plus tard") ?> </button>
                </div>
            </div>
        </div>
    </div>
</div>

