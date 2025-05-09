import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 lg:py-32 bg-background overflow-x-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 xl:grid-cols-2 items-center">
          {/* Text Section */}
          <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Share Knowledge, Ace Your Classes
              </h1>
              <p className="max-w-[600px] mx-auto lg:mx-0 text-muted-foreground md:text-xl">
                Access high-quality notes from your professors and peers. Study smarter, not harder.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link href="/browse">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse Notes
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Section */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 blur-3xl"></div>
              <div className="relative h-full w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border">
                <div className="p-6 h-full flex flex-col">
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex flex-col"
                      >
                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="mt-auto pt-2 flex justify-end">
                          <div className="h-6 w-16 bg-blue-200 dark:bg-blue-900 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
