/* * @Author: jinxiaojian  * @Last Modified time: 2019-02-28 11:04:11  */
//函数防抖
var debounce = {
    //同步用法
    sync(time) {
        if (window.debounce_time) {
            var new_time = +new Date()
            var old_time = window.debounce_time;
            var diff = time || 1000;
            if (new_time - old_time < diff) {
                window.debounce_offon = false;
            } else {
                window.debounce_offon = true;
            }
        } else {
            window.debounce_time = +new Date()
            window.debounce_offon = true;
        }
    },
    //异步用法
    async(func, wait, immediate) {
        let time
        let debounced = function() {
            let context = this
            if (time) clearTimeout(time)

            if (immediate) {
                let callNow = !time
                if (callNow) func.apply(context, arguments)
                time = setTimeout(
                    () => {
                        time = null
                    } //见注解
                    , wait)
            } else {
                time = setTimeout(
                    () => {
                        func.apply(context, arguments)
                    }, wait)
            }
        }
        debounced.cancel = function() {
            clearTimeout(time)
            time = null
        }
        return debounced
    }
};
module.exports = debounce;


// //同步防抖方法
// debounce.sync(2000)
// if (!window.debounce_offon) { return }


// //异步防抖用法
// //使用防抖
// var Something = debounce.async(需要执行的函数, 1000, true);
// //解除防抖
// document.getElementById("button").addEventListener('click', function() {
//     Something.cancel()
// });