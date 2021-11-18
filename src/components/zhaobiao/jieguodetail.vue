<template>
  <!-- 评定详情 -->
  <div id="mask" @click="closeMask">
    <div class="table_box" @click.stop="">
      <div class="top">
        <p style="font-size: 20px; color: #636e72">详情</p>
        <img
          @click="closeMask"
          src="~assets/img/close.png"
          style="width: 25px; height: 25px; cursor: pointer"
          alt=""
        />
      </div>
      <div class="info">
        <div class="infoItem">
          招标项目: <span style="margin-left: 5px">{{ detailData.bidNm }}</span>
        </div>
        <div class="infoItem">
          投标机构: <span style="margin-left: 5px">{{ detailData.orgNm }}</span>
        </div>
        <div class="infoItem rightItem">
          报价金额:
          <span style="margin-left: 5px">{{ detailData.offerAmt }}</span>
        </div>
        <div class="infoItem">
          报价时间:
          <span style="margin-left: 5px">{{ detailData.offerTm }}</span>
        </div>
        <div class="infoItem">
          专家账号:
          <span style="margin-left: 5px">{{ detailData.username }}</span>
        </div>
        <div class="infoItem rightItem">
          专家姓名:
          <span style="margin-left: 5px">{{ detailData.realNm }}</span>
        </div>
        <div class="infoItem">
          满分分数:
          <span style="margin-left: 5px">{{ detailData.fullScore }}</span>
        </div>
        <div class="infoItem">
          总得分: <span style="margin-left: 5px">{{ detailData.score }}</span>
        </div>
      </div>

      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        style="width: 810px; margin-top: 10px"
        border
        :cell-style="{
          'text-align': 'center',
          color: '#333',
          'font-weight': '500',
        }"
        :header-cell-style="{
          color: '#606060',
          'text-align': 'center',
        }"
      >
        <!-- <el-table-column type="selection" min-width="50"> </el-table-column> -->
        <el-table-column
          label="评定指标"
          prop="svsItemNm"
          sortable
          min-width="162"
        >
        </el-table-column>
        <el-table-column
          prop="weight"
          label="评定权重"
          sortable
          min-width="162"
        >
        </el-table-column>
        <el-table-column
          prop="fullScore"
          label="本项满分分数"
          sortable
          min-width="162"
        >
        </el-table-column>
        <el-table-column
          prop="score"
          label="小组成员评分"
          sortable
          min-width="162"
        >
        </el-table-column>
        <el-table-column
          prop="weightedScore"
          label="加权得分"
          sortable
          min-width="162"
        >
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
      <div class="btn2">
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
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageNo: 1,
      pageSize: 5,
      total: 0,
      ids: "",
      tableData: [],
    };
  },
  props: {
    bWidth: {
      type: Number,
      default: 0,
    },
    id: { default: "", type: Number },
    detailData: { default: {}, type: Object },
  },
  methods: {
    closeMask() {
      this.$parent.showDetail = false;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.getList();
    },
    async getList() {
      let query = {
        r: [
          {
            n: "a1",
            t: "and",
            w: [{ k: "svsResultId", v: "", m: "LK" }],
          },
        ],
        o: [{ k: "weight", t: "asc" }],
        p: { n: 1, s: 5 },
      };
      query.p.n = this.pageNo;
      query.p.s = this.pageSize;
      query.r[0].w[0].v = this.id;
      // 选取列表
      let data = await this.api.reviewResultDetail(
        encodeURIComponent(JSON.stringify(query))
      );
      this.tableData = data.data.list;
      this.total = data.page.total;
    },
    // 删除评定指标子列表项
    DelSonItem(ids) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return this.api.delEvaStandardSonitem({ ids });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        })
        .then((res) => {
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
    EditEvaStandard(id) {
      console.log("修改id", id);
      this.showEvaMagRule = true;
      this.editId = id.toString();
      this.type = 2;
    },
    // 多选框选中项变化
    handleSelectionChange(val) {
      if (val.length != 0) {
        this.isDel = true;
      } else {
        this.isDel = false;
      }
      let ids = val.map((item) => item.id);
      this.ids = ids.join(",");
    },
    // 新增子列表项
    newSonItem() {
      this.showEvaMagRule = true;
      this.type = 1;
    },
  },
  components: {},
  async mounted() {
    let { bWidth, width } = this.until.getWidth();
    //   this.bWidth = bWidth;
    this.width = width;
    this.getList();
  },
};
</script>

<style lang="less" scoped>
#mask {
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
    width: 875px;
    max-height: 667px;
    overflow-y: scroll;
    background: #fff;
    padding: 30px;
    box-sizing: border-box;

    .top {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .info {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      .infoItem {
        font-size: 14px;
        color: rgb(96, 98, 102);
        padding: 10px;
        box-sizing: border-box;
        text-align: center;
        width: 35%;
      }
      .rightItem {
        width: 30%;
        text-align: center;
      }
    }
    .row1 {
      font-size: 15px;
      margin-left: 30px;
      margin-bottom: 30px;
      color: #7f8c8d;
    }
    .row2 {
      height: 40px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
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
    .Footer {
      display: flex;
      justify-content: center;
      margin: 44px 0 20px;
    }
    .btn2 {
      float: right;
    }
  }
  // #son_mask {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   width: 100vw;
  //   height: 100vh;
  //   background: rgba(0, 0, 0, 0.5);
  //   z-index: 60;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  // }
}
</style>
