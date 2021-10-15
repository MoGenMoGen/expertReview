<template>
  <!--开标-专家库 页面 -->
  <div id="home" :style="{ width: bWidth + 'px' }" v-loading="loading">
    <my-header :width="width" :bWidth="bWidth"></my-header>
    <div class="container" :style="{ width: bWidth + 'px' }">
      <leftMenu tabIndex='3-2'></leftMenu>
      <div class="rightMenu" :style="{ width: bWidth - 200 + 'px' }">
       <new-expert-database v-show="showNewExpertDatabase"></new-expert-database>
        <div class="condition_box">
          <el-select
            v-model="value"
            class="margin_right"
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
          <el-input
            placeholder="专家姓名"
            class="margin_right"
            v-model="input"
            clearable
          >
          </el-input>
          <el-input
            placeholder="用户名"
            class="margin_right"
            v-model="input"
            clearable
          >
          </el-input>
          <el-input
            placeholder="手机号"
            class="margin_right"
            v-model="input"
            clearable
          >
          </el-input>
          <button class="btn" style="border: 1px solid #e0e0e0">查询</button>
        </div>
        <div class="btn_box">
          <button
            class="btn margin_right"
            style="background: #409eff; color: #fff; border: none"
            @click="showNewExpertDatabase=true"
          >
            新增
          </button>
          <button
            class="btn margin_right"
            style="background: #fab6b6; color: #fff; border: none"
          >
            删除
          </button>
          <button class="btn margin_right" style="border: 1px solid #e0e0e0">
            导出
          </button>
        </div>
        <el-table
          :data="tableData"
          style="width: 960px."
          border
          :cell-style="{
            'text-align': 'center',
            color: '#333',
            'font-weight': '500',
          }"
          :header-cell-style="{
            color: '#606060',
            'text-align': 'center',
          }"
        >
          <el-table-column type="selection" min-width="60"> </el-table-column>
          <el-table-column
            label="专家分组"
            prop="group"
            sortable
            min-width="90"
          >
          </el-table-column>
          <el-table-column prop="name" label="专家姓名" sortable min-width="90">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号码"
            sortable
            min-width="90"
          >
          </el-table-column>
          <el-table-column prop="email" label="邮箱" sortable min-width="144">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            sortable
            min-width="90"
          >
          </el-table-column>
          <el-table-column label="头像" min-width="90">
            <template slot-scope="scope">
              <img
                :src="scope.row.pic"
                style="width: 67px; height: 100px; margin: 0 auto;"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="position"
            label="职位/称呼"
            sortable
            min-width="90"
          >
          </el-table-column>
          <el-table-column prop="company" label="公司" sortable min-width="90">
          </el-table-column>
          <el-table-column prop="company" label="状态" sortable min-width="90">
            <template slot-scope="scope">
              <div
                style="
                  margin: 0 auto;
                  background: #f0f9eb;
                  color: #91c35b;
                  border: none;
                  width: 50px;
                  height: 30px;
                  line-height: 30px;
                "
                v-show="scope.row.status == 1"
              >
                启用
              </div>
              <div
                style="
                  margin: 0 auto;
                  background: pink;
                  color: red;
                  border: none;
                  width: 50px;
                  height: 30px;
                  line-height: 30px;
                "
                v-show="scope.row.status == 0"
              >
                未启用
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="90">
            <template>
              <i
                class="el-icon-edit"
                style="color: #409eff; margin-right: 10px; cursor: pointer"
              ></i>
              <i
                class="el-icon-delete"
                style="color: #409eff; cursor: pointer"
              ></i>
            </template>
          </el-table-column>
        </el-table>
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
    <my-footer></my-footer>
  </div>
</template>

<script>
import myFooter from "@/components/footer";
import myHeader from "@/components/myHeader";
import leftMenu from "@/components/leftMenu";
import signin from "@/components/onlineBidEvaluate/signin";
import decrypt from "@/components/onlineBidEvaluate/decrypt";
import reviewResults from "@/components/onlineBidEvaluate/reviewResults";
import uploadVideo from "@/components/onlineBidEvaluate/uploadVideo";
import NewExpertDatabase from '@/components/openBid/newExpertDatabase.vue';
export default {
  data() {
    return {
      loading: false,
      bWidth: 0,
      width: 0,
      list: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      input: "",
      value: "",
      showNewExpertDatabase:false,
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
      tableData: [
        {
          group: "行业专家1",
          name: "张三",
          phone: "13581442016",
          email: "123456@163.com",
          username: "张三",
          pic: "https://tse4-mm.cn.bing.net/th/id/OIP-C.RFmRXYNnJQizc9wK1l_-IgAAAA?w=204&h=204&c=7&r=0&o=5&pid=1.7",
          position: "总经理",
          company: "聚联科技",
          status: 0,
        },
        {
          group: "行业专家2",
          name: "李四",
          phone: "15184565111",
          email: "456844@163.com",
          username: "李四",
          pic: "https://tse4-mm.cn.bing.net/th/id/OIP-C.RFmRXYNnJQizc9wK1l_-IgAAAA?w=204&h=204&c=7&r=0&o=5&pid=1.7",
          position: "秘书",
          company: "广志科技",
          status: 1,
        },
      ],
    };
  },
  computed: {},
  components: {
    myFooter,
    myHeader,
    leftMenu,
    signin,
    decrypt,
    reviewResults,
    uploadVideo,
    NewExpertDatabase,
  },
  async mounted() {
    // if(!this.until.seGet('userInfo')){
    //     this.until.href('./login.html')
    // }
    console.log(this.navList);
    this.getWidth();
    // this.getList()
    // this.userInfo = JSON.parse(this.until.seGet('userInfo'))
    window.onresize = () => {
      this.getWidth();
    };
  },
  methods: {
    getWidth() {
      let { bWidth, width } = this.until.getWidth();
      this.bWidth = bWidth;
      this.width = width;
    },
    //页面跳转
    toPage(url) {
      this.until.href(url);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>
<style lang="less" scoped>
#home {
  .tableHeader {
    background: @themeColor;
    color: #fff;
    border: 0;
    text-align: center;
  }
  .rowList {
    padding: 20px 0;
  }
}
</style>
<style lang="less" scoped>
@import url("../../../assets/css/init.less");
#home {
  background-color: #f3f3f3;

  .container {
    padding-top: 20px;
    padding-bottom: 100px;
    background: url(../../../assets/img/footer.png);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: bottom center;
    margin: 0 auto;
    height: calc(~"100vh - 298px");
    display: flex;
    .rightMenu {
      box-sizing: border-box;
      background: #fff;
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
      .btn {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        border-radius: 5px;
      }

      .margin_right {
        margin-right: 15px;
      }
      .condition_box {
        height: 40px;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .el-input {
          width: 202px;
        }
        .el-select {
          width: 202px;
        }
      }
      .btn_box {
        margin-bottom: 20px;
      }
      .Footer {
        display: flex;
        justify-content: center;
        margin: 44px 0 20px;
      }
    }
  }
  .gray {
    color: #999999;
  }
}
</style>
