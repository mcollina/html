import { readFileSync } from "node:fs";

const fileCache = {};

/**
 * @returns {string}
 */
const includeFile = function (path) {
  if (typeof path !== "string") {
    throw new TypeError("`path` must be a string!");
  }

  return (fileCache[path] ??= readFileSync(path, "utf-8"));
};

export { includeFile };
