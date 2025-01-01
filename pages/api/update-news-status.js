import { getConnection } from "@Utils/ConnectionUtil";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: "failed", message: "Method Not Allowed" });
  }

  const { id, status, approvedBy } = req.body;

  if (!id || status === undefined || approvedBy === undefined) {
    return res.status(400).json({
      status: "failed",
      message: "Achievement ID, status, and approvedBy are required",
    });
  }

  let connection;
  try {
    connection = await getConnection();
    const updateQuery = `
      UPDATE ARTICLES SET STATUS = ?, APPROVED_BY = ? WHERE ID = ?
    `;
    const queryParams = [status, approvedBy, id];
    const [result] = await connection.execute(updateQuery, queryParams);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "failed",
        message: "News not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "News status and approval updated successfully",
    });
  } catch (error) {
    console.error("Error while updating news status:", error);
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
