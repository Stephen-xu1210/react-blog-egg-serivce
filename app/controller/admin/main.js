'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller{
    async index(){
        this.ctx.body = "hi api"
    }

    //判断用户名密码是否正确
  async checkLogin(){
    let userName = this.ctx.request.body.userName
    let password = this.ctx.request.body.password
    const sql = " SELECT userName FROM admin_user WHERE userName = '"+userName +
                "' AND password = '"+password+"'"

    const res = await this.app.mysql.query(sql)
    if(res.length>0){
        //登录成功,进行session缓存
        let openId=new Date().getTime()
        this.ctx.session.openId={ 'openId':openId }
        this.ctx.body={'data':'登录成功','openId':openId}

    }else{
        this.ctx.body={data:'登录失败'}
    } 
}

//后台文章分类信息
async getTypeInfo(){
    const resType = await this.app.mysql.select('type')
    this.ctx.body={data:resType}
}

//添加文章
async addArticle(){

    let tmpArticle= this.ctx.request.body
    // tmpArticle.
    const result = await this.app.mysql.insert('article',tmpArticle)
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId

    this.ctx.body={
        isScuccess:insertSuccess,
        insertId:insertId
    }
}
}

module.exports = MainController