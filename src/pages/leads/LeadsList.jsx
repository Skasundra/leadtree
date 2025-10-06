import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Upload,
  MoreHorizontal,
  Users,
  TrendingUp,
  Mail,
  Phone,
  Building,
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
    name: "John Smith",
    email: "john.smith@company.com",
    company: "Tech Corp",
    position: "CEO",
    status: "New",
    tags: ["Enterprise", "Hot Lead"],
    lastContact: "2024-01-15",
    source: "Website",
    phone: "+1 (555) 123-4567",
    score: 85,
    avatar: null,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@startup.io",
    company: "StartupIO",
    position: "CTO",
    status: "Contacted",
    tags: ["Startup", "Technical"],
    lastContact: "2024-01-14",
    source: "LinkedIn",
    phone: "+1 (555) 234-5678",
    score: 72,
    avatar: null,
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike@enterprise.com",
    company: "Enterprise Solutions",
    position: "VP Sales",
    status: "Qualified",
    tags: ["Enterprise", "Decision Maker"],
    lastContact: "2024-01-13",
    source: "Referral",
    phone: "+1 (555) 345-6789",
    score: 91,
    avatar: null,
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily.chen@innovate.com",
    company: "Innovate Labs",
    position: "Product Manager",
    status: "Proposal",
    tags: ["Product", "Innovation"],
    lastContact: "2024-01-12",
    source: "Event",
    phone: "+1 (555) 456-7890",
    score: 78,
    avatar: null,
  },
  {
    id: 5,
    name: "David Wilson",
    email: "d.wilson@globaltech.com",
    company: "Global Tech",
    position: "Director",
    status: "Negotiation",
    tags: ["Global", "Director"],
    lastContact: "2024-01-11",
    source: "Cold Email",
    phone: "+1 (555) 567-8901",
    score: 88,
    avatar: null,
  },
];

const StatusBadge = ({ status }) => {
  const statusConfig = {
    New: {
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      dot: "bg-blue-500",
    },
    Contacted: {
      color:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      dot: "bg-amber-500",
    },
    Qualified: {
      color:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
      dot: "bg-emerald-500",
    },
    Proposal: {
      color:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      dot: "bg-purple-500",
    },
    Negotiation: {
      color:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      dot: "bg-orange-500",
    },
    Won: {
      color:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      dot: "bg-green-500",
    },
    Lost: {
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      dot: "bg-red-500",
    },
  };

  const config = statusConfig[status] || statusConfig["New"];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
    >
      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${config.dot}`} />
      {status}
    </span>
  );
};

const LeadScore = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`text-sm font-semibold ${getScoreColor(score)}`}>
        {score}
      </div>
      <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            score >= 80
              ? "bg-emerald-500"
              : score >= 60
              ? "bg-amber-500"
              : "bg-red-500"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

const LeadCard = ({ lead, onSelect, isSelected }) => (
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
          <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {lead.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {lead.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {lead.position} at {lead.company}
            </p>
          </div>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
          <Mail className="h-4 w-4 mr-2" />
          {lead.email}
        </div>
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
          <Phone className="h-4 w-4 mr-2" />
          {lead.phone}
        </div>
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
          <Building className="h-4 w-4 mr-2" />
          {lead.company}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm">
          <span className="text-slate-500 dark:text-slate-400">Score:</span>
          <LeadScore score={lead.score} />
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Last contact: {lead.lastContact}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {lead.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
          {lead.tags.length > 2 && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              +{lead.tags.length - 2} more
            </span>
          )}
        </div>
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLeads = mockLeads
    .filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.position.toLowerCase().includes(searchTerm.toLowerCase());

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
                    Total Leads
                  </p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {mockLeads.length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    Qualified
                  </p>
                  <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                    {
                      mockLeads.filter((lead) => lead.status === "Qualified")
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
                      mockLeads.filter((lead) =>
                        ["Contacted", "Proposal", "Negotiation"].includes(
                          lead.status
                        )
                      ).length
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
                    Avg. Score
                  </p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {Math.round(
                      mockLeads.reduce((acc, lead) => acc + lead.score, 0) /
                        mockLeads.length
                    )}
                  </p>
                </div>
                <Star className="h-8 w-8 text-purple-600 dark:text-purple-400" />
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
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
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
              <CardTitle>All Leads ({filteredLeads.length})</CardTitle>
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
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center">
                          Name
                          {sortBy === "name" &&
                            (sortOrder === "asc" ? (
                              <SortAsc className="h-4 w-4 ml-1" />
                            ) : (
                              <SortDesc className="h-4 w-4 ml-1" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                        onClick={() => handleSort("company")}
                      >
                        <div className="flex items-center">
                          Company
                          {sortBy === "company" &&
                            (sortOrder === "asc" ? (
                              <SortAsc className="h-4 w-4 ml-1" />
                            ) : (
                              <SortDesc className="h-4 w-4 ml-1" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead>Last Contact</TableHead>
                      <TableHead>Source</TableHead>
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
                            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {lead.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <div className="font-medium text-slate-900 dark:text-white">
                                {lead.name}
                              </div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">
                                {lead.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {lead.company}
                        </TableCell>
                        <TableCell>{lead.position}</TableCell>
                        <TableCell>
                          <StatusBadge status={lead.status} />
                        </TableCell>
                        <TableCell>
                          <LeadScore score={lead.score} />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {lead.tags.slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                              >
                                {tag}
                              </span>
                            ))}
                            {lead.tags.length > 2 && (
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                +{lead.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{lead.lastContact}</TableCell>
                        <TableCell>{lead.source}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
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
              />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
