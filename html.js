const escapeDict = {
  '"': "&quot;",
  "'": "&apos;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
};

const escapeRegExp = new RegExp(`[${Object.keys(escapeDict).join("")}]`, "gv");

const escapeReplacer = (key) => escapeDict[key];

/**
 * @param {{ raw: string[] }} literals
 * @param {...*} expressions
 * @returns {string}
 */
const html = ({ raw: literals }, ...expressions) => {
  switch (literals.length) {
    case 0:
      return "";
    case 1:
      return literals[0];
  }

  const lastLitIndex = literals.length - 1;
  let acc = "";

  for (let i = 0; i < lastLitIndex; ++i) {
    let lit = literals[i];
    let str =
      typeof expressions[i] === "string"
        ? expressions[i]
        : expressions[i] == undefined
        ? ""
        : Array.isArray(expressions[i])
        ? expressions[i].join("")
        : `${expressions[i]}`;

    if (lit.length > 0 && lit.charAt(lit.length - 1) === "!") {
      lit = lit.slice(0, -1);
    } else if (str.length > 0) {
      str = str.replace(escapeRegExp, escapeReplacer);
    }

    acc += lit += str;
  }

  acc += literals[lastLitIndex];

  return acc;
};

export { html };
