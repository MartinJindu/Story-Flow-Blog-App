import {
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiCodeSSlashLine,
  RiListOrdered2,
  RiLink,
  RiLinkUnlink,
  RiH1,
  RiH2,
  RiH3,
  RiDoubleQuotesL,
  RiMarkPenLine,
} from "react-icons/ri";
import { Editor, isActive } from "@tiptap/react";
import { AiOutlineRedo, AiOutlineUndo, AiOutlineMinus } from "react-icons/ai";
import { BsTypeUnderline } from "react-icons/bs";
import { IoListOutline } from "react-icons/io5";

const Button = ({
  onClick,
  isActive,
  title,
  disabled,
  children,
}: {
  onClick: () => void;
  isActive: boolean;
  title?: string;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <button
    title={title}
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`p-2 rounded-md hover:bg-gray-200  ${
      isActive ? "bg-violet-500 text-white rounded-md" : ""
    }`}
  >
    {children}
  </button>
);

export default function TextEditorMenuBar({
  editor,
}: {
  editor: Editor | null;
}) {
  if (!editor) return null;

  const toggleHighlight = () => {
    editor.chain().focus().toggleHighlight().run();
  };

  const addLink = () => {
    let url = prompt("Enter URL:");
    if (url) {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = `https://${url}`;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank" })
        .run();
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const buttons = [
    {
      icon: <RiBold className="size-5" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
      title: "Bold",
    },
    {
      icon: <BsTypeUnderline className="size-5" />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
      title: "Underline",
    },
    {
      icon: <RiItalic className="size-5" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
      title: "Italic",
    },
    {
      icon: <RiStrikethrough className="size-5" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
      title: "Strike",
    },
    {
      icon: <RiCodeSSlashLine className="size-5" />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive("code"),
      disabled: !editor.can().chain().focus().toggleCode().run(),
      title: "Code",
    },
    {
      icon: <IoListOutline className="size-5" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
      title: "Bullet",
    },
    {
      icon: <RiListOrdered2 className="size-5" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      disabled: !editor.can().chain().focus().toggleOrderedList().run(),
      title: "Ordered list",
    },
    {
      icon: <RiH1 className="size-5" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
      title: "Heading 1",
    },
    {
      icon: <RiH2 className="size-5" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
      title: "Heading 2",
    },
    {
      icon: <RiH3 className="size-5" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
      title: "Heading 3",
    },

    {
      icon: <RiLink className="size-5" />,
      onClick: addLink,
      isActive: editor.isActive("link"),
      title: "Link",
    },
    {
      icon: <RiLinkUnlink className="size-5" />,
      onClick: removeLink,
      isActive: editor.isActive("link"),
      disabled: !editor.isActive("link"),
      title: "Unlink",
    },

    //  Horizontal Rule
    {
      icon: <AiOutlineMinus className="size-5" />,
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      isActive: false,
      title: "Horizontal rule",
    },
    {
      icon: <RiMarkPenLine className="size-5" />,
      onClick: toggleHighlight,
      isActive: editor.isActive("highlight"),
      title: "Highlight",
    },
    {
      icon: <RiDoubleQuotesL className="size-5" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
      title: "Blockquote",
    },
    {
      icon: <AiOutlineUndo className="size-5" />,
      onClick: () => editor.chain().focus().undo().run(),
      isActive: editor.isActive("undo"),
      disabled: !editor.can().chain().focus().undo().run(),
      title: "Undo",
    },
    {
      icon: <AiOutlineRedo className="size-5" />,
      onClick: () => editor.chain().focus().redo().run(),
      isActive: editor.isActive("redo"),
      disabled: !editor.can().chain().focus().redo().run(),
      title: "Redo",
    },
  ];

  return (
    <div className="mb-2 flex flex-wrap gap-2 border-b pb-2">
      {buttons.map(({ icon, onClick, isActive, disabled, title }, index) => (
        <Button
          key={index}
          onClick={onClick}
          isActive={isActive}
          title={title}
          disabled={disabled}
        >
          {icon}
        </Button>
      ))}
    </div>
  );
}
