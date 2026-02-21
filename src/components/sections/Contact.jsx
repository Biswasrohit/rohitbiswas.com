import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import ContactForm from '../ui/ContactForm';

const Contact = () => {
  const contactJson = [
    { key: 'name', value: '"Rohit Biswas"', type: 'string' },
    { key: 'email', value: '"info.biswasrohit@gmail.com"', type: 'string', href: 'mailto:info.biswasrohit@gmail.com' },
    { key: 'linkedin', value: '"linkedin.com/in/rohitbiswas3"', type: 'string', href: 'https://linkedin.com/in/rohitbiswas3' },
    { key: 'github', value: '"github.com/Biswasrohit"', type: 'string', href: 'https://github.com/Biswasrohit' },
    { key: 'status', value: '"open_to_opportunities"', type: 'keyword' },
    { key: 'response', value: '"within 24 hours"', type: 'string' },
  ];

  return (
    <section id="contact" style={{ background: '#060606' }} className="section-container">
      <SectionHeader
        title="Get in Touch"
        subtitle="Have a question or want to work together? Let's connect!"
        index="06 · contact"
      />

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
        {/* Contact JSON panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="terminal-chrome h-full">
            {/* Tab bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-xs text-white/30 ml-2">contact.json</span>
            </div>

            {/* JSON content */}
            <div className="p-6 font-mono text-sm leading-relaxed">
              <span className="token-punct">{'{'}</span>
              <div className="ml-4 space-y-1 mt-1">
                {contactJson.map((item, i) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <span className="token-fn">"{item.key}"</span>
                    <span className="token-punct">: </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('mailto') ? undefined : '_blank'}
                        rel={item.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                        className={`${item.type === 'keyword' ? 'token-keyword' : 'token-string'} hover:text-[#38bdf8] transition-colors duration-200 underline decoration-white/10 hover:decoration-[#38bdf8]/40`}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className={item.type === 'keyword' ? 'token-keyword' : 'token-string'}>
                        {item.value}
                      </span>
                    )}
                    {i < contactJson.length - 1 && <span className="token-punct">,</span>}
                  </motion.div>
                ))}
              </div>
              <span className="token-punct">{'}'}</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="dark-panel-elevated p-6 md:p-8">
            <h3
              className="text-lg font-bold text-white mb-1"
              style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
            >
              Send a Message
            </h3>
            <p className="font-mono text-xs text-white/30 mb-6">// I'll get back to you soon</p>
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
