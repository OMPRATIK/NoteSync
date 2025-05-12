import { Doc } from "convex/_generated/dataModel";
import { PaginationStatus } from "convex/react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderIcon } from "lucide-react";
import DocumentRow from "./DocumentRow";
import { Button } from "../ui/button";

type DocumentsTableProps = {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
  isLoading?: boolean;
};

export default function DocumentsTable({
  documents,
  loadMore,
  status,
  isLoading,
}: DocumentsTableProps) {
  return (
    <div className="h-full max-w-screen-xl mx-auto px-8 sm:px-16 flex flex-col gap-5 pt-6">
      <h3 className="font-medium">Recent documents</h3>
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <LoaderIcon className="animate-spin text-muted-foreground size-5" />
        </div>
      )}
      {!isLoading && documents && (
        <Table>
          {documents.length !== 0 && (
            <TableHeader>
              <TableRow className="hover:bg-transparent border-none">
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">&nbsp;</TableHead>
                <TableHead className="hidden md:table-cell">Shared</TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
              </TableRow>
            </TableHeader>
          )}
          {documents.length === 0 && (
            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground h-24"
                >
                  No documents found
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          {documents.length !== 0 && (
            <TableBody>
              {documents.map((document) => (
                <DocumentRow key={document._id} document={document} />
              ))}
            </TableBody>
          )}
        </Table>
      )}
      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => loadMore(5)}
          disabled={status !== "CanLoadMore"}
          className="cursor-pointer"
        >
          {status === "CanLoadMore" ? "Load more" : ""}
        </Button>
      </div>
    </div>
  );
}
