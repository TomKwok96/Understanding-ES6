/*******************************************
 * 第十二章 代理（proxy）和反射（Reflection）API
 *******************************************/
 
/* 创建一个简单的代理 */

let target = {};
let proxy = new Proxy(target, {});
proxy.name = "proxy";
console.log(proxy.name); // "proxy"
console.log(target.name); // "proxy"
target.name = "target";
console.log(proxy.name); // "target"
console.log(target.name); // "target"

/* 使用set陷阱验证属性 */

let target = {
  name: "target"
};
let proxy = new Proxy(target, {
  set(trapTarget, key, value, receiver) {
    // 忽略不希望受到影响的已有属性
    if (!trapTarget.hasOwnProperty(key)) {
      if (isNaN(value)) {
        throw new TypeError("属性必须是数字");
      }
    }
    return Reflect.set(trapTarget, key, value, receiver);
  }
});
// 添加一个属性
proxy.count = 1;
console.log(proxy.count); // 1
console.log(target.count); // 1
// 由于目标已有name属性因而可以自己给他赋值
proxy.name = "proxy";
console.log(proxy.name); // "proxy"
console.log(target.name); // "proxy"
// 给不存在的属性赋值会抛出错误
proxy.anotherName = "proxy";

/* 用get陷阱验证对象结构（Object Shape） */

let proxy = new Proxy({}, {
  get(trapTarget, key, receiver) {
    if (!(key in receiver)) {
      throw new TypeError("属性" + key + " 不存在");
    }
    return Reflect.get(trapTarget, key, receiver);
  }
});
// 添加一个属性，程序仍在正常运行
proxy.name = "proxy";
console.log(proxy.name); // "proxy"
console.log(proxy.nme); // 抛出错误

/* 使用has陷阱隐藏已有属性 */

let target = {
  value: 42
};
console.log("value" in target); // true
console.log("toString" in target); // true

let target = {
  name: "target",
  value: 42
};
let proxy = new Proxy(target, {
  has(traptarget, key) {
    if (key === "value") {
      return false;
    } else {
      return Reflect.has(trapTarget, key);
    }
  }
});
console.log("value" in proxy); // false
console.log("name" in proxy); // true
console.log("toString" in proxy); // true

/* 用deleteProperty陷阱防止删除属性 */

let target = {
  name: "target",
  value: 42
};
Object.defineProperty(target, "name", {
  configurable: false
});
console.log("value" in target); // true
let result1 = delete target.value;
console.log(result1); // true
console.log("value" in target); // false
// 注意，在严格模式下，下面这行代码会抛出一个错误
let result2 = delete target.name;
console.log(result2); // false
console.log("name" in target); // true

let target = {
  name: "target",
  value: 42
};
let proxy = new Proxy(target, {
  deleteProperty(trapTarget, key) {
    if (key === "value") {
      return false;
    } else {
      return Reflect.deleteProperty(trapTarget, key);
    }
  }
});
// 尝试删除proxy.value
console.log("value" in proxy); // true
let result1 = delete proxy.value;
console.log(result1); // false
console.log("value" in proxy); // true
// 尝试删除proxy.name
console.log("name" in proxy); // true
let result2 = delete proxy.name;
console.log(result2); // true
console.log("name" in proxy); // false

/* 原型代理陷阱的运行机制 */

let target = {};
let proxy = new Proxy(target, {
  getPrototypeOf(trapTarget) {
    return null;
  },
  setPrototypeOf(trapTarget, proto) {
    return false;
  }
});
let targetProto = Object.getPrototypeOf(target);
let proxyProto = Object.getPrototypeOf(proxy);
console.log(targetProto === Object.prototype); // true
console.log(proxyPtoto === Object.prototype);  // false
console.log(proxyProto); // null
// 成功
Object.setPrototypeOf(target, {});
// 给不存在的属性赋值会抛出错误
Object.setPrototypeOf(proxy, {});

let target = {};
let proxy = new Proxy(target, {
  getPrototypeOf(trapTarget) {
    return Reflect.getPrototypeOf(trapTarget);
  },
  setPrototypeOf(trapTarget, proto) {
    return Reflect.setPrototypeOf(trapTarget, proto);
  }
});
let targetProto = Object.getPrototypeOf(target);
let proxyProto = Object.getPrototypeOf(proxy);
console.log(targetProto === Object.prototype); // true
console.log(proxyProto === Object.prorotype); // false，与书上结果不同，不明白为什么
Object.setPrototypeOf(target, {}); // 成功
Object.setPrototypeOf(proxy, {}); // 成功