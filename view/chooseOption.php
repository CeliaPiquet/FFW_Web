<?php
    require_once "header.php";
    require_once "footer.php";
?>
<div class="back">
    <div class="container">
        <h1> Inscription </h1>
            <div class="card-deck" style="margin-bottom:10px">
                <div class="card">
                    <img src="../public/img/store.png" class="card-img-top" alt="logo" height=200>
                    <div class="card-body">
                        <h5 class="card-title">Commerçant</h5>
                        <p class="card-text"> J'ai un commerce et je veux donner mes invendus à FFW ! </p>
                    </div>
                    <div class="card-footer">
                        <button class="btn" onclick="changeOption('company')">Choisir cette option</button>
                    </div>
                </div>
                <div class="card">
                    <img src="../public/img/donate2.png" class="card-img-top" alt="logo" height=200>
                    <div class="card-body">
                        <h5 class="card-title">Adhérent</h5>
                        <p class="card-text"> Je souhaite faire un don à FFW et accéder alors aux services proposés ! </p>
                    </div>
                    <div class="card-footer">
                        <button class="btn" onclick="changeOption('subscriber')">Choisir cette option</button>
                    </div>
                </div>
                <div class="card">
                    <img src="../public/img/benev2.png" class="card-img-top" alt="logo" height=200>
                    <div class="card-body">
                        <h5 class="card-title">Bénévole</h5>
                        <p class="card-text"> Je veux faire profiter FFW de mes services et devenir bénévole ! </p>
                    </div>
                    <div class="card-footer">
                        <button class="btn" onclick="changeOption('volunteer')">Choisir cette option</button>
                    </div>
                </div>
                <div class="card">
                    <img src="../public/img/clock.png" class="card-img-top" alt="logo" height=200>
                    <div class="card-body">
                       <!-- <p class="card-text"> Choisir l'option plus tard </p> -->
                    </div>
                    <div class="card-footer">
                        <button class="btn" onclick="changeOption('none')">Choisir mon option plus tard</button>
                    </div>
                </div>  
            </div>
        </form>
    </div>
</div>

<script type="text/javascript" src="../public/js/userAccount.js"></script>