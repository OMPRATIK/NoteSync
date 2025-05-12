import Navbar from "@/components/Home/Navbar";
import TemplateGalary from "@/components/Home/TemplateGalary";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import DocumentsTable from "@/components/Home/DocumentsTable";
import { useSearchParam } from "@/hooks/use-search-params";

export default function Home() {
  const [search] = useSearchParam("search");

  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.documents.get,
    { search },
    { initialNumItems: 5 }
  );

  return (
    <div className="min-h-screen flex flex-col dark:bg-neutral-900">
      <div className="p-2 sm:p-4 fixed top-0 right-0 left-0 z-10 h-16 bg-white dark:bg-neutral-900">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGalary />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
