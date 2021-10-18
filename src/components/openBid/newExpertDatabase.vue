<template>
  <!-- 新增专家库 -->
  <div id="mask" @click="closeMask">
    <div class="table_box" @click.stop="">
      <div class="top">
        <p style="font-size: 20px">新增</p>
        <img
          @click="closeMask"
          src="~assets/img/close.png"
          style="width: 25px; height: 25px"
          alt=""
        />
      </div>
      <div class="row1">
        <div class="leftpart">
          <span style="color: red; margin-right: 5px; display: inline-block"
            >* </span
          ><span>选取范围</span>
        </div>
        <div class="rightpart">
          <el-select
            style="width: 160px"
            v-model="value"
            clearable
            placeholder="专家分组"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="row1">
        <div class="leftpart">
          <span style="color: red; margin-right: 5px; display: inline-block"
            >* </span
          ><span>用户名</span>
        </div>
        <div class="rightpart">
          <el-input v-model="input" clearable placeholder="用户名"> </el-input>
        </div>
      </div>
      <div class="row1">
        <div class="leftpart">
          <span style="color: red; margin-right: 5px; display: inline-block"
            >* </span
          ><span>真实姓名</span>
        </div>
        <div class="rightpart">
          <el-input v-model="input" clearable placeholder="真实姓名">
          </el-input>
        </div>
      </div>
      <div class="row1">
        <div class="leftpart">
          <span style="color: red; margin-right: 5px; display: inline-block"
            >* </span
          ><span>手机号码</span>
        </div>
        <div class="rightpart">
          <el-input v-model="input"  type="tel" maxlength=11 clearable placeholder="手机号码">
          </el-input>
        </div>
      </div>
      <div class="row1">
        <div class="leftpart">
          <span>邮箱</span>
        </div>
        <div class="rightpart">
          <el-input v-model="input" type="text" clearable placeholder="邮箱"> </el-input>
        </div>
      </div>
      <div class="row1">
        <div class="leftpart">
          <span>性别</span>
        </div>
        <div class="rightpart">
          <el-radio-group v-model="sex" style="margin-left: 12px">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="row2">
        <div class="leftpart">
          <span>头像</span>
        </div>
        <div class="rightpart">
          <el-upload
            class="avatar-uploader"
            action="/general/oss/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="row1">
        <div class="leftpart">
          <span>职位/称呼</span>
        </div>
        <div class="rightpart">
          <el-input v-model="input" clearable placeholder="职位/称呼">
          </el-input>
        </div>
      </div>
      <div class="row1">
        <div class="leftpart">
          <span>公司名称</span>
        </div>
        <div class="rightpart">
          <el-input v-model="input" clearable placeholder="公司名称">
          </el-input>
        </div>
      </div>
      <div class="row1">
        <div class="leftpart">
          <span>所在地区</span>
        </div>
        <div class="rightpart">
          <el-select
            style="width: 248px"
            v-model="value"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="row1">
        <div class="leftpart">
          <span>详细地址</span>
        </div>
        <div class="rightpart">
          <el-input v-model="input" clearable placeholder="详细地址">
          </el-input>
        </div>
      </div>
      <div class="row1">
        <div class="leftpart">
          <span>性别</span>
        </div>
        <div class="rightpart">
          <el-radio-group v-model="sex" style="margin-left: 12px">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </div>
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
          @click="handleClick(scope.row)"
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
</template>

<script>
export default {
  data() {
    return {
      num: 1,
      input: "",
      value: "",
      textarea: "",
      sex: "",
      imageUrl: "",
      options: [
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    closeMask() {
      this.$parent.showNewExpertDatabase = false;
    },
    handleChange() {},
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  mounted() {
    let { bWidth, width } = this.until.getWidth();
    //   this.bWidth = bWidth;
    this.width = width;
    console.log("width", this.width);
  },
};
</script>

<style lang="less">
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
    background: #fff;
    padding: 20px;
    width: 670px;
    max-height: 80%;
    overflow-y:scroll ;
    .top {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    .row1 {
      width: 600px;
      margin: 30px auto;
      display: flex;
      align-items: center;
      height: 32px;
      // justify-content: space-between;
      .leftpart {
        height: 32px;
        align-items: center;
        width: 70px;
        display: flex;
        justify-content: end;
      }
      .rightpart {
        .el-select {
          height: 32px;
          // width: 367px;
          margin-left: 12px;
        }
        .el-input {
          height: 32px;
          width: 367px;
          margin-left: 12px;
        }
      }
    }
    .row2 {
      width: 600px;
      margin: 30px auto;
      display: flex;
      align-items: center;
      height: 178px;
      // justify-content: space-between;
      .leftpart {
        height: 178px;
        align-items: center;
        width: 70px;
        display: flex;
        justify-content: end;
      }
      .rightpart {
        margin-left: 12px;
      }
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