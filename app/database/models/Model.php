<?php
namespace app\database\models;

use app\database\Connection;

abstract class Model{

    protected string $table;

    public function all(string $fields = '*'){
        try{
            // $connection = Connection::getConnection();
            $sql = "select {$fields} from {$this->table}";
            var_dump($sql);
            // $query = $connection->query($sql);
            // return $query->fetchAll();
        }catch(\PDOException $e){
            var_dump($e->getMessage());
        }
    }
}

?>