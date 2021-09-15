<template>
    <!--修改密码-->
    <div id="home" :style="{width:bWidth + 'px'}">
        <div class="home">
            <div class="header1">
                <div class="content" :style="{width:width + 'px'}">
                    <img :src="logo" alt="" @click="toPage('./index.html')"/>
                    <p @click="toPage('./login.html')"><span class="textRed">请登录<i class="el-icon-arrow-right"></i></span></p>
                </div>
            </div>
            <div class="header">
                <img src="../../../assets/img/左.png" alt=""/>
                <p>忘记密码</p>
                <img src="../../../assets/img/右.png" alt=""/>
            </div>
            <div class="body main" :style="{width:width + 'px'}">
                <div id="register2"  class="main" >
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :label-position="labelPosition"  @submit.native.prevent>
                        <div class="title">
                            <p><span class="lineC"></span>账号信息</p>
                        </div>
                        <el-form-item label="手机号码：" prop="mob">
                            <el-input placeholder="请输入手机号码" v-model="ruleForm.mob" type="tel"></el-input>
                        </el-form-item>
                        <el-form-item label="校验码：" prop="vcode">
                            <el-input placeholder="请输入校验码" v-model="ruleForm.vcode" type="number"></el-input>
                            <button class="button1" v-if="!time" @click="getCode">获取校验码</button>
                            <button class="button1" v-else>{{time}}S后获取</button>
                        </el-form-item>
                        <el-form-item label="设置密码：" prop="password">
                            <el-input placeholder="请输入密码" v-model="ruleForm.password" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="重复密码：" prop="comfirmPassword">
                            <el-input placeholder="请再次输入密码" v-model="ruleForm.comfirmPassword" type="password"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button class="button2" type="primary" @click="submitForm('ruleForm')">确认</el-button>
                            <!--            <el-button @click="resetForm('ruleForm')">重置</el-button>-->
                        </el-form-item>
                    </el-form>

                </div>

            </div>
        </div>

        <my-footer></my-footer>
    </div>
</template>

<script>
    import myFooter from '@/components/footer'
    export default {
        title: '忘记密码',

        data(){
            //手机号验证
            var checkTel = (rule, value, callback) => {
                let regPhone = /^(((13[0-9]{1})|(14[0-9]{1})||(15[0-9]{1})|17[0-9]{1}|(18[0-9]{1}))+\d{8})$/;
                if (!value) {
                    return callback(new Error('手机号码不能为空！'));
                }else {
                    setTimeout(() => {
                        if (!regPhone.test(value)) {
                            return callback(new Error('请填写正确的手机号！'));
                        }else {
                            return callback()
                        }
                    }, 1000);
                }

            };
            var checkPass = (rule,value,callback) => {
                if (!value) {
                    return callback(new Error('密码不能为空！'));
                }else {
                    setTimeout(() => {
                        if (this.ruleForm.comfirmPassword && this.ruleForm.comfirmPassword !== value) {
                            return callback(new Error('两次密码输入不一致！'));
                        }else {
                            return callback()
                        }
                    }, 1000);
                }

            };
            var checkPass2 = (rule,value,callback) => {
                if (!value) {
                    return callback(new Error('重复密码不能为空！'));
                }else {
                    setTimeout(() => {
                        if (this.ruleForm.password && this.ruleForm.password !== value) {
                            return callback(new Error('两次密码输入不一致！'));
                        }else {
                            return callback()
                        }
                    }, 1000);
                }

            }
            return{
                bWidth:0,
                width:0,
                logo:'https://sinovat.oss-cn-shanghai.aliyuncs.com/9cc91287abfa4ab7a6c5b917123a4e12_96f8a1087df345a99de5708bc15ae537_logo.png',
                time:0,
                labelPosition: 'left',
                ruleForm:{
                    mob:'',
                    vcode:'',
                    password:'',
                    comfirmPassword:'',
                },
                rules: {
                    mob: [
                        { required: true, validator: checkTel, trigger: 'blur' },
                    ],
                    vcode: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                    ],
                    password: [
                        { required: true,validator: checkPass, trigger: 'blur' },
                    ],
                    comfirmPassword: [
                        { required: true,validator: checkPass2, trigger: 'blur' },
                    ],
                }
            }
        },
        computed: {

        },
        components: {
            myFooter
        },
        mounted(){
            this.getWidth()
            window.onresize = () => {
                this.getWidth()
            }

        },
        methods:{
            getWidth(){
                let {bWidth,width} = this.until.getWidth()
                this.bWidth = bWidth
                this.width = width
            },
            //获取地区信息
            changeAddr(info){
                let data = JSON.parse(info)
                this.ruleForm.addrNm = data.province+'-'+data.city+'-'+data.region
                this.ruleForm.addrCd = data.provinceId+'-'+data.cityId+'-'+data.regionId
            },
            //提交
            submitForm(formName) {
                console.log('提交')
                this.$refs[formName].validate((valid) => {
                    console.log(valid)
                    if (valid) {
                        console.log('==============')
                        this.api.changePWD(this.ruleForm).then(res=>{
                            this.$message({
                                message: '修改成功，请重新登录',
                                type: 'success'
                            });
                            setTimeout(()=>{
                                this.toPage('./login.html')
                            },1500)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //取消
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //获取验证码
            getCode(){
                if(this.reg.checkPhone(this.ruleForm.mob)!='ok'){
                    this.$message({
                        message: this.reg.checkPhone(this.ruleForm.mob),
                        type: 'warning'
                    });
                    return
                }
                this.api.getCode2(this.ruleForm.mob).then(()=>{
                    this.$message({
                        message: '验证码发送成功',
                        type: 'success'
                    });
                })
                this.time = 60
                let timer = setInterval(()=>{
                    if(this.time){
                        this.time--
                    }else {
                        clearInterval(timer)
                    }
                },1000)
            },
            //页面跳转
            toPage(url){
                this.until.href(url)
            }
        }
    }
</script>
<style lang="less">
    #register2{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        input{
            width: 398px;
            height: 52px;
            border-radius: 0;
        }
    }
</style>
<style lang="less" scoped>
    @import url("../../../assets/css/init.less");
    #register2{
        .demo-ruleForm{

            // margin: 0 auto;
        }
        span{
            cursor: pointer;
        }
    }
    #home{
        background-color: #FFFFFF;
        .home{
            width: 100%;
            background-image: url("../../../assets/img/footer.png");
            background-position: bottom center;
            background-repeat: no-repeat;
            padding-bottom: 100px;
            background-size: 100%;
        }
        .header1{
            box-shadow: 0px 6px 10px 0px rgba(13, 4, 8, 0.1);
            width: 100%;
            display: flex;
            .content{
                display: inline-flex;
                align-items: center;
                justify-content: space-between;
                height: 100px;
                margin: auto;
                img{
                    cursor: pointer;
                    width: 450px;
                }
                >p{
                    font-size: 16px;
                    cursor: pointer;
                    color: #333333;
                }
                .textRed{
                    color: #FF3E3E;
                }
            }
        }
    }
    .header{
        display: inline-flex;
        height: 120px;
        align-items: center;
        justify-content: center;
        width: 100%;
        >p{
            font-size: 24px;
            color: #333333;
            margin: 0 30px;
            /*font-weight: bold;*/
        }
        img{
            width: 148px;
        }
    }
    .body{
        border: 1px solid #DFDFDF;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .button1{
            height: 52px;
            width: 127px;
            background-color: @themeColor;
            border: none;
            color: #FFFFFF;
            position: absolute;
            left: 271px;
        }
        .button2{
            width: 398px;
            height: 52px;
            border-radius: 0;
            background-color: @themeColor;
            font-size: 16px;
            color: #FFFFFF;
            margin-top: 40px;
        }
        .title{
            width: 100%;
            height: 100px;
            display: inline-flex;
            margin-bottom: 16px;
            p{
                font-size: 20px;
                color: #333333;
                /*font-weight: bold;*/
                display: flex;
                align-items: center;
                .lineC{
                    width: 4px;
                    height: 17px;
                    background-color: #E4393C;
                    display: block;
                    margin-right: 14px;
                }
            }
        }
    }
    .footerImg{
        width: 100%;
        margin-top: 53px;
    }
</style>
