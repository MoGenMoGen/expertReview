<template>
    <!--登录页面-->
    <div id="container" :style="{width:bWidth + 'px'}">
        <!--首部标题-->
        <div class="header" :style="{width:width + 'px'}">
            <div class="title">
                <img :src="logo" alt="" @click="toPage('./index.html')"/>
                <p>招投标系统</p>
            </div>
        </div>
        <div class="body">
            <div id="register">
                <!--上部标题-->
                <div class="title1">
					<p @click="selectType(index)" v-for="(item,index) in loginType" :key="index" :class="{'active':selectIndex==index}">{{item}}</p>
                </div>
                <!--下部表单-->
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" >
                    <el-form-item  prop="username" @keyup.enter="submitForm('ruleForm')">
                        <el-input class="input1" placeholder="请输入手机号码或用户名" v-model="ruleForm.username" type="text" prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" @keyup.enter="submitForm('ruleForm')">
                        <el-input class="input1" placeholder="请输入密码" maxlength="24" v-model="ruleForm.password" type="password" prefix-icon="el-icon-lock"></el-input>
                        <p class="blue" @click="toPage('./changePWD.html')">忘记密码</p>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="button1" type="primary" @click="submitForm('ruleForm')" @keyup.enter="submitForm('ruleForm')">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import myFooter from '@/components/footer'
    export default {
        data(){

            return{
                bWidth:0,
                width:0,
                logo:'https://sinovat.oss-cn-shanghai.aliyuncs.com/9cc91287abfa4ab7a6c5b917123a4e12_96f8a1087df345a99de5708bc15ae537_logo.png',
                ruleForm:{
                    username:'',
                    password:'',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名或手机号', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                },
				loginType: ['管理登录','专家登录'],
				selectIndex: 0
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
            this.enterKeyup();
        },
        destroyed() {
            // 销毁enter事件
            this.enterKeyupDestroyed();
        },
        methods:{
			selectType(index) {
				this.selectIndex = index
			},
            getWidth(){
                let {bWidth,width} = this.until.getWidth()
                this.bWidth = bWidth
                this.width = width
            },
            //提交
            submitForm(formName) {
				if(this.selectIndex==0) {
					this.toPage('./index.html')
				} else if (this.selectIndex==1) {
					this.$refs[formName].validate((valid) => {
					    if (valid) {
					        this.api.login(this.ruleForm).then(res=>{
					            this.until.seSave('token',res.token)
					            this.until.seSave('userInfo',JSON.stringify(res.userInfo))
					            this.$message({
					                message: '登录成功',
					                type: 'success',
					                duration:'1500'
					            });
					            setTimeout(()=>{
					                this.toPage('./index.html')
					            },1500)
					        })
					    } else {
					        return false;
					    }
					});
				}
            },
            //页面跳转
            toPage(url){
                this.until.href(url)
            },
            enterKey(event) {
                const code = event.keyCode
                    ? event.keyCode
                    : event.which
                        ? event.which
                        : event.charCode;
                if (code == 13) {
                    this.submitForm('ruleForm');
                }
            },
            enterKeyupDestroyed() {
                document.removeEventListener("keyup", this.enterKey);
            },
            enterKeyup() {
                document.addEventListener("keyup", this.enterKey);
            },
        }
    }
</script>
<style lang="less" scoped>
    #register{
        .el-input__inner{
            border: none;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            border-radius: 0;
            background-color: #FFFFFF;
        }
    }
</style>
<style lang="less" scoped>
    @import url("../../../assets/css/init.less");
    #register{
        width: 307px;
        height: 352px;
        background-color: #FFFFFF;
        margin-left: 65%;
        position: relative;
        .demo-ruleForm{
            width: 246px;
            margin: 0 auto;
        }
        span{
            cursor: pointer;
        }
        .blue{
            color: @themeColor;
            font-size: 14px;
            position: absolute;
            bottom: 1px;
            right: 7px;
            cursor: pointer;
        }
        .button1{
            background-color: @themeColor;
            width: 100%;
            border-radius: 3px;
            margin-top: 14%;
        }
    }
    #container{
        background-color: #FFFFFF;
        .header{
            display: flex;
            display: -webkit-flex;
            height: 101px;
            justify-content: center;
            margin: 0 auto;
            .title{
                width: 100%;
                display: inline-flex;
                align-items: center;
                img{
                    cursor: pointer;
                    width: 450px;
                }
                >p{
                    color: #404040;
                    font-size: 30px;
                    font-weight: normal;
                    line-height: 101px;
                    padding-left: 25px;
                }
            }
        }
        .body{
            height: 550px;
            display: flex;
            background-image: url("../../../assets/img/登录bg.png");
            background-size: cover;
            background-repeat: no-repeat no-repeat;
            background-position: center;
            width: 100%;
            align-items: center;
            .title1{
                display: inline-flex;
                height: 80px;
                align-items: center;
                width: 100%;
                padding: 0 30px;
				font-size: 18px;
				color: #909090;
				font-weight: normal;
				p {
					cursor: pointer;
					margin-right: 30px;
					padding: 10px 5px;
				}
				p:last-child{
					margin-right: 0;
				}
                .active {
					color: #333;
					border-bottom: 2px solid #2778BE;
				}
            }
        }
    }
</style>
