function Tag({ name, uid }) {
  return `<${name}${uid ? "-" + uid : ""}>`;
}

function runDelPrev({ text, uid }) {
  const tag = Tag({ name: "delprev", uid });
  return text.replaceAll(new RegExp(`.${tag}`, "g"), "");
}

function run({ debug, ops, text, uid }) {
  if (!text) throw new Error("[textops] can't run without text!  Please call like run({ text })");
  if (!["number", "undefined"].includes(typeof uid)) throw new Error(`[textops] for security reasons, uid must be a number or undefined.  You passed in "${typeof uid}"`);
  if (typeof uid === "number" && uid.toString().includes(".")) throw new Error("[textops] for security reasons, uid must be an integer");
  ops ??= ["delprev", "delprevchar", "delnext", "delnextchar"];

  const anychar = ".";
  const op2re = {
    delprev: anychar + "+" + Tag({ name: "delprev", uid }),
    delnext: Tag({ name: "delnext", uid }) + anychar + "+",
    delprevchar: anychar + Tag({ name: "delprevchar", uid }),
    delnextchar: Tag({ name: "delnextchar", uid }) + anychar
  };

  const restr =
    "(" +
    ops
      .map(op => op2re[op])
      .filter(Boolean)
      .join("|") +
    ")";

  if (debug) console.log(`[textops] restr: "${restr}"`);
  const re = new RegExp(restr, "g");
  text = text.replace(re, "");

  return {
    text
  };
}

if (typeof define === "function") define(() => ({ run }));
if (typeof module === "object") module.exports = { run };
