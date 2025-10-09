"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import MenueBar from "./menue-bar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

export default function RichTextEditor({}) {
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
    content: "<p>ابدا بكتابة محتوى </p>",
    editorProps: {
      attributes: {
        class:
          "min-h-[156px] border border-border outline-none rounded py-2 px-6",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log(html);
    },
    immediatelyRender: false,
  });

  return (
    <div className="">
      <MenueBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
