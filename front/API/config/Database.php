<?php

    class Database {

        // Variables.

        private $host = 'mirankanta.mysql.database.azure.com';
        private $db_name = 'jarcodb';
        private $username = 'Mira';
        private $password = 'Aarinen1977';
        private $conn;

        // Functions.

        public function connect() {
            $this -> conn = null;

            try {

                //Selitä PDO https://www.ohjelmointiputka.net/koodivinkit/25206-php-sql-pdo-hyv%c3A4-tapa-k%c3%A4sitell%c3%A4-tietokantoja
                //Luodaan PDO-olio, joka pitää sisällään tietokantayhteyden
                //Tietokantaa käytetään luodun PDO-olion kautta
            
                // new PDO('mysql:host=localhost;dbname=test', $user, $pass);

                $this -> conn = new PDO('mysql:host=' . $this -> host . ';dbname=' . $this -> db_name, $this -> username, $this -> password);
                $this -> conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            } catch(Exception $e) {
                echo 'Connection Error: ' . $e -> getMessage();
            }

            return $this -> conn;
        }

    };

?>