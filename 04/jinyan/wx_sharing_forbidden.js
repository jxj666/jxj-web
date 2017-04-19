$.ajax({
    url: '/api/tokenjs',
    xhrFields: {
        withCredentials: true
    },
    success: function(res){
        console.log(res);
        var weixin_token = res;
        console.log(weixin_token);
        wx.config({
            debug: false,
            appId: weixin_token.appId,
            timestamp: weixin_token.timestamp,
            nonceStr: weixin_token.noncestr,
            signature: weixin_token.jssdk_sign,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'showOptionMenu',
                'chooseWXPay',
                'hideAllNonBaseMenuItem'
            ]
        })
        wx.ready(function(){
            wx.hideAllNonBaseMenuItem();
        })
    }
})
