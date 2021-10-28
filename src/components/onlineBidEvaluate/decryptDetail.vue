<template>
  <!-- 解密详情 -->
  <div id="mask" @click="closeMask">
    <div class="table_box" @click.stop="">
      <div class="top">
        <p style="font-size: 20px; color: #636e72">详情</p>
        <img
          @click="closeMask"
          src="~assets/img/close.png"
          style="width: 25px; height: 25px; cursor: pointer"
          alt=""
        />
      </div>
      <div class="info">
        <div class="infoItem">
          招标项目: <span style="margin-left: 5px">{{ info.bidNm }}</span>
        </div>
        <div class="infoItem">
          投标机构: <span style="margin-left: 5px">{{ info.orgNm }}</span>
        </div>
        <div class="infoItem">
          项目编号: <span style="margin-left: 5px">{{ info.bidCd }}</span>
        </div>
        <div class="infoItem">
          备注: <span style="margin-left: 5px">{{ info.rmks }}</span>
        </div>
        <div class="infoItem">
          审核状态:
          <span style="margin-left: 5px" v-if="info.audit == 1">待审核</span>
          <span style="margin-left: 5px" v-else-if="info.audit == 2"
            >审核通过</span
          >
          <span style="margin-left: 5px" v-else-if="info.audit == 3"
            >审核不通过</span
          >
        </div>
        <div class="infoItem">
          审核意见: <span style="margin-left: 5px">{{ info.options }}</span>
        </div>
        <!-- <div class="infoItem rightItem">
          报价金额:
          <span style="margin-left: 5px">{{ info.offerAmt }}</span>
        </div>
        <div class="infoItem">
          报价时间:
          <span style="margin-left: 5px">{{ info.offerTm }}</span>
        </div> -->
        <!-- <div class="infoItem">
          专家账号:
          <span style="margin-left: 5px">{{ info.username }}</span>
        </div>
        <div class="infoItem rightItem">
          专家姓名:
          <span style="margin-left: 5px">{{ info.realNm }}</span>
        </div> -->
        <!-- <div class="infoItem">
          满分分数:
          <span style="margin-left: 5px">{{ info.fullScore }}</span>
        </div>
        <div class="infoItem">
          总得分: <span style="margin-left: 5px">{{ info.score }}</span>
        </div> -->
      </div>
      <!-- 解密前 -->
      <div class="detailBox">
        <div class="detailTitle">
          <span>招标文件</span>
          <div class="line"></div>
          <div class="back">加密</div>
        </div>
        <div class="detailContent">
          <div class="fileList" v-for="(item, index) in list1" :key="index">
            <span> {{ index + 1 }}、 </span>
            <div>
              <img
                :src="item.img"
                style="width: 100px; height: 100px; cursor: pointer"
                @click="toLink(item.url)"
              />
              <p style="cursor: pointer" @click="toLink(item.url)">
                {{ item.fileNm }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 解密后 -->
      <div
        class="detailBox"
        v-if="info.attachDecodeTm && info.attachDecodeTm > 0"
      >
        <div class="detailTitle">
          <span>招标文件</span>
          <div class="line"></div>
          <div class="back">解密</div>
        </div>
        <div class="detailContent">
          <div class="fileList" v-for="(item, index) in list2" :key="index">
            <span> {{ index + 1 }}、 </span>
            <div>
              <img
                :src="item.img"
                style="width: 100px; height: 100px; cursor: pointer"
                @click="toLink(item.url)"
              />
              <p style="cursor: pointer" @click="toLink(item.url)">
                {{ item.fileNm }}
              </p>
            </div>
          </div>
        </div>
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
import excel from "@/assets/img/excel.png";
import ppt from "@/assets/img/ppt.png";
import word from "@/assets/img/word.png";
import pdf from "@/assets/img/pdf.jpg";
export default {
  data() {
    return {
      info: {},
      excel,
      ppt,
      word,
      pdf,
      //解密前
      attachment: [],
      list1: [],
      //解密后
      attachDecode: [],
      list2: [],
    };
  },
  props: {
    bWidth: {
      type: Number,
      default: 0,
    },
    bidId: { default: "", type: Number },
    detailId: { default: "", type: Number },
  },
  methods: {
    closeMask() {
      this.$parent.showDetail = false;
    },
    toLink(url) {
      window.open(url);
    },
    getInfo(info) {
      let data = info;
      let data1 = [];
      let fileList2 = [];
      if (data.length > 0) {
        data.forEach((v) => {
          let type = v.split(".")[v.split(".").length - 1];
          let nmList = v.split(".com/"); //分割出url后的内容
          let nm = "";
          nmList.forEach((j, z) => {
            //防止文件名中有 .com/ 所以循环加入
            if (z != 0) {
              nm += j;
            }
          });
          nmList = nm.split("_"); //分割随机字符后的内容
          nm = "";
          nmList.forEach((j, z) => {
            //防止文件名中有 _ 所以循环
            if (z != 0) {
              nm += j;
            }
          });
          nm = nm.split("." + type)[0];
          if (type == "pdf") {
            fileList2.push({
              url: v,
              img: this.pdf,
              fileNm: nm,
            });
          } else if (type == "doc" || type == "docx") {
            fileList2.push({
              url: v,
              img: this.word,
              fileNm: nm,
            });
          } else if (type == "ppt" || type == "pptx") {
            fileList2.push({
              url: v,
              img: this.ppt,
              fileNm: nm,
            });
          } else if (type == "xls" || type == "xlsx") {
            fileList2.push({
              url: v,
              img: this.excel,
              fileNm: nm,
            });
          } else {
            fileList2.push({
              url: v,
              img: v,
              fileNm: nm,
            });
          }
        });
      }
      console.log(fileList2);
      //   this.list = fileList2;
      return fileList2;
    },
  },
  components: {},
  async mounted() {
    let { bWidth, width } = this.until.getWidth();
    //   this.bWidth = bWidth;
    this.width = width;
    let query = {
      w: [{ k: "bidId", v: "", m: "EQ" }],
      o: [{ k: "crtTm", t: "esc" }],
    };
    query.w[0].v = this.bidId;

    this.info = await this.api.signUpDetail(
      this.detailId,
      encodeURIComponent(JSON.stringify(query))
    );
    console.log("详情", this.info);
    // 加密前
    if (this.info.attachment) {
      this.attachment = this.info.attachment.split(",");
      this.list1 = this.getInfo(this.attachment);
    }
    if (this.info.attachDecode) {
        console.log(222,this.attachDecode);
      this.attachDecode = this.info.attachDecode.split(",");
      this.list2 = this.getInfo(this.attachDecode);
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
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      .infoItem {
        font-size: 14px;
        color: rgb(96, 98, 102);
        padding: 10px;
        box-sizing: border-box;
        // text-align: center;
        width: 50%;
      }
      .rightItem {
        width: 30%;
        text-align: center;
      }
    }
    .detailBox {
      textarea {
        margin: 30px 50px;
        width: 70%;
        height: 200px;
        resize: none;
        padding: 20px;
      }

      .detailTitle {
        display: flex;
        align-items: center;

        span {
          font-size: 16px;
          font-weight: 400;
          color: #333333;
        }

        .line {
          display: flex;
          flex: 1;
          height: 1px;
          background: #000000;
          opacity: 0.1;
          margin-left: 22px;
        }

        .back {
          font-size: 14px;
          font-weight: 400;
          color: #909090;
          margin-left: 16px;
          cursor: pointer;
        }
      }

      .detailContent {
        padding: 30px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;

        .leftbox {
          width: 50%;

          .leftList {
            display: flex;
            margin-bottom: 30px;
            align-items: center;

            .listName {
              font-size: 14px;
              font-weight: 400;
              color: #606060;
            }

            .listContent {
              font-size: 14px;
              font-weight: 400;
              color: #606060;

              img {
                width: 50px;
                height: 50px;
                margin-left: 25px;
              }

              p {
                font-size: 14px;
                font-weight: 400;
                color: #606060;
                margin-bottom: 20px;
              }
            }
          }
        }

        .rightbox {
          width: 50%;

          .rightList {
            display: flex;
            margin-bottom: 30px;

            .listName {
              font-size: 14px;
              font-weight: 400;
              color: #606060;
            }

            .listContent {
              font-size: 14px;
              font-weight: 400;
              color: #606060;
            }
          }
        }

        .fileList {
          width: 50%;
          margin-top: 20px;
          display: flex;
        }
      }
    }
    .btn2 {
      float: right;
    }
  }
}
</style>