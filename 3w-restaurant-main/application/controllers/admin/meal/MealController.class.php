<?php


class MealController
{
    public function httpGetMethod(Http $http)
    {
        $userSession = new UserSession();
        if($userSession->getAdmin() != 1)
        {
           $http->redirectTo('/user/login');
        }
        $mealModel = new MealModel();
        $meals     = $mealModel->listAll();

        return
        [
            'flashBag' => new FlashBag(),
            'meals'    => $meals,
        ];
    }

    public function httpPostMethod(Http $http, array $formFields)
    {
        $userSession = new UserSession();
        if($userSession->getAdmin() != 1)
        {
           $http->redirectTo('/user/login');
        }

        if($http->hasUploadedFile('photo') == true)
        {
            $photo = $http->moveUploadedFile('photo', '/images/meals');
        }
        else
        {
            $photo = 'no-photo';
        }

        $mealModel = new MealModel();
        $mealModel->create
        (
            $formFields['name'],
            $formFields['description'],
            $photo,
            $formFields['initialStock'],
            $formFields['buyPrice'],
            $formFields['salePrice']
        );

        $meals  = $mealModel->listAll();

        $flashBag = new FlashBag();
        $flashBag->add("Le menu a été ajouté avec succès");

        return
        [
            'flashBag' => $flashBag,
            'meals'    => $meals,
        ];
    }
}