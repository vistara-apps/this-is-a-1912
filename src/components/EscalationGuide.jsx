import React, { useState } from 'react';
import { AlertTriangle, Phone, FileText, ExternalLink, ChevronRight, Scale, Shield } from 'lucide-react';

const EscalationGuide = ({ category, issue }) => {
  const [selectedStep, setSelectedStep] = useState(0);

  const escalationPaths = {
    "Police Encounters": {
      title: "Police Misconduct Escalation",
      icon: <Shield className="w-6 h-6" />,
      steps: [
        {
          title: "Document the Incident",
          description: "Gather evidence immediately while details are fresh",
          actions: [
            "Write down exact details: time, location, officer names/badge numbers",
            "Take photos of any injuries or property damage",
            "Get contact information from witnesses",
            "Seek medical attention if injured (creates medical record)",
            "Keep all receipts and documentation"
          ],
          timeframe: "Immediately",
          priority: "Critical"
        },
        {
          title: "File Internal Complaint",
          description: "Report to the police department's internal affairs division",
          actions: [
            "Contact the department's Internal Affairs or Professional Standards unit",
            "File written complaint with all documentation",
            "Request complaint number and follow-up timeline",
            "Keep copies of all submitted materials"
          ],
          timeframe: "Within 30-180 days (varies by jurisdiction)",
          priority: "High",
          contacts: [
            { name: "Internal Affairs", phone: "Contact local PD", type: "department" }
          ]
        },
        {
          title: "External Oversight",
          description: "File complaints with civilian oversight bodies",
          actions: [
            "Contact civilian review board or police oversight commission",
            "File complaint with state attorney general's office",
            "Report to FBI if federal civil rights violations occurred",
            "Contact ACLU or other civil rights organizations"
          ],
          timeframe: "Within 1 year for federal complaints",
          priority: "High",
          contacts: [
            { name: "FBI Civil Rights Division", phone: "1-800-FBI-TIPS", type: "federal" },
            { name: "ACLU", phone: "Contact local chapter", type: "advocacy" }
          ]
        },
        {
          title: "Legal Action",
          description: "Pursue civil or criminal remedies through courts",
          actions: [
            "Consult with civil rights attorney",
            "Consider Section 1983 federal civil rights lawsuit",
            "File complaint with district attorney for criminal charges",
            "Explore state law remedies"
          ],
          timeframe: "Statute of limitations varies (typically 2-3 years)",
          priority: "Medium",
          contacts: [
            { name: "Civil Rights Attorney", phone: "Contact state bar association", type: "legal" }
          ]
        }
      ]
    },
    "Workplace Rights": {
      title: "Workplace Discrimination Escalation",
      icon: <FileText className="w-6 h-6" />,
      steps: [
        {
          title: "Document Everything",
          description: "Create detailed records of discriminatory incidents",
          actions: [
            "Keep detailed log of incidents with dates, times, witnesses",
            "Save emails, texts, and other communications",
            "Document any negative impacts on work performance reviews",
            "Keep copies of company policies and procedures"
          ],
          timeframe: "Ongoing",
          priority: "Critical"
        },
        {
          title: "Internal Reporting",
          description: "Report to HR or management following company procedures",
          actions: [
            "Review employee handbook for complaint procedures",
            "File formal complaint with HR department",
            "Request written acknowledgment of complaint",
            "Follow up if no response within reasonable time"
          ],
          timeframe: "As soon as possible",
          priority: "High"
        },
        {
          title: "EEOC Complaint",
          description: "File charge with Equal Employment Opportunity Commission",
          actions: [
            "File EEOC charge within 180-300 days of incident",
            "Participate in EEOC investigation process",
            "Consider mediation if offered by EEOC",
            "Obtain Right to Sue letter if needed"
          ],
          timeframe: "180-300 days from incident (varies by state)",
          priority: "Critical",
          contacts: [
            { name: "EEOC", phone: "1-800-669-4000", type: "federal" }
          ]
        },
        {
          title: "Legal Action",
          description: "Pursue lawsuit with employment attorney",
          actions: [
            "Consult with employment discrimination attorney",
            "File lawsuit within 90 days of receiving Right to Sue letter",
            "Consider state law claims in addition to federal",
            "Explore settlement negotiations"
          ],
          timeframe: "90 days from Right to Sue letter",
          priority: "Medium",
          contacts: [
            { name: "Employment Attorney", phone: "Contact state bar association", type: "legal" }
          ]
        }
      ]
    },
    "Housing Rights": {
      title: "Housing Discrimination & Tenant Rights",
      icon: <Scale className="w-6 h-6" />,
      steps: [
        {
          title: "Document the Issue",
          description: "Gather evidence of housing discrimination or violations",
          actions: [
            "Document all communications with landlord",
            "Take photos/videos of property conditions",
            "Keep records of rent payments and receipts",
            "Get witness statements if applicable"
          ],
          timeframe: "Immediately",
          priority: "Critical"
        },
        {
          title: "Contact Landlord",
          description: "Attempt to resolve issue directly with property owner",
          actions: [
            "Send written notice of issue to landlord",
            "Request repairs or resolution in writing",
            "Give reasonable time for response (typically 14-30 days)",
            "Keep copies of all communications"
          ],
          timeframe: "Before escalating",
          priority: "High"
        },
        {
          title: "Local Housing Authority",
          description: "File complaint with local housing or code enforcement",
          actions: [
            "Contact local housing authority or code enforcement",
            "File complaint about habitability issues",
            "Request inspection of property",
            "Follow up on inspection results"
          ],
          timeframe: "If landlord doesn't respond",
          priority: "High",
          contacts: [
            { name: "Local Housing Authority", phone: "Contact city/county", type: "local" }
          ]
        },
        {
          title: "HUD Complaint",
          description: "File discrimination complaint with HUD",
          actions: [
            "File complaint with HUD within 1 year of incident",
            "Participate in HUD investigation",
            "Consider HUD mediation services",
            "Pursue administrative hearing if needed"
          ],
          timeframe: "Within 1 year of discrimination",
          priority: "High",
          contacts: [
            { name: "HUD", phone: "1-800-669-9777", type: "federal" }
          ]
        }
      ]
    }
  };

  const currentPath = escalationPaths[category] || escalationPaths["Police Encounters"];

  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        {currentPath.icon}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{currentPath.title}</h2>
          <p className="text-gray-600">Step-by-step escalation guidance</p>
        </div>
      </div>

      <div className="space-y-4">
        {currentPath.steps.map((step, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedStep === index
                ? 'border-purple-300 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedStep(index)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  selectedStep === index
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  step.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                  step.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {step.priority}
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  selectedStep === index ? 'rotate-90' : ''
                }`} />
              </div>
            </div>

            {selectedStep === index && (
              <div className="mt-4 pt-4 border-t border-purple-200">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Action Steps:</h4>
                    <ul className="space-y-2">
                      {step.actions.map((action, actionIndex) => (
                        <li key={actionIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Timeframe:</h4>
                      <p className="text-sm text-gray-600 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        {step.timeframe}
                      </p>
                    </div>
                    
                    {step.contacts && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Key Contacts:</h4>
                        <div className="space-y-2">
                          {step.contacts.map((contact, contactIndex) => (
                            <div key={contactIndex} className="flex items-center justify-between text-sm">
                              <span className="text-gray-700">{contact.name}</span>
                              <div className="flex items-center space-x-2">
                                <Phone className="w-3 h-3 text-gray-400" />
                                <span className="text-gray-600">{contact.phone}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <ExternalLink className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Additional Resources</h4>
            <p className="text-sm text-blue-700 mt-1">
              Consider consulting with legal aid organizations, civil rights groups, or attorneys 
              who specialize in your specific issue. Many offer free consultations or sliding-scale fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscalationGuide;
