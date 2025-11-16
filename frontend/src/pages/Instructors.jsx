export default function Instructors() {
  const instructors = [
    {
      name: "Dr. Maria Gomez",
      title: "AI & Machine Learning Expert",
      bio: "Maria is a data scientist with 10+ years of experience teaching AI, ML, and Deep Learning to over 30,000 students worldwide.",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=60",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      name: "Ethan Clark",
      title: "Full Stack Developer",
      bio: "Ethan has built scalable web apps for top tech companies and now helps students master React, Node.js, and cloud computing.",
      image:
        "https://images.unsplash.com/photo-1603415526960-f7e0328b9a9d?auto=format&fit=crop&w=800&q=60",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      name: "Lisa Tran",
      title: "UI/UX Designer",
      bio: "Lisa is a senior product designer passionate about creating intuitive user experiences and teaching design systems.",
      image:
        "https://images.unsplash.com/photo-1551836022-4c4c79ecde18?auto=format&fit=crop&w=800&q=60",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Page Header */}
        <h1 className="text-5xl font-extrabold text-blue-700 mb-6 drop-shadow-sm">
          Meet Our Expert <span className="text-pink-600">Instructors</span> 👩‍🏫
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
          Learn from industry leaders who are passionate about sharing their knowledge
          and guiding you toward success.
        </p>

        {/* Instructors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {instructors.map((inst, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-white via-yellow-50 to-pink-50 border border-pink-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center"
            >
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={inst.image}
                  alt={inst.name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg mb-6"
                />
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
              </div>

              {/* Instructor Info */}
              <h3 className="text-2xl font-bold text-blue-700 mb-1">
                {inst.name}
              </h3>
              <p className="text-pink-600 font-medium mb-3">{inst.title}</p>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed px-2">
                {inst.bio}
              </p>

              {/* Social Links */}
              <div className="flex justify-center space-x-5">
                <a
                  href={inst.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-full transition"
                >
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a
                  href={inst.social.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-yellow-100 hover:bg-yellow-200 text-blue-500 p-2 rounded-full transition"
                >
                  <i className="fab fa-twitter text-xl"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-pink-500 text-white py-10 px-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Want to Teach on <span className="text-yellow-300">SkillSphere?</span>
          </h2>
          <p className="text-blue-50 mb-6">
            Join our growing community of passionate educators and reach learners worldwide.
          </p>
          <a
            href="/contact"
            className="bg-white text-blue-700 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-100 transition"
          >
            Become an Instructor ✨
          </a>
        </div>
      </div>
    </div>
  );
}
