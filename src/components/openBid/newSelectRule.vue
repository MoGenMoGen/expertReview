<template>
  <!-- 新增开标选取规则 -->
  <div id="mask" @click="closeMask">
    <div class="table_box" @click.stop="">
      <div class="top">
        <p style="font-size: 20px" v-if="type != 2">新增</p>
        <p style="font-size: 20px" v-else>编辑</p>
        <img
          @click="closeMask"
          src="~assets/img/close.png"
          style="width: 25px; height: 25px"
          alt=""
        />
      </div>
      <div class="row2">
        <div class="title">
          <span style="color: red; margin-right: 5px; display: inline-block"
            >* </span
          ><span>规则名称</span>
        </div>
        <div class="right">
          <el-input
            v-model="info.nm"
            class="margin_right"
            clearable
            placeholder="规则名称"
          >
          </el-input>
        </div>
      </div>
      <div class="row2">
        <div class="title">
          <p>备注</p>
        </div>
        <div class="right">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="备注"
            v-model="info.rmks"
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
            v-model="info.seq"
            @change="handleChange"
            :min="1"
            label=""
          ></el-input-number>
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
          @click="handleNewRule"
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
        seq: 1,
        nm: "",
        rmks: "",
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
    async handleNewRule() {
      if (!this.info.nm) {
        this.$message.error("请输入规则名称");
        return false;
      } else if (!this.info.seq) {
        this.$message.error("请填写排序");
        return false;
      }
      let data = {};
      // 编辑
      if (this.type == 2) data = await this.api.modifySelectRule(this.info);
      // 新增
      else data = await this.api.addSelectRule(this.info);

      if (data.code == 0) {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        this.$emit("handleNewSelectRule");
      } else {
        this.$message.error("保存失败");
      }
      this.$parent.showNewRule = false;
    },
    closeMask() {
      this.$parent.showNewRule = false;
    },
    handleChange() {
      console.log(this.info.seq);
    },
  },
  async mounted() {
    console.log("子组件mounted出发", this.id);
    let { bWidth, width } = this.until.getWidth();
    //   this.bWidth = bWidth;
    this.width = width;
    // console.log('子组件',this.id,"dfsdf",this.type);
    if (this.type == 2) this.info = await this.api.SelectRuleDetail(this.id);
    else {
      this.info = {
        seq: 1,
        nm: "",
        rmks: "",
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
</style>