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
            class="line_title_text border row_height"
            v-for="(item, index) in lineTitleList"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <div class="right">
          <div
            class="row_height row_content"
            v-for="(item1, index1) in rowContentList"
            :key="index1"
          >
            <div
              class="border line_content"
              v-for="(item2, index2) in item1.lineContentList"
              :key="index2"
            >
              <div class="line_content_wrapper">{{ item2.value }}</div>
            </div>
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
		    @click="handleClick(scope.row)"
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
          @click="handleClick(scope.row)"
          type="text"
          size="small"
          >提交</el-button
        >
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
      rowContentList: [
        {
          lineContentList: [
            {
              value: "40%",
            },
            {
              value: "40%",
            },
            {
              value: "40%",
            },
            {
              value: "40%",
            },
            {
              value: "40%",
            },
            {
              value: "40%",
            },
          ],
        },
        {
          lineContentList: [
            {
              value: 10,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
          ],
        },
        {
          lineContentList: [
            {
              value: 10,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
          ],
        },
        {
          lineContentList: [
            {
              value: 10,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
          ],
        },
        {
          lineContentList: [
            {
              value: `得分就是投标报价与基准价的比值，
               每高
出基准价1%就在40的
基础上扣2分 每低于基
准价1%就在其基础上
扣1分 在40分的基础
上扣，扣完为止(不超
过5家 不用去掉最高值
和最低值)
`,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
          ],
        },
        {
          lineContentList: [
            {
              value: 10,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
          ],
        },
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
      .row_height {
        box-sizing: border-box;
      }
      .row_height:nth-child(1) {
        height: 55px;
      }
      .row_height:nth-child(2) {
        height: 65px;
      }
      .row_height:nth-child(3) {
        height: 77px;
      }
      .row_height:nth-child(4) {
        height: 77px;
      }
      .row_height:nth-child(5) {
        height: 233px;
      }
      .row_height:nth-child(6) {
        height: 77px;
      }
      .line1 {
        flex: 1;
        border-left: 1px solid #e5e5e5;
        .line_title_text {
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
        .row_content {
          display: flex;
          align-items: center;
          .line_content {
            flex: 1;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .line_content_wrapper {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
        .row_content:nth-child(3) {
          .line_content_wrapper {
            width: 121px;
            height: 37px;
            background: #f5f5f5;
            border: 1px solid #e6e6e6;
            background-image: url(~assets/img/edit.png);
            background-size: 14px;
            background-repeat: no-repeat;
            background-position: 86px center;
            cursor: pointer;
          }
        }
        .row_content:nth-child(4) {
          .line_content_wrapper {
            width: 121px;
            height: 37px;
            background: #f5f5f5;
            border: 1px solid #e6e6e6;
            background-image: url(~assets/img/edit.png);
            background-size: 14px;
            background-repeat: no-repeat;
            background-position: 86px center;
            cursor: pointer;
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