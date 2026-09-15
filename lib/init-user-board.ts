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
    let board;
    const existingBoard = await query(
      "SELECT * FROM boards WHERE user_id = $1 AND name = $2",
      [userId, "Job Hunt"]
    );

    if (existingBoard.rows.length > 0) {
      board = existingBoard.rows[0];
    } else {
      // 2. إنشاء Board جديد
      const newBoard = await query(
        "INSERT INTO boards (name, user_id) VALUES ($1, $2) RETURNING *",
        ["Job Hunt", userId]
      );
      board = newBoard.rows[0];
    }

    // 3. التحقق واش الأعمدة كاينين للـ Board الحالي
    const existingColumns = await query(
      "SELECT * FROM columns WHERE board_id = $1",
      [board.id]
    );

    // 4. إنشاء الأعمدة الافتراضية إلا كان الطابلو خاوي
    if (existingColumns.rows.length === 0) {
      for (const col of DEFAULT_COLUMNS) {
        await query(
          'INSERT INTO columns (name, board_id, "order") VALUES ($1, $2, $3)',
          [col.name, board.id, col.order]
        );
      }
    }

    return board;
  } catch (error) {
    console.error("Error initializing user board:", error);
    throw error;
  }
}