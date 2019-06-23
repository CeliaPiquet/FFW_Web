

<td>
    <input type="text" class="form-control"  id="role" object="basket" readonly>
</td>
<td>
    <input type="text" class="form-control"  id="status" object="basket" readonly>
</td>
<td>
    <input type="text" class="form-control"  id="cityName" object="srcAddress" readonly>
</td>
<td>
    <input type="date" class="form-control"  id="createTime" object="basket"  readonly>
</td>
<td>
    <div class="alert alert-dark">Total quantity : <span id="totalQuantity"></span></div>
</td>
<td id="destinationCel">
    <button class="btn  mx-auto row" id="collapseBasketDestRow" onclick="collapseBasketDestRow(this);"  object="basket" type="button" ><?php echo _("Affect destination");?></button>
    <button class="btn  mx-auto row" id="removeAffect" onclick="removeAffect(this);"  type="button" disabled ><?php echo _("Remove destination");?></button>
</td>
<td id="affectCourseCel">
    <button class="btn  mx-auto" id="affectToCourseBtn" onclick="affectToCourse(this);"  object="basket" type="button" ><?php echo _("Affect to course");?></button>
</td>
<td id="addressCel">
    <button class="btn  mx-auto" id="collapseAddressRow" onclick="collapseAddressRow(this);"  type="button" ><?php echo _("Address");?></button>
</td>

