// lib/types.ts
export interface Board {
  id: number;
  name: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: number;
  name: string;
  board_id: number;
  order: number;
  created_at: Date;
}

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
  created_at: Date;
  updated_at: Date;
}