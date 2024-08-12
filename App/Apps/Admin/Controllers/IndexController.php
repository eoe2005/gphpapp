<?php

namespace App\Apps\Admin\Controllers;

use App\Models\AdminModel;
use G\Controller;
use G\Req;

class IndexController extends Controller
{

    /**
     * 账号登录
     * @return array
     * @throws \Exception
     */
    function loginAction()
    {
        $name = Req::input('login_name');
        $pass = Req::input('pass');
        if (!$name || !$pass) {
            throw new \Exception('账号或者密码错误', 403);
        }
        $row = AdminModel::where(['login_name' => $name])->fetch();
        if (!$row || $row['passwd'] != AdminModel::buildPass($pass, $row['sign'])) {
            throw new \Exception('账号或者密码错误', 403);
        }
        if ($row['status'] != 0) {
            throw new \Exception('账号禁止登录', 403);
        }
        $_SESSION['admin_id'] = $row['id'];
        return [
            'nick_name' => $row['nick_name'],
            'avatar' => $row['avatar'],
        ];
    }


    /**
     * 退出登录
     * @return array
     */
    function logoutAction()
    {
        session_destroy();
        return [];
    }

}