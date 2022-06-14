<template>
  <!-- 
    【面包屑获取动态路由】
    在router文件夹中配置path(地址栏中路径)与meta.pathName(想要在面包屑中显示的名称)
    eg： path： /page1/page1-2/page1-2-3
        meta.pathName: page1Name/page1-2Name/page1-2-3Name
    会计算出一个数组包含面包屑名称及其对应的路径
    如果配置中只有路径没有名称将不会显示在面包屑中
    可通过父组件:title="val"将标题传入面包屑
   -->
  <div class="location">
    <i class="el-icon-map-location"/>
    <el-breadcrumb class="wrap" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <template v-for="item in list">
        <el-breadcrumb-item
          :key="item.name"
          :to="{ path: item.link }"
          v-if="!!item.name">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
      <el-breadcrumb-item v-if="!!title"> {{title}} </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "breadcrumb",
  props: {
    title: "",
  },

  data() {
    return {
      list: [],
    };
  },

  methods: {
    getBreadcrumb () {
      const nameItem = this.$route.meta.pathName.split('/');
      const pathItem = this.$route.path.split('/');
      pathItem.splice(0,1);
      // console.log(nameItem);
      // console.log(pathItem);
      let list = [];
      const length = pathItem.length;
      let tempLink = "";
      for (let i = 0; i < length; i++) {
          tempLink = tempLink + `/${pathItem[i]}`;
          list.push({
          name: nameItem[i],
          link: tempLink,
          })
      }
      this.list = list
      console.log(this.list);
    }
  },

  created () {
    this.getBreadcrumb();
  },

  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
}

</script>
<style scoped lang="less">
.location {
  height: 25px;
  font-size: 14px;
  margin-bottom: 30px;
  .el-icon-map-location {
    position: relative;
    height: 25px;
    width: 18px;
    margin-right: 10px;
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .wrap {
    line-height: 25px;
    display: inline-block;
  }
}
// 面包屑属性设置
/deep/ .el-breadcrumb__inner {
  font-weight: 400;
  color: #0379D5;
}
</style>