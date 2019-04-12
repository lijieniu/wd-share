const menu = {
  home: {
    name: 'menu.home',
    path: '/',
    icon: 'el-icon-menu',
  },
  user: {
    name: 'menu.usermanage',
    icon: 'el-icon-menu',
    path: '/user'
  },
  share: {
    name: 'menu.sharemanage',
    icon: 'el-icon-menu',
    path: '/share'
  },
  myshare: {
    name: 'menu.myshare',
    icon: 'el-icon-menu',
    path: '/mine'
  },
  content: {
    name: 'menu.articlemanage',
    icon: 'el-icon-document',
    children: {
      list: {
        name: 'menu.articlequery',
        icon: 'el-icon-edit-outline',
        path: '/article/list'
      },
      add: {
        name: 'menu.articleadd',
        icon: 'el-icon-edit-outline',
        path: '/article/add'
      }
    }
  }
};

export default menu;