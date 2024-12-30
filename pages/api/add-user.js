import { getConnection } from "@Utils/ConnectionUtil";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: "failed", message: "Method Not Allowed" });
  }

  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({
      status: "failed",
      message: "Required data missing in the request body",
    });
  }

  let connection;

  try {
    connection = await getConnection();

    const checkUserQuery = `SELECT * FROM USER WHERE EMAIL = ?`;
    const [existingUser] = await connection.execute(checkUserQuery, [
      email.toLowerCase(),
    ]);

    if (existingUser.length > 0) {
      return res.status(409).json({
        status: "failed",
        message: "User already exists with the given email",
      });
    }

    const insertQuery = `INSERT INTO USER (NAME, EMAIL, PASSWORD, ROLE) VALUES (?, ?, ?, ?)`;
    const [result] = await connection.execute(insertQuery, [
      name,
      email.toLowerCase(),
      password,
      role,
    ]);

    return res.status(200).json({
      status: "success",
      message: "User added successfully",
      data: { userId: result.insertId },
    });
  } catch (error) {
    console.error("Error while adding user:", error);
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
