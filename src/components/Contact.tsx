import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import Lottie from 'lottie-react';

gsap.registerPlugin(ScrollTrigger);

const robotAnimation = {
  v: '5.5.7',
  fr: 30,
  ip: 0,
  op: 60,
  w: 150,
  h: 150,
  nm: 'Robot',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Robot',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], e: [10] },
            { t: 30, s: [10], e: [0] },
            { t: 60, s: [0] },
          ],
        },
        p: { a: 0, k: [75, 75, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'rc',
              d: 1,
              s: { a: 0, k: [60, 60] },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 10 },
            },
            {
              ty: 'fl',
              c: { a: 0, k: [0, 1, 1, 1] },
              o: { a: 0, k: 100 },
            },
          ],
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
    },
  ],
};

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setMousePosition({ x, y });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    gsap.to(formRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        alert('Message sent! (Demo only)');
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-20 px-4 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-12 text-center"
          style={{ textShadow: '0 0 40px rgba(168, 85, 247, 0.4)' }}
        >
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div
              className="p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-purple-500/30"
              style={{
                boxShadow: '0 0 40px rgba(168, 85, 247, 0.2)',
              }}
            >
              <h3 className="text-3xl font-bold text-cyan-400 mb-6">Let's Create Something Amazing</h3>
              <p className="text-cyan-100 mb-8 leading-relaxed">
                Ready to bring your ideas to life? I'm always open to discussing new projects,
                creative ideas, or opportunities to be part of your visions.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'hello@future.dev', href: 'mailto:hello@future.dev' },
                  { icon: Phone, label: '+1 (555) 123-4567', href: 'tel:+15551234567' },
                  { icon: MapPin, label: 'San Francisco, CA' },
                ].map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <a
                      key={index}
                      href={contact.href}
                      className="flex items-center gap-4 p-4 rounded-xl backdrop-blur-lg bg-white/5 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group"
                    >
                      <Icon
                        className="text-cyan-400 group-hover:scale-110 transition-transform"
                        size={24}
                        style={{
                          filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))',
                        }}
                      />
                      <span className="text-cyan-100">{contact.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-40 h-40">
                <Lottie animationData={robotAnimation} loop />
              </div>
            </div>
          </div>

          <div
            className="p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-cyan-500/30"
            style={{
              boxShadow: '0 0 40px rgba(0, 255, 255, 0.2)',
            }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-cyan-400 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border-2 border-cyan-500/30 text-cyan-100 placeholder-cyan-600 focus:border-cyan-400 focus:outline-none transition-all"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)',
                  }}
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-cyan-400 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border-2 border-cyan-500/30 text-cyan-100 placeholder-cyan-600 focus:border-cyan-400 focus:outline-none transition-all"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)',
                  }}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-cyan-400 font-semibold mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border-2 border-cyan-500/30 text-cyan-100 placeholder-cyan-600 focus:border-cyan-400 focus:outline-none transition-all resize-none"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)',
                  }}
                  placeholder="Tell me about your project..."
                />
              </div>

              <div onMouseMove={handleMouseMove} className="relative">
                <button
                  ref={buttonRef}
                  type="submit"
                  className="relative w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-lg rounded-xl overflow-hidden group"
                  style={{
                    boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
                    transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
                    transition: 'transform 0.2s ease-out',
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Send size={20} />
                    Send Message
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
