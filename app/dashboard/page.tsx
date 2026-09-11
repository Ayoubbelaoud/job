import { auth } from "@/lib/auth";
import { initializeUserBoard } from "@/lib/init-user-board";
import { getBoardData } from "@/lib/board";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const userId = Number(session.user.id);

  // 1. جلب أو تهيئة الـ Board
  const board = await initializeUserBoard(userId);

  // 2. جلب البيانات كاملة (Columns + Jobs) عبر الدالة الجديدة
  const columns = await getBoardData(board.id, userId);

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold mb-6">{board.name}</h1>

      {/* عرض Kanban Columns */}
      <div className="flex gap-4 overflow-x-auto">
        {columns.map((col) => (
          <div key={col.id} className="w-72 bg-gray-100 p-4 rounded-xl flex-shrink-0">
            <h2 className="font-semibold text-lg mb-3">{col.name} ({col.jobs.length})</h2>
            
            <div className="space-y-2">
              {col.jobs.map((job: any) => (
                <div key={job.id} className="bg-white p-3 rounded-lg shadow-sm border">
                  <p className="font-medium">{job.company_name}</p>
                  <p className="text-sm text-gray-500">{job.position_title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}