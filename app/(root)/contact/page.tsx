"use client";

export default function ContactPage() {
  return (
    <div className="flex items-center justify-center mt-10 p-10 bg-gray-100">
      <div className="text-center p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-2">
          Have any questions or feedback?
        </p>
        <p className="text-lg text-gray-600 mb-4">
          Feel free to reach out via email.
        </p>
        <a
          href="mailto:martinchijindu@gmail.com"
          className="text-blue-600 text-xl font-semibold hover:underline"
        >
          martinchijindu@gmail.com
        </a>
      </div>
    </div>
  );
}
