var activeId = 'JS0001DS001'; //活动ID
var $pop = $("#id_pop"); //公共弹窗
var isInCity = 0; //是否在七个城市内
var COOKIE = ''; //cookie
var openId = '' //用户的openid
var baseAdd = 'https://test.weiop.taozuike.com/a/p/';
var mark; //loading 动画

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(?:&|$)", 'i');
    var str_arr = window.location.search.substr(1).match(reg);
    return str_arr != null ? str_arr[2] : null;
}

function buildparam() {
    var paramObj = {};
    paramObj.st = getQueryString('st');
    paramObj.vt = getQueryString('vt');
    paramObj.fvt = getQueryString('fvt');
    paramObj.res = getQueryString('res');
    paramObj.pdi = getQueryString('pdi');
    paramObj.pdn = getQueryString('pdn');
    paramObj.pdt = getQueryString('pdt');
    paramObj.pin = getQueryString('pin');
    paramObj.bn = getQueryString('bn');
    paramObj.ts = getQueryString('ts');
    paramObj.n = getQueryString('n');
    paramObj.sign = getQueryString('sign');
    paramObj.barcode = getQueryString('barcode');
    return JSON.stringify(paramObj);
}



/** 定位信息 */
var province = '';
var district = '';
var city = '';
var lat = 0;
var lng = 0;
var map = '';
var acc = 0;
//地理位置
function getP() {
    if (window.localStorage.getItem('_AMap_AMap.Geolocation') === null) {
        alert('温馨提示：验真需要定位，下一步请允许“使用您的当前位置”。');
    }
    map = new AMap.Map("container", {
        resizeEnable: true
    });
    getPosition();
    $('main').removeClass('invisible');
}
getP();

(function() {
    var TIME = 0;
    mark = setInterval(function() {
        if ($(".mark").hasClass('invisible')) {
            clearInterval(mark);
            return;
        }
        var $mark = $(".mark em");
        var tips = '等待中';
        var _TIME = TIME;
        while (--_TIME >= 0) {
            tips += '.';
        }
        if (++TIME > 3) {
            TIME = 0;
        }
        $mark.html(tips);
    }, 1000);
})();

function run() {
    var url = '/act/create/';
    url += activeId;

    function successFn(res) {
        $(".mark").addClass('invisible');
        var data = res.context || {};
        if (res.code) {
            COOKIE = "; " + document.cookie;
            isInCity = getCookie('JS0001DS001-region_allow') || 1;
            openId = getCookie('openid') || '';
            $('main').removeClass('invisible');
        } else {
            $('main').removeClass('invisible');
            // $("#submit").attr("disabled", "disabled");
            alert(res.msg);
        }
    }
    // successFn();
    $.ajax({
        url: url,
        method: 'post',
        data: {
             'action': "tiao",
             'param': buildparam(),
             '_lat': lat,
            '_lng': lng,
            '_acc': acc,
            'province': province,
            'city': city,
            'district': district,
            '_province': province,
            '_city': city,
            '_district': district

        },
        success: successFn
    });
}

// cookie中取值 cookie中有barcode和scan_count
function getCookie(name) {
    var parts = COOKIE.split("; " + name + "=");
    if (parts && parts.length === 2) return parts[1].slice(0, parts[1].indexOf(';'));
}

// url参数渲染
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(?:&|$)", 'i');
    var str_arr = window.location.search.substr(1).match(reg);
    return str_arr != null ? str_arr[2] : null;
}

// 当验真输入到第4位后blur
$('input').on('input', function() {
    var val = $(this).val();
    if (val.length === 4) {
        $(this).blur()
    }
})

// barcode校验
var vcodeReg = /^\d{4}$/;

$('#submit').off().on('click', function() {
    statistics(1)
    var val = $('#input').val();
    if (vcodeReg.test(val)) {
        verify(val)
    } else {
        alert('请填写正确的验证码');
        return
    }
});

// 验证接口
function verify(vcode) {
    function successFn(res) {
        $("#submit").removeClass('loading');
        var data = res.context || {};
        if (res.code == 1) {
            var leftTimes = data.leftTimes || 0;
            var info = data.msg_info;
            var code = data.msg_code || 0;
            var acID = data.activityId;
            $('#submit').addClass('disabled').prop('disabled', true);
            //成功
            if (code == 1) {
                //翻牌
                if (acID == 'JS0001DS001') {
                    info = "验真为正品<br>恭喜您获得诚信奖励：<br>1次拆红包的机会!";
                    $pop.find('.box').html();
                    $pop.find('.box').append('<p class="right-txt">' + info + '</p>');
                    $pop.find('.box').append('<p class="left-txt">当前拥有' + leftTimes + '次拆包机会</p>');
                    $pop.find('.box').append('<button type="button" class="ctrl-btn">拆红包</button>');
                    $pop.removeClass('invisible')
                        .find('button')
                        .on('click', function(e) {
                            window.location.href = baseAdd + 'guangxi-jins-cons-unpack-redpack.html';
                        });
                } else {
                    info = "<em style='font-size:0.36rem;'>验真为正品。</em><br>";
                    info += "恭喜您获得诚信奖励：<br>“满十送一”活动的元宝一个！<br>";
                    // info += "<em style='color:#ac56db;'>五一快乐，额外送您元宝一个！</em>";
                    $pop.find('.box').append('<p class="right-txt">' + info + '</p>');
                    $pop.find('.box').append('<p class="left-txt">您现有元宝' + leftTimes + '个</p>');
                    $pop.find('.box').append('<button type="button" class="ctrl-btn">去兑换</button>');
                    $pop.removeClass('invisible')
                        .find('button')
                        .on('click', function(e) {
                            window.location.href = data.link;
                        });
                }
            } else if (code == 100086) {
                //翻牌
                if (acID == 'JS0001DS001') {
                    info = info && info.replace(/\n/g, '<br>');
                    $pop.find('.box').html();
                    $pop.find('.box').append('<p class="right-txt-l">' + info + '</p>');
                    $pop.find('.box').append('<button type="button" class="ctrl-btn">活动详情</button>');
                    $pop.removeClass('invisible')
                        .find('button')
                        .on('click', function(e) {
                            $(this).closest('.pop').addClass('invisible');
                            window.location.href = data.link;
                        });
                } else {
                    info = info && info.replace(/\n|，/g, '<br>');
                    $pop.find('.box').append('<p class="right-txt-l">' + info + '</p>');
                    $pop.find('.box').append('<p class="left-txt">您现有元宝' + leftTimes + '个</p>');
                    $pop.find('.box').append('<button type="button" class="ctrl-btn">活动详情</button>');
                    $pop.removeClass('invisible')
                        .find('button')
                        .on('click', function(e) {
                            $pop.addClass('invisible');
                            window.location.href = data.link;
                        });
                }

            } else if (code == 0) {
                info = info && "该码是正品，感谢支持！";
                $pop.find('.box').html();
                $pop.find('.box').append('<p class="right-txt-f">' + info + '</p>');
                $pop.find('.box').append('<button type="button" class="ctrl-btn">确定</button>');
                $pop.removeClass('invisible')
                    .find('button')
                    .on('click', function(e) {
                        $(this).closest('.pop').addClass('invisible');
                        window.location.href = baseAdd + 'guangxi-jins-cons-unpack-redpack.html';
                        // window.location.reload();
                    });
            } else if (code == 100087) {
                info = info && info.replace(/\n/g, '<br>');
                $pop.find('.box').html();
                $pop.find('.box').append('<p class="right-txt">' + info + '</p>');
                $pop.find('.box').append('<button type="button" class="ctrl-btn">确定</button>');
                $pop.removeClass('invisible')
                    .find('button')
                    .on('click', function(e) {
                        $(this).closest('.pop').addClass('invisible');
                        window.location.href = baseAdd + 'guangxi-jins-cons-unpack-redpack.html';
                        // window.location.reload();
                    });
            } else {
                info = info && " 请核对是否输入正确。";
                $pop.find('.box').html();
                $pop.find('.box').append('<p class="right-txt">' + 验证码错误 + '</p>');
                $pop.find('.box').append('<p class="right-txt-e">' + info + '</p>');
                $pop.find('.box').append('<button type="button" class="ctrl-btn">确定</button>');
                $pop.removeClass('invisible')
                    .find('button')
                    .on('click', function(e) {
                        $(this).closest('.pop').addClass('invisible');
                        window.location.href = baseAdd + 'guangxi-jins-cons-unpack-redpack.html';
                        // window.location.reload();
                    });
            }
        } else if (res.code == 403) {
            redirect();
        } else {
            alert(res.msg);
        }
    }
    $("#submit").addClass('loading');
    // successFn();
    $.ajax({
        // url: '/act/help/JS0001DS001/1',
        url: '/act/rule/JS0001DS001?name=help',
        method: 'post',
        data: {
            please: prevent.please || "",
            dnot: prevent.dnot || "",
            passit: prevent.passit || "",
            code: getQueryString('barcode') || "",
            pin: vcode,
            action: 'stat',
            _lat: lat,
            _lng: lng,
            _acc: acc,
            province: province,
            city: city,
            district: district,
            _province: province,
            _city: city,
            _district: district
        },
        success: successFn
    });
}
// 统计代码
function statistics(n) {
    _joyAnalytics.send('click', {
        aid: 'C00000' + n,
        tag: 'BUTTON'
    });
}


// 地理位置
function getPosition() {
    var lnglatXY = [];
    map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,
            zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'LT'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
        AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
    });
    //解析定位结果

    function onComplete(data) {
        lnglatXY = [data.position.getLng(), data.position.getLat()];
        lng = data.position.getLng();
        lat = data.position.getLat();
        acc = data.accuracy || 0;
        console.log('纬度：' + lat + '\n' + '经度：' + lng);
        // alert('debugger:[{经度:'+lat+','+'纬度:'+lng+'}]');
        // alert(acc);
        regeocoder();
    }

    function regeocoder() { //逆地理编码
        var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
        });
        geocoder.getAddress(lnglatXY, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                geocoder_CallBack(result); //逆向地理编码，坐标-地址
            }
        });
    }

    function geocoder_CallBack(data) { //逆向地理编码后获取地址信息
        if (data) {
            province = data.regeocode.addressComponent.province;
            city = data.regeocode.addressComponent.city;
            district = data.regeocode.addressComponent.district;
            console.log('省：' + province + '\n' + '市：' + city + '\n' + '区：' + district);
            // alert('debugger:[{省:'+province+',市:'+city+',区:'+district+'}]');
            run();
        }
    }

    //解析定位错误信息
    function onError(data) {
        // alert(JSON.stringify(data));
        console.log('定位失败');
        run();
    }
}

$pop.find('.close').click(function(e) {
    $pop.addClass('invisible');
    //本地刷新
    window.location.reload(true);
});

if (localStorage.readtext) {
    $('.shenmin').hide()
} else {
    localStorage.readtext = 1;
}
$('.icon_close').on('click', function() {
    $('.icon_close').closest('.pop').hide()
})
function codest(){
    var st = getQueryString('count') || 1;
    if (st<51) {
    $('.codetrue em').text(st)
    }else{
    $('.codetrue').hide()
    $('.codefalse em').text(st)
    $('.codefalse').show()
    }
}
codest()