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