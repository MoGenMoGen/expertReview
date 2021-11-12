<template>
  <div class="search_box">
    <!-- <div> -->
    <!-- <div class="search_item"> -->
    <!-- <el-input placeholder="招标项目" v-model="SearchInfo.bidNm" clearable>
    </el-input> -->
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
		bidId: '',
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
      let qry = this.query.new();
      this.query.toP(qry, this.pageNo, this.pageSize);
      this.query.toO(qry, "crtTm", "desc");
      this.query.toW(qry, 'bidId',this.bidId,'EQ')
      if(this.SearchInfo.orgNm) {
      	this.query.toW(qry, "orgNm", this.SearchInfo.orgNm, "LK");
      }
      if(this.SearchInfo.username) {
      	this.query.toW(qry, "username", this.SearchInfo.username, "LK");
      }
      if(this.SearchInfo.realNm) {
      	this.query.toW(qry, "realNm", this.SearchInfo.realNm, "LK");
      }
      if(this.SearchInfo.status) {
      	this.query.toW(qry, "status", this.SearchInfo.status, "EQ");
      }
      this.score = await this.api.getreviewResult(
        this.query.toEncode(qry)
      );
	  console.log(this.score)
    },
  },
  async created() {
    // 定义事件,注意箭头函数应用
    bus.$on("del", (data) => {
      this.isDel = data;
      console.log(222, data);
    });
     bus.$on("upAverage", () => {
       this.getScore();
    });

	this.bidId = this.until.getQueryString('id')
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