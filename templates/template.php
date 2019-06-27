<!doctype html>
<html>
    <head>
        <base href="<?=$websiteRoot?>">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<!--        <link rel="stylesheet" href="--><?//=$websiteRoot?><!--/public/bootstrap-4.1.3/css/bootstrap.min.css">-->
        <link rel="stylesheet" href="../../public/css/stylesheet.css">
        <?php  if(isset($head)){echo $head;}?>
        <title>Fight Food Waste</title>
    </head>
    <body>

    <script src="https://kit.fontawesome.com/12cb04ef23.js"></script>
    <script src="<?=$websiteRoot?>/public/jquery/jquery-3.4.1.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<!--            <script src="--><?//=$websiteRoot?><!--/public/bootstrap-4.1.3/js/bootstrap.min.js"></script>-->

    <script type="text/javascript">var ffwApiUrl="<?=$ffwApiUrl?>"; var websiteRoot="<?=$websiteRoot?>"; var uri="<?=$uri?>";</script>
    <script type="text/javascript"> window.history.pushState("object or string", "Title", uri);</script>
    <script type="text/javascript" src="<?=$websiteRoot?>/public/js/utils.js"></script>


        <header cz-shortcut-listen="true" style="padding-top:200px;">
            <nav class="navbar fixed-top navbar-light navbar-expand-sm align-items-center" style="background-color: #EBEBEB">
                <a class="navbar-brand mr-auto" href="http://ffw.priv/">
                    <img src="../../public/img/logo1.png" width="150" height="150" class="d-inline-block align-top" alt="">
                </a>

                <?php if (isset($isConnected) && $isConnected==true){ ?>
                    <div class="collapse navbar-collapse d-flex flex-row-reverse">
                        <ul class="navbar-nav">


                            <?php if($arrRights["volunteers and employees admin"] || $arrRights["super admin"] ){ ?>
                                <li class="nav-item" id="adminUsers">
                                    <a class="btn" href="<?=$websiteRoot?>/adminUsers"><?php echo _("Manage users");?></a>
                                </li>
                            <?php } ?>
                            <?php if($arrRights["stock collect and vehicles admin"] || $arrRights["super admin"]){ ?>
                                <li class="nav-item" id="adminBaskets">
                                    <a class="btn" href="<?=$websiteRoot?>/adminBaskets"><?php echo _("Manage baskets")?></a>
                                </li>
                                <li class="nav-item" id="adminCourses">
                                    <a class="btn" href="<?=$websiteRoot?>/adminCourses"><?php echo _("Manage courses")?></a>
                                </li>

                                <li class="nav-item" id="stocks">
                                    <a class="btn" href="<?=$websiteRoot?>/stock"><?php echo _("Stocks")?></a>
                                </li>

                                <li class="nav-item" id="locals">
                                    <a class="btn" href="<?=$websiteRoot?>/adminlocals"><?php echo _("Locals")?></a>
                                </li>
                            <?php } ?>

                            <li class="nav-item">
                                <a class="btn" href="<?=$websiteRoot?>/account"><?php echo _("Account");?></a>
                            </li>
                            <li class="nav-item">
                                <a class="btn" href="<?=$websiteRoot?>/connection/logout"><?php echo _("Logout");?></a>
                            </li>
                        </ul>
                    </div>
                <?php } else { ?>
                    <div class="collapse navbar-collapse d-flex flex-row-reverse">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="btn" href="<?=$websiteRoot?>/inscription"><?php echo _("Sign in");?></a>
                            </li>
                            <li class="nav-item">
                                <a class="btn" href="<?=$websiteRoot?>/connection"><?php echo _("Login");?></a>
                            </li>
                        </ul>
                    </div>
                <?php } ?>
                <a class="navbar-brand mx-1 langImg" id="fr" onclick="changeLang(this);" >
                    <img src="../../public/img/france.png" width="20" height="20" class="d-inline-block align-top" alt="">
                </a>
                <a class="navbar-brand mx-1 langImg" id="en" onclick="changeLang(this);">
                    <img src="../../public/img/united-kingdom.png" width="20" height="20" class="d-inline-block align-top" alt="">
                </a>
            </nav>
        </header>

        <?php if(isset($alert)){echo $alert;}?>
        <div class="back" id="content">
            <?php if(isset($navbar)){echo $navbar;} ?>
            <?php if(isset($content)){echo $content;} ?>
        </div>

        <div class="card-footer text-muted fixed-bottom" style="background-color:#EBEBEB">
            Fight Food Waste
        </div>


        <?php  if(isset($script)){echo $script;}?>


    </body>

</html>

