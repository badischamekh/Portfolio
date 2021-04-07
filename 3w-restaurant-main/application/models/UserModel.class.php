<?php


class UserModel
{
    public function find($userId)
    {
    	$database = new Database();

    	// Récupération de l'utilisateur spécifié.
    	return $database->queryOne
    	(
    		"SELECT
    			Id,
    			LastName,
				FirstName,
				Email,
				Password,
				BirthDate,
				Address,
				City,
				ZipCode,
				Phone
			FROM user
			WHERE Id = ?",
    		[ $userId ]
    	);
    }
    
    public function findWithEmailPassword($email, $password)
    {
        $database = new Database();

        // Récupération de l'utilisateur ayant l'email spécifié en argument.
        $user = $database->queryOne
        (
            "SELECT
                Id,
                LastName,
                FirstName,
                Email,
                Password,
                Admin
            FROM user
            WHERE Email = ?",
            [ $email ]
        );

        // Est-ce qu'on a bien trouvé un utilisateur ?
        if(empty($user) == true)
        {
            throw new DomainException
            (
                "Il n'y a pas de compte utilisateur associé à cette adresse email"
            );
        }

        // Est-ce que le mot de passe spécifié est correct par rapport à celui stocké ?
        if(password_verify($password, $user['Password']) == false)
    	{
			throw new DomainException
			(
				'Le mot de passe spécifié est incorrect'
			);
    	}

		return $user;
    }

    public function signUp(
        $lastName,
        $firstName,
        $email,
        $password,
        $birthDate,
        $address,
        $city,
        $country,
        $zipCode,
        $phone)
    {
        $database = new Database();

        // On vérifie qu'il y a un utilisateur avec l'adresse e-mail spécifiée.
        $user = $database->queryOne
        (
            "SELECT Id FROM user WHERE Email = ?", [ $email ]
        );

        // Est-ce qu'on a bien trouvé un utilisateur ?
        if(empty($user) == false)
        {
            throw new DomainException
            (
                "Il existe déjà un compte utilisateur avec cette adresse e-mail"
            );
        }

        $sql = "INSERT INTO user
		(
			LastName,
			FirstName,
			Email,
			Password,
			BirthDate,
			CreationTimestamp,
			Address,
			City,
            Country,
			ZipCode,
			Phone
		) VALUES (?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?)";

        /*
         * Hachage du mot de passe, le mot de passe en clair n'est JAMAIS enregistré
         * et ne pourra JAMAIS être récupéré.
         */
        $passwordHash = password_hash($password, PASSWORD_BCRYPT);

        // Insertion de l'utilisateur dans la base de données.
        $database->executeSql($sql,
        [
            $lastName,
            $firstName,
            $email,
            $passwordHash,
            $birthDate,
            $address,
            $city,
            $country,
            $zipCode,
            $phone
        ]);
    }

    public function updateLoginTimestamp($userId)
    {
        // Mise à jour de la date de dernière connexion pour cet utilisateur.
        $database = new Database();
        $database->executeSql
        (
            "UPDATE user SET LastLoginTimestamp = NOW()	WHERE Id = ?",
            [ $userId ]
        );
    }
}