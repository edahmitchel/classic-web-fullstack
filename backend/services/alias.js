const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");

const customConfig = {
  dictionaries: [adjectives, colors, animals],
  separator: "",
  length: 2,
};
const shortName = uniqueNamesGenerator(customConfig); // big-donkey
