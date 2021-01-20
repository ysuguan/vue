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
        axios.default.baseURL = 'http://123.207.32.32:8000/data?type=pop&page=1';
        axios.default.timeout = 5000;
      ``` 
    + 常见配置选项：get与post请求不同的参数传递配置
      ```
        axios.get({
          url: url1,
          params: {...}
        });

        axios.post({
          url: url2,
          data: {...}
        })
      ```
4. axios 实例与模块封装：上方调用axios类的静态方法相当于用全局的axios和配置进行网络请求，对于需要使用不同配置的模块不方便，此时就应当生成axios的实例
     ```
      const instance1 = axios.create({
        baseUrl:'http://123.207.32.32:8000',
        timeout: 5
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

## 任务
1.  #### 安装配置axios,完成以下操作：
    1. 用get方法，不带参数访问接口，打印数据
    2. 用get方法，通过两种传参形式访问接口，打印数据
    3. 使用all方法，并发请求两个接口的数据，一个不传参数，一个传参数，并打印数据
    4. 在 `3` 的基础上，用spread方法展开数据
    5. 使用全局配置
    6. 生成axios实例，向两个不同的地址请求数据并打印，一个传参数，一个不传参数