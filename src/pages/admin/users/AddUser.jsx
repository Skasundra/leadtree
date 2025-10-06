import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Shield,
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Phone,
  MapPin,
  Calendar,
  Building,
  AlertCircle,
  CheckCircle,
  Crown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

export const AddUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    department: "",
    password: "",
    confirmPassword: "",
    role: "client",
    status: "active",
    sendWelcomeEmail: true,
    requirePasswordChange: false,
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const roles = [
    {
      value: "super_admin",
      label: "Super Admin",
      description: "Full system access with all permissions",
      color: "from-red-500 to-red-600",
      icon: Crown,
      permissions: [
        "All System Permissions",
        "User Management",
        "System Configuration",
      ],
    },
    {
      value: "admin",
      label: "Admin",
      description: "Administrative access with most permissions",
      color: "from-purple-500 to-purple-600",
      icon: Shield,
      permissions: [
        "User Management",
        "Analytics Access",
        "Billing Management",
      ],
    },
    {
      value: "team_member",
      label: "Team Member",
      description: "Team collaboration and lead management",
      color: "from-blue-500 to-blue-600",
      icon: User,
      permissions: [
        "Lead Management",
        "Campaign Management",
        "Email Management",
      ],
    },
    {
      value: "client",
      label: "Client",
      description: "Limited access for client users",
      color: "from-green-500 to-green-600",
      icon: User,
      permissions: ["Campaign View", "Email View", "Profile Management"],
    },
  ];

  const validateStep = (stepNumber) => {
    const newErrors = {};

    if (stepNumber === 1) {
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Email is invalid";
    }

    if (stepNumber === 2) {
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8)
        newErrors.password = "Password must be at least 8 characters";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(1) || !validateStep(2)) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navigate back to user management
      navigate("/admin/users");
    } catch (error) {
      console.error("Failed to create user:", error);
      setErrors({ submit: "Failed to create user. Please try again." });
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
          onClick={() => navigate("/admin/users")}
          className="text-slate-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Users
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white">Add New User</h1>
          <p className="text-slate-400 mt-1">Create a new user account</p>
        </div>
      </div>

      <div>
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    step >= stepNumber
                      ? "bg-purple-600 border-purple-600 text-white"
                      : "border-slate-600 text-slate-400"
                  }`}
                >
                  {step > stepNumber ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{stepNumber}</span>
                  )}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-24 h-0.5 mx-4 transition-all ${
                      step > stepNumber ? "bg-purple-600" : "bg-slate-600"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <span
              className={`text-sm ${
                step >= 1 ? "text-purple-400" : "text-slate-400"
              }`}
            >
              Personal Info
            </span>
            <span
              className={`text-sm ${
                step >= 2 ? "text-purple-400" : "text-slate-400"
              }`}
            >
              Account Setup
            </span>
            <span
              className={`text-sm ${
                step >= 3 ? "text-purple-400" : "text-slate-400"
              }`}
            >
              Role & Permissions
            </span>
          </div>
        </div>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="h-5 w-5 mr-2" />
              {step === 1 && "Personal Information"}
              {step === 2 && "Account Setup"}
              {step === 3 && "Role & Permissions"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        First Name *
                      </label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        placeholder="Enter first name"
                        className={`bg-slate-700 border-slate-600 text-white ${
                          errors.firstName ? "border-red-500" : ""
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Last Name *
                      </label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        placeholder="Enter last name"
                        className={`bg-slate-700 border-slate-600 text-white ${
                          errors.lastName ? "border-red-500" : ""
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="Enter email address"
                        className={`pl-10 bg-slate-700 border-slate-600 text-white ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="Enter phone number"
                          className="pl-10 bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Company
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          value={formData.company}
                          onChange={(e) =>
                            handleInputChange("company", e.target.value)
                          }
                          placeholder="Enter company name"
                          className="pl-10 bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Department
                    </label>
                    <Input
                      value={formData.department}
                      onChange={(e) =>
                        handleInputChange("department", e.target.value)
                      }
                      placeholder="Enter department"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Account Setup */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          placeholder="Enter password"
                          className={`pl-10 pr-10 bg-slate-700 border-slate-600 text-white ${
                            errors.password ? "border-red-500" : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.password}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Confirm Password *
                      </label>
                      <Input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        placeholder="Confirm password"
                        className={`bg-slate-700 border-slate-600 text-white ${
                          errors.confirmPassword ? "border-red-500" : ""
                        }`}
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Account Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sendWelcomeEmail"
                        checked={formData.sendWelcomeEmail}
                        onChange={(e) =>
                          handleInputChange(
                            "sendWelcomeEmail",
                            e.target.checked
                          )
                        }
                        className="mr-3"
                      />
                      <label
                        htmlFor="sendWelcomeEmail"
                        className="text-slate-300"
                      >
                        Send welcome email to user
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="requirePasswordChange"
                        checked={formData.requirePasswordChange}
                        onChange={(e) =>
                          handleInputChange(
                            "requirePasswordChange",
                            e.target.checked
                          )
                        }
                        className="mr-3"
                      />
                      <label
                        htmlFor="requirePasswordChange"
                        className="text-slate-300"
                      >
                        Require password change on first login
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Role & Permissions */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-4">
                      Select User Role *
                    </label>
                    <div className="grid grid-cols-1 gap-4">
                      {roles.map((role) => (
                        <label
                          key={role.value}
                          className={`flex items-start p-6 rounded-lg border cursor-pointer transition-all ${
                            formData.role === role.value
                              ? "border-purple-500 bg-purple-500/10"
                              : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                          }`}
                        >
                          <input
                            type="radio"
                            name="role"
                            value={role.value}
                            checked={formData.role === role.value}
                            onChange={(e) =>
                              handleInputChange("role", e.target.value)
                            }
                            className="mt-1 mr-4"
                          />
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <div
                                className={`h-10 w-10 bg-gradient-to-r ${role.color} rounded-lg flex items-center justify-center mr-3`}
                              >
                                <role.icon className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <span className="text-white font-medium text-lg">
                                  {role.label}
                                </span>
                                <p className="text-slate-400 text-sm">
                                  {role.description}
                                </p>
                              </div>
                            </div>
                            <div className="ml-13">
                              <p className="text-slate-300 text-sm font-medium mb-2">
                                Permissions include:
                              </p>
                              <ul className="space-y-1">
                                {role.permissions.map((permission, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-center text-slate-400 text-sm"
                                  >
                                    <CheckCircle className="h-3 w-3 text-green-400 mr-2" />
                                    {permission}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-700">
                <div className="flex gap-2">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={prevStep}
                      className="text-slate-400 hover:text-white"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => navigate("/admin/users")}
                    className="text-slate-400 hover:text-white"
                  >
                    Cancel
                  </Button>
                </div>

                <div className="flex gap-2">
                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Next Step
                      <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating User...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Create User
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {errors.submit && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {errors.submit}
                  </p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
