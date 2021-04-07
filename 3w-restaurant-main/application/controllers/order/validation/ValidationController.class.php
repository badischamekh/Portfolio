<?php
class ValidationController {
    public function httpGetMethod(Http $http)
	{
        
	}
    
	public function httpPostMethod(Http $http, array $formFields)
	{
        $userSession = new UserSession();
        if($userSession->isAuthenticated() == false)
        {
            // On ne peut pas réserver sans être connecté !
            $http->redirectTo('/user/login');
        }

        // Récupération du compte client de l'utilisateur connecté.
        

        $OrderValidationModel = new OrderModel();
        $OrderValidationModel->createOrder
    (
        $userId = $userSession->getUserId();
        $formFields['Id'],
            $formFields['SalePrice'],
            $formFields['quantity']
            
    );
}
}