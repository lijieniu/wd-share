'use strict';

import {
  SET_ARTICLE_LIST,
  SET_ARTICLE_DETAIL,
  SET_SAVE_ARTICLE,
  DELETE_ARTICLE,
  SET_USER_LIST,
  SET_SHARE_LIST
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
  [SET_SHARE_LIST](state, { list, total }) {
    state.shareList = list;
    state.shareTotal = total;
  }
};
export default mutations;
