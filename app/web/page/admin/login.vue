<template>
    <div class="login-container">
        <el-form status-icon :model="userInfo" ref="userInfoForm" :rules="userInfoRules">
            <span class="title">豌豆公主技术分享管理后台</span>
            <el-form-item label="用户名" prop="username">
                <el-input size="medium" v-model="userInfo.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" size="medium" v-model="userInfo.password"></el-input>
            </el-form-item>
            <el-button type="success" class="login" @click="login('userInfoForm')">登录</el-button>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        let validatePass = (rule, value, callback) => {
            if(value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };
        return {
            userInfo: {
                username: '',
                password: ''
            },
            userInfoRules: {
                password: [
                    {
                        validator: validatePass,
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        login(formName) {
            let _this = this;
            this.$refs[formName].validate(valid => {
                if(valid) {
                    this.$axios.post('/admin/api/login', {username: this.userInfo.username, password: this.userInfo.password}).then(res => {
                        console.log(res.data.data);
                        if(res.data.data.errno === 0) {
                            sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo));
                            location.href = '/';
                        } else {
                            _this.$message({
                                type: 'success',
                                message: res.data.data
                            });
                        }
                    });
                } else {
                    return false;
                }
            });
        }
    }
}
</script>
<style scoped>
    .login-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    form {
        width: 300px;
        text-align: center;
    }
    form .title {
        font-size: 20px;
        font-weight: bold;
    }
    form .login {
        width: 100%;
    }
</style>

