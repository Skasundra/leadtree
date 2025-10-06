import api from './api';

export const leadsService = {
  getLeads: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      // Add filters to params
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value);
        }
      });
      
      const response = await api.get(`/leads?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch leads');
    }
  },

  getLead: async (id) => {
    try {
      const response = await api.get(`/leads/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch lead');
    }
  },

  createLead: async (leadData) => {
    try {
      const response = await api.post('/leads', leadData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create lead');
    }
  },

  updateLead: async (id, leadData) => {
    try {
      const response = await api.put(`/leads/${id}`, leadData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update lead');
    }
  },

  deleteLead: async (id) => {
    try {
      await api.delete(`/leads/${id}`);
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete lead');
    }
  },

  bulkDelete: async (ids) => {
    try {
      await api.post('/leads/bulk-delete', { ids });
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete leads');
    }
  },

  bulkUpload: async (csvData) => {
    try {
      const formData = new FormData();
      formData.append('file', csvData);
      
      const response = await api.post('/leads/bulk-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload leads');
    }
  },

  exportLeads: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value);
        }
      });
      
      const response = await api.get(`/leads/export?${params.toString()}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to export leads');
    }
  },

  addNote: async (leadId, note) => {
    try {
      const response = await api.post(`/leads/${leadId}/notes`, { note });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add note');
    }
  },

  getLeadActivity: async (leadId) => {
    try {
      const response = await api.get(`/leads/${leadId}/activity`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch lead activity');
    }
  },
};