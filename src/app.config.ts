export default {
  lazyCodeLoading: "requiredComponents", // 自基础库版本 2.11.1 起，小程序支持有选择地注入必要的代码，以降低小程序的启动时间和运行时内存。
  pages: [
    "pages/index/index",
    "pages/music/music",
    "pages/video/video",
    "pages/my/my",
    "pages/index/book/index",
    "pages/index/detail/index"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  tabBar: {
    color: "#6E7179",
    selectedColor: "#1296db",
    list: [
      {
        pagePath: "pages/index/index",
        text: "小说",
        iconPath: "./imgs/book.png",
        selectedIconPath: "./imgs/selected_book.png"
      },
      {
        pagePath: "pages/music/music",
        text: "音乐",
        iconPath: "./imgs/music.png",
        selectedIconPath: "./imgs/selected_music.png"
      },
      {
        pagePath: "pages/video/video",
        text: "视频",
        iconPath: "./imgs/video.png",
        selectedIconPath: "./imgs/selected_video.png"
      },
      {
        pagePath: "pages/my/my",
        text: "我的",
        iconPath: "./imgs/my.png",
        selectedIconPath: "./imgs/selected_my.png"
      }
    ]
  }
};
