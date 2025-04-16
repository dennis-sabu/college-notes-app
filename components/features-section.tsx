import { BookOpen, Users, Search, Shield } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Organized Notes",
      description: "Access notes organized by subject, semester, and topic for easy navigation.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Teacher Verified",
      description: "Notes uploaded directly by your professors ensure accuracy and relevance.",
    },
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Smart Search",
      description: "Find exactly what you need with our powerful search and filter system.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Secure Access",
      description: "Role-based authentication ensures notes are shared appropriately.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Features That Make Learning Easier
            </h2>
            <p className="max-w-[800px] mx-auto text-muted-foreground text-base sm:text-lg md:text-xl">
              Our platform is designed to streamline the way you access and share educational materials.
            </p>
          </div>
        </div>

        {/* Features Grid - Responsive */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-3 text-center rounded-lg border p-6 bg-background shadow-sm"
            >
              {feature.icon}
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
