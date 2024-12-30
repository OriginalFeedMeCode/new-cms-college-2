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
    const query = "SELECT * FROM ACHIEVEMENT WHERE ID = ?";
    const [rows] = await connection.execute(query, [id]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "Achievement not found" });
    }

    let acheivement = rows[0];
    return res.status(200).json({
      status: "success",
      message: "Achievement fetched successfully",
      data: acheivement,
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
