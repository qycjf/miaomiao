<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    name : 'Scroller',
    props : {
        handleToScroll : {
            type : Function,
            default : function(){}
        },
        handleToTouchEnd : {
            type : Function,
            default : function(){}
        }
    },
    mounted(){
        var scroll=new BScroll(this.$refs.wrapper,{
            tap : true,
            probeType : 1
        });
        //把这个对象变成组件的属性，方便下面methods调用
        this.scroll=scroll;
        scroll.on('scroll',(pos)=>{
            this.handleToScroll(pos);
        });
        scroll.on('touchEnd',(pos)=>{
            this.handleToTouchEnd(pos);

        });
    },
    methods : {
        toScrollTop(y){
            this.scroll.scrollTo(0,y);
        }
    }
}
</script>

<style>
    .wrapper{height: 100%;}
</style>
