export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-20 text-black">
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <div className="mb-16">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
            About Us
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            We build things
            <br />
            <span className="text-gray-400">that matter.</span>
          </h1>
        </div>

        {/* Content */}
        <div className="grid gap-12 border-t border-gray-200 pt-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">
              Who We Are
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              We are a team focused on building simple, useful, and
              meaningful digital experiences. We combine thoughtful design
              with modern technology to create products that solve real
              problems.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              What We Do
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              From ideas to digital products, we focus on creating clean,
              reliable, and easy-to-use experiences. Every project starts
              with understanding the problem and ends with a solution
              designed around the people who use it.
            </p>
          </div>
        </div>

        {/* Story */}
        <div className="mt-20 border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-semibold">
            Our Story
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-gray-600">
            Great products do not need to be complicated. We believe in
            keeping things simple, focusing on the details, and continuously
            improving what we build. Our journey is just beginning, and
            we&apos;re excited about what comes next.
          </p>
        </div>
      </div>
    </main>
  );
}