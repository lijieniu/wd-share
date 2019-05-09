'use strict';
import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default function createStore(initState) {
  const state = {
    articleTotal: 0,
    articleList: [],
    article: {},
    // user
    userList: [],
    // topic
    topicList: [],
    topicTotal: 0,
    topic: {},
    ...initState
  };
  return new Vuex.Store({
    state,
    actions,
    getters,
    mutations
  });
}