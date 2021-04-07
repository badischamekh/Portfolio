<?php


class OrderModel
{
    public function listAll() 
    {
        $database = new Database();
                $sql = 'SELECT
                    Id,
                    User_Id,
                    CreationTimestamp,
                    CompleteTimestamp,
                    TotalAmount,
                    TaxRate,
                    TaxAmount
                FROM `order`
                ORDER BY CreationTimestamp';
                
        return $database->query($sql);

    }

    public function find($orderId)
	{
        $database = new Database();

        $sql = 'SELECT
                    User_Id,
                    CreationTimestamp,
                    CompleteTimestamp,
                    TotalAmount,
                    TaxRate,
                    TaxAmount
                FROM `order`
                WHERE Id = ?';

		// Récupération de la commande spécifiée.
		return $database->queryOne($sql, [ $orderId ]);
	}

	public function findOrderLines($orderId)
	{
		$database = new Database();

        $sql = 'SELECT
                    QuantityOrdered,
                    PriceEach,
                    Name,
                    Photo
                FROM orderline
                INNER JOIN meal ON meal.Id = orderline.Meal_Id
                WHERE Order_Id = ?';

		// Récupération des lignes de la commande spécifiée.
		return $database->query($sql, [ $orderId ]);
	}
    public function createOrder($user_Id, array $basketSession)
	{
        $database = new Database();
        $orderLine = $database->executeSql"INSERT INTO `order`(user_Id, `PriceEach`,`QuantityOrdered`)
        VALUES (?,?,?)",($user_Id)

		$sql = "INSERT INTO `orderline`(`Meal_Id`,  `CreationTimestamp`,`TaxRate``)
         VALUES (?,NOW(),?)";

        // Insertion de la réservation dans la base de données.
        $database = new Database();
		$database->executeSql($sql,
		[$Id,
        $SalePrice,
        $quantity
		]);
	}

} 