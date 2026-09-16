"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createJobApplication(formData: FormData) {
  const company = formData.get("company") as string;
  const position = formData.get("position") as string;
  const location = formData.get("location") as string;
  const salary = formData.get("salary") as string;
  const url = formData.get("jobUrl") as string; // مطابقة لـ url فـ DB
  const notes = formData.get("notes") as string;
  
  const columnId = Number(formData.get("columnId"));
  const userId = Number(formData.get("userId"));

  try {
    // حساب الـ order الجديد (إخذه كـ آخر ترتيب + 1)
    const orderRes = await query(
      "SELECT COALESCE(MAX(\"order\"), 0) + 1 AS next_order FROM job_applications WHERE column_id = $1",
      [columnId]
    );
    const nextOrder = orderRes.rows[0].next_order;

    // INSERT بـ أسماء الأعمدة الصحيحة فـ PostgreSQL
    await query(
      `INSERT INTO job_applications 
       (company, position, location, salary, url, notes, "order", column_id, user_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [company, position, location, salary, url, notes, nextOrder, columnId, userId]
    );

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error inserting job application:", error);
    return { success: false, error: "Failed to create application" };
  }
}