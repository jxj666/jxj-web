var _BASE = window.location.origin; //url
var nList = 1; //请求次数   
var _wrap = $('.broadcast .list'); // 定义滚动区域
var _activeId = 'JS0001DS001';
var cookie = document.cookie;
var isBind = false; //是否绑定的手机号
var _openid = getCookie('openid');
var telReg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
var _interval = 2000; // 定义滚动间隙时间
var _moving; // 需要清除的动画
var listCount = 0; //获取到数据条数
var _resend = ''; //倒计时
var _isFirst = true; // 第一次加载

(function() {
    _moving = setInterval(function() {
        if (_wrap.children().length <= 1) {
            clearInterval(_moving);
            _moving = null;
            return;
        }
        // 不可放置于函数起始处,li:first取值是变化的
        var _field = _wrap.find('li:first');
        var _h = _field.height();
        _field.animate({
            marginTop: -_h + 'px'
        }, 600, function() {
            // 隐藏后,将该行的margin值置零,并插入到最后,实现无缝滚动
            _field.css('marginTop', 0).appendTo(_wrap);
        });
    }, _interval);
}())

function resendFn(p_num) {
    var $resend = $(".phone .resend");
    var TIME = 59;
    $resend.html('（59s）');
    _resend = setInterval(function() {
        $resend.attr('disabled', 'disabled');
        if (TIME <= 0) {
            clearInterval(_resend);
            $resend.html('重新发送')
                .removeAttr('disabled')
                .addClass('active')
                .off()
                .on('click', function(e) {
                    $.ajax({
                        url: '/api/utils/sendVCode',
                        method: 'post',
                        data: {
                            param: JSON.stringify({
                                activity_id: _activeId,
                                // openid: _openid,
                                mobile: p_num,
                                scale: '',
                            })
                        },
                        success: function(res) {
                            if (res.code) {
                                resendFn(p_num);
                            } else {
                                alert(res.msg);
                            }
                        }
                    });
                });
        } else {
            $resend.removeClass('active')
                .html('（' + (--TIME) + 's）');
        }
    }, 1000);
}

//cookie
function getCookie(name) {
    var parts = cookie.split("; " + name + "=");
    if (parts && parts.length === 2) return parts[1].slice(0, parts[1].indexOf(';'));
}

function _reload() {
    var __href = window.location.href;
    var _times = new Date().getTime();
    __href.replace(/timestamp=\d+&/, 'timestamp=' + _times + '&');
    // console.log(__href);
    window.location.href = __href;
}

//福利兑换 list 初始化接口
function receiveList(state, tab) {
    var listArr = [];
    var $list = $(".prize-list");
    var successFn = function(res) {
            if (res.code == 403) {
                alert('网络错误，请刷新后重试～');
                _reload();
            }
            nList++;
            var orders = res.context.orders || [];
            if (tab) {
                $(".prize-list").html('');
            }
            if (orders.length == 0) {
                $(".no-more-list").removeClass('invisible');
                _isFirst && $(".tab .list li:first").trigger('click');
                // return;
            } else if (state == 0 && orders[0].status != 4) {
                var tips = '';
                tips += '<li class="l-tips">';
                tips += '<img class="l-img" src="https://weiop.oss-cn-beijing.aliyuncs.com/jintianzi/fp/icon_tips.png">';
                tips += '<p class="p-tips">您有未领取的礼品即将过期，</p>';
                tips += '<p class="p-tips">请点击领取！</p>';
                tips += '<p class="p-tips">礼品有效期为自获得后7天。</p>';
                tips += '</li>';
                $list.append(tips);
            }
            _isFirst = false;
            for (var i = 0; i < orders.length; i++) {
                var award = orders[i].award || {};
                var pId = orders[i].award.productId;
                var HB = ['cqjtzredpack20', 'cqjtzredpack5-20', 'cqjtzredpack200', 'cqjtzredpack1-18'];
                if (pId == 'cqjtzpostcard') continue;
                var li = '<li class="each">';
                li += '<img class="img" src="' + (award.image || "") + '" alt="">'
                li += '<p class="prz-h">' + award.awardName + '</p>'
                li += '<p class="date create">获得时间:' + dateFormat(orders[i].createTime) + '</p>'
                if (state == 0) {
                    if (orders[i].status == 4) {
                        li += '<a href="javascript:void(0)" class="detail model1">已逾期</a>';
                    } else {
                        if (HB.indexOf(pId) !== -1) {
                            li += '<a  href="javascript:" class="detail hb-accept model2" id="' + orders[i].orderid + '">领取</a>';
                        } else {
                            if (orders[i].status == 0 && orders[i].award.type == 3) {
                                //li += '<a  href="https://test.weiop.taozuike.com/a/p/redpack-assist-main.html?order_id=' + orders[i].orderid + '" class="detail model31">领取</a>';
                                var url2 = 'https://test.weiop.taozuike.com/a/p/redpack-assist-main.html?order_id=' + orders[i].orderid;

                                li += `<a href="javascript:bindPhone('${orders[i].orderid}')" class="detail model31">领取</a>`
                            } else if(orders[i].status == 0 && orders[i].award.type == 31){
                                var awardSrc = _BASE + '/a/p/guangxi-jins-cons-sub-list.html?activity_id='+ _activeId +'&orderid='+orders[i].orderid
                                li += `<a href="${awardSrc}" class="detail model32">领取</a>`
                            }else {
                                li += '<a  href="' + _BASE + '/a/p/guangxi-jins-cons-prize-detail.html?order_id=' + orders[i].orderid + '" class="detail model33">领取</a>';
                            }

                        }
                    }
                } else {
                    li += '<a  href="' + _BASE + '/a/p/guangxi-jins-cons-prize-detail.html?order_id=' + orders[i].orderid + '" class="detail model4">详情</a>';
                }
                li += '</li>';
                $list.append(li);
                // listArr.push(li);
            }
            //已领取筛选处理
            if (state == 1) {
                listCount += orders.length;
                if (listCount < res.context.count && $list.children().length < 5) {
                    receiveList(1);
                }
            }
            // $list.html(listArr.join(''));
            if (nList == 2 && $list.find('li').length == 0) {
                $(".prize-scroll").addClass('nothing');
                $(".no-more-list").addClass('invisible');
            } else {
                $(".prize-scroll").removeClass('nothing');
            }
            $(".hb-accept").click(function(e) {
                var orderId = $(e.target).attr('id');
                if (!isBind) {
                    $(".activity").trigger('click');
                    $(".phone-line").html('首次领奖，请激活手机号<br>（仅一次，重庆中烟活动通用）');
                } else {
                    window.location.href = _BASE + '/a/p/chongqing-jtz-cons-prize-detail.html?order_id=' + orderId;
                }
            });
        }
        // successFn();
    $.ajax({
        url: '/award/myorders/' + _activeId + '/' + (nList) + '/50?status=' + state,
        method: 'get',
        data: {
            beginTime: '2017-03-01 00:00:00'
        },
        success: successFn
    });
}
//时间格式化
function dateFormat(str) {
    return str.replace(/-/g, '\\').trim().slice(0, -3);
}
//tab切换
$(".main .tab li").off().on('click', function() {
    var that = this;
    var tar = $(that).attr('data-toggle');
    $(that).addClass('active').siblings().removeClass('active');
    nList = 1;
    listCount = 0;
    receiveList(tar, true);
});

function calculate() {
    //计算滚动区域高度
    var mH = $(".main").height(); //屏幕高度
    // var tH = $(".top").height(); //top高度
    // var aH = $(".tab").height(); //tab高度
    // var bH = $(".broadcast").height(); //小喇叭高度
    var nH = $(".nav-bottom").height(); //底部高度
    var oH = $(".bottom").height(); //底部图片高度 固定
    // var pH = mH - tH - aH - bH - nH - oH;
    var pH = mH - nH - oH;
    $(".prize-scroll").height(pH).scroll(function() {
        var conHeight = $(this).height();
        var sHeight = $(this)[0].scrollHeight;
        var sTop = $(this)[0].scrollTop;
        var tar = $(".main .tab li.active").attr('data-toggle');
        $(".no-more-list").addClass('invisible');
        if (sTop >= sHeight - conHeight - 5) {
            receiveList(tar);
        }
    });
}

calculate();

// 大喇叭
function list() {
    function successFn(res) {
        var code = res.code;
        console.log(res);
        if (code) {
            var data = res.context || {};
            var _template_html = '';
            var broadcastList = data.awardShow || [];
            broadcastList.forEach(function(n, index) {
                _template_html += '<li>恭喜用户<em class="name">' + n.nickName + '</em>获得<em>' + n.productName + '</em></li>'
            })
            $('#broadcast_list').html(_template_html);
            $('#total').html(data.awardInventory &&
                (data.awardInventory.sendTotal || 0));
        } else if (code == 403) {
            alert('网络错误，请刷新后重试～');
            _reload();
        }
    }
    // successFn();
    $.ajax({
        url: '/api/award/getSpecialAwards',
        method: 'post',
        data: {
            param: JSON.stringify({
                activity_id: _activeId
            })
        },
        success: successFn
    });
}

function bindPhone(url2) {
    var $user = $(".user");

    function successFn(res) {
        // res = res || {
        //     "code":1,
        //     "msg":"success",
        //     "context":{
        //         "user":{
        //             "nickname":"用户昵称",
        //             "status":1,
        //             "mobile":"",
        //             "c_count":3,
        //             "score":2
        //         }
        //     }
        // };
        if (res.code) {
            if (res.code == 403) {
                alert('网络错误，请刷新后重试～');
                _reload();
            }
            //用户信息接口完成后，调用接口

            var user = res.context.user || {};
            var _mobile = user.mobile || "";
            $user.find('img').attr('src', user.headImgUrl);
            $user.find('.name').html(user.nickname);
            $("#card_count").html(user.c_count || 0);
            if (user.status == 1) {
                isBind = false;

                $(".phone-line").html("首次领奖，请激活手机号<br>(仅一次，江西中烟活动通用)");
                $(".phone-quan").show();
                $(".phone").closest('.pop').removeClass('invisible');
                $("#close_phone").one('click', function(e) {
                    $(this).closest('.phone')
                        .removeClass('active')
                        .find('input')
                        .val('')
                        .closest('.pop')
                        .addClass('invisible');
                    clearInterval(_resend);
                    $("#id_get_code").off();
                    $("#id_phone_conf").off();
                    $(".phone-quan").hide();
                });
                $("#id_get_code").on('click', function(e) {
                    $(".phone-quan").hide();
                    var p_num = $("#p_phone").val().trim();
                    if (!p_num) {
                        alert('手机号不能为空');
                        return;
                    }
                    if (!telReg.test(p_num)) {
                        alert('请输入正确的手机号');
                        return;
                    }
                    $(this).off();
                    $.ajax({
                        url: '/api/utils/sendVCode',
                        method: 'post',
                        data: {
                            param: JSON.stringify({
                                activity_id: _activeId,
                                // openid: _openid,
                                mobile: p_num,
                                scale: '',
                            })
                        },
                        success: successFn
                    });
                    // successFn();
                    function successFn(res) {
                        // res = res || {
                        //     "code":1,
                        //     "msg":"success",
                        //     "context":{
                        //         "mobile":"13028917482"
                        //     }
                        // }
                        if (res.code) {
                            $("#p_phone").closest('.phone')
                                .addClass('active');
                            resendFn(p_num);
                            $("#id_phone_conf").on('click', function(e) {
                                var p_code = $("#p_code").val().trim();
                                if (!p_code) {
                                    alert('验证码不能为空');
                                    return;
                                }
                                $(this).off();
                                $.ajax({
                                    url: '/api/common/bindMobileInfo',
                                    method: 'post',
                                    data: {
                                        param: JSON.stringify({
                                            activity_id: _activeId,
                                            // openid: _openid,
                                            mobile: p_num || '',
                                            vcode: p_code,
                                            op_type: 2
                                        })
                                    },
                                    success: function(res) {
                                        //清空 隐藏
                                        $(".phone").closest('.pop').addClass('invisible');
                                        if (res.code) {
                                            var $pop = $(".bind").closest('.pop');
                                            $pop.find('.p-bind').html('绑定成功');
                                            $pop.find('button, .close').one('click', function(e) {
                                                location.href = "https://test.weiop.taozuike.com/a/p/redpack-assist-main.html?order_id=" + url2;
                                            });
                                            $pop.removeClass('invisible');
                                        } else {
                                            var $pop = $(".bind").closest('.pop');
                                            $pop.find('.p-bind').html(res.msg || '绑定失败');
                                            $pop.find('button, .close').click(function(e) {
                                                location.reload()
                                            });
                                            $pop.removeClass('invisible');
                                        }
                                    }
                                });
                            });
                        }
                    }

                });

            } else {
                location.href = "https://test.weiop.taozuike.com/a/p/redpack-assist-main.html?order_id=" + url2;
            }
        } else {
            alert(res.msg);
        }
    }
    // successFn();
    $.ajax({
        url: '/act/view/JS0001DS001/1',
        method: 'post',
        data: {},
        success: successFn
    });
}
//手机号接口
function get_user() {
    var $user = $(".user");

    function successFn(res) {
        // res = res || {
        //     "code":1,
        //     "msg":"success",
        //     "context":{
        //         "user":{
        //             "nickname":"用户昵称",
        //             "status":1,
        //             "mobile":"",
        //             "c_count":3,
        //             "score":2
        //         }
        //     }
        // };
        if (res.code) {
            if (res.code == 403) {
                alert('网络错误，请刷新后重试～');
                _reload();
            }
            //用户信息接口完成后，调用接口

            receiveList(1);

            list();
            var user = res.context.user || {};
            var _mobile = user.mobile || "";
            $user.find('img').attr('src', user.headImgUrl);
            $user.find('.name').html(user.nickname);
            $("#card_count").html(user.c_count || 0);
            if (user.status == 1) {
                isBind = false;
                $("#tel_state").html('未激活');
                $('#p_phone').removeAttr('disabled')
                $(".activity").html('激活').removeClass('jieban').on('click', function(e) {
                    $(".phone-line").html('激活当前手机号');
                    $(".phone").closest('.pop').removeClass('invisible');
                    $("#close_phone").one('click', function(e) {
                        $(this).closest('.phone')
                            .removeClass('active')
                            .find('input')
                            .val('')
                            .closest('.pop')
                            .addClass('invisible');
                        clearInterval(_resend);
                        $("#id_get_code").off();
                        $("#id_phone_conf").off();
                    });
                    $("#id_get_code").on('click', function(e) {
                        var p_num = $("#p_phone").val().trim();
                        if (!p_num) {
                            alert('手机号不能为空');
                            return;
                        }
                        if (!telReg.test(p_num)) {
                            alert('请输入正确的手机号');
                            return;
                        }
                        $(this).off();
                        $.ajax({
                            url: '/api/utils/sendVCode',
                            method: 'post',
                            data: {
                                param: JSON.stringify({
                                    activity_id: _activeId,
                                    // openid: _openid,
                                    mobile: p_num,
                                    scale: '',
                                })
                            },
                            success: successFn
                        });
                        // successFn();
                        function successFn(res) {
                            // res = res || {
                            //     "code":1,
                            //     "msg":"success",
                            //     "context":{
                            //         "mobile":"13028917482"
                            //     }
                            // }
                            if (res.code) {
                                $("#p_phone").closest('.phone')
                                    .addClass('active');
                                resendFn(p_num);
                                $("#id_phone_conf").on('click', function(e) {
                                    var p_code = $("#p_code").val().trim();
                                    if (!p_code) {
                                        alert('验证码不能为空');
                                        return;
                                    }
                                    $(this).off();
                                    $.ajax({
                                        url: '/api/common/bindMobileInfo',
                                        method: 'post',
                                        data: {
                                            param: JSON.stringify({
                                                activity_id: _activeId,
                                                // openid: _openid,
                                                mobile: p_num || '',
                                                vcode: p_code,
                                                op_type: 2
                                            })
                                        },
                                        success: function(res) {
                                            //清空 隐藏
                                            $(".phone").closest('.pop').addClass('invisible');
                                            if (res.code) {
                                                var $pop = $(".bind").closest('.pop');
                                                $pop.find('.p-bind').html('绑定成功');
                                                $pop.find('button, .close').one('click', function(e) {
                                                    //TODO
                                                    _reload();
                                                });
                                                $pop.removeClass('invisible');
                                            } else {
                                                var $pop = $(".bind").closest('.pop');
                                                $pop.find('.p-bind').html(res.msg || '绑定失败');
                                                $pop.find('button, .close').click(function(e) {
                                                    //TODO
                                                    _reload();
                                                });
                                                $pop.removeClass('invisible');
                                            }
                                        }
                                    });
                                });
                            }
                        }

                    });
                });
            } else {
                isBind = true;
                $("#tel_state").html(_mobile);
                $(".activity").html('解绑').addClass('jieban').click(function(e) {
                    $(".phone-line").html('解绑当前手机号');
                    $(".phone").closest('.pop').removeClass('invisible');
                    $("#close_phone").one('click', function(e) {
                        $(this).closest('.phone')
                            .removeClass('active')
                            .find('input')
                            .val('')
                            .closest('.pop')
                            .addClass('invisible');
                        clearInterval(_resend);
                        $("#id_get_code").off();
                        $("#id_phone_conf").off();
                    });
                    $("#p_phone").val(_mobile).attr('disabled', 'disabled');
                    $("#id_get_code").on('click', function(e) {
                        var p_num = $("#p_phone").val().trim();
                        if (!p_num) {
                            alert('手机号不能为空');
                            return;
                        }

                        if (!telReg.test(p_num)) {
                            alert('请输入正确的手机号');
                            return;
                        }
                        $(this).off();
                        $.ajax({
                            url: '/api/utils/sendVCode',
                            method: 'post',
                            data: {
                                param: JSON.stringify({
                                    activity_id: _activeId,
                                    // openid: _openid,
                                    mobile: p_num,
                                    scale: '',
                                })
                            },
                            success: successFn
                        });
                        // successFn();
                        function successFn(res) {
                            // res = res || {
                            //     "code":1,
                            //     "msg":"success",
                            //     "context":{
                            //         "mobile":"13028917482"
                            //     }
                            // }
                            if (res.code) {
                                $("#p_phone").closest('.phone')
                                    .addClass('active');
                                resendFn(p_num);
                                $("#id_phone_conf").on('click', function(e) {
                                    var p_code = $("#p_code").val().trim();
                                    if (!p_code) {
                                        alert('验证码不能为空');
                                        return;
                                    }
                                    $(this).off();
                                    $.ajax({
                                        url: '/api/common/bindMobileInfo',
                                        method: 'post',
                                        data: {
                                            param: JSON.stringify({
                                                activity_id: _activeId,
                                                // openid: _openid,
                                                mobile: p_num || '',
                                                vcode: p_code,
                                                op_type: 1
                                            })
                                        },
                                        success: function(res) {
                                            //清空 隐藏
                                            $(".phone").closest('.pop').addClass('invisible');
                                            if (res.code) {
                                                var $pop = $(".bind").closest('.pop');
                                                $pop.find('.p-bind').html('解绑成功');
                                                $pop.find('button, .close').click(function(e) {
                                                    //TODO
                                                    _reload();
                                                });
                                                $pop.removeClass('invisible');
                                            } else {
                                                var $pop = $(".bind").closest('.pop');
                                                $pop.find('.p-bind').html(res.msg || '解绑失败');
                                                $pop.find('button, .close').click(function(e) {
                                                    //TODO
                                                    _reload();
                                                });
                                                $pop.removeClass('invisible');
                                            }
                                        }
                                    });
                                });
                            }
                        }

                    });
                });
            }
        } else {
            alert(res.msg);
        }
    }
    // successFn();
    $.ajax({
        url: '/act/view/JS0001DS001/1',
        method: 'post',
        data: {},
        success: successFn
    });
}

get_user();

// 导航切换
$('.navlist').on('click', function(e) {
    var target = e.target;
    console.log(target);
    var clsNames = target.classList;
    if (target.tagName == 'A') {
        if ($(target).closest('span').hasClass('active')) return;
        if (clsNames.contains('index-a')) {
            window.location.href = _BASE + '/a/p/guangxi-jins-cons-unpack-redpack.html';
        } else if (clsNames.contains('integral-a')) {
            window.location.href = _BASE + '/a/p/guangxi-jins-cons-activity-center.html';
        } else if (clsNames.contains('order-a')) {
            window.location.href = _BASE + '/a/p/guangxi-jins-cons-my-prize.html';
        } else {
            return
        }
    }
});

if ($('.activity').text() == '激活') {
    $('.activity').removeClass('jieban')
} else {
    $('.activity').addClass('jieban')
}

// 统计代码
function statistics(n) {
    _joyAnalytics.send('click', {
        aid: 'C00000' + n,
        tag: 'BUTTON'
    });
}

// function tabswitch() {
//     function successFn(res) {
//         if (res.context.orders.length > 0) {
//             //切换标签


//             $('.list li:nth-child(2)').addClass('active').siblings().removeClass('active');
//             nList = 1;
//             listCount = 0;
//             receiveList(0, true);

//         } else {
//             return;
//         }

//     }
//     $.ajax({
//         url: '/award/myorders/' + _activeId + '/' + (nList) + '/50?status=' + 0,
//         method: 'get',
//         data: {
//             beginTime: '2017-03-01 00:00:00'
//         },
//         success: successFn
//     });
// }
// tabswitch()
