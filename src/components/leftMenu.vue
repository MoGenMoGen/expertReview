<template>
	<div class="leftMenu">
		<el-menu :default-active="tabIndex" unique-opened class="el-menu-vertical-demo" @select="handleSelect"
			@open="handleOpen" @close="handleClose" background-color="#2778BE" text-color="#F8F8F8"
			active-text-color="#fff">
			<el-menu-item index="0" :class="currentIndex == '0' ? 'activeTwo' : ''" v-if="auth1">
				<img src="../assets/img/总览-未选.png" style="width: 18px; height: 18px; margin-left: 5px"
					v-if="currentIndex != '0'" />
				<img src="../assets/img/总览-选中.png" style="width: 18px; height: 18px; margin-left: 5px"
					v-if="currentIndex == '0'" />
				<span slot="title">总览</span>
			</el-menu-item>
			<el-submenu index="1" v-if="auth2" >
				<template slot="title">
					<img src="../assets/img/招标-未选.png" style="width: 18px; height: 18px; margin-left: 5px" v-if="
              currentIndex != '1' &&
              currentIndex != '1-1' &&
              currentIndex != '1-2' &&
              currentIndex != '1-3' &&
              currentIndex != '1-4'
            " />
					<img src="../assets/img/招标-选中.png" style="width: 18px; height: 18px; margin-left: 5px" v-if="
              currentIndex == '1' ||
              currentIndex == '1-1' ||
              currentIndex == '1-2' ||
              currentIndex == '1-3' ||
              currentIndex == '1-4'
            " />
					<span style="opacity: 0.5" :class="
              currentIndex == '1' ||
              currentIndex == '1-1' ||
              currentIndex == '1-2' ||
              currentIndex == '1-3' ||
              currentIndex == '1-4'
                ? 'activeThree'
                : ''
            ">招标</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="1-1" :class="currentIndex == '1-1' ? 'active' : ''">项目立项</el-menu-item>
				</el-menu-item-group>
			</el-submenu>

			<el-submenu index="2" v-if="auth3">
				<template slot="title">
					<img src="../assets/img/投标-未选.png" style="width: 18px; height: 18px; margin-left: 5px" v-if="
              currentIndex != '2' &&
              currentIndex != '2-1' &&
              currentIndex != '2-2' 
            " />
					<img src="../assets/img/投标-选中.png" style="width: 18px; height: 18px; margin-left: 5px" v-if="
              currentIndex == '2' ||
              currentIndex == '2-1' ||
              currentIndex == '2-2' 
            " />
					<span style="opacity: 0.5" :class="
              currentIndex == '2' ||
              currentIndex == '2-1' ||
              currentIndex == '2-2' 
                ? 'activeThree'
                : ''
            ">投标</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="2-1" :class="currentIndex == '2-1' ? 'active' : ''" v-if="auth4">报名审核</el-menu-item>
					<el-menu-item index="2-2" :class="currentIndex == '2-2' ? 'active' : ''" v-if="auth5">投标项目</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="3" v-if="auth6">
				<template slot="title">
					<img src="../assets/img/开标-未选.png" style="width: 18px; height: 18px; margin-left: 5px" v-if="
              currentIndex != '3' &&
              currentIndex != '3-1' &&
              currentIndex != '3-2' &&
              currentIndex != '3-3' &&
              currentIndex != '3-4'
            " />
					<img src="../assets/img/开标-选中.png" style="width: 18px; height: 18px; margin-left: 5px" v-if="
              currentIndex == '3' ||
              currentIndex == '3-1' ||
              currentIndex == '3-2' ||
              currentIndex == '3-3' ||
              currentIndex == '3-4'
            " />
					<span style="opacity: 0.5" :class="
              currentIndex == '3' ||
              currentIndex == '3-1' ||
              currentIndex == '3-2' ||
              currentIndex == '3-3' ||
              currentIndex == '3-4'
                ? 'activeThree'
                : ''
            ">开标</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="3-1" :class="currentIndex == '3-1' ? 'active' : ''" v-if="auth10">专家选取规则
					</el-menu-item>
					<el-menu-item index="3-2" :class="currentIndex == '3-2' ? 'active' : ''"  v-if="auth8">专家库
					</el-menu-item>
					<el-menu-item index="3-3" :class="currentIndex == '3-3' ? 'active' : ''" v-if="auth9">项目评定标准
					</el-menu-item>
					<el-menu-item index="3-4" :class="currentIndex == '3-4' ? 'active' : ''" v-if="auth7">
						在线开标</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-menu-item index="4" :class="currentIndex == '4' ? 'activeTwo' : ''" v-if="auth11">
				<img src="../assets/img/在线评标-未选.png" style="width: 18px; height: 18px; margin-left: 5px"
					v-if="currentIndex != '4'" />
				<img src="../assets/img/在线评标-选中.png" style="width: 18px; height: 18px; margin-left: 5px"
					v-if="currentIndex == '4'" />
				<span slot="title">在线评标</span>
			</el-menu-item>
			<el-submenu index="5" v-if="auth12">
				<template slot="title">
					<img src="../assets/img/定标-未选.png" style="width: 18px; height: 18px; margin-left: 5px" v-if="
	          currentIndex != '5' &&
	          currentIndex != '5-1' &&
	          currentIndex != '5-2' 
	        " />
					<img src="../assets/img/定标-选中.png" style="width: 18px; height: 18px; margin-left: 5px" v-if="
	          currentIndex == '5' ||
	          currentIndex == '5-1' ||
	          currentIndex == '5-2' 
	        " />
					<span style="opacity: 0.5" :class="
	          currentIndex == '5' ||
	          currentIndex == '5-1' ||
	          currentIndex == '5-2' 
	            ? 'activeThree'
	            : ''
	        ">定标</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="5-1" :class="currentIndex == '5-1' ? 'active' : ''" v-if="auth13">定标项目</el-menu-item>
					<el-menu-item index="5-2" :class="currentIndex == '5-2' ? 'active' : ''" v-if="auth14">中标公示</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="6" v-if="auth15">
				<template slot="title">
					<img src="../assets/img/标后-未选.png" style="width: 18px; height: 18px; margin-left: 5px" v-if="
          currentIndex != '6' &&
          currentIndex != '6-1' &&
          currentIndex != '6-2' 
        " />
					<img src="../assets/img/标后-选中.png" style="width: 18px; height: 18px; margin-left: 5px" v-if="
          currentIndex == '6' ||
          currentIndex == '6-1' ||
          currentIndex == '6-2' 
        " />
					<span style="opacity: 0.5" :class="
          currentIndex == '6' ||
          currentIndex == '6-1' ||
          currentIndex == '6-2' 
            ? 'activeThree'
            : ''
        ">标后</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="6-1" :class="currentIndex == '6-1' ? 'active' : ''" v-if="auth16">保证金退还</el-menu-item>
					<el-menu-item index="6-2" :class="currentIndex == '6-2' ? 'active' : ''" v-if="auth17">已归档项目</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
export default {
  data() {
    return {
		auth1:'',//总览
		auth2:'',//招标
		auth3:'',//投标
		auth4:'',//投标-报名审核
		auth5:'',//投标-投标项目
		auth6:'',//开标
		auth7:'',//开标-在线开标
		auth8:'',//开标-专家库
		auth9:'',//开标-项目评定标准
		auth10:'',//开标-专家选取规则
		auth11:'',//在线评标
		auth12:'',//定标
		auth13:'',//定标-定标项目
		auth14:'',//定标-中标公示
		auth15:'',//标后
		auth16:'',//标后-保证金退还
		auth17:'',//标后-招标文件归档
      zhaobiao: [],
      currentIndex: "0",
    };
  },
  props: {
    tabIndex: {
      type: String,
      default: "0",
    },
  },
  mounted() {
	this.auth1= JSON.parse(this.until.seGet('authZ').indexOf('ship:Overview:Overview')>-1)
	this.auth2= JSON.parse(this.until.seGet('authZ').indexOf('ship:bidding:bidding')>-1)
	this.auth3= JSON.parse(this.until.seGet('authZ').indexOf('shi:bid:bid')>-1)
	this.auth4= JSON.parse(this.until.seGet('authZ').indexOf('ship:registrationReview:registrationReview')>-1)
    this.auth5= JSON.parse(this.until.seGet('authZ').indexOf('ship:biddingProject:biddingProject')>-1)
	this.auth6= JSON.parse(this.until.seGet('authZ').indexOf('ship:bidOpening:bidOpening')>-1)
	this.auth7= JSON.parse(this.until.seGet('authZ').indexOf('ship:onlineBidOpening:onlineBidOpening')>-1)
	this.auth8= JSON.parse(this.until.seGet('authZ').indexOf('ship:expertDatabase:expertDatabase')>-1)
	this.auth9= JSON.parse(this.until.seGet('authZ').indexOf('ship:ProjectEvaluationCriteria:ProjectEvaluationCriteria')>-1)
	this.auth10= JSON.parse(this.until.seGet('authZ').indexOf('ship:expertSelectionRules:expertSelectionRules')>-1)
	this.auth11= JSON.parse(this.until.seGet('authZ').indexOf('ship:onlineBidEvaluation:onlineBidEvaluation')>-1)
	this.auth12= JSON.parse(this.until.seGet('authZ').indexOf('ship:calibration:Calibration')>-1)
	this.auth13= JSON.parse(this.until.seGet('authZ').indexOf('ship:calibrationItems:calibrationItems')>-1)
	this.auth14= JSON.parse(this.until.seGet('authZ').indexOf('ship:bidWinningPublicity:bidWinningPublicity')>-1)
	this.auth15= JSON.parse(this.until.seGet('authZ').indexOf('ship:postBid:postBid')>-1)
	this.auth16= JSON.parse(this.until.seGet('authZ').indexOf('ship:refundOfDeposit:refundOfDeposit')>-1)
	this.auth17= JSON.parse(this.until.seGet('authZ').indexOf('ship:filingOfBiddingDocuments:filingOfBiddingDocuments')>-1)
	this.currentIndex = this.tabIndex;
  },
  methods: {
    handleSelect(key, keyPath) {
      this.currentIndex = key;
      // console.log("1233", this.currentIndex);
      console.log(1111, key, keyPath);
	  if (key == '0') {
		this.until.href('./index.html')
	  }
      if (key == "1-1") {
        this.until.href("/views/index/zhaobiao.html");
      }
      if (key == "1-2") {
        this.until.href("/views/index/shenpi.html");
      }
	  if (key == "2-1") {
	    this.until.href("/views/index/baomingshenhe.html");
	  }
	  if (key == "2-2") {
	    this.until.href("/views/index/toubiaoxiangmu.html");
	  }
      if (key == "3-1") {
        this.until.href("/views/index/openSelectRule.html");
      }
      if (key == "3-2") {
        this.until.href("/views/index/openExpertDatabase.html");
      }
      if (key == "3-3") {
        this.until.href("/views/index/openEvaluationStandard.html");
      }
      if (key == "3-4") {
        this.until.href("/views/index/openOnlineBid.html");
      }
	  if (key == '4') {
	  	this.until.href("/views/index/onlineBidEvaluate.html");
	  }
	  if (key == '5-1') {
	  	this.until.href("/views/index/dingbiao.html");
	  }
	  if (key == '5-2') {
	  	this.until.href("/views/index/zhongbiaogongshi.html");
	  }
	  if(key=="6-1"){
		this.until.href("/views/index/biaohou.html");
	  }
	  if(key=='6-2'){
		  this.until.href("/views/index/biaohouguidang.html");
	  }
    },
    handleOpen(key, keyPath) {
      this.currentIndex = key;
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
		// height: calc(~"100vh - 298px");
		height: 800px;
		background-color: #2778be;

		.el-menu {
			width: 200px;
		}

		.el-menu-item {
			font-size: 14px;
			font-weight: 400;
			color: #ffffff;
			opacity: 0.5;

			img {
				width: 18px;
				height: 18px;
			}
		}

		.active {
			opacity: 1 !important;
			color: white !important;
			background-color: rgb(31, 96, 152) !important;
		}

		.active::before {
			content: "";
			width: 3px;
			height: 14px;
			background: #f4f4f4;
			position: absolute;
			top: 50%;
			left: 30px;
			transform: translateY(-50%);
		}

		.activeTwo {
			opacity: 1 !important;
			color: white !important;
			background-color: rgb(31, 96, 152) !important;
		}

		.activeThree {
			opacity: 1 !important;
			color: white !important;
		}

		.el-menu-item:hover {
			font-size: 14px;
			font-weight: 400;
			color: #ffffff;
			opacity: 1;
		}
	}
</style>
