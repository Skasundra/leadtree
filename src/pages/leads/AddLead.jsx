import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Database,
  Globe,
  Save,
  X
} from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { toast } from 'react-hot-toast';

export const AddLead = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    keyword: '',
    place: '',
    recordCount: '',
    source: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.keyword || !formData.place || !formData.recordCount || !formData.source) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Lead search initiated successfully!');
      navigate('/leads');
    } catch (error) {
      toast.error('Failed to add lead. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sourceOptions = [
    'Google',
    'YellowMap',
    'Yelp',
    'BBB',
    'Angi',
    'JustDial',
    'IndiaMART',
    'Sulekha',
    'TradeIndia',
    'Alibaba'
  ];

  return (
    <PageWrapper
      title="Add New Lead"
      description="Search and import leads from various sources"
      actions={
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={() => navigate('/leads')}
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={loading}
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Searching...' : 'Search Leads'}
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Search className="h-6 w-6 mr-3 text-blue-600" />
              Lead Search Parameters
            </CardTitle>
            <CardDescription>
              Enter search criteria to find and import leads from your selected source
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Keyword Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Keyword *
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  value={formData.keyword}
                  onChange={(e) => handleInputChange('keyword', e.target.value)}
                  placeholder="e.g., plumber, restaurant, dentist"
                  className="pl-10 text-base"
                  required
                />
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Enter the business type or service you're looking for
              </p>
            </div>

            {/* Place Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Place *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  value={formData.place}
                  onChange={(e) => handleInputChange('place', e.target.value)}
                  placeholder="e.g., New York, NY or Mumbai, India"
                  className="pl-10 text-base"
                  required
                />
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Enter the city, state, or region to search in
              </p>
            </div>

            {/* Record Count Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Number of Records *
              </label>
              <div className="relative">
                <Database className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  type="number"
                  value={formData.recordCount}
                  onChange={(e) => handleInputChange('recordCount', e.target.value)}
                  placeholder="e.g., 100"
                  className="pl-10 text-base"
                  min="1"
                  max="1000"
                  required
                />
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                How many leads do you want to retrieve? (Max: 1000)
              </p>
            </div>

            {/* Source Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Lead Source *
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                <select
                  value={formData.source}
                  onChange={(e) => handleInputChange('source', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-base border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select a source</option>
                  {sourceOptions.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Choose the platform to search for leads
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    How it works
                  </h3>
                  <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                    <p>
                      Enter your search criteria and we'll fetch matching business leads from your selected source. 
                      The results will be automatically imported into your leads database.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </PageWrapper>
  );
};