const { AnonymousId } = require("../models/anonymousIdModel");

const generateUniqueId = async () => {
  const prefix = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const suffix = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let uniqueId;
  let isUnique = false;

  while (!isUnique) {
    const randomPrefix = prefix[Math.floor(Math.random() * prefix.length)];
    const randomSuffix = suffix[Math.floor(Math.random() * suffix.length)];
    uniqueId = `${randomPrefix}${randomSuffix}`;

    // Check if the generated ID is unique
    const anonymousId = await AnonymousId.findOne({ anonymousId: uniqueId });
    if (!anonymousId) {
      isUnique = true;
    }
  }

  return uniqueId;
};
module.exports = { generateUniqueId };
