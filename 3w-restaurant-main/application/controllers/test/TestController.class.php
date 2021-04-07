<?php

class TestController
{
    public function httpGetMethod(HTTP $http)
    {
        $p = [
            'nom' => 'ALI',
            'note' => 15
        ];

        $http->sendJsonResponse($p);
    }
}