<template>
  <!-- 新增 项目评定标准-管理规则-->
  <div id="mask" @click.stop="closeMask">
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
      <div class="row2">
        <!-- <div style="display: flex"> -->

        <span style="width: 100px; display: inline-block"
          ><span style="color: red">* </span>评定指标</span
        >
        <!-- </div> -->
        <el-input type="text" placeholder="评定指标" v-model="info.nm">
        </el-input>
      </div>
      <div class="row1">
        <div class="leftpart">
          <span style="width: 100px; display: inline-block"
            ><span style="color: red">* </span>指标权重</span
          >
          <el-input-number
            v-model="info.weight"
            :min="1"
            :max="100"
            label=""
          ></el-input-number
          >%
        </div>
        <!-- <div class="rightpart">
          <span style="color: red">* </span><span>选取数量</span>
          <el-input-number
            style="margin-left: 5px"
            v-model="num"
            :min="1"
            :max="100"
            label=""
          ></el-input-number>
        </div> -->
      </div>
      <div class="row1">
        <div class="leftpart">
          <span style="width: 100px; display: inline-block"
            ><span style="color: red">* </span>本项满分分数</span
          >
          <el-input-number
            v-model="info.fullScore"
            :min="1"
            :max="100"
            label=""
          ></el-input-number>
        </div>
      </div>
      <div class="row1">
        <div class="leftpart">
          <span style="width: 100px; display: inline-block"
            ><span style="color: red">* </span>排序权重</span
          >
          <el-input-number
            v-model="info.seq"
            :min="1"
            :max="50"
            label=""
          ></el-input-number>
        </div>
      </div>
      <div class="row2">
        <p style="width: 100px"><span style="color: red">* </span>评分说明</p>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="评分说明"
          v-model="info.tips"
        >
        </el-input>
      </div>
      <div class="row2">
        <p style="width: 100px"><span style="color: red">* </span>评分标准</p>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="评分标准"
          v-model="info.norm"
        >
        </el-input>
      </div>
      <div class="row2">
        <p style="width: 100px">备注</p>
        <el-input
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
      info: {
        fullScore: 1,
        id: "",
        nm: "",
        norm: "",
        rmks: "",
        score: "",
        svsId: "",
        tips: "",
        weight: 1,
        seq: 1,
      },
    };
  },
  props: {
    // 评定指标项单条详情id
    svsId: { default: "", type: String },
    editId: { default: "", type: String },
    type: {
      // 0默认,2编辑
      default: 0,
      type: Number,
    },
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    closeMask() {
      this.$parent.showEvaMagRule = false;
    },
    // 提交数据
    async handleConfirm() {
      if (!this.info.nm) {
        this.$message.error("请输入评定指标");
        return false;
      } else if (!this.info.weight) {
        this.$message.error("请填写指标权重");
        return false;
      } else if (!this.info.fullScore) {
        this.$message.error("请填写满分分数");
        return false;
      } else if (!this.info.seq) {
        this.$message.error("请填写排序权重");
        return false;
      } else if (!this.info.tips) {
        this.$message.error("请填写评分说明");
        return false;
      } else if (!this.info.norm) {
        this.$message.error("请填写评分标准");
        return false;
      }

      let data = {};
      // 编辑
      if (this.type == 2) {
        data = await this.api.modifyEvaStandardSonItem(this.info);
      }
      // 新增
      else {
        this.info.svsId = this.svsId;
        data = await this.api.newEvaStandardSonItem(this.info);
      }

      if (data.code == 0) {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        this.$emit("SaveAndUpdate");
      } else {
        this.$message.error("保存失败");
      }
      this.$parent.showEvaMagRule = false;
    },
  },
  async mounted() {
    let { bWidth, width } = this.until.getWidth();
    //   this.bWidth = bWidth;
    this.width = width;
    console.log("width", this.width);
    if (this.type == 2) {
      this.info = await this.api.EvaStandardSonItemDetail(this.editId);
    } else {
      this.info = {
        fullScore: 1,
        id: "",
        nm: "",
        norm: "",
        rmks: "",
        score: "",
        svsId: "",
        tips: "",
        weight: 1,
        seq: 1,
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
  z-index: 60;
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
          // margin-left: 10px;
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