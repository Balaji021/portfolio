import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, FileText } from 'lucide-react';
import { useState } from 'react';
import ParticleBackground from './ParticleBackground';
import FloatingShape from './FloatingShape';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  // Google Apps Script submission (client-side, free)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Balaji021', label: 'GitHub', color: '#333' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/balajiselvaraj0211', label: 'LinkedIn', color: '#0077B5' },
    { icon: Instagram, href: 'https://www.instagram.com/black_hawk__2?igsh=cTNwbHYzYWJpc2xz', label: 'Instagram', color: '#E1306C' },
    { icon: FileText, href: '/Balaji_Resume.pdf', label: 'Resume', color: '#6B7280' },
  ];

  const contactInfo = [
    { icon: Mail, title: 'Email', value: 'balaji12.work@gmail.com', href: 'mailto:balaji12.work@gmail.com' },
    { icon: Phone, title: 'Phone', value: '+91 9360201078', href: 'tel:+919360201078' },
    { icon: MapPin, title: 'Location', value: 'Coimbatore, Tamil Nadu', href: '#' },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus('submitting');
    try {
      const ENDPOINT = import.meta.env.VITE_GAS_ENDPOINT as string;
      if (!ENDPOINT) {
        throw new Error('Missing VITE_GAS_ENDPOINT');
      }
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const params = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        to_email: 'balaji12.work@gmail.com',
        source: 'portfolio',
        ts: String(Date.now())
      });
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`GAS returned ${res.status}: ${text}`);
      }
      const data = await res.json().catch(() => ({ ok: res.ok }));
      if (data && data.ok === false) {
        throw new Error(data.error || 'Unknown error');
      }
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('GAS send failed:', err);
      // Fallback: try a no-cors POST so Gmail still receives the message
      try {
        const ENDPOINT = import.meta.env.VITE_GAS_ENDPOINT as string;
        const params = new URLSearchParams({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to_email: 'balaji12.work@gmail.com',
          source: 'portfolio',
          ts: String(Date.now())
        });
        await fetch(ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        });
        // We cannot read the response in no-cors mode, assume success
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } catch (fallbackErr) {
        console.error('no-cors fallback failed:', fallbackErr);
        setErrorMsg(err instanceof Error ? err.message : 'Failed to send');
        setStatus('error');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="relative min-h-screen py-20">
      <ParticleBackground id="contactParticles" config="minimal" />
      {/* 3D Floating Shapes (decorative) */}
      <div className="absolute top-16 left-10 w-20 h-20 opacity-30">
        <FloatingShape />
      </div>
      <div className="absolute bottom-20 right-12 w-24 h-24 opacity-25">
        <FloatingShape />
      </div>
      <div className="absolute top-1/3 right-6 w-16 h-16 opacity-20">
        <FloatingShape />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-4 sm:mb-6">Get In Touch</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Ready to bring your ideas to life? Let's create something amazing together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="glass p-6 sm:p-8 hover:shadow-glow-primary transition-all duration-500">
              <CardContent className="p-0">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 gradient-text">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="glass border-primary/30 focus:border-primary focus:shadow-glow-primary transition-all duration-300"
                      required
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="glass border-primary/30 focus:border-primary focus:shadow-glow-primary transition-all duration-300"
                      required
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="glass border-primary/30 focus:border-primary focus:shadow-glow-primary transition-all duration-300 min-h-32"
                      required
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full group disabled:opacity-60"
                      disabled={status === 'submitting'}
                    >
                      <Send className="mr-2 group-hover:animate-pulse" />
                      {status === 'submitting' ? 'Sending…' : status === 'success' ? 'Sent!' : 'Send Message'}
                    </Button>
                    {status === 'error' && (
                      <p className="mt-2 text-sm text-red-400">Unable to send right now. Please try again later.</p>
                    )}
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Contact Information */}
            <Card className="glass p-8 hover:shadow-glow-secondary transition-all duration-500">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-6 gradient-text">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <motion.a
                        key={info.title}
                        href={info.href}
                        className="flex items-center space-x-4 p-4 rounded-lg glass hover:shadow-glow-primary transition-all duration-300 group"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="p-2 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-all duration-300">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{info.title}</div>
                          <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                            {info.value}
                          </div>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="glass p-6 sm:p-8 hover:shadow-glow-accent transition-all duration-500">
              <CardContent className="p-0">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 gradient-text">Follow Me</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg glass hover:shadow-glow-primary transition-all duration-300 group"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                      >
                        <div className="p-2 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-all duration-300">
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <span className="font-medium text-xs sm:text-sm">{social.label}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;