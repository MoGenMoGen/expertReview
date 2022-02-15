<template>
	<div id="home" :style="{width:bWidth + 'px'}" v-loading="loading">
		<div class="mask" v-if="newShow==true||showModify==true">
			<div class="table_box" @click.stop="">
				<div class="top">
					<p style="font-size: 20px" v-if="newShow">新增项目</p>
					<p style="font-size: 20px" v-if="showModify">修改项目</p>
					<img @click="closeMask" src="~assets/img/close.png"
						style="width: 25px; height: 25px;cursor: pointer;" alt="" />
				</div>
				<div class="" style="display: flex;">
					<div class="rowLeft">
						<div class="row2">
							<div class="title">
								<span style="color: red; margin-right: 5px; display: inline-block">*
								</span><span>项目编号</span>
							</div>
							<div class="right">
								<el-input v-model="cd" class="margin_right" clearable placeholder="项目编号">
								</el-input>
							</div>
						</div>
						<div class="row2">
							<div class="title">
								<span style="color: red; margin-right: 5px; display: inline-block">*
								</span><span>项目评定标准</span>
							</div>
							<div class="right">
								<el-select v-model="svsId" clearable filterable placeholder="项目评定标准"
									style="margin-left: 12px;" @change="select1">
									<el-option v-for="item in options" :key="item.nm" :label="item.nm" :value="item.id">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="row2">
							<div class="title">
								<span style="color: red; margin-right: 5px; display: inline-block">*
								</span><span>项目需求类型</span>
							</div>
							<div class="right">
								<el-select v-model="bidTypesNm" value-key="nm" clearable filterable placeholder="项目需求类型"
									style="margin-left: 12px;" @change="select4">
									<el-option v-for="item in optionsFour" :key="item.nm" :label="item.nm"
										:value="item">
									</el-option>
								</el-select>
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
								<span>预算金额(元)</span>
							</div>
							<div class="right">
								<el-input v-model="budget" class="margin_right" clearable placeholder="预算金额(元)">
								</el-input>
							</div>
						</div>
						<div class="row2">
							<div class="title">
								<span
									style="color: red; margin-right: 5px; display: inline-block"></span><span>招标类型</span>
							</div>
							<div class="right">
								<el-select v-model="viewRangeNm" clearable value-key="nm" filterable placeholder="招标类型"
									style="margin-left: 12px;" @change="select8">
									<el-option v-for="item in optionsFive" :key="item.nm" :label="item.nm"
										:value="item">
									</el-option>
								</el-select>
								<p style="color: red;margin-left: 12px;">允许指定类型的所有机构参与报名投标</p>
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
									<el-option v-for="item in optionsSix" :key="item.id" :label="item.company+'['+item.identityNm+']'"
										:value="item.id">
									</el-option>
								</el-select>
								<p style="color: red;margin-left: 12px;">允许指定的机构参与报名投标(可多选)</p>
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
								<span>是否需缴纳保证金</span>
							</div>
							<div class="right">
								<el-radio-group v-model="needDeposit" style="margin-left: 12px;" @change="radio1">
									<el-radio :label="0">不需要</el-radio>
									<el-radio :label="1">需要</el-radio>
								</el-radio-group>
							</div>
						</div>
						<div class="row2" v-if="needDeposit==1">
							<div class="title">
								<span style="color: red; margin-right: 5px; display: inline-block">* </span>
								<span>保证金金额(元)</span>
							</div>
							<div class="right">
								<el-input v-model="depositAmount" style="margin-left: 12px;" clearable placeholder="保证金金额(元)">
								</el-input>
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
											:on-change="fileChange" :on-success="handleSuccess"
											:on-remove="handleRemove" :on-error="handleError" :file-list="fileInfo"
											:on-preview="HandFilePreView" >
											<el-button size="small" plain style="width: 100px;height: 30px;">选择文件
											</el-button>
										</el-upload>
									</el-form-item>
								</el-form>
							</div>
						</div>
					</div>
					<div class="rowRight">
						<div class="row2">
							<div class="title">
								<span style="color: red; margin-right: 5px; display: inline-block">*
								</span><span>项目名称</span>
							</div>
							<div class="right">
								<el-input v-model="nm" class="margin_right" clearable placeholder="项目名称">
								</el-input>
							</div>
						</div>
						<div class="row2">
							<div class="title">
								<span style="color: red; margin-right: 5px; display: inline-block">*
								</span><span>采购方式</span>
							</div>
							<div class="right">
								<el-select v-model="procurementMethodNm" value-key="nm" filterable placeholder="采购方式"
									style="margin-left: 12px;" @change="select3">
									<el-option v-for="item in optionsThree" :key="item.nm" :label="item.nm"
										:value="item">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="row2">
							<div class="title">
								<span style="color: red; margin-right: 5px; display: inline-block">*
								</span><span>发布时间</span>
							</div>
							<div class="right">
								<el-date-picker v-model="publishTm" type="date" placeholder="开始时间" @change="pick1">
								</el-date-picker>
								</el-input>
							</div>
						</div>
						<div class="row2">
							<div class="title">
								<span style="color: red; margin-right: 5px; display: inline-block">*
								</span><span>报名截止时间</span>
							</div>
							<div class="right">
								<el-date-picker v-model="completeTm" type="date" placeholder="报名截止时间" @change="pick2">
								</el-date-picker>
								</el-input>
							</div>
						</div>
						<div class="row2">
							<div class="title">
								<span style="color: red; margin-right: 5px; display: inline-block">*
								</span><span>投标截止时间</span>
							</div>
							<div class="right">
								<el-date-picker v-model="bidEndTm" type="datetime" placeholder="投标截止时间"@change="pick3" >
								</el-date-picker>
								</el-input>
							</div>
						</div>
						<div class="row2">
							<div class="title">
								<span style="color: red; margin-right: 5px; display: inline-block">*
								</span><span>开标时间</span>
							</div>
							<div class="right">
								<el-date-picker v-model="bidOpenTm" type="datetime" placeholder="开标时间" @change='pick4'>
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
								<span style="color: red; margin-right: 5px; display: inline-block">
								</span><span>专家选取规则</span>
							</div>
							<div class="right">
								<el-select v-model="ruleId" placeholder="专家选取规则模板" clearable filterable
									style="margin-left: 12px;" @change="select6">
									<el-option v-for="item in optionsSeven" :key="item.nm" :label="item.nm"
										:value="item.id">
									</el-option>
								</el-select>
							</div>
							<el-button type="primary" style="margin-left: 12px;" @click='chooseExpert'>选取专家</el-button>
						</div>
						<div class="row2">
							<div class="title">
								<span style="color: red; margin-right: 5px; display: inline-block">*
								</span><span>已选专家(可多选)</span>
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
					</div>
				</div>
				<div class="top" style="margin-top: 20px;">
					<p style="font-size: 20px">招标公告</p>
				</div>
				<div style="display: flex;">


					<div class="rowLeft">
						<div class="row2">
							<div class="title">
								<span style="color: red; margin-right: 5px; display: inline-block">*
								</span><span>公告标题</span>
							</div>
							<div class="right">
								<el-input v-model="title" class="margin_right" clearable placeholder="公告标题">
								</el-input>
							</div>
						</div>

						<!-- 	<div class="row2">
						<div class="title">
							<span style="color: red; margin-right: 5px; display: inline-block">* </span><span>排序</span>
						</div>
						<div class="right">
							<el-input-number v-model="seq" @change="handleChange" :min="1" label=""></el-input-number>
						</div>
					</div> -->

					</div>
					<div class="rowRight">
						<div class="row2">
							<div class="title">
								<span style="color: red; margin-right: 5px; display: inline-block">*
								</span><span>公告发布时间</span>
							</div>
							<div class="right">
								<el-date-picker v-model="releTm" type="datetime" placeholder="选择日期" @change="pick5">
								</el-date-picker>
							</div>
						</div>
						<!-- 	<div class="row2">
						<div class="title">
							<p>备注</p>
						</div>
						<div class="right">
							<el-input type="text" placeholder="备注" v-model="rmksTwo">
							</el-input>
						</div>
					</div> -->

					</div>
				</div>
				<div class="row2" >
					<div class="title" style="display: flex;justify-content: end; width: 148px;">
						<span style="color: red; margin-right: 1px; display: inline-block">* </span>
						<span>公告内容</span>
					</div>
					<div class="right" style="width: 100%;margin-top:30px;">
						<MyEditor ref="myEditor" frameHeight=700></MyEditor>
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
				<div class="btn">
					<el-button style="
					  background: #fff;
					  color: #333;
					  border: 1px solid #dddddd;
					  padding: 10px 25px;
					  border-radius: 4px;
					" @click="closeMask" type="text" size="small">取消</el-button>
					<el-button style="
		          background: #2778be;
		          color: #fff;
		          margin-right: 20px;
		          padding: 10px 25px;
		          border-radius: 4px;
		        " @click="confirmTo" type="text" size="small">确定</el-button>


				</div>
			</div>
		</div>

		<my-header :width="width" :bWidth="bWidth"></my-header>
		<div class="container" :style="{width:bWidth + 'px'}">
			<leftMenu tabIndex='1-1'></leftMenu>
			<div class="right">
				<topNav :activeName='activeName' :list="thisNavList"></topNav>
				<div class="content" v-if="showDetail==false&&showCheck==false" style="margin-top: 10px;">
					<div class="topSeachBox">
						<el-input placeholder="项目编号" v-model="searchInput1" clearable>
						</el-input>
						<el-input placeholder="项目名称" v-model="searchInput2" clearable>
						</el-input>
						<el-input placeholder="联系人" v-model="searchInput3" clearable>
						</el-input>
						<!-- <el-select v-model="search1" clearable placeholder="采购方式" @change="searchSelectOne">
							<el-option v-for="item in searchListOne" :key="item.cd" :label="item.nm" :value="item.cd">
							</el-option>
						</el-select> -->
						<!-- <el-date-picker v-model="searchDate" type="datetime" placeholder="创建时间">
						</el-date-picker> -->
						<el-date-picker style="margin-left: 30px;" v-model="searchDate" type="daterange"
							range-separator="至" start-placeholder="发布时间(开始)" end-placeholder="发布时间(结尾)"
							unlink-panels>
						</el-date-picker>
						<el-select v-model="search2" clearable placeholder="项目状态" @change="searchSelectTwo">
							<el-option v-for="item in searchListTwo" :key="item.nm" :label="item.nm" :value="item.id">
							</el-option>
						</el-select>
						<el-button plain @click='toSearch' v-if="auth1">查询</el-button>
						<el-button type="primary" style="background-color:  #2778BE;" @click='addNew' v-if="auth2">新增
						</el-button>
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
								<template slot-scope="scope">
									<span>{{(pageNo - 1) * pageSize + scope.$index + 1}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="cd" label="项目编号" min-width="130">
							</el-table-column>
							<el-table-column prop="nm" label="项目名称" min-width="130">
							</el-table-column>
							<el-table-column prop="linkman" label="联系人" min-width="80">
							</el-table-column>
							<el-table-column prop="procurementMethodNm" label="采购方式" min-width="80">
							</el-table-column>
							<el-table-column prop="budget" label="预算金额(元)" min-width="80">
								<template slot-scope="scope">
									{{scope.row.budget?fmoney(scope.row.budget):""}}
								</template>
							</el-table-column>
							<!-- <el-table-column prop="crtTm" label="创建时间" min-width="150">
							</el-table-column> -->
							<el-table-column prop="publishTm" label="发布日期" min-width="100"></el-table-column>
							<el-table-column prop="completeTm" label="报名截止日期" min-width="100"></el-table-column>
							<el-table-column prop="bidEndTm" label="投标截止时间" min-width="100"></el-table-column>
							<el-table-column prop="bidOpenTm" label="开标时间" min-width="100"></el-table-column>
							<el-table-column label="保证金" min-width="70">
								<template slot-scope="scope">
									<p v-if="scope.row.needDeposit==1">{{scope.row.depositAmount?fmoney(scope.row.depositAmount):''}}</p>
									<p v-if="scope.row.needDeposit==0">不需缴纳</p>
								</template>
							</el-table-column>
							<el-table-column prop="options" label="审核意见" min-width="100">
								<template slot-scope="scope">
									<el-tooltip class="item" effect="dark" :content="scope.row.options" placement="top">
									  <p>{{scope.row.options?scope.row.options.substring(0,5)+'...':''}}</p>
									</el-tooltip>
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
									<el-button @click="tolook(scope.row)" type="text" size="small" v-if="auth5">查看
									</el-button>
									<br v-if="auth5">
									<el-button type="text" size="small" style="color: #E4393C;"
										@click='toModify(scope.row)' v-if="auth4">修改</el-button>
									<br v-if="auth4">
									<el-button type="text" size="small" style="color: #909090;"
										@click='toDelite(scope.row)' v-if="auth3">删除</el-button>
									<br v-if="auth3">
									<el-button type="text" size="small" style="color:  #E4393C;"
										@click='toCheck(scope.row)' v-if="auth6&&scope.row.audit==1">审核</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div class="Footer">
						<el-pagination background @current-change="handleCurrentChange" :current-page.sync="pageNo"
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
						<el-tab-pane label="评标视频" name="third">
							<pingbiaoshipin :detailId='detailId' :detailName='detailName'></pingbiaoshipin>
						</el-tab-pane>
						<el-tab-pane label="评审结果" name="fourth">
							<pingshenjieguo :detailId='detailId' :detailName='detailName'></pingshenjieguo>
						</el-tab-pane>
						<el-tab-pane label="投标信息" name="fifth">
							<toubiaoxinxi :detailId='detailId' :detailName='detailName'></toubiaoxinxi>
						</el-tab-pane>
						
					</el-tabs>
				</div>
				<div v-if="showCheck==true">
					<check :detailId='detailId'></check>
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
	import pingbiaoshipin from '@/components/zhaobiao/pingbiaoshipin';
	import pingshenjieguo from '@/components/zhaobiao/pingshenjieguo';
	import toubiaoxinxi from '@/components/zhaobiao/toubiaoxinxi';
	import topNav from '@/components/topNav';
	import check from '@/components/zhaobiao/check';
	import MyEditor from '@/components/myEditor'
	export default {
		data() {
			return {
				auth1: '', //查询权限
				auth2: '', //新增权限
				auth3: '', //删除权限
				auth4: '', //修改权限
				auth5: '', //查看权限
				auth6: '', //审核权限
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
				depositAmount: '', //保证金金额
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
				bidEndTm: '', //投标截止时间
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
				title: '', //公告标题
				cont: '', //公告内容
				releTm: '', //公告发布时间
				form: {
					file: ''
				},
				modifyId: '',
				fileInfo: [],
				radio: 1,
				activeName: '',
				newShow: false,
				activeNameTwo: 'first',
				thisNavList: [],
				showDetail: false, //是否显示详情页
				showModify: false, //是否显示修改页面
				showCheck: false,
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
				flag: true,
				BidAfficheInfo: {}
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
			topNav,
			check,
			MyEditor,
			pingbiaoshipin,
			pingshenjieguo,
			toubiaoxinxi
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
			this.auth1 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:page') > -1)
			this.auth2 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:add2') > -1)
			this.auth3 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:del3') > -1)
			this.auth4 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:upd') > -1)
			this.auth5 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:info3') > -1)
			this.auth6 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:examine') > -1)

			console.log(this.auth1, this.auth2, this.auth3, this.auth4, this.auth5, this.auth6, );
			this.getList()

		},
		methods: {
			fmoney(s, n) {
			    n = n > 0 && n <= 20 ? n : 2;
			    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
			    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
			    var t = "";
			    for (let i = 0; i < l.length; i++) {
			        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
			    }
			    return t.split("").reverse().join("") + "." + r;
			},
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
					this.query.toW(query5, 'publishTm', this.searchDate.join(','), 'BT')
				}
				if (this.audit) {
					this.query.toW(query5, 'audit', this.audit, 'Lk')
				}
				this.query.toO(query5, 'crtTm', 'desc')
				this.query.toP(query5, this.pageNo, this.pageSize)
				this.query.toW(query5,'file','0','EQ')
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
			//审核
			toCheck(row) {
				this.showCheck = true
				this.detailId = row.id
				this.detailName = row.nm
			},
			//修改
			toModify(row) {
				this.showModify = true
				this.modifyId = row.id
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
					this.attachment = res.data.attachment
					this.depositAmount = res.data.depositAmount
					let modelList = res.data.attachment.split(',')
					this.getInfo(modelList)
					console.log('11', this.list);
					if (this.list[0].fileNm) {
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
					if (this.orgEnterIds) {
						this.orgEnterIdsList = res.data.orgEnterIds.split(',').map(Number)
					}
					this.ruleId = res.data.ruleId
					this.expertIds = res.data.expertIds
					this.expertIdsList = res.data.expertIds.split(',').map(Number)
					this.rmks = res.data.rmks
				})
				let query = this.query.new()
				this.query.toW(query, 'bidId', row.id, 'EQ')
				this.query.toO(query, 'seq', 'asc')
				this.api.getBidAffichePage(this.query.toEncode(query)).then(res => {
					console.log('1333', res);
					for (let i = 0; i < res.data.list.length; i++) {
						if (res.data.list[i].afficheTypeCd == '5635882628584448') {
							this.BidAfficheInfo = res.data.list[i]
							this.title = res.data.list[i].title
							this.releTm = res.data.list[i].releTm
							this.$refs.myEditor.msg = res.data.list[i].cont
							console.log('7879', this.cont);
						}
					}
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
							if(this.tableData.length==1){
								if(this.pageNo>2){
									this.pageNo--
								}
								else{
									this.pageNo=1
								}
							}
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
				this.bidEndTm = '' //投标截止时间
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
				this.title = ''
				this.releTm = ''
				this.depositAmount = ''
			},
			confirmTo() {
				if (!this.cd) {
					this.$message({
						type: "error",
						message: "项目编号不能为空",
					});
					return false
				}
				if (!this.nm) {
					this.$message({
						type: "error",
						message: "项目名称不能为空",
					});
					return false
				}
				if (!this.svsId) {
					this.$message({
						type: "error",
						message: "项目评定标准不能为空",
					});
					return false
				}
				if (!this.procurementMethodCd) {
					this.$message({
						type: "error",
						message: "采购方式不能为空",
					});
					return false
				}
				if (!this.bidTypesCd) {
					this.$message({
						type: "error",
						message: "项目需求类型不能为空",
					});
					return false
				}
				if (!this.publishTm) {
					this.$message({
						type: "error",
						message: "发布时间不能为空",
					});
					return false
				}
				if (!this.completeTm) {
					this.$message({
						type: "error",
						message: "完成时间不能为空",
					});
					return false
				}
				if (!this.bidOpenTm) {
					this.$message({
						type: "error",
						message: "开标时间不能为空",
					});
					return false
				}
				if (!this.bidEndTm) {
					this.$message({
						type: "error",
						message: "投标截止时间不能为空",
					});
					return false
				}
				if (!this.publisher) {
					this.$message({
						type: "error",
						message: "发布人不能为空",
					});
					return false
				}
				if (!this.linkman) {
					this.$message({
						type: "error",
						message: "联系人不能为空",
					});
					return false
				}
				if (!this.mob) {
					this.$message({
						type: "error",
						message: "联系电话不能为空",
					});
					return false
				}
				if (!this.budget) {
					this.$message({
						type: "error",
						message: "预算金额不能为空",
					});
					return false
				}
				if (!this.viewRangeCd && !this.orgEnterIds) {
					this.$message({
						type: "error",
						message: "招标范围和招标类型不能全为空",
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
				// if (!this.ruleId) {
				// 	this.$message({
				// 		type: "error",
				// 		message: "专家选取规则不能为空",
				// 	});
				// 	return false
				// }
				if (!this.expertIds) {
					this.$message({
						type: "error",
						message: "专家不能为空",
					});
					return false
				}
				if (!this.title) {
					this.$message({
						type: "error",
						message: "标题不能为空",
					});
					return false
				}
				if (!this.releTm) {
					this.$message({
						type: "error",
						message: "公告发布时间不能为空",
					});
					return false
				}
				if (!this.$refs.myEditor.msg) {
					this.$message({
						type: "error",
						message: "公告内容不能为空",
					});
					return false
				}
				if(this.needDeposit==1) {
					if(!this.depositAmount) {
						this.$message({
							type: "error",
							message: "保证金金额不能为空",
						});
						return false
					}
				}
				let obj = {
					shipBidAfficheRo: {
						title: this.title,
						cont: this.$refs.myEditor.msg,
						releTm: this.until.formatTime(this.releTm),
					},
					shipBidRo: {
						cd: this.cd,
						budget: this.budget,
						nm: this.nm,
						svsId: this.svsId,
						procurementMethodNm: this.procurementMethodNm,
						procurementMethodCd: this.procurementMethodCd,
						bidTypesCd: this.bidTypesCd,
						bidTypesNm: this.bidTypesNm,
						publishTm: this.until.formatTime(this.publishTm).substring(0, 10),
						completeTm: this.until.formatTime(this.completeTm).substring(0, 10),
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
						id: this.modifyId,
						depositAmount: this.depositAmount
					}

				}
				console.log(this.flag)
				if (!this.flag) {
					this.$message({
						message: '请勿重复点击',
						type: 'warning'
					});
					return
				}
				if (this.newShow == true && this.flag == true) {
					this.flag = false
					setTimeout(() => {
						this.flag = true
					}, 2000	)
					this.api.postBidAdd(obj).then(res => {
						console.log(111)
						this.closeMask()
						this.getList()
					})

				}
				if (this.showModify == true && this.flag == true) {
					obj.shipBidAfficheRo.id = this.BidAfficheInfo.id
					this.flag = false
					
					this.api.postBidUpd(obj).then(res => {
						this.flag = true
						this.closeMask()
						this.getList()
					})
					setTimeout(() => {
						this.flag = true
					}, 1000)
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
				console.log('12131', fileList);
				this.attachment = fileList.map((item) => item.url)
					.join(",");
			},
			handleError(err, file, fileList) {
				this.$notify.error({
					title: '错误',
					message: `文件上传失败`
				});
			},
			HandFilePreView(file) {
					console.log(file);
					if(file.response) {
						window.open(file.response.data)
					} else {
						window.open(file.url)
					}
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
			pick1(val) {
				let completeTm = ''
				if(typeof(this.completeTm)=='string') {
					completeTm = this.completeTm+' 00:00:00'
				} else {
					completeTm = this.completeTm
				}
				if(this.completeTm&&val.getTime()>=new Date(completeTm).getTime()){
					this.$message.error('发布时间不能大于报名截止时间');
					this.publishTm=''
				}
			},
			pick2(val) {
				console.log(this.publishTm)
				let publishTm = ''
				if(typeof(this.publishTm)=='string') {
					publishTm = this.publishTm+' 00:00:00'
				} else {
					publishTm = this.publishTm
				}
				if(this.publishTm&&val.getTime()<=new Date(publishTm).getTime()){
						this.$message.error('报名截止时间不能小于发布时间');
						this.completeTm=''
				}
				if(this.bidEndTm&&val.getTime()>=new Date(this.bidEndTm).getTime()){
					this.$message.error('报名截止时间不能大于投标截止时间');
					this.completeTm=''
				}
			},
			pick3(val){
				let completeTm = ''
				if(typeof(this.completeTm)=='string') {
					completeTm = this.completeTm+' 00:00:00'
				} else {
					completeTm = this.completeTm
				}
				if(this.completeTm&&val.getTime()<=new Date(completeTm).getTime()){
						this.$message.error('投标截止时间不能小于报名截止时间');
						this.bidEndTm=''
				}
				if(this.bidOpenTm&&val.getTime()>=new Date(this.bidOpenTm).getTime()){
					this.$message.error('投标截止时间不能大于开标时间');
					this.bidEndTm=''
				}
			},
			pick4(val){
				if(this.bidEndTm&&val.getTime()<=new Date(this.bidEndTm).getTime()){
						this.$message.error('开标时间不能小于投标截止时间');
						this.bidOpenTm=''
				}
				
			},
			pick5(val){
				let publishTm = ''
				if(typeof(this.publishTm)=='string') {
					publishTm = this.publishTm+' 00:00:00'
				} else {
					publishTm = this.publishTm
				}
				if(this.publishTm&&val.getTime()<new Date(publishTm).getTime()){
					this.$message.error('公告发布时间不能小于发布时间');
					this.releTm=''
				}
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
						this.expertIds = res.list.join(',')
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

				if (this.searchDate) {
					for (let i = 0; i < this.searchDate.length; i++) {
						this.searchDate[i] = this.until.formatTime(this.searchDate[i])
					}
				}

				console.log(this.searchDate);
				this.handleCurrentChange(1)
			},
			select3(val) {
				this.procurementMethodNm = val.nm
				this.procurementMethodCd = val.cd
			},

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

	.el-button--text {
		padding: 1px 10px;
	}
	.el-upload-list__item .el-icon-close-tip{
		display: none !important;
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
			width: 1300px;
			max-height: 80%;
			overflow-y: scroll;

			.top {
				display: flex;
				width: 100%;
				justify-content: space-between;
				
			}

			.rowLeft {
				width: 50%;

				.row2 {
					width: 100%;
					margin: 30px 0 20px;
					display: flex;
					align-items: center;

					// justify-content: space-between;
					.title {
						width: 148px;
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
			}

			.rowRight {
				width: 50%;

				.row2 {
					width: 100%;
					margin: 30px 0 20px;
					display: flex;
					align-items: center;

					// justify-content: space-between;
					.title {
						width: 148px;
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
