<template>
  <div class="leftMenu">
    <el-menu
      default-active="0"
      unique-opened
      class="el-menu-vertical-demo"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose"
      background-color="#2778BE"
      text-color="#F8F8F8"
      active-text-color="#fff"
    >
	<el-menu-item index="0" :class="currentIndex=='0'?'activeTwo':''">
	  <img src="../assets/img/总览-未选.png" style="width: 18px; height: 18px; margin-left: 5px;" v-if="currentIndex!='0'">
	  <img src="../assets/img/总览-选中.png" style="width: 18px; height: 18px; margin-left: 5px;" v-if="currentIndex=='0'">
	  <span slot="title" >总览</span>
	</el-menu-item>
      <el-submenu index="1"   >
        <template slot="title">
          <img src="../assets/img/招标-未选.png" style="width: 18px; height: 18px; margin-left: 5px;" v-if="currentIndex!='1'&&currentIndex!='1-1'&&currentIndex!='1-2'&&currentIndex!='1-3'&&currentIndex!='1-4'">
          <img src="../assets/img/招标-选中.png" style="width: 18px; height: 18px; margin-left: 5px;" v-if="currentIndex=='1'||currentIndex=='1-1'||currentIndex=='1-2'||currentIndex=='1-3'||currentIndex=='1-4'">
          <span style="opacity: 0.5;" :class="currentIndex=='1'||currentIndex=='1-1'||currentIndex=='1-2'||currentIndex=='1-3'||currentIndex=='1-4'?'activeThree':''">招标</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" :class="currentIndex=='1-1'?'active':''">项目立项</el-menu-item>
          <el-menu-item index="1-2"  :class="currentIndex=='1-2'?'active':''">项目审批</el-menu-item>
		  <el-menu-item index="1-3"  :class="currentIndex=='1-3'?'active':''">公告变更/澄清</el-menu-item>
		  <el-menu-item index="1-4"  :class="currentIndex=='1-4'?'active':''">全部项目</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">在线评标</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
		zhaobiao:[],
		currentIndex:0,
		currentIndexTwo:-1,
		
		
		
	};
  },
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
		this.currentIndex=key
		console.log('1233',this.currentIndex);
		console.log(1111,key,keyPath);
		if(key==2){
			this.until.href('/views/index/onlineBidEvaluate.html')
		}
		if(key=='1-1'){
			this.until.href('/views/index/zhaobiao.html?key='+key)
		}
    },
    handleOpen(key, keyPath) {
		this.currentIndex=key
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  computed: {},
};
</script>

<style lang="less" scoped>
.leftMenu {
  width: 200px;
    height: calc(~"100vh - 298px");
  background-color: #2778be;
	 .el-menu-item{
		 font-size: 14px;
		 font-weight: 400;
		 color: #FFFFFF;
		 opacity: 0.5;
		 img{
			 width: 18px;
			 height: 18px;
		 }
	 }
	 .active{
		opacity: 1!important;
		color: white !important;
		background-color: rgb(31,96,152) !important;
	 }
	 .active::before{
		 content: '';
		 width: 3px;
		 height: 14px;
		 background: #F4F4F4;
		  position: absolute;
		  top: 50%;
		  left: 30px;
		  transform: translateY(-50%);
	 }
	 .activeTwo{
		 opacity: 1!important;
		 color: white !important;
		 background-color: rgb(31,96,152) !important;
	 }
	 .activeThree{
		 opacity: 1!important;
		 color: white !important;
	 }
	 .el-menu-item:hover{
		 font-size: 14px;
		 font-weight: 400;
		 color: #FFFFFF;
		 opacity: 1;
	 }
	
  
 
}
</style>
