
class until {
    //设置宽度
    getWidth() {
        let width = 0
        let bWidth = 0
        let widths = document.documentElement.clientWidth ||  document.body.clientWidth;
        bWidth = widths>1200 ? widths : 1200
        width = bWidth*0.9>1200 ? 1200 : bWidth*0.9
        return{width,bWidth}
    }
  noShare(){
      document.addEventListener('WeixinJSBridgeReady', function onBridgeReady()
      {
          WeixinJSBridge.call('hideOptionMenu');
      });
  }
  //对象数组方法去重
  arrayDeduplication(arr) {
    const obj = {};
    return arr.reduce((curr, next) => {
      obj[next.matchMenuId]
        ? ""
        : (obj[next.matchMenuId] =
            true && (next.type === 0 || next.type === 1) && curr.push(next));
      return curr;
    }, []);
  }
  //判断是否登录
  ifLogin() {
    // console.log(localStorage.getItem('user'))
    if (!this.loGet("user")) {

      return false;
    } else {
      return true;
    }
  }
  down(obj) {
    let objArr = obj.split("/");
    let name = objArr[objArr.length - 1];
    let url =
      "http://mx.jiaxiangtech.com/upload/201812/5b24f0422eb24717a37f08d43c529713.jpg";
    // for(let i=0; i<objArr.length-1;i++){
    //   name+=objArr[i]
    // }
    // console.log(url)
    // 创建隐藏的可下载链接
    var eleLink = document.createElement("a");
    // http___khtest.10jqka.com.cn_dev_taojinchao_vuepdf_dist_test
    eleLink.download = name;
    eleLink.style.display = "none";
    // 字符内容转变成blob地址
    var blob = new Blob([url]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
  }
  getPk() {
    let obj = this.loGet("JS_token");
    return JSON.parse(obj).accInfo.teachAccPk;
  }



  //fetch请求
  async fetch(url, data) {
    if (window.fetch) {
      let body = this.param(data);
      let requestConfig = {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "force-cache",
        body
      };
      try {
        const response = await fetch(url, requestConfig);
        const responseJson = await response.json();
        return responseJson;
      } catch (error) {
        throw new Error(error);
      }
    } else {
      this.post(url, data);
    }
  }
  //fetch参数格式化
  param(data) {
    let str = "";
    Object.keys(data).forEach(index => {
      str = str + index + "=" + data[index] + "&";
    });
    str = str.substring(0, str.length - 1);
    return str;
  }
  //是否登录并跳转
  isLogin(self) {
    let state = this.loGet("JS_token") ? true : false;
    if (!state) {
      self.$hero.msg.show({
        text: "未登录"
      });
      setTimeout(() => {
        location.href = "../system/register.html";
      }, 1000);
      return false;
    }
    return true;
  }
  //是否登录
  isLogined() {
    let state = this.loGet("JS_token") ? true : false;
    return state;
  }
  //,分割数组
  cutArray(str) {
    let result = [];
    if (str.indexOf(";") > -1) {
      result = str.split(";");
    } else {
      result.push(str);
    }
    let panel = result.filter(t => {
      if (t) {
        return true;
      } else {
        return false;
      }
    });
    return panel;
  }
  //跳转页面
  href(url) {
    window.location.href = url;
  }
  //后退
  back() {
    window.history.back();
  }
  //session存取
  seSave(name, obj) {
    sessionStorage.setItem(name, obj);
  }
  seGet(name) {
    return sessionStorage.getItem(name);
  }
  seRemove(name) {
    sessionStorage.removeItem(name);
  }
  //local存取
  loSave(name, obj) {
    localStorage.setItem(name, obj);
  }
  loGet(name) {
    return localStorage.getItem(name);
  }
  loRemove(name) {
    localStorage.removeItem(name);
  }
  //获取TS_token
  getToken() {
    return JSON.parse(localStorage.getItem("JS_token"));
  }
  getId() {
    let obj = this.getToken();
    return obj.result.uuid;
  }
  //截取URL参数
  getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    } else {
      return null;
    }
  }
  //判断是否空对象
  isEmptyObject(obj) {
    for (var name in obj) {
      return false; //返回false，不为空对象
    }
    return true; //返回true，为空对象
  }
  //格式化日期,返回 年 月 日 星期
  formatDate(str = "") {
    // str = str==""?new Date():new Date(str.replace(/-/g, "/"));
    str = str == "" ? new Date() : new Date(str);
    let week = [
      "星期天",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    ];
    let year = str.getFullYear();
    let month =
      str.getMonth() + 1 < 10 ? "0" + (str.getMonth() + 1) : str.getMonth() + 1;
    let day = str.getDate() < 10 ? "0" + str.getDate() : str.getDate();
    let hour = str.getHours() < 10 ? "0" + str.getHours() : str.getHours();
    let minite =
      str.getMinutes() < 10 ? "0" + str.getMinutes() : str.getMinutes();
    let second =
      str.getSeconds() < 10 ? "0" + str.getSeconds() : str.getSeconds();
    week = week[str.getDay()];
    return {
      year,
      month,
      day,
      hour,
      minite,
      second,
      week
    };
  }
  formatDay(fmt, tm = "") {
    let times = tm ? new Date(tm.replace(/(-)/g, "/")) : new Date();
    var o = {
      "M+": times.getMonth() + 1, //月份
      "d+": times.getDate(), //日
      "h+": times.getHours(), //小时
      "m+": times.getMinutes(), //分
      "s+": times.getSeconds(), //秒
      "q+": Math.floor((times.getMonth() + 3) / 3), //季度
      S: times.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (times.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return fmt;
  }
  //指定时间倒计时(结束秒数)
  TimeSlot(count) {
    let end = new Date();
    //Date类型的valueOf(),返回当前日期毫秒数,可以直接比较
    if (count < end) {
      return {
        h: "00",
        m: "00",
        s: "00"
      };
    }
    let total = (count - end.getTime()) / 1000;
    let h = parseInt((total / (60 * 60)) % 24);
    let m = parseInt((total / 60) % 60);
    let s = parseInt(total % 60);
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    return {
      h,
      m,
      s
    };
  }
  //计算时间差
  TimeStep(times,endTime) {
    let start = new Date(times);
    let end = endTime ? new Date(endTime) :  new Date();
    let count = (end.getTime() - start.getTime()) / 1000;
    let d = parseInt(count / (60 * 60) / 24);
    return d;
  }


  //设置只能输入数字
  formatNumber(val, max) {
    max = parseInt(max);
    let reg = /^\d+$/g;
    val = val.toString();
    if (val.match(reg)) {
      return val > max ? max : Number(val);
    } else {
      if (val == "") {
        return "";
      }
      if (!val[0].match(reg)) {
        return "";
      }
      let str = "";
      for (let i = 0; i < val.length; i++) {
        str += val[i].match(reg) ? val[i] : "";
      }
      return parseInt(str);
    }
  }
  count(flag, val, max) {
    //加减按钮点击
    max = parseInt(max);
    if (max == 0) {
      return 0;
    }
    if (flag == "-") {
      return val == 1 ? 1 : --val;
    } else {
      return val == max ? max : ++val;
    }
  }
  //数组排序(某属性数值)
  Sort(array, flag, state = "up") {
    let box = array.sort((v1, v2) => {
      if (state == "up") {
        return v1[flag] - v2[flag];
      } else {
        return v2[flag] - v1[flag];
      }
    });
    return box;
  }
  //随机生成 n~m 之间的数
  Random(min, max) {
    let choices = max - min + 1;
    return Math.floor(Math.random() * choices + min);
  }
  /*验证码倒计时*/
  countdown(el, count) {
    let timer = setInterval(() => {
      if (count == 0) {
        el.innerHTML = `重新获取`;
        el.removeAttribute("disabled");
        clearInterval(timer);
      } else {
        count--;
        el.innerHTML = `( ${count} )`;
        el.setAttribute("disabled", true);
      }
    }, 1000);
  }
  // 顶部导航
  checkNav(obj,list) {
	let data = ''
	list.forEach(item => {
		if(item.name == obj.name) {
			data = obj.name
			return
		} else {
			data = false
			return
		}
	})
	return data
  }
}
//touch判断方向
class judge {
  // 1上2下3左4右
  getDirection(startx, starty, endx, endy) {
    let angx = endx - startx;
    let angy = endy - starty;
    let result = 0;
    var angle = this.getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
      result = 1;
    } else if (angle > 45 && angle < 135) {
      result = 2;
    } else if (
      (angle >= 135 && angle <= 180) ||
      (angle >= -180 && angle < -135)
    ) {
      result = 3;
    } else if (angle >= -45 && angle <= 45) {
      result = 4;
    }
    return result;
  }
  getAngle(angx, angy) {
    return (Math.atan2(angy, angx) * 180) / Math.PI;
  }
}
class reg {
  //验证身份证号码
  checkCard(str) {
    //15位数身份证正则表达式
    let arg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
    //18位数身份证正则表达式
    let arg2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;
    if (str == "") {
      return "请输入身份证号码";
    }
    if (str.match(arg1) == null && str.match(arg2) == null) {
      return "请输入正确的身份证号码";
    }
    return "ok";
  }
  //验证手机号
  checkPhone(str) {
    let regPhone = /^0?(13[0-9]|15[012356789]|18[0123456789]|14[57]|17[678]|170[059]|14[57]|166|19[0-9])[0-9]{8}$/;
    if (str == "") {
      return "请输入手机号";
    }
    if (!regPhone.test(str)) {
      return "请填写正确的手机号";
    }
    return "ok";
  }
  //验证用户名
  checkUserName(str) {
    let reg = /[\u4e00-\u9fa5]/g;
    if (str.length == 0) {
      return "请输入用户名";
    }
    if (reg.test(str)) {
      return "用户名不能包含中文";
    }
    return "ok";
  }
  //验证真实姓名
  checkName(str) {
    let reg = /^[\u4E00-\u9FA5]+$/;
    if (str.length == 0) {
      return "请输入真实姓名";
    }
    if (str.length < 2) {
      return "请输入正确名字";
    }
    if (!reg.test(str)) {
      return "请输入中文名";
    }
    return "ok";
  }
  //验证密码
  checkPwd(str) {
    let reg = /^[0-9a-zA-Z]{6,}$/;
    if (str == "") {
      return "请输入密码";
    }
    if (!reg.test(str)) {
      return "请输入正确规则密码";
    }
    return "ok";
  }
  //验证邮箱
  checkMail(str) {
    let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (str == "") {
      return "请输入邮箱";
    }
    if (!reg.test(str)) {
      return "请输入正确的邮箱";
    }
    return "ok";
  }

  //验证银行卡号
  checkMoney(str) {
    let reg = /^([1-9]{1})(\d{14}|\d{18})$/;
    if (str == "") {
      return "请输入银行卡号";
    }
    if (!reg.test(str)) {
      return "请输入正确的银行卡号";
    }
    return "ok";
  }
}

export { until, reg, judge };
