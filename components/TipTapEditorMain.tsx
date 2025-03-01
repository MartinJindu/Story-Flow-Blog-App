import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import TextEditorMenuBar from "./TipTapMenuBar";
import DOMPurify from "dompurify";

type TextEditorProps = {
  onChange: (content: string) => void;
  initialContent?: string;
};

export default function RichTextEditor({
  onChange,
  initialContent,
}: TextEditorProps) {
  const [content, setContent] = useState(initialContent || "");
  const [showPreview, setShowPreview] = useState(false); // 🔹 State for preview toggle

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Enter.." }),
      Underline,
      Link.configure({
        openOnClick: true, // Open links in a new tab
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),

      Highlight.configure({ multicolor: true }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
      onChange(html);
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] cursor-text rounded border p-5 focus:outline-none focus:ring-2 focus:ring-blue-500",
      },
    },
    immediatelyRender: false,
  });

  return (
    <div className="border p-2 shadow-md bg-white rounded">
      {/* Editor Section */}
      <div className="p-2 ">
        <TextEditorMenuBar editor={editor} />
        <EditorContent
          editor={editor}
          required
          className="min-h-[200px] bg-gray-50 rounded p-2"
        />
      </div>

      {/*  Toggle Preview Button */}
      <button
        type="button"
        onClick={() => setShowPreview(!showPreview)}
        className="mt-3 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
      >
        {showPreview ? "Hide Preview" : "Show Preview"}
      </button>

      {/* Preview Section (Only shown when `showPreview` is true) */}
      {showPreview && (
        <div className="mt-3 border rounded bg-white p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Preview</h2>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
          />
        </div>
      )}
    </div>
  );
}
