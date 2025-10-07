import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  ArrowLeft,
  Save,
  Eye,
  Image,
  Video,
  File,
  AlertCircle,
  Upload,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

export const AddContent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "article",
    category: "documentation",
    status: "draft",
    author: "Admin User",
    description: "",
    content: "",
    tags: "",
    featured: false,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  const [errors, setErrors] = useState({});

  const contentTypes = [
    { value: "article", label: "Article", icon: FileText },
    { value: "page", label: "Page", icon: FileText },
    { value: "document", label: "Document", icon: File },
    { value: "image", label: "Image", icon: Image },
    { value: "video", label: "Video", icon: Video },
  ];

  const categories = [
    { value: "documentation", label: "Documentation" },
    { value: "marketing", label: "Marketing" },
    { value: "technical", label: "Technical" },
    { value: "assets", label: "Assets" },
    { value: "legal", label: "Legal" },
    { value: "announcements", label: "Announcements" },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.content.trim() && formData.type !== "image" && formData.type !== "video")
      newErrors.content = "Content is required";

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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/admin/content");
    } catch (error) {
      console.error("Failed to create content:", error);
      setErrors({ submit: "Failed to create content. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/content")}
          className="text-slate-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Content
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white">Add New Content</h1>
          <p className="text-slate-400 mt-1">Create new content item</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Title *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter content title"
                  className={`bg-slate-700 border-slate-600 text-white ${
                    errors.title ? "border-red-500" : ""
                  }`}
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.title}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Content Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                >
                  {contentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Brief description of this content"
                rows={3}
                className={`w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Tags (comma separated)
              </label>
              <Input
                value={formData.tags}
                onChange={(e) => handleInputChange("tags", e.target.value)}
                placeholder="e.g., guide, tutorial, documentation"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => handleInputChange("featured", e.target.checked)}
                className="mr-3"
              />
              <label htmlFor="featured" className="text-slate-300">
                Mark as featured content
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Content Body */}
        {formData.type !== "image" && formData.type !== "video" && (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Content Body
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
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Content *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                    placeholder="Enter your content here (supports HTML)"
                    rows={15}
                    className={`w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white font-mono text-sm ${
                      errors.content ? "border-red-500" : ""
                    }`}
                  />
                  {errors.content && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.content}
                    </p>
                  )}
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg min-h-[400px]">
                  <div dangerouslySetInnerHTML={{ __html: formData.content }} />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* File Upload for Images/Videos */}
        {(formData.type === "image" || formData.type === "video") && (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Upload {formData.type === "image" ? "Image" : "Video"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-12 text-center hover:border-purple-500 transition-colors cursor-pointer">
                <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-white mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-slate-400 text-sm">
                  {formData.type === "image"
                    ? "PNG, JPG, GIF up to 10MB"
                    : "MP4, MOV, AVI up to 100MB"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* SEO Settings */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Meta Title
              </label>
              <Input
                value={formData.metaTitle}
                onChange={(e) => handleInputChange("metaTitle", e.target.value)}
                placeholder="SEO title for search engines"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Meta Description
              </label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) =>
                  handleInputChange("metaDescription", e.target.value)
                }
                placeholder="SEO description for search engines"
                rows={3}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Meta Keywords
              </label>
              <Input
                value={formData.metaKeywords}
                onChange={(e) =>
                  handleInputChange("metaKeywords", e.target.value)
                }
                placeholder="Comma separated keywords"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate("/admin/content")}
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
                Creating Content...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Content
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
