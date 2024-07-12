const fs = require("fs");
const readline = require("readline");
const env = require("../../env");
const db = require("../config/db.config");
const User = db.User;

// Function to set nested properties
const setNestedProperty = (obj, path, value) => {
  const keys = path.split(".");
  let current = obj;
  while (keys.length > 1) {
    const key = keys.shift();
    if (!current[key]) {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[0]] = value;
};

// Function to parse CSV and store data in batches
const parseCSVAndStore = async (csvFilePath) => {
  const fileStream = fs.createReadStream(csvFilePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let headers = [];
  let usersBatch = [];
  const batchSize = env.batchSize;

  for await (const line of rl) {
    if (headers.length === 0) {
      headers = line.split(",").map((header) => header.trim());
    } else {
      const columns = line.split(",").map((column) => column.trim());
      const user = {
        firstName: "",
        lastName: "",
        age: 0,
        address: {},
        additional_info: {},
      };

      headers.forEach((header, index) => {
        const value = columns[index];

        if (header.startsWith("name.")) {
          const nameField = header.split(".")[1];
          if (nameField === "firstName") {
            user.firstName = value;
          } else if (nameField === "lastName") {
            user.lastName = value;
          }
        } else if (header === "age") {
          user.age = parseInt(value, 10);
        } else if (header.startsWith("address.")) {
          setNestedProperty(
            user.address,
            header.split(".").slice(1).join("."),
            value
          );
        } else {
          setNestedProperty(user.additional_info, header, value);
        }
      });

      usersBatch.push(user);

      if (usersBatch.length >= batchSize) {
        await User.bulkCreate(usersBatch);
        usersBatch = [];
      }
    }
  }

  if (usersBatch.length > 0) {
    await User.bulkCreate(usersBatch);
  }
};

module.exports = { parseCSVAndStore };
