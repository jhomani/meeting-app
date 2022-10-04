const dic = {
  1: 4,
  2: 3,
  5: 8,
  8: 4,
  3: 7,
  4: 0,
};

const dep = [];

// const getDependencies = (target = 5) => {
//   if (typeof dic[target] !== 'undefined') {
//     target = dic[target];
//     dep.push(target);
//     getDependencies(target);
//   }
// };

const getDependencies = (target = 5) => {
  while (dic[target] !== undefined) {
    target = dic[target];
    dep.push(target);
  }
};

getDependencies();

console.log(dep);
