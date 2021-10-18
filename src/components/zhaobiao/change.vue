<!-- 招标变更/澄清 -->
<template>
	<div class="content" style="margin-top: 0;">
		<div class="mask" @click="closeMask" v-if="addShow==true">
		  <div class="table_box" @click.stop="">
		    <div class="top">
		      <p style="font-size: 20px">新增</p>
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
		        ><span>公告标题</span>
		      </div>
		      <div class="right">
		        <el-input
		          v-model="input1"
		          class="margin_right"
		          clearable
		          placeholder="公告标题"
		        >
		        </el-input>
		      </div>
		    </div>
			<div class="row2">
			  <div class="title">
			    <span style="color: red; margin-right: 5px; display: inline-block"
			      >* </span
			    ><span>公告发布时间</span>
			  </div>
			  <div class="right">
			     <el-date-picker
			       v-model="date1"
			       type="date"
			       placeholder="选择日期">
			     </el-date-picker>
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
			      v-model="input2"
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
			    ><span>项目id</span>
			  </div>
			  <div class="right">
			    <el-input
			      v-model="input3"
			      class="margin_right"
			      clearable
			      placeholder="项目id"
			    >
			    </el-input>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			    <span style="color: red; margin-right: 1px; display: inline-block"
			      >* </span
			    ><span>公告类型</span>
			  </div>
			  <div class="right" style="margin-left: 12px;">
			     <el-select v-model="value" placeholder="请选择" >
			       <el-option
			         v-for="item in options"
			         :key="item.value"
			         :label="item.label"
			         :value="item.value">
			       </el-option>
			     </el-select>
			  </div>
			</div>
		    <div class="row2">
		      <div class="title">
		        <p>备注</p>
		      </div>
		      <div class="right">
		        <el-input
		          type="textarea"
		          :rows="2"
		          placeholder="备注"
		          v-model="textarea"
		        >
		        </el-input>
		      </div>
		    </div>
		    <div class="row2">
		      <div class="title">
		        <span style="color: red; margin-right: 5px; display: inline-block"
		          >* </span
		        ><span>排序</span>
		      </div>
		      <div class="right">
		        <el-input-number
		          v-model="num"
		          @change="handleChange"
		          :min="1"
		          :max="10"
		          label=""
		        ></el-input-number>
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
		<div class="maskTwo" @click="closeMask" v-if="checkShow==true">
		 
		  <div class="table_box" @click.stop=""  style="display: flex; flex-wrap: wrap;">
		    <div class="top">
		      <p style="font-size: 20px">审核</p>
		      <img
		        @click="closeMask"
		        src="~assets/img/close.png"
		        style="width: 25px; height: 25px;cursor: pointer;"
		        alt=""
		      />
		    </div>
		    <div class="left" style="width: 50%;">
			<div class="row2">
		      <div class="title">
		      <span>公告标题：</span>
		      </div>
		      <div class="right">
		         
		      </div>
		    </div>
		
			<div class="row2">
			  <div class="title">
			   <span>公告类型：</span>
			  </div>
			  <div class="right">
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			   <span>公告单位：</span>
			  </div>
			  <div class="right">
			  
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			  <span>公告发布时间：</span>
			  </div>
			  <div class="right" style="margin-left: 12px;">
		
			  </div>
			</div>
			<div class="row2" >
			  <div class="title">
			   <span>审核：</span>
			  </div>
			  <div class="right">
				<el-radio-group v-model="radio">
				    <el-radio :label="1">通过</el-radio>
				    <el-radio :label="2">驳回</el-radio>
				  </el-radio-group>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			   <span>审核意见：</span>
			  </div>
			  <div class="right">
				<el-input v-model="input" type="text" clearable placeholder="审核意见" style="width: 300px;"> </el-input>
			  </div>
			</div>
			  </div>
			  <div class="onRight" style="width:50%;">
		    <div class="row2">
		      <div class="title">
		        <p>排序：</p>
		      </div>
		      <div class="right">
		      </div>
		    </div>
		    <div class="row2">
		      <div class="title">
		      <span>备注：</span>
		      </div>
		      <div class="right">
	
		      </div>
		    </div>
			<div class="row2">
			  <div class="title">
			   <span>公告内容：</span>
			  </div>
			  <div class="right">
			  </div>
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
		<div class="maskTwo" @click="closeMask" v-if="detailShow==true">
		  <div class="table_box" @click.stop=""  style="display: flex; flex-wrap: wrap;">
		    <div class="top">
		      <p style="font-size: 20px">详情</p>
		      <img
		        @click="closeMask"
		        src="~assets/img/close.png"
		        style="width: 25px; height: 25px;cursor: pointer;"
		        alt=""
		      />
		    </div>
		    <div class="left" style="width: 50%;">
			<div class="row2">
		      <div class="title">
		      <span>公告类型：</span>
		      </div>
		      <div class="right">
		         
		      </div>
		    </div>
		
			<div class="row2">
			  <div class="title">
			   <span>公告标题：</span>
			  </div>
			  <div class="right">
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			   <span>公告单位：</span>
			  </div>
			  <div class="right">
			  
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			  <span>公告发布时间：</span>
			  </div>
			  <div class="right" style="margin-left: 12px;">
		
			  </div>
			</div>
			<div class="row2" >
			  <div class="title">
			   <span>备注：</span>
			  </div>
			  <div class="right">
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			   <span>审核人：</span>
			  </div>
			  <div class="right">
			  </div>
			</div>
			  </div>
			  <div class="onRight" style="width:50%;">
		    <div class="row2">
		      <div class="title">
		        <p>公告内容：</p>
		      </div>
		      <div class="right">
		      </div>
		    </div>
		    <div class="row2">
		      <div class="title">
		      <span>审核状态：</span>
		      </div>
		      <div class="right">
		      </div>
		    </div>
			<div class="row2">
			  <div class="title">
			   <span>审核意见：</span>
			  </div>
			  <div class="right">
			  </div>
			</div>
			</div>
		    <div class="btn">
		   
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
		<div class="mask" @click="closeMask" v-if="editShow==true">
		  <div class="table_box" @click.stop="">
		    <div class="top">
		      <p style="font-size: 20px">新增</p>
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
		        ><span>公告标题</span>
		      </div>
		      <div class="right">
		        <el-input
		          v-model="input1"
		          class="margin_right"
		          clearable
		          placeholder="公告标题"
		        >
		        </el-input>
		      </div>
		    </div>
			<div class="row2">
			  <div class="title">
			    <span style="color: red; margin-right: 5px; display: inline-block"
			      >* </span
			    ><span>公告发布时间</span>
			  </div>
			  <div class="right">
			     <el-date-picker
			       v-model="date1"
			       type="date"
			       placeholder="选择日期">
			     </el-date-picker>
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
			      v-model="input2"
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
			    ><span>项目id</span>
			  </div>
			  <div class="right">
			    <el-input
			      v-model="input3"
			      class="margin_right"
			      clearable
			      placeholder="项目id"
			    >
			    </el-input>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			    <span style="color: red; margin-right: 1px; display: inline-block"
			      >* </span
			    ><span>公告类型</span>
			  </div>
			  <div class="right" style="margin-left: 12px;">
			     <el-select v-model="value" placeholder="请选择" >
			       <el-option
			         v-for="item in options"
			         :key="item.value"
			         :label="item.label"
			         :value="item.value">
			       </el-option>
			     </el-select>
			  </div>
			</div>
		    <div class="row2">
		      <div class="title">
		        <p>备注</p>
		      </div>
		      <div class="right">
		        <el-input
		          type="textarea"
		          :rows="2"
		          placeholder="备注"
		          v-model="textarea"
		        >
		        </el-input>
		      </div>
		    </div>
		    <div class="row2">
		      <div class="title">
		        <span style="color: red; margin-right: 5px; display: inline-block"
		          >* </span
		        ><span>排序</span>
		      </div>
		      <div class="right">
		        <el-input-number
		          v-model="num"
		          @change="handleChange"
		          :min="1"
		          :max="10"
		          label=""
		        ></el-input-number>
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
		<div class="topBtn">
			<el-button type="primary" @click="add">新增</el-button>
			<!-- <el-button type="danger" style="margin-left: 30px;">删除</el-button> -->
		</div>
		<div class="contenTable">
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :cell-style="{
				    'text-align': 'center',
				    color: '#333',
				    'font-weight': '500',
				  }" :header-cell-style="{
				    color: '#606060',
				    background: '#f8f8f8',
				    'text-align': 'center',
				  }" @selection-change="handleSelectionChange">
				<el-table-column type="selection" min-width="50">
				</el-table-column>
				<el-table-column label="公告编号" min-width="100">
					<template slot-scope="scope">{{ scope.row.number }}</template>
				</el-table-column>
				<el-table-column prop="type" label="公告类型" min-width="100">
				</el-table-column>
				<el-table-column prop="title" label="公告标题" min-width="100">
				</el-table-column>
				<el-table-column prop="Company" label="公告单位" min-width="100">
				</el-table-column>
				<el-table-column prop="time" label="公告发布时间" min-width="100">
				</el-table-column>
				<el-table-column prop="rmks" label="备注" min-width="100">
				</el-table-column>
				<el-table-column prop="state" label="审核状态" min-width="100">
				</el-table-column>
				<el-table-column prop="opinion" label="审核意见" min-width="100">
				</el-table-column>
				<el-table-column label="操作" min-width="50">
					<template slot-scope="scope" >
						<p style="cursor: pointer;min-width: 30px; color:#409eff;" @click="toCheck(scope.row)" >审核</p>
						<p style="cursor: pointer; color:#409eff;" @click="toDetail(scope.row)">详情</p>
						<p style="cursor: pointer;color:#409eff;" @click="toEdit(scope.row)">编辑</p>
						<p style="cursor: pointer;color:red;" @click="toDelite(scope.$index)">删除</p>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				input1:'',
				input2:'',
				input3:'',
				date1:'',
				value:'',
				textarea:'',
				num:'',
				radio:2,
				addShow: false,//新增弹窗
				checkShow:false,//审核弹窗
				detailShow:false,//详情弹窗
				editShow:false,//编辑弹窗
				 options: [{
				          value: '选项1',
				          label: '结果公告'
				        }, {
				          value: '选项2',
				          label: '采购公告'
				        }, {
				          value: '选项3',
				          label: '更正公告'
				        }, ],
				        value: '',
				tableData: [{
					number: 'BHZC2021-G3-0001',
					type: '结果公告',
					title: '妙蛙种子',
					Company: '单位',
					time: '2021-9-28 18:00:00',
					rmks: '小火龙',
					state: '审核通过',
					opinion: '',

				}, {
					number: 'BHZC2021-G3-0001',
					type: '结果公告',
					title: '妙蛙种子',
					Company: '单位',
					time: '2021-9-28 18:00:00',
					rmks: '小火龙',
					state: '审核通过',
					opinion: '',
				}, {
					number: 'BHZC2021-G3-0001',
					type: '结果公告',
					title: '妙蛙种子',
					Company: '单位',
					time: '2021-9-28 18:00:00',
					rmks: '小火龙',
					state: '审核通过',
					opinion: '',
				}, {
					number: 'BHZC2021-G3-0001',
					type: '结果公告',
					title: '妙蛙种子',
					Company: '单位',
					time: '2021-9-28 18:00:00',
					rmks: '小火龙',
					state: '等待审核',
					opinion: '',
				}, ],
				multipleSelection: [],
			}
		},
		methods: {
			handleSelectionChange(val) {
				this.multipleSelection = val
			},
			toCheck(val) {
				this.checkShow=true
			},
			toDetail(val){
				this.detailShow=true
			},
			toEdit(val){
			  this.editShow=true	
			},
			toDelite(index){
				console.log(index);
				this.tableData.splice(index,1)
			},
			add() {
				this.addShow = true
			},
			closeMask(){
				this.addShow=false	
				this.checkShow=false
				this.detailShow=false
				this.editShow=false
			},
			
		}
	}
</script>

<style lang="less" scoped>
	.content {
		padding: 10px 20px;
		height: 690px !important;
		background-color: #ffffff;
		box-sizing: border-box;
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
		.maskTwo {
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
			
			
		    .top {
		      display: flex;
		      width: 100%;
		      justify-content: space-between;
		    }
		
		    .row2 {
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
		.topBtn {
			display: flex;

		}

		.contenTable {
			margin-top: 30px;
		}
	}
</style>
