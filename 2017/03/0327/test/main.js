
        function getUrl(fil, id) {
            //建立绘图空间
            var Cnv = document.getElementById('myCanvas');
            var Cntx = Cnv.getContext('2d');//获取2d编辑容器
            
            var imgss =   new Image();//创建一个图片
            var agoimg=document.getElementById("ago");

            for (var intI = 0; intI < fil.length; intI++) {
                //图片回显
                var tmpFile = fil[intI];
                var reader = new FileReader();
                reader.readAsDataURL(tmpFile);
                //该方法会读取指定的 Blob 或 File 对象.读取操作完成的时候，readyState 会变成已完成（DONE），并触发 loadend 事件，同时 result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容.
                reader.onload = function (e) {
                    url = e.target.result;
                    imgss.src = url;
                    agoimg.src=url;
                    agoimg.onload = function () {
                        //等比缩放
                        var m = imgss.width / imgss.height;
                         Cnv.height =100;//该值影响缩放后图片的大小
                         Cnv.width= 100*m ;
                        //img放入画布中
                        //设置起始坐标，结束坐标
                        Cntx.drawImage(agoimg, 0, 0,100*m,100);
                    }
                }
            }
        }


        function  pressss(){//
            //获取canvas压缩后的图片数据
            var Pic = document.getElementById("myCanvas").toDataURL("image/png");
            //HTMLCanvasElement.toDataURL() 方法返回一个包含图片展示的 data URI .
            var imgs =document.getElementById("press");
            imgs.src =Pic ;
            console.log(`压缩后大小约${parseInt(Pic.length/1024)}kb`);
        }