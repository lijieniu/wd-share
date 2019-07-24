<template>
    <div>
      <el-upload
        class="avatar-uploader"
        action="/admin/api/uploadfile"
        :show-file-list="false">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
</template>
<style>

</style>
<script type="babel">
import { SET_ARTICLE_LIST, DELETE_ARTICLE, SET_USER_LIST } from '../../store/mutation-type';
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
      batchSelectArray: []
    };
  },
  methods: {
    fetchApi({ $store, $router }, json) {
      return $store.dispatch(SET_USER_LIST, json);
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
    userList() {
      return this.$store.state.userList;
    }
  }
};
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

