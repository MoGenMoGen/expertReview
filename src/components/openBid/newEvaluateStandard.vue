<template>
  <!-- 新增开标选取规则 -->
  <div id="mask" @click.stop="closeMask">
    <div class="table_box" @click.stop="">
      <div class="top">
        <p style="font-size: 20px" v-if="type != 2">新增</p>
        <p style="font-size: 20px" v-else>编辑</p>
        <img
          @click="closeMask"
          src="~assets/img/close.png"
          style="width: 25px; height: 25px; cursor: pointer"
          alt=""
        />
      </div>
      <div class="row1">
        <div class="leftpart">
          <span style="color: red">* </span><span>评估标准名称</span>
          <el-input
            v-model="info.nm"
            class="margin_right"
            clearable
            placeholder="评估标准名称"
          >
          </el-input>
        </div>
        <div class="rightpart">
          <span style="color: red">* </span><span>满分分数</span>
          <el-input-number
            style="margin-left: 5px"
            v-model="info.score"
            :min="1"
            :max="1000"
            label=""
          ></el-input-number>
        </div>
      </div>
      <div class="row2">
        <p style="width: 30px">备注</p>
        <el-input
          style="margin-left: 10px"
          type="textarea"
          :rows="2"
          placeholder="备注"
          v-model="info.rmks"
        >
        </el-input>
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
        <el-button
          style="
            background: #2778be;
            color: #fff;
            margin-right: 20px;
            padding: 10px 25px;
            border-radius: 4px;
          "
          @click="handleConfirm"
          type="text"
          size="small"
          >确定</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        nm: "",
        rmks: "",
        score: 1,
      },
    };
  },
  props: {
    id: { default: "", type: String },
    type: {
      // 0默认,2编辑
      default: 0,
      type: Number,
    },
  },
  methods: {
    async handleConfirm() {
      if (!this.info.nm) {
        this.$message.error("请输入评估标准名称");
        return false;
      }
      else if(!this.info.score)
      {
        this.$message.error("请填写满分分数");
        return false;
      }
      let data = {};
      // 编辑
      if (this.type == 2) {
        data = await this.api.modifyEvaStandard(this.info);
      }
      // 新增
      else data = await this.api.newEvaStandard(this.info);

      if (data.code == 0) {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        this.$emit("saveAndUpdate");
      } else {
        this.$message.error("保存失败");
      }
      this.$parent.showNewEvaluateStandard = false;
    },
    closeMask() {
      this.$parent.showNewEvaluateStandard = false;
    },
  },
  async mounted() {
    let { bWidth, width } = this.until.getWidth();
    //   this.bWidth = bWidth;
    this.width = width;
    console.log("width", this.width);
    if (this.type == 2) {
      this.info = await this.api.EvaStandardDetail(this.id);
    } else {
      this.info = {
        nm: "",
        rmks: "",
        score: 0,
      };
    }
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
        .el-input {
          width: 202px;
          margin-left: 5px;
        }
      }
    }
    .row2 {
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