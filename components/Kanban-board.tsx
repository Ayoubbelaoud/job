import { Calendar, Send, UserCheck, CheckCircle2, Ban, Plus, MoreVertical } from "lucide-react";
import { ColumnWithJobs, JobApplication } from "@/lib/board";

interface Board {
  id: number;
  name: string;
  user_id: number;
}

interface KanbanBoardProps {
  board: Board;
  columns: ColumnWithJobs[];
  userId: number;
}

const COLUMN_STYLE_MAP: Record<
  string,
  { bg: string; text: string; icon: React.ReactNode }
> = {
  "Wish List": {
    bg: "bg-[#00A8CC]",
    text: "text-white",
    icon: <Calendar className="w-4 h-4" />,
  },
  "Applied": {
    bg: "bg-[#9A26FD]",
    text: "text-white",
    icon: <Send className="w-4 h-4" />,
  },
  "Interviewing": {
    bg: "bg-[#09C349]",
    text: "text-white",
    icon: <UserCheck className="w-4 h-4" />,
  },
  "Offer": {
    bg: "bg-[#FBBC05]",
    text: "text-white",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  "Rejected": {
    bg: "bg-[#F32013]",
    text: "text-white",
    icon: <Ban className="w-4 h-4" />,
  },
};



const DEFAULT_STYLE = {
  bg: "bg-gray-500",
  text: "text-white",
  icon: <Calendar className="w-4 h-4" />,
};

export function KanbanBoard({ board, columns, userId }: KanbanBoardProps) {
    const colu
  return (
    
  );
}