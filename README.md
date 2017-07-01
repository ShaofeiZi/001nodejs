# Node.js原生开发入门完全教程

## 一、关于 
本篇文章致力于教会你如何用Node.js来开发应用，过程中会传授你所有所需的“高级”JavaScript知识。Node入门看这篇文章就够了。

## 二、代码状态

所有代码为春哥亲测，全部正确通过。

## 三、阅读文章的对象

1.有编程基础
2.想转向Node.js后端的技术爱好者
3.Node.js新手

## 四、进入正题

### 1.环境安装

请直接移步[Node.js官网](https://nodejs.org/en/),如下图所示，直接点击最新版下载并进行安装。
![](http://osazvg3ch.bkt.clouddn.com/nodejs.png)

Node.js安装完毕后，打开终端，在终端分别输入如下命令，检测是否安装成功。

```js
Last login: Tue Jun 27 09:19:38 on console
liyuechun:~ yuechunli$ node -v
v8.1.3
liyuechun:~ yuechunli$ npm -v
5.0.3
liyuechun:~ yuechunli$ 
```

如果能够正确显示node和npm的版本，说明Node.js安装成功。

### 2."Hello World"

- 第一种输出方式

好了，“废话”不多说了，马上开始我们第一个Node.js应用：“Hello World”。

```js
liyuechun:~ yuechunli$ node
> console.log("Hello World!");
Hello World!
undefined
> console.log("从零到壹全栈部落!");
从零到壹全栈部落!
undefined
> process.exit()
liyuechun:~ yuechunli$ 
```

在终端里面直接输入命令`node`，接下来输入一句`console.log("Hello World!");` ，回车，即可输出`Hello World`。

简单解释一下为什么每一次打印后面都出现了一个`undefined`,原因是因为你输入js代码并按下回车后，node会输出执行完该代码后的返回值，如果没有返回值，就会显示undefined，这个跟Chrome的调试工具相似。

如上代码所示，当输入`process.exit()`并回车时，即可退出`node模式`。

- 第二种输出方式

```js
Last login: Thu Jun 29 18:17:27 on ttys000
liyuechun:~ yuechunli$ ls
Applications		Downloads		Pictures
Creative Cloud Files	Library			Public
Desktop			Movies
Documents		Music
liyuechun:~ yuechunli$ cd Desktop/
liyuechun:Desktop yuechunli$ mkdir nodejs入门
liyuechun:Desktop yuechunli$ pwd
/Users/liyuechun/Desktop
liyuechun:Desktop yuechunli$ cd nodejs入门/
liyuechun:nodejs入门 yuechunli$ pwd
/Users/liyuechun/Desktop/nodejs入门
liyuechun:nodejs入门 yuechunli$ vi helloworld.js
liyuechun:nodejs入门 yuechunli$ cat helloworld.js 
console.log("Hello World!");
liyuechun:nodejs入门 yuechunli$ node helloworld.js 
Hello World!
liyuechun:nodejs入门 yuechunli$ 
```

**命令解释：**
**ls**：查看当前路径下面的文件和文件夹。
**pwd**：查看当前所在路径。
**cd Desktop**：切换到桌面。
**mkdir nodejs入门**：在当前路径下面创建`nodejs入门`文件夹。
**cd nodejs入门**：进入`nodejs入门`文件夹。
**vi helloworld.js**：创建一个`helloworld.js`文件，并在文件里面输入`console.log("Hello World!")`,保存并退出。
**cat helloworld.js**：查看`helloworld.js`文件内容。
**node helloworld.js**：在当前路径下面执行`helloworld.js`文件。

PS：如果对命令行不熟悉的童鞋，可以用其他编辑器创建一个`helloworld.js`文件，在里面输入`console.log("Hello World！")`，将文件保存到桌面，然后打开终端，直接将`helloworld.js`文件拖拽到终端，直接在终端中执行`node helloworld.js`即可在终端输出`Hello World!`。

好吧，我承认这个应用是有点无趣，那么下面我们就来点“干货”。

下面我们将通过[VSCode](https://code.visualstudio.com/)来进行Node.js的编码。

## 五、一个完整的基于Node.js的web应用

### 1.用例

我们来把目标设定得简单点，不过也要够实际才行：

- 用户可以通过浏览器使用我们的应用。
- 当用户请求http://domain/start时，可以看到一个欢迎页面，页面上有一个文件上传的表单。
- 用户可以选择一个图片并提交表单，随后文件将被上传到http://domain/upload，该页面完成上传后会把图片显示在页面上。

差不多了，你现在也可以去Google一下，找点东西乱搞一下来完成功能。但是我们现在先不做这个。

更进一步地说，在完成这一目标的过程中，我们不仅仅需要基础的代码而不管代码是否优雅。我们还要对此进行抽象，来寻找一种适合构建更为复杂的Node.js应用的方式。

### 2.应用不同模块分析

我们来分解一下这个应用，为了实现上文的用例，我们需要实现哪些部分呢？

- 我们需要提供Web页面，因此需要一个HTTP服务器
- 对于不同的请求，根据请求的URL，我们的服务器需要给予不同的响应，因此我们需要一个路由，用于把请求对应到请求处理程序（request handler）
- 当请求被服务器接收并通过路由传递之后，需要可以对其进行处理，因此我们需要最终的请求处理程序
- 路由还应该能处理POST数据，并且把数据封装成更友好的格式传递给请求处理入程序，因此需要请求数据处理功能
- 我们不仅仅要处理URL对应的请求，还要把内容显示出来，这意味着我们需要一些视图逻辑供请求处理程序使用，以便将内容发送给用户的浏览器
- 最后，用户需要上传图片，所以我们需要上传处理功能来处理这方面的细节

现在我们就来开始实现之路，先从第一个部分--HTTP服务器着手。


## 六、构建应用的模块

### 1.一个基础的HTTP服务器

用VSCode创建一个`server.js`的文件，将文件保存到桌面的`nodejs入门`文件夹里面。

在`server.js`文件里面写入以下内容：

```js
let http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);
```

上面的代码就是一个完整的Node.js服务器，如下图所示，点击VSCode左下脚按钮，打开VSCode终端，在终端中输入`node server.js`来进行验证。

![](http://osazvg3ch.bkt.clouddn.com/vscode%E6%93%8D%E4%BD%9C%E6%95%88%E6%9E%9C%E5%9B%BE.png)

![](http://osazvg3ch.bkt.clouddn.com/yunxingxiaoguotu.png)

 如上图所示，一个基础的HTTP服务器搞定。
 
### 2.HTTP服务器原理解析

上面的案例中，第一行请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。 

接下来我们调用http模块提供的函数： createServer 。这个函数会返回一个对象，这个对象有一个叫做 listen 的方法，这个方法有一个数值参数，指定这个HTTP服务器监听的端口号。

咱们暂时先不管 http.createServer 的括号里的那个函数定义。

我们本来可以用这样的代码来启动服务器并侦听8888端口：

```js
var http = require("http");

var server = http.createServer();
server.listen(8888);
```

这段代码只会启动一个侦听8888端口的服务器，它不做任何别的事情，甚至连请求都不会应答。

### 3.进行函数传递

举例来说，你可以这样做：

```js
Last login: Thu Jun 29 20:03:25 on ttys001
liyuechun:~ yuechunli$ node
> function say(word) {
...   console.log(word);
... }
undefined
> 
> function execute(someFunction, value) {
...   someFunction(value);
... }
undefined
> 
> execute(say, "Hello");
Hello
undefined
> 
```

请仔细阅读这段代码！在这里，我们把 say 函数作为execute函数的第一个变量进行了传递。这里传递的不是 say 的返回值，而是 say 本身！

这样一来， say 就变成了execute 中的本地变量 someFunction ，execute可以通过调用 someFunction() （带括号的形式）来使用 say 函数。

当然，因为 say 有一个变量， execute 在调用 someFunction 时可以传递这样一个变量。

我们可以，就像刚才那样，用它的名字把一个函数作为变量传递。但是我们不一定要绕这个“先定义，再传递”的圈子，我们可以直接在另一个函数的括号中定义和传递这个函数：

```js
Last login: Thu Jun 29 20:04:35 on ttys001
liyuechun:~ yuechunli$ node
> function execute(someFunction, value) {
...   someFunction(value);
... }
undefined
> 
> execute(function(word){ console.log(word) }, "Hello");
Hello
undefined
> 
```

我们在 execute 接受第一个参数的地方直接定义了我们准备传递给 execute 的函数。

用这种方式，我们甚至不用给这个函数起名字，这也是为什么它被叫做 匿名函数 。

这是我们和我所认为的“进阶”JavaScript的第一次亲密接触，不过我们还是得循序渐进。现在，我们先接受这一点：在JavaScript中，一个函数可以作为另一个函数接收一个参数。我们可以先定义一个函数，然后传递，也可以在传递参数的地方直接定义函数。


### 4.函数传递是如何让HTTP服务器工作的

带着这些知识，我们再来看看我们简约而不简单的HTTP服务器：

```js
var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);

console.log("请在浏览器中打开 http://127.0.0.1:8888...");
```

现在它看上去应该清晰了很多：我们向 createServer 函数传递了一个匿名函数。

用这样的代码也可以达到同样的目的：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
let http = require("http");

//箭头函数
let onRequest = (request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}
//把函数当作参数传递
http.createServer(onRequest).listen(8888);

console.log("请在浏览器中打开 http://127.0.0.1:8888...");
```

也许现在我们该问这个问题了：我们为什么要用这种方式呢？

### 5.基于事件驱动的回调

事件驱动是Node.js原生的工作方式，这也是它为什么这么快的原因。

当我们使用`http.createServer`方法的时候，我们当然不只是想要一个侦听某个端口的服务器，我们还想要它在服务器收到一个HTTP请求的时候做点什么。

我们创建了服务器，并且向创建它的方法传递了一个函数。无论何时我们的服务器收到一个请求，这个函数就会被调用。

这个就是传说中的回调 。我们给某个方法传递了一个函数，这个方法在有相应事件发生时调用这个函数来进行回调 。

我们试试下面的代码：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
let http = require("http");

//箭头函数
let onRequest = (request, response) => {
    console.log("Request received.");
    response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
    response.write("添加小精灵微信(ershiyidianjian),加入全栈部落");
    response.end();
}
//把函数当作参数传递
http.createServer(onRequest).listen(8888);

console.log("Server has started.");
console.log("请在浏览器中打开 http://127.0.0.1:8888...");
```

![](http://osazvg3ch.bkt.clouddn.com/0001.png)

在上图中，当我们执行`node server.js`命令时，Server has started.正常往下执行。

我们看看当我们在浏览器里面打开`http://127.0.0.1:8888`时会发生什么。

![](http://osazvg3ch.bkt.clouddn.com/0002.png)
![](http://osazvg3ch.bkt.clouddn.com/0003.png)

大家会发现在浏览器中打开`http://127.0.0.1:8888`时，在终端会输出`Request received.`,浏览器会输出`添加小精灵微信(ershiyidianjian),加入全栈部落`这一句话。

请注意，当我们在服务器访问网页时，我们的服务器可能会输出两次“Request received.”。那是因为大部分浏览器都会在你访问 http://localhost:8888/ 时尝试读取 http://localhost:8888/favicon.ico )

![](http://osazvg3ch.bkt.clouddn.com/0004.png)

### 6.服务器是如何处理请求的

好的，接下来我们简单分析一下我们服务器代码中剩下的部分，也就是我们的回调函数`onRequest()`的主体部分。

当回调启动，我们的`onRequest()`函数被触发的时候，有两个参数被传入：`request` 和`response` 。

它们是对象，你可以使用它们的方法来处理HTTP请求的细节，并且响应请求（比如向发出请求的浏览器发回一些东西）。

所以我们的代码就是：当收到请求时，使用`response.writeHead()`函数发送一个HTTP状态200和HTTP头的内容类型（content-type），使用`response.write()`函数在HTTP相应主体中发送文本`添加小精灵微信(ershiyidianjian),加入全栈部落`。

最后，我们调用 `response.end()` 完成响应。

目前来说，我们对请求的细节并不在意，所以我们没有使用 `request` 对象。

### 7.服务端模块化

- 何为`模块`？

```js
let http = require("http");
...
http.createServer(...);
```

在上面的代码中，Node.js中自带了一个叫做“http”的模块，我们在我们的代码中请求它并把返回值赋给一个本地变量。

这把我们的本地变量变成了一个拥有所有 http 模块所提供的公共方法的对象。

给这种本地变量起一个和模块名称一样的名字是一种惯例，但是你也可以按照自己的喜好来：

```js
var foo = require("http");
...
foo.createServer(...);
```

- 如何自定义模块

**将`server.js`文件的内容改成下面的内容。**

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
let http = require("http");

//用一个函数将之前的内容包裹起来
let start = () => {
        //箭头函数
    let onRequest = (request, response) => {
        console.log("Request received.");
        response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
        response.write("添加小精灵微信(ershiyidianjian),加入全栈部落");
        response.end();
    }
    //把函数当作参数传递
    http.createServer(onRequest).listen(8888);

    console.log("Server has started.");
    console.log("请在浏览器中打开 http://127.0.0.1:8888...");
}

//导出`server`对象，对象中包含一个start函数
//对象格式为
/**
 * {
 *    start
 * }
 */

//这个对象导入到其他文件中即可使用，可以用任意的名字来接收这个对象

exports.start = start;
```

**在`server.js`当前的文件路径下新建一个`index.js`文件。内容如下：**

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//从`server`模块中导入server对象

let server = require('./server');

//启动服务器
server.start();
```

**如下图所示运行`index.js`文件。**

![](http://osazvg3ch.bkt.clouddn.com/Snip20170630_8.png)
![](http://osazvg3ch.bkt.clouddn.com/Snip20170630_10.png)
![](http://osazvg3ch.bkt.clouddn.com/Snip20170630_11.png)

一切运行正常，上面的案例中，`server.js`就是自定义的模块。

### 8.如何来进行请求的“路由”

我们要为路由提供请求的URL和其他需要的GET及POST参数，随后路由需要根据这些数据来执行相应的代码（这里“代码”对应整个应用的第三部分：一系列在接收到请求时真正工作的处理程序）。

因此，我们需要查看HTTP请求，从中提取出请求的URL以及GET/POST参数。这一功能应当属于路由还是服务器（甚至作为一个模块自身的功能）确实值得探讨，但这里暂定其为我们的HTTP服务器的功能。

我们需要的所有数据都会包含在request对象中，该对象作为onRequest()回调函数的第一个参数传递。但是为了解析这些数据，我们需要额外的Node.JS模块，它们分别是url和querystring模块。

```js
                               url.parse(string).query
                                           |
           url.parse(string).pathname      |
                       |                   |
                       |                   |
                     ------ -------------------
http://localhost:8888/start?foo=bar&hello=world
                                ---       -----
                                 |          |
                                 |          |
              querystring(string)["foo"]    |
                                            |
                         querystring(string)["hello"]
                         
```

当然我们也可以用querystring模块来解析POST请求体中的参数，稍后会有演示。

现在我们来给onRequest()函数加上一些逻辑，用来找出浏览器请求的URL路径：

![](http://osazvg3ch.bkt.clouddn.com/Snip20170630_12.png)

接下来我在终端执行`node index.js`命令，如下所示：

```js
bogon:如何来进行请求的“路由” yuechunli$ node index.js
Server has started.
请在浏览器中打开 http://127.0.0.1:8888...
```

我先在`Safari`浏览器中打开`http://127.0.0.1:8888`，浏览器展示效果如下：
![](http://osazvg3ch.bkt.clouddn.com/Snip20170630_13.png)

控制台效果如下：

```js
bogon:如何来进行请求的“路由” yuechunli$ node index.js
Server has started.
请在浏览器中打开 http://127.0.0.1:8888...
Request for / received.
```

接着我在`Google`浏览器里面打开 http://127.0.0.1:8888... ，浏览器效果图如下：

![](http://osazvg3ch.bkt.clouddn.com/Snip20170630_17.png)

控制台效果如下：

![](http://osazvg3ch.bkt.clouddn.com/Snip20170630_18.png)

为什么在`Safari`浏览器中进行请求时，只打印了一个`Request for / received.`,而在`Google`浏览器中访问时，会多打印一个`Request for /favicon.ico received.`，如上图所示，原因是因为在`Google`浏览器中，浏览器的原因会去尝试请求`favicon.ico`小图标。

为了演示效果，还有不受`Google`浏览器的`favicon.ico`请求的干扰，我接着在`Safari`里面请求`http://127.0.0.1:8888/start`和`http://127.0.0.1:8888/upload`，我们看看控制台展示的内容是什么。

```js
bogon:如何来进行请求的“路由” yuechunli$ node index.js
Server has started.
请在浏览器中打开 http://127.0.0.1:8888...
Request for /start received.
Request for /upload received.
```

好了，我们的应用现在可以通过请求的URL路径来区别不同请求了--这使我们得以使用路由（还未完成）来将请求以URL路径为基准映射到处理程序上。

在我们所要构建的应用中，这意味着来自`/start`和`/upload`的请求可以使用不同的代码来处理。稍后我们将看到这些内容是如何整合到一起的。

现在我们可以来编写路由了，建立一个名为`router.js`的文件，添加以下内容：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

function route(pathname) {
  console.log("About to route a request for " + pathname);
}

exports.route = route;
```

如你所见，这段代码什么也没干，不过对于现在来说这是应该的。在添加更多的逻辑以前，我们先来看看如何把路由和服务器整合起来。

首先，我们来扩展一下服务器的`start()`函数，以便将路由函数作为参数传递过去：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
let http = require("http");

let url = require("url");


//用一个函数将之前的内容包裹起来
let start = (route) => {
        //箭头函数
    let onRequest = (request, response) => {
        
        let pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(pathname);
        
        response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
        response.write("添加小精灵微信(ershiyidianjian),加入全栈部落");
        response.end();
    }
    //把函数当作参数传递
    http.createServer(onRequest).listen(8888);

    console.log("Server has started.");
    console.log("请在浏览器中打开 http://127.0.0.1:8888...");
}

exports.start = start;
```

同时，我们会相应扩展`index.js`，使得路由函数可以被注入到服务器中：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//从`server`模块中导入server对象

let server = require('./server');
let router = require("./router");

//启动服务器
server.start(router.route);
```

在这里，我们传递的函数依旧什么也没做。

如果现在启动应用（node index.js，始终记得这个命令行），随后请求一个URL，你将会看到应用输出相应的信息，这表明我们的HTTP服务器已经在使用路由模块了，并会将请求的路径传递给路由：

```js
bogon:如何来进行请求的“路由” v2.0 yuechunli$ node index.js
Server has started.
请在浏览器中打开 http://127.0.0.1:8888...
Request for / received.
About to route a request for /
```

### 9.路由给真正的请求处理程序

现在我们的HTTP服务器和请求路由模块已经如我们的期望，可以相互交流了，就像一对亲密无间的兄弟。

当然这还远远不够，路由，顾名思义，是指我们要针对不同的URL有不同的处理方式。例如处理/start的“业务逻辑”就应该和处理/upload的不同。

在现在的实现下，路由过程会在路由模块中“结束”，并且路由模块并不是真正针对请求“采取行动”的模块，否则当我们的应用程序变得更为复杂时，将无法很好地扩展。

我们暂时把作为路由目标的函数称为请求处理程序。现在我们不要急着来开发路由模块，因为如果请求处理程序没有就绪的话，再怎么完善路由模块也没有多大意义。

应用程序需要新的部件，因此加入新的模块 -- 已经无需为此感到新奇了。我们来创建一个叫做requestHandlers的模块，并对于每一个请求处理程序，添加一个占位用函数，随后将这些函数作为模块的方法导出：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

function start() {
  console.log("Request handler 'start' was called.");
}

function upload() {
  console.log("Request handler 'upload' was called.");
}

exports.start = start;
exports.upload = upload;
```

现在我们将一系列请求处理程序通过一个对象来传递，并且需要使用松耦合的方式将这个对象注入到`route()`函数中。

我们先将这个对象引入到主文件index.js中：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//从`server`模块中导入server对象

let server = require('./server');
let router = require("./router");
let requestHandlers = require("./requestHandlers");

//对象构造
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

//启动服务器
server.start(router.route, handle);
```

虽然`handle`并不仅仅是一个“东西”（一些请求处理程序的集合），我还是建议以一个动词作为其命名，这样做可以让我们在路由中使用更流畅的表达式，稍后会有说明。

正如所见，将不同的URL映射到相同的请求处理程序上是很容易的：只要在对象中添加一个键为`"/"`的属性，对应`requestHandlers.start`即可，这样我们就可以干净简洁地配置`/start`和`"/"`的请求都交由`start`这一处理程序处理。

在完成了对象的定义后，我们把它作为额外的参数传递给服务器，为此将`server.js`修改如下：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
let http = require("http");

let url = require("url");


//用一个函数将之前的内容包裹起来
let start = (route,handle) => {
        //箭头函数
    let onRequest = (request, response) => {
        
        let pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle,pathname);

        response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
        response.write("添加小精灵微信(ershiyidianjian),加入全栈部落");
        response.end();
    }
    //把函数当作参数传递
    http.createServer(onRequest).listen(8888);

    console.log("Server has started.");
    console.log("请在浏览器中打开 http://127.0.0.1:8888...");
}

exports.start = start;
```

这样我们就在`start()`函数里添加了`handle`参数，并且把`handle`对象作为第一个参数传递给了`route()`回调函数。

然后我们相应地在`route.js`文件中修改`route()`函数：

有了这些，我们就把服务器、路由和请求处理程序在一起了。现在我们启动应用程序并在浏览器中访问`http://127.0.0.1:8888/start`，以下日志可以说明系统调用了正确的请求处理程序：

```js
bogon:路由给真正的请求处理程序 yuechunli$ node index.js
Server has started.
请在浏览器中打开 http://127.0.0.1:8888...
Request for /start received.
About to route a request for /start
Request handler 'start' was called.
```

并且在浏览器中打开`http://127.0.0.1:8888/`可以看到这个请求同样被start请求处理程序处理了：

```js
bogon:路由给真正的请求处理程序 yuechunli$ node index.js
Server has started.
请在浏览器中打开 http://127.0.0.1:8888...
Request for / received.
About to route a request for /
Request handler 'start' was called.
```

### 10.让请求处理程序作出响应

很好。不过现在要是请求处理程序能够向浏览器返回一些有意义的信息而并非全是`添加小精灵微信(ershiyidianjian),加入全栈部落`，那就更好了。

这里要记住的是，浏览器发出请求后获得并显示的`添加小精灵微信(ershiyidianjian),加入全栈部落`信息仍是来自于我们server.js文件中的onRequest函数。

其实“处理请求”说白了就是“对请求作出响应”，因此，我们需要让请求处理程序能够像onRequest函数那样可以和浏览器进行“对话”。

### 11.不好的实现方式

- 修改`requestHandler.js`文件内容如下：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

function start() {
  console.log("Request handler 'start' was called.");
  return "Hello Start";
}

function upload() {
  console.log("Request handler 'upload' was called.");
  return "Hello Upload";
}

exports.start = start;
exports.upload = upload;
```
好的。同样的，请求路由需要将请求处理程序返回给它的信息返回给服务器。因此，我们需要将router.js修改为如下形式：

```js

/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

function route(handle, pathname) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    return handle[pathname]();
  } else {
    console.log("No request handler found for " + pathname);
    return "404 Not found";
  }
}

exports.route = route;
```

正如上述代码所示，当请求无法路由的时候，我们也返回了一些相关的错误信息。

最后，我们需要对我们的server.js进行重构以使得它能够将请求处理程序通过请求路由返回的内容响应给浏览器，如下所示：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
let http = require("http");

let url = require("url");

//用一个函数将之前的内容包裹起来
let start = (route,handle) => {
        //箭头函数
    let onRequest = (request, response) => {
        
        let pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle,pathname);

        response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
        var content = route(handle, pathname)
        response.write(content);
        response.end();
    }
    //把函数当作参数传递
    http.createServer(onRequest).listen(8888);

    console.log("Server has started.");
}

exports.start = start;
```

如果我们运行重构后的应用，一切都会工作的很好：

- 请求`http://localhost:8888/start`,浏览器会输出`Hello Start`。
- 请求`http://localhost:8888/upload`会输出`Hello Upload`,
- 而请求`http://localhost:8888/foo` 会输出`404 Not found`。

好，那么问题在哪里呢？简单的说就是： 当未来有请求处理程序需要进行非阻塞的操作的时候，我们的应用就“挂”了。

没理解？没关系，下面就来详细解释下。

### 12.阻塞与非阻塞

我们先不解释这里`阻塞`与`非阻塞`，我们来修改下start请求处理程序，我们让它等待10秒以后再返回`Hello Start`。因为，JavaScript中没有类似sleep()这样的操作，所以这里只能够来点小Hack来模拟实现。

让我们将requestHandlers.js修改成如下形式：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

function start() {
  console.log("Request handler 'start' was called.");

  function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
  }

  sleep(10000);
  return "Hello Start";
}


function upload() {
  console.log("Request handler 'upload' was called.");
  return "Hello Upload";
}

exports.start = start;
exports.upload = upload;
```

上述代码中，我先调用了`upload()`，会和此前一样立即返回。当函数`start()`被调用的时候，Node.js会先等待10秒，之后才会返回“Hello Start”。如下图所示，等待中：

![](http://osazvg3ch.bkt.clouddn.com/Snip20170630_19.png)


（当然了，这里只是模拟休眠10秒，实际场景中，这样的阻塞操作有很多，比方说一些长时间的计算操作等。）

接下来就让我们来看看，我们的改动带来了哪些变化。

如往常一样，我们先要重启下服务器。为了看到效果，我们要进行一些相对复杂的操作（跟着我一起做）： 首先，打开两个浏览器窗口或者标签页。在第一个浏览器窗口的地址栏中输入http://localhost:8888/start， 但是先不要打开它！

在第二个浏览器窗口的地址栏中输入http://localhost:8888/upload， 同样的，先不要打开它！

接下来，做如下操作：在第一个窗口中（“/start”）按下回车，然后快速切换到第二个窗口中（“/upload”）按下回车。

注意，发生了什么： /start URL加载花了10秒，这和我们预期的一样。但是，/upload URL居然也花了10秒，而它在对应的请求处理程序中并没有类似于sleep()这样的操作！

这到底是为什么呢？原因就是start()包含了阻塞操作。形象的说就是“它阻塞了所有其他的处理工作”。

这显然是个问题，因为Node一向是这样来标榜自己的：“在node中除了代码，所有一切都是并行执行的”。

这句话的意思是说，Node.js可以在不新增额外线程的情况下，依然可以对任务进行并行处理 —— Node.js是单线程的。它通过事件轮询（event loop）来实现并行操作，对此，我们应该要充分利用这一点 —— 尽可能的避免阻塞操作，取而代之，多使用非阻塞操作。

然而，要用非阻塞操作，我们需要使用回调，通过将函数作为参数传递给其他需要花时间做处理的函数（比方说，休眠10秒，或者查询数据库，又或者是进行大量的计算）。

对于Node.js来说，它是这样处理的：“嘿，probablyExpensiveFunction()（译者注：这里指的就是需要花时间处理的函数），你继续处理你的事情，我（Node.js线程）先不等你了，我继续去处理你后面的代码，请你提供一个callbackFunction()，等你处理完之后我会去调用该回调函数的，谢谢！”

（如果想要了解更多关于事件轮询细节，可以阅读Mixu的博文——[理解node.js的事件轮询](http://blog.mixu.net/2011/02/01/understanding-the-node-js-event-loop/)。）

接下来，我们会介绍一种错误的使用非阻塞操作的方式。

和上次一样，我们通过修改我们的应用来暴露问题。

这次我们还是拿start请求处理程序来“开刀”。将其修改成如下形式：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */


//我们引入了一个新的Node.js模块，child_process。之所以用它，是为了实现一个既简单又实用的非阻塞操作：exec()。
var exec = require("child_process").exec;

function start() {
  console.log("Request handler 'start' was called.");

  /**
   * exec()做了什么呢？
   * 它从Node.js来执行一个shell命令。
   * 在本例子中，我们用它来获取当前目录下所有的文件（“ls -lah”）
   * 然后，当`/start` URL请求的时候将文件信息输出到浏览器中。
   * 下面的代码非常直观的： 
   * 创建了一个新的变量content（初始值为“empty”）。
   * 执行“ls -lah”命令，将结果赋值给content，最后将content返回。
   */
  var content = "empty";

  exec("ls -lah", function (error, stdout, stderr) {
    content = stdout;
  });

  return content;
}

function upload() {
  console.log("Request handler 'upload' was called.");
  return "Hello Upload";
}

exports.start = start;
exports.upload = upload;
```

和往常一样，我们启动服务器，然后访问“http://localhost:8888/start” 。

![](http://osazvg3ch.bkt.clouddn.com/Snip20170630_20.png)

载入一个漂亮的web页面，其内容为“empty”。怎么回事？

如果想要证明这一点，可以将“ls -lah”换成比如“find /”这样更耗时的操作来效果。

然而，针对浏览器显示的结果来看，我们并不满意我们的非阻塞操作，对吧？

好，接下来，我们来修正这个问题。在这过程中，让我们先来看看为什么当前的这种方式不起作用。

问题就在于，为了进行非阻塞工作，exec()使用了回调函数。

在我们的例子中，该回调函数就是作为第二个参数传递给exec()的匿名函数：

```js
function (error, stdout, stderr) {
  content = stdout;
}
```

现在就到了问题根源所在了：我们的代码是同步执行的，这就意味着在调用exec()之后，Node.js会立即执行 return content ；在这个时候，content仍然是“empty”，因为传递给exec()的回调函数还未执行到——因为exec()的操作是异步的。

我们这里“ls -lah”的操作其实是非常快的（除非当前目录下有上百万个文件）。这也是为什么回调函数也会很快的执行到 —— 不过，不管怎么说它还是异步的。

为了让效果更加明显，我们想象一个更耗时的命令： “find /”，它在我机器上需要执行1分钟左右的时间，然而，尽管在请求处理程序中，我把“ls -lah”换成“find /”，当打开/start URL的时候，依然能够立即获得HTTP响应 —— 很明显，当exec()在后台执行的时候，Node.js自身会继续执行后面的代码。并且我们这里假设传递给exec()的回调函数，只会在“find /”命令执行完成之后才会被调用。

那究竟我们要如何才能实现将当前目录下的文件列表显示给用户呢？

好，了解了这种不好的实现方式之后，我们接下来来介绍如何以正确的方式让请求处理程序对浏览器请求作出响应。

### 13.以非阻塞操作进行请求响应

我刚刚提到了这样一个短语 —— “正确的方式”。而事实上通常“正确的方式”一般都不简单。

不过，用Node.js就有这样一种实现方案： 函数传递。下面就让我们来具体看看如何实现。

到目前为止，我们的应用已经可以通过应用各层之间传递值的方式（请求处理程序 -> 请求路由 -> 服务器）将请求处理程序返回的内容（请求处理程序最终要显示给用户的内容）传递给HTTP服务器。

现在我们采用如下这种新的实现方式：相对采用将内容传递给服务器的方式，我们这次采用将服务器“传递”给内容的方式。 从实践角度来说，就是将response对象（从服务器的回调函数onRequest()获取）通过请求路由传递给请求处理程序。 随后，处理程序就可以采用该对象上的函数来对请求作出响应。

原理就是如此，接下来让我们来一步步实现这种方案。


先从server.js开始：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
let http = require("http");

let url = require("url");

//用一个函数将之前的内容包裹起来
let start = (route,handle) => {
        //箭头函数
    let onRequest = (request, response) => {
        
        let pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response);
    }
    //把函数当作参数传递
    http.createServer(onRequest).listen(8888);

    console.log("Server has started.");
}

exports.start = start;
```

相对此前从route()函数获取返回值的做法，这次我们将response对象作为第三个参数传递给route()函数，并且，我们将onRequest()处理程序中所有有关response的函数调都移除，因为我们希望这部分工作让route()函数来完成。

下面就来看看我们的router.js:

同样的模式：相对此前从请求处理程序中获取返回值，这次取而代之的是直接传递response对象。

如果没有对应的请求处理器处理，我们就直接返回“404”错误。

最后，我们将requestHandler.js修改为如下形式：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */


//我们引入了一个新的Node.js模块，child_process。之所以用它，是为了实现一个既简单又实用的非阻塞操作：exec()。
var exec = require("child_process").exec;

function start(response) {
  console.log("Request handler 'start' was called.");

  exec("ls -lah", function (error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end();
  });
}

function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;
```

我们的处理程序函数需要接收response参数，为了对请求作出直接的响应。

start处理程序在exec()的匿名回调函数中做请求响应的操作，而upload处理程序仍然是简单的回复“Hello World”，只是这次是使用response对象而已。

这时再次我们启动应用（node index.js），一切都会工作的很好。

在浏览器中打开 `http:127.0.0.0:8888/start` 效果图如下所示：

![](http://osazvg3ch.bkt.clouddn.com/Snip20170630_21.png)

在浏览器中打开 `http:127.0.0.0:8888/upload` 效果图如下所示：
![](http://osazvg3ch.bkt.clouddn.com/Snip20170630_22.png)

如果想要证明`/start`处理程序中耗时的操作不会阻塞对`/upload`请求作出立即响应的话，可以将`requestHandlers.js`修改为如下形式：

```js
var exec = require("child_process").exec;

function start(response) {
  console.log("Request handler 'start' was called.");

  exec("find /",
    { timeout: 10000, maxBuffer: 20000*1024 },
    function (error, stdout, stderr) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write(stdout);
      response.end();
    });
}

function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;
```

这样一来，当请求`http://localhost:8888/start`的时候，会花10秒钟的时间才载入，而当请求`http://localhost:8888/upload`的时候，会立即响应，纵然这个时候`/start`响应还在处理中。


### 14.更有用的场景

到目前为止，我们做的已经很好了，但是，我们的应用没有实际用途。

服务器，请求路由以及请求处理程序都已经完成了，下面让我们按照此前的用例给网站添加交互：用户选择一个文件，上传该文件，然后在浏览器中看到上传的文件。 为了保持简单，我们假设用户只会上传图片，然后我们应用将该图片显示到浏览器中。

好，下面就一步步来实现，鉴于此前已经对JavaScript原理性技术性的内容做过大量介绍了，这次我们加快点速度。

要实现该功能，分为如下两步： 首先，让我们来看看如何处理POST请求（非文件上传），之后，我们使用Node.js的一个用于文件上传的外部模块。之所以采用这种实现方式有两个理由。

第一，尽管在Node.js中处理基础的POST请求相对比较简单，但在这过程中还是能学到很多。 
第二，用Node.js来处理文件上传（multipart POST请求）是比较复杂的，它不在本文的范畴，但是，如何使用外部模块却是在本书涉猎内容之内。

### 15.处理POST请求

考虑这样一个简单的例子：我们显示一个文本区（textarea）供用户输入内容，然后通过POST请求提交给服务器。最后，服务器接受到请求，通过处理程序将输入的内容展示到浏览器中。

`/start`请求处理程序用于生成带文本区的表单，因此，我们将`requestHandlers.js`修改为如下形式：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */


//我们引入了一个新的Node.js模块，child_process。之所以用它，是为了实现一个既简单又实用的非阻塞操作：exec()。
var exec = require("child_process").exec;

function start(response) {
  console.log("Request handler 'start' was called.");

  let body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="5" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    response.write(body);
    response.end();
}

function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
  response.write("Hello Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;
```

浏览器请求`http://127.0.0.1:8888/start`,效果图如下：

![](http://osazvg3ch.bkt.clouddn.com/Snip20170630_23.png)


余下的篇幅，我们来探讨一个更有趣的问题： 当用户提交表单时，触发/upload请求处理程序处理POST请求的问题。

现在，我们已经是新手中的专家了，很自然会想到采用异步回调来实现非阻塞地处理POST请求的数据。

这里采用非阻塞方式处理是明智的，因为POST请求一般都比较“重” —— 用户可能会输入大量的内容。用阻塞的方式处理大数据量的请求必然会导致用户操作的阻塞。

为了使整个过程非阻塞，Node.js会将POST数据拆分成很多小的数据块，然后通过触发特定的事件，将这些小数据块传递给回调函数。这里的特定的事件有data事件（表示新的小数据块到达了）以及end事件（表示所有的数据都已经接收完毕）。

我们需要告诉Node.js当这些事件触发的时候，回调哪些函数。怎么告诉呢？ 我们通过在request对象上注册监听器（listener） 来实现。这里的request对象是每次接收到HTTP请求时候，都会把该对象传递给onRequest回调函数。

如下所示：

```js
request.addListener("data", function(chunk) {
  // called when a new chunk of data was received
});

request.addListener("end", function() {
  // called when all chunks of data have been received
});
```

问题来了，这部分逻辑写在哪里呢？ 我们现在只是在服务器中获取到了request对象 —— 我们并没有像之前response对象那样，把 request 对象传递给请求路由和请求处理程序。

在我看来，获取所有来自请求的数据，然后将这些数据给应用层处理，应该是HTTP服务器要做的事情。因此，我建议，我们直接在服务器中处理POST数据，然后将最终的数据传递给请求路由和请求处理器，让他们来进行进一步的处理。

因此，实现思路就是： 将data和end事件的回调函数直接放在服务器中，在data事件回调中收集所有的POST数据，当接收到所有数据，触发end事件后，其回调函数调用请求路由，并将数据传递给它，然后，请求路由再将该数据传递给请求处理程序。

还等什么，马上来实现。先从server.js开始：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
let http = require("http");

let url = require("url");

//用一个函数将之前的内容包裹起来
let start = (route,handle) => {
        //箭头函数
    let onRequest = (request, response) => {
        
        let postData = "";
        let pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        request.setEncoding("utf8");

        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '"+ postDataChunk + "'.");
        });

        request.addListener("end", function() {
            route(handle, pathname, response, postData);
        });
    }
    //把函数当作参数传递
    http.createServer(onRequest).listen(8888);

    console.log("Server has started.");
}

exports.start = start;
```

上述代码做了三件事情： 首先，我们设置了接收数据的编码格式为UTF-8，然后注册了“data”事件的监听器，用于收集每次接收到的新数据块，并将其赋值给postData 变量，最后，我们将请求路由的调用移到end事件处理程序中，以确保它只会当所有数据接收完毕后才触发，并且只触发一次。我们同时还把POST数据传递给请求路由，因为这些数据，请求处理程序会用到。

上述代码在每个数据块到达的时候输出了日志，这对于最终生产环境来说，是很不好的（数据量可能会很大，还记得吧？），但是，在开发阶段是很有用的，有助于让我们看到发生了什么。

我建议可以尝试下，尝试着去输入一小段文本，以及大段内容，当大段内容的时候，就会发现data事件会触发多次。

再来点酷的。我们接下来在/upload页面，展示用户输入的内容。要实现该功能，我们需要将postData传递给请求处理程序，修改router.js为如下形式：

```js

/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

function route(handle, pathname, response, postData) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, postData);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;
```

然后，在requestHandlers.js中，我们将数据包含在对upload请求的响应中：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */


//我们引入了一个新的Node.js模块，child_process。之所以用它，是为了实现一个既简单又实用的非阻塞操作：exec()。
var exec = require("child_process").exec;

function start(response, postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent: " + postData);
  response.end();
}

exports.start = start;
exports.upload = upload;
```

好了，我们现在可以接收POST数据并在请求处理程序中处理该数据了。

我们最后要做的是： 当前我们是把请求的整个消息体传递给了请求路由和请求处理程序。我们应该只把POST数据中，我们感兴趣的部分传递给请求路由和请求处理程序。在我们这个例子中，我们感兴趣的其实只是text字段。

我们可以使用此前介绍过的querystring模块来实现：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */


//我们引入了一个新的Node.js模块，child_process。之所以用它，是为了实现一个既简单又实用的非阻塞操作：exec()。
var exec = require("child_process").exec;
var querystring = require("querystring");

function start(response, postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent the text: "+querystring.parse(postData).text);
  response.end();
}

exports.start = start;
exports.upload = upload;
```


下面我们浏览器中访问`http://127.0.0.1:8888/start`,如下图所示：

![](http://osazvg3ch.bkt.clouddn.com/Snip20170630_24.png)

点击`Submit text`按钮，将跳转到`http://127.0.0.1:8888/upload`,效果图如下：

![](http://osazvg3ch.bkt.clouddn.com/Snip20170630_25.png)

好了，这就是完整的POST请求。

### 15.处理文件上传

最后，我们来实现我们最终的用例：允许用户上传图片，并将该图片在浏览器中显示出来。

我们通过它能学到这样两件事情： 

- 如何安装外部Node.js模块
- 以及如何将它们应用到我们的应用中

这里我们要用到的外部模块是`Felix Geisendörfer`开发的`node-formidable`模块。它对解析上传的文件数据做了很好的抽象。 其实说白了，处理文件上传“就是”处理POST数据 —— 但是，麻烦的是在具体的处理细节，所以，这里采用现成的方案更合适点。

使用该模块，首先需要安装该模块。Node.js有它自己的包管理器，叫NPM。它可以让安装Node.js的外部模块变得非常方便。

首先在当前项目路径下面通过`npm init`创建`package.json`文件:

![](http://osazvg3ch.bkt.clouddn.com/WX20170701-102100@2x.png)

PS:在终端输入`npm init`后，一路回车即可。新增的`package.json`文件的内容如下：

```js
{
  "author" : "liyuechun",
  "description" : "",
  "license" : "ISC",
  "main" : "index.js",
  "name" : "fileupload",
  "scripts" : {
    "test" : "echo \"Error: no test specified\" && exit 1"
  },
  "version" : "1.0.0"
}
```

接下来，在终端输入如下命令安装`formidable`外部模块。
如下所示：

```js
liyuechun:fileupload yuechunli$ ls
index.js                requestHandlers.js      server.js
package.json            router.js
liyuechun:fileupload yuechunli$ npm install formidable
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN fileupload@1.0.0 No description
npm WARN fileupload@1.0.0 No repository field.

+ formidable@1.1.1
added 1 package in 1.117s
liyuechun:fileupload yuechunli$
```

`package.json`文件变化如下：

```js
{
  "author": "liyuechun",
  "description": "",
  "license": "ISC",
  "main": "index.js",
  "name": "fileupload",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "version": "1.0.0",
  "dependencies": {
    "formidable": "^1.1.1"
  }
}
```

项目整体变化如下图所示：

![](http://osazvg3ch.bkt.clouddn.com/WX20170701-103037@2x.png)

现在我们就可以用`formidable`模块了——使用外部模块与内部模块类似，用`require`语句将其引入即可：

```js
let formidable = require("formidable");
```

这里该模块做的就是将通过HTTP POST请求提交的表单，在Node.js中可以被解析。我们要做的就是创建一个新的IncomingForm，它是对提交表单的抽象表示，之后，就可以用它解析request对象，获取表单中需要的数据字段。

node-formidable官方的例子展示了这两部分是如何融合在一起工作的：

```js
let formidable = require('formidable'),
    http = require('http'),
    util = require('util');

http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
    return;
  }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8888);
```

如果我们将上述代码，保存到一个文件中，并通过node来执行，就可以进行简单的表单提交了，包括文件上传。然后，可以看到通过调用form.parse传递给回调函数的files对象的内容，如下所示：

```js
received upload:

{ fields: { title: 'Hello World' },
  files:
   { upload:
      { size: 1558,
        path: './tmp/1c747974a27a6292743669e91f29350b',
        name: 'us-flag.png',
        type: 'image/png',
        lastModifiedDate: Tue, 21 Jun 2011 07:02:41 GMT,
        _writeStream: [Object],
        length: [Getter],
        filename: [Getter],
        mime: [Getter] } } }
```

为了实现我们的功能，我们需要将上述代码应用到我们的应用中，另外，我们还要考虑如何将上传文件的内容（保存在`./tmp`目录中）显示到浏览器中。

我们先来解决后面那个问题： 对于保存在本地硬盘中的文件，如何才能在浏览器中看到呢？

显然，我们需要将该文件读取到我们的服务器中，使用一个叫fs的模块。

我们来添加`/showURL`的请求处理程序，该处理程序直接硬编码将文件`./tmp/test.png`内容展示到浏览器中。当然了，首先需要将该图片保存到这个位置才行。

将`requestHandlers.js`修改为如下形式：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

var querystring = require("querystring"),
    fs = require("fs");

function start(response, postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent the text: "+
  querystring.parse(postData).text);
  response.end();
}

function show(response, postData) {
  console.log("Request handler 'show' was called.");
  fs.readFile("./tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
```

我们还需要将这新的请求处理程序，添加到`index.js`中的路由映射表中：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//从`server`模块中导入server对象

let server = require('./server');
let router = require("./router");
let requestHandlers = require("./requestHandlers");

//对象构造
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

//启动服务器
server.start(router.route, handle);
```

重启服务器之后，通过访问`http://localhost:8888/show`看看效果：

![](http://osazvg3ch.bkt.clouddn.com/WX20170701-104512@2x.png)

原因是当前项目路径下面没有`./tmp/test.png`图片，我们在当前项目路径下面添加`tmp`文件夹，在往里面拖拽一张图片，命名为`test.png`。

![](http://osazvg3ch.bkt.clouddn.com/WX20170701-105040@2x.png)

再重新启动服务器，访问`http://localhost:8888/show`查看效果如下：

![](http://osazvg3ch.bkt.clouddn.com/WX20170701-105516@2x.png)


咱继续，从`server.js`开始 —— 移除对`postData`的处理以及`request.setEncoding` （这部分`node-formidable`自身会处理），转而采用将`request`对象传递给请求路由的方式：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
let http = require("http");

let url = require("url");

//用一个函数将之前的内容包裹起来
let start = (route,handle) => {
        //箭头函数
    let onRequest = (request, response) => {
        
        let pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response, request);
    }
    //把函数当作参数传递
    http.createServer(onRequest).listen(8888);

    console.log("Server has started.");
}

exports.start = start;
```

接下来是 `router.js` —— 我们不再需要传递`postData`了，这次要传递`request`对象：

```js

/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

function route(handle, pathname, response, request) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;
```

现在，`request`对象就可以在我们的`upload`请求处理程序中使用了。`node-formidable`会处理将上传的文件保存到本地/tmp目录中，而我们需要做的是确保该文件保存成`./tmp/test.png`。 没错，我们保持简单，并假设只允许上传PNG图片。

这里采用`fs.renameSync(path1,path2)`来实现。要注意的是，正如其名，该方法是同步执行的， 也就是说，如果该重命名的操作很耗时的话会阻塞。 这块我们先不考虑。

接下来，我们把处理文件上传以及重命名的操作放到一起，如下`requestHandlers.js`所示：

```js
/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    fs.renameSync(files.upload.path, "./tmp/test.png");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("./tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
```

重启服务器，浏览器访问`http://127.0.0.1:8888`，效果图如下：
![](http://osazvg3ch.bkt.clouddn.com/WX20170701-111333@2x.png)

选择一张图片上传，查看效果：

![](http://osazvg3ch.bkt.clouddn.com/WX20170701-122242@2x.png)

### 16.源码下载
[所有源码:https://github.com/fullstacktribe/001nodejs](https://github.com/fullstacktribe/001nodejs)

