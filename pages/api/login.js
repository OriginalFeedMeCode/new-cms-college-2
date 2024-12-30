import { getConnection } from "@Utils/ConnectionUtil";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: "failed", message: "Method Not Allowed" });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: "failed",
      message: "Required data missing in the request body",
    });
  }
  let connection;
  try {
    connection = await getConnection();
    const query = `SELECT * FROM USER WHERE EMAIL = ? ORDER BY ID DESC LIMIT 1`;
    const queryParams = [email];
    const [rows] = await connection.execute(query, queryParams);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }
    const user = rows[0];
    if (user.PASSWORD !== password) {
      return res
        .status(401)
        .json({ status: "failed", message: "Invalid Credentials" });
    }
    const { ID: userId, NAME, ROLE } = user;
    const loginTime = new Date();
    const insertQuery = `INSERT INTO LOGIN_DETAILS (USER_ID, LOGIN_TIME) VALUES (?, ?)`;
    const [insertResult] = await connection.execute(insertQuery, [
      userId,
      loginTime,
    ]);
    const loginId = insertResult.insertId;
    return res.status(200).json({
      status: "success",
      message: "User authenticated successfully",
      data: {
        userId,
        name: NAME,
        role: ROLE,
        loginId,
      },
    });
  } catch (error) {
    console.error("Error during user authentication:", error);
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
