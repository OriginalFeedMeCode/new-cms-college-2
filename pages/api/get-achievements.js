import { getConnection } from "@Utils/ConnectionUtil";

export default async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const query =
      "SELECT ID, TITLE, NAME, SUBTITLE, COUNTRY, STATUS, MAIN_MEDIA_IMAGE FROM ACHIEVEMENT ORDER BY ID DESC";
    const [rows] = await connection.execute(query);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "Achievement not found" });
    }

    let acheivements = rows.map((a) => {
      const {
        ID: id,
        TITLE: title,
        NAME: name,
        SUBTITLE: subtitle,
        COUNTRY: country,
        STATUS: status,
        MAIN_MEDIA_IMAGE: mmi,
      } = a;
      return { id, title, name, subtitle, country, status, mmi };
    });
    return res.status(200).json({
      status: "success",
      message: "Achievements fetched successfully",
      data: acheivements,
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
