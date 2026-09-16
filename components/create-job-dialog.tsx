"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useState, useTransition } from "react";
import { createJobApplication } from "@/lib/job";

interface CreateJobAppliactionDialogProps {
  columnId: number;
  userId: number;
}

export default function CreateJobApplicationDialog({columnId, userId}: CreateJobAppliactionDialogProps){
    const [open, setOpen] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      formData.append("columnId", columnId.toString());
      formData.append("userId", userId.toString());

      startTransition(async () => {
        const res = await createJobApplication(formData);
        if (res?.success) {
          setOpen(false);
        }
      });
    };

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
            <Button variant="outline" className="w-full mb-4 justify-start text-muted-foreground border-dashed border-2">
                <Plus className="mr-2 h-4 w-4" />
                Add Job
            </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Add Job Application</DialogTitle>
                <DialogDescription>Track a new job application</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="company">Company *</label>
                            <Input id="company" name="company" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="position">Position *</label>
                            <Input id="position" name="position" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="location">Location</label>
                            <Input id="location" name="location" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="salary">Salary</label>
                            <Input id="salary" name="salary" placeholder="e.g., $100k - $150k" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="jobUrl">Job Url</label>
                        <Input id="jobUrl" name="jobUrl" placeholder="https://..." />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="tags">Tags (comma-separated)</label>
                        <Input id="tags" name="tags" placeholder="React, Tailwind, High" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="description">Description</label>
                        <Textarea id="description" name="description" rows={3} placeholder="Brief description of the role..." />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="notes">Notes</label>
                        <Textarea id="notes" name="notes" rows={4}/>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>Cancel</Button>
                    <Button type="submit" disabled={isPending}>
                      {isPending ? "Adding..." : "Add Application"}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
}