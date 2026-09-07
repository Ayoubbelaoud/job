// app/actions/auth-actions.ts
"use server";

import bcrypt from "bcryptjs";
import { query } from "@/lib/db";

export async function signUpAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password || !name) {
    return { error: "جميع الحقول مطلوبة" };
  }

  try {
    // 1. التأكد واش الإيميل مسجل من قبل
    const existingUser = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return { error: "هاد الإيميل مستعمل من قبل" };
    }

    // 2. تشفير كلمة السر
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. إدخال المستخدم لـ Postgres
    await query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
      [name, email, hashedPassword]
    );

    return { success: "تم إنشاء الحساب بنجاح!" };
  } catch (error) {
    console.error("Sign up error:", error);
    return { error: "وقع خطأ أثناء إنشاء الحساب" };
  }
}