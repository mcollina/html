const escapeCharacters = {
  '"': "&quot;",
  "'": "&apos;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
};

const escapeRegExp = new RegExp(
  `[${Object.keys(escapeCharacters).join("")}]`,
  "gv",
);

const stringify = (expression) =>
  typeof expression === "string"
    ? expression
    : Array.isArray(expression)
    ? expression.join("")
    : expression?.toString() ?? "";

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

  const lastElementIndex = literals.length - 1;
  let acc = "";

  for (let i = 0; i < lastElementIndex; ++i) {
    let lit = literals[i];
    let str = stringify(expressions[i]);

    if (lit && lit[lit.length - 1] === "!") {
      lit = lit.slice(0, -1);
    } else if (str) {
      str = str.replace(escapeRegExp, (match) => escapeCharacters[match]);
    }

    acc += lit += str;
  }

  acc += literals[lastElementIndex];

  return acc;
};

export { html };
