<template>
	<div class="content">
		<div class="topBtn">
				 <el-button type="primary" @click="deleteList">新增</el-button>
				<el-button type="danger" style="margin-left: 30px;" >删除</el-button>
		</div>
		<div class="contenTable">
			
		
		  <el-table
		    ref="multipleTable"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%"
			:cell-style="{
				    'text-align': 'center',
				    color: '#333',
				    'font-weight': '500',
				  }" :header-cell-style="{
				    color: '#606060',
				    background: '#f8f8f8',
				    'text-align': 'center',
				  }"
		    @selection-change="handleSelectionChange">
		    <el-table-column
		      type="selection"
		   min-width="50">
		    </el-table-column>
		    <el-table-column
		      label="公告编号"
		      min-width="100">
		      <template slot-scope="scope">{{ scope.row.number }}</template>
		    </el-table-column>
		    <el-table-column
		      prop="type"
		      label="公告类型"
		     min-width="100">
		    </el-table-column>
		    <el-table-column
		      prop="title"
		      label="公告标题"
		      min-width="100">
		    </el-table-column>
			<el-table-column
			  prop="Company"
			  label="公告单位"
			  min-width="100">
			</el-table-column>
			<el-table-column
			  prop="time"
			  label="公告发布时间"
			  min-width="100">
			</el-table-column>
			<el-table-column
			  prop="rmks"
			  label="备注"
			  min-width="100">
			</el-table-column>
			<el-table-column
			  prop="state"
			  label="审核状态"
			  min-width="100">
			</el-table-column>
			<el-table-column
			  prop="opinion"
			  label="审核意见"
			  min-width="100">
			</el-table-column>
			<el-table-column
			  
			  label="操作"
			  min-width="70">
			   <template slot-scope="scope">
				   <span>审核</span>
				   <span>详情</span>
				   <span>编辑</span>
				   <span>删除</span>
			   </template>
			</el-table-column>
		  </el-table>
		  </div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				 tableData: [{
				          number:'BHZC2021-G3-0001',
				          type: '结果公告',
				          title: '妙蛙种子',
						  Company:'单位',
						  time:'2021-9-28 18:00:00',
						  rmks:'小火龙',
						  state:'审核通过',
						  opinion:'',
						  
				        }, {
				          number:'BHZC2021-G3-0001',
						type: '结果公告',
				          title: '妙蛙种子',
						   Company:'单位',
						   time:'2021-9-28 18:00:00',
						     rmks:'小火龙',
							 state:'审核通过',
							 opinion:'',
				        }, {
				          number:'BHZC2021-G3-0001',
				         type: '结果公告',
				          title: '妙蛙种子',
						   Company:'单位',
						   time:'2021-9-28 18:00:00',
						     rmks:'小火龙',
							 state:'审核通过',
							 opinion:'',
				        }, {
				          number:'BHZC2021-G3-0001',
				         type: '结果公告',
				          title: '妙蛙种子',
						   Company:'单位',
						   time:'2021-9-28 18:00:00',
						     rmks:'小火龙',
							 state:'等待审核',
							 opinion:'',
				        }, ],
						 multipleSelection: [],
			}
		},
		methods:{
			handleSelectionChange(val){
				console.log('111',val);
				this.multipleSelection=val
			}
		}
	}
</script>

<style lang="less" scoped>
	.content{
		padding: 10px 20px;
		height:678px;
		background-color: #ffffff;
		box-sizing: border-box;
		.topBtn{
			display: flex;
			
		}
		.contenTable{
			margin-top: 30px;
		}
	}
</style>
