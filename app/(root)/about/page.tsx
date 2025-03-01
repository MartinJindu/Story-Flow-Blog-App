"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container max-w-4xl mx-auto px-6 py-12 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        About <span className="text-violet-600">Story Flow</span>
      </h1>
      <p className="text-gray-600 text-lg">
        Welcome to <strong>Story Flow</strong> – a platform where words come to
        life, ideas find a voice, and creativity flows endlessly. Whether you're
        an aspiring writer, an avid reader, or someone who simply loves a good
        story, Story Flow is the place for you.
      </p>

      <div className="mt-8 space-y-8">
        <section className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-violet-700">
            Our Mission
          </h2>
          <p className="text-gray-700 mt-2">
            At Story Flow, we believe in the power of storytelling to inspire,
            educate, and connect people. Our mission is to provide a space where
            writers can express their thoughts freely, share their experiences,
            and engage with a community that values meaningful conversations.
          </p>
        </section>

        <section className="p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-violet-700">
            What We Offer
          </h2>
          <ul className="text-gray-700 mt-2 space-y-2 text-left max-w-2xl mx-auto">
            <li>
              🔹 <strong>A Home for Writers:</strong> Share your stories,
              articles, and ideas with the world.
            </li>
            <li>
              🔹 <strong>Engaging Community:</strong> Connect with like-minded
              individuals and grow as a writer.
            </li>
            <li>
              🔹 <strong>Seamless Reading Experience:</strong> Discover diverse
              stories and unique perspectives.
            </li>
          </ul>
        </section>

        <section className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-violet-700">
            Why Story Flow?
          </h2>
          <p className="text-gray-700 mt-2">
            In a world full of information, we strive to create a{" "}
            <strong>meaningful and engaging </strong>
            platform that values quality over quantity. Our intuitive design,
            distraction-free reading experience, and writer-friendly tools make
            sharing and discovering content effortless.
          </p>
        </section>
      </div>

      <p className="text-gray-900 font-semibold mt-8">
        📖{" "}
        <span className="text-violet-600">
          <Link className="underline hover:text-violet-500" href={`/create`}>
            Start writing
          </Link>
          ,{" "}
          <Link className="underline hover:text-violet-500" href={`/posts`}>
            Start reading
          </Link>{" "}
          – let the stories flow!
        </span>
      </p>
    </div>
  );
}
