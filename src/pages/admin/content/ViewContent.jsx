import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FileText,
  ArrowLeft,
  Edit,
  Eye,
  Calendar,
  User,
  Tag,
  Star,
  BarChart3,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";

export const ViewContent = () => {
  const navigate = useNavigate();
  const { contentId } = useParams();
  const [content, setContent] = useState(null);

  useEffect(() => {
    // Simulate fetching content data
    const mockContent = {
      id: contentId,
      title: "Getting Started Guide",
      type: "article",
      category: "documentation",
      status: "published",
      author: "Admin User",
      description: "Complete guide for new users to get started with the platform",
      content: "<h1>Getting Started</h1><p>Welcome to our platform. This guide will help you get started...</p><h2>Step 1: Create an Account</h2><p>First, you'll need to create an account...</p>",
      tags: ["guide", "onboarding"],
      featured: true,
      views: 1247,
      lastModified: "2024-01-15",
      createdAt: "2024-01-01",
      size: "2.4 KB",
      metaTitle: "Getting Started with LeadTree",
      metaDescription: "Learn how to get started with LeadTree platform",
    };
    setContent(mockContent);
  }, [contentId]);

  if (!content) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl animate-pulse mx-auto mb-4"></div>
          <p className="text-slate-400">Loading content...</p>
        </div>
      </div>
    );
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "article":
        return FileText;
      case "page":
        return FileText;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "article":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "page":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const TypeIcon = getTypeIcon(content.type);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-white">{content.title}</h1>
              {content.featured && (
                <Star className="h-6 w-6 text-yellow-400 fill-current" />
              )}
            </div>
            <p className="text-slate-400 mt-1">{content.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate(`/admin/content/edit/${contentId}`)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Content
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Views</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {content.views}
                </p>
              </div>
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Eye className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Type</p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${getTypeColor(
                    content.type
                  )}`}
                >
                  {content.type}
                </span>
              </div>
              <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <TypeIcon className="h-5 w-5 text-white" />
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
                    content.status
                  )}`}
                >
                  {content.status}
                </span>
              </div>
              <div className="h-10 w-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Size</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {content.size}
                </p>
              </div>
              <div className="h-10 w-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Details */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Content Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Category</p>
                <p className="text-white capitalize">{content.category}</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm mb-1">Tags</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {content.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-slate-600 text-slate-300 text-xs rounded-full flex items-center"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-center text-slate-400 text-sm mb-2">
                  <User className="h-4 w-4 mr-2" />
                  Created by {content.author}
                </div>
                <div className="flex items-center text-slate-400 text-sm mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  Created on {content.createdAt}
                </div>
                <div className="flex items-center text-slate-400 text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Last modified {content.lastModified}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO Information */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">SEO Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Meta Title</p>
                <p className="text-white text-sm">{content.metaTitle}</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm mb-1">Meta Description</p>
                <p className="text-white text-sm">{content.metaDescription}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Preview */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Content Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-6 rounded-lg min-h-[600px]">
                <div dangerouslySetInnerHTML={{ __html: content.content }} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
