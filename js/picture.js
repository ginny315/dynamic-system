define(['FFF','zepto'],function(FFF,$){
   
    var F = FFF.FFF;
    var Widget = F.Widget;
    function Picture(){
        Widget.apply(this,arguments);
    }

    //增加Picture的类属性
    Picture.ATTRS = {
        boundingBox:{
            value:$('<div class="picture_wrap"></div>'),
        },

        pictureId:{
            value:'',
        },

        pictureTag:{
            value:[],
        },

        pictureImg:{
            value:'',
        },

        pictureGif:{
            value:'',
        },

        pictureHtmlcode:{
            value:'',
        },

        pictureCsscode:{
            value:'',
        },

        pictureJscode:{
            value:'',
        }
    }

    //Picture继承自Widget
    F.extend(Picture,Widget,{
        //初始化
        initialize:function(value){
            var that = this;
            var MyPictureInit = that.getBoundingBox();
            that.setPictureId(value.id);
            that.setPictureTag(value.tag);
            that.setPictureImg(value.img);
            that.setPictureGif(value.gif);
            that.setPictureHtmlcode(value.htmlCode);
            that.setPictureCsscode(value.cssCode);
            that.setPictureJscode(value.jsCode);
        },
        //渲染
        renderUI:function(){
            var that = this;
            var MyPicture = that.getBoundingBox();
            var tags = that.getPictureTag();
            var tagList = '';
            for(var i=0 ; i<tags.length ; i++){
                var tagtemp = '<li>' +tags[i]+'</li>';
                tagList += tagtemp;
            }
            
            MyPicture.html('<div class="picture_style">'+
                    '<img src="'+that.getPictureImg()+'">'+
                '</div>'+
                '<div class="picture_word">'+
                   '<h3>标签：</h3>'+
                    '<ul>'+ tagList+'</ul>'+
                '</div>'+
                '<div class="picture_play"></div>'+
                '<div class="picture_padding"></div>');        
        },
/*        //改写父类render方法
        render:function(obj){
            this.callParent(obj);
        },*/
        //绑定事件
        bindUI:function(){
            var that = this;
            var MyPictureBind = that.getBoundingBox();
            var id = that.getPictureId();
            var html = that.getPictureHtmlcode();
            var css = that.getPictureCsscode();
            var js = that.getPictureJscode();
            var picture_play = MyPictureBind.find($('.picture_play'));
            var index_cover = $('.index_cover');
            
            MyPictureBind.on('click',function(event){
                event.stopPropagation();
                event.preventDefault();
                alert("点击图片出现详情页");
                index_cover.css({
                    //'opacity':'1',
                    '-webkit-transform':'translateX(0%)',
                    '-o-transform':'translateX(0%)',
                    '-moz-transform':'translateX(0%)',
                    'transform':'translateX(0%)'
                });

            picture_play.on('click',function(event){               
                event.stopPropagation();
                event.preventDefault();
                 alert(1);
                picture_play.css({
                    'background':'#000 url(./img/iconfont-stop.png) no-repeat',
                    'background-size':'15px',
                    'background-position':'center'
                });
                MyPictureBind.find("img").attr("src",that.getPictureGif());
            });

                var tags = that.getPictureTag();
                var tagList = '';
                var gif = that.getPictureGif();
                $("<span>").html("ID号：").addClass("tag_style").appendTo($(".idList"));
                $("<span>").html("标签：").addClass("tag_style").appendTo($(".tagList")); 
                for(var i=0 ; i<tags.length ; i++){
                   //$("<div>").text(decodeURI(name)).addClass("Tag_style").appendTo($(".asideTag"));
                    $("<div>").text(tags[i]).addClass("button").appendTo($(".tagList"));
                }
                
                $("<span>").html(id).addClass("tag_style").appendTo($(".idList"));
                $("<div>").html(html).appendTo($(".html"));
                $("<div>").html(css).appendTo($(".css"));
                $("<div>").html(js).appendTo($(".js"));
                $(".showP").find("img").attr("src",gif);
                //这里有了标签要改
                //$("<div>").text(decodeURI(name)).addClass("Tag_style").appendTo($(".asideTag"));
                console.log(html);
            });
        },
        //同步事件
        syncUI:function(){

        },
        //销毁对象(未实现)
        destructor:function(obj){
            console.log("I am destory!");
        },   
    });

    return{
            Picture: Picture
    };
});