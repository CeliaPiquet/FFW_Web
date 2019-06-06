<!doctype html>
<html>
    <head>
        <base href="<?=$websiteRoot?>">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!-- Bootstrap CSS -->
<!--        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">-->
        <link rel="stylesheet" href="<?=$websiteRoot?>/public/bootstrap-4.1.3/css/bootstrap.min.css">
        <link rel="stylesheet" href="../../public/css/stylesheet.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
        <?php  if(isset($head)){echo $head;}?>
        <title>Fight Food Waste</title>
    </head>
    <body>
    <script type="text/javascript">var ffwApiUrl="<?=$ffwApiUrl?>";</script>
    <script type="text/javascript">var websiteRoot="<?=$websiteRoot?>";</script>
    <script type="text/javascript" src="<?=$websiteRoot?>/public/js/utils.js"></script>

        <header cz-shortcut-listen="true" style="padding-top:200px;">
            <nav class="navbar fixed-top navbar-light navbar-expand-sm" style="background-color: #EBEBEB">
                <a class="navbar-brand mr-auto" href="http://ffw.priv/">
                    <img src="../../public/img/logo1.png" width="150" height="150" class="d-inline-block align-top" alt="">
                </a>

                <?php if (isset($isConnected) && $isConnected==true){ ?>
                    <div class="collapse navbar-collapse d-flex flex-row-reverse">
                        <ul class="navbar-nav">
                            <?php if (isset($isAdmin) && $isAdmin==true){ ?>

                                <li class="nav-item" id="adminUsers">
                                    <a class="btn" href="<?=$websiteRoot?>/adminUsers">Manage users</a>
                                </li>

                                <li class="nav-item" id="adminBaskets">
                                    <a class="btn" href="<?=$websiteRoot?>/adminBaskets">Manage baskets</a>
                                </li>

                                <li class="nav-item" id="stocks">
                                    <a class="btn" href="<?=$websiteRoot?>/stock">Stocks</a>
                                </li>

                                <li class="nav-item" id="locals">
                                    <a class="btn" href="<?=$websiteRoot?>/adminlocals">Locals</a>
                                </li>
                            <?php } ?>
                            <li class="nav-item">
                                <a class="btn" href="<?=$websiteRoot?>/account">Mon espace</a>
                            </li>
                            <li class="nav-item">
                                <a class="btn" href="<?=$websiteRoot?>/connection/logout">Deconnexion</a>
                            </li>
                        </ul>
                    </div>
                <?php } else { ?>
                    <div class="collapse navbar-collapse d-flex flex-row-reverse">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="btn" href="<?=$websiteRoot?>/inscription">Inscription</a>
                            </li>
                            <li class="nav-item">
                                <a class="btn" href="<?=$websiteRoot?>/connection">Connexion</a>
                            </li>
                        </ul>
                    </div>
                <?php } ?>
            </nav>
        </header>


        <div class="back" id="content">
            <?php if(isset($navbar)){echo $navbar;} ?>
            <?php if(isset($content)){echo $content;} ?>
        </div>

        <div class="card-footer text-muted fixed-bottom" style="background-color:#EBEBEB">
            Fight Food Waste
        </div>
<!--        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>-->
<!--        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>-->
<!--        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>-->
        <script src="<?=$websiteRoot?>/public/jquery/jquery-3.4.1.js"></script>
        <script src="<?=$websiteRoot?>/public/bootstrap-4.1.3/js/bootstrap.min.js"></script>

        <?php  if(isset($script)){echo $script;}?>


    </body>

</html>

