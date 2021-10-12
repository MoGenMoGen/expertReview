<template>
  <!-- 解密 -->
  <div style="max-width: 100%">
    <div class="title">12米玻璃钢新型渔船 （项目编号：BHZC2021-G3-0001）</div>
    <div class="video_top">
      <div class="small_title">评标视频</div>
      <div class="btn_upload">上传</div>
    </div>
    <div class="video_list" style="margin-top:20px;">
      <video width="320" height="240" controls>
        <source src="https://www.bilibili.com/video/BV173411C7LV?spm_id_from=333.851.b_7265636f6d6d656e64.2" type="video/mp4" />
        <source src="https://www.bilibili.com/video/BV173411C7LV?spm_id_from=333.851.b_7265636f6d6d656e64.2" type="video/ogg" />
        <source src="https://www.bilibili.com/video/BV173411C7LV?spm_id_from=333.851.b_7265636f6d6d656e64.2" type="video/webm" />
        您的浏览器不支持 HTML5 video 标签。
      </video>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
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
  }
}
</style>