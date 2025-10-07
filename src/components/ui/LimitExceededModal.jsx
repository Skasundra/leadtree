import { AlertCircle, Zap, CreditCard, TrendingUp } from 'lucide-react';
import { Button } from './Button';
import { Modal } from './Modal';
import { useNavigate } from 'react-router-dom';

export const LimitExceededModal = ({ isOpen, onClose, limitType = 'emails' }) => {
  const navigate = useNavigate();

  const limitInfo = {
    emails: {
      title: 'Email Limit Exceeded',
      description: 'You\'ve reached your monthly email sending limit.',
      icon: AlertCircle,
      color: 'text-red-600'
    },
    leads: {
      title: 'Lead Limit Exceeded',
      description: 'You\'ve reached your maximum lead storage limit.',
      icon: AlertCircle,
      color: 'text-amber-600'
    },
    ai: {
      title: 'AI Generation Limit Exceeded',
      description: 'You\'ve used all your AI email generations for this month.',
      icon: Zap,
      color: 'text-purple-600'
    }
  };

  const info = limitInfo[limitType] || limitInfo.emails;
  const Icon = info.icon;

  const handleUpgradePlan = () => {
    onClose();
    navigate('/pricing');
  };

  const handleAddTopup = () => {
    onClose();
    navigate('/billing/topup');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg">
      <div className="text-center py-4">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-full flex items-center justify-center mb-4">
          <Icon className={`h-8 w-8 ${info.color}`} />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {info.title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          {info.description}
        </p>

        {/* Current Usage Info */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-6 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Current Usage
            </span>
            <span className="text-sm font-bold text-red-600 dark:text-red-400">
              100% Used
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full w-full"></div>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          <div className="text-left">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
              Choose an option to continue:
            </h4>
          </div>

          {/* Upgrade Plan Option */}
          <button
            onClick={handleUpgradePlan}
            className="w-full p-4 border-2 border-blue-200 dark:border-blue-800 rounded-xl hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group text-left"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg group-hover:shadow-lg transition-shadow">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-slate-900 dark:text-white mb-1">
                  Upgrade Your Plan
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Get more leads, emails, and features with a higher tier plan
                </p>
              </div>
            </div>
          </button>

          {/* Add-on/Top-up Option */}
          <button
            onClick={handleAddTopup}
            className="w-full p-4 border-2 border-purple-200 dark:border-purple-800 rounded-xl hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all group text-left"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg group-hover:shadow-lg transition-shadow">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-slate-900 dark:text-white mb-1">
                  Add Top-up Credits
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Purchase additional credits without changing your plan
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Maybe Later
          </Button>
          <Button
            onClick={handleUpgradePlan}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            View Plans
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
          Need help? Contact our support team for assistance
        </p>
      </div>
    </Modal>
  );
};
