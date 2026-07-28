import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search, MapPin, Calendar, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function LacakLaporan() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);

    // Get reports from localStorage
    const reports = JSON.parse(localStorage.getItem("reports") || "[]");
    
    // Search by ID, nama, email, or telepon
    const results = reports.filter((report: any) => {
      const query = searchQuery.toLowerCase();
      return (
        report.id.toLowerCase().includes(query) ||
        report.nama.toLowerCase().includes(query) ||
        report.email.toLowerCase().includes(query) ||
        report.telepon.includes(query)
      );
    });

    setSearchResults(results);
  };

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

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-3xl text-primary mb-2">Lacak Laporan</h1>
          <p className="text-muted-foreground">
            Cari laporan Anda menggunakan ID laporan, nama, email, atau nomor telepon
          </p>
        </div>

        {/* Search Form */}
        <Card className="p-6 bg-card border-2 border-border mb-8">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Masukkan ID Laporan, Nama, Email, atau No. Telepon"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Search className="w-5 h-5 mr-2" />
              Cari
            </Button>
          </form>
        </Card>

        {/* Results */}
        {hasSearched && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg text-foreground">
                Hasil Pencarian ({searchResults.length})
              </h3>
            </div>

            {searchResults.length === 0 ? (
              <Card className="p-12 bg-card border-2 border-border text-center">
                <AlertCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg text-foreground mb-2">Laporan Tidak Ditemukan</h3>
                <p className="text-sm text-muted-foreground">
                  Tidak ada laporan yang cocok dengan pencarian Anda.
                  <br />
                  Periksa kembali ID laporan atau informasi yang Anda masukkan.
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {searchResults.map((report) => (
                  <Card
                    key={report.id}
                    className="p-6 bg-card border-2 border-border hover:border-primary transition-colors cursor-pointer"
                    onClick={() => navigate(`/konfirmasi/${report.id}`)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg text-foreground">ID: {report.id}</h3>
                          {getStatusBadge(report.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Pelapor: {report.nama}
                        </p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(report.tanggal).toLocaleDateString("id-ID")}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{report.alamat}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {report.deskripsi}
                      </p>
                    </div>

                    {report.images && report.images.length > 0 && (
                      <div className="mt-4 flex gap-2">
                        {report.images.slice(0, 3).map((img: string, idx: number) => (
                          <div
                            key={idx}
                            className="w-20 h-20 rounded-lg border border-border overflow-hidden"
                          >
                            <img
                              src={img}
                              alt={`Foto ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {!hasSearched && (
          <Card className="p-12 bg-card border-2 border-border text-center">
            <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg text-foreground mb-2">Mulai Pencarian</h3>
            <p className="text-sm text-muted-foreground">
              Masukkan ID laporan, nama, email, atau nomor telepon Anda
              <br />
              untuk menemukan laporan yang pernah Anda buat.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
