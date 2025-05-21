// Sample data structure for KTU subjects and notes
export const ktuData = {
  // Subjects across semesters and branches
  subjects: [
    // Semester 1 (Common for all branches)
    {
      id: 101,
      name: "Calculus",
      code: "MAT101",
      semester: 1,
      branch: "Common",
      description: "Introduction to differential and integral calculus, limits, continuity, and applications.",
      notesCount: 15,
    },
    {
      id: 102,
      name: "Engineering Physics",
      code: "PHY101",
      semester: 1,
      branch: "Common",
      description: "Fundamentals of physics with engineering applications including mechanics, waves, and optics.",
      notesCount: 12,
    },
    {
      id: 103,
      name: "Engineering Chemistry",
      code: "CHY101",
      semester: 1,
      branch: "Common",
      description: "Basic concepts in chemistry relevant to engineering including electrochemistry and corrosion.",
      notesCount: 10,
    },
    {
      id: 104,
      name: "Engineering Graphics",
      code: "ESE101",
      semester: 1,
      branch: "Common",
      description: "Principles of engineering drawing, projections, and CAD fundamentals.",
      notesCount: 8,
    },

    // Semester 2 (Common for all branches)
    {
      id: 201,
      name: "Linear Algebra & Complex Analysis",
      code: "MAT102",
      semester: 2,
      branch: "Common",
      description: "Vector spaces, linear transformations, eigenvalues, and complex analysis.",
      notesCount: 14,
    },
    {
      id: 202,
      name: "Engineering Mechanics",
      code: "ESE102",
      semester: 2,
      branch: "Common",
      description: "Statics and dynamics of particles and rigid bodies, analysis of structures.",
      notesCount: 11,
    },
    {
      id: 203,
      name: "Basic Electrical Engineering",
      code: "ESE103",
      semester: 2,
      branch: "Common",
      description: "Fundamentals of electrical circuits, machines, and power systems.",
      notesCount: 9,
    },

    // Semester 3 - CSE
    {
      id: 301,
      name: "Discrete Mathematics",
      code: "MAT203",
      semester: 3,
      branch: "CSE",
      description: "Logic, set theory, graph theory, and combinatorics for computer science applications.",
      notesCount: 13,
    },
    {
      id: 302,
      name: "Data Structures",
      code: "CST201",
      semester: 3,
      branch: "CSE",
      description: "Implementation and analysis of arrays, linked lists, stacks, queues, trees, and graphs.",
      notesCount: 18,
    },
    {
      id: 303,
      name: "Object Oriented Programming",
      code: "CST203",
      semester: 3,
      branch: "CSE",
      description: "Concepts of OOP including classes, inheritance, polymorphism, and exception handling.",
      notesCount: 15,
    },

    // Semester 3 - ECE
    {
      id: 304,
      name: "Solid State Devices",
      code: "ECT201",
      semester: 3,
      branch: "ECE",
      description: "Physics of semiconductor devices, p-n junctions, and transistor operation.",
      notesCount: 10,
    },
    {
      id: 305,
      name: "Network Theory",
      code: "ECT203",
      semester: 3,
      branch: "ECE",
      description: "Analysis of electrical networks, circuit theorems, and transient response.",
      notesCount: 12,
    },

    // Semester 3 - ME
    {
      id: 306,
      name: "Mechanics of Solids",
      code: "MET201",
      semester: 3,
      branch: "ME",
      description: "Stress and strain analysis, torsion, bending, and deflection of beams.",
      notesCount: 11,
    },
    {
      id: 307,
      name: "Fluid Mechanics",
      code: "MET203",
      semester: 3,
      branch: "ME",
      description: "Properties of fluids, fluid statics, kinematics, and dynamics.",
      notesCount: 9,
    },

    // Semester 4 - CSE
    {
      id: 401,
      name: "Operating Systems",
      code: "CST202",
      semester: 4,
      branch: "CSE",
      description: "Process management, memory management, file systems, and I/O systems.",
      notesCount: 16,
    },
    {
      id: 402,
      name: "Design and Analysis of Algorithms",
      code: "CST204",
      semester: 4,
      branch: "CSE",
      description: "Algorithm design techniques, complexity analysis, and NP-completeness.",
      notesCount: 14,
    },

    // Semester 4 - ECE
    {
      id: 403,
      name: "Signals and Systems",
      code: "ECT202",
      semester: 4,
      branch: "ECE",
      description: "Continuous and discrete-time signals, linear time-invariant systems, and Fourier analysis.",
      notesCount: 13,
    },
    {
      id: 404,
      name: "Analog Communication",
      code: "ECT204",
      semester: 4,
      branch: "ECE",
      description: "Modulation techniques, noise in communication systems, and transmitter/receiver design.",
      notesCount: 11,
    },

    // Semester 5 - CSE
    {
      id: 501,
      name: "Computer Networks",
      code: "CST301",
      semester: 5,
      branch: "CSE",
      description: "Network architectures, protocols, routing, and network security.",
      notesCount: 15,
    },
    {
      id: 502,
      name: "Database Management Systems",
      code: "CST303",
      semester: 5,
      branch: "CSE",
      description: "Relational database design, SQL, normalization, and transaction management.",
      notesCount: 17,
    },

    // Semester 6 - CSE
    {
      id: 601,
      name: "Compiler Design",
      code: "CST302",
      semester: 6,
      branch: "CSE",
      description: "Lexical analysis, parsing, semantic analysis, and code generation.",
      notesCount: 12,
    },
    {
      id: 602,
      name: "Web Technologies",
      code: "CST304",
      semester: 6,
      branch: "CSE",
      description: "HTML, CSS, JavaScript, server-side programming, and web frameworks.",
      notesCount: 14,
    },

    // Semester 7 - CSE
    {
      id: 701,
      name: "Machine Learning",
      code: "CST401",
      semester: 7,
      branch: "CSE",
      description: "Supervised and unsupervised learning algorithms, neural networks, and applications.",
      notesCount: 16,
    },
    {
      id: 702,
      name: "Cryptography and Network Security",
      code: "CST403",
      semester: 7,
      branch: "CSE",
      description: "Encryption algorithms, digital signatures, authentication, and network security protocols.",
      notesCount: 13,
    },

    // Semester 8 - CSE
    {
      id: 801,
      name: "Distributed Systems",
      code: "CST402",
      semester: 8,
      branch: "CSE",
      description:
        "Principles and paradigms of distributed systems, communication, synchronization, and fault tolerance.",
      notesCount: 10,
    },
    {
      id: 802,
      name: "Cloud Computing",
      code: "CST404",
      semester: 8,
      branch: "CSE",
      description: "Cloud architectures, virtualization, storage, and security in cloud environments.",
      notesCount: 12,
    },
  ],

  // Popular subjects across all branches
  popularSubjects: [
    { name: "Data Structures", code: "CST201" },
    { name: "Operating Systems", code: "CST202" },
    { name: "Database Management Systems", code: "CST303" },
    { name: "Machine Learning", code: "CST401" },
    { name: "Signals and Systems", code: "ECT202" },
    { name: "Fluid Mechanics", code: "MET203" },
  ],
}
