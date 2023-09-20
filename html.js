const escapeChars = {
  '"': "&quot;",
  "'": "&apos;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
};

const escapeRegExp = new RegExp(`[${Object.keys(escapeChars).join("")}]`, "gv");

/**
 * @param {{ raw: string[] }} literals
 * @param  {...any} expressions
 * @returns {string}
 */
const html = ({ raw: literals }, ...expressions) => {
  let length = literals.length;

  switch (length) {
    case 0:
      return "";
    case 1:
      return literals[0];
  }

  --length;

  let acc = "";

  for (let i = 0; i < length; ++i) {
    let lit = literals[i];
    let str = Array.isArray(expressions[i])
      ? expressions[i].join("")
      : expressions[i]?.toString() ?? "";

    if (lit && lit[lit.length - 1] === "!") {
      lit = lit.slice(0, -1);
    } else if (str) {
      str = str.replace(escapeRegExp, (match) => escapeChars[match]);
    }

    acc += lit += str;
  }

  acc += literals[length];

  return acc;
};

export { html };
