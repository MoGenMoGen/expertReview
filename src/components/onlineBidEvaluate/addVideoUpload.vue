<template>
  <!--评标上传视频 -->
  <div id="mask" @click="closeMask">
    <div class="table_box" @click.stop="">
      <div class="top">
        <p style="font-size: 20px; color: #636e72" v-if="type == 1">上传</p>
        <p style="font-size: 20px; color: #636e72" v-else>编辑</p>
        <img
          @click="closeMask"
          src="~assets/img/close.png"
          style="width: 25px; height: 25px; cursor: pointer"
          alt=""
        />
      </div>

      <div class="container">
        <div style="display: flex; padding: 20px; align-items: center">
          <div style="width: 90px">
            <span style="color: red; margin-right: 5px">*</span> 视频地址：
            <!-- <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 5px;
              "
            >
              <div
                style="
                  background: rgb(64, 158, 255);
                  color: rgb(255, 255, 255);
                  border: none;
                  cursor: pointer;
                  width: 35px;
                  text-align: center;
                "
                @click="Add"
              >
                新增
              </div>
              <div
                style="
                  background: rgb(250, 182, 182);
                  color: rgb(255, 255, 255);
                  border: none;
                  width: 35px;
                  cursor: pointer;
                  text-align: center;
                "
                @click="Del"
              >
                删除
              </div>
            </div> -->
          </div>
          <div>
            <!-- <div
              v-for="(item, index) in videoList"
              :key="index"
              style="margin-bottom: 5px"
            > -->
            <el-input
              style="width: 600px"
              placeholder="请输入视频地址"
              v-model="uploadData.vedioUrl"
              clearable
            >
            </el-input>
            <!-- </div> -->
          </div>

          <!-- <div
            v-if="videoForm.showVideoPath != '' && !videoFlag"
            style="position: relative"
          >
            <video
              style="width: 178px; height: 150px; object-fit: fill"
              :src="videoForm.showVideoPath"
              class="avatar video-avatar videoItem"
              controls="controls"
            >
              您的浏览器不支持视频播放
            </video>
            <img
              src="~assets/img/icon_del.png"
              style="
                position: absolute;
                top: -8px;
                color: #fff;
                right: -6px;
                cursor: pointer;
                width: 20px;
              "
              @click="handleRemove"
            />
          </div>
          <el-upload
            v-else
            style="border: 1px dashed #d9d9d9"
            class="avatar-uploader"
            action="/general/oss/upload"
            :data="{ FoldPath: '上传目录', SecretKey: '安全验证' }"
            :on-progress="uploadVideoProcess"
            :on-success="handleVideoSuccess"
            :before-upload="beforeUploadVideo"
            :show-file-list="false"
          >
            <i
              v-if="videoForm.showVideoPath == '' && !videoFlag"
              class="el-icon-plus avatar-uploader-icon"
            ></i>
            <el-progress
              v-if="videoFlag == true"
              type="circle"
              :percentage="videoUploadPercent"
              style="margin-top: 7px"
            ></el-progress>
          </el-upload> -->
        </div>
        <div style="display: flex; padding: 20px; align-items: center">
          <div style="width: 80px; padding-right: 6px">
            <span style="color: red; margin-right: 5px">*</span>视频名称:
          </div>
          <el-input
            style="width: 600px"
            placeholder="请输入名称"
            v-model="uploadData.title"
            clearable
          >
          </el-input>
        </div>
        <div style="display: flex; padding: 20px; align-items: center">
          <div style="width: 80px; padding-right: 6px">
            <span style="color: red; margin-right: 5px"></span>备注:
          </div>
          <el-input
            style="width: 600px"
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
      // 视频地址数组
      videoList: [{ url: "" }],
      uploadData: {
        bidId: "", //招标项目id
        title: "", //视频标题
        vedioTm: "", //视频时间
        vedioUrl: "", //视频地址
        sort: 1,
        rmks: "", //备注
        type: 1, //1为新增上传，2为编辑上传
      },
      type:1
    };
  },
  props: {
    bWidth: {
      type: Number,
      default: 0,
    },
    id: { default: "", type: Number },
    info: { default: {}, type: Object },
  },
  methods: {
    //添加视频地址
    Add() {
      this.videoList.push({ url: "" });
    },
    Del() {
      if (this.videoList.length > 1) {
        this.videoList.pop();
      }
    },
    closeMask() {
      this.$parent.showUpload = false;
    },
    //上传前回调
    beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 < 500;
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
        console.log("type", file.type);
        return false;
      }
      if (!fileSize) {
        this.$message.error("视频大小不能超过500MB");
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
    //文件移除
    handleRemove() {
      this.videoForm.showVideoPath = "";
      this.uploadData.vedioUrl = "";
    },
    handleConfirm() {
      // for (let item of this.videoList) {
      //   if (this.reg.checkVideo(item.url) != "ok") {
      //     this.$message.error(this.reg.checkVideo(item.url));
      //     return false;
      //   }
      // }
      // this.uploadData.vedioUrl = this.videoList.map((item) => item.url).join(",");

      if (this.reg.checkVideo(this.uploadData.vedioUrl) != "ok") {
        this.$message.error(this.reg.checkVideo(this.uploadData.vedioUrl));
        return false;
      }

      if (!this.uploadData.title) {
        this.$message.error("请输入视频名称");
        return false;
      }

      this.uploadData.vedioTm = moment().format("YYYY-MM-DD HH:mm:ss");
      //新增上传
      if (this.type == 1) {
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
      }
      //编辑
      else if(this.type==2)
      {
         this.api.EditVideo(this.uploadData).then((res) => {
          if (res.code == 0) {
            this.$message({
              message: "更新成功",
              type: "success",
            });
            this.$emit("updateAndSave");
          } else {
            this.$message.error("更新失败");
          }
          this.closeMask();
        });
      }
    },
  },
  components: {},
  async mounted() {
    let { bWidth, width } = this.until.getWidth();
    //   this.bWidth = bWidth;
    this.width = width;
    if (Object.keys(this.info).length > 0) {
      this.uploadData = this.info;
      this.type = 2;
    } else {
      this.uploadData.bidId = this.id;
      this.type = 1;
    }
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
    .container {
      .videoItem {
        position: relative;
        .icon_del {
          // visibility: hidden;
          visibility: visible;
          z-index: 9999;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .videoItem:hover .icon_del {
        visibility: visible;
        z-index: 9999;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .btn {
        width: 300px;
        margin: 40px auto 0;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>