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
        <div class="topic-info-left">
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
            <el-form-item label="导师评语">
              <span>{{topicInfo.tutor_comment}}</span>
            </el-form-item>
          </el-form>
        </div>
        <div class="topic-info-right">
          <div class="rating-item">
            <label>演讲技巧</label>
            <el-rate 
              v-model="rateValue"
              :change="changeRating(1)"
              show-score></el-rate>
          </div>
          <div class="rating-item">
            <label>衣着</label>
            <el-rate 
              v-model="rateValue"
              show-score></el-rate>
          </div>
          <div class="rating-item">
            <label>内容</label>
            <el-rate 
              v-model="rateValue"
              show-score></el-rate>
          </div>
          <div class="rating-item">
            <label>互动</label>
            <el-rate 
              v-model="rateValue"
              show-score></el-rate>
          </div>
          <div class="rating-item">
            <label>满意度</label>
            <el-rate 
              v-model="rateValue"
              show-text></el-rate>
          </div>
        </div>
      </div>
      <p class="comment">评论</p>
      <div class="comment-input">
        <div class="avatar"></div>
        <el-input placeholder="输入评论..." v-model="commentContent" clearable></el-input>
        <el-button type="primary">评论</el-button>
      </div>
      <div class="comment-list">
        <div class="comment-list-item">
          <div class="item-up">
            <div class="comment-avatar"></div>
            <div class="comment-info">
              <span class="comment-username">niulijie</span>
              <span class="comment-content">讲的不错,不过还有提升的空间，再接再厉</span>
            </div>
          </div>
          <div class="item-toolbar">
            <span class="comment-time">刚刚</span>
          </div>
        </div>
        <div class="comment-list-item">
          <div class="item-up">
            <div class="comment-avatar"></div>
            <div class="comment-info">
              <span class="comment-username">niulijie</span>
              <span class="comment-content">讲的不错,不过还有提升的空间，再接再厉</span>
            </div>
          </div>
          <div class="item-toolbar">
            <span class="comment-time">刚刚</span>
          </div>
        </div>
        <div class="comment-list-item">
          <div class="item-up">
            <div class="comment-avatar"></div>
            <div class="comment-info">
              <span class="comment-username">niulijie</span>
              <span class="comment-content">讲的不错,不过还有提升的空间，再接再厉</span>
            </div>
          </div>
          <div class="item-toolbar">
            <span class="comment-time">刚刚</span>
          </div>
        </div>
        <div class="comment-list-item">
          <div class="item-up">
            <div class="comment-avatar"></div>
            <div class="comment-info">
              <span class="comment-username">niulijie</span>
              <span class="comment-content">讲的不错,不过还有提升的空间，再接再厉</span>
            </div>
          </div>
          <div class="item-toolbar">
            <span class="comment-time">刚刚</span>
          </div>
        </div>
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
      topicInfo: {},
      rateValue: 3,
      commentContent: ''
    };
  },
  filters: {
    formatDate(time) {
      return moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  methods: {
    changeRating(type) {
      console.log(this.rateValue);
    }
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
.avatar, .comment-avatar {
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
  display: flex;
}
.topic-info-left {
  width: 50%;
}
.topic-info-right {
  width: 50%;
}
.topic-info-right .rating-item {
  line-height: 50px;
  display: flex;
  align-items: center;
}
.rating-item label {
  width: 100px;
  text-align: right;
}
.comment {
  color: #8a9aa9;
  font-size: 18px;
  text-align: center;
}
.comment-input {
  margin: 10px auto;
  background-color: #fafbfc;
  height: 70px;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.comment-input input {
  height: 40px;
  width: 90%;
  border-radius: 3px;
  border: 1px solid #f1f1f1;
  font-size: 16px;
  padding: 5px 10px;
  margin-left: 10px;
}
.el-input {
  width: 83%;
}
.comment-list {
  width: 70%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
}
.comment-avatar {
  width: 40px;
  height: 40px;
}
.comment-list-item {
  padding-left: 80px;
}
.item-up {
  display: flex;
  height: 70px;
  align-items: center;
}
.comment-info {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  height: 60px;
  justify-content: space-around;
}
.comment-username {
  font-size: 14px;
  color: #333333;
}
.comment-content {
  font-size: 14px;
  color: #505050;
}
.comment-time {
  font-size: 14px;
  color: #8a9aa9;
  margin-left: 50px;
}
</style>

