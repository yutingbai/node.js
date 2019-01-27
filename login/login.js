const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const urlLib = require('url');
var user = {};

var server  = http.createServer(function(req,res){
    //解析数据
    var str = '';
    req.on('data',function(){
        str+=data;
    })
    res.on('end',function(){
        var obj = urlLib.parse(req.url,true);
        const url =obj.pathname;
        const GET=obj.query;
        const POST=querystring.parse(str);
    //区分访问--接口,文件
    if(url=='/user'){
         switch(GET.act){
             case 'reg':
             //检查用户名是否已经被注册
             if(users[GET.user]){
                 res.write('{"ok":false,"msg":"此用户已存在"}');
             }else{
                 //插入users
                 users[GET.user]=GET.pass;
                 res.write('{"ok": true,"msg":"注册成功"}')
             }
             break;
             case 'login':
             //检查用户是否存在
             if(users[GET.user]==null){
                res.write('{"ok":false,"msg":"此用户不存在"}');
            }else if(users[GET.user]!= GET.pass){
                res.write('{"ok":false,"msg":"用户名或密码有误"}');
            }else{
                res.write('{"ok": true,"msg":"登录成功"}')
            }
             break;
             default:
             res.write('{"ok":false,"msg": "未知的act"}')
         }
         res.end();
    }else{
         //读取文件
        var fileName = './www'+url;
        fs.readFile(fileName,function(err,data){
            if(err){
                res.write('404');
            }else{
                res.write(data);
            }
        })
    }
   
    })
})
server.listen(8080);
