import Image from "next/image";
import Link from "next/link";
import heroImage from "../public/hero-image.jpg";

export default function Hero() {
  return (
    <section className="bg-gray-100 py-12 px-6 md:px-12">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-8">
        {/* Left Content */}
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-900">
            Unleash Your Creativity
          </h1>
          <p className="text-gray-700 mt-4">
            Your go-to platform for insightful stories, articles, and blogs.
          </p>
          <Link href="/posts">
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Get Started
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src={heroImage}
            alt="Creative Work"
            width={400}
            height={350}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
