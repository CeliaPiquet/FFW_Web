<?php $this->setName("content"); ?>


<h1 class="text-center"> My companies</h1>
<div class="form-row">
    <div class="form-group col-md-3  mx-auto">
        <label for="siren">SIREN</label>
        <input required type="text"  place  class="form-control" id="siren">
        <a   class="btn"  onclick="searchBySiren()" >Search SIREN</a>
    </div>
    <div class="form-group col-md-4  mx-auto">
        <label for="nb"> Nombre de locaux </label>
        <input required type="number" onchange="changeCompanyList()" class="form-control" id="nb" value="<?=$companiesCount?>"  min="<?=$companiesCount?>">
    </div>
</div>
<div class="form-row" id="containerCompanyForm"></div>

<?php if(isset($companies)){echo "<script type='text/javascript'>var companies=" .$companies. "; var userId=".$userId.";</script>";}?>
<script type="text/javascript" src="<?=$websiteRoot?>/public/js/companyInscription.js"></script>



