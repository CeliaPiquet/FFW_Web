<!DOCTYPE html>
<html>
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="stylesheet.css">
        <title>Fight Food Waste</title>
    </head>
    <body cz-shortcut-listen="true" style="background-color: #006336; padding-top:200px; padding-bottom: 100px">
        <nav class="navbar fixed-top navbar-light navbar-expand-sm" style="background-color: #EBEBEB">
            <a class="navbar-brand ml-auto" href="index.php">
                <img src="img/logo1.png" width="100" height="100" class="d-inline-block align-top" alt="">
            </a>
            <button class="navbar-toggler" type="button" datat-toggle="collapse" data-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <?php if (isset($_SESSION['id']) AND isset($_SESSION['pseudo'])){ ?>
                <div class="collapse navbar-collapse d-flex flex-row-reverse bd-highlight" id="navbarMenu">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="btn" href="profil.php">Mon compte</a>
                        </li>
                        <li class="nav-item">
                            <a class="btn" href="connection.php">Deconnexion</a>
                        </li>
                    </ul>
                </div>
            <?php } else { ?>
                <div class="collapse navbar-collapse d-flex flex-row-reverse bd-highlight" id="navbarMenu">
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