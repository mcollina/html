const escapeDictionary = {
  '"': "&quot;",
  "'": "&apos;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
};

const escapeRegExp = new RegExp(
  `[${Object.keys(escapeDictionary).join("")}]`,
  "gv",
);

const escapeFunction = (key) => escapeDictionary[key];

/**
 * @param {{ raw: string[] }} literals
 * @param {...*} expressions
 * @returns {string}
 */
const html = ({ raw: literals }, ...expressions) => {
  if (literals.length === 0) return "";

  const lastLitI = literals.length - 1;
  let acc = "";

  for (let i = 0; i < lastLitI; ++i) {
    let lit = literals[i];
    let exp =
      typeof expressions[i] === "string"
        ? expressions[i]
        : expressions[i] == null
          ? ""
          : Array.isArray(expressions[i]) === true
            ? expressions[i].join("")
            : `${expressions[i]}`;

    if (lit.length !== 0 && lit.charCodeAt(lit.length - 1) === 33) {
      lit = lit.slice(0, -1);
    } else if (exp.length !== 0) {
      exp = exp.replace(escapeRegExp, escapeFunction);
    }

    acc += lit += exp;
  }

  acc += literals[lastLitI];

  return acc;
};

export { html };
