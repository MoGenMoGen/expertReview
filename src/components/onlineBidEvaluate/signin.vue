<template>
  <!-- 签到 -->
  <div style="max-width: 100%">
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
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="no" label="项目编号" width="140">
      </el-table-column>
      <el-table-column prop="name" label="项目名称" width="130">
      </el-table-column>
      <el-table-column label="采购单位" width="200">
        <template slot-scope="scope">
          <div
            style="margin-top: 0px"
            v-for="(item, index) in scope.row.units"
            :key="index"
          >
            {{ item.value }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="评标专家" width="150">
        <template slot-scope="scope">
          <div
            style="margin-top: 0px"
            v-for="(item, index) in scope.row.experts"
            :key="index"
          >
            {{ item.value }}
            <span
              v-if="item.status == 0"
              style="
                width: 50px;
                height: 18px;
                background: #2778be;
                border-radius: 9px;
                color: #fff;
                text-align: center;
                line-height: 18px;
                margin-left: 5px;
                display: inline-block;
              "
              >签到</span
            >
            <span v-else>（已签到）</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="开标时间" width="100">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 1" style="color: #39a520">评标中</div>
          <div v-if="scope.row.status == 2" style="color: 'pink'">已完成</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="60">
        <template slot-scope="scope">
          <el-button
            style="color: #2778be"
            @click="handleClick(scope.row)"
            type="text"
            size="small"
            >查看</el-button
          >
          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template></el-table-column
      ></el-table
    >
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
export default {
  data() {
    return {
      tableData: [
        {
          no: "BHZC2021-G3-0001",
          name: "12米玻璃钢新型渔船",
          units: [
            {
              value: "澳新船厂有限公司   (已签到)",
              status: 0,
            },
            {
              value: "澳新船厂有限公司   (已签到)",
              status: 0,
            },
          ],
          experts: [
            {
              value: "钱森林 ",
              status: 0,
            },
            {
              value: "张师傅",
              status: 1,
            },
          ],
          date: "2021-07-15 14:00:00",
          status: 1,
        },
        {
          no: "BHZC2021-G3-0001",
          name: "12米玻璃钢新型渔船",
          units: [
            {
              value: "澳新船厂有限公司   (已签到)",
              status: 0,
            },
            {
              value: "澳新船厂有限公司   (已签到)",
              status: 0,
            },
          ],
          experts: [
            {
              value: "钱森林 ",
              status: 0,
            },
            {
              value: "张师傅",
              status: 1,
            },
          ],
          date: "2021-07-15 14:00:00",
          status: 2,
        },
      ],
      // 每页显示条数
      pageSize: 10,
      total: 0,
      // 当前页
      currentPage: 1,
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
  },
};
</script>

<style lang="less" scoped>
.Footer {
  display: flex;
  justify-content: center;
  margin: 44px 0 20px;
}
</style>