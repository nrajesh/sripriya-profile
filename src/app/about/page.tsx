import Image from "next/image";
import { author } from "@/lib/data";
import { GeometricBackground } from "@/components/geometric-background";

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      <GeometricBackground />

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              About the Author
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              A glimpse into the life and work of {author.name}
            </p>
          </header>

          {/* Section 1: About Author */}
          <section className="grid md:grid-cols-5 gap-8 lg:gap-12 items-start mb-16">
            <div className="md:col-span-2 pt-16">
              <div className="sticky top-24">
                <Image
                  src="/author-profile.jpeg"
                  alt={`Photo of ${author.name}`}
                  width={400}
                  height={400}
                  className="rounded-lg object-cover aspect-square w-full shadow-lg"
                />
              </div>
            </div>
            <div className="md:col-span-3 space-y-6">
              <h2 className="text-3xl font-bold tracking-tight border-b pb-2">
                About the Author
              </h2>
              <div className="space-y-4 text-muted-foreground text-base md:text-lg">
                <p>
                  Sripriya Srinivasan is a versatile writer and translator with a
                  passion for bringing diverse literary works to a wider
                  audience. Her work spans multiple languages and genres,
                  showcasing her linguistic prowess and deep cultural
                  understanding.
                </p>
                <p>
                  While she has a background in Computer Science Engineering, Sripriya has a deep interest in literature, philosophy, science, translation, and Sanskrit. Sripriya
                  brings a unique, culturally rich perspective to her writing.
                </p>
              </div>
            </div>
          </section>

          {/* Image with President */}
          <section className="mb-16">
            <figure className="max-w-3xl mx-auto">
              <Image
                src="/WithPresidentOfIndia.jpg"
                alt={`Sripriya Srinivasan with the President of India, Smt. Draupadi Murmu`}
                width={1200}
                height={800}
                className="rounded-lg object-cover w-full shadow-lg"
              />
              <figcaption className="text-center text-sm text-muted-foreground mt-4">
                Sripriya Srinivasan with the President of India, Smt. Draupadi Murmu.
              </figcaption>
            </figure>
          </section>

          {/* Section 2 & 3: Works and Beyond */}
          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold tracking-tight border-b pb-2 mb-6">
                About Her Works
              </h2>
              <div className="space-y-4 text-muted-foreground text-base md:text-lg">
                <p>
                  She has translated several significant books, including Dr.
                  A.P.J. Abdul Kalam’s &quot;Memories Never Die&quot; from Tamil to
                  English and Ashwin Sanghi’s bestseller &quot;The Krishna Key&quot; into
                  Tamil. Her translation portfolio also includes rendering the
                  works of the esteemed Shatavadhani Dr. R. Ganesh from Kannada
                  to Tamil, demonstrating her ability to bridge linguistic and
                  cultural divides.
                </p>
                <p>
                  She has also translated books for Rashtrotthana Sahitya,
                  further cementing her reputation as a skilled and dedicated
                  translator.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold tracking-tight border-b pb-2 mb-6">
                Beyond Translations
              </h2>
              <div className="space-y-4 text-muted-foreground text-base md:text-lg">
                <p>
                  Beyond translations, Sripriya is a regular contributor to the
                  Prekshaa Journal, where she writes insightful articles on
                  various subjects.
                </p>
                <p>
                  Despite her literary achievements, she also excels in the tech
                  world, holding a gold medal in M.Sc (IT) from the University
                  of Madras and working as a Senior Business Analyst in an IT
                  firm. This blend of arts and technology highlights her
                  multifaceted talent and dedication.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}