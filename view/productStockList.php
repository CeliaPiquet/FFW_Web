<?php
    //inclure les header, footer et filtres de droits
    require_once "header.php";
    require_once "footer.php";
    
    ?>
<div class="back">
    <h1> Gestion des stocks </h1>
    <div class="container" id="localisationFilter">

    </div>
    <div class="container" id="noResultLocals">

    </div>
    <div class="container">
            <p> Choisissez un local afin de voir les stocks et une salle pour pouvoir modifier son contenu. </p> 
            <div class="row" id="actionList" style="display: none">
                <div class="col-md-3">
                    <h5> Actions : </h5>
                </div>
                <div class="col-md-3">
                    <button class="btn" id="addNewProduct" onclick="">Ajouter un produit à une salle</button>
                </div>
                <div class="col-md-3">
                    <button class="btn" id="changeProductRoom" onclick="changeProductRoom()">Changer un produit de salle</button>
                </div>
                <div class="col-md-3">
                    <button class="btn" id="removeProduct" onclick="">Supprimer un produit de la salle</button>
                </div>
            </div>
            <div class="row" id="alertMessage"> </div>
            <div class="row" id="newInputs"> </div>
            <table class="table" id="">
                <thead>
                    <tr>  
                        <th> Article </th>
                        <th> Catégorie </th>
                        <th> Quantité </th>
                        <th> Code </th>
                        <th>  </th>
                    </tr>
                    <tr>  
                        <td> 
                            <input type="text" class="form-control" onkeyup=findArticleByFilter() id="nameArticleInput" placeholder="Nom de l'article"> 
                        </td>
                        <td> 
                            <input type="text" class="form-control" onkeyup=findArticleByFilter() id="categoryArticleInput" placeholder="Catégorie"> 
                        </td>
                        <td> 
                        
                        </td> <!-- ajouter croissant/decroissant -->
                        <td> 
                            <input type="number" class="form-control" onkeyup=findArticleByFilter() id="codeArticleInput" /> </td>   <!-- onkeyup peut etre bien pour des petites quantités de données-->
                    </tr>
                </thead>
                <tbody id="articleResultsContainer">

                </tbody>
            </table>
            <div id="emptyResultArticle">

            </div>
    </div>
    <script type="text/javascript" src="../public/js/localList.js" onload="getFullLocals()"> </script>
    <script type="text/javascript" src="../public/js/productList.js"> </script>
    <script type="text/javascript" src="../public/js/actionList.js"></script>
</div>