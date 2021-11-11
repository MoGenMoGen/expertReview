<template>
	<div id="home" :style="{width:bWidth + 'px'}" v-loading="loading">
		<div class="mask" @click="closeMask" v-if="newShow==true||showModify==true">
			<div class="table_box" @click.stop="">
				<div class="top">
					<p style="font-size: 20px">新增项目</p>
					<img @click="closeMask" src="~assets/img/close.png"
						style="width: 25px; height: 25px;cursor: pointer;" alt="" />
				</div>
				<div class="row2">
					<div class="title">
						<span style="color: red; margin-right: 5px; display: inline-block">* </span><span>项目工程编号</span>
					</div>
					<div class="right">
						<el-input v-model="cd" class="margin_right" clearable placeholder="项目编号">
						</el-input>
					</div>
				</div>
				<div class="row2">
					<div class="title">
						<span style="color: red; margin-right: 5px; display: inline-block">* </span><span>项目名称</span>
					</div>
					<div class="right">
						<el-input v-model="nm" class="margin_right" clearable placeholder="项目名称">
						</el-input>
					</div>
				</div>
				<div class="row2">
					<div class="title">
						<span style="color: red; margin-right: 5px; display: inline-block">* </span><span>项目评定标准</span>
					</div>
					<div class="right">
						<el-select v-model="svsId" clearable filterable placeholder="项目评定标准" style="margin-left: 12px;"
							@change="select1">
							<el-option v-for="item in options" :key="item.nm" :label="item.nm" :value="item.id">
							</el-option>
						</el-select>
					</div>
				</div>
			<!-- 	<div class="row2">
					<div class="title">
						<span style="color: red; margin-right: 5px; display: inline-block">* </span><span>采购单位</span>
					</div>
					<div class="right">
						<el-select v-model="purchasingUnit" clearable filterable placeholder="采购单位"
							style="margin-left: 12px;" @change="select2">
							<el-option v-for="item in optionsTwo" :key="item.label" :label="item.label"
								:value="item.label">
							</el-option>
						</el-select>
					</div>
				</div> -->
				<div class="row2">
					<div class="title">
						<span style="color: red; margin-right: 5px; display: inline-block">* </span><span>采购方式</span>
					</div>
					<div class="right">
						<el-select v-model="procurementMethodNm" value-key="nm" filterable placeholder="采购方式"
							style="margin-left: 12px;" @change="select3">
							<el-option v-for="item in optionsThree" :key="item.nm" :label="item.nm" :value="item">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="row2">
					<div class="title">
						<span style="color: red; margin-right: 5px; display: inline-block">* </span><span>项目需求类型</span>
					</div>
					<div class="right">
						<el-select v-model="bidTypesNm" value-key="nm" clearable filterable placeholder="项目需求类型"
							style="margin-left: 12px;" @change="select4">
							<el-option v-for="item in optionsFour" :key="item.nm" :label="item.nm" :value="item">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="row2">
					<div class="title">
						<span style="color: red; margin-right: 5px; display: inline-block">* </span><span>发布时间</span>
					</div>
					<div class="right">
						<el-date-picker v-model="publishTm" type="date" placeholder="开始时间" @change="pick1">
						</el-date-picker>
						</el-input>
					</div>
				</div>
				<div class="row2">
					<div class="title">
						<span style="color: red; margin-right: 5px; display: inline-block">* </span><span>报名截止时间</span>
					</div>
					<div class="right">
						<el-date-picker v-model="completeTm" type="date" placeholder="报名截止时间" @change="pick2">
						</el-date-picker>
						</el-input>
					</div>
				</div>
				<div class="row2">
					<div class="title">
						<span style="color: red; margin-right: 5px; display: inline-block">* </span><span>截标时间</span>
					</div>
					<div class="right">
						<el-date-picker v-model="bidEndTm" type="datetime" placeholder="截标时间">
						</el-date-picker>
						</el-input>
					</div>
				</div>
				<div class="row2">
					<div class="title">
						<span style="color: red; margin-right: 5px; display: inline-block">* </span><span>开标时间</span>
					</div>
					<div class="right">
						<el-date-picker v-model="bidOpenTm" type="datetime" placeholder="开标时间">
						</el-date-picker>
						</el-input>
					</div>
				</div>
				<div class="row2">
					<div class="title">
						<span style="color: red; margin-right: 5px; display: inline-block">* </span>
						<span>发布人</span>
					</div>
					<div class="right">
						<el-input v-model="publisher" class="margin_right" clearable placeholder="发布人">
						</el-input>
					</div>
				</div>
				<div class="row2">
					<div class="title">
						<span style="color: red; margin-right: 5px; display: inline-block">* </span>
						<span>联系人</span>
					</div>
					<div class="right">
						<el-input v-model="linkman" class="margin_right" clearable placeholder="联系人">
						</el-input>
					</div>
				</div>
				<div class="row2">
					<div class="title">
						<span style="color: red; margin-right: 5px; display: inline-block">* </span>
						<span>联系电话</span>
					</div>
					<div class="right">
						<el-input v-model="mob" class="margin_right" clearable placeholder="联系电话">
						</el-input>
					</div>
				</div>
				<div class="row2">
					<div class="title">
						<span style="color: red; margin-right: 5px; display: inline-block">* </span>
						<span>预算金额（万元）</span>
					</div>
					<div class="right">
						<el-input v-model="budget"  class="margin_right" clearable placeholder="预算金额(万元)">
						</el-input>
					</div>
				</div>
				<div class="row2">
					<div class="title">
						<span style="color: red; margin-right: 5px; display: inline-block">* </span>
						<span>是否需缴纳保证金</span>
					</div>
					<div class="right">
						<el-radio-group v-model="needDeposit" style="margin-left: 12px;" @change="radio1">
							<el-radio :label="0">不需要</el-radio>
							<el-radio :label="1">需要</el-radio>
						</el-radio-group>
					</div>
				</div>
				<div class="row2">
					<div class="title">
						<span style="color: red; margin-right: 5px; display: inline-block">* </span>
						<span>发布状态</span>
					</div>
					<div class="right">
						<el-radio-group v-model="status" style="margin-left: 12px;">
							<el-radio :label="0">未发布</el-radio>
							<el-radio :label="1">已发布</el-radio>
						</el-radio-group>
					</div>
				</div>
				<div class="row2">
					<div class="title">
						<span style="color: red; margin-right: 5px; display: inline-block">* </span>
						<span>专家评定开关</span>
					</div>
					<div class="right">
						<el-radio-group v-model="svsOn" style="margin-left: 12px;">
							<el-radio :label="0">关闭</el-radio>
							<el-radio :label="1">开启</el-radio>
						</el-radio-group>
					</div>
				</div>
				<div class="row2" style="margin-top: -20px;">
					<div class="title">
						<span>招标文件</span>
					</div>
					<div class="right" style="padding-top: 30px;">
						<el-form :model="form" style="margin-left: 12px; display: flex; align-items: center;">
							<el-form-item>
								<el-upload ref="uploadExcel" action="/general/oss/upload" :auto-upload="true"
									:on-change="fileChange" :on-success="handleSuccess" :on-remove="handleRemove"
									:on-error="handleError" :file-list="fileInfo" :on-preview="HandFilePreView">
									<el-button size="small" plain style="width: 100px;height: 30px;">选择文件</el-button>
								</el-upload>
							</el-form-item>
						</el-form>
					</div>
				</div>
				<div class="row2">
					<div class="title">
						<span style="color: red; margin-right: 5px; display: inline-block">* </span><span>招标范围</span>
					</div>
					<div class="right">
						<el-select v-model="viewRangeNm" clearable  value-key="nm" filterable placeholder="招标范围(机构类型)"
							style="margin-left: 12px;" @change="select8">
							<el-option v-for="item in optionsFive" :key="item.nm" :label="item.nm" :value="item">
							</el-option>
						</el-select>
						<span style="color: red;">允许指定类型的所有机构参与报名投标</span>
					</div>
				</div>
				<div class="row2">
					<div class="title">
						<!-- <span style="color: red; margin-right: 5px; display: inline-block">
						</span> -->
						<span>招标范围(可多选)</span>
					</div>
					<div class="right">
						<el-select v-model="orgEnterIdsList" multiple filterable placeholder="招标范围(机构)"
							style="margin-left: 12px;" @change="select5">
							<el-option v-for="item in optionsSix" :key="item.id" :label="item.company" :value="item.id">
							</el-option>
						</el-select>
						<span style="color: red;">允许指定的机构参与报名投标(可多选)</span>
					</div>
				</div>
				<div class="row2">
					<div class="title">
						<span style="color: red; margin-right: 5px; display: inline-block">* </span><span>专家选取规则</span>
					</div>
					<div class="right">
						<el-select v-model="ruleId" placeholder="专家选取规则模板" clearable filterable
							style="margin-left: 12px;" @change="select6">
							<el-option v-for="item in optionsSeven" :key="item.nm" :label="item.nm" :value="item.id">
							</el-option>
						</el-select>
					</div>
					<el-button type="primary" style="margin-left: 12px;" @click='chooseExpert'>选取专家</el-button>
				</div>
				<div class="row2">
					<div class="title">
						<span style="color: red; margin-right: 5px; display: inline-block">*
						</span><span>已选专家（可多选）</span>
					</div>
					<div class="right">
						<el-select v-model="expertIdsList" multiple filterable placeholder="已选专家"
							style="margin-left: 12px;" @change="select7">
							<el-option v-for="item in optionsEight" :key="item.id" :label="item.realNm"
								:value="item.id">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="row2">
					<div class="title">
						<span>备注</span>
					</div>
					<div class="right">
						<el-input v-model="rmks" class="margin_right" clearable placeholder="备注">
						</el-input>
					</div>
				</div>
				<div class="btn">
					<el-button style="
		          background: #2778be;
		          color: #fff;
		          margin-right: 20px;
		          padding: 10px 25px;
		          border-radius: 4px;
		        " @click="confirmTo" type="text" size="small" >确定</el-button>
				
					<el-button style="
		          background: #fff;
		          color: #333;
		          border: 1px solid #dddddd;
		          padding: 10px 25px;
		          border-radius: 4px;
		        " @click="closeMask" type="text" size="small">取消</el-button>
				</div>
			</div>
		</div>

		<my-header :width="width" :bWidth="bWidth"></my-header>
		<div class="container" :style="{width:bWidth + 'px'}">
			<leftMenu tabIndex='1-1'></leftMenu>
			<div class="right">
				<topNav :activeName='activeName' :list="thisNavList"></topNav>
				<div class="content" v-if="showDetail==false">
					<div class="topSeachBox">
						<el-input placeholder="项目编号" v-model="searchInput1" clearable>
						</el-input>
						<el-input placeholder="项目名称" v-model="searchInput2" clearable>
						</el-input>
						<el-input placeholder="联系人" v-model="searchInput3" clearable>
						</el-input>
						<el-select v-model="search1" clearable placeholder="采购方式" @change="searchSelectOne">
							<el-option v-for="item in searchListOne" :key="item.cd" :label="item.nm" :value="item.cd">
							</el-option>
						</el-select>
						<el-date-picker v-model="searchDate" type="datetime" placeholder="创建时间">
						</el-date-picker>
						<el-select v-model="search2" clearable placeholder="项目状态" @change="searchSelectTwo">
							<el-option v-for="item in searchListTwo" :key="item.nm" :label="item.nm" :value="item.id">
							</el-option>
						</el-select>
						<el-button plain @click='toSearch' v-if="auth1">查询</el-button>
						<el-button type="primary" style="background-color:  #2778BE;" @click='addNew' v-if="auth2">新增</el-button>
					</div>
					<div class="bodyTable">
						<el-table :data="tableData" style="width: 100%" :cell-style="{
							    'text-align': 'center',
							    color: '#333',
							    'font-weight': '500',
							  }" :header-cell-style="{
							    color: '#606060',
							    background: '#f8f8f8',
							    'text-align': 'center',
							  }">
							<el-table-column type="index" label="序号" min-width="40">
							</el-table-column>
							<el-table-column prop="cd" label="项目编号" min-width="130">
							</el-table-column>
							<el-table-column prop="nm" label="项目名称" min-width="130">
							</el-table-column>
							<el-table-column prop="linkman" label="联系人" min-width="80">
							</el-table-column>
							<el-table-column prop="procurementMethodNm" label="采购方式" min-width="80">
							</el-table-column>
							<el-table-column prop="budget" label="预算金额(万元)" min-width="80">
							</el-table-column>
							<!-- <el-table-column prop="crtTm" label="创建时间" min-width="150">
							</el-table-column> -->
							<el-table-column prop="publishTm" label="发布日期" min-width="100"></el-table-column>
							<el-table-column prop="completeTm" label="报名截止日期" min-width="100"></el-table-column>
							<el-table-column prop="bidEndTm" label="截标时间" min-width="100"></el-table-column>
							<el-table-column prop="bidOpenTm" label="开标时间" min-width="100"></el-table-column>
							<el-table-column label="保证金" min-width="150">
								<template slot-scope="scope">
									<p v-if="scope.row.needDeposit==1">需要缴纳</p>
									<p v-if="scope.row.needDeposit==0">不需缴纳</p>
								</template>
							</el-table-column>
							<el-table-column prop="audit" label="状态" min-width="100">
								<template slot-scope="scope">
									<span v-if="scope.row.audit==1" style="color: #E4393C;">
										等待审核
									</span>
									<span v-if="scope.row.audit==2" style="color: #2778BE;">
										审核通过
									</span>
									<span v-if="scope.row.audit==3" style="color: #E4393C;">
										审核驳回
									</span>

								</template>
							</el-table-column>
							<el-table-column label="操作" min-width="50">
								<template slot-scope="scope">
									<el-button @click="tolook(scope.row)" type="text" size="small" v-if="auth5">查看</el-button>
									<br>
									<el-button type="text" size="small" style="color: #E4393C;"
										@click='toModify(scope.row)' v-if="auth4">修改</el-button>
									<br>
									<el-button type="text" size="small" style="color: #909090;"
										@click='toDelite(scope.row)' v-if="auth3">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div class="Footer">
						<el-pagination background @current-change="handleCurrentChange" :current-page.sync="currentPage"
							:page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
						</el-pagination>
					</div>
				</div>
				<div class="navBar" v-if="showDetail==true">
					<el-tabs v-model="activeNameTwo" @tab-click="changeNav">
						<el-tab-pane label="项目详情" name="first">
							<detail :detailId='detailId'></detail>
						</el-tab-pane>
						<el-tab-pane label="招标变更/澄清" name="second">
							<change :detailId='detailId' :detailName='detailName'></change>
						</el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</div>
		<my-footer></my-footer>
	</div>
</template>

<script>
	import myFooter from '@/components/footer';
	import myHeader from '@/components/myHeader';
	import leftMenu from '@/components/leftMenu';
	import detail from '@/components/zhaobiao/detail';
	import change from '@/components/zhaobiao/change';
	import topNav from '@/components/topNav';
	export default {
		data() {
			return {
				auth1:'',//查询权限
				auth2:'',//新增权限
				auth3:'',//删除权限
				auth4:'',//修改权限
				auth5:'',//查看权限
				auth6:'',//审核权限
				searchInput1: '',
				searchInput2: '',
				searchInput3: '',
				searchListOne: [],
				search1: '',
				search1cd: '',
				searchListTwo: [{
						nm: '等待审核',
						id: 1,
					},
					{
						nm: '审核通过',
						id: 2,
					},
					{
						nm: '审核驳回',
						id: 3,
					}
				],
				search2: '',
				searchDate: '',
				detailId: '',
				detailName: '',
				list: [],
				currentPage: 1,
				pageNum: 1,
				formTwo: {

				},
				audit: '', //项目状态
				purchasingUnit: '', //采购单位
				cd: '', //项目工程编号
				nm: '', //项目名称
				svs: '', //项目评定标准name
				svsId: '', //项目评定标准id
				budget: '', //预算金额
				procurementMethodNm: [], //采购方式name
				procurementMethodCd: [], //采购方式id
				bidTypesNm: '', //项目需求类型
				bidTypesCd: '', //项目需求id
				publishTm: '', //发布时间
				completeTm: '', //完成时间
				bidOpenTm: '', //开标时间
				bidEndTm: '', //截标时间
				publisher: '', //发布人
				mob: '', //联系电话
				linkman: '', //联系人
				needDeposit: 0, //是否需缴纳保证金
				status: 0, //发布状态
				svsOn: 0, //专家评定开关
				attachment: '', //附件上传
				viewRangeNm: '', //招标范围name（机构类型）
				viewRangeCd: '', //招标范围id（机构类型）
				orgEnterIdsList: [], //招标范围name（机构）
				orgEnterIds: '', //招标范围id（机构）
				expertIdsList: [], //专家name
				expertIds: '', //专家id
				rule: '', //专家选取规则模板name
				ruleId: '', //专家选取规则模板id
				rmks: '', //备注
				form: {
					file: ''
				},
				modifyId:'',
				fileInfo: [],
				radio: 1,
				activeName: '',
				newShow: false,
				activeNameTwo: 'first',
				thisNavList: [],
				showDetail: false, //是否显示详情页
				showModify: false, //是否显示修改页面
				loading: false,
				bWidth: 0,
				width: 0,
				pageNo: 1,
				pageSize: 4,
				total: 0,
				tabIndex: '',
				value: "",
				value2: "",
				input: "",
				value1: "",
				tableData: [],
				options: [],
				optionsTwo: [],
				optionsThree: [],
				optionsFour: [],
				optionsFive: [],
				optionsSix: [],
				optionsSeven: [],
				optionsEight: [],
			}
		},
		computed: {

		},
		components: {
			myFooter,
			myHeader,
			leftMenu,
			detail,
			change,
			topNav
		},
		mounted() {
			let obj = {
				name: '招标',
				url: './zhaobiao.html',
				canClose: true
			}
			let data = this.until.checkNav(obj, JSON.parse(this.until.seGet('navList')))
			this.activeName = obj.name
			this.thisNavList = data
			this.getWidth()
			window.onresize = () => {
				this.getWidth()
			}
			let query = this.query.new()
			this.query.toO(query, 'seq', 'desc')
			//获取项目评定标准
			this.api.getBidSvsList(this.query.toEncode(query)).then(res => {
				this.options = res.list
			})
			//获取专家选取规则
			let query2 = this.query.new()
			this.query.toO(query2, 'crtTm', 'desc')
			this.query.toP(query2, '1', '20')
			this.api.selectRuleList(this.query.toEncode(query2)).then(res => {
				this.optionsSeven = res.data.list
			})
			//获取专家列表
			let query3 = this.query.new()
			this.query.toW(query3, 'status', '1', 'EQ')
			this.api.getBidExpertPage(this.query.toEncode(query3)).then(res => {
				this.optionsEight = res.list
			})
			//获取项目需求类型
			this.api.getCatListByPcd({
				cd: 'BID_TYPES_CD'
			}).then(res => {
				this.optionsFour = res.list
				console.log('kankan', this.optionsFour);
			})
			//获取招标范围
			this.api.getCatListByPcd({
				cd: 'identity'
			}).then(res => {
				this.optionsFive = res.list
			})
			//获取招标范围（自选）
			let query4 = this.query.new()
			this.query.toW(query4, 'audit', '2', 'EQ')
			this.api.getOrgEnterList(this.query.toEncode(query4)).then(res => {
				this.optionsSix = res.list
			})
			//获取采购方式
			this.api.getCatListByPcd({
				cd: 'PROCUREMENT_METHOD'
			}).then(res => {
				this.searchListOne = res.list
				this.optionsThree = res.list
			})
			//获取权限
			 this.auth1 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:page')>-1)
			 this.auth2 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:add')>-1)
			 this.auth3 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:del')>-1)
			 this.auth4 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:upd')>-1)
			 this.auth5 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:info')>-1)
			 this.auth6 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:examine')>-1)
			 console.log(this.auth1,this.auth2,this.auth3,this.auth4,this.auth5,this.auth6,);
			this.getList()

		},
		methods: {
			//获取招标列表
			getList() {
				let query5 = this.query.new()
				if (this.searchInput1) {
					this.query.toW(query5, 'cd', this.searchInput1, 'Lk')
				}
				if (this.searchInput2) {
					this.query.toW(query5, 'nm', this.searchInput2, 'Lk')
				}
				if (this.searchInput3) {
					this.query.toW(query5, 'linkman', this.searchInput3, 'Lk')
				}
				if (this.search1cd) {
					this.query.toW(query5, 'audit', this.search1cd, 'Lk')
				}
				if (this.searchDate) {
					this.query.toW(query5, 'crtTm', this.searchDate, 'Lk')
				}
				if (this.audit) {
					this.query.toW(query5, 'audit', this.audit, 'Lk')
				}
				this.query.toO(query5, 'crtTm', 'desc')
				this.query.toP(query5, this.pageNo, this.pageSize)
				this.api.getBidPage(this.query.toEncode(query5)).then(res => {
					this.tableData = res.data.list
					this.total = res.page.total
					console.log('111', res);
				})
			},
			getWidth() {
				let {
					bWidth,
					width
				} = this.until.getWidth()
				this.bWidth = bWidth
				this.width = width
			},
			toLogOut() {
				this.api.logout()
			},
			//页面跳转
			toPage(url) {
				this.until.href(url)
			},
			//查看详情
			tolook(row) {
				console.log('21', row);
				this.showDetail = true
				this.detailId = row.id
				this.detailName = row.nm
			},
			//修改
			toModify(row) {
				this.showModify = true
				this.modifyId=row.id
				this.api.getBidInfo(row.id).then(res => {
					this.cd = res.data.cd
					this.budget = res.data.budget
					this.nm = res.data.nm
					this.svsId = res.data.svsId
					this.purchasingUnit = res.data.purchasingUnit
					this.procurementMethodNm = res.data.procurementMethodNm
					this.procurementMethodCd = res.data.procurementMethodCd
					this.bidTypesCd = res.data.bidTypesCd
					this.bidTypesNm = res.data.bidTypesNm
					this.publishTm = res.data.publishTm
					this.completeTm = res.data.completeTm
					this.bidOpenTm = res.data.bidOpenTm
					this.bidEndTm = res.data.bidEndTm
					this.publisher = res.data.publisher
					this.mob = res.data.mob
					this.linkman = res.data.linkman
					this.needDeposit = res.data.needDeposit
					this.status = res.data.status
					this.svsOn = res.data.svsOn
					this.attachment=res.data.attachment
					let modelList = res.data.attachment.split(',')
					this.getInfo(modelList)
					console.log('11',this.list);
					if(this.list[0].fileNm){
						for (let i = 0; i < this.list.length; i++) {
							this.fileInfo.push({
								name: this.list[i].fileNm,
								url: this.list[i].url
							})
						}
					}
				

					this.viewRangeNm = res.data.viewRangeNm
					this.viewRangeCd = res.data.viewRangeCd
					this.orgEnterIds = res.data.orgEnterIds
					this.orgEnterIdsList = res.data.orgEnterIds.split(',').map(Number)
					this.ruleId = res.data.ruleId
					this.expertIds = res.data.expertIds
					this.expertIdsList = res.data.expertIds.split(',').map(Number)
					this.rmks = res.data.rmks
				})
			},
			toDelite(row) {
				this.$confirm("确认删除?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning",
					})
					.then(() => {
						return this.api.getBidDel({
							ids: row.id
						})
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除",
						});
					})
					.then((res) => {
						console.log('11', res);
						if (res.code == 0) {
							this.$message({
								type: "success",
								message: "删除成功!",
							});
							this.getList();
						} else {
							this.$message({
								type: "error",
								message: "删除失败!",
							});
						}
					});


			},
			changeNav(tab, event) {
				console.log(tab, event);
			},
			addNew() {
				this.newShow = true
			},
			closeMask() {
				this.newShow = false
				this.showModify = false
				this.purchasingUnit = '' //采购单位
				this.cd = '' //项目工程编号
				this.nm = '' //项目名称
				this.svs = '' //项目评定标准name
				this.svsId = '' //项目评定标准id
				this.budget = '' //预算金额
				this.procurementMethodNm = [] //采购方式name
				this.procurementMethodCd = [] //采购方式id
				this.bidTypesNm = '' //项目需求类型
				this.bidTypesCd = '' //项目需求id
				this.publishTm = '' //发布时间
				this.completeTm = '' //完成时间
				this.bidOpenTm = '' //开标时间
				this.bidEndTm = '' //截标时间
				this.publisher = '' //发布人
				this.mob = '' //联系电话
				this.linkman = '' //联系人
				this.needDeposit = 0 //是否需缴纳保证金
				this.status = 0 //发布状态
				this.svsOn = 0 //专家评定开关
				this.attachment = '' //附件上传
				this.viewRangeNm = '' //招标范围name（机构类型）
				this.viewRangeCd = '' //招标范围id（机构类型）
				this.orgEnterIdsList = [] //招标范围name（机构）
				this.orgEnterIds = '' //招标范围id（机构）
				this.expertIdsList = [] //专家name
				this.expertIds = '' //专家id
				this.rule = '' //专家选取规则模板name
				this.ruleId = '' //专家选取规则模板id
				this.rmks = '' //备注
				this.list = []
				this.fileInfo = []
			},
			confirmTo() {
				if(!this.cd){
					this.$message({
						type: "error",
						message: "项目编号不能为空",
					});
					return false
				}
				if(!this.nm){
					this.$message({
						type: "error",
						message: "项目名称不能为空",
					});
					return false
				}
				if(!this.svsId){
					this.$message({
						type: "error",
						message: "项目评定标准不能为空",
					});
					return false
				}
				if(!this.procurementMethodCd){
					this.$message({
						type: "error",
						message: "采购方式不能为空",
					});
					return false
				}
				if(!this.bidTypesCd){
					this.$message({
						type: "error",
						message: "项目需求类型不能为空",
					});
					return false
				}
				if(!this.publishTm){
					this.$message({
						type: "error",
						message: "发布时间不能为空",
					});
					return false
				}
				if(!this.completeTm){
					this.$message({
						type: "error",
						message: "完成时间不能为空",
					});
					return false
				}
				if(!this.bidOpenTm){
					this.$message({
						type: "error",
						message: "开标时间不能为空",
					});
					return false
				}
				if(!this.bidEndTm){
					this.$message({
						type: "error",
						message: "截标时间不能为空",
					});
					return false
				}
				if(!this.publisher){
					this.$message({
						type: "error",
						message: "发布人不能为空",
					});
					return false
				}
				if(!this.linkman){
					this.$message({
						type: "error",
						message: "联系人不能为空",
					});
					return false
				}
				if(!this.mob){
					this.$message({
						type: "error",
						message: "联系电话不能为空",
					});
					return false
				}
				if(!this.budget){
					this.$message({
						type: "error",
						message: "预算金额不能为空",
					});
					return false
				}
				if(!this.viewRangeCd){
					this.$message({
						type: "error",
						message: "招标范围（机构类型）不能为空",
					});
					return false
				}
				// if(!this.orgEnterIds){
				// 	this.$message({
				// 		type: "error",
				// 		message: "招标范围（机构）不能为空",
				// 	});
				// 	return false
				// }
				if(!this.ruleId){
					this.$message({
						type: "error",
						message: "专家选取规则不能为空",
					});
					return false
				}
				if(!this.expertIds){
					this.$message({
						type: "error",
						message: "专家不能为空",
					});
					return false
				}
				let obj = {
					cd: this.cd,
					budget: this.budget,
					nm: this.nm,
					svsId: this.svsId,
					procurementMethodNm: this.procurementMethodNm,
					procurementMethodCd: this.procurementMethodCd,
					bidTypesCd: this.bidTypesCd,
					bidTypesNm: this.bidTypesNm,
					publishTm: this.until.formatTime(this.publishTm).substring(0,10),
					completeTm: this.until.formatTime(this.completeTm).substring(0,10),
					bidOpenTm: this.until.formatTime(this.bidOpenTm),
					bidEndTm: this.until.formatTime(this.bidEndTm),
					publisher: this.publisher,
					mob: this.mob,
					linkman: this.linkman,
					needDeposit: this.needDeposit,
					status: this.status,
					svsOn: this.svsOn,
					attachment: this.attachment,
					viewRangeNm: this.viewRangeNm,
					viewRangeCd: this.viewRangeCd,
					orgEnterIdsList: this.orgEnterIdsList,
					orgEnterIds: this.orgEnterIds,
					ruleId: this.ruleId,
					expertIdsList: this.expertIdsList,
					expertIds: this.expertIds,
					rmks: this.rmks,
					id:this.modifyId
				}
				if(this.newShow==true){
					this.api.postBidAdd(obj).then(res => {
							this.closeMask()
							this.getList()
					})
				}
				if(this.showModify==true){
					this.api.postBidUpd(obj).then(res => {
							this.closeMask()
							this.getList()
					})
				}
			
			},
			async getInfo(info) {
				this.list = []
				let data = info
				let data1 = []
				let fileList2 = []
				if (data.length > 0) {
					data.forEach(v => {
						let type = v.split('.')[v.split('.').length - 1]
						let nmList = v.split('.com/') //分割出url后的内容
						let nm = ""
						nmList.forEach((j, z) => { //防止文件名中有 .com/ 所以循环加入
							if (z != 0) {
								nm += j
							}
						})
						nmList = nm.split('_') //分割随机字符后的内容
						nm = ""
						nmList.forEach((j, z) => { //防止文件名中有 _ 所以循环
							if (z != 0) {
								nm += j
							}
						})
						nm = nm.split('.' + type)[0]
						if (type == 'pdf') {
							fileList2.push({
								url: v,
								img: this.pdf,
								'fileNm': nm
							})
						} else if (type == 'doc' || type == 'docx') {
							fileList2.push({
								url: v,
								img: this.word,
								'fileNm': nm
							})
						} else if (type == 'ppt' || type == 'pptx') {
							fileList2.push({
								url: v,
								img: this.ppt,
								'fileNm': nm
							})
						} else if (type == 'xls' || type == 'xlsx') {
							fileList2.push({
								url: v,
								img: this.excel,
								'fileNm': nm
							})
						} else {
							fileList2.push({
								url: v,
								img: v,
								'fileNm': nm
							})
						}

					})
				}
				console.log(fileList2)
				this.list = fileList2
				console.log('151', this.list)

			},
			fileChange(file, fileList) {
				this.formTwo.file = file.raw
			},
			handleSuccess(res, file, fileList) {
				this.attachment = fileList.map((item) => item.response.data)
					.join(",");
			},
			handleRemove(file, fileList) {
				console.log('12131',fileList);
				this.attachment = fileList.map((item) => item.url)
					.join(",");
			},
			handleError(err, file, fileList) {
				this.$notify.error({
					title: '错误',
					message: `文件上传失败`
				});
			},
			HandFilePreView() {

			},
			select1(val) {
				this.svsId = val
			},
			select2(val) {
				this.purchasingUnit = val
			},
			select3(val) {
				this.procurementMethodCd = val.join(',')
			},
			select4(val) {
				this.bidTypesCd = val.cd
				this.bidTypesNm = val.nm
			},
			select5(val) {
				this.orgEnterIds = val.join(',')
			},
			select6(val) {
				this.ruleId = val
			},
			select7(val) {
				this.expertIds = val.join(',')
			},
			select8(val) {
				this.viewRangeCd = val.cd
				this.viewRangeNm = val.nm
			},
			pick1(val) {},
			pick2(val) {

			},
			radio1(val) {},
			chooseExpert() {
				if (!this.ruleId) {
					this.$message.error('请选择专家选取规则');
				} else {
					this.api.getBidExpertRamdomList({
						ruleId: this.ruleId
					}).then(res => {
						console.log('5573', res.list);
						this.expertIdsList = res.list
						this.expertIds=res.list.join(',')
					})
				}
			},
			handleCurrentChange(val) {
				console.log(val);
				this.pageNo = `${val}`
				this.getList()
			},
			searchSelectTwo(val) {
				this.audit = val
			},
			searchSelectOne(val) {
				this.search1cd = val
			},
			toSearch() {
				this.getList()
			},
			select3(val){
				this.procurementMethodNm=val.nm
				this.procurementMethodCd=val.cd
			}


		}
	}
</script>
<style type="text/css">
	.el-tabs__item {
		width: 100px;
		padding: 0;
		text-align: center;
	}

	.el-select {
		width: 370px;
	}
</style>
<style lang="less" scoped>
	#home {
		.tableHeader {
			background: @themeColor;
			color: #FFF;
			border: 0;
			text-align: center;
		}

		.rowList {
			padding: 20px 0;
		}
	}
</style>
<style lang="less" scoped>
	@import url("../../../assets/css/init.less");

	#home {
		background-color: #F3F3F3;

		.blue {
			color: @themeColor;
		}

		.red {
			color: @redColor;
		}

		.projectNm {
			cursor: pointer;
		}
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		z-index: 50;
		display: flex;
		justify-content: center;
		align-items: center;

		.table_box {
			background: #fff;
			padding: 20px;
			width: 850px;
			max-height: 80%;
			overflow-y: scroll;

			.top {
				display: flex;
				width: 100%;
				justify-content: space-between;
			}

			.row2 {
				width: 700px;
				margin: 30px auto 20px;
				display: flex;
				align-items: center;

				// justify-content: space-between;
				.title {
					width: 100px;
					display: flex;
					align-items: center;
					justify-content: end;
					margin-right: 10px;
				}

				.right {

					.el-input,
					.el-textarea {
						height: 32px;
						width: 370px;
						margin-left: 12px;
					}

					.el-input-number {
						height: 32px;
						width: 160px;
						margin-left: 12px;
					}
				}
			}

			.btn {
				width: 300px;
				margin: 40px auto 0;
				display: flex;
				justify-content: center;
			}
		}
	}

	.container {
		padding-top: 20px;
		padding-bottom: 100px;
		background: url(../../../assets/img/footer.png);
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: bottom center;
		margin: 0 auto;
		display: flex;

		.right {
			height: 800px;
			margin-left: 10px;
			width: calc(~"100% - 210px");

			// width: 100%;
			.header {
				// width:calc(~"100% - 210px");
				width: 100%;
				display: flex;
				align-items: center;
				height: 50px;
				background: #FFFFFF;
				box-shadow: 0px 2px 2px 0px rgba(234, 234, 234, 0.45);
				padding-left: 10px;
				box-sizing: border-box;
				position: relative;

				.headerItem {
					height: 100%;
					width: 97px;
					text-align: center;
					line-height: 48px;
					font-size: 14px;
					font-weight: 400;
					color: #909090;
				}

				.btn {
					width: 62px;
					height: 29px;
					background: #2778BE;
					border-radius: 2px;
					position: absolute;
					right: 10px;
					top: 50%;
					transform: translateY(-50%);
					font-size: 12px;
					font-weight: 400;
					color: #FFFFFF;
					text-align: center;
					line-height: 29px;
				}
			}

			.content {
				margin-top: 10px;
				background-color: #ffffff;
				width: 100%;
				height: 740px;

				.topSeachBox {
					// width: 100%;
					padding: 20px;
					box-sizing: border-box;
					display: flex;

					// justify-content: space-around;
					.el-input {
						width: 200px;
						margin-left: 30px;
					}

					.el-select {
						width: 200px;
						margin-left: 30px;
					}

					.el-button {
						width: 100px;
						margin-left: 20px;
					}
				}

				.bodyTable {
					padding: 20px;
					box-sizing: border-box;

					.el-table {
						width: 100%;
						background-color: #F8F8F8;
						text-align: center;

					}
				}

				.Footer {
					width: 100%;
					text-align: center;
				}
			}

			.navBar {
				margin-top: 10px;
				background-color: #ffffff;
				width: 100%;
				height: 740px;
			}
		}
	}

	.gray {
		color: #999999;
	}
</style>
