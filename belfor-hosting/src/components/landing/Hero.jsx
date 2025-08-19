import heroBg from '@assets/images/Hero.png';

export default function Hero() {
  return (
    <section 
      className="relative text-white min-h-[60vh] bg-gradient-to-r from-[#3E38DA] to-[#3E38DA]/90"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'fit',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* <div class="absolute inset-0 bg-[#3E38DA] bg-opacity-25"></div> */}
      <div className="container mx-auto px-6 py-16 h-full flex items-center">
        <div className="text-left w-full md:w-1/2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
  Fastest <span className="text-red-500">Performance</span> Web Hosting
</h1>
          
          <p className="text-lg md:text-xl mb-6 max-w-xl leading-relaxed">
            Take your business online with Belfor Tech Consultants.<br /> 
            Lightning-fast hosting, free SSL, unlimited bandwidth, expert 24/7 support, built for Kenyan businesses.
          </p>
          
          <div className="flex flex-col items-start gap-3 mb-8">
            <div className="bg-white/10 px-4 py-2 rounded-full">
              <span className="font-semibold">Join 1M+ customers using Belfor Host</span>
            </div>
            <button className="bg-white text-[#3E38DA] px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition duration-200">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}