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

                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setSelectedViewJob(job)
                        setViewOpen(true)
                      }}
                      className="px-4 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-500"
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
                      className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-300"
                    >
                      Apply now
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