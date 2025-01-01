import { getConnection } from "@Utils/ConnectionUtil";
import { parse } from "date-fns";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: "failed", message: "Method Not Allowed" });
  }

  const {
    title,
    img,
    description,
    content,
    country,
    publishedDate,
    sourceUrl,
    createdBy,
    status = "P",
  } = req.body;

  console.log(req.body);

  if (
    !title ||
    !img ||
    !description ||
    !content ||
    !country ||
    !publishedDate ||
    !sourceUrl ||
    !createdBy
  ) {
    return res.status(400).json({
      status: "failed",
      message: "Required data missing in the request body",
    });
  }

  const date = parse(publishedDate, "yyyy-MM-dd", new Date());

  let connection;
  try {
    connection = await getConnection();
    const insertQuery = `
      INSERT INTO ARTICLES (
        TITLE, IMG, DESCRIPTION, CONTENT, COUNTRY, PUBLISH_DATE, SOURCE_URL,
        CREATED_BY, STATUS
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await connection.execute(insertQuery, [
      title,
      img,
      description,
      content,
      country,
      date,
      sourceUrl,
      createdBy,
      status,
    ]);

    return res.status(200).json({
      status: "success",
      message: "Article added successfully",
    });
  } catch (error) {
    console.error("Error while adding article:", error);
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
