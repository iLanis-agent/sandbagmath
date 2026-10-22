// Sandbag Math engine: courses for a wall height, bags for a run, the weight of the fill, and the cost per foot of run. Exact integers (hundredths where shown), half-up on display only. Every number is the owner's own entry off the tape and the supplier ticket.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _HGT = "the wall height must be from 1 to 240 inches with no decimal places";
var _CRS = "the course height must be from 1 to 24 inches with no decimal places";
var _LEN = "the run must be from 1 to 10000 ft with no decimal places";
var _NC = "the course count must be from 1 to 100 with no decimal places";
var _BL = "the bag length must be from 1 to 120 inches with no decimal places";
var _NB = "the bag count must be from 1 to 100000000 with no decimal places";
var _LB = "the fill weight must be from 1 to 200 lb with no decimal places";
var _PRICE = "the price must be from 0.01 to 10000 dollars with at most two decimal places";
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _hu(n, d) { return Math.floor((2 * n + d) / (2 * d)); }
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }
function _pl(n, one, many) { return n + (n === 1 ? one : many); }

function courseTruth(hgt, crs) {
  var h = _i(hgt, _HGT, 3, 1, 240), c = _i(crs, _CRS, 2, 1, 24);
  var n = Math.floor((h + c - 1) / c);
  return "A wall " + h + " inches tall in courses of " + c + " inches takes " + _pl(n, " course", " courses") + ".";
}
function bagsTruth(lenft, courses, baglen) {
  var l = _i(lenft, _LEN, 5, 1, 10000), n = _i(courses, _NC, 3, 1, 100), b = _i(baglen, _BL, 3, 1, 120);
  var per = Math.floor((l * 12 + b - 1) / b);
  return "The " + l + " ft run in bags " + b + " inches long takes " + _pl(per, " bag", " bags") + " a course, " + _pl(per * n, " bag", " bags") + " over " + _pl(n, " course", " courses") + ".";
}
function weightTruth(bags, lb) {
  var n = _i(bags, _NB, 9, 1, 100000000), w = _i(lb, _LB, 3, 1, 200);
  var total = n * w;
  return "The " + _pl(n, " bag", " bags") + " at " + w + " lb hold " + total + " lb, or " + _dec(_hu(total * 100, 2000), 2) + " tons.";
}
function costTruth(bags, price, fee, lenft) {
  var n = _i(bags, _NB, 9, 1, 100000000), p = _p(price, _PRICE, 5, 2, 1, 1000000);
  var f = _p(fee, _PRICE, 5, 2, 1, 1000000), l = _i(lenft, _LEN, 5, 1, 10000);
  var cents = n * p + f, per = _hu(cents, l);
  return "The " + _pl(n, " bag", " bags") + " at $" + _dec(p, 2) + " and $" + _dec(f, 2) + " delivery cost $" + _money(cents) + ", or $" + _money(per) + " a foot over the " + l + ".";
}
