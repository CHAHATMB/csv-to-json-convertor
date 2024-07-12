const db = require("../config/db.config");

const getAgeDistribution = async () => {
  try {
    // SQL query to calculate age distribution
    const [results, metadata] = await db.sequelize.query(`
        SELECT
          SUM(CASE WHEN age < 20 THEN 1 ELSE 0 END) AS "<20",
          SUM(CASE WHEN age >= 20 AND age <= 40 THEN 1 ELSE 0 END) AS "20-40",
          SUM(CASE WHEN age > 40 AND age <= 60 THEN 1 ELSE 0 END) AS "40-60",
          SUM(CASE WHEN age > 60 THEN 1 ELSE 0 END) AS ">60",
          COUNT(*) AS total
        FROM users;
      `);

    // Extracting the results
    const ageGroupCounts = results[0];

    // Calculate the percentage distribution for each age group
    const ageGroupDistribution = {
      "<20": ((ageGroupCounts["<20"] / ageGroupCounts["total"]) * 100).toFixed(
        2
      ),
      "20-40": (
        (ageGroupCounts["20-40"] / ageGroupCounts["total"]) *
        100
      ).toFixed(2),
      "40-60": (
        (ageGroupCounts["40-60"] / ageGroupCounts["total"]) *
        100
      ).toFixed(2),
      ">60": ((ageGroupCounts[">60"] / ageGroupCounts["total"]) * 100).toFixed(
        2
      ),
    };

    // Print the age distribution table
    console.log(
      "########################## Age Distribution Table ##########################"
    );
    console.log("Age-Group  |  % Distribution");
    console.log(`  < 20     |   ${ageGroupDistribution["<20"]}`);
    console.log(`20 to 40   |   ${ageGroupDistribution["20-40"]}`);
    console.log(`40 to 60   |   ${ageGroupDistribution["40-60"]}`);
    console.log(`  > 60     |   ${ageGroupDistribution[">60"]}`);
    return ageGroupDistribution;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

module.exports = getAgeDistribution;
