//*********
// _________common
function common(name) {
    this.name = name;
    this.able = {};
    this.able.console_data = function(res, name) {
        if (res.code != '1') {
            console.log(name + '接口错误! ->' + res.msg);
        } else {
            common_val.i += 1;
            console.log('运行排序:' + common_val.i, '接口:' + name, res);
        }
    };
    this.able.getQueryString = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(?:&|$)", 'i');
        var str_arr = window.location.search.substr(1).match(reg);
        return str_arr != null ? str_arr[2] : null;
    };
    this.able.getParamObj = function() {
        let str = location.search;
        if (!str) {
            return {};
        }
        str = str.substr(1);
        let theRequest = {};
        let strs = str.split('&');
        $.each(strs, function(i, v) {
            theRequest[v.split('=')[0]] = decodeURIComponent(v.split('=')[1]);
        });
        common_val.theRequest = theRequest;
    };
    this.able.ajax = function(url, method, data, explain, callback) {
        var port = explain;
        port = port + ' : ' + url;
        $.ajax({
            url: url,
            method: method,
            data: data
        }).done(function(res) {
            dc.able.console_data(res, port);
            callback && callback(res);
        }).fail(function(jqXHR, textStatus) {
            console.log(jqXHR, textStatus);
        });
    }
}
var common_val = {
    i: 0,
    theRequest: {}
}
//*********
// _________组件
//draw_card 简写 dc
var dc = new common('draw_card');

//*********
// _________变量
dc.noun = {
    i: 0,
    author: 'jxj'

};
//*********
// _________函数
dc.fun = {
    main: function() {
        dc.able.getParamObj();
        dc.noun.isWeixin = navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
        const act_id = common_val.theRequest.activityId;
        const barCode = common_val.theRequest.barcode;
        console.log(act_id, barCode);
        if (!act_id) {
            alert('缺少活动id');
            return;
        }
        if (!barCode) {
            alert('请扫码进入活动');
            return;
        }
        var url = `/qr/info/${barCode}?activityId=${act_id}`;
        console.log(1);
        dc.ajax.get_barCode(url);




    },
    bcAniamtion: function() {
        let wrap = $('[data-info="broadcast"]'); // 定义滚动区域
        let interval = 2000; // 定义滚动间隙时间
        let moving; // 需要清除的动画

        // 小喇叭动画
        moving = setInterval(() => {
            if (wrap.children().length <= 1) {
                clearInterval(moving);
                moving = null;
                return;
            }
            // 不可放置于函数起始处,li:first取值是变化的
            let field = wrap.find('li:first');
            let h = field.height();
            field.animate({
                marginTop: -h + 'px',
            }, 600, () => {
                // 隐藏后,将该行的margin值置零,并插入到最后,实现无缝滚动
                field.css('marginTop', 0).appendTo(wrap);
            });
        }, interval);
    },

    trumpet: function(res) {
        if (res.code == 1) {
            let broadcastHtml = '';
            const broadcastList = res.context || [];
            if (broadcastList.length) {
                broadcastList.forEach(function(order) {
                    broadcastHtml += `<li>
                    <h5>用户<span>${order.user && order.user.nickname}</span>获得<span>${order.details[0] ? order.details[0].productName : ''}</span></h5>
                </li>`;
                });
                $('[data-info="broadcast"]').html(broadcastHtml);
                dc.fun.bcAniamtion();
            } else {
                $('[data-info="broadcast"]').html('<li><h5>暂时没有订单</h5></li>');
            }
        }
    },
    isWeixin: function(res) {
        if (dc.noun.isWeixin) {
            wx.config({
                debug: false, //
                appId: weixin_token.appId, // 必填，公众号的唯一标识
                timestamp: weixin_token.timestamp, // 必填，生成签名的时间戳
                nonceStr: weixin_token.nonceStr, // 必填，生成签名的随机串
                signature: weixin_token.signature, // 必填，签名，见附录1
                jsApiList: [
                    'hideAllNonBaseMenuItem',
                ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(() => {
                wx.hideAllNonBaseMenuItem();
            });
        }
    },
    bar_code: function(res) {
        if (res.code == 1) {
            if (res.context.qrinfo.withPin) {
                const qrInfo = res.context.qrinfo;
                const product = qrInfo.product;
                const $scanTip = $('.scan-tip');
                // 4位或6位验证码
                if (qrInfo.pinLen === 4) {
                    data_bar_code.type = 4;
                } else if (qrInfo.pinLen === 6) {
                    data_bar_code.type = 6;
                } else {
                    alert('验证码位数设置有误');
                    return;
                }
                $('.scan_num.active input').val('').on('input', function() {
                    const val = $(this).val();
                    if (val.length === qrInfo.pinLen) {
                        $(this).blur();
                    }
                });

                data_bar_code.img = product.image;
                data_bar_code.name = product.shortName;
                data_bar_code.number = product.scanTimes;
            } else {
                data_bar_code.type = 1;
            }
        }
    }

};
//*********
// _________异步
dc.ajax = {
    //dc.able.ajax(url,method,data,explain,callback)
    get_barCode: function(url) {
        dc.able.ajax(url, 'GET', undefined, '获取码包信息', undefined);
        console.log(1)
    }



};

//*********
// _________vue 
var data_pop_common = {
    name: 'data_pop_common',
    type: 0
};
var app_pop_common = new Vue({
    el: '#app_pop_common',
    data: data_pop_common
})
var data_info = {
    name: 'data_info'
};
var app_info = new Vue({
    el: '#app_info',
    data: data_info,
    methods: {
        choice: function(num) {
            data_pop_common.type = num;
        }
    }
})
var data_bar_code = {
    type: 0,
    img: '',
    name: '',
    number: 0

}
var app_bar_code = new Vue({
    el: '#bar_code',
    data: data_bar_code,
    methods: {

    }
})
//*********
// _________运行
dc.fun.main();






// //通用 js

// var type = getQueryString('type');

// $($('.nav')[0]).text('翻牌').addClass('fanpai');
// //图标切换
// var imgList = [
//     'bag_icon', 'notice_icon', 'prize_icon'
// ];
// $('.nav').on('click', function() {
//     // console.log($(this).index());
//     var index = $(this).index();
//     if (index == 0) {
//         location.href = 'index.html?type=0';
//     } else if (index == 1) {
//         location.href = 'notice.html?type=1';
//     } else if (index == 2) {
//         location.href = 'gift.html?type=2';
//     }
// });

// function getQueryString(name) {
//     var reg = new RegExp("(?:^|&)" + name + "=([^&]*)(?:&|$)", 'i');
//     var str_arr = window.location.search.substr(1).match(reg);
//     return str_arr != null ? str_arr[1] : null;
// }

// $('.click-list').on('click', 'a', function() {
//     // console.log($(this).attr('data-click'));
//     var a = $(this).attr('data-click');
//     $('.tip-bg').removeClass('invisible');
//     $('.' + a + '-tip').removeClass('invisible')
//         .siblings().addClass('invisible');
// });
// $('.tip-close').click(function() {
//     $('.tip-bg').addClass('invisible');
// });

// $('[data-click="winner-list"]').click(function() {
//     location.href = 'winner_list.html';
// });
// $('.num_6 .input').on('input', function() {
//     var val = $(this).val();
//     if (val.length > 5) {
//         $(this).blur();
//     }
// });
// $('.num_4 .input').on('input', function() {
//     var val = $(this).val();
//     if (val.length > 3) {
//         $(this).blur();
//     }
// });

// //关闭弹窗
// $('.coupon-pop-close').on('click', function() {
//     $('.pop-bg').addClass('invisible');

// })
// $('.pop-close').on('click', function() {
//     $('.pop-bg').addClass('invisible');

// })
// //实物弹窗
// $('.pop-bg1 .lucky-get').on('click',function(){
//       $('.pop-bg').addClass('invisible');
//     location.href = 'detail.html?index=1';  
// })
// //红包弹窗
// $('.pop-bg2 .lucky-get').on('click',function(){
//       $('.pop-bg').addClass('invisible');
//     location.href = 'detail.html?index=2';  
// })
// //礼券弹窗get_coupon
// $('.liquan_pop .btn').on('click',function(){
//       $('.pop-bg').addClass('invisible');
//     location.href = 'get_coupon.html';  
// })
// //牌背面
// function card() {
//     $('.center_p img').removeClass('start').attr('src', '../img/card2_03.png');
//     $('.jiuge ul li').addClass('j_change');
//     setTimeout(function() {

//         $('.pai').hide();
//     }, 800)
//     setTimeout(function() {

//         $('.pai').html(`<img src="../img/card2_07.png" alt="" class="beimian">`);
//     }, 1000)
//     setTimeout(function() {
//         $('.jiuge ul li').removeClass('j_change')
//     }, 1000)
//     setTimeout(function() {

//             $('.pai').show();
//         }, 1200)
//         //$('.jiuge ul li').removeClass('j_change');
// }

// //正面初步
// var zhenmian = [
//     [2, 'fanpai_10', '优惠券', '9999','3'],
//     [2, 'fanpai_03', '平板', '5','1'],
//     [3, 'fanpai_17'],
//     [1],
//     [2, 'fanpai_15', '红包', '666','2'],
//     [3, 'fanpai_17'],
//     [1],
//     [2, 'fanpai_10', '优惠券', '9999','3']
// ]
// //洗牌
// function Rcard() {
//     $('.pai').each(function(index, ele) {
//         $('.center_p img').addClass('start').attr('src', '../img/card3_03.png');
//         var type_num = zhenmian[index][0];
//         var $e = $(ele);
//         console.log(type_num)
//         if (type_num == '2') {
//             $e.html(`<div class="shanpin">
//                             <img src="../img/${zhenmian[index][1]}.png" alt="">
//                             <h5>${zhenmian[index][2]}</h5>
//                             <p>剩余${zhenmian[index][3]}个</p>
//                         </div>`)
//         } else if (type_num == '3') {
//             $e.html(`<img src="../img/${zhenmian[index][1]}.png" alt="" class="shipin"> `)
//         } else {
//             $e.html(`<h3 class="xie_p">谢谢参与</h3>`)
//         }
//     })
// }
// //开始翻牌
// function start_play() {
//     $('#j_play_btn h5').html(`START<br>开始翻牌`)
//     Rcard()
//     $('#j_play_btn').on('click', function Fcard() {
//         $('#j_play_btn').off('click', Fcard);
//         $('#j_play_btn h5').html(`请选择<br>卡片`);
//         card()
//         $('.jiuge li').on('click','.pai', function prize(ev) {
//         console.log('start')
//         $('.jiuge li').off('click', prize);
//         var ev = ev || window.event;
//         var target = ev.target || ev.srcElement;
//         var $t = $(target).closest('.pai')
//         console.log($t)
//         //k为模拟数据
//         var k=parseInt(Math.random()*8)
//         var type_num = zhenmian[k][0];
//         if (type_num == '2') {
//             $t.html(`<div class="shanpin">
//                             <img src="../img/${zhenmian[k][1]}.png" alt="">
//                             <h5>${zhenmian[k][2]}</h5>
//                             <p>剩余${zhenmian[k][3]}个</p>
//                         </div>`)
//                 var tnum=zhenmian[k][4];
//                 var tclass='.pop-bg'+tnum;
//                 setTimeout(function(){ $(tclass).removeClass('invisible');},500)

//         } else if (type_num == '3') {
//             $t.html(`<img src="../img/${zhenmian[k][1]}.png" alt="" class="shipin"> `)

// setTimeout(function(){$('.pop-bg3').removeClass('invisible');},500)
//         } else {
//             $t.html(`<h3 class="xie_p">谢谢参与</h3>`

//                 )

//             setTimeout(function(){ $('.pop-bg3').removeClass('invisible');},500)
//         }
//     })
//     })

// }
// start_play()

// //验真弹框

// if(sessionStorage.getItem("looked")){
//      $('.tip-bg00').hide();
//     $('.tip-bg').addClass('invisible');
//     $('.scan-tip').addClass('invisible');
// }
// $('.scan_btn button').on('click',function(){
//    var  $this=$(this);
//     $this.closest('.tip-bg').hide();
//     $('.tip-bg').addClass('invisible');
//     $('.scan-tip').addClass('invisible');
//     sessionStorage.setItem("looked", "1");
// })