 <!-- Modal to change the room -->
<div class="modal fade" id="changeRoomModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Changer les produits de salle</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <div class="localisationList">  
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="btn" data-dismiss="modal">Annuler</a>
                <button type="button" class="btn" onclick="changeRoom()">Valider</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal to remove product to room -->
<div class="modal fade" id="removeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Supprimer un produit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p> Etes vous sûre de vouloir supprimer ce produit ? </p>
            </div>
            <div class="modal-footer">
                <a class="btn" data-dismiss="modal">Annuler</a>
                <button type="button" class="btn" onclick="removeProduct()">Valider</button>
            </div>
        </div>
    </div>
</div>


<!-- Modal to add product to room -->
<div class="modal fade" id="addProduct" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Ajouter un produit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form name="addProductForm">
            <div class="modal-body">
                    <div class="form-group">
                        <label for="articleId">Code barre du produit</label>
                        <input required type="text" class="form-control" id="articleId" name="articleId" onkeyup=checkArticle()>
                        <p id="articleNamePlacement"></p>
                    </div>
                    <div class="form-group">
                        <label for="endDate"> Date de péremption </label>
                        <input type="date" class="form-control" id="endDate" name="endDate">
                    </div>
                    <div class="form-group">
                        <label for="status"> Etat </label>
                        <select class="form-control form-control" id="status" name="status">
                            <option>Bon Etat</option>
                            <option>Dégradé</option>
                            <option>A Jeter</option>
                        </select>
                    </div>
            </div>
            <div class="modal-footer">
                <div class="form-group">
                    <input type="number" class="form-control" id="numberNewProduct" placeholder="nb" min="1" max="50" value="1"/>
                </div>
                <a class="btn" data-dismiss="modal">Annuler</a>
                <button type="button" class="btn" onclick="addProduct()">Ajouter</button>
            </div>
            </form>
        </div>
    </div>
</div>
