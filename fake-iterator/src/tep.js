function* generator() {
  let val = 0;
  while (true) {
    const step = yield val;
    if (step) {
      val += step;
    }
  }
}
