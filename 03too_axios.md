## 笔记
1. #### axios安装，引用，与使用
    + `npm install axios --save` 安装
    + 在`main.js`中引入`import axios from 'axios'`
    + 直接使用，两种方式：
      + 第一种：未设置method时默认`get`
        ```
           //不带参数的get
          axios({
            url: 'http://123.207.32.32:8000/home/multidata',
            method: 'get'
          })then(res => {
            console.log(res);
          });

          //带参数的get
          axios({
            url: 'http://123.207.32.32:8000/home/data?type=pop&page=1',
            method: 'get'
          })then(res => {
            console.log(res);
          });
        ```

      + 第二种：不指定方法默认get：`axios(config)`
        ```
          axios.get({
            url: 'http://123.207.32.32:8000/home/data',
            params: {
              type: 'pop',
              page: 1
            }
          }).then(res => {
            console.log(res);
          });
        ``` 

2. #### 使用`axios.all()`实现并发请求,使用`axios.spread()`实现数据展开
   ```
    //并发请求
    axios.all([axios({
      url: url1
    }), axios({
      url: url2,
      params: {
        xxx: yyy,
        xxxx: yyyy
      }
    })]).then(results => {
      console.log(results);
    }); 

    //数据展开
    axios.all([axios({
      url: 'http://123.207.32.32:8000/home/multidata'
    }), axios({
      url: 'http://123.207.32.32:8000/data',
      params: {
        type: 'pop',
        page: 5
      }
    })]).then(axios.spread((res1, res2) => {
      console.log(res1);
      console.log(res2);
    })); 
     ```

3. #### axios 常见配置选项与全局配置
    + 全局配置：在使用前用`axios.default.配置名`指定即可
      ```
        axios.defaults.baseURL = 'http://123.207.32.32:8000';
        axios.defaults.timeout = 5000;
      ``` 
    + 常见配置选项：get与post请求不同的参数传递配置
      ```
        axios.get(url1, { params: {...}} );

        axios.post(
          url2,
          {...}
        )
      ```
4. #### axios 实例与模块封装：上方调用axios类的静态方法相当于用全局的axios和配置进行网络请求，对于需要使用不同配置的模块不方便，此时就应当生成axios的实例
    ```
     const instance1 = axios.create({
       baseUrl:'http://123.207.32.32:8000',
       timeout: 5000
     });

     instance1({
       url: '/home/multidata'
     });

     instance1({
       url: '/home/data',
       params: {
         type: 'pop',
         page: 2
       }
     });
    ```
    + **不要在项目的各处直接引入/使用第三方框架，应该实现集中管理，避免后期维护困难**，因此要进行网络模块的封装：
      1. 新建network目录，将网络模块代码放入其中requeset.js文件
      ```
        import axios from 'axios';
        //每个实例单独导出，不要用default，便于后来访问
        export function request1(...){...}

        //可以通过从外部传入两个回调函数来处理网络请求的数据
        export function request2(config, success, failuer){
          const instance = axios.create({
            baseUrl:'http://123.207.32.32:8000',
            timeout: 5
          });
          instance(config).then(res => {
            success(res);
          }).catch(err => {
            failure(res);
          });
        }
        //也可以通过返回promise实例实现外部处理网络请求数据
        export function request3(config){
          return new Promise((resolve, reject) => {
            const instance = axios.create({
            baseUrl:'http://123.207.32.32:8000',
            timeout: 5
          });
            instance(config).then(res => {
              resolve(res);
            }).catch(err => {
              reject(err);
            });
          });
        }

        //因为axios的后续处理与promise格式/关键字都一样，所以也可以直接返回axios对象，外部调用它的then/catch方法即可
        export function request3(config){
            const instance = axios.create({
            baseUrl:'http://123.207.32.32:8000',
            timeout: 5
          });
            return instance(config)；
        }
      ```
5. #### axios 提供了拦截器，是我们可以在发生网络请求或收到响应后可以做出一些动作
   + 拦截器会在四个不同的时机下被触发：请求之前/失败，响应成功/失败
   + **拦截器的使用场景**：需要修改请求信息（数据检查，添加token...），触发请求动画，请求失败的跳转，响应数据的过滤，响应失败的跳转。只有在通过该接口的数据都需要做固定处理时才用得上拦截器
   + 拦截器应当通过axios实例来调用
   + 拦截器应当将接受到的数据/错误信息进行返回，否则后续instance对象将无数据可用
   ```
      export function request1(config) {
        const instance = axios.create({
            baseUrl:'http://123.207.32.32:8000',
            timeout: 5
          });
        //请求拦截器的使用,请求前回调要求的参数是配置信息
        instance.interceptors.request.use(config => {
          console.log(config);
          return config;
        },err => {
          console.log(err);
          return err;
        });
        //响应拦截器的使用，响应成功回调要求的参数是响应内容
        instance.interceptor.response.use(res => {
          console.log(res);

        //但是返回的时候一般只用data就够了
          return res.data;
        }, err => {
          console.log(err);
          return err;
        });
        return instance(config);
      }
   ```

## 任务
1.  #### 安装配置axios,完成以下操作：
    1. 用get方法，不带参数访问接口，打印数据
    2. 用get方法，通过两种传参形式访问接口，打印数据
    3. 使用all方法，并发请求两个接口的数据，一个不传参数，一个传参数，并打印数据
    4. 在 `3` 的基础上，用spread方法展开数据
    5. 使用全局配置
    6. 生成axios实例，向两个不同的地址请求数据并打印，一个传参数，一个不传参数
2. #### 封装axios模块，完成以下操作：
    1. 使用两种不同方式传递参数，三种不同方式允许外部可变地处理网络请求数据
      + 在promise中 `const res = instance(config)`获得的`res`是一个promise结果对象，可以直接传入resolve/reject作为参数使用，但是这种情况下难以在promise内明确调用resolve还是reject，所以，应当把resolve/reject的调用放到异步操作（instance）中执行
    2. 分别使用请求拦截器和响应拦截器，打印观察不同时机下触发接收到的内容