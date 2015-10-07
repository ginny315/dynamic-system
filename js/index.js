require.config({
    paths: {
        FFF:'http://image.yihaodianimg.com/mobile-ued/FFF/v0.1.2/FFF.min',
        //FFF:'FFF',
        jquery:'jquery-1.11.3.min',
        picture:'picture',
        zepto:'zepto',
        app:'app',
        domReady:'domReady'
    }
});

require(['jquery','zepto','FFF','picture','app','domReady'],function($,zepto,FFF,Picture,App,domReady){
	var F = FFF.FFF;
	var pictureList = [];
	var that = this;
	var cnt = 0;//全局变量用于记录实例化的个数
	var footer = $('.footer');
    var scrollRocket = $('.scrollRocket');

domReady(function(){
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

    

    scrollRocket.on('click',function(){
        
        $('html,body').animate({scrollTop:'0px'},1000,function(){
            scrollRocket.css({'opacity':'0'});
        });

    })
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
    if(scrollHeight>documentHeight){
        scrollRocket.animate({'opacity':'1'},1000);
    }
    return (lastboxHeight<scrollHeight+documentHeight)?true:false;
}

function imgLocation(){ 
    console.log("cnt="+cnt);
    var box = $(".picture_wrap");
    var boxArr=[];
    box.each(function(index,value){
        var boxHeight = box.eq(index).height();
        if(index<3){
            boxArr[index]= boxHeight;
        }else{
            var minboxHeight = Math.min.apply(null,boxArr);//获取本行中的最小高度
            //console.log('minboxHeight='+minboxHeight);
            var minboxIndex = $.inArray(minboxHeight,boxArr);
			var topSize = minboxHeight+94;
            //console.log('topSize='+topSize);
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



