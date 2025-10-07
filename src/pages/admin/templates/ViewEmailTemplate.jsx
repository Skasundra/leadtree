import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  Edit,
  Copy,
  Send,
  Eye,
  BarChart3,
  Calendar,
  User,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";

export const ViewEmailTemplate = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [template, setTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    // Simulate fetching template data
    const mockTemplate = {
      id: templateId,
      name: "Welcome Email",
      subject: "Welcome to LeadTree!",
      category: "onboarding",
      status: "active",
      fromName: "LeadTree",
      fromEmail: "noreply@leadtree.com",
      replyTo: "support@leadtree.com",
      description: "Welcome new users to the platform",
      htmlContent:
        "<h1>Welcome to LeadTree!</h1><p>We're excited to have you on board...</p>",
      textContent: "Welcome to LeadTree! We're excited to have you on board...",
      usage: 1247,
      openRate: "68%",
      clickRate: "12%",
      lastModified: "2024-01-15",
      createdBy: "Admin User",
      createdAt: "2024-01-01",
    };
    setTemplate(mockTemplate);
  }, [templateId]);

  if (!template) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl animate-pulse mx-auto mb-4"></div>
          <p className="text-slate-400">Loading template...</p>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "onboarding":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "security":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "billing":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "reports":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/email-templates")}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Templates
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">{template.name}</h1>
            <p className="text-slate-400 mt-1">{template.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </Button>
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <Send className="h-4 w-4 mr-2" />
            Test Send
          </Button>
          <Button
            onClick={() =>
              navigate(`/admin/email-templates/edit/${templateId}`)
            }
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Template
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Sent</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {template.usage}
                </p>
              </div>
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Send className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Open Rate</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {template.openRate}
                </p>
              </div>
              <div className="h-10 w-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Eye className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Click Rate</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {template.clickRate}
                </p>
              </div>
              <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Status</p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${getStatusColor(
                    template.status
                  )}`}
                >
                  {template.status}
                </span>
              </div>
              <div className="h-10 w-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template Details */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Template Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Subject</p>
                <p className="text-white">{template.subject}</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm mb-1">Category</p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs ${getCategoryColor(
                    template.category
                  )}`}
                >
                  {template.category}
                </span>
              </div>

              <div>
                <p className="text-slate-400 text-sm mb-1">From Name</p>
                <p className="text-white">{template.fromName}</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm mb-1">From Email</p>
                <p className="text-white">{template.fromEmail}</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm mb-1">Reply To</p>
                <p className="text-white">{template.replyTo}</p>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-center text-slate-400 text-sm mb-2">
                  <User className="h-4 w-4 mr-2" />
                  Created by {template.createdBy}
                </div>
                <div className="flex items-center text-slate-400 text-sm mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  Created on {template.createdAt}
                </div>
                <div className="flex items-center text-slate-400 text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Last modified {template.lastModified}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Email Preview */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Email Preview</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setShowPreview(true)}
                    className={
                      showPreview
                        ? "text-purple-400"
                        : "text-slate-400 hover:text-white"
                    }
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setShowPreview(false)}
                    className={
                      !showPreview
                        ? "text-purple-400"
                        : "text-slate-400 hover:text-white"
                    }
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    HTML
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {showPreview ? (
                <div className="bg-white p-6 rounded-lg min-h-[500px]">
                  <div
                    dangerouslySetInnerHTML={{ __html: template.htmlContent }}
                  />
                </div>
              ) : (
                <div className="bg-slate-900 p-4 rounded-lg">
                  <pre className="text-slate-300 text-sm overflow-x-auto">
                    <code>{template.htmlContent}</code>
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
