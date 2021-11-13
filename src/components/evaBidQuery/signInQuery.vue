<template>
  <div class="search_box">
    <!-- <div> -->
    <!-- <div class="search_item"> -->
    <el-input placeholder="项目编号" v-model="SearchInfo.cd" clearable>
    </el-input>
    <el-input placeholder="项目名称" v-model="SearchInfo.nm" clearable>
    </el-input>
    <el-input
      placeholder="采购单位"
      v-model="SearchInfo.purchasingUnit"
      clearable
    >
    </el-input>
    <!-- </div> -->
    <!-- <div class="search_item"> -->
    <el-input placeholder="专家" v-model="SearchInfo.expertNm" clearable>
    </el-input>
    <!-- <el-select
      v-model="SearchInfo.procurementMethodCd"
      clearable
      placeholder="采购方式"
    >
      <el-option
        v-for="(item, index) in procurementMethodList"
        :key="index"
        :label="item.nm"
        :value="item.cd"
      >
      </el-option>
    </el-select> -->
    <!-- <el-select v-model="value" clearable placeholder="项目状态">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select> -->
    <!-- </div> -->
    <!-- </div> -->
    <button class="btn_query" @click="Search">查询</button>
  </div>
</template>

<script>
import bus from "@/bus.js";
export default {
  data() {
    return {
      input: "",
      // 采购方式列表
      procurementMethodList: [],
      SearchInfo: {
        cd: "", //编号
        nm: "", //项目名称
        purchasingUnit: "", //采购单位
        expertIds: "", //专家id
        expertNm: "", //专家
        procurementMethodCd: "", //采购方式
        procurementMethodNm: "", //采购方式
      },
    };
  },
  methods: {
    Search() {
      bus.$emit('SignSearch',this.SearchInfo)
    },
  },
  mounted() {
    //采购方式列表
    this.api
      .getCatListByPcd({
        cd: "PROCUREMENT_METHOD",
      })
      .then((res) => {
        this.procurementMethodList = res.list;
      });
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
    cursor:pointer;
    // margin-top: 20px;
  }
}
</style>