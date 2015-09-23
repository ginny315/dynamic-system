define(['FFF','zepto','box'], function(FFF,$,Box) {
            var F = FFF.FFF,
            Box = Box.Box;
            
            function LittleBox() {
                Box.apply(this, arguments);
            }

            LittleBox.ATTRS = {
                boundingBox:{
                value:$('<div class="wrap"></div>'),
                },
                /*0represent'#293047',1represent'yellow',2represent'red'*/
                color:{
                    value:0,
                    changeFn:function(obj){
                        var that = this;
                        var MyBox = that.getBoundingBox();
                        if(obj.value == 1){
                            MyBox.find('.box').css({
                                    'background':'yellow'
                            });
                        }else if(obj.value == 2){
                            MyBox.find('.box').css({
                                    'background':'red'
                            });
                        }
                    }
                },
                /*0represent'-',1represent'√'*/
                selected:{
                    value:0,
                    changeFn:function(obj){//通过点击后属性的改变而改变                
                        var that = this;
                        var MyBox = that.getBoundingBox();
                        obj.value == 0?MyBox.find('.box').html('-'):MyBox.find('.box').html('√');
                    }
                },

                currentIndex:{
                    value:0,
                    changeFn:function(){
                    }
                },

                die:{
                    value:0,
                }
            }

            F.extend(LittleBox, Box,{
                //初始化
                initialize:function(){
                },
                //渲染
                renderUI:function(){
                    var that = this;
                    var MyBox = that.getBoundingBox();                    
                    
                    MyBox.html('<div class="box"></div>'+
                    '<div class="close">X</div>'+
                    '<div class="chooseyellow">yellow</div>'+
                    '<div class="choosered">red</div>');
                     MyBox.find('.box').html('-');                   
                },//renderUI
                    
                    //绑定事件
                    bindUI:function(){
                        var that = this;
                        var MyBox = that.getBoundingBox();
                        //var MyBoxCount = that.getBoxCount();
                        /*MyBox.find('.box').on('mouseover',function(){
                            MyBox.find('.close').css({
                                'opacity':'1'
                            });
                        });*/

                        MyBox.find('.box').on('click', function(obj) {
                            that.getSelected() == 0?that.setSelected(1):that.setSelected(0);
                        });

                        MyBox.find('.choosered').on('click',function(obj){
                            if(that.getColor() != 2){
                                that.setColor(2);
                            };
                        })

                        MyBox.find('.chooseyellow').on('click',function(obj){
                            if(that.getColor() != 1){
                                that.setColor(1);
                            };
                        }) 

                        MyBox.find('.close').on('click',function(){
                            //console.log(MyBox.index());
                            $('.sum').trigger('minusself',{
                                target:'MyBox.index()',//传递目前所在的索引
                            });
                            that.setCurrentIndex(MyBox.index());
                            that.setDie(4);
                            MyBox.remove();
                            F.trigger('changeIndex',{'t':1});                            
                        })                       
                    },
                    destructor:function(){ 
                    }
                });

            return {
                LittleBox: LittleBox
            };
        });