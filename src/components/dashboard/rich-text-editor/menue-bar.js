import { Toggle } from "@radix-ui/react-toggle";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";

export default function MenueBar({ editor }) {
  if (!editor) {
    return null;
  }

  const options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      preesed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preesed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      preesed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive("orderedList"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      preesed: editor.isActive("highlight"),
    },
  ];

  return (
    // <div className="control-group">
    //   <div className="button-group">
    //     <button
    //       onClick={() =>
    //         editor.chain().focus().toggleHeading({ level: 1 }).run()
    //       }
    //       className={
    //         editor.isActive("heading", { level: 1 }) ? "is-active" : ""
    //       }
    //     >
    //       H1
    //     </button>
    //     <button
    //       onClick={() =>
    //         editor.chain().focus().toggleHeading({ level: 2 }).run()
    //       }
    //       className={
    //         editor.isActive("heading", { level: 2 }) ? "is-active" : ""
    //       }
    //     >
    //       H2
    //     </button>
    //     <button
    //       onClick={() =>
    //         editor.chain().focus().toggleHeading({ level: 3 }).run()
    //       }
    //       className={
    //         editor.isActive("heading", { level: 3 }) ? "is-active" : ""
    //       }
    //     >
    //       H3
    //     </button>
    //     <button
    //       onClick={() => editor.chain().focus().setParagraph().run()}
    //       className={editor.isActive("paragraph") ? "is-active" : ""}
    //     >
    //       Paragraph
    //     </button>
    //     <button
    //       onClick={() => editor.chain().focus().toggleBold().run()}
    //       className={editor.isActive("bold") ? "is-active" : ""}
    //     >
    //       Bold
    //     </button>
    //     <button
    //       onClick={() => editor.chain().focus().toggleItalic().run()}
    //       className={editor.isActive("italic") ? "is-active" : ""}
    //     >
    //       Italic
    //     </button>
    //     <button
    //       onClick={() => editor.chain().focus().toggleStrike().run()}
    //       className={editor.isActive("strike") ? "is-active" : ""}
    //     >
    //       Strike
    //     </button>
    //     <button
    //       onClick={() => editor.chain().focus().toggleHighlight().run()}
    //       className={editor.isActive("highlight") ? "is-active" : ""}
    //     >
    //       Highlight
    //     </button>
    //     <button
    //       onClick={() => editor.chain().focus().setTextAlign("left").run()}
    //       className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
    //     >
    //       Left
    //     </button>
    //     <button
    //       onClick={() => editor.chain().focus().setTextAlign("center").run()}
    //       className={
    //         editor.isActive({ textAlign: "center" }) ? "is-active" : ""
    //       }
    //     >
    //       Center
    //     </button>
    //     <button
    //       onClick={() => editor.chain().focus().setTextAlign("right").run()}
    //       className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
    //     >
    //       Right
    //     </button>
    //     <button
    //       onClick={() => editor.chain().focus().setTextAlign("justify").run()}
    //       className={
    //         editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
    //       }
    //     >
    //       Justify
    //     </button>
    //   </div>
    // </div>
    <div className="border border-b-0 rounded p-1  space-x-6 z-20">
      {options.map((option, index) => (
        <Toggle
          key={index}
          onPressedChange={option.onClick}
          preesed={option.preesed}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
}
