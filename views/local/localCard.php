<div class="col-md-4">
    <div class="card" ">
        <div class="card-body">
            <form class="list-group list-group-flush">
                <input type="text" class="form-control" name="localName[]"  value="<?=$local->getName();?>" required>
                <input type="text" class="form-control" name="streetAddress[]"  value="<?=$local->getName();?>" required>
                <input type="text" class="form-control" name="cityName[]"  value="<?=$local->getName();?>" required>
                <input type="text" class="form-control" name="zipCode[]"  value="<?=$local->getName();?>" required>
                <select id="country" name="country[]"class="form-control" required>
                    <option value="france" selected>France</option>
                    <option value="italie">Italie</option>
                    <option value="portugal">Portugal</option>
                    <option value="irlande">Irlande</option>
                </select>
            </form>
        </div>
    </div>
</div>
