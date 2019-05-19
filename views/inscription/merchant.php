<?php $this->setName("content"); ?>

<div class="back">
    <h1 class="text-center"> Inscription - Commerçant 2/2</h1>
    <form formclass="col-lg-6" method="post" action="inscription2.php">
        <div class="form-row">
            <div class="form-group col-md-8">
                <label for="siren">SIREN</label>
                <input required type="text" class="form-control" id="siren">
            </div>
            <div class="form-group col-md-4">
                <label for="nb"> Nombre de locaux à enregistré</label>
                <input required type="number" class="form-control" id="nb"  min="1"> //ajouter onchange
            </div>
        </div>
        <div class="form-row">
            <?php for ($nbLines = 0; $nbLines < 3; $nbLines ++) { ?> 
                <div class="col-md-4">
                    <div class="form-group row">
                        <h3> Local n°<?php echo $nbLines+1 ?> </h3>
                    </div>
                    <div class="form-group row col-md-11">
                        <label for="siret"> SIRET </label>
                        <input required type="text" class="form-control" id="siret">
                    </div>
                    <div class="form-group row col-md-11">
                        <label for="address">Addresse</label>
                        <input type="text" class="form-control" id="adress" placeholder="Numéro + nom de la rue">
                    </div>
                    <div class="form-group row col-md-11">
                        <label for="adress2">Complément</label>
                        <input type="text" class="form-control" id="address2" placeholder="Batiment, appartement, étage ...">
                    </div>
                    <div class="form-row col-md-11">
                        <div class="form-group col">
                            <label for="city">Ville</label>
                            <input type="text" class="form-control" id="city">
                        </div>
                        <div class="form-group col-md">
                            <label for="zipcode">Code postal</label>
                            <input type="text" class="form-control" id="zipcode">
                        </div>
                        <div class="form-group col-md">
                            <label for="country">Pays</label>
                            <select id="country" class="form-control">
                                <option value="france" selected>France</option>
                                <option value="italie">Italie</option>
                                <option value="portugal">Portugal</option>
                                <option value="irlande">Irlande</option>
                            </select>
                        </div>
                    </div>
                </div>
            <?php } ?>
        </div>
    </form>
</div>