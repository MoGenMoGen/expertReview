<template>
  <!--评标上传视频 -->
  <div id="mask" @click="closeMask">
    <div class="table_box" @click.stop="">
      <div class="top">
        <p style="font-size: 20px; color: #636e72">上传</p>
        <img
          @click="closeMask"
          src="~assets/img/close.png"
          style="width: 25px; height: 25px; cursor: pointer"
          alt=""
        />
      </div>

      <div class="container">
        <div style="display: flex; padding: 20px; align-items: center">
          <div style="width: 70px; text-align: right">视频上传：</div>
          <el-upload
            style="border: 1px dashed #d9d9d9"
            class="avatar-uploader"
            action="/general/oss/upload"
            :data="{ FoldPath: '上传目录', SecretKey: '安全验证' }"
            :on-progress="uploadVideoProcess"
            :on-success="handleVideoSuccess"
            :before-upload="beforeUploadVideo"
            :show-file-list="false"
          >
            <video
              v-if="videoForm.showVideoPath != '' && !videoFlag"
              :src="videoForm.showVideoPath"
              class="avatar video-avatar"
              controls="controls"
            >
              您的浏览器不支持视频播放
            </video>
            <i
              v-else-if="videoForm.showVideoPath == '' && !videoFlag"
              class="el-icon-plus avatar-uploader-icon"
            ></i>
            <el-progress
              v-if="videoFlag == true"
              type="circle"
              :percentage="videoUploadPercent"
              style="margin-top: 7px"
            ></el-progress>
          </el-upload>
        </div>
        <div style="display: flex; padding: 20px; align-items: center">
          <div style="width: 60px; padding-right: 6px; text-align: right">
            视频名称:
          </div>
          <el-input
            style="width: 250px"
            placeholder="请输入名称"
            v-model="uploadData.title"
            clearable
          >
          </el-input>
        </div>
        <div style="display: flex; padding: 20px; align-items: center">
          <div style="width: 60px; padding-right: 6px; text-align: right">
            备注:
          </div>
          <el-input
            style="width: 250px"
            placeholder="请输入备注"
            type="textarea"
            autosize
            v-model="uploadData.rmks"
            clearable
          >
          </el-input>
        </div>

        <div class="btn">
          <el-button
            style="
              background: #2778be;
              color: #fff;
              margin-right: 20px;
              padding: 10px 25px;
              border-radius: 4px;
            "
            @click="handleConfirm"
            type="text"
            size="small"
            >确定</el-button
          >
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
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
        showVideoPath: "",
      },
      uploadData: {
        bidId: "", //招标项目id
        title: "", //视频标题
        vedioTm: "", //视频时间
        vedioUrl: "", //视频地址
        sort: 1,
        rmks: "", //备注
      },
    };
  },
  props: {
    bWidth: {
      type: Number,
      default: 0,
    },
    id: { default: "", type: Number },
  },
  methods: {
    closeMask() {
      this.$parent.showUpload = false;
    },
    //上传前回调
    beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 < 50;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov",
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式");
        console.log('type',file.type);
        return false;
      }
      if (!fileSize) {
        this.$message.error("视频大小不能超过50MB");
        return false;
      }
      this.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      console.log(12432423, res);
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;

      //前台上传地址
      //if (file.status == 'success' ) {
      //    this.videoForm.showVideoPath = file.url;
      //} else {
      //     this.$message.error("上传失败，请重新上传");
      //}

      //后台上传地址
      if (res.code == 0) {
        this.videoForm.showVideoPath = res.data;
        this.uploadData.vedioUrl = res.data;
      } else {
        this.$message.error(res.errMsg);
      }
    },
    handleConfirm() {
      this.uploadData.vedioTm = moment().format("YYYY-MM-DD HH:mm:ss");
      this.api.uploadVideo(this.uploadData).then((res) => {
        if (res.code == 0) {
          this.$message({
            message: "上传成功",
            type: "success",
          });
          this.$emit("updateAndSave");
        } else {
          this.$message.error("上传失败");
        }
        this.closeMask();
      });
    },
  },
  components: {},
  async mounted() {
    let { bWidth, width } = this.until.getWidth();
    //   this.bWidth = bWidth;
    this.width = width;
    this.uploadData.bidId = this.id;
  },
};
</script>
<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
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
    .btn {
      width: 300px;
      margin: 40px auto 0;
      display: flex;
      justify-content: center;
    }
  }
}
</style>