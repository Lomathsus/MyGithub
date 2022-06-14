<!-- 
  【部分组件化gird+马灯组件】
  导入组件gridTemplate，在<grid-template>中
  1、整个组件高度继承外部容器
  2、:gridHeight="val" 走马灯内部的卡片高度
  3、:gridList="list" 传入走马灯内容数组（需先切片）
  4、:fixedRow="val" 固定显示行
  5、:fixedColumn="val" 固定显示列
  6、:flexRow="val" 当固定行数不够时，能够最大自适应显示行数
  7、:flexColumn="val" 当固定列数不够时，能够最大自适应显示列数（本条建议不设置，会出现显示bug)
  8、:gridGap="'{行间距}px {列间距}px'" 设置item与item之间的行列间距
  9、:columnWidth="val" grid内部item列宽
  10、:rowHeight="ca;" grid内部item行高
-->
<template>
  <el-carousel class="carousel-wrap" :height="carouselHeight" :autoplay="false" :loop="false" arrow="never" indicator-position="outside">
    <el-carousel-item class="carousel-item" v-for="(list, index) in gridList" :key="index">
      <div class="grid" :style="getStyle()">
        <div class="grid-item" v-for="(item, index2) in list" :key="index2">
            <el-image :src="item.imgUrl" fit="cover"></el-image>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    name: 'gridTemplate',

    props: {
      gridHeight: {
        type: Number,
        default: 300
      },

      gridList: {
        type: Array,
        default: () => {
          return []
        }
      },

      fixedRow: {
        type: Number,
        default: 0
      },

      fixedColumn: {
        type: Number,
        default: 0
      },

      flexRow: {
        type: Number,
        default: 4
      },

      flexColumn: {
        type: Number,
        default: 4
      },

      rowHeight: {
        type: Number,
        default: 73
      },

      columnWidth: {
        type: Number,
        default: 260
      },
      
      gridGap: {
        type: String,
        default: 
          "20px 20px"
      }
    },

    data () {
      return {
        carouselHeight: "",
      }
    },

    methods: {
      getStyle () {
        const templateRow = this.times(this.rowHeight + "px", this.fixedRow);
        const templateColumn = this.times(this.columnWidth + "px", this.fixedColumn);
        const autoRow = this.times(this.rowHeight + "px", this.flexRow);
        const autoColumn = this.times(this.columnWidth + "px", this.flexColumn);
        return {
        gridTemplateRows: templateRow,
        gridTemplateColumns: templateColumn,
        gridAutoRows: autoRow,
        gridAutoColumns: autoColumn,
        gridGap: this.gridGap
        }
      },

      times (str, num) {
        let arry = [];
        for (let i = 0; i <num; i++) {
          arry.push(str)
        }
        return arry.join(" ")
      },
    },

    mounted () {
       this.carouselHeight =  this.gridHeight + "px";
    }
  }
</script>

<style lang="less" scoped>
.carousel-wrap {
  width: inherit;
  // height: 420px;
  margin: 40px auto 0 auto;
}
.grid {
  margin-top: 10px;
  box-sizing: border-box;
  width: inherit;
  display: grid;
  justify-content: center;
}
.grid-item {
  box-shadow: 0px 0px 9px 1px rgba(28,131,228,0.20); 
  position: relative;
  &:hover {
    cursor: pointer;
  }
}
.el-image {
  height: 63px;
  width: 250px; 
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}
// 走马灯设置
/deep/ .el-carousel__indicators {// 指示器
  // left: 50%;
  bottom: 10px;
  // transform: translateX(-50%);
}
/deep/ .el-carousel__button {// 指示器按钮
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #E6E6E6;
}
/deep/ .is-active .el-carousel__button {// 指示器激活按钮
  background: #1D59B2;
  border-radius: 4px;
  width: 18px;
  height: 8px;
}
</style>