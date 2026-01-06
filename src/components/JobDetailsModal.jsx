export default function JobDetailsModal({ job, onApply, onClose }) {
  if (!job) return null

  return (
    <div className="bg-gradient-to-b from-gray-900 via-[#0a1628] to-black min-h-screen text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-sm text-gray-400">{job.Role} · {job.Department}</span>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-yellow-400/50 text-yellow-400 font-medium hover:bg-yellow-400/10 transition-all duration-300 flex items-center gap-2"
        >
          Back to open roles
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title and Actions */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-6">{job.Role}</h1>
            
            {/* Job Meta Info Pills */}
            <div className="flex flex-wrap gap-3 mb-6">
              {job.Location && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-sm">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.Location}
                </div>
              )}
              
              {(job.EmploymentType || job.WorkMode) && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/30 text-sm">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {[job.EmploymentType, job.WorkMode].filter(Boolean).join(' · ')}
                </div>
              )}
              
              {job.Experience && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/30 border border-green-500/30 text-sm">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {job.Experience}
                </div>
              )}
              
              {job.Department && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-900/30 border border-orange-500/30 text-sm">
                  <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {job.Department}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 ml-8">
            <button
              onClick={onApply}
              className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-yellow-500/30"
            >
              Apply now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            
           
            
            {(job.PostedDate || job.Priority) && (
              <div className="mt-2 px-4 py-2 rounded-lg bg-yellow-900/20 border border-yellow-500/30 flex items-center gap-2 text-sm text-yellow-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {[job.PostedDate, job.Priority].filter(Boolean).join(' · ')}
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About the role */}
            {job.Description && (
              <section className="bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4">About the role</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {job.Description}
                </p>
              </section>
            )}

            {/* What you will work on */}
            {job.Responsibilities && (
              <section className="bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4">What you will work on</h2>
                <ul className="space-y-3 text-gray-300">
                  {job.Responsibilities.split('\n').filter(item => item.trim()).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>{item.trim()}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* What we are looking for */}
            {job.Requirements && (
              <section className="bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4">What we are looking for</h2>
                <ul className="space-y-3 text-gray-300">
                  {job.Requirements.split('\n').filter(item => item.trim()).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>{item.trim()}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Nice to have */}
            {job.NiceToHave && (
              <section className="bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4">Nice to have</h2>
                <ul className="space-y-3 text-gray-300">
                  {job.NiceToHave.split('\n').filter(item => item.trim()).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-gray-500 mt-1">•</span>
                      <span>{item.trim()}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Right Column - Job Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 rounded-2xl p-6 space-y-6 sticky top-6">
              {/* Location */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Location</h3>
                <p className="text-white">{job.Location}</p>
              </div>

              <div className="border-t border-white/10"></div>

              {/* Work mode */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Work mode</h3>
                <p className="text-white">{job.EmploymentType} · {job.WorkMode}</p>
              </div>

              <div className="border-t border-white/10"></div>

              {/* Experience */}
              {job.Experience && (
                <>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Experience</h3>
                    <p className="text-white">{job.Experience}</p>
                  </div>

                  <div className="border-t border-white/10"></div>
                </>
              )}

              {/* Team */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Team</h3>
                <p className="text-white">{job.Department}</p>
              </div>

              <div className="border-t border-white/10"></div>

              {/* Application status */}
              {job.Status && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">Application status</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-green-400 font-medium">{job.Status}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
