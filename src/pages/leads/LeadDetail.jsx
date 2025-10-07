import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  MapPin,
  Database,
  Globe,
  Calendar,
  Download,
  RefreshCw,
  Mail,
  Phone,
  Building,
  ExternalLink,
  Filter,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';

// Mock data for a single lead search
const mockLeadSearch = {
  id: 1,
  keyword: 'Plumber',
  place: 'New York, NY',
  recordCount: 150,
  source: 'Google',
  status: 'Completed',
  dateCreated: '2024-01-15',
  recordsFound: 150,
  timeElapsed: '5 minutes',
};

// Mock data for found records
const mockRecords = [
  {
    id: 1,
    businessName: 'ABC Plumbing Services',
    contactName: 'John Smith',
    email: 'john@abcplumbing.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    website: 'www.abcplumbing.com',
    rating: 4.5,
    reviews: 234,
  },
  {
    id: 2,
    businessName: 'Quick Fix Plumbers',
    contactName: 'Sarah Johnson',
    email: 'sarah@quickfixplumbers.com',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Ave, New York, NY 10002',
    website: 'www.quickfixplumbers.com',
    rating: 4.8,
    reviews: 567,
  },
  {
    id: 3,
    businessName: 'Elite Plumbing Co',
    contactName: 'Mike Davis',
    email: 'mike@eliteplumbing.com',
    phone: '+1 (555) 345-6789',
    address: '789 Pine Rd, New York, NY 10003',
    website: 'www.eliteplumbing.com',
    rating: 4.3,
    reviews: 189,
  },
  {
    id: 4,
    businessName: 'Pro Plumbing Solutions',
    contactName: 'Emily Chen',
    email: 'emily@proplumbing.com',
    phone: '+1 (555) 456-7890',
    address: '321 Elm St, New York, NY 10004',
    website: 'www.proplumbing.com',
    rating: 4.7,
    reviews: 423,
  },
  {
    id: 5,
    businessName: 'City Plumbers NYC',
    contactName: 'David Wilson',
    email: 'david@cityplumbers.com',
    phone: '+1 (555) 567-8901',
    address: '654 Maple Dr, New York, NY 10005',
    website: 'www.cityplumbers.com',
    rating: 4.6,
    reviews: 312,
  },
];

const StatusBadge = ({ status }) => {
  const statusConfig = {
    Completed: {
      color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
      icon: CheckCircle,
    },
    'In Progress': {
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      icon: Clock,
    },
    Failed: {
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      icon: AlertCircle,
    },
  };

  const config = statusConfig[status] || statusConfig['Completed'];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${config.color}`}>
      <Icon className="h-4 w-4 mr-2" />
      {status}
    </span>
  );
};

export const LeadDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecords, setSelectedRecords] = useState([]);

  const filteredRecords = mockRecords.filter((record) =>
    record.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.phone.includes(searchTerm)
  );

  const handleSelectRecord = (recordId) => {
    setSelectedRecords((prev) =>
      prev.includes(recordId)
        ? prev.filter((id) => id !== recordId)
        : [...prev, recordId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRecords.length === filteredRecords.length) {
      setSelectedRecords([]);
    } else {
      setSelectedRecords(filteredRecords.map((record) => record.id));
    }
  };

  const handleExport = () => {
    // Export logic here
    alert('Exporting selected records...');
  };

  return (
    <PageWrapper
      title={`Lead Search: ${mockLeadSearch.keyword}`}
      description={`Search results from ${mockLeadSearch.source}`}
      actions={
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => navigate('/leads')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleExport} disabled={selectedRecords.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Export ({selectedRecords.length})
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Search Details Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Search Details</CardTitle>
            <CardDescription>Information about this lead search campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <Search className="h-4 w-4 mr-2" />
                  Keyword
                </div>
                <div className="text-lg font-semibold text-slate-900 dark:text-white">
                  {mockLeadSearch.keyword}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  Location
                </div>
                <div className="text-lg font-semibold text-slate-900 dark:text-white">
                  {mockLeadSearch.place}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <Globe className="h-4 w-4 mr-2" />
                  Source
                </div>
                <div className="text-lg font-semibold text-slate-900 dark:text-white">
                  {mockLeadSearch.source}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Created
                </div>
                <div className="text-lg font-semibold text-slate-900 dark:text-white">
                  {mockLeadSearch.dateCreated}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">Target Records</div>
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {mockLeadSearch.recordCount}
                    </div>
                  </div>
                  <Database className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>

                <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <div>
                    <div className="text-sm text-emerald-600 dark:text-emerald-400">Records Found</div>
                    <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                      {mockLeadSearch.recordsFound}
                    </div>
                  </div>
                  <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div>
                    <div className="text-sm text-purple-600 dark:text-purple-400">Status</div>
                    <div className="mt-1">
                      <StatusBadge status={mockLeadSearch.status} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                {selectedRecords.length > 0 && (
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {selectedRecords.length} selected
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Records Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Found Records ({filteredRecords.length})</CardTitle>
            <CardDescription>Business leads found from your search</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selectedRecords.length === filteredRecords.length && filteredRecords.length > 0}
                        onChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Contact Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <TableCell>
                        <input
                          type="checkbox"
                          className="rounded"
                          checked={selectedRecords.includes(record.id)}
                          onChange={() => handleSelectRecord(record.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                            {record.businessName.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="font-medium text-slate-900 dark:text-white">
                            {record.businessName}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{record.contactName}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-slate-400" />
                          <a href={`mailto:${record.email}`} className="text-blue-600 hover:underline">
                            {record.email}
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-slate-400" />
                          {record.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Building className="h-4 w-4 mr-2 text-slate-400" />
                          {record.address}
                        </div>
                      </TableCell>
                      <TableCell>
                        {record.website && (
                          <a
                            href={`https://${record.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 hover:underline"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Visit
                          </a>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="text-amber-500 mr-1">★</span>
                          <span className="font-semibold">{record.rating}</span>
                          <span className="text-xs text-slate-500 ml-1">({record.reviews})</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
};
