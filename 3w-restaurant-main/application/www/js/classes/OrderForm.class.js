class OrderForm {
    constructor(form) {
        this.form = form;
        this.meal = $('#meal');
        this.mealDetails = $('#meal-details');
        this.orderSummary = $('#order-summary');
        this.Delete = $('.delete-Item');
        this.ajoute = $('#Ajouter');
        this.validateOrder = $('#validate-order');
        this.MealList = $('#mealTable');
        this.basketSession = new BasketSession();
    }

    onAjaxMeal(meal) {
        // Construction de l'URL absolue vers la photo du produit alimentaire.
        let imageUrl = getWwwUrl() + '/images/meals/' + meal.Photo;



        // Mise à jour de l'affichage.
        this.mealDetails.children('p').text(meal.Description);
        this.mealDetails.find('strong').text(formatMoneyAmount(meal.SalePrice));
        this.mealDetails.children('img').attr('src', imageUrl);
    }

    /******************** Fonctions Callback AJAX *********/

    onChangeMeal() {
        //Envoi de la requête AJAX
        let mealId = this.meal.val();

        $.getJSON(getRequestUrl() + '/meal?id=' + mealId, this.onAjaxMeal.bind(this));
    }

    onSubmitForm(event) {
        event.preventDefault();
        const mealId = this.meal.val();
        const mealName = this.meal.find('option:selected').text();
        const quantity = this.form.find('input[name=quantity]').val();
        const salePrice = this.mealDetails.find('strong').text();
        this.basketSession.add(mealId, mealName, quantity, salePrice);

        this.refreshOrderSummary();

    }


    refreshOrderSummary() {
        const formFields = {
            basketItems: this.basketSession.items
        }

        $.post(
            getRequestUrl() + '/basket',
            formFields,
            this.onAjaxRefreshOrderSummary.bind(this)
        );

    }

    onAjaxRefreshOrderSummary(basketSummaryHTML) {
        this.orderSummary.html(basketSummaryHTML);
        if (this.basketSession.IsEmpty() == true) {
            this.validateOrder.attr('disabled', true);
        } else {
            this.validateOrder.attr('disabled', false);
        }
    }
    onClickRemoveBasketItem(event) {
        event.preventDefault();
        let button = event.currentTarget;
        let DataButton = button.dataset.id;
        console.log(button);
        console.log(DataButton);
        this.basketSession.remove(DataButton);
        this.refreshOrderSummary();

    }
    onValidateSummary() {
        const formFields = {
            basketItems: this.basketSession.items
        }

        $.post(
            getRequestUrl() + '/order/validation',
            formFields,
            this.onAjaxOrderValidation.bind(this)
        );


    }
    onAjaxOrderValidation(result) {
        let orderId = JSON.parse(result);
        this.basketSession.clear();
        window.location.assign(
            getRequestUrl() + '/order/payment?id=' + orderId
        );
    }
    onClickValidateOrder() {
        this.onValidateSummary();

    }

    run() {
        /*
         * Installation d'un gestionnaire d'évènement sur la sélection d'un aliment
         * dans la liste déroulante des aliments.
         */
        this.refreshOrderSummary();
        this.meal.on('change', this.onChangeMeal.bind(this));

        this.ajoute.on('click', this.onSubmitForm.bind(this));

        // console.log(this.Delete);


        //console.log($('#order-summary').find('[data-id]'));
        // this.form.find('[data-id]').each(function(test) {
        this.orderSummary.on('click', 'button', this.onClickRemoveBasketItem.bind(this));
        this.validateOrder.on('click', this.onClickValidateOrder.bind(this));
        // })

        // let test = $('.delete-Item');
        // console.log(test);
    }
}