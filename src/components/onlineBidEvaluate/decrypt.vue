<template>
  <!-- 解密 -->
  <div style="max-width: 100%">
    <div class="title">12米玻璃钢新型渔船 （项目编号：BHZC2021-G3-0001）</div>
    <div class="small_title">标项1 （解密中）</div>
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
      <el-table-column prop="status" label="标书上传状态" width="200">
        <template slot-scope="scope">
          <div v-if="scope.row.SCstatus == 0" style="color: #39a520">
            未上传
          </div>
          <div v-if="scope.row.SCstatus == 1" style="color: 'pink'">已上传</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="解密状态" width="200">
        <template slot-scope="scope">
          <div v-if="scope.row.JMstatus == 0" style="color: #e4393c">
            待解密
          </div>
          <div v-if="scope.row.JMstatus == 1" style="color: '#2778BE'">
            已解密
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="200">
        <template slot-scope="scope">
          <div
            v-if="scope.row.JMstatus == 0"
            style="
              width: 53px;
              height: 27px;
              background: #2778be;
              color: #fff;
              text-align: center;
              line-height: 27px;
              margin: 0 auto;
            "
          >
            解密
          </div>
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
          name: "澳新船厂有限公司",
          date: "2021-07-15 14:00:00",
          SCstatus: 0,
          JMstatus: 0,
        },
        {
          name: "澳新船厂有限公司",
          date: "2021-07-15 14:00:00",
          SCstatus: 1,
          JMstatus: 1,
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