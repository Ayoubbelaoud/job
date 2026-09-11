import { query } from "@/lib/db";

// دالة تجيب الأعمدة والوظائف الخاصة بـ Board معين
export async function getBoardData(boardId: number, userId: number) {
  try {
    // 1. جلب الأعمدة مرتبة
    const columnsRes = await query(
      'SELECT * FROM columns WHERE board_id = $1 ORDER BY "order" ASC',
      [boardId]
    );

    // 2. جلب جميع طلبات الشغل للمستخدم
    const jobsRes = await query(
      'SELECT * FROM job_applications WHERE user_id = $1 ORDER BY "order" ASC',
      [userId]
    );

    // 3. دمج الوظائف داخل كل عمود مناظر ليها
    const columnsWithJobs = columnsRes.rows.map((column) => ({
      ...column,
      jobs: jobsRes.rows.filter((job) => job.column_id === column.id),
    }));

    return columnsWithJobs;
  } catch (error) {
    console.error("Error fetching board data:", error);
    throw error;
  }
}