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
		          v-model="title"
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
			       v-model="releTm"
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
			      v-model="detailName"
			      class="margin_right"
			      clearable
			      placeholder="项目名称"
				  disabled="true"
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
			      v-model="detailId"
			      class="margin_right"
			      clearable
			      placeholder="项目id"
				   disabled="true"
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
			     <el-select v-model="value"  value-key="nm" placeholder="请选择公告类型"  @change="select1">
			       <el-option
			         v-for="item in options"
			         :key="item.id"
			         :label="item.nm"
			         :value="item">
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
		          type="text"
		          placeholder="备注"
		          v-model="rmks"
				 
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
		          v-model="seq"
		          @change="handleChange"
		          :min="1"
		       
		          label=""
		        ></el-input-number>
		      </div>
		    </div>
			<div class="row2">
			  <div class="title">
				  <span style="color: red; margin-right: 5px; display: inline-block"
				    >* </span
				  >
			    <span>公告内容</span>
			  </div>
			  <div class="right" style="width: 80%;">
			<MyEditor ref="myEditor"></MyEditor>
						
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
		        @click="addSure"
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
		         {{detailInfo.title}}
		      </div>
		    </div>
		
			<div class="row2">
			  <div class="title">
			   <span>公告类型：</span>
			  </div>
			  <div class="right">
				{{detailInfo.afficheTypeNm}}
			  </div>
			</div>
			
			<div class="row2">
			  <div class="title">
			  <span>公告发布时间：</span>
			  </div>
			  <div class="right" >
				{{detailInfo.releTm}}
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
				<el-input v-model="opinion" type="text" clearable placeholder="审核意见" style="width: 300px;"> </el-input>
			  </div>
			</div>
			  </div>
			  <div class="onRight" style="width:50%;">
		    <div class="row2">
		      <div class="title">
		        <p>排序：</p>
		      </div>
		      <div class="right">
				  {{detailInfo.seq}}
		      </div>
		    </div>
		    <div class="row2">
		      <div class="title">
		      <span>备注：</span>
		      </div>
		      <div class="right">
				{{detailInfo.rmks}}
		      </div>
		    </div>
			<div class="row2">
			  <div class="title">
			   <span>公告内容：</span>
			  </div>
			  <div class="right" v-html="detailInfo.cont">
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
		        @click="sureTo"
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
		         {{detailInfo.afficheTypeNm}}
		      </div>
		    </div>
		
			<div class="row2">
			  <div class="title">
			   <span>公告标题：</span>
			  </div>
			  <div class="right">
				  {{detailInfo.title}}
			  </div>
			</div>
	
			<div class="row2">
			  <div class="title">
			  <span>公告发布时间：</span>
			  </div>
			  <div class="right" >
					{{detailInfo.releTm}}
			  </div>
			</div>
			<div class="row2" >
			  <div class="title">
			   <span>备注：</span>
			  </div>
			  <div class="right">
				  {{detailInfo.rmks}}
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			   <span>审核人：</span>
			  </div>
			  <div class="right">
				  {{detailInfo.auditBy}}
			  </div>
			</div>
			  </div>
			  <div class="onRight" style="width:50%;">
		    <div class="row2">
		      <div class="title">
		        <p>公告内容：</p>
		      </div>
		      <div class="right"  v-html="detailInfo.cont">
		      </div>
		    </div>
		    <div class="row2">
		      <div class="title">
		      <span>审核状态：</span>
		      </div>
		      <div class="right" v-if="detailInfo.audit==1">
				  等待审核
		      </div>
			  <div class="right" v-if="detailInfo.audit==2">
					审核通过
			  </div>
			  <div class="right" v-if="detailInfo.audit==3">
			  		审核驳回
			  </div>
		    </div>
			<div class="row2">
			  <div class="title">
			   <span>审核意见：</span>
			  </div>
			  <div class="right">
				  {{detailInfo.options}}
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
		      <p style="font-size: 20px">编辑</p>
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
			      v-model="title"
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
			       v-model="releTm"
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
			      v-model="detailName"
			      class="margin_right"
			      clearable
			      placeholder="项目名称"
				  disabled="true"
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
			      v-model="detailId"
			      class="margin_right"
			      clearable
			      placeholder="项目id"
				   disabled="true"
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
			     <el-select v-model="value"  value-key="nm" placeholder="请选择公告类型"  @change="select1">
			       <el-option
			         v-for="item in options"
			         :key="item.id"
			         :label="item.nm"
			         :value="item">
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
			      type="text"
			      placeholder="备注"
			      v-model="rmks"
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
			      v-model="seq"
			      @change="handleChange"
			      :min="1"
			   
			      label=""
			    ></el-input-number>
			  </div>
			</div>
			<div class="row2">
			  <div class="title">
			    <span>公告内容</span>
			  </div>
			  <div class="right" style="width: 80%;">
			<MyEditor ref="myEditor"></MyEditor>
						
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
		        @click="updTo"
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
				  }"
				   @selection-change="handleSelectionChange">
				<el-table-column type="index" min-width="50">
				</el-table-column>
				<el-table-column label="公告编号" min-width="100">
					<template slot-scope="scope">{{ scope.row.afficheTypeCd }}</template>
				</el-table-column>
				<el-table-column prop="afficheTypeNm" label="公告类型" min-width="100">
				</el-table-column>
				<el-table-column prop="title" label="公告标题" min-width="100">
				</el-table-column>
				<el-table-column prop="releTm" label="公告发布时间" min-width="100">
				</el-table-column>
				<el-table-column prop="rmks" label="备注" min-width="100">
				</el-table-column>
				<el-table-column  label="审核状态" min-width="100" >
					<template slot-scope="scope" >
						<p v-if="scope.row.audit==1" style="color: #f56c6c;">等待审核</p>
						<p v-if="scope.row.audit==2" style="color: #67c23a;">审核通过</p>
						<p v-if="scope.row.audit==3" style="color: red;">审核驳回</p>
					</template>
				</el-table-column>
				<el-table-column prop="options" label="审核意见" min-width="100">
				</el-table-column>
				<el-table-column label="操作" min-width="50">
					<template slot-scope="scope" >
						<p style="cursor: pointer;min-width: 30px; color:#409eff;" @click="toCheck(scope.row)" >审核</p>
						<p style="cursor: pointer; color:#409eff;" @click="toDetail(scope.row)">详情</p>
						<p style="cursor: pointer;color:#409eff;" @click="toEdit(scope.row)">编辑</p>
						<p style="cursor: pointer;color:red;" @click="toDelite(scope.row)">删除</p>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import MyEditor from '@/components/myEditor'
	
	export default {
		data() {
			return {
				input1:'',
				input2:'',
				input3:'',
				date1:'',
				value:'',
				value1:'',
				rmks:'',
				textarea:'',
				num:'',
				seq:'',
				radio:1,
				title:'',
				releTm:'',
				opinion:'',
				afficheTypeCd:'',//公告类型id
				afficheTypeNm:'',//公告类型nm
				addShow: false,//新增弹窗
				checkShow:false,//审核弹窗
				detailShow:false,//详情弹窗
				editShow:false,//编辑弹窗
				 options: [ ],
				 optionsTwo:[],
				 value: '',
				tableData: [],
				multipleSelection: [],
				detailInfo:{
				}
			}
		},
		components:{
			MyEditor
		},
		props:{
			detailId: {
				type: Number,
				default: "0",
			},
			detailName:{
				type: String,
				default: "0",
			}
		},
		mounted() {
			this.getList()
			this.api.getCatListByPcd({cd:'ANNOUNCEMENT_TYPE'}).then(res=>{
				this.options=res.list
			})
		},
		methods: {
			getList(){
				let query=this.query.new()
				this.query.toW(query,'bidId',this.detailId,'EQ')
				this.query.toO(query,'seq','asc')
				this.api.getBidAffichePage(this.query.toEncode(query)).then(res=>{
					this.tableData=res.data.list
				})
			},
			handleSelectionChange(val) {
				this.multipleSelection = val
			},
			toCheck(val) {	
				this.checkShow=true
				this.api.getBidAfficheDetail(val.id).then(res=>{
					this.detailInfo=res
				})
			},
			toDetail(val){
				this.detailShow=true
				this.api.getBidAfficheDetail(val.id).then(res=>{
					this.detailInfo=res
				})
			},
			toEdit(val){
			  this.editShow=true	
			  this.api.getBidAfficheDetail(val.id).then(res=>{
				  this.detailInfo=res
				  this.title=res.title
				  this.releTm=res.releTm
				  this.value=res.afficheTypeNm
				  this.afficheTypeCd=res.afficheTypeCd,
				  this.afficheTypeNm=res.afficheTypeNm,
				  this.rmks=res.rmks
				  this.seq=res.seq
				  this.$refs.myEditor.msg=res.cont
				  
			  })
			},
			toDelite(val){
				this.$confirm("确认删除?", "提示", {
				  confirmButtonText: "确定",
				  cancelButtonText: "取消",
				  type: "warning",
				})
				  .then(() => {
				    return this.api.getBidAfficheDel({ids:val.id})
				  })
				  .catch(() => {
				    this.$message({
				      type: "info",
				      message: "已取消删除",
				    });
				  })
				  .then((res) => {
					  console.log('11',res);
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
			add() {
				this.addShow = true
			},
			closeMask(){
				this.addShow=false	
				this.checkShow=false
				this.detailShow=false
				this.editShow=false
				this.afficheTypeNm=''
				this.afficheTypeCd=''
				this.title=''
				this.releTm=''
				this.rmks=''
				this.value=''
			},
			addSure(){
				if(!this.title){
					this.$message({
						type: "error",
						message: "公告标题不能为空",
					});
					return false
				}
				if(!this.releTm){
					this.$message({
						type: "error",
						message: "公告发布时间不能为空",
					});
					return false
				}
				if(!this.afficheTypeCd){
					this.$message({
						type: "error",
						message: "公告类型不能为空",
					});
					return false
				}
				if(!this.$refs.myEditor.msg){
					this.$message({
						type: "error",
						message: "公告内容不能为空",
					});
					return false
				}
				
				let obj={
					bidId:this.detailId,
					afficheTypeCd:this.afficheTypeCd,
					afficheTypeNm:this.afficheTypeNm,
					title:this.title,
					releTm:this.releTm,
					cont:this.$refs.myEditor.msg,
					rmks:this.rmks,
				}
				this.api.postBidAffiche(obj).then(res=>{
					this.closeMask()
					this.getList()
				})
				
			},
			select1(val){
				this.afficheTypeNm=val.nm
				this.afficheTypeCd=val.id
			},
			handleChange(val){
				this.seq=val
			},
			sureTo(){
				let obj={
					id:this.detailInfo.id,
					audit:this.radio+1,
					options:this.opinion
				}
				this.api.postBidAfficheExamine(obj)
				this.checkShow=false
				this.radio=1
				this.opinion=''
			},
			updTo(){
				let obj={
					id:this.detailInfo.id,
					bidId:this.detailId,
					afficheTypeCd:this.afficheTypeCd,
					afficheTypeNm:this.afficheTypeNm,
					title:this.title,
					releTm:this.releTm,
					cont: this.$refs.myEditor.msg,
					rmks:this.rmks,
					seq:this.seq,
				}
				this.api.postBidAfficheUpd(obj).then(res=>{
					this.closeMask()
					this.getList()
				})
			}
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
		  height: 100%;
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
