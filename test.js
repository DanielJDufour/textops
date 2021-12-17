const test = require("flug");
const { run } = require("./textops");

test("delprevchar", ({ eq }) => {
  const text = "ABCDEF<delprevchar>";
  const result = run({ debug: false, text });
  eq(result, { text: "ABCDE" });
});

test("run with ops delnext", ({ eq }) => {
  const result = run({ ops: ["delnext"], text: "<delnext>ABCDEF<delprevchar>" });
  eq(result, { text: "" });
});

test("run with ops delprevchar", ({ eq }) => {
  const result = run({ ops: ["delprevchar"], text: "<delnext>ABCDEF<delprevchar>" });
  eq(result, { text: "<delnext>ABCDE" });
});

test("example: delprev", ({ eq }) => {
  const result = run({
    text: "January, February, March, <delprev>April, May, June, July, August, September, October, November, December"
  });
  eq(result, { text: "April, May, June, July, August, September, October, November, December" });
});

test("example: delnext", ({ eq }) => {
  const result = run({
    text: "January, February, March<delnext>, April, May, June, July, August, September, October, November, December"
  });
  eq(result, { text: "January, February, March" });
});

test("example: unquote", ({ eq }) => {
  const result = run({ text: `"<delprevchar>hello, world<delnextchar>"` });
  eq(result, { text: `hello, world` });
});

test("example: delete everything", ({ eq }) => {
  const result = run({ text: "Hello, world.<delprev>" });
  eq(result, { text: "" });
});

test("example: uid", ({ eq }) => {
  const result = run({ debug: false, text: "<delnextchar-5678>Hello, world.<delprev>", uid: 5678 });
  eq(result, { text: "ello, world.<delprev>" });
});

test("example: specific op", ({ eq }) => {
  const result = run({ ops: ["delprevchar"], text: "<delnext>ABCDEF<delprevchar>" });
  eq(result, { text: "<delnext>ABCDE" });
});
