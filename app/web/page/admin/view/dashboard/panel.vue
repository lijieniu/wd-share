<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div :style="{width: '300px', height: '300px'}" id="myEcharts">图表</div>
    </el-col>
  </el-row>
</template>

<script>

export default {
  components: {},
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    }
  },
  mounted() {
    let myEcharts = this.$echarts.init(document.getElementById('myEcharts'));
    myEcharts.setOption({
      title: {
        text: '我的图表'
      },
      xAxis: {
        data: ['a', 'b']
      },
      yAxis: {},
      series: {
        name: '测试',
        type: 'bar',
        data: [1, 2]
      }
    });
  }
};
</script>

<style scoped>
.panel-group {
  margin-top: 18px;
}

.panel-group .card-panel-col {
  margin-bottom: 32px;
}

.panel-group .card-panel {
  height: 108px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
}

.panel-group .card-panel:hover .card-panel-icon-wrapper {
  color: #fff;
}

.panel-group .card-panel:hover .icon-people {
  background: #40c9c6;
}

.panel-group .card-panel:hover .icon-message {
  background: #36a3f7;
}

.panel-group .card-panel:hover .icon-money {
  background: #f4516c;
}

.panel-group .card-panel:hover .icon-shoppingCard {
  background: #34bfa3;
}

.panel-group .card-panel .icon-people {
  color: #40c9c6;
}

.panel-group .card-panel .icon-message {
  color: #36a3f7;
}

.panel-group .card-panel .icon-money {
  color: #f4516c;
}

.panel-group .card-panel .icon-shoppingCard {
  color: #34bfa3;
}

.panel-group .card-panel .card-panel-icon-wrapper {
  float: left;
  margin: 14px 0 0 14px;
  padding: 16px;
  transition: all 0.38s ease-out;
  border-radius: 6px;
}

.panel-group .card-panel .card-panel-icon {
  float: left;
  font-size: 48px;
}

.panel-group .card-panel .card-panel-description {
  float: right;
  font-weight: bold;
  margin: 26px;
  margin-left: 0px;
}

.panel-group .card-panel .card-panel-description .card-panel-text {
  line-height: 18px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  margin-bottom: 12px;
}

.panel-group .card-panel .card-panel-description .card-panel-num {
  font-size: 20px;
}
</style>
