const sum = function() {
  let total = 0;
  for (var i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
};

const sum2 = function(...args) {
  let total = 0;
  for (var i = 0; i < args.length; i++) {
    total += args[i];
  }
  return total;
};

Function.prototype.myBind = function(context) {
  let fn = this;
  let args = Array.prototype.slice.call(arguments, 1);
  return function() {
    let moreArgs = Array.prototype.slice.call(arguments);
    fn.apply(context, args.concat(moreArgs));
  };
};

Function.prototype.myBind2 = function(context, ...args) {
  let fn = this;
  return function(...moreArgs) {
    fn.apply(context, args.concat(moreArgs));
  };
};

// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//
//   says(sound, person) {
//     console.log(`${this.name} says ${sound} to ${person}!`);
//     return true;
//   }
// }
//
// const markov = new Cat("Markov");
// const breakfast = new Cat("Breakfast");
//
// markov.says.myBind2(breakfast, "meow", "Kush")();
//
// markov.says.myBind2(breakfast)("meow", "a tree");
//
// const notMarkovSays = markov.says.myBind2(breakfast);
// notMarkovSays("meow", "me");

const curriedSum = function(numArgs) {
  const numbers = [];

  function _curriedSum(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      let total = 0;
      numbers.forEach(function(el) {
        total += el;
      });
      return total;
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
};

// const sum1 = curriedSum(4);
// console.log(sum1);
// console.log(sum1(5)(30)(20)(1)); // => 56

Function.prototype.curry = function(numArgs) {
  let numbers = [];
  const fn = this;


  function _curry() {
    let args = Array.prototype.slice.call(arguments);
    numbers = numbers.concat(args);
    if (numbers.length === numArgs) {
      return fn.apply(null, numbers);
    } else {
      return _curry;
    }
  }

  return _curry;
};

Function.prototype.curry2 = function(numArgs) {
  let numbers = [];
  const fn = this;


  function _curry() {
    let args = Array.prototype.slice.call(arguments);
    numbers = numbers.concat(args);
    if (numbers.length === numArgs) {
      // return fn.apply(null, numbers);
      return fn(...numbers);
    } else {
      return _curry;
    }
  }

  return _curry;
};

// function sumThree(num1, num2, num3) {
//   return num1 + num2 + num3;
// }
//
// sumThree(4, 20, 6); // == 30
//
// // you'll write `Function#curry`!
// let f1 = sumThree.curry2(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
// console.log(f1);
// f1 = f1(4); // [Function]
// console.log(f1);
// f1 = f1(20); // [Function]
// console.log(f1);
// f1 = f1(6); // = 30
// console.log(f1);
//
//
// // or more briefly:
// console.log(sumThree.curry2(3)(4)(20)(6)); // == 30
