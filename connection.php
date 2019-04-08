<?php
    require_once "header.php";
    require_once "footer.php";
?>
<div class="back">
    <div class="container">
        <form class="col-lg-6" method="post" action="index.php">
            <h1>Connexion</h1>
            <div class="form-group">
                <label for="mail">Email : </label>
                <input id="mail" type="email" class="form-control" placeholder="Adresse mail">
            </div>

            <div class="form-group">
                <label for="mdp">Mot de passe : </label>
                <input id="mdp" type="password" class="form-control" placeholder="Mot de passe">
            </div>

            <button type="submit" class="btn ">Se connecter</button>
        </form>
    </div>
</div>