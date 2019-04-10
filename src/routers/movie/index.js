export default {
    path: '/movie',
    component: () => import('@/views/Movie'),
    children : [
        {
            path : 'city',
            component : () => import('@/components/City')
        },
        {
            path : 'nowPlaying',
            component : () => import('@/components/NowPlaying')
        },
        {
            path : 'comingSoon',
            component : () => import('@/components/ComingSoon')
        },
        {
            path : 'search',
            component : () => import('@/components/Search')
        },
        {
            // 这里是动态路由,movieId是传过来的
            path : 'detail/1/:movieId',
            components : {
                //想要另一个路由也显示，可以让default指向它
                default : ()=> import('@/components/NowPlaying') ,
                detail : ()=> import('@/views/Movie/detail')
            },
            // 如果只有一个路由显示区域可以直接写props:true就可以实现路由传参
            //因为在这里有多个显示区域，所以要对应
            props : {
                detail : true
            }
        },
        // 这里可以采取多配置一个，来让正在热映跟即将上映在切换都详情页时都能显示
        {
            path : 'detail/2/:movieId',
            components : {
                default : ()=> import('@/components/ComingSoon') ,
                detail : ()=> import('@/views/Movie/detail')
            },
            props : {
                detail : true
            }
        },
        {
            path : '/movie',
            redirect : '/movie/nowPlaying'
        }
    ]
}