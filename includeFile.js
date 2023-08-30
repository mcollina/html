import { readFileSync } from "node:fs";

const fileCache = new Map();

/**
 * @param {string} path
 * @returns {string}
 */
const includeFile = (path) => {
  let file = fileCache.get(path);

  if (file === undefined) {
    file = readFileSync(path, "utf-8");
    fileCache.set(path, file);
  }

  return file;
};

export { includeFile };
