import { create } from 'zustand';

export const useUIStore = create((set, get) => ({
  sidebarOpen: true,
  breadcrumbs: [],
  
  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },
  
  setSidebarOpen: (open) => {
    set({ sidebarOpen: open });
  },
  
  setBreadcrumbs: (crumbs) => {
    set({ breadcrumbs: crumbs });
  },
  
  addBreadcrumb: (crumb) => {
    const { breadcrumbs } = get();
    set({ breadcrumbs: [...breadcrumbs, crumb] });
  },
  
  clearBreadcrumbs: () => {
    set({ breadcrumbs: [] });
  },
}));