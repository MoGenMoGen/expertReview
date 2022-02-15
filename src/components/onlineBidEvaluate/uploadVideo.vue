<template>
  <!-- 解密 -->
  <div style="max-width: 100%">
    <addVideoUpload
      :info="info"
      :id="id"
      @updateAndSave="getList"
      v-if="showUpload"
    ></addVideoUpload>
    <div class="title">{{ detail.nm }} (项目编号:{{ detail.cd }})</div>
    <div class="video_top">
      <div class="small_title">评标视频</div>
      <div class="btn_upload" @click="Upload" v-if="auth2">上传</div>
    </div>
    <div class="content">
      <div style="margin-top: 20px" class="video_list">
        <div
          v-for="(item1, index1) in videoList"
          class="video_item"
          :key="index1"
        >
          <!-- <div
            class="video_item"
            v-for="(item2, index2) in item1.vedioUrl.split(',')"
            :key="index2"
          > -->
          <video :src="item1.vedioUrl" width="220" height="140" controls>
            <!-- <source :src="item1.vedioUrl" type="video/mp4" />
            <source :src="item1.vedioUrl" type="video/ogg" />
            <source :src="item1.vedioUrl" type="video/webm" /> -->
            <!-- <source
          src="https://www.bilibili.com/video/BV173411C7LV?spm_id_from=333.851.b_7265636f6d6d656e64.2"
          type="video/ogg"
        />
        <source
          src="https://www.bilibili.com/video/BV173411C7LV?spm_id_from=333.851.b_7265636f6d6d656e64.2"
          type="video/webm"
        /> -->
            您的浏览器不支持 HTML5 video 标签。
          </video>
          <div>
            {{ item1.title }}
            <span v-if="item1.rmks">({{ item1.rmks }})</span>
          </div>
          <div>{{ item1.vedioTm }}</div>
          <div style="display: flex; align-items: center; padding: 0 5px">
            <div
              style="
                background: rgb(250, 182, 182);
                color: rgb(255, 255, 255);
                border: none;
                cursor: pointer;
                width: 35px;
                text-align: center;
                margin-right: 5px;
                padding: 5px;
                border-radius: 4px;
              "
              @click="Edit(item1)"
            >
              编辑
            </div>
            <div
              style="
                background: red;
                color: rgb(255, 255, 255);
                border: none;
                width: 35px;
                cursor: pointer;
                text-align: center;
                padding: 5px;
                border-radius: 4px;
              "
              @click="Del(item1.id)"
            >
              删除
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>
      <!-- 分页 -->
      <div class="Footer">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import addVideoUpload from "@/components/onlineBidEvaluate/addVideoUpload";

export default {
  data() {
    return {
      detail: {},
      // 每页显示条数
      pageSize: 10,
      pageNo: 1,
      total: 0,
      videoList: [],
      showUpload: false,
      info: {}, //上传子组件传值
	  auth1: '', //视频查询
	  auth2: '' //视频上传
    };
  },
  props: {
    //项目id
    id: {
      type: Number,
      default: "",
    },
  },

  methods: {
    async getList() {
      let query = {
        r: [
          {
            n: "a1",
            t: "and",
            w: [{ k: "bidId", v: "", m: "EQ" }],
          },
        ],
        o: [{ k: "sort", t: "esc" }],
        p: { n: 1, s: 5 },
        j: [],
      };
      query.p.n = this.pageNo;
      query.p.s = this.pageSize;
      query.r[0].w[0].v = this.id;
      // 选取列表
      let data = await this.api.bidVideoList(
        encodeURIComponent(JSON.stringify(query))
      );
      this.videoList = data.data.list;
      this.total = data.page.total;
      console.log(1111343, this.videoList);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.getList();
    },
    Upload() {
      this.info = {};
      this.showUpload = true;
    },
    Edit(item) {
      this.showUpload = true;
      this.info = item;
    },
    Del(ids) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return this.api.DelVideo({ ids });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        })
        .then((res) => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          } else {
            this.$message({
              type: "error",
              message: "删除失败!",
            });
          }
        });
    },
  },
  components: {
    addVideoUpload,
  },
  mounted() {
	  this.auth1 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bidVedio:page')>-1) 
	  this.auth2 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bidVedio:add')>-1) 
    this.api.getBidInfo(this.id).then((res) => {
      this.detail = res.data;
    });
	if(this.auth1) {
		this.getList();
	}
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
  margin-bottom: 15px;
  line-height: 15px;
}
.video_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  padding-left: 4px;
  padding-top: 0;
  border-bottom: 1px solid #e1e1e1;
  .small_title {
    height: 15px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #2778be;
    padding-left: 20px;
    line-height: 15px;
  }
  .btn_upload {
    width: 66px;
    height: 30px;
    background: #2778be;
    border-radius: 5px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
}
.content {
  width: 100%;
  max-height: 524px;
  overflow-y: scroll;
  .video_list {
    display: flex;
    flex-wrap: wrap;
    .video_item {
      padding: 20px;
    }
  }
  .Footer {
    display: flex;
    justify-content: center;
    margin: 44px 0 20px;
  }
}
</style>