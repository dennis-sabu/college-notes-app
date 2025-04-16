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
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Features That Make Learning Easier
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform is designed to streamline the way you access and share educational materials.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background">
              {feature.icon}
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
