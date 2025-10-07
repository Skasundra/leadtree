import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Upload,
  MoreHorizontal,
  Users,
  TrendingUp,
  MapPin,
  Database,
  Globe,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  Grid,
  List,
  SortAsc,
  SortDesc,
  CheckCircle,
  AlertCircle,
  Star,
} from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table.jsx";

const mockLeads = [
  {
    id: 1,
    keyword: "Plumber",
    place: "New York, NY",
    recordCount: 150,
    source: "Google",
    status: "Completed",
    dateCreated: "2024-01-15",
    recordsFound: 150,
  },
  {
    id: 2,
    keyword: "Restaurant",
    place: "Los Angeles, CA",
    recordCount: 200,
    source: "Yelp",
    status: "In Progress",
    dateCreated: "2024-01-14",
    recordsFound: 87,
  },
  {
    id: 3,
    keyword: "Dentist",
    place: "Chicago, IL",
    recordCount: 100,
    source: "YellowMap",
    status: "Completed",
    dateCreated: "2024-01-13",
    recordsFound: 100,
  },
  {
    id: 4,
    keyword: "Electrician",
    place: "Mumbai, India",
    recordCount: 250,
    source: "JustDial",
    status: "Completed",
    dateCreated: "2024-01-12",
    recordsFound: 250,
  },
  {
    id: 5,
    keyword: "Contractor",
    place: "Houston, TX",
    recordCount: 180,
    source: "BBB",
    status: "Failed",
    dateCreated: "2024-01-11",
    recordsFound: 0,
  },
  {
    id: 6,
    keyword: "HVAC Service",
    place: "Phoenix, AZ",
    recordCount: 120,
    source: "Angi",
    status: "Completed",
    dateCreated: "2024-01-10",
    recordsFound: 120,
  },
  {
    id: 7,
    keyword: "Manufacturer",
    place: "Delhi, India",
    recordCount: 300,
    source: "IndiaMART",
    status: "In Progress",
    dateCreated: "2024-01-09",
    recordsFound: 145,
  },
];

const StatusBadge = ({ status }) => {
  const statusConfig = {
    Completed: {
      color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
      dot: "bg-emerald-500",
    },
    "In Progress": {
      color:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      dot: "bg-amber-500",
    },
    Failed: {
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      dot: "bg-red-500",
    },
    Pending: {
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      dot: "bg-blue-500",
    },
  };

  const config = statusConfig[status] || statusConfig["Pending"];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
    >
      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${config.dot}`} />
      {status}
    </span>
  );
};

const ProgressBar = ({ current, total }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;
  
  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        {current}/{total}
      </div>
      <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300 bg-blue-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const LeadCard = ({ lead, onSelect, isSelected, onViewDetails }) => (
  <Card className="hover:shadow-lg transition-all duration-200 border-0 bg-white dark:bg-slate-800">
    <CardContent className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(lead.id)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
            {lead.source.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {lead.keyword}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {lead.place}
            </p>
          </div>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
          <Search className="h-4 w-4 mr-2" />
          Keyword: {lead.keyword}
        </div>
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
          <MapPin className="h-4 w-4 mr-2" />
          Location: {lead.place}
        </div>
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
          <Database className="h-4 w-4 mr-2" />
          Target: {lead.recordCount} records
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm">
          <span className="text-slate-500 dark:text-slate-400">Progress:</span>
          <ProgressBar current={lead.recordsFound} total={lead.recordCount} />
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {lead.dateCreated}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Globe className="h-4 w-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {lead.source}
          </span>
        </div>
        <div className="flex space-x-1">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onViewDetails(lead.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const LeadsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [sortBy, setSortBy] = useState("keyword");
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLeads = mockLeads
    .filter((lead) => {
      const matchesSearch =
        lead.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.source.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const handleSelectLead = (leadId) => {
    setSelectedLeads((prev) =>
      prev.includes(leadId)
        ? prev.filter((id) => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map((lead) => lead.id));
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <PageWrapper
      title="Lead Management"
      description="Manage and track your sales prospects"
      actions={
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Link to="/leads/add">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          </Link>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Total Searches
                  </p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {mockLeads.length}
                  </p>
                </div>
                <Search className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    Completed
                  </p>
                  <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                    {
                      mockLeads.filter((lead) => lead.status === "Completed")
                        .length
                    }
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                    In Progress
                  </p>
                  <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                    {
                      mockLeads.filter((lead) => lead.status === "In Progress")
                        .length
                    }
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-amber-600 dark:text-amber-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    Total Records
                  </p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {mockLeads.reduce((acc, lead) => acc + lead.recordsFound, 0)}
                  </p>
                </div>
                <Database className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Failed">Failed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setViewMode(viewMode === "table" ? "grid" : "table")
                  }
                >
                  {viewMode === "table" ? (
                    <Grid className="h-4 w-4" />
                  ) : (
                    <List className="h-4 w-4" />
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                {selectedLeads.length > 0 && (
                  <Button variant="outline" size="sm">
                    Actions ({selectedLeads.length})
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leads Table/Grid */}
        {viewMode === "table" ? (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>All Lead Searches ({filteredLeads.length})</CardTitle>
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
                          checked={
                            selectedLeads.length === filteredLeads.length &&
                            filteredLeads.length > 0
                          }
                          onChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                        onClick={() => handleSort("keyword")}
                      >
                        <div className="flex items-center">
                          Keyword
                          {sortBy === "keyword" &&
                            (sortOrder === "asc" ? (
                              <SortAsc className="h-4 w-4 ml-1" />
                            ) : (
                              <SortDesc className="h-4 w-4 ml-1" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                        onClick={() => handleSort("place")}
                      >
                        <div className="flex items-center">
                          Place
                          {sortBy === "place" &&
                            (sortOrder === "asc" ? (
                              <SortAsc className="h-4 w-4 ml-1" />
                            ) : (
                              <SortDesc className="h-4 w-4 ml-1" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Target Records</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Created</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <TableRow
                        key={lead.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      >
                        <TableCell>
                          <input
                            type="checkbox"
                            className="rounded"
                            checked={selectedLeads.includes(lead.id)}
                            onChange={() => handleSelectLead(lead.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                              <Search className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium text-slate-900 dark:text-white">
                                {lead.keyword}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                            {lead.place}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-slate-400" />
                            {lead.source}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            {lead.recordCount}
                          </span>
                        </TableCell>
                        <TableCell>
                          <ProgressBar current={lead.recordsFound} total={lead.recordCount} />
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={lead.status} />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                            <Calendar className="h-4 w-4 mr-2" />
                            {lead.dateCreated}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => navigate(`/leads/${lead.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onSelect={handleSelectLead}
                isSelected={selectedLeads.includes(lead.id)}
                onViewDetails={(id) => navigate(`/leads/${id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
