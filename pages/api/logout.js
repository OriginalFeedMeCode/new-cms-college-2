import { getConnection } from "@Utils/ConnectionUtil";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: "failed", message: "Method Not Allowed" });
  }

  const { loginId } = req.body;

  if (!loginId) {
    return res.status(400).json({
      status: "failed",
      message: "loginId is required for logout",
    });
  }

  let connection;

  try {
    connection = await getConnection();

    const logoutTime = new Date();
    const updateQuery = `UPDATE LOGIN_DETAILS SET LOGOUT_TIME = ? WHERE ID = ?`;
    await connection.execute(updateQuery, [logoutTime, loginId]);
    return res.status(200).json({
      status: "success",
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({
      status: "failed",
      message: "An error occurred while processing the logout",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
