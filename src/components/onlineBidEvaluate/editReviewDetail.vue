<template>
  <!-- 修改评定详情 -->
  <div id="mask" @click="closeMask">
    <div class="table_box" @click.stop="">
      <div class="top">
        <p style="font-size: 20px; color: #636e72">修改</p>
        <img
          @click="closeMask"
          src="~assets/img/close.png"
          style="width: 25px; height: 25px; cursor: pointer"
          alt=""
        />
      </div>
      <div class="info">
        <div class="infoItem">
          <div class="left">
            <div class="title">招标项目</div>
            <el-input :disabled="true" v-model="info.bidNm"></el-input>
          </div>
          <div class="left">
            <div class="title">投标机构</div>
            <el-input :disabled="true" v-model="info.orgNm"></el-input>
          </div>
        </div>
        <div class="infoItem">
          <!-- <div class="left">
            <div class="title">报价金额</div>
            <el-input :disabled="true" v-model="info.offerAmt"></el-input>
          </div> -->
          <div class="left">
            <div class="title">报价时间</div>
            <el-input :disabled="true" style="width: 632px" v-model="info.offerTm"></el-input>
          </div>
        </div>
        <div class="infoItem">
          <div class="left">
            <div class="title">专家账号</div>
            <el-input :disabled="true" v-model="info.username"></el-input>
          </div>
          <div class="left">
            <div class="title">专家姓名</div>
            <el-input :disabled="true" v-model="info.realNm"></el-input>
          </div>
        </div>
        <div class="infoItem">
          <div class="left">
            <div class="title">满分分数</div>
            <el-input-number
              v-model="info.fullScore"
              :disabled="true"
            ></el-input-number>
          </div>
          <div class="left">
            <div class="title">总得分</div>
            <el-input-number
              v-model="info.score"
              :disabled="true"
            ></el-input-number>
          </div>
        </div>
        <div class="infoItem">
          <div class="left">
            <div class="title">得分详情</div>
            <el-input
              :disabled="true"
              type="textarea"
              autosize
              v-model="info.detail"
            >
            </el-input>
          </div>
        </div>
        <div class="infoItem">
          <div class="left">
            <div class="title">评分说明</div>
            <el-input
              placeholder="评分说明"
              style="width: 248px"
              :disabled="true"
              type="textarea"
              :autosize="{ minRows: 2 }"
              v-model="detailData.tips"
            >
            </el-input>
          </div>
          <div class="left">
            <div class="title">评分标准</div>
            <el-input
              style="width: 248px"
              :disabled="true"
              type="textarea"
              :autosize="{ minRows: 2 }"
              placeholder="评分标准"
            >
            </el-input>
          </div>
        </div>
        <div class="infoItem">
          <div class="left">
            <div class="title">备注</div>
            <el-input
              placeholder="备注"
              style="width: 248px"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              v-model="detailData.rmks"
            >
            </el-input>
          </div>
          <div class="left">
            <div class="title">是否有效</div>
            <el-radio v-model="detailData.status" :label="0">无效</el-radio>
            <el-radio v-model="detailData.status" :label="1">有效</el-radio>
          </div>
        </div>
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
    <div></div>
  </div>
</template>

<script>
import bus from "@/bus.js";
export default {
  data() {
    return {
      detailData: {},
    };
  },
  props: {
    bWidth: {
      type: Number,
      default: 0,
    },
    id: { default: "", type: Number },
    info: { default: {}, type: Object },
  },
  methods: {
    closeMask() {
      this.$parent.showEdit = false;
    },
    async handleConfirm() {
      let data = await this.api.updateReviewResult({
        ...this.info,
        ...this.detailData,
      });
      if (data.code == 0) {
        this.$message({
          type: "success",
          message: "更新成功!",
        });
        this.$emit("updateAndSave");
        // bus.$emit("upAverage");
      }
      setTimeout(() => {
        this.closeMask();
      }, 400);
    },
  },
  components: {},
  async mounted() {
    let { bWidth, width } = this.until.getWidth();
    //   this.bWidth = bWidth;
    this.width = width;
    console.log(this.info)
    this.detailData = await this.api.extraReviewResultDetail(this.id);
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
      //   padding: 20px;
      box-sizing: border-box;
      .infoItem {
        display: flex;
        margin: 22px;
        .left {
          flex: 1;
          display: flex;
          align-items: center;
          .title {
            width: 60px;
            font-size: 14px;
            color: #606266;
            text-align: right;
            margin-right: 12px;
          }
          .el-input {
            width: 248px;
          }
          .el-input-number {
            width: 200px;
          }
          .el-textarea {
            width: 635px;
          }
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