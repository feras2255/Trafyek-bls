"use client";

import { useEffect, useRef, memo } from "react";
import "quill/dist/quill.snow.css";
import { supabase } from "@/lib/supabaseClient";

const Editor = memo(({ data, onChange, isAr }) => {
  const wrapperRef = useRef(null);
  const quillRef = useRef(null);
  const hasInitialized = useRef(false);

  // Quill is initialised exactly once, but the init closure reads data, isAr
  // and onChange. Listing them as effect dependencies would tear the editor
  // down and rebuild it on every keystroke, so the latest values are held in
  // refs instead. Same behaviour as before, without the stale-closure warning.
  const propsRef = useRef({ data, onChange, isAr });
  propsRef.current = { data, onChange, isAr };

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const { data: initialData, onChange: onChangeProp, isAr: rtl } =
      propsRef.current;

    const editorDiv = document.createElement("div");
    wrapperRef.current.appendChild(editorDiv);

    const init = async () => {
      const Quill = (await import("quill")).default;

      const quill = new Quill(editorDiv, {
        theme: "snow",
        placeholder: rtl ? "ابدأ الكتابة هنا..." : "Start writing...",
        modules: {
          toolbar: {
            container: [
              [{ header: [2, 3, 4, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: ["", "center", "right", "left"] }],
              [{ direction: "rtl" }],
              ["link", "image"], // ✅ أضفنا image
              ["clean"],
            ],
            handlers: {
              // ✅ handler مخصص لرفع الصور
              image: () => {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");
                input.click();

                input.onchange = async () => {
                  const file = input.files[0];
                  if (!file) return;

                  // أظهر loading
                  const range = quill.getSelection(true);
                  quill.insertText(
                    range.index,
                    rtl ? "جاري رفع الصورة..." : "Uploading image...",
                  );

                  try {
                    const fileExt = file.name.split(".").pop();
                    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
                    const filePath = `editor-images/${fileName}`;

                    const { error: uploadError } = await supabase.storage
                      .from("blogs") // ✅ نفس الـ bucket اللي عندك
                      .upload(filePath, file, {
                        cacheControl: "3600",
                        upsert: false,
                      });

                    if (uploadError) throw uploadError;

                    const {
                      data: { publicUrl },
                    } = supabase.storage.from("blogs").getPublicUrl(filePath);

                    // احذف نص الـ loading وأدرج الصورة
                    quill.deleteText(range.index, rtl ? 18 : 18);
                    quill.insertEmbed(range.index, "image", publicUrl);
                    quill.setSelection(range.index + 1);
                  } catch (error) {
                    quill.deleteText(range.index, rtl ? 18 : 18);
                    alert(
                      rtl
                        ? "فشل رفع الصورة: " + error.message
                        : "Upload failed: " + error.message,
                    );
                  }
                };
              },
            },
          },
        },
      });

      quillRef.current = quill;

      if (rtl) {
        quill.format("direction", "rtl");
        quill.format("align", "right");
      }

      quill.root.setAttribute("dir", rtl ? "rtl" : "ltr");

      if (initialData) {
        quill.root.innerHTML = initialData;
      }

      quill.on("text-change", () => {
        onChangeProp(quill.root.innerHTML);
      });
    };

    init().catch(console.error);

    return () => {
      quillRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (quillRef.current && data) {
      const current = quillRef.current.root.innerHTML;
      if (current !== data) {
        quillRef.current.root.innerHTML = data;
      }
    }
  }, [data]);

  return (
    <div
      ref={wrapperRef}
      className={`rounded-2xl overflow-hidden bg-bg-sand/50 ${isAr ? "rtl" : "ltr"}`}
    />
  );
});

Editor.displayName = "Editor";
export default Editor;
