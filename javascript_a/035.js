/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:25:48
 */
//强制音频自动播放
$(window).one("touchstart", function() {
  music.play();
});

document.addEventListener(
  "WeixinJSBridgeReady",
  function() {
    music.play();
  },
  false,
);
