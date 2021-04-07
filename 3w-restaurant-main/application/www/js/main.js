'use strict';

/////////////////////////////////////////////////////////////////////////////////////////
// FONCTIONS                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////

function runFormValidation() {
    const form = $('form');
    if (form.length == 1) {
        let validator = new FormValidator(form);
        validator.run();
    }
}

function runOrder() {
    const form = $('#order-form');
    if (form.length == 1) {
        let order = new OrderForm(form);
        order.run();
    }
}




/////////////////////////////////////////////////////////////////////////////////////////
// CODE PRINCIPAL                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////

$(function() {
    // Effet spécial sur la boite de notifications (le flash bag).
    $('#notice').delay(3000).fadeOut('slow');

    runFormValidation();

    runOrder();

});