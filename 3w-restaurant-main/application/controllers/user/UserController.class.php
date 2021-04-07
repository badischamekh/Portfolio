<?php


class UserController
{
	public function httpGetMethod()
	{
		return [ '_form' => new UserForm() ];
	}

	public function httpPostMethod(Http $http, array $formFields)
	{
		try
		{
			// Inscription de l'utilisateur.
            $userModel = new UserModel();
			$userModel->signUp
			(
				$formFields['lastName'],
				$formFields['firstName'],
				$formFields['email'],
				$formFields['password'],
				$formFields['birthYear'].'-'.
			    $formFields['birthMonth'].'-'.
			    $formFields['birthDay'],
				$formFields['address'],
				$formFields['city'],
				$formFields['country'],
				$formFields['zipCode'],
				$formFields['phone']
			);

			// Ajout d'un message de notification qui s'affichera sur la page d'accueil.
			$flashBag = new FlashBag();
			$flashBag->add('Votre compte utilisateur a bien été créé.');
			
            // Redirection vers la page d'accueil.
            $http->redirectTo('/');
		}
		catch(DomainException $exception)
		{
            // Réaffichage du formulaire avec un message d'erreur.
            $form = new UserForm();
            $form->bind($formFields);
            $form->setErrorMessage($exception->getMessage());

			return [ '_form' => $form ];
		}
	}
} 