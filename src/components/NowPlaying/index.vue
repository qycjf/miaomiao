<template>
    <div class="movie_body" ref="movie_body">
        <Loading v-if="isLoading" />
        <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
            <ul>
                <!-- <li>
                    <div class="pic_show"><img src="/images/bjs.jpg"></div>
                    <div class="info_list">
                        <h2>无名之辈</h2>
                        <p>观众评 <span class="grade">9.2</span></p>
                        <p>主演: 陈建斌,任素汐,潘斌龙</p>
                        <p>今天55家影院放映607场</p>
                    </div>
                    <div class="btn_mall">
                            购票
                    </div>
                </li>  -->
                <li class="pullDown">{{pullDownMsg}}</li>
                <li v-for="item in movieList" :key="item.id">
                    <div class="pic_show" @tap="handleToDetail"><img :src="item.img | setWH('128.180')"></div>
                    <div class="info_list">
                        <h2>{{item.nm}}</h2><img v-if="item.version" src="@/assets/maxs.png" >
                        <p>观众评 <span class="grade">{{item.sc}}</span></p>
                        <p>主演: {{item.star}}</p>
                        <p>{{item.showInfo}}</p>
                    </div>
                    <div class="btn_mall">
                            购票
                    </div>
                </li> 
            </ul>
        </Scroller>
    </div>
</template>

<script>

import BScroll from 'better-scroll';
import { setTimeout } from 'timers';

export default {
    name : 'NowPlaying',
    data() {
        return {
            movieList : [],
            pullDownMsg : '',
            isLoading : true,
            prevCityId : -1
        };
            
        
    },
    // activated是组件切换回来的时候会重新执行这个钩子函数
    activated(){
        var cityId=this.$store.state.city.id;
        //判断，如果是切换了城市，就重新渲染数据，如果只是组件跳转没有切换城市就不需要重新请求数据
        if(this.prevCityId === cityId){
            return;
        }
        this.isLoading=true;
        this.axios.get('/api/movieOnInfoList?cityId='+cityId).then((res)=>{
            // console.log(res);
            var msg = res.data.msg;
            if(msg === 'ok'){
                this.movieList = res.data.data.movieList;
                this.isLoading=false;
                //第一次请求回来就记录下id
                this.prevCityId=cityId;
                //等数据渲染完毕后，通过new来渲染better-scroll的类
                // $nextTick方法是vue提供的,等数据渲染完毕后在执行回调函数
               /* this.$nextTick(()=>{
                    // console.log('heihei');
                    var scroll=new BScroll(this.$refs.movie_body,{
                        tap : true,
                        //设置函数截流
                        probeType : 1
                    });
                    //实现下拉效果
                    scroll.on('scroll',(pos)=>{
                        if(pos.y>30){
                            this.pullDownMsg='正在更新中';
                        }
                    });
                    scroll.on('touchEnd',(pos)=>{
                        if(pos.y>30){
                            //重新渲染数据
                            this.axios.get('/api/movieOnInfoList?cityId=10').then((res)=>{
                                var msg = res.data.msg;
                                if(msg === 'ok'){
                                    this.pullDownMsg='更新成功';
                                    setTimeout(()=>{
                                        this.movieList = res.data.data.movieList;
                                        this.pullDownMsg='';
                                    });
                                }
                            });
                        }
                    });



                });*/
            }
        });
    },
    methods : {
        handleToDetail(){
            console.log('123');
        },
        handleToScroll(pos){
            if(pos.y>30){
                            this.pullDownMsg='正在更新中';
            }
        },
        handleToTouchEnd(pos){
            if(pos.y>30){
                this.axios.get('/api/movieOnInfoList?cityId=10').then((res)=>{
                    var msg = res.data.msg;
                    if(msg === 'ok'){
                        this.pullDownMsg='更新成功';
                        etTimeout(()=>{
                        this.movieList = res.data.data.movieList;
                        this.pullDownMsg='';
                                });
                            }
                });
            }
        }
    }
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.movie_body .pullDown{ margin:0; padding:0; border:none;}
</style>

