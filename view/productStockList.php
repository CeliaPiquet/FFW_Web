<?php
    //inclure les header, footer et filtres de droits
?>

<html>
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
                    <td> Article </td>
                    <td> Catégorie </td>
                    <td> </td> <!-- ajouter croissant/decroissant -->
                    <td> <input type="number" class="form-control" onkeyup=findArticleByCode() id="codeArticleInput" /> </td>   <!-- onkeyup peut etre bien pour des petites quantités de données-->
                </tr>
            </thead>
            <tbody id="articleResultsContainer">

            </tbody>
        </table>
        <div id="emptyResultArticle">

        </div>
    </div>
    <script type="text/javascript" src="productList.js" onload="getFullArray()"> </script>
</html>