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
const html = ({ raw: literals }, ...expressions) =>
  literals.reduce((acc, lit, i) => {
    --i;

    let str = Array.isArray(expressions[i])
      ? expressions[i].join("")
      : expressions[i]?.toString() ?? "";

    if (literals[i] && literals[i].endsWith("!")) {
      acc = acc.slice(0, -1);
    } else {
      str &&= str.replaceAll(escapeRegExp, (match) => escapeChars[match]);
    }

    return acc + str + lit;
  });

export { html };
