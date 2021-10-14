<template>
  <!-- 新增开标选取规则 -->
  <div id="mask" @click="closeMask">
    <div
      class="table_box"
      :style="{ width: bWidth - 200 + 'px' }"
      @click.stop=""
    >
      <div class="top">
        <p style="font-size: 20px; color: #636e72">详情</p>
        <img
          @click="closeMask"
          src="~assets/img/close.png"
          style="width: 25px; height: 25px"
          alt=""
        />
      </div>
      <div class="row1">专家选取规则：从专家库中选一个</div>
      <div class="row2">
        <button class="btn margin_right" style="border: 1px solid #e0e0e0">
          查询
        </button>
        <button
          class="btn margin_right"
          style="background: #409eff; color: #fff; border: none"
          @click="showNewRule = true"
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
          label="选取范围"
          prop="range"
          sortable
          min-width="240"
        >
        </el-table-column>
        <el-table-column prop="num" label="选取数量" sortable min-width="240">
        </el-table-column>
        <el-table-column prop="remarks" label="备注" sortable min-width="240">
        </el-table-column>
        <el-table-column
          prop="weight"
          label="排序权重"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 1,
      value: "",
      textarea: "",
      pageNo: 1,
      pageSize: 10,
      total: 0,
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
          range: "全部专家",
          num:1,
          remarks: "啊啊啊啊啊啊啊啊",
          weight: 1,
        },
        {
          range: "全部专家",
          num:5,
          remarks: "不不不不不不",
          weight: 3,
        },
        {
          range: "全部专家",
          num:10,
          remarks: "超超超超",
          weight: 2,
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
      this.$parent.showRuleDetail = false;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
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
}
</style>