<template>
	<div class="content">
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
			<el-button  type="primary">查询</el-button>
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
				<el-table-column prop="date" label="项目区划" min-width="50">
				</el-table-column>
				<el-table-column prop="name" label="项目编号" min-width="150">
				</el-table-column>
				<el-table-column prop="address" label="项目名称" min-width="150">
				</el-table-column>
				<el-table-column prop="address" label="联系人" min-width="100">
				</el-table-column>
				<el-table-column prop="address" label="采购方式" min-width="100">
				</el-table-column>
				<el-table-column prop="address" label="预算金额(万元)" min-width="100">
				</el-table-column>
				<el-table-column prop="address" label="创建时间" min-width="150">
				</el-table-column>
				<el-table-column prop="address" label="投标开始时间" min-width="100">
				</el-table-column>
				<el-table-column prop="zhuangtai" label="状态" min-width="100">
					<template slot-scope="scope">
						<span v-if="scope.row.zhuangtai=='待审批'" style="color: #E4393C;">
							待审批
						</span>
						<span v-if="scope.row.zhuangtai=='已审批'" style="color: #2778BE;">
							已审批
						</span>
	
					</template>
				</el-table-column>
				<el-table-column label="操作" min-width="50">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						<br>
						<el-button type="text" size="small" style=" background: #2778BE;color: #ffffff; border-radius: 2px;width: 50px;" >审核</el-button>
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
</template>

<script>
	export default{
		data(){
			return{
				tableData: [{
					date: '宁波市本级',
					name: 'BHZC2021-G3-0001',
					address: '12米玻璃钢新型渔船',
					zhuangtai: '待审批'
				}, {
					date: '宁波市本级',
					name: 'BHZC2021-G3-0001',
					address: '12米玻璃钢新型渔船',
					zhuangtai: '待审批'
				}, {
					date: '宁波市本级',
					name: 'BHZC2021-G3-0001',
					address: '12米玻璃钢新型渔船',
					zhuangtai: '待审批'
				}, {
					date: '宁波市本级',
					name: 'BHZC2021-G3-0001',
					address: '12米玻璃钢新型渔船',
					zhuangtai: '待审批'
				}],
			}
		},
		methods:{
			handleClick(row){
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		margin-top: 10px;
		height:678px;
		background-color: #ffffff;
		width: 100%;
	
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
</style>
