<template>
  <!-- 签到 -->
  <!-- max-height: 524px; overflow-y: scroll -->
  <div style="max-width: 100%" class="abc">
    <el-table
      max-height="524"
      :data="tableData"
      style="width: 100%"
      :cell-style="{
        'text-align': 'center',
        color: '#333',
        'font-weight': '500',
      }"
      :header-cell-style="{
        color: '#606060',
        background: '#f8f8f8',
        'text-align': 'center',
      }"
    >
      <el-table-column type="index" label="序号" min-width="62">
      </el-table-column>
      <el-table-column prop="cd" label="项目编号" min-width="146">
      </el-table-column>
      <el-table-column prop="nm" label="项目名称" min-width="146">
      </el-table-column>
      <el-table-column label="采购单位" min-width="146">
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row.orgItems" :key="index">
            {{ item.orgNm }}
            <span style="color: red">(未签到)</span>
            <span v-show="item.signinStatus == 1">(已签到)</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="评标专家" min-width="146">
        <template slot-scope="scope">
          <div
            style="margin-top: 0px"
            v-for="(item, index) in scope.row.subItems"
            :key="index"
          >
            {{ item.realNm }}
            <span
              v-if="item.signinStatus == 0"
              style="
                width: 50px;
                height: 18px;
                background: red;
                border-radius: 9px;
                color: #fff;
                text-align: center;
                line-height: 18px;
                margin-left: 5px;
                display: inline-block;
              "
              >未签到</span
            >
            <span v-else>（已签到）</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="bidOpenTm" label="开标时间" min-width="146">
      </el-table-column>
      <el-table-column label="状态" min-width="146">
        <template slot-scope="scope">
          <div style="color: #39a520">· 评标中</div>
          <!-- <div v-if="scope.row.status == 2" style="color: 'pink'">已完成</div> -->
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="62">
        <template slot-scope="scope">
          <el-button
            style="color: #2778be"
            @click="toDetail(scope.row.id)"
            type="text"
            size="small"
            >查看</el-button
          >
          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template></el-table-column
      ></el-table
    >
    <!-- 分页 -->
    <div class="Footer">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="pageNo"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import bus from "@/bus.js";

export default {
  data() {
    return {
      tableData: [],
      // 每页显示条数
      pageSize: 10,
      total: 0,
      // 当前页
      pageNo: 1,
      SearchInfo: {
        cd: "", //编号
        nm: "", //项目名称
        purchasingUnit: "", //采购单位
        expertIds: "", //专家id
        expertNm: "", //专家
        procurementMethodCd: "", //采购方式
        procurementMethodNm: "", //采购方式
      },
    };
  },

  methods: {
    toDetail(id) {
      this.toPage("/views/index/onlineBidEvaDetail.html?id=" + id);
    },
    //页面跳转
    toPage(url) {
      this.until.href(url);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.getList();
    },
    async getList() {
      console.log("子组件", this.SearchInfo);
      let qry = this.query.new();
      this.query.toO(qry, "crtTm", "desc");
      this.query.toP(qry, this.pageNo, this.pageSize);
      if (this.SearchInfo.cd) {
        this.query.toW(qry, "cd", this.SearchInfo.cd, "LK");
      }
      if (this.SearchInfo.nm) {
        this.query.toW(qry, "nm", this.SearchInfo.nm, "LK");
      }
      if (this.SearchInfo.purchasingUnit) {
        this.query.toW(
          qry,
          "purchasingUnit",
          this.SearchInfo.purchasingUnit,
          "LK"
        );
      }
      if (this.SearchInfo.procurementMethodCd) {
        this.query.toW(
          qry,
          "procurementMethodCd",
          this.SearchInfo.procurementMethodCd,
          "LK"
        );
      }
      let date = this.until.formatTime(new Date());
      this.query.toW(qry, "bidOpenTm", date, "lt");
      this.query.toWNull(qry, "bidColseTm");
      // 选取列表
      let data = await this.api.onlineBidList(
        this.query.toEncode(qry),
        this.SearchInfo.expertNm
      );
      this.tableData = data.data.list;
      this.total = data.page.total;
      console.log(1111111, data);
    },
  },
  created() {
    bus.$on("SignSearch", (data) => {
      this.SearchInfo = data;
      this.getList();
    });
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.Footer {
  display: flex;
  justify-content: center;
  margin: 10px 0 10px;
}
</style>