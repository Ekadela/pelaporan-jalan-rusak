import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, CheckCircle, MapPin, Calendar, User, Mail, Phone, Image as ImageIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function KonfirmasiLaporan() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    // Load report from localStorage
    const reports = JSON.parse(localStorage.getItem("reports") || "[]");
    const foundReport = reports.find((r: any) => r.id === id);
    setReport(foundReport);
  }, [id]);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      pending: { label: "Menunggu Verifikasi", className: "bg-secondary/20 text-secondary border-secondary" },
      verified: { label: "Terverifikasi", className: "bg-primary/20 text-primary border-primary" },
      in_progress: { label: "Dalam Proses Perbaikan", className: "bg-accent/20 text-accent border-accent" },
      completed: { label: "Selesai Diperbaiki", className: "bg-green-500/20 text-green-400 border-green-500" },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Badge variant="outline" className={`${config.className} text-sm px-3 py-1`}>
        {config.label}
      </Badge>
    );
  };

  if (!report) {
    return (
      <div className="min-h-screen p-6 md:p-12 flex items-center justify-center">
        <Card className="p-12 bg-card border-2 border-border text-center max-w-md">
          <h3 className="text-lg text-foreground mb-2">Laporan Tidak Ditemukan</h3>
          <p className="text-sm text-muted-foreground mb-6">
            ID Laporan yang Anda cari tidak ditemukan.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Kembali ke Beranda
          </Button>
        </Card>
      </div>
    );
  }

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
        </div>

        {/* Success Message */}
        <Card className="p-8 bg-card border-2 border-primary mb-6 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="text-2xl text-primary mb-2">Laporan Berhasil Dikirim!</h1>
          <p className="text-muted-foreground mb-4">
            Terima kasih telah melaporkan kondisi jalan rusak. Laporan Anda akan segera kami
            tindaklanjuti.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">ID Laporan:</span>
            <span className="text-lg text-primary">{report.id}</span>
          </div>
        </Card>

        {/* Report Details */}
        <Card className="p-6 bg-card border-2 border-border">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-foreground">Detail Laporan</h2>
              {getStatusBadge(report.status)}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              Dilaporkan pada {new Date(report.tanggal).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>

          {/* Reporter Info */}
          <div className="mb-6 p-4 bg-muted/50 rounded-lg">
            <h3 className="text-sm text-foreground mb-3">Data Pelapor</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-primary" />
                <span className="text-foreground">{report.nama}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-foreground">{report.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-foreground">{report.telepon}</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h3 className="text-sm text-foreground mb-2">Lokasi Kerusakan</h3>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
              <p className="text-foreground">{report.alamat}</p>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Koordinat: {report.location.lat.toFixed(4)}, {report.location.lng.toFixed(4)}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm text-foreground mb-2">Deskripsi Kerusakan</h3>
            <p className="text-sm text-foreground leading-relaxed">
              {report.deskripsi}
            </p>
          </div>

          {/* Images */}
          {report.images && report.images.length > 0 && (
            <div>
              <h3 className="text-sm text-foreground mb-3 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" />
                Foto Kerusakan ({report.images.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {report.images.map((img: string, idx: number) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-lg border-2 border-border overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`Foto ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <Button
            onClick={() => navigate("/lacak-laporan")}
            variant="outline"
            className="flex-1 border-border text-foreground hover:bg-muted"
          >
            Lacak Laporan Lain
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Kembali ke Beranda
          </Button>
        </div>

        {/* Info Box */}
        <Card className="mt-6 p-4 bg-muted/50 border-2 border-border">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Catatan:</strong> Simpan ID Laporan Anda untuk
            melacak status perbaikan jalan. Anda akan menerima notifikasi melalui email jika
            ada pembaruan status laporan.
          </p>
        </Card>
      </div>
    </div>
  );
}
