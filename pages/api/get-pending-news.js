import { getConnection } from "@Utils/ConnectionUtil";

export default async (req, res) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ status: "failed", message: "Method Not Allowed" });
  }

  let connection;
  try {
    connection = await getConnection();

    const selectQuery = `
      SELECT
        ID, TITLE, IMG, DESCRIPTION, COUNTRY, PUBLISH_DATE, SOURCE_URL, 
        STATUS, APPROVED_BY
      FROM ARTICLES WHERE STATUS = "P" ORDER BY ID DESC
    `;

    const [articles] = await connection.execute(selectQuery);

    if (articles.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "No Pending Found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Articles fetched successfully",
      data: articles,
    });
  } catch (error) {
    console.error("Error while fetching articles:", error);
    return res.status(500).json({
      status: "failed",
      message: "An error occurred while processing the request",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
