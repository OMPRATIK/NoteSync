import { useParams } from "react-router";
import Editor from "@/components/Document/Editor";
import Toolbar from "@/components/Document/Toolbar";
import Navbar from "@/components/Document/Navbar";

export default function Document() {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="dark:bg-neutral-900 flex flex-col px-2 sm:px-4 pt-2 gap-y-2 fixed top-0 right-0 left-0 z-10 bg-[#FAFBFD] print:hidden">
        <Navbar />
        <Toolbar />
      </div>
      <div className="pt-[108px] print:pt-0">
        <Editor />
      </div>
    </div>
  );
}
