import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Upload, X, Camera } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card } from "../components/ui/card";
import { MapPicker } from "../components/MapPicker";

export function Pelaporan() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
    deskripsi: "",
    location: { lat: -6.2088, lng: 106.8456, address: "" },
  });
  const [images, setImages] = useState<{ id: string; preview: string; file?: File }[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file),
      file,
    }));

    setImages((prev) => [...prev, ...newImages].slice(0, 3)); // Max 3 images
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate saving report
    const reportId = `RPT${Date.now()}`;
    const report = {
      id: reportId,
      ...formData,
      images: images.map(img => img.preview),
      status: "pending",
      tanggal: new Date().toISOString(),
    };
    
    // Save to localStorage
    const existingReports = JSON.parse(localStorage.getItem("reports") || "[]");
    localStorage.setItem("reports", JSON.stringify([report, ...existingReports]));
    
    // Navigate to confirmation
    navigate(`/konfirmasi/${reportId}`);
  };

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
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
          <h1 className="text-3xl text-primary mb-2">Laporan Jalan Rusak</h1>
          <p className="text-muted-foreground">
            Isi formulir di bawah untuk melaporkan kondisi jalan rusak
          </p>
        </div>

        {/* Form */}
        <Card className="p-6 bg-card border-2 border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="text-lg text-foreground">Data Pelapor</h3>
              
              <div>
                <label className="text-sm text-foreground">Nama</label>
                <Input
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Nama lengkap Anda"
                  className="mt-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="text-sm text-foreground">Email</label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  className="mt-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="text-sm text-foreground">Nomor Telepon</label>
                <Input
                  required
                  type="tel"
                  value={formData.telepon}
                  onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                  placeholder="08xx-xxxx-xxxx"
                  className="mt-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-lg text-foreground">Lokasi & Detail</h3>
              
              <MapPicker
                onLocationSelect={(location) =>
                  setFormData({ ...formData, location })
                }
              />

              <div>
                <label className="text-sm text-foreground">Alamat Detail</label>
                <Textarea
                  required
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  placeholder="Jl. Nama Jalan, No. Rumah/Patokan, Kelurahan, Kecamatan"
                  className="mt-1 bg-input border-border text-foreground placeholder:text-muted-foreground min-h-20"
                />
              </div>

              <div>
                <label className="text-sm text-foreground">Deskripsi Kerusakan</label>
                <Textarea
                  required
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  placeholder="Jelaskan kondisi kerusakan jalan (misalnya: lubang besar, aspal retak, dll)"
                  className="mt-1 bg-input border-border text-foreground placeholder:text-muted-foreground min-h-24"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <h3 className="text-lg text-foreground">Foto Kerusakan</h3>
              <p className="text-sm text-muted-foreground">
                Upload maksimal 3 foto (Opsional)
              </p>

              <div className="grid grid-cols-3 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="relative aspect-square">
                    <img
                      src={image.preview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg border-2 border-border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-2 -right-2 p-1 bg-destructive rounded-full text-destructive-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {images.length < 3 && (
                  <label className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                    <span className="text-xs text-muted-foreground">Upload Foto</span>
                  </label>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
                className="flex-1 border-border text-foreground hover:bg-muted"
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Kirim Laporan
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
