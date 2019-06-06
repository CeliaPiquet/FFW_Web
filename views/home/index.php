<?php
//    require_once "index.php";
//    require_once "footer.php";
//
//    $locale = Locale::acceptFromHttp($_SERVER['HTTP_ACCEPT_LANGUAGE']);
//    putenv("LC_ALL=$locale");
//
//    bindtextdomain("homeView","../locale");
//    setlocale(LC_ALL,$locale.".UTF-8");
//    textdomain("homeView");
//    echo $locale;
//    echo $locale2;

?>
<?php $this->setName("content"); ?>

<div class="back" style="background-color:#42BD85">
    <div class="container" >
        <h1><?php echo _("Who are we ?"); ?></h1>
            <p>
                <?php  echo _("Since 2013, Fight Food Waste is engaged against food wwastage. 
                Association is active in France and in other countries as Italy, Ireland and Portugal.");?>
            </p>
            <p>
                <?php  echo _("Our goal is to reduce food wastage which produces..."); ?>
            </p>
    </div>
</div>

<div class="back">
    <h1> <?php  echo _("How does it work ?"); ?> </h1>
    <div class="container text-center row">
        <div class="col-md-6">
            <p>
                <?php  echo _(" 
                Every day we collect unsold stock and unused foodstuffs among private and business donors 
                to redistribute them to the most needy : associations, homeless person, isolated people.
                To help us scan with FFW scanner your food items and our volunteers will pick up them during their daily round.
                To order your scanner subscribe on our website and command it on your account space.");?>
                <small> <?php echo _("
                *Scanners are free for subscribers who contribute at least 10€ per year and for volunteers who offers their services."); ?> </small>
            </p>
        </div>
        <div class="col-md-6">
            <p><?php  echo _("Have fun by doing like us and pick up wasted food !") ; ?> </p>
            <figure class="figure">
                <img src="../../public/img/playEmpty.png" class="figure-img img-fluid rounded" alt="...">
            </figure>
            <footer> <small> Click to play ! </small> </footer>
        </div>
    </div>
</div>
<div class="back" style="background-color:#1FB16F">
    <h1><?php  echo _("How to participate ?"); ?> </h1>
    <div class="container text-center row">
        <div class="col-md-6">
            <p>
                <?php  echo nl2br(_("
                To participate in that fight against the wastage with us it's easy ! 
                All you need to do is to subscribe on this website and choose the type of your contribution !"));?>
            </p>
        </div>
        <div class="col-md-6">
            <p> 
                <?php echo nl2br(_("4 choices to help us : 
                - you are merchants and you want us to pick up your unsold stocks
                - you want to bring a financial contribution for the association and access to a large range of services
                - you want to offer your services and become volunteer of the association
                - you want to access to our public services and stay informed of our actions ")); ?>
        </div>
    </div>
</div>
<div class="back" style="background-color:#42BD85">
    <div class="container">
        <h1> <?php  echo _("What are services offered ?"); ?> </h1>
    </div>
</div>