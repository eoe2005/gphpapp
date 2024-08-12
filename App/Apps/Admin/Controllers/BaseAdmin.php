<?php

namespace App\Apps\Admin\Controllers;

use G\Controller;

class BaseAdmin extends Controller
{
    public function __construct()
    {
        if(!$this->getAdminId()){
            throw new \Exception('账号没有登录',333);
        }
    }
    function getAdminId(){
        return $_SESSION['admin_id'] ?? 0;
    }
}