class FormValidator {
    constructor(form) {
        this.form = form;
        this.errorMessage = form.find('.error-message');
        this.totalErrorCount = form.find('#total-error-count');

        // Tableau général de toutes les erreurs de validation trouvées.
        this.totalErrors = null;
    }

    checkDataTypes() {
        // Création d'un tableau contenant les erreurs trouvées.
        let errors = [];

        this.form.find('[data-type]').each(function() {
            /*
             * La méthode jQuery each() change la valeur de la variable this :
             * elle représente tous les objets DOM sélectionnés.
             *
             * Pour notre cas elle représente donc tour à tour chaque champ de
             * formulaire trouvé avec la méthode jQuery find().
             */

            // Récupération de la valeur du champ du formulaire (sans les espaces).
            let value = $(this).val().trim();

            switch ($(this).data('type')) {
                case 'number':
                    if (isNumber(value) == false) {
                        errors.push({
                            fieldName: $(this).data('name'),
                            message: 'doit être un nombre'
                        });
                    }
                    break;

                case 'positive-integer':
                    if (isInteger(value) == false || value <= 0) {
                        errors.push({
                            fieldName: $(this).data('name'),
                            message: 'doit être un nombre entier positif'
                        });
                    }
                    break;
            }
        });

        // Copie des erreurs trouvées dans le tableau général des erreurs.
        $.merge(this.totalErrors, errors);
    }

    checkMinimumLength() {
        // Création d'un tableau contenant les erreurs trouvées.
        let errors = [];

        // Boucle de recherche de tous les champs de formulaires nécessitant une longueur minimum.
        this.form.find('[data-length]').each(function() {
            /*
             * La méthode jQuery each() change la valeur de la variable this :
             * elle représente tous les objets DOM sélectionnés.
             *
             * Pour notre cas elle représente donc tour à tour chaque champ de
             * formulaire trouvé avec la méthode jQuery find().
             */

            // Récupération de la valeur de l'attribut HTML data-length.
            let minLength = $(this).data('length');

            // Récupération de la valeur du champ du formulaire (sans les espaces).
            let value = $(this).val().trim();

            // Est-ce que ce qui a été saisi fait au moins la longueur minimum requise ?
            if (value.length < minLength) {
                // Non, donc il y a une erreur.
                errors.push({
                    fieldName: $(this).data('name'),
                    message: 'doit avoir au moins ' + minLength + ' caractère(s)'
                });
            }
        });

        // Copie des erreurs trouvées dans le tableau général des erreurs.
        $.merge(this.totalErrors, errors);
    }


    checkRequiredFields() {
        // Création d'un tableau contenant les erreurs trouvées.
        let errors = [];

        // Boucle de recherche de tous les champs de formulaires requis.
        this.form.find('[data-required]').each(function() {
            /*
             * La méthode jQuery each() change la valeur de la variable this :
             * elle représente tous les objets DOM sélectionnés.
             *
             * Pour notre cas elle représente donc tour à tour chaque champ de
             * formulaire trouvé avec la méthode jQuery find().
             */

            // Récupération de la valeur du champ du formulaire (sans les espaces).
            let value = $(this).val().trim();

            // Est-ce que quelque chose a été saisi ?
            if (value.length == 0) {
                // Non, alors que le champ est requis, donc il y a une erreur.
                errors.push({
                    fieldName: $(this).data('name'),
                    message: 'est requis'
                });
            }
        });

        // Copie des erreurs trouvées dans le tableau général des erreurs.
        $.merge(this.totalErrors, errors);
    }

    onSubmitForm(event) {
        // Recherche de la balise HTML <p> contenant tous les messages d'erreurs.
        let errorList = this.errorMessage.children('p');
        errorList.empty();

        // Exécution des différentes validations.
        this.totalErrors = [];
        this.checkRequiredFields();
        this.checkDataTypes();
        this.checkMinimumLength();
        this.form.data('validation-error-count')
            // Est-ce que des erreurs ont-été trouvées ?
        if (this.totalErrors.length > 0) {
            event.preventDefault();

            // Boucle d'affichage de toutes les erreurs trouvées.
            this.totalErrors.forEach(function(error) {
                // Construction du message d'erreur final.
                let message =
                    'Le champ <em><strong>' + error.fieldName +
                    '</strong></em> ' + error.message + '.<br>';

                // Ajout du message d'erreur final à la fin de la balise HTML <p>.
                errorList.append(message);
            });

            // Mise à jour du compteur du nombre total d'erreurs trouvées.
            this.totalErrorCount.text(this.totalErrors.length);

            // Affichage de la boite de messages.
            this.errorMessage.fadeIn('slow');
        }
    }

    run() {
        // Installation d'un gestionnaire d'évènement sur la soumission du formulaire.
        this.form.on('submit', this.onSubmitForm.bind(this));

        // Est-ce qu'il y a déjà des messages d'erreurs dans la boite de messages ?
        if (this.errorMessage.children('p').text().length > 0) {
            // Oui, affichage de la boite de messages.
            this.errorMessage.fadeIn('slow');
        }
    }
}