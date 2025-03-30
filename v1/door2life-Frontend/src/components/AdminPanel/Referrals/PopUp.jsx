import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useState } from "react";

export function PopUp({ username, email }) {
  return (
    <DialogContent className="sm:max-w-[425px] flex  flex-col items-center gap-8 bg-lightgray text-gray border-gray">
      <DialogHeader className="flex flex-col gap-4">
        <DialogTitle>Name : {username}</DialogTitle>
        <DialogDescription>Email : {email}</DialogDescription>
      </DialogHeader>

      <DialogFooter></DialogFooter>
    </DialogContent>
  );
}
