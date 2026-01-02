import { useState } from 'react'
import Modal from '../components/ui/Modal'

export default function Careers() {
  const [applyOpen, setApplyOpen] = useState(false)
  const [role, setRole] = useState('')
  const [form, setForm] = useState({ name: '', email: '', mobile: '', message: '' })
  const [resume, setResume] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  return (
    <main className="bg-black min-h-screen">
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Careers at Buildbot</h1>
        <p className="text-gray-300 mb-10 max-w-2xl">
          We're always looking for talented engineers, designers, and problem solvers to help us build the future.
          Explore our open roles and reach out even if you don't see a perfect match — we love meeting great people.
        </p>

        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 p-6 bg-white/5">
            <h2 className="text-xl font-semibold mb-2">Full Stack Developer</h2>
            <p className="text-gray-400 mb-4">React, Node.js, TypeScript, REST/GraphQL, SQL/NoSQL</p>
            <button onClick={() => { setRole('Full Stack Developer'); setApplyOpen(true); }} className="inline-block px-4 py-2 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-300">Apply now</button>
          </div>

          <div className="rounded-xl border border-white/10 p-6 bg-white/5">
            <h2 className="text-xl font-semibold mb-2">Support Engineer</h2>
            <p className="text-gray-400 mb-4">Customer support, troubleshooting, incident response, documentation</p>
            <button onClick={() => { setRole('Support Engineer'); setApplyOpen(true); }} className="inline-block px-4 py-2 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-300">Apply now</button>
          </div>

          <div className="rounded-xl border border-white/10 p-6 bg-white/5">
            <h2 className="text-xl font-semibold mb-2">Testing Engineer</h2>
            <p className="text-gray-400 mb-4">Automation testing (Playwright/Jest), API/UI testing, test strategy, CI integration</p>
            <button onClick={() => { setRole('Testing Engineer'); setApplyOpen(true); }} className="inline-block px-4 py-2 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-300">Apply now</button>
          </div>

          <div className="rounded-xl border border-white/10 p-6 bg-white/5">
            <h2 className="text-xl font-semibold mb-2">DevOps Engineer</h2>
            <p className="text-gray-400 mb-4">CI/CD (GitHub Actions), Docker, Kubernetes, cloud (AWS/Azure/GCP), monitoring</p>
            <button onClick={() => { setRole('DevOps Engineer'); setApplyOpen(true); }} className="inline-block px-4 py-2 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-300">Apply now</button>
          </div>
        </div>
      </section>
        {/* Application Modal */}
      <Modal open={applyOpen} onClose={() => setApplyOpen(false)} title={`Apply for ${role}`}>
  <form
    className="space-y-4"
    onSubmit={async (e) => {
      e.preventDefault()
      if (submitting) return
      setSubmitting(true)

      if (!resume) {
        alert("Please upload your resume")
        setSubmitting(false)
        return
      }

      const webAppUrl =
        "https://script.google.com/macros/s/AKfycbwrIVy1ps6NmrLeh1uh3qs_s5t5rax7DidENXF6UEXyuDW4OSUt-7RuKC2IxmMLm_ABsw/exec"

      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result.split(",")[1])
          reader.onerror = reject
          reader.readAsDataURL(file)
        })

      try {
        const base64Resume = await toBase64(resume)

        const formData = new FormData()
        formData.append("name", form.name)
        formData.append("email", form.email)
        formData.append("mobile", form.mobile)
        formData.append("role", role)
        formData.append("message", form.message)
        formData.append("resume", base64Resume)
        formData.append("resumeName", resume.name)
        formData.append("resumeType", resume.type)

        const res = await fetch(webAppUrl, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        })

        const contentType = res.headers.get('content-type') || ''
        let payload
        if (contentType.includes('application/json')) {
          payload = await res.json()
        } else {
          const text = await res.text()
          try { payload = JSON.parse(text) } catch { payload = { success: false, raw: text } }
        }

        if (!res.ok) {
          console.error('Submission failed', { status: res.status, payload })
          alert(`Submission failed (${res.status}). Please try again or contact us.`)
          return
        }

        if (payload && payload.success) {
          alert("Application submitted successfully!")
          setApplyOpen(false)
          setForm({ name: '', email: '', mobile: '', message: '' })
          setResume(null)
        } else {
          console.error('Unexpected response from server', payload)
          alert("We couldn't confirm submission. Please try again.")
        }
      } catch (err) {
        alert("Network or server error. Please try again.")
        console.error('Careers submit error', err)
      } finally {
        setSubmitting(false)
      }
    }}
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <label className="block sm:col-span-2">
        <span className="text-sm font-medium text-gray-700">Role</span>
        <input
          type="text"
          value={role}
          readOnly
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 bg-gray-50 text-gray-700"
          placeholder="Selected role"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-gray-700">Name</span>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          placeholder="Your name"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Email</span>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          placeholder="you@example.com"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Mobile</span>
        <input
          type="tel"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          placeholder="9876543210"
        />
      </label>
    </div>

    <label className="block">
      <span className="text-sm font-medium text-gray-700">Cover letter / Message</span>
      <textarea
        rows={4}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        required
        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
        placeholder={`Tell us why you're a great fit for ${role}`}
      />
    </label>

    <label className="block">
      <span className="text-sm font-medium text-gray-700">Resume (PDF)</span>
      <input
        type="file"
        accept="application/pdf"
        required
        onChange={(e) => setResume(e.target.files[0])}
        className="mt-1 w-full"
      />
    </label>

    <div className="flex items-center justify-end gap-3 pt-2">
      <button
        type="button"
        onClick={() => setApplyOpen(false)}
        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={submitting}
        className={`px-4 py-2 rounded-lg font-medium text-black flex items-center gap-2 ${submitting ? 'bg-yellow-300 cursor-not-allowed opacity-80' : 'bg-yellow-400 hover:bg-yellow-300'}`}
      >
        {submitting && (
          <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        )}
        {submitting ? 'Submitting…' : 'Submit application'}
      </button>
    </div>
  </form>
</Modal>
   </main>
  );
}
