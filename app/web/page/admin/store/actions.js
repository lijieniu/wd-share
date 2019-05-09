'use strict';

import * as Type from './mutation-type';
import Vue from 'vue';
import Vuex from 'vuex';
import request from 'framework/network/request';

Vue.use(Vuex);
Vue.prototype.$axios = request;

const actions = {

  SET_ARTICLE_LIST: (store, json) => {
    return request.post('/admin/api/article/list', json, store).then(response => {
      store.commit(Type.SET_ARTICLE_LIST, response.data);
    });
  },
  SET_ARTICLE_DETAIL: (store, { id }) => {
    const { commit, dispatch, state } = store;
    return request.get(`/admin/api/article/${id}`)
      .then(response => {
        commit(Type.SET_ARTICLE_DETAIL, response.data);
      });
  },
  SET_SAVE_ARTICLE: (store, json) => {
    const { commit, dispatch, state } = store;
    return request.post('/admin/api/article/add', json, store).then(response => {
      commit(Type.SET_SAVE_ARTICLE, json);
    });
  },
  DELETE_ARTICLE: (store, { id }) => {
    // 鉴权 TODO
    const { commit, dispatch, state } = store;
    return request.get(`/admin/api/article/del/${id}`, store)
      .then(response => {
        commit(Type.DELETE_ARTICLE, { id });
      });
  },
  SET_USER_LIST: (store) => {
    return request.get('/admin/api/users').then(response => {
      store.commit(Type.SET_USER_LIST, response.data);
    });
  },
  SET_TOPIC_LIST: (store, json) => {
    return request.get('/admin/api/topic', json).then(response => {
      store.commit(Type.SET_TOPIC_LIST, response.data.data);
    });
  },
  SET_SAVE_TOPIC: (store, json) => {
    return request.post('/admin/api/topic', json, store).then(response => {
      store.commit(Type.SET_SAVE_TOPIC, json);
    });
  },
  DELETE_TOPIC: (store, { id }) => {
    return request.delete(`/admin/api/topic/${id}`, store).then(response => {
      store.commit(Type.DELETE_TOPIC, { id });
    });
  },
  SET_TOPIC_DETAIL: (store, { id }) => {
    return request.get(`/admin/api/topic/${id}`).then(response => {
      store.commit(Type.SET_TOPIC_DETAIL, response.data);
    });
  }
};

export default actions;