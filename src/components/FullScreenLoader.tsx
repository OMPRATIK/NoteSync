import { LoaderIcon } from "lucide-react";

type FullScreenLoaderProps = {
  label?: string;
};

export default function FullScreenLoader({ label }: FullScreenLoaderProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2 bg-white dark:bg-neutral-900">
      <LoaderIcon className="size-6 text-muted-foreground animate-spin" />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
}
