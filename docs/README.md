# nest学习记录
## nest cli
创建项目 
```
nest new myapp
```
创建各种文件
```
nest g co cat
```

| name          | alias       | description                                  |
| ----          | ----        | ----                                         |
| application   | application | Generate a new application workspace         |
| class         | cl          | Generate a new class                         |
| configuration | config      | Generate a CLI configuration file            |
| controller    | co          | Generate a controller declaration            |
| decorator     | d           | Generate a custom decorator                  |
| filter        | f           | Generate a filter declaration                |
| gateway       | ga          | Generate a gateway declaration               |
| guard         | gu          | Generate a guard declaration                 |
| interceptor   | in          | Generate an interceptor declaration          |
| interface     | interface   | Generate an interface                        |
| middleware    | mi          | Generate a middleware declaration            |
| module        | mo          | Generate a module declaration                |
| pipe          | pi          | Generate a pipe declaration                  |
| provider      | pr          | Generate a provider declaration              |
| resolver      | r           | Generate a GraphQL resolver declaration      |
| service       | s           | Generate a service declaration               |
| library       | lib         | Generate a new library within a monorepo     |
| sub-app       | app         | Generate a new application within a monorepo |
| resource      | res         | Generate a new CRUD resource                 |

## 获取请求参数
在 Nestjs 中获取 Get 传值或者 Post 提交的数据的话我们可以使用 Nestjs 中的装饰器来获取。     
Nestjs 也提供了其他 HTTP 请求方法的装饰器 @Put() 、@Delete()、@Patch()、
@Options()、 @Head()和 @All()
| | |
| ----|----|
| @Request() | req |   
| @Response()|  res   |   
| @Next() | next |      
| @Session() | req.session |    
| @Param(key?: string) | req.params / req.params[key]  |  
| @Body(key?: string) | req.body / req.body[key]      | 
| @Query(key?: string) | req.query / req.query[key]   |   
| @Headers(name?: string) | req.headers / req.headers[name]     | 
### get请求
@Query() query 接受?后面的参数   
url路径上的参数使用 @Param('参数名')，其他请求也一样
```
# localhost:3000/user/find/111/23

@Get('find/:id/:name')
findId(@Param() param) {
    return {
        param,
    };
}
// {
//     "param": {
//         "id": "111",
//         "name": "23"
//     }
// }
```
### post请求
- application/json 使用@Body  通常使用的post 发送json数据
- x-www-form-urlencoded 使用@Body 一般表单上传
- form-data file 上传文件使用
    ```
    @Post('add')
    @UseInterceptors(FileInterceptor('file'))
    add(@UploadedFile() file, @Body() body) {
        return {
            httpType: 'Post FormDat',
            body,
            file,
        };
    }
    ```
## mongodb
数据库部署在阿里云上
账号密码登录
```
mongo --port 27017 -u "mongo" -p "123456" --authenticationDatabase "admin"

```
use admin
db.createUser({
user: 'zhang001', pwd: 'zhang123456', roles: [{ role: 'root', db: 'admin' }]
})
