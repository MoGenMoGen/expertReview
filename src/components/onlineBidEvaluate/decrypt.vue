<template>
  <!-- 解密 -->
  <div style="max-width: 100%">
    <decryptDetail
      :bidId="bidId"
      :detailId="detailId"
      v-if="showDetail"
    ></decryptDetail>

    <div class="title">
      {{ detail.nm }} (项目编号:{{ detail.cd }})

      <div
        v-if="auth1"
        style="
          width: 63px;
          height: 27px;
          background: #2778be;
          color: #fff;
          text-align: center;
          line-height: 27px;
          margin: 0 auto;
          cursor: pointer;
          display: inline-block;
          border-radius: 4px;
          margin-left: 4px;
        "
        v-loading.fullscreen.lock="fullscreenLoading"
        @click="handleAllDecrypt"
      >
        一键解密
      </div>
    </div>
    <!-- <div class="small_title">标项1 （解密中）</div> -->
    <el-table
      max-height="504"
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
      <el-table-column type="index" label="序号" min-width="100">
      </el-table-column>
      <el-table-column label="供应商名称" prop="orgNm" min-width="200">
      </el-table-column>
      <!-- <el-table-column prop="status" label="标书上传状态" min-width="200">
        <template slot-scope="scope">
          <div v-if="scope.row.SCstatus == 0" style="color: #39a520">
            未上传
          </div>
          <div v-if="scope.row.SCstatus == 1" style="color: 'pink'">已上传</div>
        </template>
      </el-table-column> -->
      <el-table-column prop="status" label="解密状态" min-width="200">
        <template slot-scope="scope">
          <div v-if="scope.row.attachDecodeTm" style="color: #2778be">
            已解密
          </div>
          <div v-else style="color: #e4393c">待解密</div>
        </template>
      </el-table-column>
      <el-table-column label="解密文件" prop="attachDecode" min-width="200">
        <template slot-scope="scope">
          <div
            class="fileList"
            v-for="(item, index) in scope.row.newList"
            :key="index"
          >
            <!-- <span> {{ index + 1 }}、 </span> -->
            <!-- <div> -->
            <!-- <img :src="item.img" style="width: 100px; height: 100px; cursor: pointer"
								@click="toLink(item.url)" /> -->
            <p
              style="cursor: pointer"
              class="decryptLink"
              @click="toLink(item.url)"
            >
              {{ item.fileNm }}
            </p>
            <!-- </div> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="100">
        <template slot-scope="scope">
          <div
            v-if="!scope.row.attachDecodeTm && auth1"
            style="
              width: 53px;
              height: 27px;
              background: #2778be;
              color: #fff;
              text-align: center;
              line-height: 27px;
              margin: 0 auto;
              cursor: pointer;
            "
            v-loading.fullscreen.lock="fullscreenLoading"
            @click="handleDecrypt(scope.row.id)"
          >
            解密
          </div>
          <div
            v-else-if="scope.row.attachDecodeTm && auth1"
            style="
              width: 63px;
              height: 27px;
              background: #2778be;
              color: #fff;
              text-align: center;
              line-height: 27px;
              margin: 0 auto;
              cursor: pointer;
            "
            v-loading.fullscreen.lock="fullscreenLoading"
            @click="handleDecrypt(scope.row.id)"
          >
            重新解密
          </div>
          <el-button
            style="color: #2778be"
            @click="toDetail(scope.row.id)"
            type="text"
            size="small"
            >查看
          </el-button>
          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
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
import decryptDetail from "@/components/onlineBidEvaluate/decryptDetail";
import excel from "@/assets/img/excel.png";
import ppt from "@/assets/img/ppt.png";
import word from "@/assets/img/word.png";
import pdf from "@/assets/img/pdf.jpg";
export default {
  data() {
    return {
      auth1: "", //解密权限
      excel,
      ppt,
      word,
      pdf,
      tableData: [],
      // 每页显示条数
      pageSize: 10,
      pageNo: 1,
      total: 0,
      // 当前页
      currentPage: 1,
      // 项目详情，获取名称和编号
      detail: {},
      showDetail: false,
      detailId: "", //详情id
      bidId: 5042267656164352,
      fullscreenLoading: false,
    };
  },
  props: {
    //项目id
    id: {
      type: Number,
      default: "",
    },
  },
  components: {
    decryptDetail,
  },
  methods: {
    toLink(url) {
      console.log(1111111, url);
      window.open(url);
    },
    async handleDecrypt(id) {
      this.fullscreenLoading = true;
      this.api
        .decrypt({
          id,
        })
        .then((res) => {
          this.fullscreenLoading = false;
          this.getList();
        });
      setTimeout(() => {
        this.fullscreenLoading = false;
        this.getList();
      }, 30000);
    },
    handleAllDecrypt() {
      this.fullscreenLoading = true;
      this.api
        .AllDecrypt({
          id: this.id,
        })
        .then((res) => {
          this.fullscreenLoading = false;
          this.getList();
        });
      setTimeout(() => {
        this.fullscreenLoading = false;
        this.getList();
      }, 30000);
    },
    toDetail(id) {
      this.showDetail = true;
      this.detailId = id;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNo = val;
    },
    async getList() {
      let qry = this.query.new();
      this.query.toW(qry, "bidId", this.id, "EQ");
      this.query.toP(qry, this.pageNo, this.pageSize);
      // 选取列表
      let data = await this.api.decryptList(this.query.toEncode(qry));
      this.tableData = data.data.list;
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].newList = [];
        let data = this.tableData[i].attachDecode.split(",");
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
        this.tableData[i].newList = fileList2;
      }
      this.total = data.page.total;
      console.log(1111343, this.tableData);
    },
  },
  mounted() {
    this.auth1 = JSON.parse(
      this.until.seGet("authZ").indexOf("ship:bidOffer:translate") > -1
    );
    this.api.getBidInfo(this.id).then((res) => {
      this.detail = res.data;
    });
    this.getList();
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
  display: flex;
  align-items: center;
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
.decryptLink:hover {
  color: red;
}

.Footer {
  display: flex;
  justify-content: center;
  margin: 44px 0 20px;
}
</style>
