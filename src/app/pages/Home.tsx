import { useNavigate } from "react-router";
import { FileText, MapPin, Search, Inbox, FileCheck, Clock, Star, TrendingUp, MessageSquare } from "lucide-react";
import { Card } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Home() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Laporkan Keluhan Anda",
      icon: FileText,
      description: "Laporkan jalan rusak",
      path: "/pelaporan",
    },
    {
      title: "Lacak Laporan Anda",
      icon: MapPin,
      description: "Cek status laporan Anda",
      path: "/lacak-laporan",
    },
    {
      title: "Lihat Laporan Masuk",
      icon: Inbox,
      description: "Lihat semua laporan masuk",
      path: "/laporan-masuk",
    },
  ];

  // Data laporan terkini
  const recentReports = [
    {
      id: "RPT001",
      title: "Jalan Berlubang di Jl. Sudirman",
      location: "Jl. Sudirman No. 45, Jakarta Pusat",
      time: "2 jam yang lalu",
      status: "Laporan Terkirim",
      priority: 85,
      mapImage: "https://images.unsplash.com/photo-1669508886393-d3ec02f4a330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBtYXAlMjBsb2NhdGlvbiUyMHBpbnxlbnwxfHx8fDE3NzMzNzk4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      roadImage: "https://images.unsplash.com/photo-1658223684971-f262da87168f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW1hZ2VkJTIwcm9hZCUyMHBvdGhvbGV8ZW58MXx8fHwxNzczMzc4OTg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      coordinates: { lat: -6.2088, lng: 106.8229 },
    },
    {
      id: "RPT002",
      title: "Aspal Retak di Jl. Gatot Subroto",
      location: "Jl. Gatot Subroto KM 5, Jakarta Selatan",
      time: "5 jam yang lalu",
      status: "Laporan Sedang Ditinjau dan Diproses",
      priority: 65,
      mapImage: "https://images.unsplash.com/photo-1759802524049-2421ddaee0fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbWFwJTIwbmF2aWdhdGlvbnxlbnwxfHx8fDE3NzMzNDA0NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      roadImage: "https://images.unsplash.com/photo-1742036953039-74d4e60fad42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFja2VkJTIwYXNwaGFsdCUyMHN0cmVldHxlbnwxfHx8fDE3NzMzODA2NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      coordinates: { lat: -6.2297, lng: 106.8039 },
    },
    {
      id: "RPT003",
      title: "Jalan Amblas di Jl. Thamrin",
      location: "Jl. M.H. Thamrin, Jakarta Pusat",
      time: "1 hari yang lalu",
      status: "Jalan Telah Diperbaiki",
      priority: 95,
      mapImage: "https://images.unsplash.com/photo-1669508886393-d3ec02f4a330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBtYXAlMjBsb2NhdGlvbiUyMHBpbnxlbnwxfHx8fDE3NzMzNzk4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      roadImage: "https://images.unsplash.com/photo-1575292005386-1d2ba352777d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9rZW4lMjBwYXZlbWVudCUyMHJvYWR8ZW58MXx8fHwxNzczMzgwNjUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      coordinates: { lat: -6.1944, lng: 106.8229 },
    },
  ];

  // Data rating statistics
  const ratingStats = {
    average: 4.5,
    total: 1247,
    distribution: [
      { stars: 5, count: 856, percentage: 69 },
      { stars: 4, count: 248, percentage: 20 },
      { stars: 3, count: 87, percentage: 7 },
      { stars: 2, count: 31, percentage: 2 },
      { stars: 1, count: 25, percentage: 2 },
    ],
  };

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl text-primary">TERRAVIA</h1>
          </div>
          <p className="text-lg text-foreground/80">
            Platform monitoring dan pelaporan kerusakan permukaaan jalan
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Laporkan kondisi jalan rusak di sekitar Anda untuk tindakan perbaikan yang lebih cepat
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className={`p-6 cursor-pointer transition-all hover:scale-105 hover:border-primary bg-card border-2 border-border ${
                  index === 0 ? 'md:col-span-2' : ''
                }`}
                onClick={() => navigate(item.path)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl mb-2 text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Dengan melaporkan, Anda berkontribusi untuk infrastruktur yang lebih baik
          </p>
        </div>

        {/* Laporan Terkini */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-6 h-6 text-primary" />
            <h2 className="text-2xl text-foreground">Laporan Terkini</h2>
          </div>
          
          {/* Container dengan scroll */}
          <Card className="border-2 border-border bg-card p-4">
            <div className="max-h-[600px] overflow-y-auto pr-2 space-y-4">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 border-2 border-border bg-background rounded-lg hover:border-primary transition-colors cursor-pointer"
                  onClick={() => navigate('/lacak-laporan')}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Images Section */}
                    <div className="flex-shrink-0">
                      <div className="flex gap-3 mb-2">
                        {/* Map Image */}
                        <div className="w-32 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <ImageWithFallback
                            src={report.mapImage}
                            alt="Peta Lokasi"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Road Image */}
                        <div className="w-32 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <ImageWithFallback
                            src={report.roadImage}
                            alt="Kondisi Jalan"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      {/* Koordinat Geografis */}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                        <MapPin className="w-3 h-3 text-primary" />
                        <span className="text-primary">
                          {report.coordinates.lat.toFixed(4)}, {report.coordinates.lng.toFixed(4)}
                        </span>
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono text-primary">
                            {report.id}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              report.status === 'Jalan Telah Diperbaiki'
                                ? 'bg-green-500/20 text-green-500'
                                : report.status === 'Laporan Sedang Ditinjau dan Diproses'
                                ? 'bg-yellow-500/20 text-yellow-500'
                                : report.status === 'Jalan Tidak Perlu Perbaikan'
                                ? 'bg-blue-500/20 text-blue-500'
                                : 'bg-muted-foreground/20 text-muted-foreground'
                            }`}
                          >
                            {report.status}
                          </span>
                        </div>
                        
                        {/* Skala Prioritas */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Prioritas</span>
                            <span className="text-xs font-mono text-primary">{report.priority}%</span>
                          </div>
                          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                report.priority >= 80
                                  ? 'bg-red-500'
                                  : report.priority >= 60
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                              }`}
                              style={{ width: `${report.priority}%` }}
                            />
                          </div>
                        </div>
                        
                        <h3 className="text-lg text-foreground mb-1">
                          {report.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          <MapPin className="w-3 h-3 inline mr-1" />
                          {report.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{report.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Tombol Beri Nilai */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate('/rating')}
            className="px-6 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-lg flex items-center gap-2 transition-all hover:scale-105"
          >
            <Star className="w-5 h-5 text-primary" />
            <span>Beri Kami Nilai</span>
          </button>
        </div>

        {/* Ringkasan Rating & Reviews */}
        <div className="mt-12 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-6 h-6 text-primary" />
            <h2 className="text-2xl text-foreground">Rating & Reviews</h2>
          </div>
          <Card className="p-6 border-2 border-border bg-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Summary */}
              <div className="text-center md:border-r border-border">
                <div className="text-5xl font-bold text-primary mb-2">
                  {ratingStats.average}
                </div>
                <div className="flex justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.floor(ratingStats.average)
                          ? 'fill-primary text-primary'
                          : star - 0.5 <= ratingStats.average
                          ? 'fill-primary/50 text-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Berdasarkan {ratingStats.total.toLocaleString('id-ID')} penilaian
                </p>
              </div>

              {/* Distribution */}
              <div className="space-y-2">
                {ratingStats.distribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12">
                      <span className="text-sm text-foreground">{item.stars}</span>
                      <Star className="w-3 h-3 fill-primary text-primary" />
                    </div>
                    <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-12 text-right">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}