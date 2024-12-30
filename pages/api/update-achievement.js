import { getConnection } from "@Utils/ConnectionUtil";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: "failed", message: "Method Not Allowed" });
  }

  const {
    id,
    title,
    description,
    name,
    media,
    subtitle,
    country,
    content,
    locale = "en",
    status = "P",
    createdBy,
    mainMediaType,
    mainMediaVideo,
    mainMediaImage,
  } = req.body;

  if (
    !id ||
    !title ||
    !description ||
    !name ||
    !media.length ||
    !subtitle ||
    !country ||
    !content ||
    !createdBy ||
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

    const updateQuery = `
      UPDATE ACHIEVEMENT 
      SET 
        TITLE = ?, 
        DESCRIPTION = ?, 
        NAME = ?, 
        MEDIA = ?, 
        SUBTITLE = ?, 
        COUNTRY = ?, 
        CONTENT = ?, 
        LOCALE = ?, 
        STATUS = ?, 
        CREATED_BY = ?, 
        MAIN_MEDIA_TYPE = ?, 
        MAIN_MEDIA_VIDEO = ?, 
        MAIN_MEDIA_IMAGE = ? 
      WHERE ID = ?
    `;

    const [result] = await connection.execute(updateQuery, [
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
      mainMediaType,
      mainMediaVideo,
      mainMediaImage,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "Achievement not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Achievement updated successfully",
    });
  } catch (error) {
    console.error("Error while updating achievement:", error);
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
