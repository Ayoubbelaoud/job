
import { query } from "@/lib/db";

const DEFAULT_COLUMNS = [
  { name: "Wish List", order: 0 },
  { name: "Applied", order: 1 },
  { name: "Interviewing", order: 2 },
  { name: "Offer", order: 3 },
  { name: "Rejected", order: 4 },
];

export async function initializeUserBoard(userId: number) {
  try {
    // 1. التحقق واش الـ Board كاين
    const existingBoard = await query(
      "SELECT * FROM boards WHERE user_id = $1 AND name = $2",
      [userId, "Job Hunt"]
    );

    if (existingBoard.rows.length > 0) {
      return existingBoard.rows[0];
    }

    // 2. إنشاء Board جديد
    const newBoard = await query(
      "INSERT INTO boards (name, user_id) VALUES ($1, $2) RETURNING *",
      ["Job Hunt", userId]
    );

    const boardId = newBoard.rows[0].id;

    // 3. إنشاء الأعمدة الافتراضية للـ Board
    for (const col of DEFAULT_COLUMNS) {
      await query(
        'INSERT INTO columns (name, board_id, "order") VALUES ($1, $2, $3)',
        [col.name, boardId, col.order]
      );
    }

    return newBoard.rows[0];
  } catch (error) {
    console.error("Error initializing user board:", error);
    throw error;
  }
}