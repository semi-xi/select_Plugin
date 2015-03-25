(function($){
       window.selectPlugin=function(arg){
           this.config={
               ele:'.J_select',  // select 盒子样式
               showClass:'s-plugin--show', //左边显示值的样式
               iconClass:'s-plugin--icon',  //右边icon的样式
                selctGroupClass:'s-plugin--select',  // 下拉box的样式
               selectedClass:"selected",  //选中的样式
               changeVfn:function(){  //改变值
                   console.log('value is change');
               },
               sameVfn:function(){//改变值 不改变值
                   console.log('value is not change');
               }
           };
           this.config=$.extend(this.config,arg);
           this.ele=$(this.config.ele);
           this.init();
           console.log(this.config);
       };
   selectPlugin.prototype.init=function(){
        this.createEle();
    };
   selectPlugin.prototype.createEle=function(){
       var _self=this;
       var ele=this.ele;
       var default_index=ele.find('select')[0].selectedIndex;
       
       var default_val=ele.find('select').find('option').eq(default_index).html();
       var select_plugin_box=$('<div class="slect-plugin-box" data-state=0><span class="'+this.config.showClass+'">'+default_val+'</span><i class="'+this.config.iconClass+'"></i></div>');
       var select_group=$('<ul class="'+this.config.selctGroupClass+'"></ul>');
       
       //
       ele.find('select').hide();
       //create div ul 
       select_plugin_box.append(select_group);
       ele.append(select_plugin_box);
       
       select_group.hide();
       
       //create li
       ele.find('select').find('option').each(function(index,element){
           var select_valList=$('<li>'+this.innerHTML+'</li>');
           select_group.append(select_valList);
           var _this_option=element;
           select_valList.click(function(){
               $(this).parent().siblings('.'+_self.config.showClass).html(this.innerHTML);
               _self.hide();
               var oldVal=$(_this_option).parent().children().eq($(_this_option).parent()[0].selectedIndex).html();
//               console.log(oldVal);
               _this_option.parentNode.selectedIndex=$(_this_option).index();
               //is change 
               _self.isChange(oldVal,this.innerHTML);
//               console.log($(_this_option).index())
           });
           select_valList.on('mouseenter',function(){
               $(this).addClass(_self.config.selectedClass).siblings().removeClass(_self.config.selectedClass);
           });
       });
       
       //add click event
       _self.clickFn();
   };
    selectPlugin.prototype.clickFn=function(){
        var ele=this.ele;
        var _self=this;
        ele.on('click','.'+this.config.showClass+',.'+this.config.iconClass,function(){
         var  state= $(this).parent().attr('data-state') -  0 ;
            if( state){
                _self.hide();
                $(this).parent().attr('data-state',0);
            } else{
                 _self.show();
                $(this).parent().attr('data-state',1);
            }
            
        });
        $('body').on('click',function(ev){
            var target=$(ev.target);
            if(!target.parents('.slect-plugin-box').length){
                _self.hide();
            }
        });
    };
    selectPlugin.prototype.show=function(){
        var ele=this.ele;
        ele.find('.'+this.config.selctGroupClass).show();
       ele.find('.slect-plugin-box').attr('data-state',1);
     };
    selectPlugin.prototype.hide=function(){
        var ele=this.ele;
        ele.find('.'+this.config.selctGroupClass).hide();
        ele.find('.slect-plugin-box').attr('data-state',0);
    };
    selectPlugin.prototype.isChange=function(oldV,newV){
        var _self=this;
        if(oldV != newV){
            _self.config.changeVfn && _self.config.changeVfn(); 
        } else{
            _self.config.sameVfn && _self.config.sameVfn();
        }
    };
})(jQuery);