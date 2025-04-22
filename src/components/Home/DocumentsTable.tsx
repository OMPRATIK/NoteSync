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
};

export default function DocumentsTable({
  documents,
  loadMore,
  status,
}: DocumentsTableProps) {
  return (
    <div className="max-w-screen-xl mx-auto px-16 flex flex-col gap-5 pt-6">
      <h3 className="font-medium">Recent documents</h3>
      {!documents && (
        <LoaderIcon className="animate-spin text-muted-foreground size-5" />
      )}
      {documents && (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              <TableHead>Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead>Shared</TableHead>
              <TableHead>Created at</TableHead>
            </TableRow>
          </TableHeader>
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
        >
          {status === "CanLoadMore" ? "Load more" : "End of results"}
        </Button>
      </div>
    </div>
  );
}
