import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  Save,
  Eye,
  Code,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

export const EditEmailTemplate = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    category: "onboarding",
    status: "draft",
    fromName: "LeadTree",
    fromEmail: "noreply@leadtree.com",
    replyTo: "support@leadtree.com",
    description: "",
    htmlContent: "",
    textContent: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const mockTemplate = {
      name: "Welcome Email",
      subject: "Welcome to LeadTree!",
      category: "onboarding",
      status: "active",
      fromName: "LeadTree",
      fromEmail: "noreply@leadtree.com",
      replyTo: "support@leadtree.com",
      description: "Welcome new users to the platform",
      htmlContent: "<h1>Welcome to LeadTree!</h1><p>We're excited to have you on board...</p>",
      textContent: "Welcome to LeadTree! We're excited to have you on board...",
    };
    setFormData(mockTemplate);
  }, [templateId]);

  const categories = [
    { value: "onboarding", label: "Onboarding" },
    { value: "security", label: "Security" },
    { value: "billing", label: "Billing" },
    { value: "reports", label: "Reports" },
    { value: "marketing", label: "Marketing" },
    { value: "notifications", label: "Notifications" },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Template name is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.htmlContent.trim())
      newErrors.htmlContent = "HTML content is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/admin/email-templates");
    } catch (error) {
      console.error("Failed to update template:", error);
      setErrors({ submit: "Failed to update template. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
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
          <h1 className="text-3xl font-bold text-white">Edit Email Template</h1>
          <p className="text-slate-400 mt-1">Update email template details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Template Name *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter template name"
                  className={`bg-slate-700 border-slate-600 text-white ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Subject *
              </label>
              <Input
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="Enter email subject"
                className={`bg-slate-700 border-slate-600 text-white ${
                  errors.subject ? "border-red-500" : ""
                }`}
              />
              {errors.subject && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Brief description of this template"
                rows={3}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  From Name
                </label>
                <Input
                  value={formData.fromName}
                  onChange={(e) => handleInputChange("fromName", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  From Email
                </label>
                <Input
                  type="email"
                  value={formData.fromEmail}
                  onChange={(e) =>
                    handleInputChange("fromEmail", e.target.value)
                  }
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Reply To
                </label>
                <Input
                  type="email"
                  value={formData.replyTo}
                  onChange={(e) => handleInputChange("replyTo", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <Code className="h-5 w-5 mr-2" />
                Email Content
              </CardTitle>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setPreviewMode(!previewMode)}
                className="text-slate-400 hover:text-white"
              >
                <Eye className="h-4 w-4 mr-2" />
                {previewMode ? "Edit" : "Preview"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {!previewMode ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    HTML Content *
                  </label>
                  <textarea
                    value={formData.htmlContent}
                    onChange={(e) =>
                      handleInputChange("htmlContent", e.target.value)
                    }
                    placeholder="Enter HTML content"
                    rows={12}
                    className={`w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white font-mono text-sm ${
                      errors.htmlContent ? "border-red-500" : ""
                    }`}
                  />
                  {errors.htmlContent && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.htmlContent}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Plain Text Content (Optional)
                  </label>
                  <textarea
                    value={formData.textContent}
                    onChange={(e) =>
                      handleInputChange("textContent", e.target.value)
                    }
                    placeholder="Enter plain text version"
                    rows={6}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                  />
                </div>
              </>
            ) : (
              <div className="bg-white p-6 rounded-lg min-h-[400px]">
                <div
                  dangerouslySetInnerHTML={{ __html: formData.htmlContent }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate("/admin/email-templates")}
            className="text-slate-400 hover:text-white"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Updating Template...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Update Template
              </>
            )}
          </Button>
        </div>

        {errors.submit && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              {errors.submit}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};
