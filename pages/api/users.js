import { getConnection } from "@Utils/ConnectionUtil";

export default async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const query = "SELECT * FROM USER ORDER BY ID DESC";
    const [rows] = await connection.execute(query);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "Users not found" });
    }

    let users = rows.map((user) => {
      const { ID: userId, NAME, ROLE } = user;
      return { userId, name: NAME, role: ROLE };
    });
    return res.status(200).json({
      status: "success",
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      status: "failed",
      message: "An error occurred while fetching users",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
