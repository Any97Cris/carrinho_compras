<?php
namespace app\database\models;

abstract class Model{

    protected string $table;

    public function all(string $fields = '*'){
        try{
            // $connection = Connection::getConnection();
            $sql = "select {$fields} from {$this->table}";
            var_dum($sql);
            // $query = $connection->query($sql);
            // return $query->fetchAll();
        }catch(\PDOException $e){
            var_dump($e->getMessage());
        }
    }
}

?>