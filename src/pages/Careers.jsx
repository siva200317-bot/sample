import { useState, useEffect } from 'react'
import Modal from '../components/ui/Modal'
import JobDetailsModal from '../components/JobDetailsModal'

export default function Careers() {
  const [applyOpen, setApplyOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [selectedViewJob, setSelectedViewJob] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [showResultScreen, setShowResultScreen] = useState(false)
  const [resultMessage, setResultMessage] = useState({ type: '', message: '' })

  // ✅ NEW: jobs state
  const [jobs, setJobs] = useState([])
  const [loadingJobs, setLoadingJobs] = useState(true)

  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    yearsOfExperience: '',
    qualification: '',
    linkedin: '',
    note: '',
  })

  const webAppUrl =
    'https://script.google.com/macros/s/AKfycbxoqd1fAn3jgLiAs24-FHPjCRGHUM2aK8gNfM7NbSGTzMxTTQYgkH7oje5reM7oPDgn/exec'

  // ===============================
  // FETCH JOBS
  // ===============================
  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch(`${webAppUrl}?action=jobs`)
        const data = await res.json()
        if (data.success) {
          setJobs(data.jobs)
        }
      } catch (err) {
        console.error('Failed to load jobs', err)
      } finally {
        setLoadingJobs(false)
      }
    }

    fetchJobs()
  }, [])

  // ===============================
  // SUBMIT APPLICATION
  // ===============================
  async function handleSubmit(e) {
    e.preventDefault()
    if (submitting || !selectedJob) return

    setSubmitting(true)

    try {
      const params = new URLSearchParams({
        action: 'apply',
        Name: form.name.trim(),
        Email: form.email.trim().toLowerCase(),
        Phone: form.mobile.replace(/\D/g, ''),
        Role: selectedJob.Role,
        YearsOfExperience: form.yearsOfExperience,
        Qualification: form.qualification,
        LinkedIn: form.linkedin.trim(),
        Note: form.note.trim(),
      })

      const response = await fetch(`${webAppUrl}?${params.toString()}`)
      const result = await response.json()

      if (!result.success) {
        // Check if it's a duplicate application error
        if (result.duplicate) {
          setResultMessage({ 
            type: 'error', 
            message: result.message || 'You have already applied for this position recently. Our cooling period is 6 months. Please try again after that period or apply for a different role.'
          })
        } else {
          setResultMessage({ type: 'error', message: result.message })
        }
        setShowResultScreen(true)
        return
      }

      setResultMessage({
        type: 'success',
        message:
          'Application submitted successfully! Thank you for your interest. We will review your application and get back to you soon.',
      })
      setShowResultScreen(true)

      setForm({
        name: '',
        email: '',
        mobile: '',
        yearsOfExperience: '',
        qualification: '',
        linkedin: '',
        note: '',
      })
    } catch (err) {
      console.error(err)
      setResultMessage({
        type: 'error',
        message: 'Network error. Please try again.',
      })
      setShowResultScreen(true)
    } finally {
      setSubmitting(false)
    }
  }

  function closeModal() {
    setApplyOpen(false)
    setShowResultScreen(false)
    setResultMessage({ type: '', message: '' })
    setSelectedJob(null)
  }

  function closeViewModal() {
    setViewOpen(false)
    setSelectedViewJob(null)
  }

  const [filterDepartment, setFilterDepartment] = useState('All locations')

  // Get unique departments for filters
  const departments = ['All locations', 'Engineering', 'Product & Design', 'Operations']

  // Filter jobs based on selected department
  const filteredJobs = filterDepartment === 'All locations' 
    ? jobs 
    : jobs.filter(job => {
        if (filterDepartment === 'Engineering') return job.Department?.toLowerCase().includes('engineering')
        if (filterDepartment === 'Product & Design') return job.Department?.toLowerCase().includes('product') || job.Department?.toLowerCase().includes('design')
        if (filterDepartment === 'Operations') return job.Department?.toLowerCase().includes('operations')
        return true
      })

  return (
    <main className="bg-black min-h-screen">
      <section className="px-6 py-24 max-w-7xl mx-auto text-white">
        {/* Header with banner */}
        <div className="mb-8 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5 flex items-center gap-3">
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">More open roles at Buildbot</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Explore all current opportunities
        </h1>
        <p className="text-gray-400 mb-8 max-w-2xl">
          Browse additional roles across product, engineering, design, and operations. Select a role to view details and continue your application.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setFilterDepartment(dept)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterDepartment === dept
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              {dept === 'All locations' && (
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
              {dept === 'Engineering' && (
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              )}
              {dept === 'Product & Design' && (
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              )}
              {dept === 'Operations' && (
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )}
              {dept}
            </button>
          ))}
        </div>

        {loadingJobs ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 animate-pulse">
                <div className="h-6 bg-gray-800 rounded w-1/3 mb-3" />
                <div className="h-4 bg-gray-800 rounded w-1/2 mb-4" />
                <div className="h-4 bg-gray-800 rounded w-full mb-2" />
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-800 rounded w-1/4" />
                  <div className="h-10 bg-gray-800 rounded w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-16 border border-gray-800 rounded-2xl">
            <div className="mb-6">
              <svg
                className="w-24 h-24 mx-auto text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3">No positions found</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              {jobs.length === 0 
                ? "We don't have any open positions at the moment. Please check back later."
                : "No positions match this filter. Try selecting a different department."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.Role}
                className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-900/30 hover:border-gray-700 transition-all p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <h2 className="text-xl font-semibold">{job.Role}</h2>
                      <span className="px-2 py-1 rounded text-xs bg-blue-900/50 text-blue-300 border border-blue-800">
                        {job.EmploymentType || 'Full-time'} · {job.WorkMode || 'Hybrid'}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-2">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.Location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {job.Experience || '7+ years experience'}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {job.Department}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        Posted {job.PostedDate || '3 days ago'} · {job.Priority === 'High' ? 'High priority' : ''}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedViewJob(job)
                        setViewOpen(true)
                      }}
                      className="px-4 py-2 rounded-full border border-gray-700 text-gray-300 font-medium hover:bg-gray-800 transition-colors whitespace-nowrap"
                    >
                      View details
                    </button>
                    <button
                      onClick={() => {
                        setSelectedJob(job)
                        setApplyOpen(true)
                        setShowResultScreen(false)
                        setResultMessage({ type: '', message: '' })
                      }}
                      className="px-6 py-2.5 rounded-full bg-yellow-500 text-black font-medium hover:bg-yellow-400 transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                      Apply now
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===============================
          APPLY MODAL
      =============================== */}
      <Modal
        open={applyOpen}
        onClose={closeModal}
        title={''}
        dark={true}
      >
        {showResultScreen ? (
          <div className="p-6 bg-gray-900 rounded-xl text-white">
            <div className="md:flex gap-8">
              <div className="flex-1">
                {resultMessage.type === 'success' ? (
                  <>
                    <div className="bg-green-900 text-green-400 rounded px-2 py-1 inline-flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Application submitted
                    </div>
                    <h1 className="text-3xl font-bold mt-4">Thank you for applying to Buildbot</h1>
                    <p className="mt-2 text-gray-300">We have received your application for the {selectedJob?.Role} role. Our team will review your profile and get back to you shortly.</p>
                  </>
                ) : (
                  <>
                    <div className="bg-red-900 text-red-400 rounded px-2 py-1 inline-flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Application not submitted
                    </div>
                    <h1 className="text-3xl font-bold mt-4">Unable to submit application</h1>
                    <p className="mt-2 text-gray-300">{resultMessage.message}</p>
                  </>
                )}
                <p className="mt-4">Role: {selectedJob?.Role}</p>
                <p>Location: {selectedJob?.Location} - Hybrid</p>
                <p>Status: Under review</p>
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-300"
                  >
                    View more open roles
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-500"
                  >
                    Back to careers
                  </button>
                </div>
              </div>
              <div className="md:w-80 mt-8 md:mt-0">
                <h3 className="text-lg font-bold">What happens next</h3>
                <p className="mt-2 text-gray-300">We typically review applications within 5-7 business days. If your profile matches what we're looking for, we'll reach out to schedule an initial conversation.</p>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start gap-2">
                    <div className="bg-blue-900 rounded-full w-6 h-6 flex items-center justify-center text-white">✓</div>
                    <div>
                      <p className="font-medium">Step 1. Application received</p>
                      <p className="text-gray-400 text-sm">You'll receive an email confirmation shortly.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-white">?</div>
                    <div>
                      <p className="font-medium">Step 2. Profile review</p>
                      <p className="text-gray-400 text-sm">Our hiring team carefully reviews your qualifications and skills.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-yellow-900 rounded-full w-6 h-6 flex items-center justify-center text-yellow-400">⏰</div>
                    <div>
                      <p className="font-medium">Step 3. Conversation</p>
                      <p className="text-gray-400 text-sm">If selected, we'll invite you to schedule your first call.</p>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-gray-400 text-sm">If you have any questions about your application, you can reach us via the contact details on our website.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-gray-900 rounded-xl text-white">
            <div className="md:flex gap-8">
              <div className="flex-1">
                <p className="text-gray-400 mb-2">* Apply now</p>
                <h1 className="text-4xl font-bold mb-2">{selectedJob?.Role}</h1>
                <p className="mb-2 text-gray-300">{selectedJob?.Description}</p>
                <p className="text-gray-400 mb-6">Location: {selectedJob?.Location} - Hybrid  Type: {selectedJob?.EmploymentType}  Team: {selectedJob?.Department}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <label className="block">
                    <span className="text-gray-300">Full name *</span>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="mt-1 w-full rounded-lg bg-gray-800 border border-gray-600 p-2 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-gray-300">Email address *</span>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="name@example.com"
                        className="mt-1 w-full rounded-lg bg-gray-800 border border-gray-600 p-2 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="text-gray-300">Phone number *</span>
                      <input
                        type="tel"
                        required
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        placeholder="+91 ..."
                        className="mt-1 w-full rounded-lg bg-gray-800 border border-gray-600 p-2 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-gray-300">Highest qualification *</span>
                      <input
                        type="text"
                        required
                        value={form.qualification}
                        onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                        placeholder="Eg. B.Tech CSE, M.Sc Data Science"
                        className="mt-1 w-full rounded-lg bg-gray-800 border border-gray-600 p-2 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="text-gray-300">Years of experience *</span>
                      <input
                        type="text"
                        required
                        min="0"
                        value={form.yearsOfExperience}
                        onChange={(e) => setForm({ ...form, yearsOfExperience: e.target.value })}
                        placeholder="Eg. 3+ years"
                        className="mt-1 w-full rounded-lg bg-gray-800 border border-gray-600 p-2 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-gray-300">LinkedIn or portfolio URL</span>
                    <input
                      type="url"
                      value={form.linkedin}
                      onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                      placeholder="https://"
                      className="mt-1 w-full rounded-lg bg-gray-800 border border-gray-600 p-2 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-300">Tell us briefly why you want to work at Buildbot</span>
                    <textarea
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                      placeholder="Share a short note about your experience and interests..."
                      className="mt-1 w-full rounded-lg bg-gray-800 border border-gray-600 p-2 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none h-24"
                    />
                  </label>
                  <div className="flex justify-end gap-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-300 disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : 'Submit application'}
                    </button>
                  </div>
                </form>
              </div>
              <div className="md:w-80 bg-gray-800 p-4 rounded-lg mt-8 md:mt-0">
                <h3 className="text-lg font-bold">Buildbot - {selectedJob?.Role}</h3>
                <p className="mt-2 text-gray-300">You are applying for</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="bg-blue-900 px-2 py-1 rounded text-sm">{selectedJob?.Department}</span>
                  <span className="bg-blue-900 px-2 py-1 rounded text-sm">{selectedJob?.EmploymentType}</span>
                  <span className="bg-blue-900 px-2 py-1 rounded text-sm">Hybrid-{selectedJob?.Location.split(',')[0]}</span>
                </div>
                <h4 className="mt-4 font-bold">Application steps</h4>
                <ul className="mt-2 space-y-2 text-gray-300">
                  <li className="flex items-center gap-2"> <span className="text-yellow-400">•</span> 1. Fill out your details</li>
                  <li className="flex items-center gap-2"> <span className="text-gray-400">•</span> 2. Review & submit</li>
                  <li className="flex items-center gap-2"> <span className="text-gray-400">•</span> 3. Application received</li>
                </ul>
                <p className="mt-4 text-gray-400 text-sm bg-blue-900/50 p-2 rounded">Your details are securely stored and used only for recruitment at Buildbot Technologies.</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* ===============================
          VIEW JOB MODAL
      =============================== */}
      <Modal
        open={viewOpen}
        onClose={closeViewModal}
        title=""
        fullScreen={true}
      >
        <JobDetailsModal
          job={selectedViewJob}
          onClose={closeViewModal}
          onApply={() => {
            setViewOpen(false)
            setSelectedJob(selectedViewJob)
            setApplyOpen(true)
          }}
        />
      </Modal>
    </main>
  )
}