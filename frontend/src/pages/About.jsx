export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-yellow-50 py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-blue-700 mb-6 drop-shadow-sm">
          About <span className="text-pink-600">SkillSphere</span>
        </h1>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg mb-16 leading-relaxed">
          SkillSphere is an innovative online learning platform designed to empower
          individuals with high-quality education from world-class instructors.  
          Whether you’re a student, professional, or lifelong learner, our mission
          is to make learning accessible, engaging, and career-focused.
        </p>

        {/* 🌍 Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20 bg-white border border-pink-100 rounded-2xl shadow-lg p-8">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=60"
            alt="Mission"
            className="rounded-2xl shadow-md border border-yellow-100"
          />
          <div className="text-left">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">Our Mission 🎯</h2>
            <p className="text-gray-700 leading-relaxed">
              To democratize education and provide every learner with equal opportunity
              to acquire skills for the digital age.  
              We believe that learning should be hands-on, flexible, and result-oriented.
            </p>
          </div>
        </div>

        {/* 🌠 Vision Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20 bg-gradient-to-r from-yellow-50 to-pink-50 border border-yellow-100 rounded-2xl shadow-lg p-8">
          <div className="text-left">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">Our Vision 🌟</h2>
            <p className="text-gray-700 leading-relaxed">
              To become the go-to global platform for learners and instructors to connect,
              collaborate, and innovate.  
              We aim to build a community-driven ecosystem for skill development and lifelong learning.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1581093588401-22b98f04b9e1?auto=format&fit=crop&w=1000&q=60"
            alt="Vision"
            className="rounded-2xl shadow-md border border-pink-100"
          />
        </div>

        {/* 💎 Values Section */}
        <div className="bg-white p-10 rounded-2xl shadow-xl border border-blue-100 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-700 mb-8">Our Core Values 💎</h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-700">
            {/* Accessibility */}
            <div className="bg-gradient-to-br from-pink-50 to-yellow-50 rounded-xl p-6 border border-pink-100 hover:shadow-lg transition">
              <h3 className="font-semibold text-lg text-blue-700 mb-2">
                🌍 Accessibility
              </h3>
              <p className="text-gray-600">
                Education should be available to everyone, everywhere.
              </p>
            </div>

            {/* Innovation */}
            <div className="bg-gradient-to-br from-yellow-50 to-pink-50 rounded-xl p-6 border border-yellow-100 hover:shadow-lg transition">
              <h3 className="font-semibold text-lg text-blue-700 mb-2">
                💡 Innovation
              </h3>
              <p className="text-gray-600">
                We constantly innovate to deliver better, smarter learning experiences.
              </p>
            </div>

            {/* Community */}
            <div className="bg-gradient-to-br from-pink-50 to-yellow-50 rounded-xl p-6 border border-pink-100 hover:shadow-lg transition">
              <h3 className="font-semibold text-lg text-blue-700 mb-2">
                🤝 Community
              </h3>
              <p className="text-gray-600">
                We believe in growing together through collaboration, creativity, and sharing knowledge.
              </p>
            </div>
          </div>
        </div>

        {/* 💬 Closing Note */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            At <span className="text-pink-600 font-semibold">SkillSphere</span>,  
            we’re not just building an education platform —  
            we’re creating a movement that inspires people to learn, create, and lead the future. 🚀
          </p>
        </div>
      </div>
    </div>
  );
}
