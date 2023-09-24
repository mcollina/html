const utf8Decoder = new TextDecoder("utf-8");
const fileCache = new Map();

/**
 * @param {string} path
 * @returns {string}
 */
const includeFile = (path) => {
  let file = fileCache.get(path);

  if (file === undefined) {
    file = utf8Decoder.decode(Deno.readFileSync(path));
    fileCache.set(path, file);
  }

  return file;
};

export { includeFile };
