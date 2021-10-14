<template>
  <!-- 新增开标选取规则 -->
  <div id="mask" @click="closeMask">
    <div class="table_box" @click.stop="">
      <div class="top">
        <p style="font-size: 20px">新增</p>
        <img
        @click="closeMask"
          src="~assets/img/close.png"
          style="width: 25px; height: 25px"
          alt=""
        />
      </div>
      <div class="row1">
        <div class="leftpart">
          <span style="color: red">* </span><span>选取范围</span>
          <el-select
            v-model="value"
            class="margin_right"
            clearable
            placeholder="专家分组"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="rightpart">
          <span style="color: red">* </span><span>选取数量</span>
          <el-input-number
            style="margin-left: 5px"
            v-model="num"
            @change="handleChange"
            :min="1"
            :max="10"
            label=""
          ></el-input-number>
        </div>
      </div>
      <div class="row2">
        <p style="width:30px;">备注</p> 
        <el-input
        style="margin-left:10px;"
          type="textarea"
          :rows="2"
          placeholder="备注"
          v-model="textarea"
        >
        </el-input>
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
</template>

<script>
export default {
  data() {
    return {
      num: 1,
      value: "",
      textarea:"",
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
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    closeMask() {
      this.$parent.showNewRule = false;
    },
    handleChange(){}
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
    padding: 20px;
    width: 850px;
    .top {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    .row1 {
      width: 700px;
      margin: 30px auto 20px;
      display: flex;
      justify-content: space-between;
      .leftpart {
        .el-select {
          width: 202px;
          margin-left: 5px;
        }
      }
    }
    .row2{
        width: 700px;
      margin: 30px auto 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

    }

    .btn {
      width: 300px;
      margin: 40px auto 0;
      display: flex;
      justify-content: center;
    }
  }
}
</style>