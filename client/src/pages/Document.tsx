import { useParams } from "react-router";
import Editor from "@/components/Editor";

export default function Document() {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="min-h-screen bg-neutral-50">
      <Editor />
    </div>
  );
}
