export default function Testimonials() {
  const testimonials = [
    {
      name: "Brian M.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "The vision is now hosting providers over the years, but this one might stand-out. The uptime has been excellent - I haven't experienced a single outage in months. What impressed me most was the customer support. I reached out late at night with issues connecting my domain, and someone responded within minutes and walked me through the process step by step."
    },
    {
      name: "Mercy W.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "I love the speed and affordability. Perfect for small businesses like mine. Just wish the dashboard was a bit easier to use. The control panel is simple and clean, and I'm impressed even with high traffic. Highly recommended, especially for SMEs looking to scale online."
    },
    {
      name: "Daniel K.",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      quote: "An exceptional experience! Although there was a slight delay in initial communication, the support arrived right on schedule and perfectly met the specifications. Highly recommend this verified supplier!"
    },
    {
      name: "Sarah J.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      quote: "Fast, reliable, and affordable. What more can you ask for? I use this service for my blog and e-commerce site. It supports WordPress perfectly and comes with all the tools I need. We've seen a noticeable boost in speed compared to our previous host."
    },
    {
      name: "David O.",
      avatar: "https://randomuser.me/api/portraits/men/81.jpg",
      quote: "The local support team understands the Kenyan market well, which makes communication much easier. They even offer M-Pesa payments, which is super convenient. They migrated my existing site without any downtime, and everything worked flawlessly."
    },
    {
      name: "Grace N.",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      quote: "The hosting includes all the standard tools plus some really helpful extras like malware scans and backup software. I had an issue with setting up subdomains, but the support team solved it in under 30 minutes. Still testing the service, but so far I'm impressed."
    }
  ]

  return (
    <section className="py-16" style={{
      background: 'radial-gradient(100% 223.14% at 100% 0%, #3E38DA 40.39%, #00105D 100%)'
    }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">More than 1M Use Our Services</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Hear what our customers say about Belfor Tech Hosting services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-white">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                </div>
              </div>
              <p className="italic">"{testimonial.quote}"</p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}