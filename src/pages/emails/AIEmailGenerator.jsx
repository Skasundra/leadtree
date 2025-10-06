import { useState } from "react";
import {
  Bot,
  Wand2,
  Copy,
  Save,
  Send,
  Sparkles,
  RefreshCw,
  Eye,
  Edit,
  Download,
  Upload,
  Settings,
  Zap,
  Target,
  Users,
  Mail,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
  TrendingUp,
  Clock,
  Star,
  Plus,
} from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

const EmailTemplate = ({ template, isSelected, onSelect }) => (
  <div
    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
      isSelected
        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
    }`}
    onClick={() => onSelect(template)}
  >
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <h4 className="font-medium text-slate-900 dark:text-white">
          {template.name}
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {template.category}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 text-xs text-amber-600">
          <Star className="h-3 w-3 fill-current" />
          <span>{template.rating}</span>
        </div>
        <div
          className={`w-4 h-4 rounded-full border-2 ${
            isSelected
              ? "bg-blue-500 border-blue-500"
              : "border-slate-300 dark:border-slate-600"
          }`}
        >
          {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
        </div>
      </div>
    </div>
    <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
      {template.description}
    </p>
    <div className="flex items-center justify-between text-xs">
      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
        {template.successRate}% success rate
      </span>
      <span className="text-slate-500 dark:text-slate-400">
        {template.usage} uses
      </span>
    </div>
  </div>
);

const GenerationStep = ({ number, title, isActive, isCompleted }) => (
  <div
    className={`flex items-center space-x-3 p-3 rounded-lg ${
      isActive
        ? "bg-blue-50 dark:bg-blue-900/20"
        : isCompleted
        ? "bg-green-50 dark:bg-green-900/20"
        : "bg-slate-50 dark:bg-slate-800/50"
    }`}
  >
    <div
      className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${
        isActive
          ? "bg-blue-600 text-white"
          : isCompleted
          ? "bg-green-600 text-white"
          : "bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-300"
      }`}
    >
      {isCompleted ? <CheckCircle className="h-3 w-3" /> : number}
    </div>
    <span
      className={`text-sm font-medium ${
        isActive
          ? "text-blue-900 dark:text-blue-100"
          : isCompleted
          ? "text-green-900 dark:text-green-100"
          : "text-slate-600 dark:text-slate-400"
      }`}
    >
      {title}
    </span>
  </div>
);

export const AIEmailGenerator = () => {
  const [activeTab, setActiveTab] = useState("generate"); // 'generate', 'templates', 'history'
  const [generationStep, setGenerationStep] = useState(0);
  const [formData, setFormData] = useState({
    leadName: "",
    company: "",
    role: "",
    industry: "",
    context: "",
    tone: "professional",
    emailType: "cold_outreach",
    callToAction: "",
    personalNote: "",
  });
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [generatedEmails, setGeneratedEmails] = useState([]);
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationHistory, setGenerationHistory] = useState([]);

  const emailTemplates = [
    {
      id: 1,
      name: "Cold Outreach Pro",
      category: "Cold Email",
      description: "Professional cold outreach with proven conversion rates",
      successRate: 42,
      usage: 1250,
      rating: 4.8,
      type: "cold_outreach",
    },
    {
      id: 2,
      name: "Demo Request",
      category: "Product Demo",
      description: "Perfect for requesting product demonstrations",
      successRate: 38,
      usage: 890,
      rating: 4.6,
      type: "demo_request",
    },
    {
      id: 3,
      name: "Follow-up Sequence",
      category: "Follow-up",
      description: "Gentle follow-up for previous conversations",
      successRate: 35,
      usage: 2100,
      rating: 4.7,
      type: "follow_up",
    },
    {
      id: 4,
      name: "Partnership Proposal",
      category: "Partnership",
      description: "Professional partnership and collaboration requests",
      successRate: 28,
      usage: 456,
      rating: 4.5,
      type: "partnership",
    },
  ];

  const generationSteps = [
    "Analyzing lead information",
    "Selecting optimal template",
    "Personalizing content",
    "Optimizing for engagement",
    "Finalizing email",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateEmail = async () => {
    setIsGenerating(true);
    setGenerationStep(0);

    // Simulate AI generation with steps
    for (let i = 0; i < generationSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setGenerationStep(i + 1);
    }

    // Generate multiple email variations
    const mockEmails = [
      {
        id: 1,
        subject: `Partnership Opportunity with ${formData.company}`,
        content: `Hi ${formData.leadName},

I hope this email finds you well. I came across ${
          formData.company
        } and was impressed by your innovative approach in the ${
          formData.industry || "technology"
        } space.

As ${
          formData.role
        }, I imagine you're always looking for ways to drive growth and efficiency. We've helped similar companies achieve remarkable results:

• 40% increase in lead generation
• 25% reduction in customer acquisition costs  
• 60% improvement in conversion rates

I'd love to share how we could potentially help ${
          formData.company
        } achieve similar outcomes. ${
          formData.callToAction ||
          "Would you be open to a brief 15-minute conversation this week?"
        }

Best regards,
[Your Name]

${
  formData.personalNote
    ? `P.S. ${formData.personalNote}`
    : `P.S. I noticed ${
        formData.context
          ? `that ${formData.context}`
          : "your recent achievements"
      } - congratulations on the progress!`
}`,
        score: 92,
        tone: "Professional & Direct",
      },
      {
        id: 2,
        subject: `Quick question about ${formData.company}'s growth`,
        content: `Hello ${formData.leadName},

I've been following ${formData.company}'s journey in the ${
          formData.industry || "industry"
        } and I'm genuinely impressed by what you've built.

Quick question: Are you currently exploring new ways to ${
          formData.emailType === "demo_request"
            ? "streamline your workflow"
            : "accelerate growth"
        }?

We've recently helped companies like yours:
→ Increase efficiency by 45%
→ Reduce operational costs by 30%
→ Improve team productivity significantly

${
  formData.callToAction ||
  "Would love to show you how this could work for your team. Are you free for a quick 10-minute call this week?"
}

Cheers,
[Your Name]

${
  formData.context
    ? `P.S. Saw your recent update about ${formData.context} - exciting times ahead!`
    : ""
}`,
        score: 88,
        tone: "Casual & Friendly",
      },
      {
        id: 3,
        subject: `${formData.leadName}, this might interest you`,
        content: `Hi ${formData.leadName},

Hope you're having a great week! I came across ${
          formData.company
        } while researching innovative ${
          formData.industry || "technology"
        } companies and your approach really caught my attention.

I work with ${
          formData.role
        }s like yourself who are focused on scaling their operations efficiently. Here's what we've achieved with similar companies:

✓ 50% faster time-to-market
✓ 35% reduction in manual processes
✓ Significant improvement in team collaboration

${
  formData.callToAction ||
  "I have a feeling this could be valuable for your team. Mind if I send over a quick case study?"
}

Best,
[Your Name]

${
  formData.personalNote ||
  (formData.context
    ? `P.S. Really admire what you're doing with ${formData.context}!`
    : "")
}`,
        score: 85,
        tone: "Warm & Personal",
      },
    ];

    setGeneratedEmails(mockEmails);
    setCurrentEmailIndex(0);
    setIsGenerating(false);
    setGenerationStep(0);

    // Add to history
    const historyItem = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      leadName: formData.leadName,
      company: formData.company,
      emailsGenerated: mockEmails.length,
      bestScore: Math.max(...mockEmails.map((e) => e.score)),
    };
    setGenerationHistory((prev) => [historyItem, ...prev.slice(0, 9)]);
  };

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
  };

  const getCurrentEmail = () => {
    return generatedEmails[currentEmailIndex] || null;
  };

  const renderGenerateTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Input Form */}
      <div className="lg:col-span-1 space-y-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-blue-600" />
              Lead Information
            </CardTitle>
            <CardDescription>
              Provide details about your lead for personalization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Lead Name *
                </label>
                <Input
                  placeholder="e.g., John Smith"
                  value={formData.leadName}
                  onChange={(e) =>
                    handleInputChange("leadName", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Company *
                </label>
                <Input
                  placeholder="e.g., Tech Corp Inc."
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Role/Position *
                </label>
                <Input
                  placeholder="e.g., CEO, Marketing Director"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Industry
                </label>
                <Input
                  placeholder="e.g., Technology, Healthcare"
                  value={formData.industry}
                  onChange={(e) =>
                    handleInputChange("industry", e.target.value)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-purple-600" />
              Email Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Email Type
              </label>
              <select
                value={formData.emailType}
                onChange={(e) => handleInputChange("emailType", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="cold_outreach">Cold Outreach</option>
                <option value="follow_up">Follow-up</option>
                <option value="demo_request">Demo Request</option>
                <option value="partnership">Partnership</option>
                <option value="introduction">Introduction</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Tone
              </label>
              <select
                value={formData.tone}
                onChange={(e) => handleInputChange("tone", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual & Friendly</option>
                <option value="persuasive">Persuasive</option>
                <option value="warm">Warm & Personal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Call to Action
              </label>
              <Input
                placeholder="e.g., Schedule a 15-minute call"
                value={formData.callToAction}
                onChange={(e) =>
                  handleInputChange("callToAction", e.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-emerald-600" />
              Additional Context
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Context & Research
              </label>
              <textarea
                placeholder="Recent funding, product launches, industry news, mutual connections..."
                value={formData.context}
                onChange={(e) => handleInputChange("context", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Personal Note
              </label>
              <Input
                placeholder="Add a personal touch..."
                value={formData.personalNote}
                onChange={(e) =>
                  handleInputChange("personalNote", e.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={generateEmail}
          disabled={
            !formData.leadName ||
            !formData.company ||
            !formData.role ||
            isGenerating
          }
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
              Generating AI Emails...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4 mr-2" />
              Generate AI Emails
            </>
          )}
        </Button>
      </div>

      {/* Generated Emails */}
      <div className="lg:col-span-2 space-y-6">
        {isGenerating && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-6">
                  <Bot className="h-12 w-12 text-blue-600 animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  AI is crafting your emails...
                </h3>
                <div className="space-y-3 max-w-md mx-auto">
                  {generationSteps.map((step, index) => (
                    <GenerationStep
                      key={index}
                      number={index + 1}
                      title={step}
                      isActive={generationStep === index + 1}
                      isCompleted={generationStep > index + 1}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {generatedEmails.length > 0 && !isGenerating && (
          <>
            {/* Email Variations Selector */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Sparkles className="h-5 w-5 mr-2 text-amber-600" />
                      Generated Email Variations
                    </CardTitle>
                    <CardDescription>
                      Choose from {generatedEmails.length} AI-generated
                      variations
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={generateEmail}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 mb-4">
                  {generatedEmails.map((email, index) => (
                    <button
                      key={email.id}
                      onClick={() => setCurrentEmailIndex(index)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentEmailIndex === index
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      Variation {index + 1}
                      <div className="text-xs opacity-75 mt-1">
                        Score: {email.score}
                      </div>
                    </button>
                  ))}
                </div>

                {getCurrentEmail() && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-emerald-600" />
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            Score: {getCurrentEmail().score}/100
                          </span>
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {getCurrentEmail().tone}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(getCurrentEmail().content)
                          }
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                        Subject Line
                      </label>
                      <Input
                        value={getCurrentEmail().subject}
                        className="font-medium"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                        Email Content
                      </label>
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                        <pre className="whitespace-pre-wrap text-sm text-slate-900 dark:text-white font-sans leading-relaxed">
                          {getCurrentEmail().content}
                        </pre>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-4">
                      <Button
                        onClick={() =>
                          copyToClipboard(
                            `Subject: ${getCurrentEmail().subject}\n\n${
                              getCurrentEmail().content
                            }`
                          )
                        }
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Email
                      </Button>
                      <Button variant="outline">
                        <Save className="h-4 w-4 mr-2" />
                        Save Template
                      </Button>
                      <Button variant="outline">
                        <Send className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {generatedEmails.length === 0 && !isGenerating && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Bot className="h-16 w-16 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Ready to Generate AI Emails
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                Fill in the lead information on the left and click "Generate AI
                Emails" to create personalized email variations
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Zap className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm">
                    Multiple Variations
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    Get 3 different email styles
                  </p>
                </div>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <Target className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-medium text-emerald-900 dark:text-emerald-100 text-sm">
                    Personalized Content
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                    Tailored to your lead's profile
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-medium text-purple-900 dark:text-purple-100 text-sm">
                    Optimized for Results
                  </h4>
                  <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                    AI-scored for effectiveness
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );

  const renderTemplatesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Email Templates
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Choose from proven email templates
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emailTemplates.map((template) => (
          <EmailTemplate
            key={template.id}
            template={template}
            isSelected={selectedTemplate?.id === template.id}
            onSelect={setSelectedTemplate}
          />
        ))}
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Generation History
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Your recent AI email generations
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export History
        </Button>
      </div>

      {generationHistory.length > 0 ? (
        <div className="space-y-4">
          {generationHistory.map((item) => (
            <Card
              key={item.id}
              className="border-0 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {item.leadName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">
                        {item.leadName} at {item.company}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {item.emailsGenerated} emails generated • Best score:{" "}
                        {item.bestScore}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {item.timestamp}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Clock className="h-12 w-12 mx-auto mb-4 text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              No History Yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Your email generation history will appear here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <PageWrapper
      title="AI Email Generator"
      description="Generate personalized, high-converting emails using advanced AI"
      actions={
        <div className="flex space-x-3">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Leads
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            AI Settings
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Tab Navigation */}
        <div className="border-b border-slate-200 dark:border-slate-700">
          <nav className="flex space-x-8">
            {[
              { id: "generate", label: "Generate Emails", icon: Wand2 },
              { id: "templates", label: "Templates", icon: Mail },
              { id: "history", label: "History", icon: Clock },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "generate" && renderGenerateTab()}
        {activeTab === "templates" && renderTemplatesTab()}
        {activeTab === "history" && renderHistoryTab()}

        {/* Tips Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-amber-600" />
              Pro Tips for Better AI Emails
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center mb-3">
                  <Info className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">
                    Research First
                  </h4>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  Include specific details about their company, recent news, or
                  industry trends for better personalization
                </p>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <div className="flex items-center mb-3">
                  <Target className="h-5 w-5 text-emerald-600 mr-2" />
                  <h4 className="font-medium text-emerald-900 dark:text-emerald-100">
                    Clear Call-to-Action
                  </h4>
                </div>
                <p className="text-sm text-emerald-700 dark:text-emerald-200">
                  Specify exactly what you want them to do - schedule a call,
                  book a demo, or reply with interest
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center mb-3">
                  <Eye className="h-5 w-5 text-purple-600 mr-2" />
                  <h4 className="font-medium text-purple-900 dark:text-purple-100">
                    Test & Iterate
                  </h4>
                </div>
                <p className="text-sm text-purple-700 dark:text-purple-200">
                  Try different variations and track which ones get better
                  responses to improve your approach
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
};
