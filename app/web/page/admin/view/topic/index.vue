<template>
    <div>
        <p>我的分享</p>
        <div class="search">
            <el-row class="clear">
                <label> 姓名:</label><el-input class="search-input" clearable v-model="q.topic_username" placeholder="姓名"></el-input>
                <label> 标题:</label><el-input class="search-input" clearable v-model="q.title" placeholder="标题"></el-input>
                <el-button class="search-button" type="primary" @click="query()">查询</el-button>
              <!-- <el-button @click="addTopic" class="new-share" type="success">新增分享<i class="el-icon-circle-plus-outline"></i></el-button> -->
            </el-row>
        </div>
        <el-table
                :data="topicList"
                v-loading="loading"
                element-loading-text="拼命加载中"
                border
                @selection-change="batchSelect"
                style="width: 100%;"
                :default-sort="{prop: 'create_time', order: 'descending'}">
            <!-- <el-table-column
                    type="selection"
                    width="55">
            </el-table-column> -->
            <el-table-column
              fixed
              type="index">
            </el-table-column>
            <el-table-column
                    prop="topic_username"
                    label="姓名"
                    width="100">
            </el-table-column>
            <el-table-column
                    label="部门"
                    width="200">
                    <template slot-scope="scope">
                      <span>技术部</span>
                    </template>
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="标题"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="desc"
                    label="简介"
                    width="200">
            </el-table-column>
            <el-table-column
              prop="create_time"
              label="创建时间"
              :formatter="formatDate"
              width="200">
            </el-table-column>
            <el-table-column
                    prop="topic_time"
                    label="分享时间"
                    :formatter="formatDate"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="topic_position"
                    label="地点"
                    width="200">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="props">
                    <!-- <el-button type="info" size="small" icon="edit" @click="handleEdit(props.$index, props.row)">修改</el-button> -->
                    <!-- <el-button type="danger" size="small" icon="delete" @click="handleDelete(props.$index, props.row)">删除</el-button> -->
                    <el-button type="success" size="small" icon="delete" @click="toDetail(props.row.id)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 16px">
            <div style="float:right">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="q.pageIndex"
                        :page-sizes="[10, 15, 20, 50]"
                        :page-size="q.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script type="babel">
import { SET_TOPIC_LIST, SET_SAVE_TOPIC, DELETE_TOPIC } from '../../store/mutation-type';
import moment from 'moment';
export default {
  components: {},
  data() {
    return {
      q: {
        title: undefined,
        topic_username: undefined,
        pageIndex: 1,
        pageSize: 10
      },
      //请求时的loading效果
      loading: false,
      //批量选择数组
      batchSelectArray: [],
      isShowNewShareDilog: false,
      newTopicInfo: {},
      formStyle: {
        formlableWidth: '120px',
        formInputWidth: '300px'
      },
      currentIndex: 0,
      dialogTitle: '新建分享'
    };
  },
  methods: {
    addTopic() {
      this.dialogTitle = '新建分享';
      this.isShowNewShareDilog = true;
    },
    saveNewShare() {
      this.newTopicInfo.topic_username = window.userInfo.username ? window.userInfo.username : 'admin';
      this.isShowNewShareDilog = false;
      if(this.newTopicInfo.id) {
        this.topicList.splice(this.topicList.length - 1 - this.currentIndex, 1, this.newTopicInfo);
      }
      this.$store.dispatch(SET_SAVE_TOPIC, this.newTopicInfo);
      this.$message({
        message: '修改成功！',
        type: 'success'
      });
      this.newTopicInfo = {}
    },
    fetchApi({ $store, $router }, json) {
      return $store.dispatch(SET_TOPIC_LIST, json);
    },
    query() {
      let realQuery = {}
      Object.keys(this.q).map(item => {
        if(this.q[item] && this.q[item] !== '') {
          realQuery[item] = this.q[item];
        }
      });
      this.fetchApi(this, this.q);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.q.pageSize = val;
      this.fetchApi(this, this.q);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.q.pageIndex = val;
      this.fetchApi(this, this.q);
    },
    handleDelete(index, row) {
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch(DELETE_TOPIC, { id: row.id });
        this.$message({
          message: '删除成功！',
          type: 'success'
        });
      });
    },
    handleEdit(index, row) {
      this.dialogTitle = '修改分享';
      this.newTopicInfo = Object.assign({}, row);
      this.currentIndex = index;
      this.isShowNewShareDilog = true;
    },
    //批量选择
    batchSelect(val) {
      this.batchSelectArray = val;
    },
    //批量删除
    batchDel() {
      this.$confirm("将批量删除选择的分享, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.loading = true;
        this.$message.success('删除成功');
        this.loading = false;
      });
    },
    formatDate(row) {
      return moment(row.create_time).format('YYYY-MM-DD HH:mm:ss');
    },
    toDetail(topicId) {
      this.$router.push({
        path: `/topic/${topicId}`
      });
    }
  },
  computed: {
    total() {
      return this.$store.state.shareTotal;
    },
    topicList() {
      return this.$store.state.topicList;
    }
  }
};
</script>
<style>
</style>

