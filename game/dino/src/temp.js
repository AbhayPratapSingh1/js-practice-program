function* count(data) {
  while (true) {
    for (let index = 0; index < data.length; index++) {
      yield data[index];
    }
  }
}

const itr = count([1, 2, 3, 4, 5]);
