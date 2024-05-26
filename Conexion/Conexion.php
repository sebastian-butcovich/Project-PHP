<?php 
    class Conexion { 
        private  $conexion;

        public function establecerConexion(){
            $dataname="seminariophp";
            $dsn = "mysql:host=localhost;port=3336;dbname=$dataname";
            $username="root";
            $password="my_password";
            try {
                $conexion = new PDO($dsn,$username,$password);
            }
            catch (PDOException $e){
                echo $e->getMessage();
            }
            return $conexion;
        }
    }
?>