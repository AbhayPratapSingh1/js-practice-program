const myMap = function (mapper) {
  const data = [];
  for (let index = 0; index < this.length; index++) {
    data.push(mapper(this[index], index, this));
  }
  return data;
};

const fn = (v, i) => v + i;
console.log(arr);
