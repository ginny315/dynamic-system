define(['FFF','zepto'],function(FFF,$){
   
    var F = FFF.FFF;
    var Widget = F.Widget;
    function Box(){
        Widget.apply(this,arguments);
    }

    //增加Box的类属性
    Box.ATTRS = {
    boundingBox:{
        value:$('<div></div>'),
    },
    /*1represent+,2represent-*/
    boxCount:{
        value:0,
    },
    }

    //Box继承自Widget
    F.extend(Box,Widget,{
        //初始化
        initialize:function(){
        },
        //渲染
        renderUI:function(){
            var that = this;
            var MyBox = that.getBoundingBox();
            MyBox.html('<ul>'+
            '<li>总数:</li>'+
            '<li class="sum" value="data-cnt">data-cnt</li>'+
            '<li class="button_add">+</li>'+
            '<li class="button_minus">-</li>'+
            '<li class="button_on_off"><div class="round"></div></li>'+
            '</ul>');
        
        },
/*        //改写父类render方法
        render:function(obj){
            this.callParent(obj);
        },*/
        //绑定事件//改变后重新渲染事件？？？
        bindUI:function(){
            var that = this;
            var MyBoxHeader = that.getBoundingBox();
            
            $('.button_add').on('click',function(){
                var MyBoxCount = that.getBoxCount();
                that.setBoxCount(+MyBoxCount+1);
                var $sum = $('.sum');
                $sum.html(that.getBoxCount());
            });

            MyBoxHeader.on('minusself',function(obj){
                var MyBoxCount = that.getBoxCount();
                that.setBoxCount(+MyBoxCount-1);
                var $sum = $('.sum');
                $sum.html(that.getBoxCount());
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
            Box: Box
    };


});