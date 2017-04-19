/**
 * Created by carol on 16/8/28.
 */

var appId = 'wx5685254c493b66d2';
var pay_appId = 'wx5f63763b545926ce';

var domain = 'http%3A%2F%2Fweiyan.taozuike.cn%2Fwechat%2Fuserinfo%2Fauth';
var pay_domain = 'http%3A%2F%2Fweiyan.taozuike.cn%2Fwechat%2Fpay%2Fauth';

function redirect() {
	window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ appId +'&redirect_uri='+ domain +'&response_type=code&scope=snsapi_userinfo&state=order-detail#wechat_redirect';
}
