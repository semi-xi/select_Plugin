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