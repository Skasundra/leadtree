import api from './api';

export const campaignsService = {
  getCampaigns: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value);
        }
      });
      
      const response = await api.get(`/campaigns?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch campaigns');
    }
  },

  getCampaign: async (id) => {
    try {
      const response = await api.get(`/campaigns/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch campaign');
    }
  },

  createCampaign: async (campaignData) => {
    try {
      const response = await api.post('/campaigns', campaignData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create campaign');
    }
  },

  updateCampaign: async (id, campaignData) => {
    try {
      const response = await api.put(`/campaigns/${id}`, campaignData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update campaign');
    }
  },

  deleteCampaign: async (id) => {
    try {
      await api.delete(`/campaigns/${id}`);
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete campaign');
    }
  },

  pauseCampaign: async (id) => {
    try {
      const response = await api.post(`/campaigns/${id}/pause`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to pause campaign');
    }
  },

  resumeCampaign: async (id) => {
    try {
      const response = await api.post(`/campaigns/${id}/resume`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to resume campaign');
    }
  },

  getCampaignAnalytics: async (id, dateRange = {}) => {
    try {
      const params = new URLSearchParams();
      Object.entries(dateRange).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await api.get(`/campaigns/${id}/analytics?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch campaign analytics');
    }
  },

  getCampaignLeads: async (id, filters = {}) => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value);
        }
      });
      
      const response = await api.get(`/campaigns/${id}/leads?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch campaign leads');
    }
  },

  addLeadsToCampaign: async (campaignId, leadIds) => {
    try {
      const response = await api.post(`/campaigns/${campaignId}/leads`, { leadIds });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add leads to campaign');
    }
  },

  removeLeadsFromCampaign: async (campaignId, leadIds) => {
    try {
      await api.delete(`/campaigns/${campaignId}/leads`, { data: { leadIds } });
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to remove leads from campaign');
    }
  },
};