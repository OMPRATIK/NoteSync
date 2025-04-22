import { Doc } from "../../../convex/_generated/dataModel";
import { SiGoogledocs } from "react-icons/si";
import { TableCell, TableRow } from "@/components/ui/table";
import { Building2Icon, CircleUserIcon } from "lucide-react";
import { format } from "date-fns";
import DocumentMenu from "./DocumentMenu";
import { useNavigate } from "react-router";

type DocumentRowProps = {
  document: Doc<"documents">;
};

export default function DocumentRow({ document }: DocumentRowProps) {
  const navigate = useNavigate();

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => navigate(`/document/${document._id}`)}
    >
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
        {document.organzationId ? (
          <Building2Icon className="size-4" />
        ) : (
          <CircleUserIcon className="size-4" />
        )}
        {document.organzationId ? "Organization" : "Personal"}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(new Date(document._creationTime), "MMM dd, yyyy")}
      </TableCell>
      <TableCell className="flex justify-end">
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTab={() => window.open(`/document/${document._id}`, "_blank")}
        />
      </TableCell>
    </TableRow>
  );
}
