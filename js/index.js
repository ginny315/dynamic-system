require.config({
    paths: {
        FFF:'http://image.yihaodianimg.com/mobile-ued/FFF/v0.1.2/FFF.min',
        jquery:'jquery-1.11.3.min',
        picture:'picture',
        //zepto:'zepto'
    }
});

require(['jquery','zepto','FFF','picture'],function($,zepto,FFF,Picture){
//require(['zepto','FFF','picture'],function($,FFF,Picture){
//require(['FFF','picture'],function(FFF,Picture){
	var F = FFF.FFF;
	var pictureList = [];
	var that = this;
	var cnt = 0;//全局变量用于记录实例化的个数
	var footer = $('.footer');

	$('.html').addClass('codeshow');
	$('.html').css({'color':'#f6b344'});
	$('.css').addClass('codehidden');
	$('.js').addClass('codehidden');

	$('.showP a').on('click','img',function(){
		var that = $(this);
		console.log(that);
		//that.attr('src',that.getPictureGif());
	});

	$('.choose').on('click',function(){
		var that = $(this);
		$('.choose').removeClass('choose_after');
		that.addClass('choose_after');
		$('.choose').removeClass('choose_hover');
		that.addClass('choose_hover');
		var name = parseInt(that.attr('class').substring(13,14));
		switch(name){
			case(1):
				$('.html').css({'display':'block','color':'#f6b344'});
				$('.css').css({'display':'none'});
				$('.js').css({'display':'none'});
				break;

			case(2):
				$('.css').css({'display':"block","color":"#f6b344"});
				$(".html").css({"display":"none"});
				$(".js").css({"display":"none"});
				break;

			case(3):
				$(".js").css({"display":"block","color":"#f6b344"});
				$(".html").css({"display":"none"});
				$(".css").css({"display":"none"});
				break;
			default:console.log("there is an error");
		}
	}); 

	$(".detail_back").on('click',function(){
		$('.index_cover').css({
			'opacity':'0',
            'transform':'translateX(-200%)'
		});
		$('.tagList').html('');
		$('.idList').html('');
		$(".html").html('');
		$(".css").html('');
		$(".js").html('');
		$(".showP").find("img").attr("src",'');
	});

$(document).ready(function(){
    //$(window).on("load",function(){ 
    var index_top = 0;
        //var dataImg = {"data":pictureList};
/*起始状态加载10条数据*/
        for(cnt=0 ; cnt<10 ;cnt++){
	        var pic_temp = pictureList[cnt];
			pic_temp = new Picture.Picture({
				id:'0001',
				tag:['black','dark','hehe'],
				img:'img/'+Math.floor(Math.random()*5+1)+'.png',
				gif:'img/2.png',
				htmlCode:'load html code',
				cssCode:'load css code',
				jsCode:'load js code',
			});
			pic_temp.render({
			container:zepto('.picture_list'),
			type:'append'
			});
		}
		$('img').on("load",function(){ 
			imgLocation();
		});
/*滚动时加载事件*/
        window.onscroll = function(){
            if(scrollside()){
                //$.each(dataImg.data,function(index,value){
                   //for(var i=1 ; i<10 ;i++){
                footer.animate({'opacity':'0'},500);
				        var pic_temp = pictureList[++cnt];
						pic_temp = new Picture.Picture({
							id:'0001',
							tag:['black','dark','hehe'],
							img:'img/'+Math.floor(Math.random()*5+1)+'.png',
							gif:'img/2.png',
							htmlCode:'load html code',
							cssCode:'load css code',
							jsCode:'load js code',
						});
						pic_temp.render({
						container:zepto('.picture_list'),
						type:'append'
					});
					//}
					 console.log('cnt='+cnt);
				//});
                $('img').on("load",function(){ 
					imgLocation();
				});
            }
        }
   // });
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
	//alert(2);
    var box = $(".picture_wrap");
    //console.log('box='+box);
    var boxWidth = box.eq(0).width();
    //var num = Math.floor($(window).width()/boxWidth);//每行的数量
    var boxArr=[];
    box.each(function(index,value){
        console.log('index='+index);
        var boxHeight = box.eq(index).height();
        if(index<3){
            boxArr[index]= boxHeight;
            console.log('boxArr['+index+']='+boxArr[index]);
        }else{
            var minboxHeight = Math.min.apply(null,boxArr);//获取本行中的最小高度
            console.log('minboxHeight='+minboxHeight);
            var minboxIndex = $.inArray(minboxHeight,boxArr);
//            console.log("minboxIndex="+minboxIndex);
//            console.log(value);
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
})



