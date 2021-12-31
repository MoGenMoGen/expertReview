<template>
  <!-- 新增专家库 -->
  <div id="mask">
    <div class="table_box" @click.stop="">
      <div class="top">
        <p style="font-size: 20px" v-if="type != 2">新增</p>
        <p style="font-size: 20px" v-else>编辑</p>
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
            v-model="info.groupNm"
            clearable
            placeholder="专家分组"
            @change="handleChangeExGroups"
          >
            <el-option
              v-for="(item, index) in expertGroups"
              :key="index"
              :label="item.nm"
              :value="index"
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
          <el-input v-model="info.username" clearable placeholder="用户名">
          </el-input>
        </div>
      </div>
      <div class="row1">
        <div class="leftpart">
          <span style="color: red; margin-right: 5px; display: inline-block"
            >* </span
          ><span>真实姓名</span>
        </div>
        <div class="rightpart">
          <el-input v-model="info.realNm" clearable placeholder="真实姓名">
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
          <el-input
            v-model="info.mob"
            type="tel"
            maxlength="11"
            clearable
            placeholder="手机号码"
          >
          </el-input>
        </div>
      </div>
      <div class="row1">
        <div class="leftpart">
          <span>邮箱</span>
        </div>
        <div class="rightpart">
          <el-input
            v-model="info.email"
            type="text"
            clearable
            placeholder="邮箱"
          >
          </el-input>
        </div>
      </div>
      <div class="row1">
        <div class="leftpart">
          <span>性别</span>
        </div>
        <div class="rightpart">
          <el-radio-group v-model="info.gender" style="margin-left: 12px">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
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
            <img v-if="info.imgUrl" :src="info.imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="row1">
        <div class="leftpart">
          <span>职位/称呼</span>
        </div>
        <div class="rightpart">
          <el-input v-model="info.job" clearable placeholder="职位/称呼">
          </el-input>
        </div>
      </div>
      <div class="row1">
        <div class="leftpart">
          <span>公司名称</span>
        </div>
        <div class="rightpart">
          <el-input v-model="info.company" clearable placeholder="公司名称">
          </el-input>
        </div>
      </div>
      <div class="row1">
        <div class="leftpart">
          <span>所在地区</span>
        </div>
        <div class="rightpart">
          <el-cascader
            v-if="showCascader"
            v-model="addrNmList"
            placeholder="请选择省市区"
            ref="Area"
            clearable
            :props="cascaderProps"
            separator="/"
            @change="handleChangeMap"
          ></el-cascader>
          <el-select
            v-model="inputArea"
            v-else
            @click.native="showCascader = true"
          >
            <el-option></el-option>
          </el-select>
        </div>
      </div>
      <div class="row1">
        <div class="leftpart">
          <span>详细地址</span>
        </div>
        <div class="rightpart">
          <el-input v-model="info.address" clearable placeholder="详细地址">
          </el-input>
        </div>
      </div>
      <div class="row1">
        <div class="leftpart">
          <span>状态</span>
        </div>
        <div class="rightpart">
          <el-radio-group v-model="info.status" style="margin-left: 12px">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </div>
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
</template>

<script>
let id = 1;
export default {
  data() {
    let that = this;
    return {
      showCascader: true,
      // 级联选中项二维数组
      addrNmList: [],
      inputArea: "",
      info: {
        addrCd: "",
        addrNm: "",
        address: "",
        company: "",
        email: "",
        gender: "",
        groupCd: "",
        groupNm: "",
        id: "",
        imgUrl: "",
        job: "",
        mob: "",
        realNm: "",
        status: 1,
        userId: "",
        username: "",
      },
      cascaderProps: {
        value: "id",
        label: "nm",
        lazy: true,

        lazyLoad(node, resolve) {
          const { level } = node;
          if (level > 0) {
            let pid = node.value;
            that.query_locations.w[0].v = pid;
          }

          that.api
            .getmapList(
              encodeURIComponent(JSON.stringify(that.query_locations))
            )
            .then((res) => {
              res.forEach((item) => {
                item.leaf = level >= 2;
              });
              resolve(res);
            });
        },
      },
      expertGroups: [],
      // 省市区的查询条件
      query_locations: {
        w: [{ k: "pid", v: 100000, m: "EQ" }],
        o: [{ k: "id", t: "esc" }],
        p: { n: 1, s: 10000 },
      },
    };
  },
  props: {
    id: { default: "", type: String },
    type: {
      // 0默认,2编辑
      default: 0,
      type: Number,
    },
  },
  methods: {
    closeMask() {
      this.$parent.showNewExpertDatabase = false;
    },
    handleChangeExGroups(e) {
      if (e >= 0) {
        this.info.groupNm = this.expertGroups[e].nm;
        this.info.groupCd = this.expertGroups[e].cd;
      } else {
        this.info.groupNm = "";
        this.info.groupCd = "";
      }
    },
    // 更换省市区
    async handleChangeMap(e) {
      this.info.addrCd = e.join("/");
      console.log(this.$refs["Area"].getCheckedNodes()[0]);
      if (this.$refs["Area"].getCheckedNodes()[0])
        this.info.addrNm = this.$refs["Area"]
          .getCheckedNodes()[0]
          .pathLabels.join("/");
      else this.info.addrNm = "";
    },
    handleAvatarSuccess(res, file) {
      // console.log(1111111,res,file);
      // this.info.imgUrl = URL.createObjectURL(file.raw);
      this.info.imgUrl = res.data;
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
    async handleConfirm() {
      let checkmobInfo = this.reg.checkPhone(this.info.mob);
      let checkemailInfo = this.reg.checkMail(this.info.email);

      if (!this.info.groupNm) {
        this.$message.error("请选择选取范围");
        return false;
      } else if (!this.info.username) {
        this.$message.error("请填写用户名");
        return false;
      } else if (!this.info.realNm) {
        this.$message.error("请填写姓名");
        return false;
      } else if (checkmobInfo != "ok") {
        this.$message.error(checkmobInfo);
        return false;
      }
      if (this.info.email) {
        if (checkemailInfo != "ok") {
          this.$message.error(checkemailInfo);
          return false;
        }
      }

      let data = {};
      // 编辑
      if (this.type == 2) {
        data = await this.api.modifyExpert(this.info);
      }
      // 新增
      else data = await this.api.newExpert(this.info);

      if (data.code == 0) {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        this.$emit("saveAndUpdate");
      } else {
        this.$message.error("保存失败");
      }
      this.$parent.showNewExpertDatabase = false;
    },
  },
  async mounted() {
    let { bWidth, width } = this.until.getWidth();
    //   this.bWidth = bWidth;
    this.width = width;
    // console.log("width", this.width);
    this.expertGroups = await this.api.getExpertGroup();
    // this.mapList = await this.api.getmapList(
    //   encodeURIComponent(JSON.stringify(this.query_locations))
    // );
    // console.log("mapList", this.mapList);
    // this.showCascader = true;
    if (this.type == 2) {
      this.info = await this.api.ExpertDetail(this.id);
      // this.addrNmList = this.info.addrCd.split("/").map(Number);
      this.inputArea = this.info.addrNm;
      if (this.inputArea) {
        this.showCascader = false;
      }
      console.log(111111, this.info, this.addrNmList);
    } else {
      this.info = {
        addrCd: "",
        addrNm: "",
        address: "",
        company: "",
        email: "",
        gender: "",
        groupCd: "",
        groupNm: "",
        id: "",
        imgUrl: "",
        job: "",
        mob: "",
        realNm: "",
        status: 1,
        userId: "",
        username: "",
      };
    }
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
    overflow-y: scroll;
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
          width: 367px;
          margin-left: 12px;
        }
        .el-input {
          height: 32px;
          width: 367px;
          margin-left: 12px;
        }
        .el-cascader {
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