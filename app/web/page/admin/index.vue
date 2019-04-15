<template>
  <AdminLayout v-if="!isLogin">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </AdminLayout>
  <login-page v-else>
  </login-page>
</template>
<script type="text/babel">
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import AdminLayout from 'component/layout/admin/index.vue';
import LoginPage from './login.vue';

Vue.use(ElementUI);

export default {
  data() {
    return {
      isLogin: false
    }
  },
  components: {
    AdminLayout,
    LoginPage
  },
  computed: {},
  mounted() {
    if(this.$route.path === '/login') {
      this.isLogin = true;
    } else {
      if(sessionStorage.getItem('userInfo') === '') {
        location.href = '/admin/login';
      } else {
        this.isLogin = false;
      }
    }
  },
};
</script>