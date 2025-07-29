import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQSection: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const faqs = [
    {
      question: "How can I submit my business idea on 10000ideas?",
      answer: "Simply fill out our comprehensive form above with details about your idea, including the title, category, description, investment needs, target market, and your contact information. Our team will review your submission within 48 hours and provide detailed feedback on feasibility and market potential."
    },
    {
      question: "Can I share my business report along with my idea submission?",
      answer: "Yes, absolutely! We encourage submitting any supporting documents including business reports, market research, financial projections, or prototype information. This additional material helps our evaluation team provide more accurate and comprehensive feedback on your business idea."
    },
    {
      question: "Can I connect with other users and entrepreneurs on 10000ideas?",
      answer: "Yes, our platform includes networking features that allow you to connect with fellow entrepreneurs, mentors, and potential collaborators. You can join discussion forums, participate in webinars, and access our entrepreneur community to share experiences and build valuable business relationships."
    },
    {
      question: "Are there any resources available to support the development of the business idea?",
      answer: "We provide extensive resources including business plan templates, market research tools, funding guides, legal document templates, and access to our mentor network. Additionally, we offer workshops, webinars, and one-on-one consultation sessions to help develop your idea into a viable business."
    },
    {
      question: "What is the fee for buying a business idea report?",
      answer: "Our detailed business idea reports start from $99 and include comprehensive market analysis, competitive landscape, financial projections, implementation roadmap, and risk assessment. Premium reports with additional features like mentor consultation and investor connections are available for $299."
    },
    {
      question: "Can I seek investment or funding opportunities through 10000ideas?",
      answer: "Yes, we have partnerships with angel investors, venture capital firms, and funding organizations. Based on your idea's evaluation score and market potential, we can facilitate introductions to relevant investors and help you prepare for funding presentations and pitch sessions."
    },
    {
      question: "Can I share my success stories or testimonials on the website?",
      answer: "Absolutely! We love celebrating our community's successes. You can submit your success stories, case studies, and testimonials through our 'Success Stories' section. Featured stories may be highlighted on our homepage and used in our marketing materials with your permission."
    },
    {
      question: "Can I protect my intellectual property when submitting my business idea?",
      answer: "Yes, we take intellectual property protection very seriously. All submissions are protected under strict confidentiality agreements. We also provide guidance on patent applications, trademark registration, and can connect you with IP lawyers. Consider filing provisional patents before submission for additional protection."
    }
  ];

  const toggleExpanded = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gray-900">YOU ASKED.</span>{" "}
            <span className="text-blue-600">WE ANSWERED</span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about submitting your ideas
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleExpanded(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {expandedItem === index ? (
                    <FaChevronUp className="text-blue-600 text-sm" />
                  ) : (
                    <FaChevronDown className="text-blue-600 text-sm" />
                  )}
                </div>
              </button>
              
              {expandedItem === index && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-blue-700 mb-4">
              Our team is here to help you bring your ideas to life.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-200">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 