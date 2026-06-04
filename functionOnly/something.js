const first = (x) => (y) => y;
const second = (x) => (y) => x;

const not = (f) => f(first)(second);
const or = (f) => (g) => f(f)(g);
const and = (f) => (g) => f(g)(f);

const zero = (f) => (x) => x;
const one = (f) => (x) => f(x);
const two = (f) => (x) => f(f(x));
const three = (f) => (x) => f(two(f)(x));
const four = (f) => (x) => f(three(f)(x));
const five = (f) => (x) => f(four(f)(x));
const six = (f) => (x) => f(five(f)(x));

const add = (a) => (b) => (f) => (x) => a(f)(b(f)(x));

const multiply = (a) => (b) => (f) => (x) => b(a(f))(x);

const toInt = (num) => num((x) => x + 1)(0);
