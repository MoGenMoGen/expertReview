<template>
	<div id="home" :style="{width:bWidth + 'px'}" v-loading="loading">
		<div class="mask" @click="closeMask" v-if="newShow==true">
		  <div class="table_box" @click.stop="">
		    <div class="top">
		      <p style="font-size: 20px">新增项目</p>
		      <img
		        @click="closeMask"
				 src="~assets/img/close.png"
		        style="width: 25px; height: 25px;cursor: pointer;"
		        alt=""
		      />
		    </div>
			<div class="row2">
			  <div class="title">
			    <span style="color: red; margin-right: 5px; display: inline-block"
			      >* </span
			    ><span>项目工程编号</span>
			  </div>
			  <div class="right">
			    <el-input
			      v-model="cd"
			      class="margin_right"
			      clearable
			      placeholder="项目编号"
			    >
			    </el-input>
			  </div>
			</div>
		    <div class="row2">
		      <div class="title">
		        <span style="color: red; margin-right: 5px; display: inline-block"
		          >* </span
		        ><span>项目名称</span>
		      </div>
		      <div class="right">
		        <el-input
		          v-model="nm"
		          class="margin_right"
		          clearable
		          placeholder="项目名称"
		        >
		        </el-input>
		      </div>
		    </div>
			<div class="row2">
			  <div class="title">
			    <span style="color: red; margin-right: 5px; display: inline-block"
			      >* </span
			    ><span>项目评定标准</span>
			  </div>
			  <div class="right">
			        <el-select v-model="svs"  clearable filterable placeholder="项目评定标准"  style="margin-left: 12px;" @change="select1">
			          <el-option
			            v-for="item in options"
			            :key="item.nm"
			            :label="item.nm"
			            :value="item.id">
			          </el-option>
			        </el-select>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			    <span style="color: red; margin-right: 5px; display: inline-block"
			      >* </span
			    ><span>采购单位</span>
			  </div>
			  <div class="right">
			        <el-select v-model="purchasingUnit" clearable filterable placeholder="采购单位"  style="margin-left: 12px;"@change="select2">
			          <el-option
			            v-for="item in optionsTwo"
			            :key="item.label"
			            :label="item.label"
			            :value="item.label">
			          </el-option>
			        </el-select>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			    <span style="color: red; margin-right: 5px; display: inline-block"
			      >* </span
			    ><span>采购方式(可多选)</span>
			  </div>
			  <div class="right">
			          <el-select v-model="procurementMethodNm" multiple filterable placeholder="采购方式" style="margin-left: 12px;"@change="select3">
			            <el-option
			              v-for="item in optionsThree"
			              :key="item.label"
			              :label="item.label"
			              :value="item.id">
			            </el-option>
			          </el-select>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			    <span style="color: red; margin-right: 5px; display: inline-block"
			      >* </span
			    ><span>项目需求类型</span>
			  </div>
			  <div class="right">
			        <el-select v-model="bidTypesNm" clearable filterable placeholder="项目需求类型" style="margin-left: 12px;"@change="select4">
			          <el-option
			            v-for="item in optionsFour"
			            :key="item.nm"
			            :label="item.nm"
			            :value="item">
			          </el-option>
			        </el-select>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			    <span style="color: red; margin-right: 5px; display: inline-block"
			      >* </span
			    ><span>发布时间</span>
			  </div>
			  <div class="right">
			     <el-date-picker
			       v-model="publishTm"
			       type="date"
			       placeholder="开始时间"
				    @change="pick1">
			     </el-date-picker>
			    </el-input>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			    <span style="color: red; margin-right: 5px; display: inline-block"
			      >* </span
			    ><span>完成时间</span>
			  </div>
			  <div class="right">
			     <el-date-picker
			       v-model="completeTm"
			       type="date"
			       placeholder="完成时间"
				   @change="pick2"
				  >
			     </el-date-picker>
			    </el-input>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			    <span style="color: red; margin-right: 5px; display: inline-block"
			      >* </span
			    ><span>开标时间</span>
			  </div>
			  <div class="right">
			     <el-date-picker
			       v-model="bidOpenTm"
			       type="date"
			       placeholder="开标时间">
			     </el-date-picker>
			    </el-input>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			    <span style="color: red; margin-right: 5px; display: inline-block"
			      >* </span
			    ><span>截标时间</span>
			  </div>
			  <div class="right">
			     <el-date-picker
			       v-model="bidEndTm"
			       type="date"
			       placeholder="截标时间">
			     </el-date-picker>
			    </el-input>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
				  <span style="color: red; margin-right: 5px; display: inline-block"
				    >* </span
				  >
			   <span>发布人</span>
			  </div>
			  <div class="right">
			    <el-input
			      v-model="publisher"
			      class="margin_right"
			      clearable
			      placeholder="发布人"
			    >
			    </el-input>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
				  <span style="color: red; margin-right: 5px; display: inline-block"
				    >* </span
				  >
			   <span>联系电话</span>
			  </div>
			  <div class="right">
			    <el-input
			      v-model="mob"
			      class="margin_right"
			      clearable
			      placeholder="联系电话"
			    >
			    </el-input>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
				  <span style="color: red; margin-right: 5px; display: inline-block"
				    >* </span
				  >
			   <span>是否需缴纳保证金</span>
			  </div>
			  <div class="right">
			  <el-radio-group v-model="needDeposit" style="margin-left: 12px;"@change="radio1">
			     <el-radio :label="0">不需要</el-radio>
			     <el-radio :label="1">需要</el-radio>
			   </el-radio-group>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
				  <span style="color: red; margin-right: 5px; display: inline-block"
				    >* </span
				  >
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
				  <span style="color: red; margin-right: 5px; display: inline-block"
				    >* </span
				  >
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
				  <el-form-item >
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
			    <span style="color: red; margin-right: 5px; display: inline-block"
			      >* </span
			    ><span>招标范围</span>
			  </div>
			  <div class="right">
			        <el-select v-model="viewRangeNm" clearable filterable placeholder="招标范围(机构类型)"  style="margin-left: 12px;">
			          <el-option
			            v-for="item in optionsFive"
			            :key="item.nm"
			            :label="item.nm"
			            :value="item.cd">
			          </el-option>
			        </el-select>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			    <span style="color: red; margin-right: 5px; display: inline-block"
			      >* </span
			    ><span>招标范围(可多选)</span>
			  </div>
			  <div class="right">
			          <el-select v-model="orgEnterIdsList" multiple filterable placeholder="招标范围(机构)" style="margin-left: 12px;" @change="select5">
			            <el-option
			              v-for="item in optionsSix"
			              :key="item.company"
			              :label="item.company"
			              :value="item.id">
			            </el-option>
			          </el-select>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			    <span style="color: red; margin-right: 5px; display: inline-block"
			      >* </span
			    ><span>专家选取规则</span>
			  </div>
			  <div class="right">
			        <el-select v-model="rule" placeholder="专家选取规则模板"  clearable filterable style="margin-left: 12px;" @change="select6">
			          <el-option
			            v-for="item in optionsSeven"
			            :key="item.nm"
			            :label="item.nm"
			            :value="item.id">
			          </el-option>
			        </el-select>
			  </div>
			   <el-button type="primary" style="margin-left: 12px;" @click='chooseExpert'>选取专家</el-button>
			</div>
			<div class="row2">
			  <div class="title">
			    <span style="color: red; margin-right: 5px; display: inline-block"
			      >* </span
			    ><span>已选专家（可多选）</span>
			  </div>
			  <div class="right">
			          <el-select v-model="expertIdsList" multiple filterable placeholder="已选专家" style="margin-left: 12px;"@change="select7">
			            <el-option
			              v-for="item in optionsEight"
			              :key="item.realNm"
			              :label="item.realNm"
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
			     <el-input
			       v-model="rmks"
			       class="margin_right"
			       clearable
			       placeholder="备注"
			     >
			     </el-input>
			  </div>
			</div>
		    <div class="btn">
		      <el-button
		        style="
		          background: #2778be;
		          color: #fff;
		          margin-right: 20px;
		          padding: 10px 25px;
		          border-radius: 4px;
		        "
		        @click="confirmTo"
		        type="text"
		        size="small"
		        >确定</el-button
		      >
		      <el-button
		        style="
		          background: #fff;
		          color: #333;
		          border: 1px solid #dddddd;
		          padding: 10px 25px;
		          border-radius: 4px;
		        "
		        @click="closeMask"
		        type="text"
		        size="small"
		        >取消</el-button
		      >
		    </div>
		  </div>
		</div>
		<div class="mask" @click="closeMask" v-if="showModify==true">
		  <div class="table_box" @click.stop="">
		    <div class="top">
		      <p style="font-size: 20px">修改项目</p>
		      <img
		        @click="closeMask"
				 src="~assets/img/close.png"
		        style="width: 25px; height: 25px;cursor: pointer;"
		        alt=""
		      />
		    </div>
		    <div class="row2">
		      <div class="title">
		        <span style="color: red; margin-right: 5px; display: inline-block"
		          >* </span
		        ><span>项目名称</span>
		      </div>
		      <div class="right">
		        <el-input
		          v-model="input1"
		          class="margin_right"
		          clearable
		          placeholder="项目名称"
		        >
		        </el-input>
		      </div>
		    </div>
			<div class="row2">
			  <div class="title">
			    <span style="color: red; margin-right: 5px; display: inline-block"
			      >* </span
			    ><span>项目编号</span>
			  </div>
			  <div class="right">
			    <el-input
			      v-model="input1"
			      class="margin_right"
			      clearable
			      placeholder="项目编号"
			    >
			    </el-input>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			    <span style="color: red; margin-right: 5px; display: inline-block"
			      >* </span
			    ><span>开始时间</span>
			  </div>
			  <div class="right">
			     <el-date-picker
			       v-model="date1"
			       type="date"
			       placeholder="投标开始时间">
			     </el-date-picker>
			    </el-input>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			    <span style="color: red; margin-right: 5px; display: inline-block"
			      >* </span
			    ><span>截止时间</span>
			  </div>
			  <div class="right">
			     <el-date-picker
			       v-model="date1"
			       type="date"
			       placeholder="投标截止时间">
			     </el-date-picker>
			    </el-input>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			   <span>预算金额</span>
			  </div>
			  <div class="right">
			    <el-input
			      v-model="input1"
			      class="margin_right"
			      clearable
			      placeholder="预算金额(万元)"
			    >
			    </el-input>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			   <span>保证金</span>
			  </div>
			  <div class="right">
			  <el-radio-group v-model="radio" style="margin-left: 12px;">
			     <el-radio :label="1">是</el-radio>
			     <el-radio :label="2">否</el-radio>
			   </el-radio-group>
			  </div>
			</div>
			<div class="row2" style="margin-top: -20px;">
			  <div class="title">
			   <span>招标文件</span>
			  </div>
			  <div class="right" style="padding-top: 30px;">
				<el-form :model="form" style="margin-left: 12px; display: flex; align-items: center;">
				  <el-form-item >
				    <el-upload ref="uploadExcel" action="/general/oss/upload" :auto-upload="true"
				       :on-change="fileChange" :on-success="handleSuccess" :on-remove="handleRemove"
				      :on-error="handleError" :file-list="fileInfo" :on-preview="HandFilePreView">
				      <el-button size="small" plain style="width: 100px;height: 30px;">选择文件</el-button>
				    </el-upload>
				  </el-form-item>
				</el-form>
			  </div>
			</div>
			
			
		    <div class="btn">
		      <el-button
		        style="
		          background: #2778be;
		          color: #fff;
		          margin-right: 20px;
		          padding: 10px 25px;
		          border-radius: 4px;
		        "
		        @click="handleClick(scope.row)"
		        type="text"
		        size="small"
		        >确定</el-button
		      >
		      <el-button
		        style="
		          background: #fff;
		          color: #333;
		          border: 1px solid #dddddd;
		          padding: 10px 25px;
		          border-radius: 4px;
		        "
		        @click="closeMask"
		        type="text"
		        size="small"
		        >取消</el-button
		      >
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
						<el-input placeholder="项目编号" v-model="input" clearable>
						</el-input>
						<el-input placeholder="项目名称" v-model="input" clearable>
						</el-input>
						<el-input placeholder="联系人" v-model="input" clearable>
						</el-input>
						<el-select v-model="value" clearable placeholder="采购方式">
							<el-option v-for="item in options" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-date-picker v-model="value2" type="datetime" placeholder="创建时间">
						</el-date-picker>
						<el-select v-model="value1" clearable placeholder="项目状态">
							<el-option v-for="item in optionsTwo" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-button plain>查询</el-button>
						<el-button type="primary" style="background-color:  #2778BE;" @click='addNew'>新增</el-button>
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
							<el-table-column type="index" label="序号" min-width="50">
							</el-table-column>
							<el-table-column prop="cd" label="项目编号" min-width="150">
							</el-table-column>
							<el-table-column prop="nm" label="项目名称" min-width="150">
							</el-table-column>
							<el-table-column prop="linkman" label="联系人" min-width="100">
							</el-table-column>
							<el-table-column prop="procurementMethodNm" label="采购方式" min-width="100">
							</el-table-column>
							<el-table-column prop="budget" label="预算金额(万元)" min-width="100">
							</el-table-column>
							<el-table-column prop="crtTm" label="创建时间" min-width="150">
							</el-table-column>
							<el-table-column prop="audit" label="状态" min-width="100">
								<template slot-scope="scope">
									<span v-if="scope.row.audit==1" style="color: #E4393C;">
										等待审核
									</span>
									<span v-if="scope.row.audit==2" style="color: #2778BE;">
										审核通过
									</span>
									<span v-if="scope.row.audit==3" style="color: #2778BE;">
										审核驳回
									</span>

								</template>
							</el-table-column>
							<el-table-column label="操作" min-width="50">
								<template slot-scope="scope">
									<el-button @click="tolook(scope.row)" type="text" size="small">查看</el-button>
									<br>
									<el-button type="text" size="small" style="color: #E4393C;" @click='toModify(scope.row)'>修改</el-button>
									<br>
									<el-button type="text" size="small" style="color: #909090;">删除</el-button>
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
							<detail></detail>
						</el-tab-pane>
						<el-tab-pane label="招标变更/澄清" name="second">
							<change></change>
						</el-tab-pane>
						<el-tab-pane label="全部项目" name="third">全部项目</el-tab-pane>
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
				pageNum:1,
				formTwo:{
					
				},
				purchasingUnit:'',//采购单位
				cd:'',//项目工程编号
				nm:'',//项目名称
				svs:'',//项目评定标准name
				svsId:'',//项目评定标准id
				procurementMethodNm:[],//采购方式name
				procurementMethodCd:[],//采购方式id
				bidTypesNm:'',//项目需求类型
				bidTypesCd:'',//项目需求id
				publishTm:'',//发布时间
				completeTm:'',//完成时间
				bidOpenTm:'',//开标时间
				bidEndTm:'',//截标时间
				publisher:'',//发布人
				mob:'',//联系电话
				needDeposit:0,//是否需缴纳保证金
				status:0,//发布状态
				svsOn:0,//专家评定开关
				attachment:'',//附件上传
				viewRangeNm:'',//招标范围name（机构类型）
				viewRangeCd:'',//招标范围id（机构类型）
				orgEnterIdsList:[],//招标范围name（机构）
				orgEnterIds:'',//招标范围id（机构）
				expertIdsList:[],//专家name
				expertIds:'',//专家id
				rule:'',//专家选取规则模板name
				ruleId:'',//专家选取规则模板id
				rmks:'',//备注
				form:{
					file:''
				},
				
				fileInfo:[],
				radio:1,
				activeName: '',
				newShow: false,
				activeNameTwo: 'first',
				thisNavList: [],
				showDetail: false, //是否显示详情页
				showModify:false,//是否显示修改页面
				loading: false,
				bWidth: 0,
				width: 0,
				list: [],
				pageNo: 1,
				pageSize: 10,
				total: 0,
				tabIndex: '',
				value: "",
				value2: "",
				input: "",
				value1: "",
				tableData: [{
					date: '1',
					name: 'BHZC2021-G3-0001',
					address: '12米玻璃钢新型渔船',
					zhuangtai: '待审批'
				}, {
					date: '2',
					name: 'BHZC2021-G3-0001',
					address: '12米玻璃钢新型渔船',
					zhuangtai: '待审批'
				}, {
					date: '3',
					name: 'BHZC2021-G3-0001',
					address: '12米玻璃钢新型渔船',
					zhuangtai: '待审批'
				}, {
					date: '4',
					name: 'BHZC2021-G3-0001',
					address: '12米玻璃钢新型渔船',
					zhuangtai: '已审批'
				}],
				options: [
				],
				optionsTwo: [
				],
				optionsThree: [
				],
				optionsFour: [
				],
				optionsFive: [
				],
				optionsSix: [
				],
				optionsSeven: [
				],
				optionsEight: [
				],
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
			let query=this.query.new()
			this.query.toO(query,'seq','desc')
			//获取项目评定标准
			this.api.getBidSvsList(this.query.toEncode(query)).then(res=>{
				this.options=res.list
			})
			//获取专家选取规则
			let query2=this.query.new()
			this.query.toO(query2,'crtTm','desc')
			this.query.toP(query2,'1','20')
			this.api.selectRuleList(this.query.toEncode(query2)).then(res=>{
				this.optionsSeven=res.data.list
			})
			//获取专家列表
			let query3=this.query.new()
			this.query.toW(query3,'status','1','EQ')
		    this.api.getBidExpertPage(this.query.toEncode(query3)).then(res=>{
				this.optionsEight=res.list
			})
			//获取项目需求类型
			this.api.getCatListByPcd({cd:'BID_TYPES_CD'}).then(res=>{
				this.optionsFour=res.list
				console.log('kankan',this.optionsFour);
			})
			//获取招标范围
			this.api.getCatListByPcd({cd:'identity'}).then(res=>{
				this.optionsFive=res.list
			})
			//获取招标范围（自选）
			let query4=this.query.new()
			this.query.toW(query4,'audit','2','EQ')
			this.api.getOrgEnterList(this.query.toEncode(query4)).then(res=>{
				this.optionsSix=res.list
			})
			//获取招标列表
			let query5=this.query.new()
			this.query.toO(query5,'crtTm','desc')
			this.query.toP(query5,this.pageNum,'4')
			this.api.getBidPage(this.query.toEncode(query5)).then(res=>{
				this.tableData=res.list
				console.log('111',res);
			})


		},
		methods: {
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
			},
			//修改
			toModify(row){
				this.showModify=true
			},
			changeNav(tab, event) {
				console.log(tab, event);
			},
			addNew() {
				this.newShow = true
			},
			closeMask(){
				this.newShow=false
				this.showModify=false
			},
			confirmTo(){
				let obj={
					cd:this.cd,
					nm:this.nm,
					svsId:this.svsId,
					purchasingUnit:'',
					procurementMethodNm:'',
					bidTypesCd:this.bidTypesCd,
					bidTypesNm:this.bidTypesNm,
					publishTm:this.publishTm,
					completeTm:this.completeTm,
					bidOpenTm:this.bidOpenTm,
					bidEndTm:this.bidEndTm,
					publisher:this.publisher,
					mob:this.mob,
					needDeposit:this.needDeposit,
					status:this.status,
					svsOn:this.svsOn,
					attachment:this.attachment,
					viewRangeNm:this.viewRangeNm,
					viewRangeCd:this.viewRangeCd,
					orgEnterIdsList:this.orgEnterIdsList,
					orgEnterIds:this.orgEnterIds,
					ruleId:this.ruleId,
					expertIdsList:this.expertIdsList,
					expertIds:this.expertIds,
					rmks:this.rmks,
				}
				this.api.postBidAdd(obj).then(res=>{
					
				})
			},
			fileChange(file, fileList) {
			  this.formTwo.file = file.raw
			},
			handleSuccess(res, file, fileList) {
			  this.attachment=fileList.map((item) => item.response.data)
			  .join(",");
			  console.log('map',this.attachment);
			},
			handleRemove(file,fileList){
			  this.attachment=fileList.map((item) => item.response.data)
			  .join(",");
			},
			handleError(err, file, fileList) {
			  this.$notify.error({
			    title: '错误',
			    message: `文件上传失败`
			  });
			},
			HandFilePreView(){
				
			},
			select1(val){
				this.svsId=val
			},
			select2(val){
				this.purchasingUnit=val
			},
			select3(val){
				this.procurementMethodCd=val.join(',')
			},
			select4(val){
				this.bidTypesCd=val.cd
				this.bidTypesNm=val.nm
			},
			select5(val){
				this.orgEnterIds=val.join(',')
			},
			select6(val){
				this.ruleId=val
			},
			select7(val){
				this.expertIds=val.join(',')
			},
			pick1(val){
			},
			pick2(val){
				
			},
			radio1(val){
			},
			chooseExpert(){
				if(!this.ruleId){
					this.$message.error('请选择专家选取规则');
				}
				else{
					this.api.getBidExpertRamdomList({ruleId:this.ruleId}).then(res=>{
						console.log('5573',res.list);
						this.expertIdsList=res.list
					})
				}
			},
			handleCurrentChange(val){
				
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
	.el-select{
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
