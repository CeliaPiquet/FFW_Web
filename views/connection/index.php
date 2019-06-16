<?php $this->setName("content"); ?>

<div class="back">
    <div class="container">
        <form class="col-lg-6" method="post" action="<?=$websiteRoot?>/connection/login">
            <h1>Connexion</h1>
            <div class="form-group">
                <label for="email">Email : </label>
                <input required id="email" type="email" name="email" class="form-control" placeholder="Adresse mail">
            </div>

            <div class="form-group">
                <label for="password">Mot de passe : </label>
                <input required id="password" type="password" name="password" class="form-control" placeholder="Mot de passe">
            </div>

            <button type="submit" class="btn ">Se connecter</button>
        </form>
    </div>
</div>