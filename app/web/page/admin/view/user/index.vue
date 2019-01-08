<template>
    <div>
        <p>学生管理</p>
        <div class="search">
            <el-row class="clear">
                <label> 姓名:</label><el-input class="search-input" clearable v-model="q.title" placeholder="学生姓名"></el-input>
                <label> 班级:</label><el-select  v-model="q.categoryId" placeholder="班级">
                <el-option v-for="item in categories"
                           :key="item.id"
                           :label="item.name"
                           :value="item.categoryId">
                </el-option>
            </el-select>
                <label> 状态:</label><el-select  v-model="q.status" placeholder="状态">
                <el-option v-for="item in status"
                           :key="item.id"
                           :label="item.name"
                           :value="item.status">
                </el-option>
            </el-select>
                <el-button class="search-button" type="primary" @click="query()">查询</el-button>
            </el-row>
        </div>
        <el-table
                :data="userList"
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
                    prop="s_no"
                    label="学号">
            </el-table-column>
            <el-table-column
                    prop="s_name"
                    label="姓名"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="s_class"
                    label="班级"
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
    </div>
</template>
<style>

</style>
<script type="babel">
import { SET_ARTICLE_LIST, DELETE_ARTICLE } from '../../store/mutation-type';
export default {
  components: {},
  data() {
    return {
      q: {
        title: undefined,
        categoryId: undefined,
        statusId: undefined,
        pageIndex: 1,
        pageSize: 10
      },
      //请求时的loading效果
      loading: false,
      //批量选择数组
      batchSelectArray: [],
      userList: [
        {
          id: '1',
          s_no: '201801',
          s_name: 'tom',
          s_class: '计算机一班',
        },
        {
          id: '1',
          s_no: '201802',
          s_name: 'lily',
          s_class: '计算机二班',
        },
        {
          id: '1',
          s_no: '201803',
          s_name: '张三',
          s_class: '计算机一班',
        },
        {
          id: '1',
          s_no: '201804',
          s_name: '李四',
          s_class: '计算机一班',
        },
        {
          id: '1',
          s_no: '201805',
          s_name: '王二',
          s_class: '计算机一班',
        }
      ]
    };
  },
  methods: {
    fetchApi({ $store, $router }, json) {
      return $store.dispatch(SET_ARTICLE_LIST, json);
    },
    query() {
      this.fetchApi(this, this.q);
    },
    write() {
      this.$router.push("/article/add");
    },
    handleSelectionChange(val) {
      console.log("handleSelectionChange", val);
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
    handleEdit(index, row) {
      this.$message(`你点击了编辑操作 index:${index}, id:${row.id}`);
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
    status() {
      return [
        { status: undefined, name: "--请选择--" },
        { status: 1, name: "已发布" },
        { status: 2, name: "草稿" }
      ];
    },
    categories() {
      return [
        { categoryId: 0, name: "--请选择--" },
        { categoryId: 1, name: "Nodejs" },
        { categoryId: 2, name: "Webpack" },
        { categoryId: 3, name: "Egg" }
      ];
    },
    total() {
      return this.$store.state.articleTotal;
    },
  }
};
</script>
