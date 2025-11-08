'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { generateAIResponse } from '../utils/gemini';

export default function QuizInterface({ service, onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [displayedResponse, setDisplayedResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quizData = {
  email: {
    title: "Professional Email Setup",
    questions: [
      { id: 1, question: "What is the purpose of the email?", type: "choice", options: ["Inquiry", "Follow-up", "Complaint", "Job application", "Business proposal", "Reminder", "Invitation", "General communication"] },
      { id: 2, question: "Who are you sending the email to?", type: "choice", options: ["Client", "Customer", "Vendor", "Team member", "Manager", "HR", "Unknown recipient"] },
      { id: 3, question: "Provide a short summary of what you want to communicate.", type: "text" },
      { id: 4, question: "Do you want the tone of the email to be:", type: "choice", options: ["Formal", "Semi-formal", "Friendly", "Apologetic", "Persuasive"] },
      { id: 5, question: "Do you want to include a call to action? (e.g., schedule a call, send documents, reply back)", type: "choice", options: ["Yes", "No"] },
      { id: 6, question: "If yes, what action do you want the recipient to take?", type: "text" },
      { id: 7, question: "Do you want the email to include any additional details (attachments, reference numbers, links)?", type: "text" },
      { id: 8, question: "Do you want a short, medium, or detailed email?", type: "choice", options: ["Short", "Medium", "Detailed"] },
      { id: 9, question: "Should the AI generate the subject line automatically?", type: "choice", options: ["Yes", "No, I will provide one"] },
      { id: 10, question: "If you want to provide your own subject line, enter it here:", type: "text" },
      { id: 11, question: "Is this email being sent on behalf of a business or personally?", type: "choice", options: ["Business", "Personal"] },
      { id: 12, question: "What is your name and designation (if applicable)?", type: "text" }
    ]
  },

  "lead-generation": {
    title: "Lead Generation Strategy",
    questions: [
      { id: 1, question: "What is your business name?", type: "text" },
      { id: 2, question: "What products or services do you offer?", type: "text" },
      { id: 3, question: "Who is your target audience?", type: "text" },
      { id: 4, question: "What is your current monthly lead volume?", type: "choice", options: ["0-50", "51-200", "201-500", "500+"] },
      { id: 5, question: "What is your average customer value?", type: "choice", options: ["Under $100", "$100-$500", "$500-$2000", "$2000+"] },
      { id: 6, question: "Which lead generation channels are you currently using?", type: "choice", options: ["Social Media", "Email Marketing", "SEO/Content", "Paid Ads", "None yet"] },

      // ✅ NEW GPT-Specialized Questions
      { id: 7, question: "What is your biggest challenge in generating leads right now?", type: "text" },
      { id: 8, question: "What geographic locations are you targeting?", type: "text" },
      { id: 9, question: "How quickly do you need results?", type: "choice", options: ["Immediate (1-2 weeks)", "Short term (1-3 months)", "Long term (3-12 months)"] },
      { id: 10, question: "Do you have a landing page or funnel setup?", type: "choice", options: ["Yes", "No", "Partially", "Need help"] },
      { id: 11, question: "What is your content creation capability?", type: "choice", options: ["Strong (videos, blogs, reels)", "Medium", "Low", "No content yet"] },
      { id: 12, question: "What is your ideal lead quality?", type: "choice", options: ["High-intent buyers", "General inquiries", "Large volume leads", "Balanced"] }
    ]
  },

  marketing: {
    title: "Marketing Campaign Planning",
    questions: [
      { id: 1, question: "What is your business name?", type: "text" },
      { id: 2, question: "What is the primary goal of your marketing campaign?", type: "choice", options: ["Brand awareness", "Lead generation", "Sales conversion", "Customer retention"] },
      { id: 3, question: "What is your target market demographic?", type: "text" },
      { id: 4, question: "What is your campaign budget?", type: "choice", options: ["Under $1000", "$1000-$5000", "$5000-$20000", "$20000+"] },
      { id: 5, question: "What is your campaign timeline?", type: "choice", options: ["1 month", "3 months", "6 months", "12+ months"] },
      { id: 6, question: "Which marketing channels do you want to focus on?", type: "choice", options: ["Social Media", "Email", "Content Marketing", "Paid Advertising", "All channels"] },

      // ✅ NEW GPT-Specialized Questions
      { id: 7, question: "What is your brand’s unique selling proposition (USP)?", type: "text" },
      { id: 8, question: "Do you have existing marketing assets (images, videos, brand kit)?", type: "choice", options: ["Yes", "No", "Partially"] },
      { id: 9, question: "Which platforms work best for you currently?", type: "text" },
      { id: 10, question: "Do you want your campaign to be organic, paid, or mixed?", type: "choice", options: ["Organic", "Paid", "Hybrid (mixed)"] },
      { id: 11, question: "What tone do you want your brand communication to have?", type: "choice", options: ["Formal", "Friendly", "Bold", "Creative", "Professional"] },
      { id: 12, question: "Do you need competitor analysis included in the strategy?", type: "choice", options: ["Yes", "No", "Maybe"] }
    ]
  }
};


  const quiz = quizData[service];
  const currentQ = quiz.questions[currentQuestion];
  const hasAnswer = answers[currentQ?.id] !== undefined;
  
  // Memoize progress to prevent recalculation on every render
  const progress = useMemo(() => {
    return ((currentQuestion + 1) / quiz.questions.length) * 100;
  }, [currentQuestion, quiz.questions.length]);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [quiz.questions[currentQuestion].id]: answer });
  };

  const handleNext = async () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
      setIsLoading(true);
      
      // Generate AI prompt
      let prompt = `Based on the following questionnaire responses for ${quiz.title}, provide detailed, actionable recommendations:\n\n`;
      quiz.questions.forEach((q) => {
        const answer = answers[q.id] || 'Not answered';
        prompt += `Q: ${q.question}\nA: ${answer}\n\n`;
      });
      prompt += `Please provide a comprehensive response with the following sections. Use emojis to make it engaging and format it clearly:

📊 Current Situation Analysis
Analyze their current situation based on their responses.

💡 Key Recommendations
Provide 5-7 specific, actionable recommendations. Use bullet points with emojis.

🎯 Action Plan
Create a step-by-step action plan with:
- Timeline for each step
- Priority levels (High/Medium/Low)
- Expected effort

🛠️ Recommended Tools & Resources
List specific tools, platforms, or resources they should use. Include brief descriptions.

📈 Expected Outcomes
Describe what results they can expect and in what timeframe.

⚠️ Common Pitfalls to Avoid
List 3-5 common mistakes to watch out for.

IMPORTANT FORMATTING RULES:
- Do NOT use any asterisks (*) or double asterisks (**) for bold or emphasis
- Do NOT use hashtags (#) for headings
- Do NOT use underscores (_) for italics
- Just write plain text with emojis
- Use simple bullet points with hyphens (-)
- Write section titles as plain text with emojis at the start
- Keep it clean and readable without any markdown formatting symbols`;

      const response = await generateAIResponse(prompt);
      setAiResponse(response);
      setIsLoading(false);
    }
  };

  // Typing animation effect
  useEffect(() => {
    if (aiResponse && !isLoading) {
      setIsTyping(true);
      setDisplayedResponse('');
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex < aiResponse.length) {
          setDisplayedResponse(aiResponse.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 10); // 10ms per character for smooth typing effect

      return () => clearInterval(typingInterval);
    }
  }, [aiResponse, isLoading]);

  // Handle Enter key press to proceed to next question
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !isComplete && hasAnswer) {
        // Prevent default behavior for Enter key
        e.preventDefault();
        // Only proceed if there's an answer
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [hasAnswer, isComplete, currentQuestion, answers]);

  // Clean markdown symbols from text
  const cleanMarkdown = (text) => {
    return text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/#{1,6}\s/g, '')
      .replace(/_/g, '')
      .replace(/`/g, '');
  };

  // Parse AI response into card sections
  const parseResponseIntoCards = (text) => {
    const cleanedText = cleanMarkdown(text);
    const sections = [];
    let currentSection = null;
    let currentContent = [];

    const lines = cleanedText.split('\n');
    
    lines.forEach((line) => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) return;

      // Check if line is a section header (starts with emoji)
      if (trimmedLine.match(/^[🎯📊💡🛠️📈⚠️🚀✨]/)) {
        // Save previous section
        if (currentSection) {
          sections.push({
            title: currentSection,
            content: currentContent.join('\n'),
            emoji: currentSection.match(/^[🎯📊💡🛠️📈⚠️🚀✨]/)?.[0] || '📌'
          });
        }
        // Start new section
        currentSection = trimmedLine;
        currentContent = [];
      } else {
        // Add to current section content
        currentContent.push(trimmedLine);
      }
    });

    // Add last section
    if (currentSection) {
      sections.push({
        title: currentSection,
        content: currentContent.join('\n'),
        emoji: currentSection.match(/^[🎯📊💡🛠️📈⚠️🚀✨]/)?.[0] || '📌'
      });
    }

    return sections;
  };

  // Get card gradient based on index
  const getCardGradient = (index) => {
    const gradients = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-orange-500 to-red-500',
      'from-green-500 to-emerald-500',
      'from-indigo-500 to-purple-500',
      'from-yellow-500 to-orange-500',
      'from-pink-500 to-rose-500',
      'from-teal-500 to-cyan-500',
    ];
    return gradients[index % gradients.length];
  };

  // Completion screen
  if (isComplete) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-br from-green-400/20 to-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-[#1E40AF]/20 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-8 min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md hover:bg-white text-gray-700 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </button>
          </div>

          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-2xl px-8 py-4 shadow-lg mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <div className="text-left">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1E40AF] via-[#753AED] to-[#F5900B] bg-clip-text text-transparent">
                  Analysis Complete!
                </h1>
                <p className="text-sm text-gray-600">Your personalized insights are ready</p>
              </div>
            </div>
          </motion.div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-16 h-16 text-[#753AED] animate-spin mb-4" />
              <p className="text-lg text-gray-600">Generating your personalized recommendations...</p>
              <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
            </div>
          ) : (
            <>
              {/* Cards Grid - Masonry Layout */}
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 mb-8">
                {parseResponseIntoCards(displayedResponse).map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="break-inside-avoid mb-6"
                  >
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                      {/* Card Header with Gradient */}
                      <div className={`bg-gradient-to-r ${getCardGradient(index)} p-6 text-white`}>
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{section.emoji}</span>
                          <h3 className="text-xl font-bold">{section.title.replace(section.emoji, '').trim()}</h3>
                        </div>
                      </div>
                      
                      {/* Card Content */}
                      <div className="p-6">
                        {section.content.split('\n').map((line, i) => {
                          const trimmed = line.trim();
                          if (!trimmed) return null;
                          
                          if (trimmed.match(/^[-•]/)) {
                            return (
                              <div key={i} className="flex items-start gap-3 mb-3">
                                <span className="text-[#753AED] mt-1">●</span>
                                <p className="text-gray-700 leading-relaxed flex-1">
                                  {trimmed.replace(/^[-•]\s*/, '')}
                                </p>
                              </div>
                            );
                          }
                          
                          return (
                            <p key={i} className="text-gray-700 leading-relaxed mb-3">
                              {trimmed}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {isTyping && (
                <div className="text-center mb-8">
                  <span className="inline-block w-2 h-8 bg-[#753AED] animate-pulse"></span>
                </div>
              )}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4 mt-12"
              >
                <button
                  onClick={onBack}
                  className="px-8 py-4 bg-gradient-to-r from-[#1E40AF] via-[#753AED] to-[#F5900B] text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Explore Other Services
                </button>
                <button className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border-2 border-gray-200 hover:border-[#753AED]">
                  Download Report
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    );
  }

  const ProgressBar = () => (
    <div className="w-full mb-12">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-medium text-gray-600">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </p>
        <p className="text-sm font-semibold text-[#753AED]">{Math.round(progress)}% Complete</p>
      </div>

      <div className="relative h-4 w-full bg-gray-200/80 rounded-full overflow-hidden shadow-inner">
        <motion.div
          key={currentQuestion}
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#1E40AF] via-[#753AED] to-[#F5900B] shadow-md"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        ></motion.div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-24 left-10 w-[500px] h-[500px] bg-gradient-to-br from-[#753AED]/25 to-purple-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-[#1E40AF]/25 to-blue-400/15 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 px-10 py-12 md:px-16 md:py-14 max-w-3xl w-full mx-6 overflow-y-auto overflow-x-hidden"
        style={{ maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <button
            onClick={onBack}
            className="flex items-center gap-3 px-7 py-3 bg-gradient-to-r from-[#1E40AF] via-[#753AED] to-[#F5900B] text-white rounded-2xl font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Services
          </button>
        </div>

        {/* Progress Section */}
        <ProgressBar />

        {/* Question Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 md:p-10 pb-10 md:pb-12 border border-gray-100 shadow-lg overflow-hidden">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 leading-snug text-center break-words">
                {currentQ.question}
              </h3>

              {currentQ.type === 'text' ? (
                <textarea
                  rows={6}
                  placeholder="Type your answer here..."
                  value={answers[currentQ.id] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#753AED]/40 focus:outline-none bg-gray-50 text-gray-900 placeholder:text-gray-400 mb-10 text-base"
                />
              ) : (
                <div className="space-y-5 mb-10">
                  {currentQ.options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        handleAnswer(option);
                        setTimeout(handleNext, 300);
                      }}
                      className={`w-full py-4 px-5 rounded-2xl border text-left transition-all duration-200 text-base break-words ${
                        answers[currentQ.id] === option
                          ? 'border-[#753AED] bg-[#753AED]/10 text-[#1E40AF] font-semibold'
                          : 'border-gray-200 hover:border-[#753AED]/50 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-10 pt-4">
                <button
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  disabled={currentQuestion === 0}
                  className={`flex items-center gap-2 px-10 py-3 rounded-2xl font-semibold transition-all text-base ${
                    currentQuestion === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:shadow-md hover:scale-105 border border-gray-200'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  disabled={!hasAnswer}
                  className={`flex items-center gap-3 px-12 py-4 rounded-2xl font-semibold text-base transition-all ${
                    hasAnswer
                      ? 'bg-gradient-to-r from-[#1E40AF] via-[#753AED] to-[#F5900B] text-white shadow-md hover:shadow-xl hover:scale-105'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {currentQuestion === quiz.questions.length - 1 ? 'Finish' : 'Next'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
