import Hero from '../../components/landing/Hero';
import FeatureGrid from '../../components/landing/FeatureGrid';
import PricingCards from '../../components/landing/PricingCards';
import Testimonials from '../../components/landing/Testimonials';
import DomainSearch from './DomainSearch';
import { useState } from 'react';
import { FaTicketAlt, FaComments, FaPhoneAlt } from 'react-icons/fa';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Is Belfor Tech Hosting affordable for small businesses?",
      answers: [
        "Yes, we offer budget-friendly plans starting at just $2.99/month",
        "Special discounts available for annual billing",
        "30-day money-back guarantee on all plans"
      ]
    },
    {
      question: "Does Belfor Tech provide CMS support?",
      answers: [
        "Full support for WordPress, Joomla, and Drupal",
        "One-click installs for popular CMS platforms",
        "24/7 expert support for CMS-related issues"
      ]
    },
    {
      question: "Do I get a free SSL certificate?",
      answers: [
        "Free Let's Encrypt SSL with all hosting plans",
        "Auto-renewal included at no extra cost",
        "Premium SSL certificates available for e-commerce"
      ]
    },
    {
      question: "Is a free domain name included?",
      answers: [
        "Free domain for 1 year with annual plans",
        ".com, .net and .org domains included",
        "Easy domain management in your control panel"
      ]
    },
    {
      question: "Does Belfor Tech offer 24/7 support?",
      answers: [
        "24/7/365 support via phone, chat and email",
        "Average response time under 15 minutes",
        "Knowledge base with video tutorials"
      ]
    }
  ];

  return (
    <div className="landing-page font-inter">
      <Hero />
      <DomainSearch />
      <PricingCards />
      <FeatureGrid />
      <Testimonials />
      
      {/* Payment Options Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-2xl font-extrabold leading-none text-gray-700 px-3 py-2 mb-8 text-center max-w-max mx-auto">
            PAYMENT OPTIONS
          </h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: "mpesagreen.png", name: "Mpesa" },
              { img: "mastercard.png", name: "Mastercard" },
              { img: "visa.png", name: "Visa" },
              { img: "transfer.jpeg", name: "Bank Transfer" }
            ].map((method, index) => (
              <div key={index} className="border border-blue-200 rounded-lg p-3 flex flex-col items-center">
                <img 
                  src={`src/assets/images/${method.img}`} 
                  alt={method.name} 
                  className="h-8 mb-2" 
                />
                <span className="font-semibold text-sm">{method.name}</span>
              </div>
            ))}
          </div>
          
          <p className="text-gray-600 text-sm mt-4 text-center">
            Pay securely via Paystack (multiple payment options available)
          </p>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-2xl font-extrabold mb-2">Frequently Asked Questions</h1>
          <p className="text-gray-600 mb-8">
            Find answers to common questions about our web hosting services.
          </p>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-blue-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-left">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-blue-700 transition-transform ${activeFaq === index ? 'transform rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeFaq === index && (
                  <div className="p-4 bg-gray-50 border-t border-blue-200">
                    <ul className="list-disc pl-5 space-y-2">
                      {faq.answers.map((answer, i) => (
                        <li key={i} className="text-gray-700">{answer}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Support Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-2xl font-extrabold mb-8 text-center">
            Does Belfor Tech offer 24/7 support?
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { 
                icon: <FaTicketAlt className="text-blue-700 text-2xl mb-3" />,
                title: "Latest Technology", 
                text: "Get dedicated support from our technical team",
                button: "Submit Ticket"
              },
              { 
                icon: <FaComments className="text-blue-700 text-2xl mb-3" />,
                title: "Live Chat", 
                text: "Chat with support now",
                button: "Chat With Us"
              },
              { 
                icon: <FaPhoneAlt className="text-blue-700 text-2xl mb-3" />,
                title: "Call Us", 
                text: "We are standing by! (6 AM - 10 PM)",
                phone: "+254768262704"
              }
            ].map((card, index) => (
              <div key={index} className="border border-blue-200 rounded-lg p-6 text-center">
                {card.icon}
                <h2 className="font-bold text-lg mb-2">{card.title}</h2>
                <p className="text-gray-600 mb-4">{card.text}</p>
                {card.button ? (
                  <button className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1.5 rounded text-sm font-semibold transition-colors">
                    {card.button} →
                  </button>
                ) : (
                  <a 
                    href={`tel:${card.phone}`} 
                    className="text-blue-700 font-semibold hover:text-blue-800 transition-colors text-sm"
                  >
                    {card.phone} →
                  </a>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold mb-2">
              Start your business with BelforTech today!
            </h2>
            <p className="text-gray-600">
              Join over 1 million customers who trust Belfor Tech for their web hosting needs.
            </p>
          </div>
          
          <div className="flex justify-center">
            <button className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-bold transition-colors">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}