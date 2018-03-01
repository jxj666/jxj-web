!function(){function a(a,b){var c,d;b=b||"&",c=[];for(d in a)c.push(encodeURIComponent(d)+"="+encodeURIComponent(a[d]));return c.join(b)}function b(b,c){var d,e,f=new Image,g=c.__a,h=Math.floor(c._/100);if(g&&h){for(g+=h,e=d=0;e<g.length;e++)d+=g.charCodeAt(e);c._=100*h+d%100}f.src=v?"https://"+w+b+"?"+a(c):"http://"+w+b+"?"+a(c)}function c(a,b,c,e){var f,g="";(location.hostname.indexOf(".zhipin.com")>=0||"zhipin.com"==location.hostname)&&(e="zhipin.com",d("__a"),d("__c"),d("__l")),c&&(f=new Date,f.setTime(f.getTime()+864e5*c),g="; expires="+f.toGMTString()),c&&e&&d(a),a=a+"="+b+g+"; path=/",e&&(a+=";domain="+e),document.cookie=a}function d(a){var b=a+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT;",c=".kanzhun.com www.kanzhun.com .www.kanzhun.com bosszhipin.kanzhun.com .bosszhipin.kanzhun.com m.kanzhun.com .m.kanzhun.com t.kanzhun.com .t.kanzhun.com wx.kanzhun.com .wx.kanzhun.com t.bosszhipin.com .t.bosszhipin.com yushanapp.com zdzhushou.cc".split(" ");for(a=0;a<c.length;a++)document.cookie=b+"domain="+c[a],document.cookie=b+"domain="+c[a]+"; path=/";document.cookie=b,document.cookie=b+"; path=/"}function e(a){var b,c=a+"=",d=document.cookie.split(";");for(a=0;a<d.length;a++){for(b=d[a];" "==b.charAt(0);)b=b.substring(1,b.length);if(0==b.indexOf(c))return b.substring(c.length,b.length)}return null}function f(a){if(0==a.indexOf("http")){var b=a.indexOf("/",7);b>0&&(a=a.substr(b))}return a}function g(a,b){var c,d,g,h,i,j,k,o=[n,p,q,"t","ab_t","wt"],r={};for(c=0;c<o.length;c++)d=o[c],(g=e(d))&&(r[d]=g);if(h=document.referrer,h&&location.hostname==l(h)&&(h=f(h,location.hostname)),b?r.e=(new Date).getTime()-m:window.performance&&window.performance.timing&&(i=window.performance.timing,i.fetchStart&&(r.e=m-i.fetchStart)),r.r=h,r._=Math.round((new Date).getTime()/1e3),j="undefined"!=typeof _PK?_PK:document.getElementById("page_key_name")&&document.getElementById("page_key_name").getAttribute("value"),j&&(r.pk=j),a)for(k in a)r[k]=a[k];return r}function h(){var b,d,g,h,i,j,k,l,m,s,u,v,w,x,y,z;if(!r){if(r=!0,b=e(n),d=e(o),g=e(p),z={},g)for(0===g.indexOf("%22")&&(g=g.substr(3,g.length-6)),g=g.split("&"),i=0;i<g.length;i++)y=g[i].split("="),2==y.length&&(z[decodeURIComponent(y[0])]=decodeURIComponent(y[1]));g=Math.round((new Date).getTime()/1e3),d&&z.l||(z.l=f(location.href)),d||(z.r=document.referrer),d||(c(o,g),d=g+"");a:{for(y=window.location.search.substring(1).split("&"),i=0;i<y.length;i++)if(h=y[i].split("="),2==h.length&&"sid"==decodeURIComponent(h[0])){h=decodeURIComponent(h[1]);break a}h=""}i=!1,h?(h!==e(q)&&(i=!0),c(q,h),z.g=f(location.href)):(h=e(q),h||(h="-",c(q,h))),c(p,a(z,"&")),b&&8==b.split(".").length?(x=b.split("."),j=x[0],k=x[1],l=x[2],m=x[3],s=+x[4],u=+x[5],v=+x[6],w=+x[7],s+=1,m!=d?(l=m,m=d,u+=1,v=1):v+=1):(j=Math.floor(1e8*Math.random()),k=g,l="",m=d,s=1,u=1,v=1,w=0),i&&(w=0),b=[j,k,l,m,s,u,v,w+1].join("."),t?location.hostname.indexOf("kanzhun.com")>=0?c(n,b,3650,".kanzhun.com"):location.hostname.indexOf("dianzhangzhipin.com")>=0?c(n,b,3650,".dianzhangzhipin.com"):location.hostname.indexOf("bosszhipin.com")>=0?c(n,b,3650,".bosszhipin.com"):location.hostname.indexOf("zhipin.com")>=0?c(n,b,3650,".zhipin.com"):c(n,b,3650):c(n,b,3650)}}function i(){h(),b("/_.gif",g())}function j(a){return a&&0!==a.indexOf("javascript")?a:""}function k(a,c,d,e){if(!a)throw"event track's label params is required";h(),a={ca:a},(c=j(c))&&(a.p1=c),(d=j(d))&&(a.p2=d),(e=j(e))&&(a.p3=e),e=g(a,!0),b("/e.gif",e)}var l,m,n,o,p,q,r,s,t=0<=location.hostname.indexOf("kanzhun.com")||0<=location.hostname.indexOf("bosszhipin")||0<=location.hostname.indexOf("nnhfg.com")||0<=location.hostname.indexOf(".zhipin.com")||0<=location.hostname.indexOf("dianzhangzhipin")||0<=location.hostname.indexOf("qqchx.com")||0<=location.hostname.indexOf("yushanapp.com")||0<=location.hostname.indexOf("zdzhushou.cc"),u=location.hostname.toLowerCase(),v=!1,w="";0<=u.indexOf("bosszhipin")||0<=u.indexOf("weizhipin")||0<=u.indexOf(".zhipin")||0<=u.indexOf(".yushanapp")||0<=u.indexOf(".zdzhushou")?(v=!0,w=t?"t.bosszhipin.com":"t.weizhipin.com"):w=t?"t.kanzhun.com":"192.168.1.251",l=function(){var a=document.createElement("a");return function(b){return b?(a.href=b,a.hostname):""}}(),m=(new Date).getTime(),n="__a",o="__c",p="__l",q="__g",r=!1,window._T,window._T={config:function(a){a=a||{},w=a.domain||w},sendPageView:i,sendEvent:k},i(),function(){var a,b,c=document.getElementsByTagName("impression");if(c.length){for(a=[],b=0;b<c.length;)a.push(c[b].getAttribute("value")),b+=1;1==a.length?k("impression",a[0]):2==a.length?k("impression",a[0],a[1]):3==a.length&&k("impression",a[0],a[1],a[2])}}(),window.onerror=function(a,b,c,d,e){return"Script error."==a||b?(setTimeout(function(){var a,f,g,h;if(d=d||window.event&&window.event.errorCharacter||0,h=d,e&&e.stack)a=e.stack.toString();else if(arguments.callee){for(a=[],f=arguments.callee.caller,g=3;f&&0<--g&&(a.push(f.toString()),f!==f.caller);)f=f.caller;a=a.join(",")}k("errorjs",b+":"+c+":"+h,a)},0),void 0):!0},t&&(s=e("t"),s&&location.hostname&&0<=location.hostname.indexOf("kanzhun.com")&&(d("t"),c("t",s,3650)))}();








(function(win) {
    win.upp = function(url) {
        this._url = url;
        this._init();
    };
    upp.prototype = {
        _init:function() {
            var addressPair = this._url.split("?"), i = 0, keypairs = [];
            this.host = addressPair[0];
            this._params = {};
            if (addressPair.length > 1) {
                keypairs = addressPair[1].split("&");
                for (;i < keypairs.length; i++) {
                    var keypair = keypairs[i].split("=");
                    this.add(keypair[0], keypair[1]);
                }
            }
        },
        add:function(_key, _value) {
            this._params[_key] = _value;
            return this;
        },
        remove:function(key) {
            delete this._params[key];
            return this;
        },
        contains:function(key, value) {
            return this._params[key] !== undefined;
        },
        update:function(key, value) {
            this._params[key] = value;
        },
        get:function(key) {
            return this._params[key];
        },
        all:function() {
            return this._params;
        },
        url:function() {
            var queryStrings = [];
            for (var key in this._params) {
                queryStrings.push(key + "=" + this._params[key]);
            }
            return this.host + (queryStrings.length > 0 ? "?" :"") + queryStrings.join("&");
        }
    };
})(window);

(function() {
    if (window._T) {
        var _body = document.getElementsByTagName("body")[0], addEvent = function(obj, type, fn) {
            if (obj.addEventListener) obj.addEventListener(type, fn, false); else if (obj.attachEvent) {
                //保存指针 供removeEvent时使用
                obj["e" + type + fn] = fn;
                obj.attachEvent("on" + type, function() {
                    obj["e" + type + fn].call(obj, window.event);
                });
            }
        };
        if (_body) {
            addEvent(_body, "click", function(e) {
                var target = e.target || e.srcElement;
                while (target !== document && target !== document.body && target.getAttribute && !target.getAttribute("ka") && target.parentNode) {
                    target = target.parentNode;
                }
                if (!target.getAttribute) return;
                var k = target.getAttribute("ka");
                if (k) {
                    var p = target.getAttribute("href") || "";
                    if (p && p.indexOf("#") !== 0 && p.indexOf("javascript:;") === -1 && !target.getAttribute("noa")) {
                        var u = new window.upp(p);
                        //加白名单判断--start
                        var whiteLlist = [ "bosszhipin.com", "kanzhun.com", "weizhipin.com" ];
                        var len = whiteLlist.length;
                        var flag = false;
                        if (p.indexOf("http://") >= 0 || p.indexOf("https://") >= 0) {
                            for (var i = 0; i < len; i++) {
                                if (p.indexOf(whiteLlist[i]) >= 0) {
                                    flag = true;
                                    break;
                                }
                            }
                        } else {
                            flag = true;
                        }
                        if (flag) {
                            u.add("ka", encodeURIComponent(k));
                            if (!target.getAttribute("xieyi") == "") {
                                target.setAttribute("href", u.url() + "#" + target.getAttribute("xieyi"));
                            } else if(p.indexOf("tel:") == -1 && p.indexOf("mailto:") == -1) {//排除tel和mailto
                                target.setAttribute("href", u.url());
                            }
                        }
                    }
                    _T.sendEvent(k, p);
                }
            });
        }
    }
    if (typeof $ != "undefined") {
        $("[iska]").each(function(index, element) {
            var T = $(this);
            T.click(function(e) {
                $("<i ka=" + T.attr("ka") + " style='display:none'></i>").appendTo("body").click().delay(200).remove();
                e.stopPropagation();
            });
        });
    }
})();

