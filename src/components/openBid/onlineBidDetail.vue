<template>
  <!-- 在线开标详情 -->

  <div id="mask" @click="closeMask">
    <div class="table_box" style="width: 1000px" @click.stop="">
      <div class="top">
        <p style="font-size: 20px; color: #636e72">详情</p>
        <img
          @click="closeMask"
          src="~assets/img/close.png"
          style="width: 25px; height: 25px"
          alt=""
        />
      </div>
      <div class="content">
        <div class="row">
          <div class="left">
            项目编号:<span class="value">{{ info.cd }}</span>
          </div>
          <div class="right">
            项目名称:<span class="value">{{ info.nm }}</span>
          </div>
        </div>
        <div class="row">
          <div class="left">
            投标开始时间:<span class="value">{{ info.bidOpenTm }}</span>
          </div>
          <div class="right">
            采购单位:<span class="value">{{ info.purchasingUnit }}</span>
          </div>
        </div>
        <div class="row">
          <div class="left">
            采购方式:<span class="value">{{ info.procurementMethodNm }}</span>
          </div>
          <div class="right">
            预算金额（元）:<span class="value">{{ info.budget }}</span>
          </div>
        </div>
        <div class="row">
          <div class="left">投标标项:<span class="value">没找到字段</span></div>
          <div class="right" v-if="info.status == 0">
            状态:<span class="value" style="background: pink; color: red"
              >禁用</span
            >
          </div>
          <div class="right" v-else>
            状态:<span style="background: #f0f9eb; color: #91c35b" class="value"
              >启用</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
    };
  },
  props: {
    id: { default: "", type: String },
  },

  methods: {
    closeMask() {
      this.$parent.showDetail = false;
    },
  },
  async mounted() {
    let data = await this.api.onlineBidDetail(this.id);
    this.info = data.shipBidVo;
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
    // overflow-y: scroll;
    // overflow-x: hidden;
    max-height: 80vh;
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
    .top {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .content {
      width: 100%;
      padding: 50px;
      padding-top: 0;
      box-sizing: border-box;
      .row {
        margin-top: 20px;
        width: 100%;
        display: flex;
        .left {
          flex: 1;
          font-size: 16px;
          display: flex;
          align-items: center;
        }
        .right {
          flex: 1;
          font-size: 16px;
          display: flex;
          align-items: center;
        }
        .value {
          font-size: 14px;
          margin-left: 10px;
          display: inline-block;
          color: rgba(0, 0, 0, 0.6);
          font-weight: bold;
        }
      }
    }
  }
}
</style>