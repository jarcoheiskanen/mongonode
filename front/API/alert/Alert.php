<?php

    class Alert {

        public $ID;
        public $CLASS;
        public $NAME;
        public $MESSAGE;
        public $CURDATE;

        private $conn;
        public function __construct($db) {
            $this -> conn = $db;
        }

        // Get alerts.

        public function getAlerts() {
            
            $query = 'SELECT
                id,
                class,
                name,
                message,
                curDate
            FROM
                messages';

            // Prepare statement.
            $stmt = $this -> conn -> prepare($query);

            // Execute query.
            $stmt -> execute();
            return $stmt;

        }

        // Get single status alert.

        public function getStatusAlert() {
            
            $query = 'SELECT
                id AS ID,
                class AS CLASS,
                name AS NAME,
                message AS MESSAGE,
                curDate AS CURDATE
            FROM
                messages
            WHERE
                messages.id = ?';

            // Prepare statement.
            $stmt = $this -> conn -> prepare($query);

            // Bind ID.
            $stmt -> bindParam(1, $this -> id);

            // Execute query.
            $stmt -> execute();
            $row = $stmt -> fetch(PDO::FETCH_ASSOC);

            // Set properties.
            $this -> ID = $row['ID'];
            $this -> CLASS = $row['CLASS'];
            $this -> NAME = $row['NAME'];
            $this -> MESSAGE = $row['MESSAGE'];
            $this -> CURDATE = $row['CURDATE'];

        }

        // Create

        public function create() {

            $query = 'INSERT INTO messages
                SET class = :CLASS,
                name = :NAME,
                message = :MESSAGE,
                curDate = :CURDATE';

            $stmt = $this -> conn -> prepare($query);

            $this -> CLASS = htmlspecialchars(strip_tags($this -> CLASS));
            $this -> NAME = htmlspecialchars(strip_tags($this -> NAME));
            $this -> MESSAGE = htmlspecialchars(strip_tags($this -> MESSAGE));
            $this -> CURDATE = htmlspecialchars(strip_tags($this -> CURDATE));

            $stmt -> bindParam(":CLASS", $this -> CLASS);
            $stmt -> bindParam(":NAME", $this -> NAME);
            $stmt -> bindParam(":MESSAGE", $this -> MESSAGE);
            $stmt -> bindParam(":CURDATE", $this -> CURDATE);

            if ($stmt -> execute()) {
                return true;
            }

            printf("Error: %s.\n", $stmt -> error, CURDATE);

            return false;

        }

        // Update

        public function update() {

            $query = 'UPDATE messages
                SET class = :CLASS,
                name = :NAME,
                message = :MESSAGE,
                curDate = :CURDATE;
            WHERE
                id = :ID';

            // Prepare statement
            $stmt = $this -> conn -> prepare($query);

            // Clean data
            $this -> CLASS = htmlspecialchars(strip_tags($this -> CLASS));
            $this -> NAME = htmlspecialchars(strip_tags($this -> NAME));
            $this -> MESSAGE = htmlspecialchars(strip_tags($this -> MESSAGE));
            $this -> CURDATE = htmlspecialchars(strip_tags($this -> CURDATE));
            $this -> ID = htmlspecialchars(strip_tags($this -> ID));

            // Bind data
            $stmt -> bindParam(":CLASS", $this -> CLASS);
            $stmt -> bindParam(":NAME", $this -> NAME);
            $stmt -> bindParam(":MESSAGE", $this -> MESSAGE);
            $stmt -> bindParam(":CURDATE", $this -> CURDATE);
            $stmt -> bindParam(':ID', $this -> ID);

            // Execute query
            if ($stmt -> execute()) {
                return true;
            }

            // Print error if something goes wrong
            printf("Error: %s.\n", $stmt -> error);

            return false;

        }


        public function delete() {

            $query = 'DELETE FROM
                messages
            WHERE
                id = :ID';

            // Prepare statement
            $stmt = $this -> conn -> prepare($query);

            // Clean data
            $this -> ID = htmlspecialchars(strip_tags($this -> ID));

            // Bind data
            $stmt -> bindParam(':ID', $this -> ID);

            // Execute query
            if ($stmt -> execute()) {
                return true;
            }

            // Print error if something goes wrong
            printf("Error: %s.\n", $stmt -> error);

            return false;

        }


    }


?>