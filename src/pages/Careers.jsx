import { useState, useEffect } from 'react'
import Modal from '../components/ui/Modal'

export default function Careers() {
  const [applyOpen, setApplyOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
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
    qualification: 'B.Tech',
    linkedin: '',
  })

  const webAppUrl =
    'https://script.google.com/macros/s/AKfycbyk4gTgN0wmMno6h8lr_EHIVDFDEtIJAFRxVUZQR88sN4yA8akknfBg4XsdlJfQlRBM/exec'

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
        LinkedIn: form.linkedin,
      })

      const response = await fetch(`${webAppUrl}?${params.toString()}`)
      const result = await response.json()

      if (!result.success) {
        setResultMessage({ type: 'error', message: result.message })
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
        qualification: 'B.Tech',
        linkedin: '',
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

  return (
    <main className="bg-black min-h-screen">
      <section className="px-6 py-24 max-w-5xl mx-auto text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Careers at Buildbot
        </h1>

        {loadingJobs ? (
          <p className="text-gray-400">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16">
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
            <h2 className="text-2xl font-bold mb-3">No Open Positions</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              We don't have any open positions at the moment. Please check back later or follow us on social media for updates on new opportunities.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.Role}
                className="rounded-xl border border-white/10 p-6 bg-white/5"
              >
                <h2 className="text-xl font-semibold mb-1">{job.Role}</h2>

                <p className="text-sm text-gray-400 mb-2">
                  {job.Department} · {job.Location} · {job.WorkMode}
                </p>

                <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                  {job.Description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {job.EmploymentType} · Openings: {job.Openings}
                  </span>

                  <button
                    onClick={() => {
                      setSelectedJob(job)
                      setApplyOpen(true)
                      setShowResultScreen(false)
                      setResultMessage({ type: '', message: '' })
                    }}
                    className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-300"
                  >
                    Apply now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===============================
          MODAL
      =============================== */}
      <Modal
        open={applyOpen}
        onClose={closeModal}
        title={
          showResultScreen
            ? ''
            : selectedJob
            ? `Apply for ${selectedJob.Role}`
            : ''
        }
      >
        {showResultScreen ? (
          /* RESULT SCREEN — UNCHANGED */
          <div className="text-center py-12 px-6">
            <h3
              className={`text-2xl font-bold mb-4 ${
                resultMessage.type === 'success'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {resultMessage.type === 'success' ? 'Success!' : 'Oops!'}
            </h3>
            <p className="text-gray-700 mb-8">{resultMessage.message}</p>
            <button
              onClick={closeModal}
              className="px-6 py-3 rounded-lg bg-black text-white"
            >
              Close
            </button>
          </div>
        ) : (
          /* FORM - Modern Glassmorphism with Yellow Theme */
          <form className="space-y-4 p-4 rounded-2xl bg-gradient-to-br from-yellow-50/80 via-white/50 to-amber-50/80 backdrop-blur-xl border border-white/20 shadow-xl" onSubmit={handleSubmit}>
            {/* Role Badge */}
            <div className="relative group">
              <label className="block">
                <span className="text-[10px] uppercase tracking-wide font-semibold text-yellow-600 mb-1.5 block">
                  Applying for
                </span>
                <div className="relative">
                  <input
                    readOnly
                    value={selectedJob?.Role || ''}
                    className="w-full rounded-lg border-2 border-yellow-200/50 px-3 py-2 bg-white/60 backdrop-blur-sm text-gray-800 text-sm font-medium shadow-sm focus:outline-none focus:border-yellow-400 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-amber-400/0 pointer-events-none"></div>
                </div>
              </label>
            </div>

            {/* Personal Information Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 pb-1.5 border-b border-yellow-200/50">
                <svg className="w-3.5 h-3.5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="block group">
                  <span className="text-[11px] font-medium text-gray-600 mb-1 block transition-colors group-focus-within:text-yellow-600">
                    Full Name *
                  </span>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border-2 border-gray-200/50 px-3 py-2 text-sm bg-white/60 backdrop-blur-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 focus:bg-white/80 focus:shadow-lg focus:shadow-yellow-100 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </label>

                <label className="block group">
                  <span className="text-[11px] font-medium text-gray-600 mb-1 block transition-colors group-focus-within:text-yellow-600">
                    Email Address *
                  </span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border-2 border-gray-200/50 px-3 py-2 text-sm bg-white/60 backdrop-blur-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 focus:bg-white/80 focus:shadow-lg focus:shadow-yellow-100 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </label>
              </div>

              <label className="block group">
                <span className="text-[11px] font-medium text-gray-600 mb-1 block transition-colors group-focus-within:text-yellow-600">
                  Phone Number *
                </span>
                <input
                  type="tel"
                  required
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  className="w-full rounded-lg border-2 border-gray-200/50 px-3 py-2 text-sm bg-white/60 backdrop-blur-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 focus:bg-white/80 focus:shadow-lg focus:shadow-yellow-100 transition-all duration-300"
                  placeholder="+1 (555) 000-0000"
                />
              </label>
            </div>

            {/* Professional Information Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 pb-1.5 border-b border-yellow-200/50">
                <svg className="w-3.5 h-3.5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Professional Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="block group">
                  <span className="text-[11px] font-medium text-gray-600 mb-1 block transition-colors group-focus-within:text-yellow-600">
                    Years of Experience *
                  </span>
                  <input
                    type="number"
                    required
                    min="0"
                    value={form.yearsOfExperience}
                    onChange={(e) => setForm({ ...form, yearsOfExperience: e.target.value })}
                    className="w-full rounded-lg border-2 border-gray-200/50 px-3 py-2 text-sm bg-white/60 backdrop-blur-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 focus:bg-white/80 focus:shadow-lg focus:shadow-yellow-100 transition-all duration-300"
                    placeholder="5"
                  />
                </label>

                <label className="block group">
                  <span className="text-[11px] font-medium text-gray-600 mb-1 block transition-colors group-focus-within:text-yellow-600">
                    Qualification * <span className="text-gray-400 text-[9px] normal-case">(only listed eligible)</span>
                  </span>
                  <select
                    required
                    value={form.qualification}
                    onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                    className="w-full rounded-lg border-2 border-gray-200/50 px-3 py-2 text-sm bg-white/60 backdrop-blur-sm text-gray-800 focus:outline-none focus:border-yellow-400 focus:bg-white/80 focus:shadow-lg focus:shadow-yellow-100 transition-all duration-300 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25em] bg-[right_0.5rem_center] bg-no-repeat pr-9"
                  >
                    <option value="B.Tech">B.Tech</option>
                    <option value="MCA">MCA</option>
                  </select>
                </label>
              </div>

              <label className="block group">
                <span className="text-[11px] font-medium text-gray-600 mb-1 block transition-colors group-focus-within:text-yellow-600">
                  LinkedIn Profile <span className="text-gray-400">(optional)</span>
                </span>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <input
                    type="url"
                    value={form.linkedin}
                    onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                    className="w-full rounded-lg border-2 border-gray-200/50 pl-9 pr-3 py-2 text-sm bg-white/60 backdrop-blur-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 focus:bg-white/80 focus:shadow-lg focus:shadow-yellow-100 transition-all duration-300"
                    placeholder="linkedin.com/in/yourprofile"
                  />
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2 text-sm rounded-lg bg-white/80 backdrop-blur-sm text-gray-700 font-medium border-2 border-gray-200/50 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 text-sm rounded-lg bg-gradient-to-r from-yellow-400 to-amber-400 text-black font-semibold hover:from-yellow-500 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40 hover:-translate-y-0.5 transform"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </main>
  )
}
