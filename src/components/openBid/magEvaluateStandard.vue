<template>
  <!-- 新增开标选取规则 -->
  <div id="mask" @click="closeMask">
    <div
      class="table_box"
      :style="{ width: bWidth - 200 + 'px' }"
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
      <div class="row1">评定指标名称：项目议标评定标准</div>
      <div class="row2">
        <el-input
          placeholder="评议指标"
          style="margin-right: 10px; width: 202px"
          v-model="input"
          clearable
        >
        </el-input>
        <button class="btn margin_right" style="border: 1px solid #e0e0e0">
          查询
        </button>
        <button
          class="btn margin_right"
          style="background: #409eff; color: #fff; border: none"
          @click="showEvaMagRule = true"
        >
          新增
        </button>
        <button

          class="btn margin_right"
          style="background: #fab6b6; color: #fff; border: none"
        >
          删除
        </button>
        <button class="btn margin_right" style="border: 1px solid #e0e0e0">
          导出
        </button>
      </div>
      <el-table
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
        <el-table-column
          label="评定指标"
          prop="target"
          sortable
          min-width="200"
        >
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
        <el-table-column
          prop="intro"
          label="评分说明"
          sortable
          min-width="204"
        >
        </el-table-column>
         <el-table-column
          prop="standard"
          label="评分标准"
          sortable
          min-width="204"
        >
        </el-table-column>
          <el-table-column
          prop="sort"
          label="排序(正序)"
          sortable
          min-width="144"
        >
        </el-table-column>
        <el-table-column label="操作" min-width="96">
          <template>
            <i
              class="el-icon-edit"
              style="color: #409eff; margin-right: 10px; cursor: pointer"
              @click="showRuleDetail = true"
            ></i>
            <i
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
      <newEvaluateManageRule v-show="showEvaMagRule"></newEvaluateManageRule>
    </div>
  </div>
</template>

<script>
import newEvaluateManageRule from "components/openBid/newEvaluateManageRule.vue";
export default {
  data() {
    return {
      num: 1,
      value: "",
      input: "",
      textarea: "",
      pageNo: 1,
      pageSize: 10,
      total: 0,
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
      tableData: [
        {
          target: "项目报价",
          weight: "30%",
          fullScore: 100,
          intro:'快乐即可了解了解了解',
          standard:"发动机是老公就是大概了解了",
          sort:1
        },
           {
          target: "项目报价",
          weight: "30%",
          fullScore: 100,
          intro:'快乐即可了解了解了解',
          standard:"发动机是老公就是大概了解了",
          sort:1
        },
           {
          target: "项目报价",
          weight: "30%",
          fullScore: 100,
          intro:'快乐即可了解了解了解',
          standard:"发动机是老公就是大概了解了",
          sort:1
        },
      ],
    };
  },
  props: {
    bWidth: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    closeMask() {
      this.$parent.showMagEvaluateStandard = false;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  components: {
    newEvaluateManageRule,
  },
  mounted() {
    let { bWidth, width } = this.until.getWidth();
    //   this.bWidth = bWidth;
    this.width = width;
    console.log("width", this.width);
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