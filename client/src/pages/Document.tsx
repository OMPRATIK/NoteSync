import { useParams } from "react-router";
import Editor from "@/components/Editor";
import Toolbar from "@/components/Toolbar";

export default function Document() {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="min-h-screen bg-neutral-50">
      <Toolbar />
      <Editor />
    </div>
  );
}
