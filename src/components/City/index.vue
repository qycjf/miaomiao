<template>
    <div class="city_body">
        <!-- <div class="city_list">
            <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li>上海</li>
                </ul>
            </div>
            <div class="city_sort">
                <div>
                    <h2>A</h2>
                    <ul>
                        <li>阿拉善盟</li>
                        <li>鞍山</li>
                        <li>安庆</li>
                        <li>安阳</li>
                    </ul>
                </div>	
            </div>
        </div>
        <div class="city_index">
            <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
            </ul>
        </div> -->
        <div class="city_list">
            <Loading v-if="isLoading" />
            <Scroller v-else ref="city_List">
                <div>
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix">
                            <li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm , item.id)">{{item.nm}}</li>
                        </ul>
                    </div>
                    <div class="city_sort" ref="city_sort">
                        <div v-for="item in cityList" :key="item.index">
                            <h2>{{item.index}}</h2>
                            <ul>
                                <li v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.nm , itemList.id)">{{itemList.nm}}</li>
                            </ul>
                        </div>	
                    </div>
                </div>
            </Scroller>
        </div>
        <div class="city_index">
            <ul  class="testul">
                <!-- <li @touchstart="handleToClick(index)">{{item.index}}</li> -->
                <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToClick(index)" class="testli">{{item.index}}</li>
                
            </ul>
        </div>
        
    </div>
</template>

<script>
export default {
    name : 'City',
    data : () =>{
        return {
            cityList: [],
            hotList: [],
            isLoading : true
        }
    },
    mounted(){
        // vue-resource不再维护，这里用的是axios,Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
        //因为已经安装了axios,所以可以用它提供的方法发送请求。
        var cityList = window.localStorage.getItem('cityList');
        var hotList = window.localStorage.getItem('hotList');
        if(cityList&&hotList){
            //如果本地存储有，就直接拿数据
            this.cityList = JSON.parse(cityList);
            this.hotList = JSON.parse(hotList);
            this.isLoading=false;
        }else{
            //没有就去请求数据
            this.axios.get('/api/cityList').then((res)=>{
                // console.log(res);
                var msg = res.data.msg;
                if(msg === 'ok'){
                    //获取数据并进行自定义设置
                    this.isLoading=false;
                    var cities = res.data.data.cities;
                    // 获取到数据并映射给组件
                    var {cityList,hotList}=this.formatCityList(cities);
                    this.cityList=cityList;
                    this.hotList=hotList;
                    // console.log(cityList);
                    // 第一次加载完后可以本地存储起来
                    window.localStorage.setItem('cityList',JSON.stringify(cityList));
                    window.localStorage.setItem('hotList',JSON.stringify(hotList));
                
                }
            });
        }

        
    },
    methods : {
        formatCityList(cities){
            //分为热门城市和城市列表
            var cityList = [];
            var hotList = [];
            // 思路：遍历数据，首字母作为索引，如果索引为新，则创建一个新的索引跟新的list数组，
            //这两个是一个整体的对象，如果遍历到的数据的首字母index是已存在的，就把它加到对应已存在
            //的index对应的list数组中
            //[ { index : 'A' , list : [{ nm : '阿城' , id : 123 },{ nm:'广州', id: 666}] } ]

            // 获取热门城市列表
            for(var i =0; i< cities.length; i++){
                if(cities[i].isHot === 1){
                    hotList.push(cities[i]);
                }
            }

            for(var i=0;i<cities.length;i++){
                var firstLetter=cities[i].py.substring(0,1).toUpperCase();
                //先判断索引是否是新的
                if(toCom(firstLetter)){
                    //新的，添加到index
                    cityList.push({ index : firstLetter, list : [{nm : cities[i].nm, id : cities[i].id}] });
                }else{
                    //旧的，加入到已存在的index的list中
                    for(var j=0;j<cityList.length;j++){
                        if(cityList[j].index === firstLetter){
                            cityList[j].list.push({ nm : cities[i].nm, id: cities[i].id});
                        }
                    }
                }


            }
            // 排序index
            cityList.sort((n1,n2) => {
                if(n1.index>n2.index){
                    return 1;
                }else if(n1.index<n2.index){
                    return -1;
                }else{
                    return 0;
                }
            });
            //判断index是否为新的函数
            function toCom(firstLetter){
                for(var i=0;i<cityList.length;i++){
                    if(cityList[i].index === firstLetter){
                        return false;
                    }
                }
                return true;
            }



            // console.log(cityList);
            // console.log(hotList);
            return {
                cityList,
                hotList
            };

        },
        handleToClick(index){
            //touchstart事件好像不能生效
            // console.log(index);
            var h2=this.$refs.city_sort.getElementsByTagName('h2');
            //this.$refs.city_sort.parentNode.scrollTop=h2[index].offsetTop;
            // 使用了Scroller组件之后，这篇区域被Scroller接管，需要用它提供的方法,scrollTo方法可以跳到指定的位置
            //使用方式：先拿到这个组件对象，再调用方法
            this.$refs.city_list.toScrollTop(-h2[index].offsetTop);
        },
        // 注册了tap事件，点击的时候修改状态存储的内容
        handleToCity(nm,id){
            this.$store.commit('city/CITY_INFO',{nm , id});
            //记录下当前的城市进本地存储
            window.localStorage.setItem('nowNm',nm);
            window.localStorage.setItem('nowId',id);
            //利用编程式路由的push方法跳转到正在热映组件
            this.$router.push('/movie/nowPlaying');
        }
        
    }   
}
</script>
// 下面第一行的样式position那里不知道为什么会导致元素不能显示出来
</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; /*position: absolute; */top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>
