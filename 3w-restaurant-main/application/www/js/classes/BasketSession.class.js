class BasketSession {
    constructor() {
        this.items = null;
        this.load();
    }

    add(mealId, name, quantity, salePrice) {

        this.$alert = $('#alert');

        if (isNaN(quantity)) {
            return this.$alert.text(' La quantité doit être un nombre');
        }

        if (quantity <= 0) {
            return this.$alert.text(' La quantité minimum est de 1 unité');
        }

        mealId = parseInt(mealId);
        quantity = parseInt(quantity);
        salePrice = parseFloat(salePrice);

        for (let index = 0; index < this.items.length; index++) {
            if (this.items[index].mealId == mealId) {
                this.items[index].quantity += quantity;
                this.save();
                return;
            }
        }

        this.items.push({
            mealId: mealId,
            name: name,
            quantity: quantity,
            salePrice: salePrice
        });
        this.save();
    }

    load() {
        this.items = loadDataFromDomStorage('panier');
        if (this.items == null) {
            this.items = new Array();
        }
    }

    save() {
        saveDataToDomStorage('panier', this.items);
    }
    remove(DataButton) {
        for (let index = 0; index < this.items.length; index++) {
            if (this.items[index].mealId == DataButton) {
                this.items.splice(index, 1);
                this.save();
            }

        }
    }
    IsEmpty() {
        return this.items == 0;
    }
    Clear() {
        saveDataToDomStorage('panier', null);
    }

}