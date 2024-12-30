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
      message: "User ID is required to delete a user",
    });
  }

  let connection;

  try {
    connection = await getConnection();

    const checkUserQuery = `SELECT * FROM USER WHERE ID = ?`;
    const [existingUser] = await connection.execute(checkUserQuery, [id]);

    if (existingUser.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    const deleteQuery = `DELETE FROM USER WHERE ID = ?`;
    await connection.execute(deleteQuery, [id]);

    return res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting user:", error);
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
