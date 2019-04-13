<?php
if(!isset($_SESSION)){
    session_start();
}
else {
    echo "not ok";
}
?>
<!DOCTYPE html>
<html>
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="../public/css/stylesheet.css">
        <title>Fight Food Waste</title>
    </head>
    <body cz-shortcut-listen="true" style="background-color: #006336; padding-top:200px; padding-bottom: 100px">
        <nav class="navbar fixed-top navbar-light navbar-expand-sm" style="background-color: #EBEBEB">
            <a class="navbar-brand mr-auto" href="homeView.php">
                <img src="../public/img/logo1.png" width="150" height="150" class="d-inline-block align-top" alt="">
            </a>
            <?php if (isset($_SESSION['auth']) AND $_SESSION['auth']){ ?> <!-- Ajouté les droits-->
                <div class="collapse navbar-collapse d-flex flex-row-reverse">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="btn" href="profil.php">Mon espace</a>
                        </li>
                        <li class="nav-item">
                            <a class="btn" href="connection.php">Deconnexion</a>
                        </li>
                        <li class="nav-item" id="stocks">
                            <a class="btn" href="productStockList.php">Deconnexion</a>
                        </li>
                    </ul>
                </div>
            <?php } else { ?>
                <div class="collapse navbar-collapse d-flex flex-row-reverse">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="btn" href="inscription.php">Inscription</a>
                        </li>
                        <li class="nav-item">
                            <a class="btn" href="connection.php">Connexion</a>
                        </li>
                    </ul>
                </div>
            <?php } ?>
        </nav>