<template>
  <div class="search_box">
    <!-- <div> -->
    <!-- <div class="search_item"> -->
    <el-input placeholder="招标项目" v-model="SearchInfo.bidNm" clearable>
    </el-input>
    <el-input placeholder="投标机构" v-model="SearchInfo.orgNm" clearable>
    </el-input>
    <el-input placeholder="专家账号" v-model="SearchInfo.username" clearable>
    </el-input>
    <el-input placeholder="专家姓名" v-model="SearchInfo.realNm" clearable>
    </el-input>
    <!-- </div> -->
    <!-- <div class="search_item"> -->
    <el-select v-model="SearchInfo.status" clearable placeholder="是否有效">
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <!-- </div> -->
    <!-- </div> -->
    <!-- <button class="btn_query">查询</button> -->
    <el-button
      class="btn margin_right"
      style="border: 1px solid #e0e0e0; cursor: pointer"
      @click="Search"
    >
      查询
    </el-button>
    <el-button
      :disabled="!isDel"
      class="btn margin_right"
      :style="{
        background: isDel ? 'red' : '#fab6b6',
        color: '#fff',
        border: 'none',
      }"
      @click="DelSelectRule"
    >
      删除
    </el-button>
    <el-button type="success" round>报价平均得分:{{ score }}</el-button>
  </div>
</template>

<script>
import bus from "@/bus.js";
export default {
  data() {
    return {
      isDel: false,
      options: [
        {
          value: "1",
          label: "有效",
        },
        {
          value: "0",
          label: "无效",
        },
      ],
      SearchInfo: {
        bidNm: "", //招标项目
        orgNm: "", //投标机构
        username: "", //专家账号
        realNm: "", //专家姓名
        status: "", //是否有效
      },
      score:0
    };
  },
  methods: {
    async Search() {
      // 触发绑定的事件，并向外传递参数。
      bus.$emit("reviewSearch", this.SearchInfo);
      this.getScore();
    },
    DelSelectRule() {
      bus.$emit("DelItem");
    },
   async getScore() {
      let query = {
        r: [
          {
            n: "a1",
            t: "and",
            w: [
              { k: "bidNm", v: "", m: "LK" },
              { k: "orgNm", v: "", m: "LK" },
              { k: "username", v: "", m: "LK" },
              { k: "realNm", v: "", m: "LK" },
              { k: "status", v: "", m: "LK" },
            ],
          },
        ],
        o: [{ k: "crtTm", t: "desc" }],
        p: { n: 1, s: 20 },
      };
      query.p.n = this.pageNo;
      query.p.s = this.pageSize;
      query.r[0].w[0].v = this.SearchInfo.bidNm;
      query.r[0].w[1].v = this.SearchInfo.orgNm;
      query.r[0].w[2].v = this.SearchInfo.username;
      query.r[0].w[3].v = this.SearchInfo.realNm;
      query.r[0].w[4].v = this.SearchInfo.status;
      this.score = await this.api.getreviewResult(
        encodeURIComponent(JSON.stringify(query))
      );
    },
  },
  async created() {
    // 定义事件,注意箭头函数应用
    bus.$on("del", (data) => {
      this.isDel = data;
      console.log(222, data);
    });
    this.getScore();
  },
};
</script>

<style lang="less" scoped>
.search_box {
  display: flex;
  align-items: center;
  height: 60px;
  // justify-content: center;
  // .search_item {
  //   display: flex;
  //   justify-content: space-around;
  .el-input {
    width: 202px;
    margin-right: 20px;
  }

  .el-select {
    width: 202px;

    margin-right: 20px;
    // margin-top: 20px;
  }
  // }
  .btn {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    border-radius: 5px;
  }
  .margin_right {
    margin-right: 15px;
  }
  .btn_query {
    width: 60px;
    height: 40px;
    background: #2778be;
    border-radius: 15px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    line-height: 40px;
    border: none;
    // margin-top: 20px;
  }
}
</style>