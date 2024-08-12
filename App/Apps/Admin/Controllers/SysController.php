<?php

namespace App\Apps\Admin\Controllers;

use App\Models\AdminModel;
use App\Services\SysConfSvc;
use G\Req;

class SysController extends BaseAdmin
{
    /**
     * 获取配置信息
     * @return array|mixed|string
     */
    function getConfAction()
    {
        return SysConfSvc::getConf(Req::input('key'),Req::input('defval'));
    }

    /**
     * 保存卑职信息
     * @return true
     * @throws \Exception
     */
    function saveConfAction(){
        return SysConfSvc::setConf(Req::input('key'),Req::input('data'));
    }

    /**
     * 修改密码
     * @return void
     */
    function changePwdAction(){
        $oldPass = Req::input('old');
        $pass = Req::input('pass');
        if(!$oldPass || !$pass){
            throw new \Exception('参数错误',403);
        }
        $row = AdminModel::find($this->getAdminId());
        if($row['passwd'] != AdminModel::buildPass($oldPass,$row['sign'])){
            throw new \Exception('旧密码错误',403);
        }
        $sign = AdminModel::genrateSign();
        return AdminModel::update([
            'passwd' => AdminModel::buildPass($pass,$sign),
            'sign' => $sign
        ],['id' => $this->getAdminId()]);
    }


}