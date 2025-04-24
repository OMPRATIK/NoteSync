import { useEffect, useState } from "react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListCollapseIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  MessageSquarePlusIcon,
  MinusIcon,
  PlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
  type LucideIcon,
} from "lucide-react";

import { type Level } from "@tiptap/extension-heading";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ToolbarButtonProps = {
  icon: LucideIcon;
  isActive?: boolean;
  onClick?(): void;
  label: string;
};

function LineHeightButton() {
  const { editor } = useEditorStore();

  const lineHeights = [
    { label: "Default", value: "normal" },
    { label: "Single", value: "1" },
    { label: "1.15", value: "1.15" },
    { label: "1.5", value: "1.5" },
    { label: "Double", value: "2" },
  ];

  return (
    <Tooltip>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild>
            <button
              className={
                "cursor-pointer text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 dark:hover:bg-neutral-700/50"
              }
            >
              <ListCollapseIcon className="size-4" />
            </button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
          {lineHeights.map(({ label, value }) => (
            <button
              className={cn(
                "cursor-pointer flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 dark:hover:bg-neutral-700/50",
                editor?.getAttributes("paragraph").lineHeight === value &&
                  "bg-neutral-200/80 dark:bg-neutral-700/50"
              )}
              key={value}
              onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            >
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipContent className="px-2 py-1" side="bottom" align="center">
        Line & Paragraph Spacing
      </TooltipContent>
    </Tooltip>
  );
}

function FontSizeButton() {
  const { editor } = useEditorStore();
  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editor) {
      const currentSize = editor.getAttributes("textStyle").fontSize;
      const sizeValue = currentSize ? currentSize.replace("px", "") : "16";
      setFontSize(sizeValue);
      setInputValue(sizeValue);
    }
  }, [editor, currentFontSize]);

  function updateFontSize(newSize: string) {
    const size = parseInt(newSize, 10);

    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);
  }

  function handleInputBlur() {
    updateFontSize(inputValue);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  }

  function increment() {
    const newSize = parseInt(fontSize, 10) + 1;
    updateFontSize(newSize.toString());
  }

  function decrement() {
    const newSize = parseInt(fontSize, 10) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  }

  return (
    <div className="flex item-center gap-x-0.5">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={decrement}
            className="cursor-pointer text-sm h-7 w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 dark:hover:bg-neutral-700/50"
          >
            <MinusIcon className="size-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1" side="bottom" align="center">
          Decrease Font Size{" "}
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          {isEditing ? (
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              className="h-7 w-10 text-sm rounded-sm border border-neutral-400 text-center bg-transparent focus:outline-none focus:ring-0"
            />
          ) : (
            <button
              onClick={() => {
                setIsEditing(true);
                setFontSize(currentFontSize);
              }}
              className="h-7 w-10 text-sm rounded-sm border border-neutral-400 text-center bg-transparent hover:bg-neutral-200/80 dark:hover:bg-neutral-700/50 cursor-pointer"
            >
              {currentFontSize}
            </button>
          )}
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1" side="bottom" align="center">
          Font Size
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={increment}
            className="cursor-pointer text-sm h-7 w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 dark:hover:bg-neutral-700/50"
          >
            <PlusIcon className="size-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1" side="bottom" align="center">
          Increase Font Size
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

function ListButton() {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <Tooltip>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild>
            <button
              className={
                "cursor-pointer text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 dark:hover:bg-neutral-700/50"
              }
            >
              <ListIcon className="size-4" />
            </button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
          {lists.map(({ label, icon: Icon, isActive, onClick }) => (
            <button
              className={cn(
                "cursor-pointer flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                isActive() && "bg-neutral-200/80"
              )}
              key={label}
              onClick={onClick}
            >
              <Icon className="size-4" />{" "}
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipContent className="px-2 py-1" side="bottom" align="center">
        List Styles
      </TooltipContent>
    </Tooltip>
  );
}

function AlignButton() {
  const { editor } = useEditorStore();

  const alignments = [
    { label: "Left", value: "left", icon: AlignLeftIcon },
    { label: "Center", value: "center", icon: AlignCenterIcon },
    { label: "Right", value: "right", icon: AlignRightIcon },
    { label: "Justify", value: "justify", icon: AlignJustifyIcon },
  ];

  return (
    <Tooltip>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild>
            <button
              className={
                "cursor-pointer text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 dark:hover:bg-neutral-700/50"
              }
            >
              <AlignLeftIcon className="size-4" />
            </button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
          {alignments.map(({ label, value, icon: Icon }) => (
            <button
              className={cn(
                "cursor-pointer flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 dark:hover:bg-neutral-700/50",
                editor?.isActive({ textAlign: value }) &&
                  "bg-neutral-200/80 dark:bg-neutral-700/50"
              )}
              key={value}
              onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            >
              <Icon className="size-4" />{" "}
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipContent className="px-2 py-1" side="bottom" align="center">
        Align & Indent
      </TooltipContent>
    </Tooltip>
  );
}

function ImageButton() {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  function onChange(src: string) {
    editor?.chain().focus().setImage({ src }).run();
  }

  function onUpload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };
    input.click();
  }

  function handleImageUrlSubmit() {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  }

  return (
    <Tooltip>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild>
            <button
              className={
                "cursor-pointer text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 dark:hover:bg-neutral-700/50"
              }
            >
              <ImageIcon className="size-4" />
            </button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon /> Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <SearchIcon /> Paste Image URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <TooltipContent className="px-2 py-1" side="bottom" align="center">
        Insert Image
      </TooltipContent>
    </Tooltip>
  );
}

function LinkButton() {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");

  function onChange(href: string) {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  }

  function removeLink() {
    editor?.chain().focus().unsetLink().run();
  }

  return (
    <Tooltip>
      <DropdownMenu
        onOpenChange={(open) => {
          if (open) setValue(editor?.getAttributes("link").href || "");
        }}
      >
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild>
            <button
              className={
                "cursor-pointer text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 dark:hover:bg-neutral-700/50"
              }
            >
              <Link2Icon className="size-4" />
            </button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
          <Input
            placeholder="https://example.com"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button onClick={() => onChange(value)} className="cursor-pointer">
            Apply
          </Button>
          {editor?.isActive("link") && (
            <Button
              variant="destructive"
              onClick={removeLink}
              className="cursor-pointer"
            >
              Remove Link
            </Button>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipContent className="px-2 py-1" side="bottom" align="center">
        Insert Link
      </TooltipContent>
    </Tooltip>
  );
}

function HighlightColorButton() {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes("highlight").color || "#ffffff";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative px-1 cursor-pointer h-7 min-w-7 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 dark:hover:bg-neutral-700/50 overflow-hidden text-sm">
          <HighlighterIcon className="size-4" />
          <input
            data-testid="setColor"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            type="color"
            onChange={(event) => {
              editor
                ?.chain()
                .focus()
                .setHighlight({ color: event.target.value })
                .run();
            }}
            value={value}
          />
          <div
            className="w-full h-1 rounded-md"
            style={{ backgroundColor: value }}
          ></div>
        </div>
      </TooltipTrigger>
      <TooltipContent className="px-2 py-1" side="bottom" align="center">
        Highlight Color
      </TooltipContent>
    </Tooltip>
  );
}

function TextColorButton() {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative px-1 cursor-pointer h-7 min-w-7 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 dark:hover:bg-neutral-700/50 overflow-hidden text-sm">
          <span className="text-xs">A</span>
          <input
            data-testid="setColor"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            type="color"
            onChange={(event) => {
              editor?.chain().focus().setColor(event.target.value).run();
            }}
            value={value}
          />
          <div
            className="w-full h-1 rounded-md"
            style={{ backgroundColor: value }}
          ></div>
        </div>
      </TooltipTrigger>
      <TooltipContent className="px-2 py-1" side="bottom" align="center">
        Text Color
      </TooltipContent>
    </Tooltip>
  );
}

// function TextColorButton() {
//   const { editor } = useEditorStore();

//   const value = editor?.getAttributes("textStyle").color || "#000000";

//   function onChange(color: ColorResult) {
//     editor?.chain().focus().setColor(color.hex).run();
//   }

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <button className="px-1 cursor-pointer h-7 min-w-7 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 overflow-hidden text-sm">
//           <span className="text-xs">A</span>
//           <div className="h-1 w-full" style={{ backgroundColor: value }}></div>
//         </button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent className="p-2.5">
//         <CirclePicker color={value} onChange={onChange} />
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

function ToolbarButton({
  onClick,
  isActive,
  icon: Icon,
  label,
}: ToolbarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={cn(
            "cursor-pointer text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 hover:dark:bg-neutral-700/50",
            isActive && "bg-neutral-200/80 dark:bg-neutral-700/50"
          )}
        >
          <Icon className="size-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="px-2 py-1" side="bottom" align="center">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

function HeadingLevelButton() {
  const { editor } = useEditorStore();

  const headings = [
    { label: "Normal text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
  ];

  function getCurrentHeading(): string {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal text";
  }

  return (
    <Tooltip>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild>
            <button className="px-1 cursor-pointer h-7 min-w-28 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 dark:hover:bg-neutral-700/50 overflow-hidden text-sm">
              <span className="truncate">{getCurrentHeading()}</span>
              <ChevronDownIcon className="ml-2 size-4 shrink-0" />
            </button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
          {headings.map(({ label, value, fontSize }) => (
            <button
              key={value}
              onClick={() => {
                if (value === 0) {
                  editor?.chain().focus().setParagraph().run();
                } else {
                  editor
                    ?.chain()
                    .focus()
                    .toggleHeading({ level: value as Level })
                    .run();
                }
              }}
              style={{ fontSize }}
              className={cn(
                "cursor-pointer flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 dark:hover:bg-neutral-700/50",
                (value === 0 && !editor?.isActive("heading")) ||
                  (editor?.isActive("heading", { level: value }) &&
                    "bg-neutral-200/80 dark:bg-neutral-700/50")
              )}
            >
              {label}
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipContent className="px-2 py-1" side="bottom" align="center">
        Styles
      </TooltipContent>
    </Tooltip>
  );
}

function FontFamilyButton() {
  const { editor } = useEditorStore();

  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Inter", value: "Inter" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Monospace", value: "Monospace" },
    { label: "Cursive", value: "Cursive" },
    { label: "Comic Sans MS", value: "Comic Sans MS" },
  ];

  return (
    <Tooltip>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild>
            <button className="px-1 cursor-pointer h-7 min-w-28 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 dark:hover:bg-neutral-700/50 overflow-hidden text-sm">
              <span className="truncate">
                {editor?.getAttributes("textStyle").fontFamily || "Arial"}
              </span>
              <ChevronDownIcon className="ml-2 size-4 shrink-0" />
            </button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
          {fonts.map(({ label, value }) => (
            <button
              onClick={() => editor?.chain().focus().setFontFamily(value).run()}
              key={value}
              className={cn(
                "cursor-pointer flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 dark:hover:bg-neutral-700/50",
                editor?.getAttributes("textStyle").fontFamily === value &&
                  "bg-neutral-200/80 dark:bg-neutral-700/50"
              )}
              style={{ fontFamily: value }}
            >
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipContent className="px-2 py-1" side="bottom" align="center">
        Font
      </TooltipContent>
    </Tooltip>
  );
}

export default function Toolbar() {
  const { editor } = useEditorStore();

  const sections: ({ label: string } & ToolbarButtonProps)[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "true" ? "false" : "true"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => console.log("Comment"),
        isActive: false,
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <TooltipProvider>
      <div className="dark:bg-neutral-800 bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
        {sections[0].map((item) => (
          <ToolbarButton key={item.label} {...item} label={item.label} />
        ))}
        <Separator orientation="vertical" className="h-6 bg-neutral-300 mx-2" />
        <FontFamilyButton />
        <Separator orientation="vertical" className="h-6 bg-neutral-300 mx-2" />
        <HeadingLevelButton />
        <Separator orientation="vertical" className="h-6 bg-neutral-300 mx-2" />
        <FontSizeButton />
        <Separator orientation="vertical" className="h-6 bg-neutral-300 mx-2" />
        {sections[1].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
        {/* <Separator orientation="vertical" className="h-6 bg-neutral-300" /> */}
        <TextColorButton />
        <HighlightColorButton />
        <Separator orientation="vertical" className="h-6 bg-neutral-300 mx-2" />
        <LinkButton />
        <ImageButton />
        <AlignButton />
        <LineHeightButton />
        <ListButton />
        {sections[2].map((item) => (
          <ToolbarButton key={item.label} {...item} label={item.label} />
        ))}
      </div>
    </TooltipProvider>
  );
}
