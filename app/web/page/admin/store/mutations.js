'use strict';

import {
  SET_ARTICLE_LIST,
  SET_ARTICLE_DETAIL,
  SET_SAVE_ARTICLE,
  DELETE_ARTICLE,
  SET_USER_LIST,
  SET_TOPIC_LIST,
  SET_SAVE_TOPIC,
  DELETE_TOPIC
} from './mutation-type';
import { strictEqual } from 'assert';

const mutations = {
  [SET_ARTICLE_LIST](state, { list, total }) {
    state.articleTotal = total;
    state.articleList = list;
  },
  [SET_ARTICLE_DETAIL](state, data) {
    state.article = data;
  },
  [SET_SAVE_ARTICLE](state, data) {
    state.articleTotal += 1;
    state.articleList = [data].concat(state.articleList);
  },
  [DELETE_ARTICLE](state, { id }) {
    state.articleTotal -= 1;
    state.articleList = state.articleList.filter(item => {
      return item.id !== id;
    });
  },
  [SET_USER_LIST](state, { list }) {
    state.userList = list;
  },
  [SET_TOPIC_LIST](state, { list, total }) {
    state.topicList = list;
    state.topicTotal = total;
  },
  [SET_SAVE_TOPIC](state, data) {
    if(!data.id) { // 新增
      state.topicTotal += 1;
      state.topicList = state.topicList.concat([data]);
    }
  },
  [DELETE_TOPIC](state, {id}) {
    state.topicTotal -= 1;
    state.topicList = state.topicList.filter(item => {
      return item.id !== id;
    });
  }
};
export default mutations;
