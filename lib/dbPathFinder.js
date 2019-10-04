const dbPath = "db/";
const dbFileFormat = ".json";
const dbFileCollectionPrefix = "todoCollection_";

module.exports.userFilePathConstructor = userId => {
  let path = dbPath + dbFileCollectionPrefix + userId + dbFileFormat;
  return path;
};
