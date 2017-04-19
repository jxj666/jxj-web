var _BASE = window.location.origin; //url
var nList = 1; //请求次数	
var _wrap = $('.broadcast .list'); // 定义滚动区域
var _activeId = 'JS0001DS001';
var activity_id = 'JS0001DS001';
var cookie = document.cookie;
var isBind = false; //是否绑定的手机号
var _openid = getCookie('openid');
var telReg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
var _interval = 2000; // 定义滚动间隙时间
var _moving; // 需要清除的动画
var listCount = 0; //获取到数据条数
var _resend = ''; //倒计时
var _isFirst = true; // 第一次加载
var order_id = getQueryString('order_id');

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(?:&|$)", 'i');
    var str_arr = window.location.search.substr(1).match(reg);
    return str_arr != null ? str_arr[2] : null;
}



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

//时间格式化
function dateFormat(str) {
    return str.replace(/-/g, '\\').trim().slice(0, -3);
}

function initCheck () {
    var $label = $("fieldset label");
    $label.click(function (e) {
        $(this).closest('label')
            .addClass('checked')
            .attr('checked','checked')
            .siblings()
            .removeClass('checked')
            .attr('checked', false);
    });
};
initCheck ();

function can_go () {
    var telReg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
    var name = $("#uname").val().trim();
    var gender = $(".radio-label.checked input").val();
    var mobile = $("#mobile").val().trim();
    var province = $("#province").val();
    var city = $("#city").val();
    var district = $("#district").val();
    var address = $("#address").val();
    //检验地址是否正确
    if (!name) {
        alert("请填写姓名");
        return false;
    }
    if (!mobile) {
        alert("请输入电话号码");
        return false;
    }
    if (!telReg.test(mobile)) {
        alert("电话号码格式不正确");
        return false;
    }
    if (province == -1 || city == -1 || district == -1) {
        alert('请选择省市区');
        return false;
    }
    if (!address) {
        alert("请填写详细地址");
        return false;
    }

    return {
        username: name,
        gendar: gender,
        mobile: mobile,
        province: province,
        city: city,
        district: district,
        address: address
    }
}

$('.a-close').click(function(){
    $('.pop-adress').addClass('invisible')
});

//详情页具体逻辑
(function() {
    $.ajax({
        url: '/act/view/JS0001DS001/1',
        method: 'post',
        data: {
            action: 'user_info'
        },
        success: successFn
    });

    function successFn(res) {

        console.log(res)
        var userPhone = res.context.user.status;
        (userPhone === undefined) ? userPhone = 'error userPhone': console.log('1.进入了判断用户');
        if (userPhone == 1) {
            //未绑定手机

            isBind = false;


            $('.zu1').show();
            $('.zu2').hide();
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
                        $('.zu1').hide();
                        $('.zu2').show();
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


        } else if (userPhone == 2) {
            //手机已绑定
            $.ajax({
                url: '/api/award/getUserAwardOrder',
                method: 'post',
                data: {
                    param: JSON.stringify({ 'orderid': order_id })
                },
                success: function (res) {
                    var award = res.context.award;
                    if(res.code ==1 && award.type == 3){
                        $("#gonxip").text(res.context.award.awardName);
                        $("#gonxiimg").attr("src",res.context.award.image);
                        $('.hb_prize').removeClass('invisible')
                        var unpack = res.context.status;
                        (unpack === undefined) ? unpack = 'data error': console.log('2.进入判断是否领取');
                        if (unpack == 0) {
                            // uppack redpack
                            $.ajax({
                                url: '/award/accept2',
                                method: 'post',
                                data: {
                                    orderid: order_id,
                                },
                                success: function(res) {
                                    console.log('3.领奖成功');
                                    console.log(res);
                                    var code = res.code;
                                    if (code == 0) {
                                        alert('后台错误,请稍后刷新' + res.msg);
                                    }
                                }
                            });
                        } else {
                            //拆红包 错误

                            console.log('3.红包领取过或后台错误' + unpack)
                        }

                    }

                    if(res.code ==1 && award.type == 2){
                        $('#prizename').html(award.awardName);
                        $('.prizeimg').attr('src',award.image);
                        $('.TV-box .txt').html(award.description.replace(/\n/g, '<br>'));
                        $('.my-prize-btn').attr('href','/a/p/guangxi-jins-cons-my-prize.html?activity_id='+ activity_id);
                        if(res.context.status == 0){
                            $('#get-TV').on('click',function () {
                                $.ajax({
                                    url: '/user/address/list',
                                    method: 'get',
                                    success: function (res) {
                                        if(res.code == 1){
                                            var list = res.context || [];
                                            if(list.length>0){
                                                var html = '';
                                                for(var i = 0;i<list.length;i++){
                                                    html +='<li class="list-l" tag="'+ i +'">';
                                                    html +='<div class="list-content">';
                                                    html +='<p class="title-l">'+ list[i].username +'<span style="margin-left: 10px;margin-right: 30px">'+ (list[i].gendar==1?'先生':'女士') +'</span>'+ list[i].mobile +'</p>';
                                                    html +='<p class="txt">'+ list[i].address +'</p>';
                                                    html +='<input type="checkbox" value=""  class="select-list'+(i==0?' checked':'')+'">';
                                                    html +='</div>';
                                                    html +='</li>';
                                                }

                                                $(".list-addr").html(html);
                                                $(".list-addr").find('li').click(function (e) {
                                                    //选择地址
                                                    var $li = $(e.target).closest('li');
                                                    var l_d = parseInt($li.attr('tag'));
                                                    $li.find('input').addClass('checked');
                                                    $li.siblings().find('input').removeClass('checked');
                                                    $.ajax({
                                                        url: '/award/updateaddr/' + order_id,
                                                        method: 'post',
                                                        data: list[l_d],
                                                        success: function (res) {
                                                            //添加地址
                                                            if (res.code) {
                                                                alert('添加成功');
                                                                window.location.reload();
                                                            }
                                                        }
                                                    });
                                                });
                                                $("#id_new_list").click(function () {
                                                    $(this).closest('.pop-adress').addClass('invisible');
                                                    initCheck();
                                                    $("#id_addr_conf").click(function (e) {
                                                        //确认添加地址
                                                        var addr = can_go();
                                                        if (!addr) return;
                                                        // var addr = $('form').serializeObject();
                                                        console.log(addr);
                                                        $.ajax({
                                                            url: '/user/address/add',
                                                            method: 'post',
                                                            data: addr,
                                                            success: function (res) {
                                                                //添加地址
                                                                if (res.code) {
                                                                    $(".list-addr").closest('.pop-adress').addClass('invisible');
                                                                    $(".address").find('form')[0].reset();
                                                                    $("#get-TV").trigger('click');
                                                                } else {
                                                                    alert('添加失败');
                                                                }
                                                            }
                                                        });
                                                    });
                                                    $(".address").closest('.pop-adress').removeClass('invisible');
                                                });

                                                $('#address-list').removeClass('invisible')
                                            }else {
                                                $('#add-new-pop').removeClass('invisible');
                                                initCheck();
                                                $("#id_addr_conf").click(function (e) {
                                                    //确认添加地址
                                                    var addr = can_go();
                                                    if (!addr) return;
                                                    // var addr = $('form').serializeObject();
                                                    console.log(addr);
                                                    $.ajax({
                                                        url: '/user/address/add',
                                                        method: 'post',
                                                        data: addr,
                                                        success: function (res) {
                                                            //添加地址
                                                            if (res.code) {
                                                                $(".list-addr").closest('.pop-adress').addClass('invisible');
                                                                $(".address").find('form')[0].reset();
                                                                $("#id_addr_order").trigger('click');
                                                            } else {
                                                                alert('添加失败');
                                                            }
                                                        }
                                                    });
                                                });
                                            }

                                        }
                                    }
                                })
                            })
                        }else {
                            $("#get-TV").html('订单详情').click(function () {
                                window.location.href ='/a/p/qr-longfeng-single-order-detail.html?orderId='+order_id +'&activity_id='+ activity_id;
                            });
                        }
                        $('.sw_peize').removeClass('invisible');
                        $('.TV-box').removeClass('invisible');
                    }

                    if(res.code ==1 && award.type != 3 && award.type != 2){
                        $('#prizename').html(award.awardName);
                        $('.prizeimg').attr('src',award.image);
                        $('#get-yhq').attr('href',award.exchangeUrl);
                        $('.yhq-box .txt').html(award.description.replace(/\n/g, '<br>'));
                        $('.my-prize-btn').attr('href','/a/p/guangxi-jins-cons-my-prize.html?activity_id='+ activity_id);
                        $('.sw_peize').removeClass('invisible');
                        $('.yhq-box').removeClass('invisible');
                    }
                }
            });


        } else {
            //判断绑定 错误
        }

    }
})()

$('#linqushuomin').on('click',function(){
    $("#explain_show").removeClass('invisible')
})
$(".explainClose").on('click',function(){
    $("#explain_show").addClass('invisible')
})
$(".lipin button").on('click',function(){

    window.location.href = _BASE + '/a/p/guangxi-jins-cons-my-prize.html';
})


// 统计代码
function statistics(n) {
    _joyAnalytics.send('click', {
        aid: 'C00000' + n,
        tag: 'BUTTON'
    });
}
