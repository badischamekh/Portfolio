<?php
class BasketController {
    public function httpPostMethod(Http $http, array $formFields)
	{
        $userSession = new UserSession();
        if ($userSession->isAuthenticated() == false) {
            // On ne peut pas avoir un panier sans être connecté !
            $http->redirectTo('/user/login');
        }
        if (array_key_exists('basketItems', $formFields) == false) {
            $formFields['basketItems'] = [];
        }
        return
        [
            'basketItems' => $formFields['basketItems'],
            '_raw_template' => true
        ];
}
}