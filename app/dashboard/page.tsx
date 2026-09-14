import { auth } from "@/lib/auth";
import { initializeUserBoard } from "@/lib/init-user-board";
import { getBoardData } from "@/lib/board";
import { redirect } from "next/navigation";
import { KanbanBoard } from "@/components/Kanban-board";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const userId = Number(session.user.id);

  const board = await initializeUserBoard(userId);
  const columns = await getBoardData(board.id, userId);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{board.name}</h1>
          <p className="text-gray-600">Track your job applications</p>
        </div>

        <KanbanBoard board={board} columns={columns} userId={userId} />
      </div>
    </div>
  );
}