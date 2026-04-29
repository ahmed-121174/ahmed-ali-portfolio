"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";
import { personalInfo } from "@/config/personal";

interface FormData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const contactDetails = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: FaPhone,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, "")}`,
  },
  {
    icon: FaMapMarkerAlt,
    label: "Location",
    value: personalInfo.location,
    href: null,
  },
];

const socialLinks = [
  { icon: FaGithub, href: personalInfo.social.github, label: "GitHub" },
  { icon: FaLinkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
  { icon: FaInstagram, href: personalInfo.social.instagram, label: "Instagram" },
];

export default function ContactSection() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState<FormData>({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.from_name || !formData.from_email || !formData.message) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.from_name,
          name: formData.from_name,
          from_email: formData.from_email,
          email: formData.from_email,
          reply_to: formData.from_email,
          subject: formData.subject,
          message: formData.message,
        },
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
        }
      );
      setStatus("success");
      setFormData({ from_name: "", from_email: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try emailing directly.");
    }
  };

  return (
    <section id="contact" className="section relative z-10">
      <div className="container-custom" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title mt-2">Let&apos;s Connect</h2>
          <p className="text-white/50 mt-4 max-w-lg mx-auto">
            Open to research collaborations, internships, and exciting projects.
            I respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 max-w-5xl mx-auto">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Contact details */}
            <div className="space-y-4">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="glass-card p-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/35 uppercase tracking-widest font-mono">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-white/75 hover:text-indigo-400 transition-colors mt-0.5 block"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-white/75 mt-0.5">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability card */}
            <div className="relative overflow-hidden rounded-2xl border border-emerald-500/25 p-5"
              style={{ background: "rgba(16,185,129,0.05)" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-medium text-emerald-400">Currently Available</span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                Seeking fully funded research opportunities and software engineering /
                cybersecurity internships. Response time: &lt;24 hours.
              </p>
            </div>

            {/* Social links */}
            <div>
              <p className="text-[10px] text-white/35 uppercase tracking-widest font-mono mb-4">
                Find me on
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2.5 glass-card text-sm text-white/55 hover:text-white/90 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card p-10 text-center h-full flex flex-col items-center justify-center gap-4"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: 2 }}
                >
                  <FaCheckCircle className="w-16 h-16 text-emerald-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-white font-display">Message Sent!</h3>
                <p className="text-white/55 text-sm max-w-xs">
                  Thanks for reaching out! I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn-outline text-sm mt-2"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="glass-card p-6 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField
                    id="from_name"
                    label="Your Name"
                    name="from_name"
                    type="text"
                    placeholder="Ahmed Ali"
                    value={formData.from_name}
                    onChange={handleChange}
                    required
                  />
                  <InputField
                    id="from_email"
                    label="Your Email"
                    name="from_email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.from_email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <InputField
                  id="subject"
                  label="Subject"
                  name="subject"
                  type="text"
                  placeholder="Research Collaboration / Internship"
                  value={formData.subject}
                  onChange={handleChange}
                />
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs text-white/50 mb-1.5 font-mono uppercase tracking-widest"
                  >
                    Message <span className="text-indigo-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me about your project or opportunity..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white/85 placeholder-white/25 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.05] transition-all resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2">
                    ❌ {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-cosmic w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <span className="relative z-10">Sending...</span>
                      <svg className="w-4 h-4 animate-spin relative z-10" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FaPaperPlane className="w-3.5 h-3.5 relative z-10" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InputField({
  id,
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs text-white/50 mb-1.5 font-mono uppercase tracking-widest"
      >
        {label} {required && <span className="text-indigo-400">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white/85 placeholder-white/25 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.05] transition-all"
      />
    </div>
  );
}
