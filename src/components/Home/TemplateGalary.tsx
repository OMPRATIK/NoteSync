import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { templates } from "@/constants/templates";
import { cn } from "@/lib/utils";
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function TemplateGalary() {
  const create = useMutation(api.documents.create);
  const [creating, setCreating] = useState(false);

  const navigate = useNavigate();

  function onTemplateClick(title: string, initialContent: string) {
    setCreating(true);
    create({ title, initialContent })
      .then((documentId) => {
        navigate(`/document/${documentId}`);
      })
      .finally(() => {
        setCreating(false);
      });
  }

  return (
    <div className="bg-[#F1F3F4] dark:bg-neutral-800/50">
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
        <h3 className="font-medium">Start a new document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
              >
                <div
                  className={cn(
                    "aspect-[3/4] flex flex-col gap-y-2.5",
                    creating && "pointer-events-none opacity-50"
                  )}
                >
                  <button
                    disabled={creating}
                    onClick={() => onTemplateClick(template.label, "")}
                    style={{
                      background: `url(${template.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="cursor-pointer size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                  />
                  <p className="text-xs sm:text-sm font-medium truncate">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="cursor-pointer dark:bg-neutral-900" />
          <CarouselPrevious className="cursor-pointer dark:bg-neutral-900" />
        </Carousel>
      </div>
    </div>
  );
}
