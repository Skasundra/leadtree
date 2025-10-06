import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { campaignsService } from '../services/campaignsService';
import toast from 'react-hot-toast';

// Query Keys Structure
export const campaignQueryKeys = {
  all: ['campaigns'],
  lists: () => [...campaignQueryKeys.all, 'list'],
  list: (filters) => [...campaignQueryKeys.lists(), filters],
  details: () => [...campaignQueryKeys.all, 'detail'],
  detail: (id) => [...campaignQueryKeys.details(), id],
  analytics: (id, dateRange) => [...campaignQueryKeys.all, 'analytics', id, dateRange],
  leads: (id, filters) => [...campaignQueryKeys.all, 'leads', id, filters],
};

// Hooks
export const useCampaigns = (filters = {}) => {
  return useQuery({
    queryKey: campaignQueryKeys.list(filters),
    queryFn: () => campaignsService.getCampaigns(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCampaign = (id) => {
  return useQuery({
    queryKey: campaignQueryKeys.detail(id),
    queryFn: () => campaignsService.getCampaign(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCampaignAnalytics = (id, dateRange = {}) => {
  return useQuery({
    queryKey: campaignQueryKeys.analytics(id, dateRange),
    queryFn: () => campaignsService.getCampaignAnalytics(id, dateRange),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCampaignLeads = (id, filters = {}) => {
  return useQuery({
    queryKey: campaignQueryKeys.leads(id, filters),
    queryFn: () => campaignsService.getCampaignLeads(id, filters),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: campaignsService.createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: campaignQueryKeys.lists() });
      toast.success('Campaign created successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateCampaign = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => campaignsService.updateCampaign(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: campaignQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: campaignQueryKeys.detail(variables.id) });
      toast.success('Campaign updated successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteCampaign = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: campaignsService.deleteCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: campaignQueryKeys.lists() });
      toast.success('Campaign deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const usePauseCampaign = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: campaignsService.pauseCampaign,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: campaignQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: campaignQueryKeys.detail(variables) });
      toast.success('Campaign paused successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useResumeCampaign = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: campaignsService.resumeCampaign,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: campaignQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: campaignQueryKeys.detail(variables) });
      toast.success('Campaign resumed successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useAddLeadsToCampaign = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ campaignId, leadIds }) => campaignsService.addLeadsToCampaign(campaignId, leadIds),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: campaignQueryKeys.detail(variables.campaignId) });
      queryClient.invalidateQueries({ queryKey: campaignQueryKeys.leads(variables.campaignId) });
      toast.success('Leads added to campaign successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};