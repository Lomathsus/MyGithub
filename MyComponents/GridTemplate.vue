<template>
  <div class="grid" :style="getStyle()">
    <div class="gird-item" v-for="(item, index) in girdList" :key="index">
      <div class="item-img-wrap">
        <el-image fit="cover" :lazy="true" style="width: 100%; height: 100%"></el-image>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'gridtemplate',

    props: {
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
        type: Number,
        default: 20
      }
    },

    methods: {
      getStyle () {
        const templateRow = this.times(this.rowHeight + "px", this.fixedRow);
        const templateColumn = this.times(this.columnWidth + "px", this.fixedColumn);
        const autoRow = this.times(this.rowHeight + "px");
        const autoColumn = this.times(this.columnWidth + "px");
        
        return {
        gridTemplateRows: templateRow,
        gridTemplateColumns: templateColumn,
        gridAutoRows: autoRow,
        gridAutoColumns: autoColumn,
        gridGap: this.gridGap + "px"
        }
      },

      times (str, num) {
        let arry = [];
        for (let i = 0; i <num; i++) {
          arry.push(str)
        }
        return arry.join(" ")
      }
    }
  }
</script>

<style lang="less" scoped>
.grid {
  display: grid;
  
}
.grid-item {
  box-shadow: 0px 0px 9px 1px rgba(28,131,228,0.20); 
  background-color: red;
}

</style>