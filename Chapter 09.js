/***********************
 * 第九章 JavaScript中的类
 ***********************/
 
/* 基本的类语法声明 */

class PersonClass {
 
 // 等价于PersonClass构造函数
 constructor(name) {
   this.name = name;
 }
 // 等价于Person.prototype.sayName
 sayName() {
   console.log(this.name);
 }
}
let person = new PersonClass("Nickolas");
person.sayName(); // "Nickolas"
console.log(person instanceof PersonClass); // true
console.log(person instanceof Object); // true
console.log(typeof PersonClass); // "function"
console.log(typeof PersonClass.prototype.sayName);  // "function"

/* 为何使用类语法 */

//等价写法
let PersonType2 = (function() {
  
  "use strict";
  
  const PersonType2 = function(name) {
    
    // 确保通过关键字new调用该函数
    if (typeof new.target === "undefined") {
      throw new Error("必须通过关键字new调用构造函数");
    }
    this.name = name;
  }
  
  Object.defineProperty(PersonType2.prototype, "sayName", {
    value: function() {
      // 确保通过关键字new调用该函数
      if (typeof new.target !== "undefined") {
        throw new Error("必须通过关键字new调用构造函数");
      }
      console.log(this.name);
    },
    enumerable: false,
    writable: true,
    configurable: true
  });
  return PersonType2;
}());

/* 常量类名 */

class Foo {
  constructor() {
    Foo = "bar"; // 执行时报错
  }
}
Foo = "bar"; // 正确

/* 基本的类表达式语法 */

let PersonClass = class {
  constructor(name) {
    this.name = name;
  }
  // ...
};

/* 命名类表达式 */

let PersonClass = class PersonType {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
  // ...
};
console.log(typeof PersonClass); // "function"
console.log(typeof PersonType); // "undefined"

// 等价写法
let PersonClass = (function() {
  
  "use strict";
  
  const PersonType = function(name) {
    
    // 确保通过关键字new调用该函数
    if (typeof new.target === "undefined") {
      throw new Error("必须通过关键字new调用构造函数");
    }
    this.name = name;
  }
  
  Object.defineProperty(PersonType.prototype, "sayName", {
    value: function() {
      // 确保通过关键字new调用该函数
      if (typeof new.target !== "undefined") {
        throw new Error("必须通过关键字new调用构造函数");
      }
      console.log(this.name);
    },
    enumerable: false,
    writable: true,
    configurable: true
  });
  return PersonType;
}());

/* 作为一等公民的类 */

function createObject(classDef) {
  return new classDef();
}
let obj = createObject(class {
  sayHi() {
    console.log("Hi!");
  }
});
obj.sayHi(); // "Hi!"

// 创建单例
let person = new class {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}("Nickolas");
person.sayName(); // "Nickolas"

/* 访问器属性 */

class CustomHTMLElemnt {
  constructor(element) {
    this.element = element;
  }
  get html() {
    return this.element.innerHTML;
  }
  set html(value) {
    this.element.innerHTML = "value";
  }
}
var descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElemnt.prototype, "html");
console.log("get" in descriptor); // true
console.log("set" in descriptor); // true
console.log(descriptor.enumerable); // false

/* 可计算成员名称 */

let methodName = "sayName";
class PersonClass {
  constructor(name) {
    this.name = name;
  }
  [methodName]() {
    console.log(this.name);
  }
};
let me = new PersonClass("Nickolas");
me.sayName(); // "Nickolas"

/* 生成器方法 */

class MyClass {
  *createIterator() {
    yield 1;
    yield 2;
    yield 3;
  }
}
let instance = new MyClass();
let itetator = instance.createIterator();

// 默认迭代器
class Collection {
  constructor() {
    this.items = [];
  }
  *[Symbol.iterator]() {
    yiled *this.items.values();
  }
}
var collection = new Collection();
collection.items.push(...[1, 2, 3]);
for (let x of collection) {
  console.log(x);
}

/* 静态成员 */

function PersonType(name) {
  this.name = name;
}
// 静态方法
class PersonClass {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
  static create(name) {
    return new PersonClass(name);
  }
}
let person = PersonClass.create("Nickolas");

/* 继承与派生类 */

class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }
  getArea() {
    return this.length * this.width;
  }
}
class Square extends Rectangle {
  constructor(length) {
    super(length, length);
  }
}
var square = new Square(3);
console.log(square.getArea()); // 9
console.log(square instanceof Square); // true
console.log(square instanceof Rectangle); // true

/* 类方法遮盖 */

class Square extends Rectangle {
  constructor(length) {
    super(length, length);
  }
  getArea() {
    return this.length * this.length;
  }
}

/* 静态成员继承 */

class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }
  getArea() {
    return this.length * this.width;
  }
  static create(length, width) {
    return new Rectangle(length, width);
  }
}
class Square extends Rectangle {
  constructor(length) {
    super(length, length);
  }
}
var rect = Square.create(3, 4);
console.log(rect instanceof Rectangle); // true
console.log(rect.getArea()); // 12
console.log(rect instanceof Square); // false

/* 派生自表达式的类 */

// 动态确认类的继承目标
function Rectangle(length, width) {
  this.length = length;
  this.width = width;
}
Rectangle.prototype.getArea = function() {
  return this.length * this.width;
};
function getBase() {
  return Rectangle;
}
class Square extends getBase() {
  constructor(length) {
    super(length, length);
  }
}
var x = new Square(3);
console.log(x.getArea()); // 9
console.log(x instanceof Rectangle); // true

// mixin
let SerializableMixin = {
  serialze() {
    return JSON.stringify(this);
  }
};
let AreaMixin = {
  getArea() {
    return this.length * this.width;
  }
};
function mixin(...mixins) {
  var base = function() {};
  Object.assign(base.prototype, ...mixins);
  return base;
}
class Square extends mixin(AreaMixin, SerializableMixin) {
  constructor(length) {
    super();
    this.length = length;
    this.width = length;
  }
}
var x = new Square(3);
console.log(x.getArea()); // 9
console.log(x.serialze()); // "{"length":3,"width":3}"

/* 内建对象的继承 */

class MyArray extends Array {
  // ...
}
var colors = new Array();
colors[0] = "red";
console.log(colors.length); // 1
colors.length = 0;
console.log(colors[0]); // undefined

/* Symbol.species属性 */

class MyArray extends Array {
  // ...
}
let items = new MyArray(1, 2, 3, 4),
  subitems = items.slice(1, 3);
console.log(items instanceof MyArray); // true
console.log(subitems instanceof MyArray); // true

// 几个内建类型像这样使用species
class MyClass {
  static get [Symbol.species]() {
    return this;
  }
  constructor(value) {
    this.value = value;
  }
  clone() {
    return new this.constructor[Symbol.species](this.value);
  }
}

// 例子
class MyClass {
  static get [Symbol.species]() {
    return this;
  }
  constructor(value) {
    this.value = value;
  }
  clone() {
    return new this.constructor[Symbol.species](this.value);
  }
}
class MyDerivedClass1 extends MyClass {
  // ...
}
class MyderivedClass2 extends MyClass {
  static get [Symbol.species]() {
    return MyClass;
  }
}
let instance1 = new MyDerivedClass1("foo"),
  clone1 = instance1.clone(),
  instance2 = new MyDerivedClass2("bar"),
  clone2 = instance2.clone();``
console.log(clone1 instanceof MyClass); // true
console.log(clone1 instanceof MyDerivedClass1); // true
console.log(clone2 instanceof MyClass); // true
console.log(clone2 instanceof MyDerivedClass2); // false

/* 在类的构造函数中只用new.target */

class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}
class Square extends Rectangle {
  constructor(length) {
    super length, length);
  }
}
var obj = new Rectangle(3, 4); // false

// 抽象基类
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error("这个类不能直接被初始化。");
    }
  }
}
class Rectangle extends Shape {
  constructor(length, width) {
    super();
    this.width = width;
    this.length = length;
  }
}
var x = new Shape(); // 抛出错误
var y = new Rectangle(3, 4);
console.log(y instanceof Shape); // true