
const axios = require('axios');
import qs from 'qs';
import { MessageBox } from 'element-ui'

function get(url, data) {
    let header = {}
    if (process.client && window.sessionStorage.getItem('token')) {
        header = {
            // "sinovat-token":window.sessionStorage.getItem("token"),
            "sinovat-token": "sinovat-sid-41ab5f19-7ccc-4aba-b1c7-6ea21c2ea6bc",
            'Cache-Control': 'no-cache'
        }
    } else {
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
            headers: header
        })
            .then(function (res) {
                if (res.data.code === 0) {
                    resolve(res.data)
                } else if (res.data.code === 401) {
                    MessageBox.confirm('您未登录，立即登录?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        window.location.href = './login.html'
                    })
                } else {
                    MessageBox({
                        message: res.data.msg || res.data.message,
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
    let header = {}
    if (process.client && window.sessionStorage.getItem('token')) {
        header = {
            "sinovat-token": window.sessionStorage.getItem("token")
        }
    }

    let promise = new Promise((resolve, reject) => {
        axios.post(url, data, { headers: header })
            .then(function (res) {
                if (res.data.code === 0) {
                    resolve(res.data)
                } else if (res.data.code === 401) {
                    MessageBox.confirm('您未登录，立即登录?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        window.location.href = './login.html'
                    })
                } else {
                    MessageBox({
                        message: res.data.msg || res.data.message,
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
            post("/general/access/expertLogin", qs.stringify(data)).then(res => {
                window.sessionStorage.setItem("token", res.data.token)
                resolve(res.data)
            });
        });
    }
    // 招投标登录
    admLogin(data) {
        return new Promise((resolve, reject) => {
            post("/general/access/adminLogin", qs.stringify(data)).then(res => {
                window.sessionStorage.setItem("token", res.data.token)
                resolve(res.data)
            });
        });
    }
    //修改密码获取验证码
    getCode2(data) {
        return new Promise((resolve, reject) => {
            get("/general/sms/sendVcodeLogin?mob=" + data).then(res => {
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
                window.location.href = './index.html'
                resolve(res)
            });
        });
    }
    //修改密码
    changePWD(data) {
        return new Promise((resolve, reject) => {
            post("/sys/user/api/repassword", data).then(res => {
                resolve(res.data)
            });
        });
    }
    //个人信息
    personInfo(id) {
        return new Promise(resolve => {
            get('/ship/bidExpert/apis/info/' + id).then(res => {
                resolve(res.data)
            })
        })
    }
    //项目列表
    list(data) {
        return new Promise(resolve => {
            get('/ship/bid/apis/page2?query=' + data).then(res => {
                resolve(res)
            })
        })
    }
    //项目详情
    projectDetail(id) {
        return new Promise(resolve => {
            get('/ship/bid/apis/info/' + id).then(res => {
                resolve(res.data)
            })
        })
    }
    //报价单详情
    projectDetail2(id) {
        return new Promise(resolve => {
            get('/ship/bidOffer/apis/info/' + id).then(res => {
                resolve(res.data)
            })
        })
    }
    //评审内容
    reviewInfo(id) {
        return new Promise(resolve => {
            get('/ship/bidSvs/apis/info/' + id).then(res => {
                resolve(res.data)
            })
        })
    }
    //评审结果
    reviewResult(id) {
        return new Promise(resolve => {
            get('/ship/bidSvsResult/apis/resultWithItems?offerId=' + id).then(res => {
                resolve(res.data)
            })
        })
    }
    //提交评审
    submit(data) {
        return new Promise(resolve => {
            post('/ship/bidSvsResult/apis/addResultAndItems', data).then(res => {
                resolve(res)
            })
        })
    }
    //批量下载
    downLoad(data) {
        return new Promise(resolve => {
            get('/general/oss/aliDownload', data).then(res => {
                resolve(res)
            })
        })
    }
    // 专家选取规则列表
    selectRuleList(data) {
        return new Promise(resolve => {
            get('/ship/bidRule/page?query=' + data).then(res => {
                resolve(res)
            })
        })
    }
    // 选取规则-》管理规则列表
    selectRuleMagList(data) {
        return new Promise(resolve => {
            get('/ship/bidRuleItem/page?query=' + data).then(res => {
                resolve(res)
            })
        })
    }
    // 新增选取规则标准
    addSelectRule(data) {
        return new Promise(resolve => {
            post('/ship/bidRule/add', data).then(res => {
                resolve(res)
            })
        })
    }
    // 新增选取规则->管理规则
    addMagSelectRule(data) {
        return new Promise(resolve => {
            post('/ship/bidRuleItem/add', data).then(res => {
                resolve(res)
            })
        })
    }
    // 选取规则详情
    SelectRuleDetail(id) {
        return new Promise(resolve => {
            get('/ship/bidRule/info/' + id).then(res => {
                resolve(res.data)
            })
        })
    }
    // 选取->管理规则详情
    magSelectRuleDetail(id) {
        return new Promise(resolve => {
            get('/ship/bidRuleItem/info/' + id).then(res => {
                resolve(res.data)
            })
        })
    }
    // 修改选取规则
    modifySelectRule(data) {
        return new Promise(resolve => {
            post('/ship/bidRule/upd', data).then(res => {
                resolve(res)
            })
        })
    }
    // 修改选取规则->管理规则
    modifyMagSelectRule(data) {
        return new Promise(resolve => {
            post('/ship/bidRuleItem/upd', data).then(res => {
                resolve(res)
            })
        })
    }
    // 删除选取规则
    delSelectRule(data) {
        return new Promise(resolve => {
            get('/ship/bidRule/del', data)
                .then(res => {
                    resolve(res)
                })
        })
    }
    // 删除选取规则->管理规则
    delMagSelectRule(data) {
        return new Promise(resolve => {
            get('/ship/bidRuleItem/del', data)
                .then(res => {
                    resolve(res)
                })
        })
    }
    // 专家范围列表
    getExpertGroup() {
        return new Promise(resolve => {
            get('/sys/cat/listByPcd?cd=EXPERT_GROUP')
                .then(res => {
                    resolve(res.data.list)
                })
        })
    }
    // 导出excel
    exportExcel(ids) {
        return new Promise(resolve => {
            get('/ship/bidRule/expt', ids)
                .then(res => {
                    resolve(res)
                })
        })
    }
    // 专家库列表
    getExpertBaseList(data) {
        return new Promise(resolve => {
            get('/ship/bidExpert/page?query=' + data).then(res => {
                resolve(res)
            })
        })
    }
    // 删除专家
    delexpert(data) {
        return new Promise(resolve => {
            get('/ship/bidExpert/del', data)
                .then(res => {
                    resolve(res)
                })
        })
    }
    // 新增专家
    newExpert(data) {
        return new Promise(resolve => {
            post('/ship/bidExpert/add', data).then(res => {
                resolve(res)
            })
        })
    }
    // 专家详情
    ExpertDetail(id) {
        return new Promise(resolve => {
            get('/ship/bidExpert/info/' + id).then(res => {
                resolve(res.data)
            })
        })
    }
    // 修改专家
    modifyExpert(data) {
        return new Promise(resolve => {
            post('/ship/bidExpert/upd', data).then(res => {
                resolve(res)
            })
        })
    }
    // 获取省市区列表
    getmapList(data) {
        return new Promise((resolve, reject) => {
            get('/sys/region/page?query=' + data).then(res => {
                resolve(res.data.list)
            })
        })
    }

    //获取项目评定标准
    getBidSvsList(data) {
        return new Promise(resolve => {
            get('/ship/bidSvs/list?query=' + data).then(res => {
                resolve(res.data)
            })
        })
    }
    //获取专家列表
    getBidExpertPage(data) {
        return new Promise(resolve => {
            get('/ship/bidExpert/page?query=' + data).then(res => {
                resolve(res.data)
            })
        })
    }
    //数据字典
    getCatListByPcd(data) {
        return new Promise(resolve => {
            get('/sys/cat/listByPcd', data).then(res => {
                resolve(res.data)
            })
        })
    }
    //获取招标范围（自选）
    getOrgEnterList(data) {
        return new Promise(resolve => {
            get('/ship/orgEnter/list?query=' + data).then(res => {
                resolve(res.data)
            })
        })
    }
    //获取专家-随机三个
    getBidExpertRamdomList(data) {
        return new Promise(resolve => {
            get('/ship/bidExpert/ramdomList', data).then(res => {
                resolve(res.data)
            })
        })
    }
    //招标新建
    postBidAdd(data) {
        return new Promise(resolve => {
            post('/ship/bid/add', data).then(res => {
                resolve(res)
            })
        })
    }
    //获取招标列表
    getBidPage(data) {
        return new Promise(resolve => {
            get('/ship/bid/page?query=' + data).then(res => {
                resolve(res)
            })
        })
    }
    //获取招标详情
    getBidInfo(data) {
        return new Promise(resolve => {
            get('/ship/bid/info/' + data).then(res => {
                resolve(res)
            })
        })
    }
    //招标审核
    postBidExamine(data) {
        return new Promise(resolve => {
            post('/ship/bid/examine', data).then(res => {
                resolve(res)
            })
        })
    }
    //招标列表删除
    getBidDel(data) {
        return new Promise(resolve => {
            get('/ship/bid/del', data).then(res => {
                resolve(res)
            })
        })
    }

    // 项目评定标准列表
    getEvaStandardList(data) {
        return new Promise(resolve => {
            get('/ship/bidSvs/page?query=' + data).then(res => {
                resolve(res)
            })
        })
    }
    // 删除项目评定标准项
    delEvaStandard(data) {
        return new Promise(resolve => {
            get('/ship/bidSvs/del', data)
                .then(res => {
                    resolve(res)
                })
        })
    }
    // 新增评定标准项
    newEvaStandard(data) {
        return new Promise(resolve => {
            post('/ship/bidSvs/add', data).then(res => {
                resolve(res)
            })
        })
    }
    // 评定标准项详情
    EvaStandardDetail(id) {
        return new Promise(resolve => {
            get('/ship/bidSvs/info/' + id).then(res => {
                resolve(res.data)
            })
        })
    }
    // 修改评定标准项
    modifyEvaStandard(data) {
        return new Promise(resolve => {
            post('/ship/bidSvs/upd', data).then(res => {
                resolve(res)
            })
        })
    }
    // 评定指标子列表
    getEvaStandardSonList(data) {
        return new Promise(resolve => {
            get('/ship/bidSvsItem/page?query=' + data).then(res => {
                resolve(res)
            })
        })
    }
    // 删除评定指标子列表项
    delEvaStandardSonitem(data) {
        return new Promise(resolve => {
            get('/ship/bidSvsItem/del', data)
                .then(res => {
                    resolve(res)
                })
        })
    }
}

export { api };
