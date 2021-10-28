<template>
  <!-- 新增开标选取规则 -->
  <div id="mask" @click="closeMask">
    <div
      class="table_box"
      :style="{ width: bWidth - 300 + 'px' }"
      @click.stop=""
    >
      <div class="top">
        <p style="font-size: 20px; color: #636e72">评定指标项管理</p>
        <img
          @click="closeMask"
          src="~assets/img/close.png"
          style="width: 25px; height: 25px; cursor: pointer"
          alt=""
        />
      </div>
      <div class="row1">评定指标名称：{{ title }}</div>
      <div class="row2">
        <el-input
          placeholder="评议指标"
          style="margin-right: 10px; width: 202px"
          v-model="serachValue"
          clearable
        >
        </el-input>
        <button
          class="btn margin_right"
          style="border: 1px solid #e0e0e0; cursor: pointer"
          @click="Search"
        >
          查询
        </button>
        <button
          class="btn margin_right"
          style="
            background: #409eff;
            color: #fff;
            border: none;
            cursor: pointer;
          "
          @click="newSonItem"
        >
          新增
        </button>
        <el-button
          :disabled="!isDel"
          class="btn margin_right"
          :style="{
            background: isDel ? 'red' : '#fab6b6',
            color: '#fff',
            border: 'none',
          }"
          @click="DelSonItem(ids)"
        >
          删除
        </el-button>
        <!-- <button class="btn margin_right" style="border: 1px solid #e0e0e0">
          导出
        </button> -->
      </div>
      <el-table
      max-height="524"
        @selection-change="handleSelectionChange"
        :data="tableData"
        style="width: 100%; margin-top: 10px"
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
        <el-table-column type="selection" min-width="48"> </el-table-column>
        <el-table-column label="评定指标" prop="nm" sortable min-width="183">
        </el-table-column>
        <el-table-column
          prop="weight"
          label="指标权重"
          sortable
          min-width="160"
        >
        </el-table-column>
        <el-table-column
          prop="fullScore"
          label="本项满分标准"
          sortable
          min-width="160"
        >
        </el-table-column>
        <el-table-column prop="tips" label="评分说明" sortable min-width="187">
        </el-table-column>
        <el-table-column prop="norm" label="评分标准" sortable min-width="187">
        </el-table-column>
        <el-table-column prop="seq" label="排序(正序)" sortable min-width="127">
        </el-table-column>
        <el-table-column label="操作" min-width="96">
          <template slot-scope="scope">
            <i
              class="el-icon-edit"
              style="color: #409eff; margin-right: 10px; cursor: pointer"
              @click="EditEvaStandard(scope.row.id)"
            ></i>
            <i
              @click="DelSonItem(scope.row.id)"
              class="el-icon-delete"
              style="color: #409eff; cursor: pointer"
            ></i>
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
    <div>
      <!-- 新增同一评定标准->管理规则 -->
      <newEvaluateManageRule
        v-if="showEvaMagRule"
        :svsId="id"
        :editId="editId"
        :type="type"
        @SaveAndUpdate="getList"
      ></newEvaluateManageRule>
    </div>
  </div>
</template>

<script>
import newEvaluateManageRule from "components/openBid/newEvaluateManageRule.vue";
export default {
  data() {
    return {
      // 默认为0，编辑为2
      type: 0,
      editId: "",
      title: "",
      num: 1,
      value: "",
      serachValue: "",
      textarea: "",
      pageNo: 1,
      pageSize: 10,
      total: 0,
      ids: "",
      isDel: false,
      showEvaMagRule: false,
      options: [
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      tableData: [],
    };
  },
  props: {
    bWidth: {
      type: Number,
      default: 0,
    },
    id: { default: "", type: String },
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    closeMask() {
      this.$parent.showMagEvaluateStandard = false;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.getList();
    },
    Search() {
      this.getList();
    },
    async getList() {
      let query = {
        r: [
          {
            n: "a1",
            t: "and",
            w: [
              { k: "svsId", v: "", m: "LK" },
              { k: "nm", v: "", m: "LK" },
            ],
          },
        ],
        o: [{ k: "seq", t: "asc" }],
        p: { n: 1, s: 10 },
      };
      query.p.n = this.pageNo;
      query.p.s = this.pageSize;
      query.r[0].w[0].v = this.id;
      query.r[0].w[1].v = this.serachValue;
      // 选取列表
      let data = await this.api.getEvaStandardSonList(
        encodeURIComponent(JSON.stringify(query))
      );
      this.tableData = data.data.list;
      this.tableData.map((item) => (item.weight = `${item.weight}%`));
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
      console.log('修改id',id);
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
  components: {
    newEvaluateManageRule,
  },
  async mounted() {
    let { bWidth, width } = this.until.getWidth();
    //   this.bWidth = bWidth;
    this.width = width;
    console.log("width", this.width);
    let data = await this.api.EvaStandardDetail(this.id);
    this.title = data.nm;
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
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
    .top {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 10px;
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