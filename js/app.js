define(['jquery','zepto','FFF','picture'],function($,zepto,FFF,Picture){
	var exports = {};
	var F = FFF.FFF;
	var pictureList = [];
	var that = this;
	var footer = $('.footer');
	var detail_back  = $(".detail_back");
	var index_cover = $('.index_cover');

	window.cnt = 0;//全局变量用于记录实例化的个数
	window.pageNum = 20;//每次请求的数据库记录条数
	window.pageIndex = 1;//初始化请求的页数
	window.categoryId = 1;//一共3类
	window.tagId = 0;
	subMenuId = 0;
	exports.init = function(){
		var that = this;
		that.getAsideList();
		that.getDynamicList(pageIndex,pageNum,categoryId);
		that.getBind();
		that.getBind_aside();
	}

//添加动效细节
	exports.addDynamic = function(id,tag,gif,img,htmlcode,csscode,jscode){
		var that = this;
		var pic_temp = pictureList[cnt++];
		pic_temp = new Picture.Picture({
			id:id,
			tag:tag,
			img:img,
			gif:gif,
			htmlCode:htmlcode,
			cssCode:csscode,
			jsCode:jscode,
		});
		pic_temp.render({
			container:zepto('.picture_list'),
			type:'append'
		});

		$('img').on("load",function(){ 
			console.log(cnt+'='+pic_temp.getBoundingBox().height());
		});		
	}

//添加侧栏细节
	exports.addMenuList = function(i,firstListName,secondList){
		var h2Name;
		var aa;
		var Dynamic;
		
		if(i == 0){
			Dynamic = $("<div>").addClass("Dynamic").appendTo($(".aside"));

		}else{
			Dynamic = $("<div>").addClass("Dynamic").addClass("Action").appendTo($(".aside"));
		}
		h2Name = $("<h2>").addClass("firstList_h2_style").appendTo(Dynamic);
		aa = $("<a>").addClass("firstList_a_style").attr("href","#").text(firstListName).appendTo(h2Name);
		var DyDiv = $("<div>").addClass("DyDiv").appendTo(h2Name);
		for(var j in secondList){
			//var j = 1;
			var divName = $("<div>").addClass("secondList_div_style").appendTo(Dynamic);
			aa = $("<a>").addClass("secondList_a_style").attr("href","#").text(secondList[j].name).appendTo(divName);
		}
	}
//添加标签细节
	exports.addTagList = function(id,name){
		$("<div>").text(decodeURI(name)).addClass("Tag_style").appendTo($(".asideTag"));
	}

/*发送请求分别获取标签数据*/
exports.getAsideList = function(){
	var that = this;
	that.addMenuList(0,'引入动效',[{id:'1',name:'开场动效'},{id:'2',name:'引导动效'},{id:3,name:'加载动效'}]);
	that.addMenuList(1,'手势动效',[{id:'1',name:'开场动效'},{id:'2',name:'引导动效'},{id:3,name:'加载动效'}]);
	that.addMenuList(2,'转场动效',[{id:'1',name:'开场动效'},{id:'2',name:'引导动效'},{id:3,name:'加载动效'}]);
	that.addMenuList(3,'组建动效',[{id:'1',name:'开场动效'},{id:'2',name:'引导动效'},{id:3,name:'加载动效'}]);
}

exports.getDynamicList = function(pageIndex,pageNum,categoryId,tagId,subMenuId){
	var that = this;
	var filtermsg = {};

	if(!pageIndex)	
		pageIndex = 1; 
	else 
		pageIndex = parseInt(window.pageIndex)+1;//设置全局的页码

	if(tagId == 0 && subMenuId == 0){//初始加载未加选择的状态
		filtermsg = {
			"pageIndex":pageIndex,
			"pageNum":pageNum,
			"categoryId":categoryId,
			"tagId":tagId,
			"subMenuId":subMenuId
		}
	}else{
		filtermsg = {
			"pageIndex":pageIndex,
			"pageNum":pageNum,
			"categoryId":categoryId,
		}
	}

	for(var i=0 ; i<10 ; i++){
		var temp = Math.floor(Math.random()*9+1);
		that.addDynamic('001',['tag1','tag2'],'img/'+temp+'.gif','img/'+temp+'.png','this is No.'+temp+'html','this is No.'+temp+'css','this is No.'+temp+'js');
	}//that.addId(1,"\u53c2\u8003");
	/*$.ajax({
		type:"GET",
		url:"../dynamicLib/getDynamicList/",
		data:filtermsg,
		dataType:"json",
		success:function(a){
			if (a.status == '0') {//返回0表示成功
				var list = a.data.dynamicList;
				console.log("get dynamicList success!");
				for(var i in list){
					if(list[i].id == resIDValue)
					that.addDynamic(list[i].id,list[i].tag,list[i].gif,list[i].img,list[i].htmlCode,list[i].cssCode,list[i].jsCode);
				}
			}
		}
	});*///ajax
/*
	$.ajax({
		type:"GET",
		url:"../dynamicLib/getTagList/",
		data:{'pageNum':100},
		dataType:"json",
		success:function(a){
			if (a.status == '0') {//返回0表示成功
				var list = a.data.tagList;
				console.log("get taglist success");
				for(var i in list){
					if(list[i].id == resIDValue)
					that.addId(list[i].id,list[i].name);
				}
			}
		}
	});*/
/*获取tag标签*/
	/*$.ajax({
		type:"GET",
		url:"../dynamicLib/getTagList/",
		data:null,
		dataType:"json",
		success:function(a){
			if (a.status == '0') {//返回0表示成功
				var list = a.data.tagList;
				for(var i in list){
					that.addTagList(list[i].id,list[i].name);						
				}
			}
		}
	});*/
/*获取menu标签*/
	/*$.ajax({
		type:"GET",
		url:"../dynamicLib/getMenuList/",
		data:null,
		dataType:"json",
		success:function(a){
			if (a.status == '0') {//返回0表示成功
				var list = a.data.menuList;
				console.log("get MenuList success!");
				for(var i in list){
					that.addMenuList(i,list[i].name,list[i].subMenuList);	
				}
				that.getBind_aside();;
			}
		}
	});*/
}
exports.getBind = function(){
	var that = this;
	$(".html").addClass("codeshow");
	$(".html").css({"color":"#f6b344"});
	$(".css").addClass("codehidden");
	$(".js").addClass("codehidden");

	/*$(".showP a").on("click","img",function(){
		var that = $(this);
		that.attr("src","/dynamicLib/images/"+Img_Gif.gif);
	});
*/
	$(".choose").on("click",function(){
		var that = $(this);
		$(".choose").removeClass("choose_after");
		that.addClass("choose_after");
		$(".choose").removeClass("choose_hover");
		that.addClass("choose_hover");
		var name = parseInt(that.attr("class").substring(13,14));
		switch(name){
			case(1):
				$(".html").css({"display":"block","color":"#f6b344"});
				$(".css").css({"display":"none"});
				$(".js").css({"display":"none"});
				break;

			case(2):
				$(".css").css({"display":"block","color":"#f6b344"});
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

	detail_back.on('click',function(){
		index_cover.css({
			//'opacity':'0',
			'-webkit-transform':'translateX(-200%)',
			'-o-transform':'translateX(-200%)',
			'-moz-transform':'translateX(-200%)',
            'transform':'translateX(-200%)'
		});
		$('.tagList').html('');
		$('.idList').html('');
		$(".html").html('');
		$(".css").html('');
		$(".js").html('');
		$(".showP").find("img").attr("src",'');
	});
}//getBind

exports.getBind_aside = function(){
	var that = this;
	$(".choose1").addClass("choose_after");
	$(".Dynamic h2").css({"border-color":"transparent"});
	//$(".one h2").css({"border-color":"#f6b344"});
	$(".Dynamic").eq(0).find("h2").css({"border-color":"#f6b344"});
	$(".Action div").slideUp();
	//$(".header_nav_ul li").eq(0).css('border-color','#f6b344');
	var center = $(".header_nav_ul li").find($('center'));
	center.eq(0).css('border-bottom','3px solid #f39800');

	center.on('click',function(){
		var that = $(this);
		center.css('border-bottom','3px solid transparent');
		that.css('border-bottom','3px solid #f39800');
	});

	$("h2").on("click",function(){
		var that = $(this);
		$(".Dynamic div").slideUp();
		$("h2").css({"border-color":"transparent"});
		that.css({"border-color":"#f39800"});
		that.parent().children().slideDown();	
	});
}//getBind_aside
	return exports;
})