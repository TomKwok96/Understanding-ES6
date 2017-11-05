/***************************
 * 第五章 解构：使数据访问更便捷
 ***************************/
 
/* 为何使用解构功能 */

let options = {
  repeat: true,
  save: false
};
// 从对象中提取数据
let repeat = options.repeat,
  save = options.save;

/* 对象解构 */

let node = {
  type: "Identifier",
  name: "foo"
};
let {type, name} = node;
console.log(type); // "Identifier"
console.log(name); // "foo"

/* 不要忘记初始化程序 */

// 以下均为语法错误
var {type, name};
let {type, name};
const {type, name};

/* 解构赋值 */

let node = {
  type: "Identifier",
  name: "foo"
};
type = "Literal";
name = 5;
// 使用解构语法为多个变量赋值
({type, name} = node);
console.log(type); // "Identifier"
console.log(name); // "foo"

// 解构赋值表达式的值与=右侧的值相同
let node = {
  type: "Identifier",
  name: "foo"
};
type = "Literal";
name = 5;
function outputInfo(value) {
  console.log(value === node); // true
}
outputInfo({type, name} = node);
console.log(type); // "Identifier"
console.log(name); // "foo"

/* 默认值 */

let node = {
  type: "Identifier",
  name: "foo"
};
let {type, name, value1, value2 = true} = node;
console.log(type); // "Identifier"
console.log(name); // "foo"
console.log(value1); // undefined
console.log(value2); // true

/* 为非同名局部变量赋值 */

let node = {
  type: "Identifier",
  name: "foo"
};
let {type: localType, name: localName, value: localValue = "1998"} = node;
console.log(localType); // "Identifier"
console.log(localName); // "foo"
console.log(localValue); // 1998

/* 嵌套对象解构 */

let node = {
  type: "Identifier",
  name: "foo",
  loc: {
    start: {
      line: 1,
      column: 1
    },
    end: {
      line: 1,
      column: 4
    }
  }
};
let {loc: {start}} = node;
console.log(start.line); // 1
console.log(start.column); // 1

let node = {
  type: "Identifier",
  name: "foo",
  loc: {
    start: {
      line: 1,
      column: 1
    },
    end: {
      line: 1,
      column: 4
    }
  }
};
let {loc: {start: localStart}} = node;
console.log(localStart.line); // 1
console.log(localStart.column); // 1

/* 数组解构 */

let colors = ["red", "green", "blue"];
let [firstColor, secondColor] = colors;
console.log(firstColor); // "red"
console.log(secondColor); // "green"
let [ , , thirdColor] = colors; // 可省略元素
console.log(thirdColor); // "blue"

/* 解构赋值 */

let colors = ["red", "green", "blue"],
  firstColor = "bkack",
  secondColor = "purple";
[firstColor, secondColor = "pink"] = colors; // 使用默认值
console.log(firstColor); // "red"
console.log(secondColor); // "green"

// 在ES5中交换变量
let a = 1,
  b = 2,
  tmp;
tmp = a;
a = b;
b = tmp;
console.log(a); // 2
console.log(b); // 1

// ES6中交换变量
let a = 1,
  b = 2;
[a, b] = [b, a];
console.log(a); // 2
console.log(b); // 1

/* 嵌套数组解构 */

let colors = ["red", ["green", "lightgreen"], "blue"];
let [firstColor, [secondColor]] = colors;
console.log(firstColor); // "red"
console.log(secondColor); // "green"

/* 不定元素 */

let colors = ["red", "green", "blue"];
let [firstColor, ...restColors] = colors;
console.log(firstColor); // "red"
console.log(restColors.length); // 2
console.log(restColors[0]); // "green"
console.log(restColors[1]); // "blue"

// 在ES5中克隆数组
var colors = ["red", "green", "blue"];
var clonedColors = colors.concat();
console.log(clonedColors); // ["red", "green", "blue"]

// 在ES6中克隆数组
let colors = ["red", "green", "blue"];
let [...clonedColors] = colors;
console.log(clonedColors); // ["red", "green", "blue"]

/* 混合解构 */

let node = {
  type: "Identifier",
  name: "foo",
  loc: {
    start: {
      line: 1,
      column: 1
    },
    end: {
      line: 1,
      column: 4
    }
  },
  range: [0, 3]
};
let {
  loc: {start},
  range: [startIndex]
} = node;
console.log(start.line); // 1
console.log(start.column); // 1
console.log(startIndex); // 0

/* 解构参数 */

// options参数表示其它参数
function setCookie(name, value, options) {
  options = options || {};
  let secure = options.secure,
    path = options.path,
    domain = options.domain,
    expires = options.expires;
  // 设置cookie的代码
}
// 第三个参数映射到options中
setCookie("type", "js", {
  secure: true,
  expires: 500000
});

function setCookie(name, value, {secure, path, domain, expires}) {
  // 设置cookie代码
}
setCookie("type", "js", {
  secure: true,
  expires: 50000
});

/* 必须传值的解构参数 */

setCookie("type", "js"); // 程序报错！

function setCookie(name, value, {secure, path, domain, expires} = {}) {
  // ...
}

/* 解析参数的默认值 */

function setCookie(name, value,
  {
    secure = false,
    path = '/',
    domain = "example.com",
    expires = new Data(Date.now() + 36000000)
  }
) {
  // ...
}

// 代码冗余
function setCookie(name, value,
  {
    secure = false,
    path = '/',
    domain = "example.com",
    expires = new Data(Date.now() + 36000000)
  } = {
    secure = false,
    path = '/',
    domain = "example.com",
    expires = new Data(Date.now() + 36000000)
  }
) {
  // ...
}

const setCookieDefaults = {
  secure = false,
  path = '/',
  domain = "example.com",
  expires = new Data(Date.now() + 36000000)
};
function setCookie(name, value,
  {
    secure = setCookieDefaults.secure,
    path = setCookieDefaults.path,
    domain = setCookieDefaults.domain,
    expires = setCookieDefaults.expires
  } = setCookieDefaults
) {
  // ...
}