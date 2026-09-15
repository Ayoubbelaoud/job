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
    <Card className="w-72 flex-shrink-0 border border-gray-100 shadow-sm overflow-hidden flex flex-col">
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
      {/* محتوى العمود والبطاقات */}
      <div className="p-3 flex-1 flex flex-col gap-3 bg-white">
        {/* زر إضافة job */}
        <button className="flex items-center justify-center gap-2 w-full py-1.5 border border-dashed border-gray-300 hover:border-gray-400 rounded-md text-sm text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100/50 transition">
          <Plus className="w-3.5 h-3.5" /> Add Job
        </button>

        {/* قائمة الوظائف */}
        <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-250px)]">
          {column.jobs.map((job: JobApplication) => (
            <div
              key={job.id}
              className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:border-gray-300 cursor-pointer transition"
            >
              <p className="font-semibold text-sm text-gray-900">{job.company}</p>
              <p className="text-xs text-gray-500 mt-0.5">{job.position}</p>
              {job.location && (
                <p className="text-[10px] text-gray-400 mt-1">{job.location}</p>
              )}
            </div>
          ))}
        </div>
      </div>
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