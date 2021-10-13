<template>
  <!-- 评审结果 -->
  <div style="max-width: 100%">
    <div class="title">12米玻璃钢新型渔船 （项目编号：BHZC2021-G3-0001）</div>
    <div class="small_title">标项1 （评审结果）</div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :cell-style="{
        'text-align': 'center',
        color: '#333',
        'font-weight': '500',
      }"
      :header-cell-style="{
        color: '#606060',
        background: '#f8f8f8',
        'text-align': 'center',
      }"
    >
      <el-table-column type="index" label="序号" width="100"> </el-table-column>
      <el-table-column label="供应商名称" prop="name" width="230">
      </el-table-column>
      <el-table-column label="报价是否有效" width="120">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 0">无效</div>
          <div v-if="scope.row.status == 1">有效</div>
        </template>
      </el-table-column>
      <el-table-column prop="offer" label="投标报价（万元）" width="160">
      </el-table-column>
      <el-table-column label="专家评分" width="150">
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row.expertScore" :key="index">
            {{ item.nm }}：{{ item.score }}
            <img
              src="~assets/img/edit.png"
              style="width: 15px; display: inline-block; margin-left: 4px;cursor:pointer;"
              @click="showModifyReview=true"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="总得分" prop="totalScore" width="100">
      </el-table-column>
      <el-table-column label="排名" prop="rank" width="100"> </el-table-column>
    </el-table>

    <modifyReview v-show="showModifyReview"></modifyReview>
    <!-- 分页 -->
    <div class="Footer">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import modifyReview from "components/onlineBidEvaluate/modifyReview.vue";
export default {
  data() {
    return {
      tableData: [
        {
          name: "澳新船厂有限公司",
          status: 0,
          offer: 23,
          expertScore: [
            {
              nm: "专家1",
              score: 32.5,
            },
            {
              nm: "专家2",
              score: 52.5,
            },
            {
              nm: "专家3",
              score: 52.5,
            },
          ],
          totalScore: 80.34,
          rank: 1,
        },
        {
          name: "澳新船厂有限公司",
          status: 1,
          offer: 46,
          expertScore: [
            {
              nm: "专家1",
              score: 32.5,
            },
            {
              nm: "专家2",
              score: 52.5,
            },
            {
              nm: "专家3",
              score: 52.5,
            },
          ],
          totalScore: 55.34,
          rank: 2,
        },
      ],
      // 每页显示条数
      pageSize: 10,
      total: 0,
      // 当前页
      currentPage: 1,
      showModifyReview:false
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    modifyReview() {
       
    },
    handleCurrentChange(val){
       console.log(`当前页: ${val}`);
    }
  },
  components: {
    modifyReview,
  },
};
</script>

<style lang="less" scoped>
.title {
  height: 15px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #606060;
  padding-left: 20px;
  border-left: 4px solid #2778be;
  margin-bottom: 20px;
  line-height: 15px;
}
.small_title {
  height: 15px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #2778be;
  padding-left: 20px;
  margin-bottom: 20px;
  line-height: 15px;
}
.Footer {
  display: flex;
  justify-content: center;
  margin: 44px 0 20px;
}
</style>