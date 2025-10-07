import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Crown,
  User,
  Mail,
  CreditCard,
  Calendar,
  DollarSign,
  ArrowLeft,
  Save,
  Search,
  AlertCircle,
  CheckCircle,
  Plus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

export const AddSubscription = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    userId: "",
    plan: "basic",
    billingCycle: "monthly",
    startDate: new Date().toISOString().split("T")[0],
    paymentMethod: "credit_card",
    autoRenew: true,
    trialDays: 0,
    discount: 0,
    notes: "",
  });

  const [errors, setErrors] = useState({});

  // Mock users for search
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      hasSubscription: false,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      hasSubscription: true,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      hasSubscription: false,
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      hasSubscription: false,
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@example.com",
      hasSubscription: false,
    },
  ];

  const plans = [
    {
      id: "basic",
      name: "Basic",
      description: "Perfect for individuals getting started",
      monthlyPrice: 19,
      yearlyPrice: 190,
      features: [
        "Up to 1,000 leads",
        "Basic analytics",
        "Email support",
        "5 campaigns",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "pro",
      name: "Pro",
      description: "Best for growing teams and businesses",
      monthlyPrice: 49,
      yearlyPrice: 490,
      features: [
        "Up to 10,000 leads",
        "Advanced analytics",
        "Priority support",
        "Unlimited campaigns",
        "API access",
      ],
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "premium",
      name: "Premium",
      description: "For large organizations with advanced needs",
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        "Unlimited leads",
        "Custom integrations",
        "24/7 support",
        "White-label",
        "Advanced security",
      ],
      color: "from-gold-500 to-yellow-600",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setFormData((prev) => ({ ...prev, userId: user.id }));
    setStep(2);
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};

    if (stepNumber === 1 && !selectedUser) {
      newErrors.user = "Please select a user";
    }

    if (stepNumber === 2) {
      if (!formData.plan) newErrors.plan = "Please select a plan";
      if (!formData.startDate) newErrors.startDate = "Start date is required";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(2)) return;

    setLoading(true);

    try {
      // // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 1500));
      // // Navigate back to subscription management
      // navigate('/admin/subscriptions');
    } catch (error) {
      console.error("Failed to create subscription:", error);
      setErrors({ submit: "Failed to create subscription. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const selectedPlan = plans.find((p) => p.id === formData.plan);
  const calculatePrice = () => {
    if (!selectedPlan) return 0;
    const basePrice =
      formData.billingCycle === "yearly"
        ? selectedPlan.yearlyPrice
        : selectedPlan.monthlyPrice;
    const discountAmount = (basePrice * formData.discount) / 100;
    return basePrice - discountAmount;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/subscriptions")}
          className="text-slate-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Subscriptions
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white">
            Add New Subscription
          </h1>
          <p className="text-slate-400 mt-1">
            Create a subscription for a user
          </p>
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
              Select User
            </span>
            <span
              className={`text-sm ${
                step >= 2 ? "text-purple-400" : "text-slate-400"
              }`}
            >
              Choose Plan
            </span>
            <span
              className={`text-sm ${
                step >= 3 ? "text-purple-400" : "text-slate-400"
              }`}
            >
              Configure & Review
            </span>
          </div>
        </div>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Crown className="h-5 w-5 mr-2" />
              {step === 1 && "Select User"}
              {step === 2 && "Choose Subscription Plan"}
              {step === 3 && "Configure Subscription"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Select User */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Search for a user
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name or email..."
                        className="pl-10 bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        onClick={() =>
                          !user.hasSubscription && handleUserSelect(user)
                        }
                        className={`p-4 rounded-lg border transition-all cursor-pointer ${
                          user.hasSubscription
                            ? "border-slate-600 bg-slate-700/30 opacity-50 cursor-not-allowed"
                            : selectedUser?.id === user.id
                            ? "border-purple-500 bg-purple-500/10"
                            : "border-slate-600 bg-slate-700/50 hover:border-slate-500 hover:bg-slate-700/70"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-4">
                              <span className="text-white text-sm font-semibold">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-white font-medium">
                                {user.name}
                              </h3>
                              <p className="text-slate-400 text-sm">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {user.hasSubscription ? (
                              <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                                Has Subscription
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-slate-600/50 text-slate-300 text-xs rounded-full">
                                No Subscription
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                      <User className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400 text-lg">No users found</p>
                      <p className="text-slate-500 text-sm">
                        Try adjusting your search criteria
                      </p>
                    </div>
                  )}

                  {errors.user && (
                    <p className="text-red-400 text-sm flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.user}
                    </p>
                  )}
                </div>
              )}

              {/* Step 2: Choose Plan */}
              {step === 2 && (
                <div className="space-y-6">
                  {selectedUser && (
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <p className="text-slate-300 text-sm">
                        Creating subscription for:
                      </p>
                      <p className="text-white font-medium">
                        {selectedUser.name} ({selectedUser.email})
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-4">
                      Select Subscription Plan
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {plans.map((plan) => (
                        <label
                          key={plan.id}
                          className={`p-6 rounded-lg border cursor-pointer transition-all ${
                            formData.plan === plan.id
                              ? "border-purple-500 bg-purple-500/10"
                              : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                          }`}
                        >
                          <input
                            type="radio"
                            name="plan"
                            value={plan.id}
                            checked={formData.plan === plan.id}
                            onChange={(e) =>
                              handleInputChange("plan", e.target.value)
                            }
                            className="sr-only"
                          />
                          <div className="text-center">
                            <div
                              className={`h-12 w-12 bg-gradient-to-r ${plan.color} rounded-lg flex items-center justify-center mx-auto mb-4`}
                            >
                              <Crown className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-white font-semibold text-lg mb-2">
                              {plan.name}
                            </h3>
                            <p className="text-slate-400 text-sm mb-4">
                              {plan.description}
                            </p>
                            <div className="mb-4">
                              <span className="text-2xl font-bold text-white">
                                ${plan.monthlyPrice}
                              </span>
                              <span className="text-slate-400 text-sm">
                                /month
                              </span>
                              <p className="text-slate-500 text-xs">
                                or ${plan.yearlyPrice}/year
                              </p>
                            </div>
                            <ul className="space-y-2 text-left">
                              {plan.features.map((feature, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center text-slate-300 text-sm"
                                >
                                  <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Billing Cycle
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          formData.billingCycle === "monthly"
                            ? "border-purple-500 bg-purple-500/10"
                            : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                        }`}
                      >
                        <input
                          type="radio"
                          name="billingCycle"
                          value="monthly"
                          checked={formData.billingCycle === "monthly"}
                          onChange={(e) =>
                            handleInputChange("billingCycle", e.target.value)
                          }
                          className="sr-only"
                        />
                        <div className="text-center">
                          <Calendar className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                          <p className="text-white font-medium">Monthly</p>
                          <p className="text-slate-400 text-sm">
                            Billed every month
                          </p>
                        </div>
                      </label>
                      <label
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          formData.billingCycle === "yearly"
                            ? "border-purple-500 bg-purple-500/10"
                            : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                        }`}
                      >
                        <input
                          type="radio"
                          name="billingCycle"
                          value="yearly"
                          checked={formData.billingCycle === "yearly"}
                          onChange={(e) =>
                            handleInputChange("billingCycle", e.target.value)
                          }
                          className="sr-only"
                        />
                        <div className="text-center">
                          <Calendar className="h-6 w-6 text-green-400 mx-auto mb-2" />
                          <p className="text-white font-medium">Yearly</p>
                          <p className="text-slate-400 text-sm">
                            Save 2 months!
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Configure & Review */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Start Date
                      </label>
                      <Input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          handleInputChange("startDate", e.target.value)
                        }
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Trial Days
                      </label>
                      <Input
                        type="number"
                        min="0"
                        max="90"
                        value={formData.trialDays}
                        onChange={(e) =>
                          handleInputChange(
                            "trialDays",
                            parseInt(e.target.value) || 0
                          )
                        }
                        placeholder="0"
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Discount (%)
                      </label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.discount}
                        onChange={(e) =>
                          handleInputChange(
                            "discount",
                            parseInt(e.target.value) || 0
                          )
                        }
                        placeholder="0"
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Payment Method
                      </label>
                      <select
                        value={formData.paymentMethod}
                        onChange={(e) =>
                          handleInputChange("paymentMethod", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                      >
                        <option value="credit_card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="invoice">Invoice</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) =>
                        handleInputChange("notes", e.target.value)
                      }
                      placeholder="Add any additional notes..."
                      rows={3}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white resize-none"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="autoRenew"
                      checked={formData.autoRenew}
                      onChange={(e) =>
                        handleInputChange("autoRenew", e.target.checked)
                      }
                      className="mr-3"
                    />
                    <label htmlFor="autoRenew" className="text-slate-300">
                      Enable auto-renewal
                    </label>
                  </div>

                  {/* Subscription Summary */}
                  <div className="p-6 bg-slate-700/50 rounded-lg">
                    <h3 className="text-white font-medium mb-4">
                      Subscription Summary
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">User:</span>
                        <span className="text-white">{selectedUser?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Plan:</span>
                        <span className="text-white">{selectedPlan?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Billing:</span>
                        <span className="text-white capitalize">
                          {formData.billingCycle}
                        </span>
                      </div>
                      {formData.trialDays > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Trial Period:</span>
                          <span className="text-white">
                            {formData.trialDays} days
                          </span>
                        </div>
                      )}
                      {formData.discount > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Discount:</span>
                          <span className="text-green-400">
                            -{formData.discount}%
                          </span>
                        </div>
                      )}
                      <div className="border-t border-slate-600 pt-3">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Total Price:</span>
                          <span className="text-white font-bold text-lg">
                            ${calculatePrice()}/
                            {formData.billingCycle === "yearly"
                              ? "year"
                              : "month"}
                          </span>
                        </div>
                      </div>
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
                    onClick={() => navigate("/admin/subscriptions")}
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
                          Creating...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Create Subscription
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
