/**************************
 * 第十一章 Promise与异步编程
 **************************/
 
/* Promise的声明周期 */

let promise = readFile("example.txt");
promise.then(function(contents) {
  // 完成
  console.log(contents);
}, function(err) {
  // 拒绝
  console.error(err.message);
});
promise.then(function(contents) {
  // 完成
  console.log(contents);
});
promise.then(null, function(err) {
  // 拒绝
  console.error(err.message);
});
// 与上面的形式等价
promise.catch(function(err) {
  // 拒绝
  console.error(err.message);
});

promise.then(function(contents) {
  console.log(contents);
  promise.then(function(contents) {
    console.log(contents);
  });
});

/*  创建未完成的Promise */

// 使用Promise.resolve()
let promise = Promise.resolve(42);
promise.then(function(value) {
  console.log(value); // 42
});

// 使用Promise.reject()
let promise = Promise.reject(42);
promise.catch(function(value) {
  console.log(value); // 42
});

// 非Promise的Thenable对象
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value); // 42
});

/* 执行器错误 */

let promise = new Promise(function(resolve, reject) {
  throw new Error("Explosion!");
});
promise.catch(function(error) {
  console.error(error.message); // "Explosion!"
});

/* Node.js的拒绝处理 */

let rejected;
process.on("unhandledRejection", function(reason, promise) {
  console.log(reason.message);
  console.log(rejected === promise);
});
rejected = Promise.reject(new Error("Explosion!"));

let rejected;
process.on("rejectedHandled", function(promise) {
  console.log(rejected === promise);
});
rejected = Promise.reject(new Error("Explosion"));
// 等待添加处理程序
setTimeout(function() {
  rejected.catch(function(value) {
    console.log(value.message);
  })
}, 1000);

// 简单的未处理拒绝跟踪器
let possibleUnhandledRejections = new Map();
// 如果一个拒绝没被处理，则将它添加到Map集合中
process.on("unhandledRejection", function(reason, promise) {
  possibleUnhandledRejections.set(promise, reason);
});
process.on("rejectedHandled", function(promise) {
  possibleUnhandledRejections.delete(promise);
});
setInterval(function() {
  possibleUnhandledRejections.forEach(function(reason, promise) {
    console.log(reason.message ? reason.message : reason);
    // 处理这些拒绝
    handledRejection(promise, reason);
  });
}, 60000);

/* 浏览器环境的拒绝处理 */

let rejected;
window.onunhandledrejection = function(event) {
  console.log(event.type);
  console.log(event.reason.message);
  console.log(rejected === event.promise);
};
window.onrejectionhandled = function(event) {
  console.log(event.type);
  console.log(event.reason.message);
  console.log(rejected === event.promise);
};
rejected = Promise.reject(new Error("Explosion!"));

// 浏览器中处理未跟踪拒绝的代码
let possibleUnhandledRejections = new Map();
window.onunhandledrejection = function(event) {
  possibleUnhandledRejections.set(event.promise, event.reason);
};
window.onrejectionhandled = function(event) {
  possibleUnhandledRejections.delete(event.promise);
};
setInterval(function(){
  possibleUnhandledRejections.forEach(function(reason, promise) {
    console.log(reason.message ? reason.message : reason);
    // 处理这些拒绝
    handledRejection(promise, reason);
  });
  possibleUnhandledRejections.clear();
}, 60000);

/* 串联Promise */

let p1 = new Promise(function(resolve, reject) {
  resolve(42);
});
p1.then(function(value) {
  console.log(value);
}).then(function() {
  console.log("Finished");
});

/* 捕获错误 */

let p1 = new Promise(function(resolve, reject) {
  resolve(42);
});
p1.then(function(value) {
  throw new Error("Boom!");
}).catch(function(error) {
  console.error(error.message);
});

/* Promise链的返回值 */

let p1 = new Promise(function(resolve, reject) {
  resolve(42);
});
p1.then(function(value) {
  console.log(value);
  return value + 1;
}).then(function(value) {
  console.log(value);
});

/* 在Promise链中返回Promise */

let p1 = new Promise(function(resolve, reject) {
  resolve(42);
});
let p2 = new Promise(function(resolve, reject) {
  resolve(43);
});
p1.then(function(value) {
  // 第一个完成处理程序
  console.log(value);
}).then(function(value) {
  // 第二个完成处理程序
  console.log(value);
});

/* Promise.all()方法 */

let p1 = new Promise(function(resolve, reject) {
  resolve(42);
});
let p2 = new Promise(function(resolve, reject) {
  resolve(43);
});
let p3 = new Promise(function(resolve, reject) {
  resolve(44);
});
let p4 = Promise.all([p1, p2, p3]);
p4.then(function(value) {
  console.log(Array.isArray(value));
  console.log(value[0]);
  console.log(value[1]);
  console.log(value[2]);
});

/* Promise.race()方法 */

let p1 = Promise.resolve(42);
let p2 = new Promise(function(resolve, reject) {
  resolve(43);
});
let p3 = new Promise(function(resolve, reject) {
  resolve(44);
});
let p4 = Promise.race([p1, p2, p3]);
p4.then(function(value) {
  console.log(value); // 42
});

/* 自Promise继承 */

class MyPromise extends Promise {
  success(resolve, reject) {
    return this.then(resolve, reject);
  }
  failure(reject) {
    return this.catch(reject);
  }
}
let promise = new MyPromise(function(resolve, rejct) {
  resolve(42);
});
promise.success(function(value) {
  console.log(value); // 42
}).failure(function(value) {
  console.log(value);
});

/* 基于Promise的异步任务执行 */

let fs = require("fs");
function run(taskDef) {
  let task = taskDef();
  let result = task.next();
  (function step() {
    if (!result.done) {
      let promise = Promise.resolve(result.value);
      promise.then(function(value) {
        result.task.next(value);
        step();
      }).catch(function(error) {
        result = task.throw(error);
        step();
      });
    }
  }());
}
function readFile(filename) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, function(err, contents) {
      if (err) {
        reject(err);
      } else {
        resolve(contents);
      }
    });
  });
}
run(function *() {
  let contents = yield readFile("config.json");
  doSomething(contents);
  console.log("Done");
});