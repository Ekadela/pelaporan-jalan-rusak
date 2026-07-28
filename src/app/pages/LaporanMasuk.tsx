import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, Filter, MapPin, Calendar, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export function LaporanMasuk() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [reports, setReports] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>(
    searchParams.get("filter") === "verified" ? "verified" : "all"
  );

  useEffect(() => {
    // Load reports from localStorage
    const savedReports = JSON.parse(localStorage.getItem("reports") || "[]");
    setReports(savedReports);
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      pending: { label: "Menunggu", className: "bg-secondary/20 text-secondary border-secondary" },
      verified: { label: "Terverifikasi", className: "bg-primary/20 text-primary border-primary" },
      in_progress: { label: "Dalam Proses", className: "bg-accent/20 text-accent border-accent" },
      completed: { label: "Selesai", className: "bg-green-500/20 text-green-400 border-green-500" },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const filteredReports = reports.filter((report) => {
    if (filterStatus === "all") return true;
    return report.status === filterStatus;
  });

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-primary mb-2">Laporan Masuk</h1>
              <p className="text-muted-foreground">
                Semua laporan jalan rusak yang telah diterima
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48 bg-input border-border text-foreground">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all" className="text-foreground">Semua Status</SelectItem>
                  <SelectItem value="pending" className="text-foreground">Menunggu</SelectItem>
                  <SelectItem value="verified" className="text-foreground">Terverifikasi</SelectItem>
                  <SelectItem value="in_progress" className="text-foreground">Dalam Proses</SelectItem>
                  <SelectItem value="completed" className="text-foreground">Selesai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-card border-2 border-border">
            <div className="text-2xl text-primary mb-1">
              {reports.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Laporan</div>
          </Card>
          <Card className="p-4 bg-card border-2 border-border">
            <div className="text-2xl text-secondary mb-1">
              {reports.filter((r) => r.status === "pending").length}
            </div>
            <div className="text-sm text-muted-foreground">Menunggu</div>
          </Card>
          <Card className="p-4 bg-card border-2 border-border">
            <div className="text-2xl text-accent mb-1">
              {reports.filter((r) => r.status === "in_progress").length}
            </div>
            <div className="text-sm text-muted-foreground">Dalam Proses</div>
          </Card>
          <Card className="p-4 bg-card border-2 border-border">
            <div className="text-2xl text-green-400 mb-1">
              {reports.filter((r) => r.status === "completed").length}
            </div>
            <div className="text-sm text-muted-foreground">Selesai</div>
          </Card>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <Card className="p-12 bg-card border-2 border-border text-center">
              <h3 className="text-lg text-foreground mb-2">Tidak Ada Laporan</h3>
              <p className="text-sm text-muted-foreground">
                {filterStatus === "all"
                  ? "Belum ada laporan yang masuk."
                  : `Tidak ada laporan dengan status ${filterStatus}.`}
              </p>
            </Card>
          ) : (
            filteredReports.map((report) => (
              <Card
                key={report.id}
                className="p-6 bg-card border-2 border-border hover:border-primary transition-colors cursor-pointer"
                onClick={() => navigate(`/konfirmasi/${report.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg text-foreground">ID: {report.id}</h3>
                      {getStatusBadge(report.status)}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {report.nama}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(report.tanggal).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{report.alamat}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {report.deskripsi}
                  </p>
                </div>

                {report.images && report.images.length > 0 && (
                  <div className="mt-4 flex gap-2">
                    {report.images.slice(0, 4).map((img: string, idx: number) => (
                      <div
                        key={idx}
                        className="w-24 h-24 rounded-lg border border-border overflow-hidden"
                      >
                        <img
                          src={img}
                          alt={`Foto ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {report.images.length > 4 && (
                      <div className="w-24 h-24 rounded-lg border border-border bg-muted flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">
                          +{report.images.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
