import { readFileSync } from "node:fs";

const readFileSyncOpts = { encoding: "utf-8" };

const fileCache = new Map();

/**
 * @param {string} path
 * @returns {string}
 */
const includeFile = (path) => {
  let file = fileCache.get(path);

  if (file === undefined) {
    file = readFileSync(path, readFileSyncOpts);
    fileCache.set(path, file);
  }

  return file;
};

export { includeFile };
