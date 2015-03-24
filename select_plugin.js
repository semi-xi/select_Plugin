(function($){
       window.selectPlugin=function(arg){
           this.config={
               ele:'.J_select',
               showClass:'s-plugin--show',
               iconClass:'s-plugin--icon',
                listClass:'s-plugin--select',
               selectedClass:"selected"
           };
           this.config=$.extend(this.config,arg);
           console.log(this.config);
       };
   selectPlugin.prototype.init=function(){
        
    }
   selectPlugin.prototype.createEle=function(){
       var ele=$(this.config.ele)
       var .
   }
})(jQuery);