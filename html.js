const escapeChars = {
  '"': "&quot;",
  "'": "&apos;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
};

const escapeRegExp = new RegExp(`[${Object.keys(escapeChars).join("")}]`, "gv");

/**
 * @returns {string}
 */
const html = function ({ raw: literals }, ...expressions) {
  return literals.reduce((acc, lit, i) => {
    let str = Array.isArray(expressions[i - 1])
      ? expressions[i - 1].join("")
      : expressions[i - 1]?.toString() ?? "";

    if (literals[i - 1] && literals[i - 1].endsWith("!")) {
      acc = acc.slice(0, -1);
    } else {
      str &&= str.replaceAll(escapeRegExp, (match) => escapeChars[match]);
    }

    return acc + str + lit;
  });
};

export { html };
