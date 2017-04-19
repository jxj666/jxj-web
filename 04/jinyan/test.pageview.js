var _CDN = "https://weiop.oss-cn-beijing.aliyuncs.com/jintianzi/fp/"; //CDN
var _BASE = window.location.origin;
var _wrap = $('.broadcast .list'); // 定义滚动区域
var _activeId = 'JS0001DS001';
var COOKIE = ";" + document.cookie + ';';
var _city = getCookie('JS0001DS001-region_flag');
var telReg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
var _interval = 2000; // 定义滚动间隙时间
var _moving; // 需要清除的动画

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

// cookie中取值 cookie中有barcode和scan_count
function getCookie(name) {
    var parts = COOKIE.split("; " + name + "=");
    if (parts && parts.length === 2) return parts[1].slice(0, parts[1].indexOf(';'));
}

function resendFn(p_num) {
    var _resend = '';
    var TIME = 59;
    _resend = setInterval(function() {
        var $resend = $(".phone .resend");
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

var MAP = {
    'r_0': ['cards/ts_kzjnb.png', 'cards/ts_nanhu.png', 'cards/ts_fengj.png'],
    'r_1': ['cards/gz_baiys.png', 'cards/gz_gzta.png', 'cards/gz_sssx.png'],
    'r_2': ['cards/xa_bmay.png', 'cards/xa_dtfry.png', 'cards/xa_dayta.png'],
    'r_3': ['cards/ny_dsygy.png', 'cards/ny_laoyl.png', 'cards/ny_zhugel.png'],
    'r_4': ['cards/wlmq_dfshi.png', 'cards/wlmq_htgl.png', 'cards/wlmq_hongs.png'],
    'r_5': ['cards/lz_fengj1.png', 'cards/lz_bowug.png', 'cards/lz_hhdyq.png'],
    'r_6': ['cards/gy_dfyz.png', 'cards/gy_hfhu.png', 'cards/gy_jxlou.png']
};

//点击 开始 洗牌
var $list = $("#id_clop_list");

function listFn(listArr) {
    var list_str = [];
    listArr = listArr || [{}, {}, {}, {}, {}, {}, {}, {}, {}];
    for (var i = 0; i < listArr.length; i++) {
        var li = ''
        if (i == 4) {
            li += '<li><div class="ctrl-btn active" id="id_start"></div>';
            li += '<p>您拥有<em id="count">0</em>次机会</p></li>';
            list_str.push(li);
        } else {
            li += '<li><div class="content clop_' + i + '">';
            li += '<img src="' + _CDN + (listArr[i].src || 'bg_list_clop.png') + '">';
            if (listArr[i].left) {
                li += '<p>剩余<em>' + listArr[i].left + '</em>个</p>';
            }
            li += '</div></li>';
            list_str.push(li);
        }
    }
    $list.html(list_str.join(''));
}

function initClop(data) {
    var LEFT = data.awardInventory || {};
    // alert(_city);
    var initList = [{
        'src': 'wechat_20.png',
        'left': LEFT['cqjtzredpack20'] || 0
    }, {
        // 'src':(_city=='r_5')?MAP[_city][2]:'le_X40S.png',
        // 'left':(_city=='r_5')?0:LEFT['leshitvx40s'] || 0
        'src': MAP[_city] ? MAP[_city][2] : 'cards/ts_fengj.png',
        'left': ''
    }, {
        'src': 'wechat_5.20.png',
        'left': LEFT['cqjtzredpack5-20'] || 0
    }, {
        'src': MAP[_city] ? MAP[_city][1] : 'postcard.png',
        'left': ''
    }, {
        'src': '',
        'left': ''
    }, {
        'src': 'wechat_200.png',
        'left': LEFT['cqjtzredpack200'] || 0
    }, {
        'src': 'wechat_1.18.png',
        'left': LEFT['cqjtzredpack1-18'] || 0
    }, {
        'src': MAP[_city] ? MAP[_city][0] : 'tower.png',
        'left': ''
    }, {
        'src': 'thanks.png',
        'left': ''
    }];

    listFn(initList);
}


var TURN = {
    'cqjtzredpack20': 'wechat_20.png',
    '2': 'le_X40S.png',
    'cqjtzredpack5-20': 'wechat_5.20.png',
    '4': 'postcard.png',
    'cqjtzredpack200': 'wechat_200.png',
    'cqjtzredpack1-18': 'wechat_1.18.png',
    '7': 'tower.png',
    '8': 'thanks.png'
};
//翻牌
function turn_to(that, type) {
    var $hb = $('.hongbao');
    $(that).find('img').attr('src', _CDN + TURN[type]);
    $(that).addClass('turn');
    $hb.closest('.pop')
        .removeClass('invisible')
        .find('button').click(function(e) {
            function successFn(res) {
                res = res || {
                    "code": 1,
                    "msg": "success",
                    "context": ""
                };
                if (res.code) {
                    window.location.href = _CDN + '/a/p/chongqing-jtz-cons-prize-detail.html';
                }
            }
            // successFn();
            //领红包接口
            $.ajax({
                url: '/qryx/draw',
                method: 'post',
                data: {
                    activityId: 'JS0001DS001'
                },
                success: successFn
            });
        });
}

get_user();
function _reload() {
    var __href = window.location.href;
    var _times = new Date().getTime();
    __href.replace(/timestamp=\d+&/, 'timestamp=' + _times + '&');
    // console.log(__href);
    window.location.href = __href;
}
//获取用户信息
var isBind = false; //是否绑定手机号
function get_user() {
    function successFn(res) {

        if (res.code) {
            if (res.code == 403) {
                alert('网络错误，请刷新后重试～');
                window.location.reload();
            }
            _scan();
            list();

            var data = res.context || {};
            var user = data.user || {};
            if (user.status == 1) {
                //未绑定手机
                isBind = false;
            } else {
                isBind = true;
            }



            if ((user.score != 0)) {

                $("#myNum").html(user.score);
                $('#startRed').one('click', function() {
                    if (($("input:checkbox:checked").val() != '01')) {
                        return;
                    }

                    function successFn(res) {
                        console.dir(res)
                        if (res.code == '1') {
                            var awardUser = res.context.order.award;
                            var order_id = res.context.order.orderid;
                            if (awardUser.type == 2) {

                                $(".winTitle").html("恭喜您!")
                                $(".winShow").html(awardUser.awardName)
                                $(".winImg").attr("src", awardUser.image)
                                $(".winImg").css("display", 'block')
                                $(".winBtn").text("点击获取")
                                $(".winBtn").one('click', function() {
                                    var awardSrc = '/a/p/guangxi-jins-cons-prize-detail.html?order_id='+ order_id;
                                    console.log('awardSrc');
                                    window.location.href=awardSrc;
                                })
                            }else if (awardUser.type == 3 ) {

                                $(".winTitle").html("恭喜您!")
                                $(".winShow").html(awardUser.awardName)
                                $(".winImg").attr("src", awardUser.image)
                                $(".winImg").css("display", 'block')
                                $(".winBtn").text("点击获取")
                                $(".winBtn").one('click', function() {
                                    if(isBind){
                                        var awardSrc = '/a/p/redpack-assist-main.html?order_id='+ order_id;
                                        window.location.href=awardSrc;
                                    }else {
                                        $(".phone-quan").show();
                                        $(".phone").closest('.pop').removeClass('invisible');
                                        $(".icon_close").one('click', function(e) {
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
                                                success: function (res) {
                                                    if (res.code ==1 ) {
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
                                                                            var awardSrc = '/a/p/redpack-assist-main.html?order_id='+ order_id;
                                                                            window.location.href=awardSrc;
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
                                    }

                                })
                            } else if (awardUser.type == 31) {
                                $(".winTitle").html("恭喜您!")
                                $(".winShow").html('获得优惠券一张')
                                $(".winImg").attr("src", '')
                                $(".winImg").css("display", 'none')
                                $(".winBtn").text("点击获取")
                                $(".winBtn").one('click', function() {
                                    if(isBind){
                                    var awardSrc = '/a/p/guangxi-jins-cons-sub-list.html?activity_id='+ _activeId +'&orderid='+order_id
                                    console.log('awardSrc');
                                    window.location.href=awardSrc;
                                    }else {
                                        $(".phone-quan").show();
                                        $(".phone").closest('.pop').removeClass('invisible');
                                        $(".icon_close").one('click', function(e) {
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
                                                success: function (res) {
                                                    if (res.code ==1 ) {
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
                                                                            var awardSrc = '/a/p/guangxi-jins-cons-sub-list.html?activity_id='+ _activeId +'&orderid='+order_id
                                    console.log('awardSrc');
                                    window.location.href=awardSrc;
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
                                    }
                                    
                                })
                            } else {
                                $(".winTitle").html("谢谢参与")
                                $(".winShow").html('谢谢您的参与')
                                $(".winImg").attr("src", '')
                                $(".winImg").css("display", 'none')
                                $(".winBtn").text("重试")
                                $(".winBtn").one('click', function() {
                                    window.location.reload();
                                })
                            }
                        } else {
                            $(".winTitle").html("服务器错误")
                            $(".winShow").html('请稍后重试')
                            $(".winImg").attr("src", '')
                            $(".winImg").css("display", 'none')
                            $(".winBtn").text("重试")
                            $(".winBtn").one('click', function() {
                                window.location.reload();
                            })
                        }





                        $('#winBox').removeClass('invisible');
                        $('.winClose').on('click', function() {
                            $('#winBox').addClass('invisible')
                            window.location.reload();
                        })

                    }
                    // successFn();
                    $.ajax({
                        url: '/act/draw/' + _activeId,
                        method: 'post',
                        data: {},
                        success: successFn
                    });
                })



                $("#id_change").html(user.score);

            } else {
                $("#id_start").addClass('disabled');
                $("#count").html(0);
                $("#redpack").addClass('noRedpack');

            }
        } else {
            alert(res.msg);
        }
    }
    // successFn();



    $.ajax({
        url: '/act/view/JS0001DS001/1',
        method: 'post',
        data: {
            action: 'user_info'
        },
        success: successFn
    });


}

// 大喇叭
function list() {
    function successFn(res) {
        res = res || {};
        var code = res.code;
        console.log(res);
        if (code == 403) {
            alert('网络错误，请刷新后重试～');
            window.location.reload();
        }
        if (code) {
            var data = res.context || {};
            var _template_html = '';
            var broadcastList = data.awardShow || [];
            broadcastList.forEach(function(n, index) {
                _template_html += '<li>恭喜用户<em class="name">' + n.nickName + '</em>获得<em>' + n.productName + '</em></li>'
            })
            var num = data.awardInventory.redpack || 99999;
            $('#bpNum').html(num);
            $('#broadcast_list').html(_template_html);
            $('#total').html(data.awardInventory &&
                (data.awardInventory.sendTotal || 0));
            $('#gifts').html(data.awardInventory &&
                (data.awardInventory.sendTotal || 0));
            initClop(data);
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
        async: false,
        success: successFn
    });
}

//扫码数
function _scan() {
    $.ajax({
        url: '/act/create/JS0001DS001',
        method: 'post',
        data: {
            action: 'stat'
        },
        success: function(res) {
            if (res.code == 403) {
                alert('网络错误，请刷新后重试～');
                window.location.reload();
            }
            var data = res.context || {};
            $("#scaners").html(data.verifyTimes || 0);
        }
    });
}

/**类型 弹窗展示 绑定事件**/
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

var MAPPRO = {
    'o_s': [{
        'name': '乐视超级电视x40s',
        'sum': '60',
        'pro': '每天6台'
    }, {
        'name': '微信红包（200元）',
        'sum': '1000',
        'pro': '2%'
    }, {
        'name': '微信红包（20元）',
        'sum': '2000',
        'pro': '3%'
    }, {
        'name': '微信红包（5.20元）',
        'sum': '20000',
        'pro': '10%'
    }, {
        'name': '微信红包（1.18元）',
        'sum': '170000',
        'pro': '40%'
    }],
    'r_5': [{
        'name': '微信红包（200元）',
        'sum': '1000',
        'pro': '5%'
    }, {
        'name': '微信红包（20元）',
        'sum': '2000',
        'pro': '10%'
    }, {
        'name': '微信红包（5.20元）',
        'sum': '20000',
        'pro': '10%'
    }, {
        'name': '微信红包（1.18元）',
        'sum': '170000',
        'pro': '30%'
    }]
};

function initPro() {
    var $pro_list = $(".product-list");
    var $listArr = [];
    var pro_list = [];
    if (_city == 'r_5') {
        pro_list = MAPPRO['r_5'];
    } else {
        pro_list = MAPPRO['o_s'];
    }
    for (var i = 0; i < pro_list.length; i++) {
        var $li = '<li><div class="product-content">';
        $li += '<div>' + pro_list[i].name + '</div>';
        $li += '<div>' + pro_list[i].sum + '</div>';
        $li += '<div>' + pro_list[i].pro + '</div></div></li>';
        $listArr.push($li);
    }
    $pro_list.append($listArr.join(''));
}
initPro();

// 统计代码
function statistics(n) {
    _joyAnalytics.send('click', {
        aid: 'C00000' + n,
        tag: 'BUTTON'
    });
}

//13
$('#explain_btn').on('click', function() {
    $('#explain_show').removeClass('invisible')
})

$('.explainClose').on('click', function() {
    $('#explain_show').addClass('invisible')
})

$("input:checkbox").on("change", function() {
    console.log("input true");
    if ($("input:checkbox:checked").val() == '01') {
        if (Number($('#myNum').text())>0) {
            $('#redpack').removeClass('noRedpack')
        } else {
            return;
        }
    } else {
        if (!$('#redpack').hasClass("noRedpack") && true) {
            $('#redpack').addClass("noRedpack")
        } else {
            return;
        }

    }
})
if (!localStorage.linqutixin9)
  {
    console.log('1');
  $('#tixin').removeClass('invisible');
  console.log($("#myCheck").removeAttr('checked'))
  $("#redpack").addClass('noRedpack');
  $('#tixin button').one('click',function(){
    $('#tixin').addClass('invisible');
    localStorage.linqutixin9=1;
  })
  }
else
  {
  
  }
  $("#tixin .winClose").one('click',function(){
    $('#tixin').addClass('invisible');
  })
