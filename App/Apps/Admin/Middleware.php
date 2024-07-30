<?php

namespace App\Apps\Admin;


use G\Middle;

class Middleware implements Middle
{

    function before()
    {
        session_start();
    }

    function after($data)
    {
        header('Content-Type: application/json;charset=utf-8');
        if($data instanceof \Exception){
            echo json_encode([
                'code' => $data->getCode() ?: 500,
                'msg' => $data->getMessage(),
                'data' => []
            ],JSON_UNESCAPED_UNICODE);
            die();
        }
        echo json_encode([
            'code' => 200,
            'msg' => 'success',
            'data' => $data
        ],JSON_UNESCAPED_UNICODE);
        die();
    }
}