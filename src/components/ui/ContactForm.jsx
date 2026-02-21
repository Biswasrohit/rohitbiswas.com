import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const formRef = useRef();
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const templateIdAutoreply = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_AUTOREPLY;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        const form = formRef.current;
        const name = form.user_name.value;
        const email = form.user_email.value;
        const message = form.message.value;

        window.location.href = `mailto:info.biswasrohit@gmail.com?subject=Contact from ${name}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
        setStatus({ type: 'success', message: 'Opening your email client...' });
        setIsSubmitting(false);
        return;
      }

      const emailPromises = [
        emailjs.sendForm(serviceId, templateId, formRef.current, publicKey),
      ];

      if (templateIdAutoreply) {
        emailPromises.push(
          emailjs.sendForm(serviceId, templateIdAutoreply, formRef.current, publicKey)
        );
      }

      await Promise.all(emailPromises);
      setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again or email me directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Hidden field for recipient email */}
      <input type="hidden" name="to_email" value="info.biswasrohit@gmail.com" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="user_name" className="block font-mono text-xs text-white/50 uppercase tracking-wider mb-2">
            name
          </label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            required
            className="input-terminal"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="user_email" className="block font-mono text-xs text-white/50 uppercase tracking-wider mb-2">
            email
          </label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            required
            className="input-terminal"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block font-mono text-xs text-white/50 uppercase tracking-wider mb-2">
          subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="input-terminal"
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-mono text-xs text-white/50 uppercase tracking-wider mb-2">
          message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="input-terminal resize-none"
          placeholder="Your message..."
        />
      </div>

      {status.message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-sm p-3 rounded-md"
          style={{
            background: status.type === 'success' ? 'rgba(132,204,22,0.08)' : 'rgba(217,70,239,0.08)',
            border: `1px solid ${status.type === 'success' ? 'rgba(132,204,22,0.25)' : 'rgba(217,70,239,0.25)'}`,
            color: status.type === 'success' ? '#84cc16' : '#d946ef',
          }}
        >
          <span className="mr-2">{status.type === 'success' ? '>' : '!'}</span>
          {status.message}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-glow w-full justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            sending...
          </span>
        ) : (
          '$ send_message'
        )}
      </button>
    </motion.form>
  );
};

export default ContactForm;
