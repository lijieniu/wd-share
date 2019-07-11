<template>
  <!-- <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div :style="{width: '300px', height: '300px'}" id="myEcharts">图表</div>
    </el-col>
  </el-row> -->
  <div class="page-index">
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="8">
        <p>本期精彩</p>
        <el-card :body-style="{padding: '0px'}">
          <div @click="toDetail(currWeekTopic.id)">
            <p class="title">豌豆公主技术嘉年华</p>
            <img class="card-img" src="https://ossimg.wonderfull.cn/7f330c99c1be1cbf7c91264edbe03c90.png?x-oss-process=image/resize,w_1041,h_558,m_lfit/format,png" alt="">
            <p class="topic-title"><span class="item">主题：</span><span class="content">{{currWeekTopic.title}}</span></p>
            <p class="topic-username"><span class="item">主讲人：</span><span class="content">{{currWeekTopic.topic_username}}</span></p>
            <p class="topic-time"><span class="item">时间：</span><span class="content">{{currWeekTopic.topic_time | formatTime('YYYY年MM月DD日 HH:mm:ss')}}</span></p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <p>下期预告</p>
        <el-card :body-style="{padding: '0px'}">
          <div @click="toDetail(nextWeekTopic.id)">
            <p class="title">豌豆公主技术嘉年华</p>
            <img class="card-img" src="https://ossimg.wonderfull.cn/7f330c99c1be1cbf7c91264edbe03c90.png?x-oss-process=image/resize,w_1041,h_558,m_lfit/format,png" alt="">
            <p class="topic-title"><span class="item">主题：</span><span class="content">{{nextWeekTopic.title}}</span></p>
            <p class="topic-username"><span class="item">主讲人：</span><span class="content">{{nextWeekTopic.topic_username}}</span></p>
            <p class="topic-time"><span class="item">时间：</span><span class="content">{{nextWeekTopic.topic_time | formatTime('YYYY年MM月DD日 HH:mm:ss')}}</span></p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'panel',
  data() {
    return {
      currWeekTopic: {},
      nextWeekTopic: {}
    }
  },
  components: {},
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    },
    toDetail(topicId) {
      this.$router.push({
        path: `/topic/${topicId}`
      });
    }
  },
  mounted() {
    // 获取本周以及下周的两个分享
    this.$axios.get('/admin/api/getWeekTopic').then(res => {
      this.currWeekTopic = res.data.data[1];
      this.nextWeekTopic = res.data.data[0];
    });
    // let myEcharts = this.$echarts.init(document.getElementById('myEcharts'));
    // myEcharts.setOption({
    //   title: {
    //     text: '我的图表'
    //   },
    //   xAxis: {
    //     data: ['a', 'b']
    //   },
    //   yAxis: {},
    //   series: {
    //     name: '测试',
    //     type: 'bar',
    //     data: [1, 2]
    //   }
    // });
  }
};
</script>

<style scoped>
.el-col {
  margin: 20px;
}
.card-img {
  width: 100%;
}
.title {
  font-weight: bold;
  line-height: 50px;
}
.topic-title, .topic-username, .topic-time {
  font-size: 16px;
  text-align: start;
}
.topic-title .content, .topic-username .content, .topic-time .content {
  font-size: 20px;
  font-weight: 500;
}
.topic-title .item, .topic-username .item, .topic-time .item {
  width: 100px;
  display: inline-block;
  text-align: end;
}
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
