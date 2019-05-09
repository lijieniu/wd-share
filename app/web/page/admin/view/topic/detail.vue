<template>
    <div>
      <p class="title">分享详情</p>
      <div class="user-info">
        <div class="user-info-left">
          <div class="avatar"></div>
        </div>
        <div class="user-info-right">
          <span class="username">{{topicInfo.topic_username}}</span>
          <span class="topic-create-time">{{topicInfo.update_time | formatDate}} 阅读100</span>
        </div>
      </div>
      <div class="topic-info">
        <el-form :model="topicInfo" label-width="80px">
          <el-form-item label="主题">
            <span>{{topicInfo.title}}</span>
          </el-form-item>
          <el-form-item label="描述">
            <span>{{topicInfo.desc}}</span>
          </el-form-item>
          <el-form-item label="分享时间">
            <span>{{topicInfo.topic_time | formatDate}}</span>
          </el-form-item>
          <el-form-item label="地点">
            <span>{{topicInfo.topic_position}}</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>
<script type="babel">
import {SET_TOPIC_DETAIL} from '../../store/mutation-type';
import moment from 'moment';
export default {
  components: {},
  data() {
    return {
      topicInfo: {
        title: 'hah',
        desc: 'aaa',
        topic_time: '111',
        topic_position: '222'
      }
    };
  },
  filters: {
    formatDate(time) {
      return moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  methods: {
    
  },
  computed: {
    
  },
  created() {
    let topicId = this.$route.params.id;
    this.$store.dispatch(SET_TOPIC_DETAIL, {id: topicId}).then(() => {
      this.topicInfo = this.$store.state.topic;
    });
  }
};
</script>
<style>
.title {
  height: 50px;
}
.user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.user-info-left {
  width: 50px;
  height: 50px;
}
.avatar {
  background-image: url('../../../../asset/images/default-avatar.png');
  background-size: 100% 100%;
  background-position: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.user-info-right {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.username {
  color: #333333;
  font-weight: 700;
}
.topic-create-time {
  color: #909090;
  font-size: 14px;
}
.topic-info {
  width: 50%;
}
</style>

