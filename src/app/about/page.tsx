import Image from "next/image";
import { author } from "@/lib/data";

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute top-0 -left-24 w-72 h-72 bg-secondary rounded-full opacity-20" />
      <div className="absolute -bottom-24 -right-12 w-96 h-96 bg-accent rounded-full opacity-10" />

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              About the Author
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              A glimpse into the life and work of {author.name}
            </p>
          </header>

          <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="md:col-span-2">
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
              <div className="space-y-4 text-muted-foreground text-base md:text-lg">
                <p>
                  Sripriya Srinivasan is a versatile writer and translator with a
                  passion for bringing diverse literary works to a wider
                  audience. Her work spans multiple languages and genres,
                  showcasing her linguistic prowess and deep cultural
                  understanding.
                </p>
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
                  Beyond translations, Sripriya is a regular contributor to the
                  Prekshaa Journal, where she writes insightful articles on
                  various subjects. She has also translated books for
                  Rashtrotthana Sahitya, further cementing her reputation as a
                  skilled and dedicated translator.
                </p>
                <p>
                  With a background in Carnatic music and Sanskrit, Sripriya
                  brings a unique, culturally rich perspective to her writing.
                  Despite her literary achievements, she also excels in the tech
                  world, holding a gold medal in M.Sc (IT) from the University
                  of Madras and working as a Senior Business Analyst in an IT
                  firm. This blend of arts and technology highlights her
                  multifaceted talent and dedication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}