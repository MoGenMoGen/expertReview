
const axios = require('axios');
import qs from 'qs';
import { MessageBox } from 'element-ui'

function get(url, data) {
    let header={}
    if(process.client && window.sessionStorage.getItem('token')){
        header = {
            "sinovat-token":window.sessionStorage.getItem("token"),
            'Cache-Control': 'no-cache'
        }
    }else {
        header = {
            'Cache-Control': 'no-cache'
        }
    }

    let myData = {};
    if (data) {
        //过滤掉空的参数
        for (let [key, val] of Object.entries(data)) {
            if (val) {
                myData[key] = val;
            }
        }
    }
    let promise = new Promise((resolve, reject) => {
        axios.get(url, {
            params: data,
            headers:header
        })
            .then(function (res) {
                if(res.data.code===0){
                    resolve(res.data)
                }else if(res.data.code===401){
                    MessageBox.confirm('您未登录，立即登录?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        window.location.href = './login.html'
                    })
                }else {
                    MessageBox({
                        message: res.data.msg ||  res.data.message,
                        type: 'warning'
                    });
                }
            })
            .catch(function (error) {
                MessageBox({
                    message: JSON.stringify(error),
                    type: 'warning'
                });
            })

    });
    return promise;
}

function post(url, data) {
    let header={}
    if(process.client && window.sessionStorage.getItem('token')){
        header = {
            "sinovat-token":window.sessionStorage.getItem("token")
        }
    }

    let promise = new Promise((resolve, reject) => {
        axios.post(url, data,{headers:header})
            .then(function (res) {
                if(res.data.code===0){
                    resolve(res.data)
                }else if(res.data.code===401){
                    MessageBox.confirm('您未登录，立即登录?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        window.location.href = './login.html'
                    })
                }else {
                    MessageBox({
                        message: res.data.msg ||  res.data.message,
                        type: 'warning'
                    });
                }
            })
            .catch(function (error) {
                MessageBox({
                    message: JSON.stringify(error),
                    type: 'warning'
                });
            });
    });
    return promise;
}


class api {
    //专家登录
    login(data) {
        return new Promise((resolve, reject) => {
            post("/general/access/expertLogin",qs.stringify(data)).then(res => {
                window.sessionStorage.setItem("token",res.data.token)
                resolve(res.data)
            });
        });
    }
	// 招投标登录
	admLogin(data) {
	    return new Promise((resolve, reject) => {
	        post("/general/access/adminLogin",qs.stringify(data)).then(res => {
	            window.sessionStorage.setItem("token",res.data.token)
	            resolve(res.data)
	        });
	    });
	}
    //修改密码获取验证码
    getCode2(data) {
        return new Promise((resolve, reject) => {
            get("/general/sms/sendVcodeLogin?mob="+data).then(res => {
                resolve(res)
            });
        });
    }
    //退出
    logout() {
        return new Promise((resolve, reject) => {
            get("/general/access/logout").then(res => {
                sessionStorage.clear()
                window.location.reload()
                window.location.href='./index.html'
                resolve(res)
            });
        });
    }
    //修改密码
    changePWD(data) {
        return new Promise((resolve, reject) => {
            post("/sys/user/api/repassword",data).then(res => {
                resolve(res.data)
            });
        });
    }
   //个人信息
    personInfo(id){
        return new Promise(resolve => {
            get('/ship/bidExpert/apis/info/'+id).then(res=>{
                resolve(res.data)
            })
        })
    }
    //项目列表
    list(data){
        return new Promise(resolve => {
            get('/ship/bid/apis/page2?query='+data).then(res=>{
                resolve(res)
            })
        })
    }
    //项目详情
    projectDetail(id){
        return new Promise(resolve => {
            get('/ship/bid/apis/info/'+id).then(res=>{
                resolve(res.data)
            })
        })
    }
    //报价单详情
    projectDetail2(id){
        return new Promise(resolve => {
            get('/ship/bidOffer/apis/info/'+id).then(res=>{
                resolve(res.data)
            })
        })
    }
    //评审内容
    reviewInfo(id){
        return new Promise(resolve => {
            get('/ship/bidSvs/apis/info/'+id).then(res=>{
                resolve(res.data)
            })
        })
    }
    //评审结果
    reviewResult(id){
        return new Promise(resolve => {
            get('/ship/bidSvsResult/apis/resultWithItems?offerId='+id).then(res=>{
                resolve(res.data)
            })
        })
    }
    //提交评审
    submit(data){
        return new Promise(resolve => {
            post('/ship/bidSvsResult/apis/addResultAndItems',data).then(res=>{
                resolve(res)
            })
        })
    }
    //批量下载
    downLoad(data){
        return new Promise(resolve => {
            get('/general/oss/aliDownload',data).then(res=>{
                resolve(res)
            })
        })
    }
}

export { api };
