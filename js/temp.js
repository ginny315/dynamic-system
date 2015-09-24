require.config({
    paths: {
        FFF:'FFF',
        //jquery:'jquery-1.11.3.min',
        picture:'picture',
        zepto:'zepto',
        app:'app'
    }
});


require(['FFF','picture'],function(FFF,Picture){
	var F = FFF.FFF;
	var pictureList = [];
	var that = this;

	/*for(var i=0 ;i<5 ;i++){
		var pic_temp = pictureList[i];
		pic_temp = new Picture.Picture({
			id:'0001',
			tag:['black','dark','hehe'],
			img:'img/1.png',
			gif:'img/2.png',
			htmlCode:'load html code',
			cssCode:'load css code',
			jsCode:'load js code',
		});
		pic_temp.render({
			container:$('.picture_list'),
			type:'append'
		});  
	}*/ 


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
	//alert(1);
    //$(window).on("load",function(){
       imgLocation();

        var dataImg = {"data":pictureList};

		pictureList[1] = new Picture.Picture({img:'img/1.png',gif:'img/1.png',tag:['black','dark','hehe'],});
		pictureList[1].render({container:$('.picture_list'),type:'append',});

		pictureList[2] = new Picture.Picture({img:'img/2.png',gif:'img/2.png',tag:['black','dark','hehe'],});
		pictureList[2].render({container:$('.picture_list'),type:'append'});

		pictureList[3] = new Picture.Picture({img:'img/3.png',gif:'img/3.png',tag:['black','dark','hehe'],});
		pictureList[3].render({container:$('.picture_list'),type:'append'});
        //console.log("pictureList"+pictureList[5].img);
        //console.log("dataImg"+dataImg.data.img);
        window.onscroll = function(){
            if(scrollside()){
                //$.each(dataImg.data,function(index,value){
                   for(var i=4 ; i<10 ;i++){
				        var pic_temp = pictureList[i];
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
						container:$('.picture_list'),
						type:'append'
					});
					}
					 
				//});
                imgLocation();
            }
        }
   // });
});


function scrollside(){
    var box = $(".picture_wrap");
    var lastboxHeight = box.last().get(0).offsetTop+Math.floor(box.last().height()/2);
    var documentHeight = $(document).width();
    var scrollHeight = $(window).scrollTop();
    return (lastboxHeight<scrollHeight+documentHeight)?true:false;
}

function imgLocation(){
	//alert(2);
    var box = $(".picture_wrap");
    console.log('box='+box);
    var boxWidth = box.eq(0).width();
    var num = Math.floor($(window).width()/boxWidth);
    var boxArr=[];
    box.each(function(index,value){
//        console.log(index+"--"+value);
        var boxHeight = box.eq(index).height();
        if(index<num){
            boxArr[index]= boxHeight;
//            console.log(boxHeight);
        }else{
            var minboxHeight = Math.min.apply(null,boxArr);
            console.log('minboxHeight='+minboxHeight);
            var minboxIndex = $.inArray(minboxHeight,boxArr);
//            console.log("minboxIndex="+minboxIndex);
//            console.log(value);
			var topSize = 
            $(value).css({
                "position":"absolute",
                "top":minboxHeight,
                "left":box.eq(minboxIndex).position().left
            });
            boxArr[minboxIndex]+=box.eq(index).height();
        }
    });
}   	
})



