<template>
    <div>
        <p>我的分享</p>
        <div class="search">
            <el-row class="clear">
                <label> 姓名:</label><el-input class="search-input" clearable v-model="q.username" placeholder="姓名"></el-input>
                <label> 标题:</label><el-input class="search-input" clearable v-model="q.title" placeholder="标题"></el-input>
                <el-button class="search-button" type="primary" @click="query()">查询</el-button>
              <el-button @click="isShowNewShareDilog = true" class="new-share" type="success">新增分享<i class="el-icon-circle-plus-outline"></i></el-button>
            </el-row>
        </div>
        <el-table
                :data="topicList"
                v-loading="loading"
                element-loading-text="拼命加载中"
                border
                @selection-change="batchSelect"
                style="width: 100%;">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="姓名"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="department"
                    label="部门"
                    width="200">
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
                    prop="share_time"
                    label="分享时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="room"
                    label="地点"
                    width="200">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="180">
                <template slot-scope="props">
                    <router-link :to="{params: {id: props.row.id}}" tag="span">
                        <el-button type="info" size="small" icon="edit" @click="handleEdit(props.$index, props.row)">修改</el-button>
                    </router-link>
                    <el-button type="danger" size="small" icon="delete" @click="handleDelete(props.$index, props.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 16px">
            <div style="float:left">
                <el-button
                        type="danger"
                        icon="delete"
                        size="small"
                        :disabled="batchSelectArray.length === 0"
                        @click="batchDel"
                        slot="handler">
                    <span>批量删除</span>
                </el-button>
            </div>
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
      <el-dialog title="新建分享" :visible.sync="isShowNewShareDilog">
        <el-form :model="newTopicInfo" label-width="80px">
          <el-form-item label="主题">
            <el-input v-model="newTopicInfo.title"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="newTopicInfo.desc"></el-input>
          </el-form-item>
          <el-form-item label="分享时间">
            <el-input v-model="newTopicInfo.share_time"></el-input>
          </el-form-item>
          <el-form-item label="地点">
            <el-input v-model="newTopicInfo.share_position"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShowNewShareDilog = false">取 消</el-button>
          <el-button type="primary" @click="saveNewShare">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script type="babel">
import { SET_TOPIC_LIST } from '../../store/mutation-type';
export default {
  components: {},
  data() {
    return {
      q: {
        title: undefined,
        username: '',
        categoryId: undefined,
        statusId: undefined,
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
      }
    };
  },
  methods: {
    saveNewShare() {
      console.log(this.newTopicInfo);
      this.isShowNewShareDilog = false;
    },
    fetchApi({ $store, $router }, json) {
      return $store.dispatch(SET_TOPIC_LIST, json);
    },
    query() {
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
      this.$store.dispatch(DELETE_ARTICLE, { id: row.id });
      this.$message(`删除[${row.title}]成功!`);
    },
    //批量选择
    batchSelect(val) {
      this.batchSelectArray = val;
    },
    //批量删除
    batchDel() {
      this.$confirm("将批量删除选择文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.loading = true;
        this.$message.success(msg);
        this.loading = false;
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
  .new-share {
    float: right;
  }
</style>

