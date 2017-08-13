// 倒计时
// 设置定时器,每一秒更新一次页面实现倒计时
let timer = null;

function updateCountDown(endTime, dTime) { // 结束时间,服务器与本地时间差
    let now = new Date().getTime() + dTime;
    let time = (endTime - now) / 1000;
    if (time >= 0) {
        let day = parseInt(time / (3600 * 24), 10);
        day < 10 && (day = '0' + day);
        let hour = parseInt((time % (3600 * 24) / 3600), 10);
        hour < 10 && (hour = `0${hour}`);
        let minute = parseInt((time % 3600 / 60), 10);
        minute < 10 && (minute = '0' + minute);
        let second = parseInt(time % 60, 10);
        second < 10 && (second = '0' + second);
        $('[data-info=day]').html(day);
        $('[data-info=hour]').html(hour);
        $('[data-info=minute]').html(minute);
        $('[data-info=second]').html(second);

        timer = setTimeout(updateCountDown.bind(null, endTime, dTime), 1000);
    } else {
        $('.cd-clock').html('<span class="text-time">活动已结束~</span>');
        clearTimeout(timer);
        timer = null;
    }
}



// const urlParamsObj = $.getParamObj(); // 取得所有活动参数
// // 活动信息
// const activityId = getQueryString('activityid');
// if (!activityId) {
//     alert('缺少活动id');
//     return;
// }

// const barCode = getQueryString('barcode');
// if (!activityId) {
//     alert('请扫码进入活动');
//     return;
// }

// // modal框
// $(document).on('click', '[data-click=modal]', function(e) {
//     $(this).is('a') && e.preventDefault();
//     const target = $(this).attr('href') || $(this).data('target');
//     e = $.Event('shown.cj.modal', { relatedTarget: this });
//     $(target).removeClass('invisible').trigger(e).closest('.tip-bg').removeClass('invisible');
// }).on('click', '[data-dismiss=modal]', function(e) {
//     $(this).is('a') && e.preventDefault();
//     const target = $(this).attr('href') || $(this).data('target');
//     e = $.Event('hidden.cj.modal');
//     $(target).addClass('invisible').trigger(e).closest('.tip-bg').addClass('invisible');
// });

// // 码包信息
// $.get(`/qr/info/${barCode}?activityId=${activityId}`).done((res) => {
//     if (res.code === 1) {
//         if (res.context.qrinfo.withPin) {
//             const qrInfo = res.context.qrinfo;
//             const product = qrInfo.product;
//             const $scanTip = $('.scan-tip');
//             // 4位或6位验证码
//             if (qrInfo.pinLen === 4) {
//                 $scanTip.find('.scan_num.num_4').addClass('active');
//             } else if (qrInfo.pinLen === 6) {
//                 $scanTip.find('.scan_num.num_6').addClass('active');
//             } else {
//                 alert('验证码位数设置有误');
//                 return;
//             }
//             $('.scan_num.active input').val('').on('input', function() {
//                 const val = $(this).val();
//                 if (val.length === qrInfo.pinLen) {
//                     $(this).blur();
//                     $('[data-click=help]').removeClass('disabled');
//                 }
//             });

//             $scanTip.find('.title_img img').attr('src', product.image);
//             $scanTip.find('[data-info=productName]').html(product.shortName);
//             $scanTip.find('[data-info=scanTimes]').html(qrInfo.scanTimes);
//         } else {
//             // 如果不需要验证码直接隐藏
//             $('.tip-bg').hide();
//         }
//     } else {
//         alert(res.msg);
//     }
// });

// 用户信息
let userInfo = {};

// 抽奖按钮状态
function platebtnStat() {
    userInfo.score ? $('#turnPlatebtn').removeClass('disabled') :
        $('#turnPlatebtn').addClass('disabled');
}

function getUserInfo() {
    $.get('/act/comp/user', {
        activityId,
    }).done((res) => {
        if (res.code === 1) {
            userInfo = res.context.actUser;
            $('[data-info=userScore]').text(userInfo.score);
            platebtnStat();
        } else {
            alert(res.msg);
        }
    });
}


// 调用验真接口
$('[data-click=help]').off().click(function() {
    const that = this;
    if ($(this).hasClass('disabled')) {
        $('.scan_num.active').find('h5').html('请输入烟包翻盖内的验证码').addClass('result');
        return;
    }
    // 防止按钮重复点击
    $(this).addClass('disabled');
    let timer = setTimeout(() => {
        $(this).removeClass('disabled');
    }, 3000);
    // 盒内验证码
    const vcode = $('.scan_num.active input').val();
    // alert(code);
    $.post(`/qr/verify/${barCode}`, {
        activityId,
        vcode,
        withDrawTimes: true,
    }).done((res) => {
        if (res.code === 1) {
            const vRes = res.context.vres;
            if (vRes.verifyTimes) {
                $(this).removeClass('disabled');
                $('.scan_num.active').find('h5').html(`验真成功,这是第${vRes.verifyTimes}次验真`).addClass('result');
                $(that).text('确认').off().one('click', () => {
                    $(that).closest('.tip-bg').addClass('invisible');
                });
            }

            // 获取用户抽奖次数
            getUserInfo();
        } else {
            clearTimeout(timer);
            $(that).addClass('disabled');

            $('.scan_num.active').find('h5').html(res.msg).addClass('result');
        }
    });
});
$.get('/act/info', {
    activityId,
    cache: false, // 是否从缓存里读取
    withParams: true, // 是否返回活动所有参数
    withBanner: true, // 是否返回banner配置
}).done((res) => {
    const { activity, banners } = res.context;
    let params = activity.paramsMap || {};
    params['活动信息配置'] && (params = params['活动信息配置']);
    // 主题色
    if (params['acms.act.style'] && params['acms.act.style'].value) {
        $('#theme').attr('href', `//weiop.oss-cn-beijing.aliyuncs.com/templates/run_plate/css/theme-${params['acms.act.style'].value}.min.css`);
    } else {
        $('#theme').attr('href', '//weiop.oss-cn-beijing.aliyuncs.com/templates/run_plate/css/theme-default.min.css');
    }
    // banner
    let banner = {};
    if (banners.length) {
        banners.forEach((v) => {
            v.status === 1 && (banner = v);
        });
    }
    const $luckyTop = $('.lucky-top');
    // $luckyTop.find('h1').html(activity.name);
    $luckyTop.find('h1').html(params['acms.act.title'].value);
    $luckyTop.find('.top-img').attr('src', banner.image ? banner.image : activity.bgImage);

    // 倒计时
    const endTime = activity.endTime ? new Date(activity.endTime).getTime() : 0; // 活动结束时间
    const dTime = res.systemTime - new Date().getTime(); // 本地和服务器的时差
    updateCountDown(endTime, dTime);

    // 二维码
    if (params['acms.act.qr']) {
        $('img.code').attr('src', params['acms.act.qr'].value);

        $('#modal-kf img.tip-code').attr('src', params['acms.act.qr'].value);
    }
    // 活动主办方
    params['acms.act.org'] && $('[data-info="org"]').text(params['acms.act.org'].value);
    // 客服文案
    params['acms.act.cstext'] && $('[data-info="cstext"]').text(params['acms.act.cstext'].value);
    // 奖项规则
    params['acms.act.rules'] && $('[data-info="rules"]').text(params['acms.act.rules'].value);
    // 活动时间
    activity.beginTime && $('[data-info="beginTime"]').text(activity.beginTime.split(' ')[0]);
    activity.endTime && $('[data-info="endTime"]').text(activity.endTime.split(' ')[0]);
    // 隐私权
    params['acms.policy.privacy'] && $('[data-info=privacy]').text(params['acms.policy.privacy'].value);
});

// 大转盘礼品
let awardObj = {}; // 奖品对象，用于对应转盘上的位置
$.get(`/act/plan/${activityId}`).done((res) => {
    const items = res.context.items || [];
    let itemsLen = items.length;
    if (itemsLen) {
        $('.canvas-wrap').html(`<button id="turnPlatebtn" class="btn disabled"></button>
            <canvas id="canvas" class="canvas" width="590" height="590">您的浏览器不支持canvas！</canvas>
           `);
        let html = '';
        let awardHtml = `<li class="row row-border">
                        <span class="row-color">礼品</span>
                        <span class="row-color">说明</span>
                        <span class="row-color">数量</span>
                    </li>`;
        let awardQuantity = 0; // 礼品库存
        let i = 0;
        for (; i < itemsLen; i++) {
            // 大转盘礼品，最多为7个
            if (i < 7) {
                html += `<div class="award plate-deg_${i * 45}">
                     <div class="award-img">
                        <h2>${items[i].productName}</h2>
                        <img src="${items[i].productImage}" alt="">
                    </div>
            </div>`;

                awardObj[items[i].productId] = i + 1;
            }
            // 活动礼品说明
            awardHtml += `<li class="row">
                        <span>${items[i].productName}</span>
                        <span>${items[i].detail ? items[i].detail : ''}</span>
                        <span>${items[i].quantity}</span>
                    </li>`;
            awardQuantity += items[i].quantity - 0;
        }
        html += `<div class="award plate-deg_${i * 45}">
                     <div class="award-img">
                        <h2>神秘礼盒</h2>
                        <img src="//cdn1.chengjuiot.com/templates/img/tk.png" alt="">
                    </div>
            </div>`;
        $('.canvas-wrap').append(html);

        platebtnStat(); // 抽奖按钮状态

        plateInit(); // 初始化大转盘

        $('#giftList .tip-list').html(awardHtml);
        $('[data-info=awardQuantity]').text(awardQuantity);
    } else {
        alert('还未设置礼品');
        $('#turnPlatebtn').addClass('disabled');
    }
});

// 图标切换
$('[data-click=orderList]').click(function(e) {
    $(this).is('a') && e.preventDefault();
    location.href = `/a/p/common-order-list-v1.html?${decodeURIComponent($.param(urlParamsObj))}`;
});

$('[data-click="winner-list"]').click(function() {
    location.href = `./2.html?${decodeURIComponent($.param(urlParamsObj))}`;
});

// 转盘
function plateInit() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const canvasWidth = $('.canvas').width();
    const canvasHeight = $('.canvas').height();
    // canvas.setAttribute('width', canvasWidth + 'px');
    // canvas.setAttribute('height', canvasHeight + 'px');

    let initObj = {
        index: 0,
        timer: null,
        deg: Math.PI / 180,
        running: false, // 是否运行中
        speed: 300, // 速度
        isBeginPrize: false, // 是否开始抽奖
        stepping: 0, // 步数，经过一个扇形为1步
        baseCircle: 5, // 点击开始时，圆盘旋转的圈数，旋转玩指定圈数之后，再根据selected的值确定奖项
        selected: 0, // 最终选中第几个扇形，也就是确定几等奖
    };
    const pin = new Image();
    pin.src = '//cdn1.chengjuiot.com/templates/run_plate/img/new_pin.png';

    ctx.translate(canvas.width / 2, canvas.height / 2);

    function drawPin() {
        ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        ctx.drawImage(pin, 0, -253);
        ctx.rotate(Math.PI / 180 * 45);
    }

    function clearTimer() {
        clearInterval(initObj.timer);
        initObj.timer = null;
    }

    // 初始化抽奖参数
    function init() {
        initObj.baseCircle = 5;
        initObj.selected = 0; // 最终选中第几个扇形，也就是确定几等奖
        initObj.running = false;
        initObj.isBeginPrize = false;
        initObj.index = initObj.index++;
        initObj.stepping = 1;
        initObj.speed = 300;
    }

    function spinPlate() {
        if (initObj.stepping === 4) { // 4步之后开始加速
            clearTimer();
            initObj.speed = 100;
            initObj.timer = setInterval(spinPlate, initObj.speed);
        }

        if (initObj.baseCircle > 0 && initObj.index === 8) { // 基本圈数结束以后，开始随机抽奖
            initObj.index = 0;
            initObj.baseCircle--;
            if (initObj.baseCircle === 0) { // 开始抽奖
                clearTimer();
                initObj.speed = 280;
                initObj.timer = setInterval(spinPlate, initObj.speed);
                initObj.isBeginPrize = true;
            }
        }

        if (initObj.isBeginPrize && initObj.selected > 0) { // 开始抽奖
            if (--initObj.selected === 0) { // 到了选择的奖项之后
                clearTimer();
                init();
                getUserInfo();

                setTimeout(() => { // 展示奖品
                    $('#winAward').removeClass('invisible');
                }, 1000);
            } else {
                clearTimer();
                initObj.speed += 60;
                initObj.timer = setInterval(spinPlate, initObj.speed);
            }
        }

        drawPin();
        initObj.index++;
        initObj.stepping++;
    }

    // 开始抽奖
    $('#turnPlatebtn').on('click', start);

    function start() {
        if ($('#turnPlatebtn').hasClass('disabled')) {
            return;
        }
        $('#turnPlatebtn').addClass('disabled');
        $.post(`/act/draw/${activityId}`).done((res) => {
            if (res.code === 1) {
                const order = res.context.order.order;
                const award = res.context.order.details[0];
                const $winAward = $('#winAward');
                if (award) {
                    initObj.selected = awardObj[award.productId] || Object.keys(awardObj).length + 1;
                    $winAward.html(`<div class="pop_head"></div>
            <div class="lucky-pop">
                <div class="img-content">
                    <img src="${award.productImage}" class="yogurt">
                </div>
                <p class="lucky-title">${award.productName}</p>
                <a href="/a/p/common-order-delivery-v1.html?orderid=${order.orderid}&activityid=${activityId}" class="lucky-get">点击领取</a>
            </div>`);
                } else {
                    // 谢谢参与
                    initObj.selected = Object.keys(awardObj).length + 1;
                    $winAward.html(`<div class="lucky-pop">
                <div class="pop-close">
                    <a href="../"></a>
                </div>
                <h2>谢谢您的参与!</h2>
            </div>`);
                }
                console.info(initObj.selected);
                run();
            } else {
                alert(res.msg);
            }
        });
    }

    function run() {
        initObj.timer = setInterval(spinPlate, initObj.speed);
    }
}


//  大喇叭
/**
 * @author fu
 * @file 小喇叭
 * Created by fu on 17/6/29.
 */
function bcAniamtion() {
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
}


// 小喇叭接口
$.post('/award/broadcast', {
    activityId,
}).done((res) => {
    if (res.code === 1) {
        let broadcastHtml = '';
        const broadcastList = res.context || [];
        if (broadcastList.length) {
            broadcastList.forEach(function(order) {
                broadcastHtml += `<li>
                    <h5>用户<span>${order.user && order.user.nickname}</span>获得<span>${order.details[0] ? order.details[0].productName : ''}</span></h5>
                </li>`;
            });
            $('[data-info="broadcast"]').html(broadcastHtml);
            bcAniamtion();
        } else {
            $('[data-info="broadcast"]').html('<li><h5>暂时没有订单</h5></li>');
        }
    } else {
        alert(res.msg);
    }
});
/** pv begin */
/*$.get('/act/comp/stat', { // 发起人数
  activityId,
}).done((res) => {
  if (res.code === 1) {
    const actUserStat = res.context.actUserStat;
  } else {
    alert(res.msg);
  }
});*/
$.get(`/qr/stat/${activityId}`, { // 扫码人数
    type: 'qrlog', // qrlog 扫码 verifylog 验真
}).done((res) => {
    if (res.code === 1) {
        $('[data-info=totalScan]').text(res.context.scan);
    } else {
        alert(res.msg);
    }
});
// 查询活动订单数量
$.get('/award/orders/count', {
    activityId,
}).done((res) => {
    if (res.code === 1) {
        $('[data-info=totalPrize]').text(res.context.total);
    } else {
        alert(res.msg);
    }
});
/** pv end */