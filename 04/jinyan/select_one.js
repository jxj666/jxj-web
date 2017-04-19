var _BASE = window.location.origin;

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(?:&|$)", 'i');
    var str_arr = window.location.search.substr(1).match(reg);
    return str_arr != null ? str_arr[2] : null;
}
var activity_id = getQueryString('activity_id');
var orderId = getQueryString('orderid');

//var items = [];
$.ajax({
    type: 'GET',
    url: '/award/subDetail',
    data: {
        activityId: activity_id
    },
    success: function(res) {
        if (res.code == 1) {
            //items = res.context.products;
            var list = res.context.products;
            /*if(items.length<6){
                list = items;
                $('.btn').hide()
            }else {
                list = getRandomArrayElements(items, 6);
            }*/

            var html = '';
            for (var i = 0; i < list.length; i++) {
                html += '<li tag="' + i + '"><img tag="' + i + '" src="' + list[i].awardProduct.image + '"></li>'
            }
            $('ul').html(html);
            $('ul li').on('click', function(e) {
                var index = parseInt($(e.target).attr('tag'));

                $('.pop h1').html(list[index].awardProduct.awardName);
                $('.pop .prize_info').html(list[index].awardProduct.description.replace(/\n/g, '<br>'));
                $('.pop').show();
                $('.get_prize').on('click', function() {
                    $.ajax({
                        type: 'POST',
                        url: '/award/updateAward',
                        data: {
                            orderid: orderId,
                            productId: list[index].awardProduct.productId
                        },
                        success: function(res) {
                            if (res.code == 1) {
                                    var awardSrc = `${_BASE}/a/p/guangxi-jins-cons-prize-detail.html?order_id=${res.context.orderid}`
                                    console.log('awardSrc');
                                    window.location.href=awardSrc;
                                
                            } else {
                                alert(res.msg)
                            }
                        }
                    })
                })

            })
        }

    }
})

function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}


/*$('.btn').on('click',function () {
    var list = [];
    if( items.length < 6){
        list = items;
    }else {
        list = getRandomArrayElements(items, 6);
    }
    var html = '';
    for(var i = 0;i<list.length;i++){
        html += '<li><img tag="'+ i +'" src="'+ list[i].awardProduct.image +'"></li>'
    }

    $('ul').html(html);
    $('ul li').on('click',function(e){
        var index = parseInt($(e.target).attr('tag'));

        $('.pop h1').html(list[index].awardProduct.awardName);
        $('.pop .prize_info').html(list[index].awardProduct.description.replace(/\n/g, '<br>'));
        $('.pop').removeClass('hide');
        $('.get_prize').on('click',function () {
            $.ajax({
                type:'POST',
                url:'/award/updateAward',
                data:{
                    orderid:orderId,
                    productId:list[index].awardProduct.productId
                },
                success:function (res) {
                    if(res.code == 1){
                        $('.pop').addClass('hide')
                        document.location.href = '/a/p/qr-longfeng-single-redpack.html?activity_id='+ activity_id +'&orderid='+orderId
                    }else {
                        alert(res.msg)
                    }
                }
            })
        })

    })
})*/

$('.closePop').on('click', function() {
    $('.pop').hide()
})
