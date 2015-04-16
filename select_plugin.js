(function ($) {
    window.selectPlugin = function (arg) {
        this.ops = {
            ele: '.J_select', // select 盒子样式
            type:'select',
            showClass: 's-plugin--show', //左边显示值的样式
            iconClass: 's-plugin--icon', //右边icon的样式
            selectGroupClass: 's-plugin--select', // 下拉box的样式
            selectedClass: "selected", //选中的样式
            changeVfn: function () { //改变值
                console.log('value is change');
            },
            sameVfn: function () { //改变值 不改变值
                console.log('value is not change');
            }
        };
        this.ops = $.extend(this.ops, arg);
        this.ele = $(this.ops.ele);
        this.init();
    };
    selectPlugin.prototype.init = function () {
        this.createEle();
    };
    selectPlugin.prototype.createEle = function () {
        var _self = this;
        var ele = this.ele;
        if(this.ops.type){
            switch(this.ops.type){
                case 'select':     _self.createSelect();break;
                    case 'radop' :  _self.createRadio();break;
                    case 'checkbox': _self.createCheckbox;break;
                    default: console.log('这是一个错误的type');
            }
        } else{
            console.log('无类型')
            return ;
        }
    };
    selectPlugin.prototype.createSelect=function(){
         var _self = this;
        var ele = this.ele;
        ele.each(function (index, attr) {
            var parentIndex=index;
            var default_index = $(attr).find('select')[0].selectedIndex;

            if($(attr).attr('data-defaultV')){
                var default_val=$(attr).attr('data-defaultV')
            } else{
                var default_val = $(attr).find('select').find('option').eq(default_index).html();
            }

            var select_plugin_box = $('<div class="select-plugin-box" data-state=0><span class="' + _self.ops.showClass + '">' + default_val + '</span><i class="' + _self.ops.iconClass + '"></i></div>');
            var select_group = $('<ul class="' + _self.ops.selectGroupClass + '"></ul>');

            select_plugin_box.append(select_group);
            $(attr).append(select_plugin_box);

            select_group.hide();
            //create li
             $(attr).find('select').hide().find('option').each(function (index, element) {
                var select_valList = $('<li>' + this.innerHTML + '</li>');
                select_group.append(select_valList);
                var _this_option = element;
                select_valList.click(function () {
                    $(this).parent().siblings('.' + _self.ops.showClass).html(this.innerHTML);
                    _self.hide(parentIndex);
                    var oldVal = $(_this_option).parent().children().eq($(_this_option).parent()[0].selectedIndex).html();
                    //               console.log(oldVal);
                    _this_option.parentNode.selectedIndex = $(_this_option).index();
                    //is change
                    _self.isChange(oldVal, this.innerHTML);
                    //               console.log($(_this_option).index())
                });
                select_valList.on('mouseenter', function () {
                    $(this).addClass(_self.ops.selectedClass).siblings().removeClass(_self.ops.selectedClass);
                });
            });
        })
        _self.clickFn();
    }
    selectPlugin.prototype.createRadio=function(){
        
    }
    selectPlugin.prototype.createCheckbox=function(){
        
    }
    selectPlugin.prototype.clickFn = function () {
        var ele = this.ele;
        var _self = this;
        ele.each(function (index, attr) {
            $(attr).on('click', '.' + _self.ops.showClass + ',.' + _self.ops.iconClass, function () {
                var state = $(this).parent().attr('data-state') - 0;
                if (state) {
                    _self.hide(index);
                    $(this).parent().attr('data-state', 0);
                } else {
                    _self.show(index);
                    $(this).parent().attr('data-state', 1);
                }

            });
        })

        $('body').on('click', function (ev) {
            var target = $(ev.target);
            if (!target.parents('.select-plugin-box').length) {
//                _self.hide();
                ele.find('.' + _self.ops.selectGroupClass).hide();
                ele.find('.select-plugin-box').attr('data-state', 0).css('zIndex',1);
            }
        });
    };
    selectPlugin.prototype.show = function (index) {
        var ele = this.ele;
        ele.find('.' + this.ops.selectGroupClass).hide().eq(index).show();
        ele.find('.select-plugin-box').attr('data-state', 0).css('zIndex',1).eq(index).attr('data-state', 1).css('zIndex',999);
    };
    selectPlugin.prototype.hide = function (index) {
        var ele = this.ele;
        ele.find('.' + this.ops.selectGroupClass).eq(index).hide();
        ele.find('.select-plugin-box').eq(index).attr('data-state', 0).css('zIndex',1);
    };
    selectPlugin.prototype.isChange = function (oldV, newV) {
        var _self = this;
        if (oldV != newV) {
            _self.ops.changeVfn && _self.ops.changeVfn();
        } else {
            _self.ops.sameVfn && _self.ops.sameVfn();
        }
    };
})(jQuery);