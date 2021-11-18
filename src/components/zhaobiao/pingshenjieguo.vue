<template>
  <div class="right_content1">
    <!-- 评定标准项管理
    <magEvaluateStandard
      :id="id"
      v-if="showMagEvaluateStandard"
    ></magEvaluateStandard> -->

    <!-- 评定详情 -->
    <jieguodetail
      :id="id"
      v-if="showDetail"
      :detailData="detailData"
    ></jieguodetail>

    <div class="table_box">
      <el-table
        max-height="500"
        @selection-change="handleSelectionChange"
        :data="tableData"
        style="width: 100%"
        border
        :cell-style="{
          'text-align': 'center',
          color: '#333',
          'font-weight': '500',
          'font-size': '13px',
          height: '36px',
        }"
        :header-cell-style="{
          color: '#606060',
          'text-align': 'center',
        }"
      >
        <el-table-column type="selection" min-width="48"> </el-table-column>
        <el-table-column
          label="招标项目"
          show-overflow-tooltip="true"
          prop="bidNm"
          sortable
          min-width="75"
        >
        </el-table-column>
        <el-table-column
          label="投标机构"
          show-overflow-tooltip="true"
          prop="orgNm"
          sortable
          min-width="75"
        >
        </el-table-column>
        <el-table-column
          label="报价金额"
          show-overflow-tooltip="true"
          prop="offerAmt"
          sortable
          min-width="75"
        >
        </el-table-column>
        <el-table-column
          label="报价时间"
          show-overflow-tooltip="true"
          prop="offerTm"
          sortable
          min-width="75"
        >
        </el-table-column>
        <el-table-column
          label="专家账号"
          show-overflow-tooltip="true"
          prop="username"
          sortable
          min-width="75"
        >
        </el-table-column>
        <el-table-column
          label="专家姓名"
          show-overflow-tooltip="true"
          prop="realNm"
          sortable
          min-width="75"
        >
        </el-table-column>
        <el-table-column
          label="满分分数"
          show-overflow-tooltip="true"
          prop="fullScore"
          sortable
          min-width="75"
        >
        </el-table-column>
        <el-table-column
          label="总得分"
          show-overflow-tooltip="true"
          prop="score"
          sortable
          min-width="75"
        >
        </el-table-column>
        <el-table-column
          label="得分详情"
          show-overflow-tooltip="true"
          prop="detail"
          sortable
          min-width="75"
        >
        </el-table-column>
        <el-table-column label="查看评定详情" sortable min-width="75">
          <template slot-scope="scope">
            <div
              @click="toDetail(scope.row.id, scope.row)"
              style="
                text-align: center;
                background: #409eff;
                color: #fff;
                border: none;
                width: 100%;
                height: 36px;
                line-height: 36px;
                cursor: pointer;
              "
            >
              查看评定详情
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="company"
          label="是否有效"
          sortable
          min-width="75"
        >
          <template slot-scope="scope">
            <div
              style="
                margin: 0 auto;
                background: #f0f9eb;
                color: #91c35b;
                border: none;
                width: 50px;
                height: 30px;
                line-height: 30px;
              "
              v-show="scope.row.status == 1"
            >
              有效
            </div>
            <div
              style="
                margin: 0 auto;
                background: pink;
                color: red;
                border: none;
                width: 50px;
                height: 30px;
                line-height: 30px;
              "
              v-show="scope.row.status == 0"
            >
              无效
            </div>
          </template>
        </el-table-column>
    
      </el-table>
      <!-- 分页 -->
      <div class="Footer">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/bus.js";
import jieguodetail from './jieguodetail.vue'
export default {
  data() {
    return {
      bidId: "",
      isDel: false,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      input: "",
      tableData: [],
      ids: "",
      id: "",
      type: 0,
      showDetail: false,
      showEdit: false,
      SearchInfo: {
        bidNm: "", //招标项目
        orgNm: "", //投标机构
        username: "", //专家账号
        realNm: "", //专家姓名
        status: "", //是否有效
      },
      detailData: {},
    };
  },
  props:{
	     detailId: {
	     	type: String,
	     	default: "0",	
	     }
  },
  computed: {},
  components: {  },
  created() {
    // 定义事件,注意箭头函数应用
 
  },

  async mounted() {
	  this.bidId=this.detailId
    this.getList();
  },
  
  methods: {
    //页面跳转
    toPage(url) {
      this.until.href(url);
    },
	toDetail(id,item){
		this.showDetail = true;
		this.id = id;
		this.detailData = item;
	},
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.getList();
    },
    async getList() {
      let qry = this.query.new();
      this.query.toP(qry, this.pageNo, this.pageSize);
      this.query.toO(qry, "crtTm", "desc");
      this.query.toW(qry, "id", this.bidId, "EQ");
      // if(this.SearchInfo.bidNm) {
      //  this.query.toW(qry, "bidNm", this.SearchInfo.bidNm, "LK");
      // }
 
      // 选取列表
      let data = await this.api.getBidPage(this.query.toEncode(qry));
      this.tableData = data.data.list;
	  console.log('8899',this.tableData);
      // if (this.tableData.length > 0) {
      //   this.tableData.forEach((item) => {
      //     item.score = item.score.toFixed(2);
      //     item.fullScore = item.score.toFixed(2);
      //   });
      // }
      this.total = data.page.total;
    },

   
   
   
    
  
    
  },
};
</script>
<style lang="less" scoped>
#home {
  .tableHeader {
    background: @themeColor;
    color: #fff;
    border: 0;
    text-align: center;
  }
  .rowList {
    padding: 20px 0;
  }
}
</style>
<style lang="less" scoped>
.right_content1 {
  margin-top: 10px;
  box-sizing: border-box;
  //   padding: 20px;
  // height: 740px;
  background: #fff;
  .condition_box {
    height: 40px;
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    .el-input {
      width: 202px;
    }
    .btn {
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      border-radius: 5px;
    }
    .margin_right {
      margin-right: 15px;
    }
  }
  .table_box::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .table_box {
    width: 100%;
    // max-height: 524px;
    // overflow-y: auto;
    // overflow-x: hidden;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }
  .Footer {
    display: flex;
    justify-content: center;
    margin: 44px 0 20px;
  }
}
</style>
