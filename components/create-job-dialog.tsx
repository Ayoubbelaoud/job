
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";



interface CreateJobAppliactionDialogProps {
  columnId: number;
  userId: number;
}
export default function CreateJobApplicationDialog({columnId, userId}: CreateJobAppliactionDialogProps){
    return <Dialog>
        <DialogTrigger>
            <Button variant="outline">
                <Plus />
                Add Job
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Job Application</DialogTitle>
                <DialogDescription>Track a new job application</DialogDescription>
            </DialogHeader>
            <form>
                <div>
                    <div>
                        <label htmlFor="compay">Company *</label>
                        <Input id="company" required />
                    </div>
                    <div>
                        <label htmlFor="position">Position *</label>
                        <Input id="position" required />
                    </div>
                </div>
            </form>
        </DialogContent>
    </Dialog>
}