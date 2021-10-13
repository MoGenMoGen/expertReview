<template>
  <!-- 评审结果修改 -->
  <div id="mask" @click="closeMask">
    <div class="table_box" @click.stop="" :style="{ width: width + 'px' }">
      <div class="title_box">
        <div class="title_text" v-for="(item, index) in titleList" :key="index">
          {{ item }}
        </div>
      </div>

      <div class="content">
        <div class="line1">
          <div
            class="line_title_text border"
            v-for="(item, index) in lineTitleList"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 0,
      titleList: [
        "评定指标",
        "项目报价",
        "相关项目经验",
        "注册资本",
        "质量管控",
        "售后服务能力",
        "船舶寿命保障",
      ],
      lineTitleList: [
        "评定权重",
        "本项满分得分",
        "小组成员评分",
        "加权得分",
        "评分说明",
        "评分标准",
      ],
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    closeMask() {
      this.$parent.showModifyReview = false;
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
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  .table_box {
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
    .title_box {
      width: 100%;
      height: 54px;
      background: #2778be;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .title_text {
        text-align: center;
        line-height: 54px;
        color: #fff;
      }
    }
    .content {
      display: flex;
      width: 100%;
      .border {
        border-right: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
      }
      .line1 {
        flex: 1;
        border-left: 1px solid #e5e5e5;
        .line_title_text {
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-weight: 800;
          color: #333333;
        }
      }
      .right {
        flex: 6;
        border: 1px solid #e5e5e5;
      }
    }
  }
}
</style>