import { Calendar, Send, UserCheck, CheckCircle2, Ban, Plus, MoreVertical, Trash2 } from "lucide-react";
import { ColumnWithJobs, JobApplication } from "@/lib/board";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from './ui/button';
import CreateJobApplicationDialog from "./create-job-dialog";

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

interface ColConfig {
  bg: string;
  text: string;
  icon: React.ReactNode;
}

const COLUMN_STYLE_MAP: Record<string, ColConfig> = {
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

const DEFAULT_STYLE: ColConfig = {
  bg: "bg-gray-500",
  text: "text-white",
  icon: <Calendar className="w-4 h-4" />,
};

function DroppableColumn({
  column,
  config,
  boardId,
  userId, // 1. زدنا استقبال userId فـ الـ Props
}: {
  column: ColumnWithJobs;
  config: ColConfig;
  boardId: number;
  userId: number; // 2. حددنا نوع البيانات ديالو فـ TS
}) {
  return (
    <Card className="min-w-[300px] flex-shrink-0 shadow-md p-0">
      {/* Header العمود */}
      <CardHeader className={`px-3 py-2.5 flex flex-row items-center justify-between space-y-0 ${config.bg} ${config.text}`}>
        <div className="flex items-center gap-2">
          {config.icon}
          <CardTitle className="text-sm font-semibold">{column.name}</CardTitle>
          <span className="text-xs bg-black/20 px-1.5 py-0.5 rounded-full font-normal">
            {column.jobs.length}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="hover:bg-white/20 p-1 rounded transition">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem><Trash2 />Delete Column</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-2 pt-4 bg-gray-50/50 min-h-[400px] rounded-b-lg">
        {/* دابا userId متعرف ومصوب بشكل صحيح */}
        <CreateJobApplicationDialog columnId={column.id} userId={userId}/>
      </CardContent>
    </Card>
  );
}

export function KanbanBoard({ board, columns, userId }: KanbanBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-6">
      {columns.map((col) => {
        const config = COLUMN_STYLE_MAP[col.name] || DEFAULT_STYLE;

        return (
          <DroppableColumn
            key={col.id}
            column={col}
            config={config}
            boardId={board.id}
            userId={userId} // 3. تمرير userId للمكون الفرعي
          />
        );
      })}
    </div>
  );
}