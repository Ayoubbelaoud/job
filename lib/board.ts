import { query } from "@/lib/db";

// 1. تعريف Interface للوظيفة
export interface JobApplication {
  id: number;
  company: string;
  position: string;
  location?: string | null;
  salary?: string | null;
  url?: string | null;
  notes?: string | null;
  order: number;
  column_id: number;
  user_id: number;
  created_at: Date | string;
  updated_at: Date | string;
}

// 2. تعريف Interface للعمود مدموج مع الوظائف
export interface ColumnWithJobs {
  id: number;
  board_id: number;
  name: string;
  order: number;
  created_at: Date | string;
  jobs: JobApplication[];
}

// 3. دالة جلب البيانات من PostgreSQL
export async function getBoardData(
  boardId: number,
  userId: number
): Promise<ColumnWithJobs[]> {
  try {
    const columnsRes = await query(
      'SELECT * FROM columns WHERE board_id = $1 ORDER BY "order" ASC',
      [boardId]
    );

    const jobsRes = await query(
      'SELECT * FROM job_applications WHERE user_id = $1 ORDER BY "order" ASC',
      [userId]
    );

    const allJobs = jobsRes.rows as JobApplication[];

    const columnsWithJobs: ColumnWithJobs[] = columnsRes.rows.map((column) => ({
      ...column,
      jobs: allJobs.filter((job) => job.column_id === column.id),
    }));

    return columnsWithJobs;
  } catch (error) {
    console.error("Error fetching board data:", error);
    throw error;
  }
}