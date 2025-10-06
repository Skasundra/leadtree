import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadsService } from '../services/leadsService';
import toast from 'react-hot-toast';

// Query Keys Structure
export const leadQueryKeys = {
  all: ['leads'],
  lists: () => [...leadQueryKeys.all, 'list'],
  list: (filters) => [...leadQueryKeys.lists(), filters],
  details: () => [...leadQueryKeys.all, 'detail'],
  detail: (id) => [...leadQueryKeys.details(), id],
  activity: (id) => [...leadQueryKeys.all, 'activity', id],
};

// Hooks
export const useLeads = (filters = {}) => {
  return useQuery({
    queryKey: leadQueryKeys.list(filters),
    queryFn: () => leadsService.getLeads(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useLead = (id) => {
  return useQuery({
    queryKey: leadQueryKeys.detail(id),
    queryFn: () => leadsService.getLead(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useLeadActivity = (id) => {
  return useQuery({
    queryKey: leadQueryKeys.activity(id),
    queryFn: () => leadsService.getLeadActivity(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: leadsService.createLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leadQueryKeys.lists() });
      toast.success('Lead created successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateLead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => leadsService.updateLead(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: leadQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: leadQueryKeys.detail(variables.id) });
      toast.success('Lead updated successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteLead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: leadsService.deleteLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leadQueryKeys.lists() });
      toast.success('Lead deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useBulkDeleteLeads = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: leadsService.bulkDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leadQueryKeys.lists() });
      toast.success('Leads deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useBulkUploadLeads = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: leadsService.bulkUpload,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: leadQueryKeys.lists() });
      toast.success(`${data.imported} leads imported successfully`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useAddLeadNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ leadId, note }) => leadsService.addNote(leadId, note),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: leadQueryKeys.detail(variables.leadId) });
      queryClient.invalidateQueries({ queryKey: leadQueryKeys.activity(variables.leadId) });
      toast.success('Note added successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};