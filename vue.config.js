module.exports = {
    devServer : {
        proxy : {
            // 配置这个设置时候默认都是请求做这个地址作为接口
            '/api' : {
                target : 'http://39.97.33.178',
                changeOrigin : true
            }
        }
    }
}