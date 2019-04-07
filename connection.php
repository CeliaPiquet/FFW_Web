<?php
    require_once "header.php";
    require_once "footer.php";
?>
<div style="background-color:#00A057">
    <div class="container">
        <form class="col-lg-6" method="post" action="index.php">
            <legend>Connexion</legend>
            <div class="form-group">
                <label for="mail">Email : </label>
                <input id="mail" type="email" class="form-control" placeholder="Adresse mail">
            </div>

            <div class="form-group">
                <label for="mdp">Mot de passe : </label>
                <input id="mdp" type="password" class="form-control" placeholder="Mot de passe">
            </div>

            <button type="submit" class="btn btn-primary">Se connecter</button>
        </form>
    </div>
</div>