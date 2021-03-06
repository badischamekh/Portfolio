<?php

class MealModel
{
    public function listAll()
    {
        $database = new Database();

        $sql = 'SELECT * FROM meal';

        // Récupération de tous les produits alimentaires.
        return $database->query($sql);
    }

    public function create($name, $description, $photo, $initialStock, $buyPrice, $salePrice)
    {
        $sql = 'INSERT INTO meal
        (
            Name,
            Description,
            Photo,
            BuyPrice,
            SalePrice,
            QuantityInStock
        ) VALUES (?, ?, ?, ?, ?, ?)';

        // Insertion du produit alimentaire dans la base de données.
        $database = new Database();
        $database->executeSql($sql,
        [
            $name,
            $description,
            $photo,
            $buyPrice,
            $salePrice,
            $initialStock
        ]);
    }

    public function find($mealId)
    {
        $database = new Database();

        $sql = 'SELECT
                    Name,
                    Description,
                    Photo,
                    BuyPrice,
                    SalePrice
                FROM meal
                WHERE Id = ?';

        // Récupération du produit alimentaire spécifié.
        return $database->queryOne($sql, [ $mealId ]);
    }
}