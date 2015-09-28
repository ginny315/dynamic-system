require.config({
    paths: {
        FFF:'http://image.yihaodianimg.com/mobile-ued/FFF/v0.1.2/FFF.min',
        jquery:'jquery-1.11.3.min',
        picture:'picture',
        zepto:'zepto',
        app:'app'
    }
});

require(['jquery','zepto','FFF','picture','app'],function($,zepto,FFF,Picture,App){
	var F = FFF.FFF;
	var pictureList = [];
	var that = this;
	var cnt = 0;//全局变量用于记录实例化的个数
	var footer = $('.footer');
	//var exports = App.app;

$(document).ready(function(){
	App.init();
	$('img').on("load",function(){ 
		imgLocation();
	});
	/*滚动时加载事件*/
    window.onscroll = function(){
        if(scrollside()){
            footer.animate({'opacity':'0'},500);
			App.getDynamicList();//加载动效        
		}
        $('img').on("load",function(){ 
			imgLocation();
		});
    }
});

function scrollside(){
    var box = $(".picture_wrap");
    var lastboxHeight = box.last().get(0).offsetTop+Math.floor(box.last().height()/2);
    var documentHeight = $(document).width();
    var scrollHeight = $(window).scrollTop();
    var index_top = $(document).scrollTop()-24;   	
    $('.index_cover').css({
        'top': index_top
    }); 
    return (lastboxHeight<scrollHeight+documentHeight)?true:false;
}

function imgLocation(){
    var box = $(".picture_wrap");
    //var boxWidth = box.eq(0).width();
    //var num = Math.floor($(window).width()/boxWidth);
    var boxArr=[];
    box.each(function(index,value){
        //console.log('index='+index);
        var boxHeight = box.eq(index).height();
        if(index<3){
            boxArr[index]= boxHeight;
            console.log('boxArr['+index+']='+boxArr[index]);
        }else{
            var minboxHeight = Math.min.apply(null,boxArr);//获取本行中的最小高度
            //console.log('minboxHeight='+minboxHeight);
            var minboxIndex = $.inArray(minboxHeight,boxArr);
			var topSize = minboxHeight+94;
            $(value).css({
                "position":"absolute",
                "top":topSize,
                "left":box.eq(minboxIndex).position().left
            });
            boxArr[minboxIndex]+=box.eq(index).height();
        }
    });
}  
});



