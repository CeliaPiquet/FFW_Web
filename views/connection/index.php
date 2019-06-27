<?php $this->setName("content"); ?>

<div class="back">
    <div class="container">
        <form class="col-lg-6" method="post" action="<?=$websiteRoot?>/connection/login">
            <h1><?php echo  _("Connection");?></h1>
            <div class="form-group">
                <label for="email"><?php echo  _("Email : ");?></label>
                <input required id="email" type="email" name="email" class="form-control" placeholder="<?php echo  _("Email");?>">
            </div>

            <div class="form-group">
                <label for="password"><?php echo  _("Password : ");?></label>
                <input required id="password" type="password" name="password" class="form-control" placeholder="<?php echo  _("Password");?>">
            </div>

            <button type="submit" class="btn "><?php echo  _("Log in");?></button>
        </form>
    </div>
</div>