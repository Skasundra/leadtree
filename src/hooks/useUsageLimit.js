import { useState, useEffect } from 'react';

// Custom hook to check usage limits
export const useUsageLimit = () => {
  const [usage, setUsage] = useState({
    emails: { current: 3247, limit: 5000 },
    leads: { current: 2847, limit: 3000 },
    ai: { current: 156, limit: 500 },
  });

  const [limitExceeded, setLimitExceeded] = useState({
    emails: false,
    leads: false,
    ai: false,
  });

  // Check if any limit is exceeded
  useEffect(() => {
    const exceeded = {
      emails: usage.emails.current >= usage.emails.limit,
      leads: usage.leads.current >= usage.leads.limit,
      ai: usage.ai.current >= usage.ai.limit,
    };
    setLimitExceeded(exceeded);
  }, [usage]);

  // Function to check if a specific limit is exceeded
  const isLimitExceeded = (type) => {
    return limitExceeded[type];
  };

  // Function to get usage percentage
  const getUsagePercentage = (type) => {
    const { current, limit } = usage[type];
    return Math.min((current / limit) * 100, 100);
  };

  // Function to check if approaching limit (>80%)
  const isApproachingLimit = (type) => {
    return getUsagePercentage(type) >= 80;
  };

  // Simulate usage update (in real app, this would come from API)
  const updateUsage = (type, newCurrent) => {
    setUsage(prev => ({
      ...prev,
      [type]: { ...prev[type], current: newCurrent }
    }));
  };

  return {
    usage,
    limitExceeded,
    isLimitExceeded,
    getUsagePercentage,
    isApproachingLimit,
    updateUsage,
  };
};
