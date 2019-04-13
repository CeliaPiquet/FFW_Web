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
        <table class="table" id="">
            <thead>
                <tr>  
                    <th> Article </th>
                    <th> Catégorie </th>
                    <th> Quantité </th>
                    <th> Code </th>
                </tr>
                <tr>  
                    <td> <input type="text" class="form-control" onkeyup=findArticleByFilter() id="nameArticleInput" placeholder="Nom de l'article" /> </td>
                    <td> <input type="text" class="form-control" onkeyup=findArticleByFilter() id="categoryArticleInput" placeholder="Catégorie" /> </td>
                    <td> </td> <!-- ajouter croissant/decroissant -->
                    <td> <input type="number" class="form-control" onkeyup=findArticleByFilter() id="codeArticleInput" /> </td>   <!-- onkeyup peut etre bien pour des petites quantités de données-->
                </tr>
            </thead>
            <tbody id="articleResultsContainer">
                <p> Choisissez un local puis une salle afin de voir les stocks </p> 
            </tbody>
        </table>
        <div id="emptyResultArticle">

        </div>
    </div>
    <script type="text/javascript" src="../public/js/localList.js" onload="getFullLocals()"> </script>
    <script type="text/javascript" src="../public/js/productList.js"> </script>
</div>