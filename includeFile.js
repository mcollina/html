import { readFileSync } from "node:fs";

const fileCache = new Map();

/**
 * @returns {string}
 */
const includeFile = function (path) {
  if (typeof path !== "string") {
    throw new TypeError("`path` must be a string!");
  }

  let file = fileCache.get(path);

  if (file === undefined) {
    fileCache.set(path, (file = readFileSync(path, "utf-8")));
  }

  return file;
};

export { includeFile };
