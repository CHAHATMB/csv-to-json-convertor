const db = require("../config/db.config");
const { parseCSVAndStore } = require("../util/csv.util");
const getAgeDistribution = require("../util/get-age-distribution");
const env = require("../../env");

const createUser = async (req, res) => {
  let filepath = env.csvfile;
  if (req.body.csvFilePath) {
    filepath = req.body.csvFilePath;
  }
  try {
    await parseCSVAndStore(filepath);
    await getAgeDistribution();
    res.status(200).json({
      status: "Success!",
      message: "User created from csv file!",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail!",
      error: error.message,
    });
  }
};

const getAgeDistribution = async (req, res) => {
  try {
    const data = await getAgeDistribution();
    res.status(200).json({
      status: "Success!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail!",
      error: error.message,
    });
  }
};

module.exports = { getAgeDistribution, createUser };
