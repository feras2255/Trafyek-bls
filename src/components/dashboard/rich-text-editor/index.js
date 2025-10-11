"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import MenueBar from "./menue-bar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

export default function RichTextEditor({ value = "", onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content: value || "<p>ابدا بكتابة محتوى </p>",
    editorProps: {
      attributes: {
        class:
          "min-h-[156px] border border-border outline-none rounded py-2 px-6",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      onChange(html);
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="">
      <MenueBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
