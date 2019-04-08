<?php
    require_once "header.php";
    require_once "footer.php";
?>
<div class="back">
    <div class="container">
        <h1> Inscription </h1>
        <form formclass="col-lg-6" method="post" action="inscription2.php">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="name">Nom</label>
                    <input type="text" class="form-control" id="name" placeholder="Nom">
                </div>
                <div class="form-group col-md-6">
                    <label for="firstname">Prénom</label>
                    <input type="text" class="form-control" id="firstname" placeholder="Prénom">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="mail">Adresse mail</label>
                    <input type="email" class="form-control" id="mail" placeholder="exemple@messagerie.fr">
                </div>
                <div class="form-group col-md">
                    <label for="mdp">Mot de passe</label>
                    <input type="password" class="form-control" id="mdp" placeholder="Mot de passe (8 caractères, 1 majuscule, 1 minuscule, 1 chiffre)">
                </div>
                <div class="form-group col-md">
                    <label for="mdp2">Confirmation du mot de passe</label>
                    <input type="password" class="form-control" id="mdp2" placeholder="Retapez votre mot de passe">
                </div>
            </div>
            <div class="form-group">
                <label for="address">Addresse</label>
                <input type="text" class="form-control" id="adress" placeholder="Numéro + nom de la rue">
            </div>
            <div class="form-group">
                <label for="adress2">Complément</label>
                <input type="text" class="form-control" id="address2" placeholder="Batiment, appartement, étage ...">
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="city">Ville</label>
                    <input type="text" class="form-control" id="city">
                </div>
                <div class="form-group col-md-2">
                    <label for="zipcode">Code postal</label>
                    <input type="text" class="form-control" id="zipcode">
                </div>
                <div class="form-group col-md-4">
                    <label for="country">Pays</label>
                    <select id="country" class="form-control">
                        <option selected>France</option>
                        <option>Italie</option>
                        <option>Portugal</option>
                        <option>Irlande</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck">
                    <label class="form-check-label" for="gridCheck">
                        J'accepte les conditions générales de FFW
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck">
                    <label class="form-check-label" for="gridCheck">
                        Je souhaite être informé(e) par mail des actualités et des évènements de FFW
                    </label>
                </div>
            </div>
            <button type="submit" class="btn">Etape suivante</button>
        </form>
    </div>
</div>