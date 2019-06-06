<?php $this->setName("script");?>
<script type="text/javascript" src="<?=$websiteRoot?>/public/js/addressAutocomplete.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=<?php if(isset($gMapApiKey)){echo($gMapApiKey);}?>&libraries=places&callback=initAutocomplete" async defer></script>
<!--<script type="text/javascript" src="--><?//=$websiteRoot?><!--/public/js/userAccount.js"></script>-->


