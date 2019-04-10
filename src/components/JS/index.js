//这个文件作为组件的js集合页
import Vue from 'vue';
import MessageBox from './MessageBox';

export var messageBox = (function(){
    var defaults = {//默认值
        
        title : '',
        content : '',
        cancel : '',
        ok : '',
        handleCancel : null,
        handleOk : null
    };
    var MyComponent = Vue.extend(MessageBox);
    return function(opts){//配置参数
        for(var attr in opts){
            defaults[attr] = opts[attr];
        }
       
        var vm = new MyComponent({
            el : document.createElement('div'),
            data : {
                title : defaults.title,
                content : defaults.content,
                cancel : defaults.cancel,
                ok : defaults.ok
            },
            methods : {
                    handleCancel(){
                        // call可以改变this执行的同时调用该方法
                        defaults.handleCancel&&defaults.handleCancel.call(this);
                        //点击之后删除弹窗
                        document.body.removeChild( vm.$el );
                    },
                    handleOk(){
                        defaults.handleOk&&defaults.handleOk.call(this);
                        document.body.removeChild( vm.$el );
                    }
            }
        });
        document.body.appendChild( vm.$el );
    };
})();