import { getConnection } from "@Utils/ConnectionUtil";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: "failed", message: "Method Not Allowed" });
  }
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      status: "failed",
      message: "Required data missing in the request body",
    });
  }

  let connection;
  try {
    connection = await getConnection();

    const selectQuery = `
      SELECT
        *
      FROM ARTICLES WHERE ID = ?
    `;

    const [articles] = await connection.execute(selectQuery, [id]);

    if (articles.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "No articles found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Articles fetched successfully",
      data: articles[0],
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
