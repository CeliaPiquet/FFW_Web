
<?php $this->setName("navbar"); ?>

<nav class="navbar  navbar-light navbar-expand-sm">

        <div class="collapse navbar-collapse d-flex flex-row-reverse ">
            <ul class="navbar-nav mx-auto">
                <li class="nav-item" id="general">
                    <a class="btn" href="<?=$websiteRoot?>/account"><?php echo  _("General");?></a>
                </li>
                <li class="nav-item" id="company">
                    <a class="btn" href="<?=$websiteRoot?>/account/company"><?php echo  _("Company");?></a>
                </li>
                <li class="nav-item" id="volunteer">
                    <a class="btn" href="<?=$websiteRoot?>/account/volunteer"><?php echo  _("Volunteer");?></a>
                </li>
                <li class="nav-item" id="adherent">
                    <button class="btn" disabled href="<?=$websiteRoot?>/account/adherent"><?php echo  _("Adherent");?></button>
                </li>
            </ul>
            </ul>
        </div>
</nav>
