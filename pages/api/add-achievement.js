import { getConnection } from "@Utils/ConnectionUtil";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: "failed", message: "Method Not Allowed" });
  }
  const {
    title,
    description,
    name,
    media,
    subtitle = "N/A",
    country,
    content,
    locale = "en",
    status = "P",
    createdBy,
    createdDate = new Date(),
    mainMediaType,
    mainMediaVideo,
    mainMediaImage,
  } = req.body;

  console.log(req.body);

  if (
    !title ||
    !description ||
    !name ||
    !media ||
    !subtitle ||
    !country ||
    !content ||
    !createdBy ||
    !createdDate ||
    !mainMediaType ||
    !mainMediaVideo ||
    !mainMediaImage
  ) {
    return res.status(400).json({
      status: "failed",
      message: "Required data missing in the request body",
    });
  }

  let connection;
  try {
    connection = await getConnection();
    const insertQuery = `
      INSERT INTO ACHIEVEMENT (
        TITLE, DESCRIPTION, NAME, MEDIA, SUBTITLE, COUNTRY, CONTENT,
        LOCALE, STATUS, CREATED_BY, CREATED_DATE,
        MAIN_MEDIA_TYPE, MAIN_MEDIA_VIDEO, MAIN_MEDIA_IMAGE
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await connection.execute(insertQuery, [
      title,
      description,
      name,
      media,
      subtitle,
      country,
      content,
      locale,
      status,
      createdBy,
      createdDate,
      mainMediaType,
      mainMediaVideo,
      mainMediaImage,
    ]);

    return res.status(200).json({
      status: "success",
      message: "Achievement added successfully",
    });
  } catch (error) {
    console.error("Error while adding achievement:", error);
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
