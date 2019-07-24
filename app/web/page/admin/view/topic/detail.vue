<template>
    <div>
      <p class="title">分享详情</p>
      <div class="user-info">
        <div class="user-info-left">
          <div class="avatar-defalut" v-if="!userInfo.avatar"></div>
          <div class="avatar" v-else><img :src="userInfo.avatar"/></div>
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
          <div class="rating-item" v-for="(rating, index) in ratingValues" :key="index">
            <label>{{rating.label}}</label>
            <el-rate 
              v-model="rating.value"
              :change="changeRating(index)"></el-rate>
          </div>
        </div>
      </div>
      <p class="comment">评论</p>
      <div class="comment-input">
        <div class="avatar-defalut" v-if="!userInfo.avatar"></div>
        <div class="avatar" v-else><img :src="userInfo.avatar"/></div>
        <el-input placeholder="输入评论..." v-model="commentContent" clearable></el-input>
        <el-button :disabled="!commentContent" @click="comment" :type="'primary'">评论</el-button>
      </div>
      <div class="comment-list" v-if="commentList.length > 0">
        <div class="comment-list-item" v-for="(comment, index) in commentList" :key="index">
          <div class="item-up">
            <div class="comment-avatar-default" v-if="!userInfo.avatar"></div>
            <div class="comment-avatar" v-else><img :src="userInfo.avatar"/></div>
            <div class="comment-info">
              <span class="comment-username">{{comment.user_name ? comment.user_name : '匿名'}}</span>
              <span class="comment-content">{{comment.content}}</span>
            </div>
          </div>
          <div class="item-toolbar">
            <span class="comment-time">{{comment.create_time ? comment.create_time : new Date() | formatDate}}</span>
          </div>
        </div>
      </div>
      <div class="comment-empty" v-else>暂无评论～～～</div>
    </div>
</template>
<script type="babel">
import {SET_TOPIC_DETAIL, SET_SAVE_ARTICLE, SET_SAVE_COMMENT} from '../../store/mutation-type';
import moment from 'moment';
export default {
  components: {},
  data() {
    return {
      topicInfo: {},
      ratingValues: [
        {
          label: '演讲技巧',
          value: 0
        },
        {
          label: '衣着',
          value: 0
        },
        {
          label: '内容',
          value: 0
        },
        {
          label: '互动',
          value: 0
        },
        {
          label: '满意度',
          value: 0
        }
      ],
      commentContent: '',
      commentList: [],
      value: '3.7',
      userInfo: {}
    };
  },
  filters: {
    formatDate(time) {
      return moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  methods: {
    changeRating(index) {
      let rating = this.ratingValues[index];
    },
    comment() {
      let comment = {
        topic_id: this.$route.params.id,
        content: this.commentContent,
        rating: JSON.stringify(this.ratingValues),
        user_name: window.userInfo.username
      }
      this.commentList.unshift(comment);
      this.$store.dispatch(SET_SAVE_COMMENT, comment).then(() => {
        this.commentContent = '';
      });
    },
    formatRating() {
      if(this.commentList.length > 0) {
        let sumRating = {};
        this.commentList.forEach(item => {
          let rating = JSON.parse(item.rating);
          this.ratingValues.forEach((item, index) => {
            item.value += rating[index].value;
          });
        });
        this.ratingValues.forEach((item, index) => {
          item.value = parseFloat((item.value / this.commentList.length).toFixed(1));
        });
      }
    }
  },
  computed: {
    
  },
  created() {
    let topicId = this.$route.params.id;
    this.$store.dispatch(SET_TOPIC_DETAIL, {id: topicId}).then(() => {
      this.topicInfo = this.$store.state.topic;
      this.commentList = this.topicInfo.commentList;
      this.formatRating();
    });
    this.userInfo = window.userInfo;
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
.avatar-default, .comment-avatar-default {
  background-image: url('../../../../asset/images/default-avatar.png');
  background-size: 100% 100%;
  background-position: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.comment-avatar img, .avatar img {
  width: 100%;
  height: 100%;
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
  margin: 0 10px;
}
.el-input {
  width: 83%;
}
.el-button {
  margin-left: 20px;
}
.comment-list {
  width: 70%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
}
.comment-empty {
  text-align: center;
  font-size: 14px;
  color: #505050;
}
.comment-avatar {
  width: 40px;
  height: 40px;
}
.avatar {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
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

