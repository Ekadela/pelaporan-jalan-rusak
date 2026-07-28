import { useState } from "react";
import { useNavigate } from "react-router";
import { Star, MessageSquare, ThumbsUp, Send, ArrowLeft } from "lucide-react";
import { Card } from "../components/ui/card";

export function Rating() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const [selectedAspects, setSelectedAspects] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const aspects = [
    "Mudah Digunakan",
    "Responsif Cepat",
    "Tampilan Menarik",
    "Fitur Lengkap",
    "Navigasi Jelas",
    "Informasi Akurat",
  ];

  const handleAspectToggle = (aspect: string) => {
    setSelectedAspects((prev) =>
      prev.includes(aspect)
        ? prev.filter((a) => a !== aspect)
        : [...prev, aspect]
    );
  };

  const handleSubmit = () => {
    if (rating > 0) {
      // Simulasi submit rating
      setSubmitted(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Beranda</span>
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <Star className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl text-foreground mb-2">
                Beri Kami Nilai
              </h1>
              <p className="text-muted-foreground">
                Bagaimana pengalaman Anda menggunakan sistem pelaporan TERRAVIA?
              </p>
            </div>

            {/* Rating Stars */}
            <Card className="p-8 border-2 border-border bg-card mb-6">
              <h3 className="text-lg text-foreground mb-4 text-center">
                Berikan Rating Anda
              </h3>
              <div className="flex justify-center gap-3 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-12 h-12 md:w-14 md:h-14 ${
                        star <= (hoveredRating || rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-center text-sm text-primary mt-2">
                  {rating === 5 && "Sempurna! ⭐⭐⭐⭐⭐"}
                  {rating === 4 && "Sangat Baik! ⭐⭐⭐⭐"}
                  {rating === 3 && "Baik! ⭐⭐⭐"}
                  {rating === 2 && "Cukup ⭐⭐"}
                  {rating === 1 && "Perlu Perbaikan ⭐"}
                </p>
              )}
            </Card>

            {/* Aspects */}
            <Card className="p-6 border-2 border-border bg-card mb-6">
              <div className="flex items-center gap-2 mb-4">
                <ThumbsUp className="w-5 h-5 text-primary" />
                <h3 className="text-lg text-foreground">
                  Apa yang Anda Suka? (Opsional)
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {aspects.map((aspect) => (
                  <button
                    key={aspect}
                    onClick={() => handleAspectToggle(aspect)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      selectedAspects.includes(aspect)
                        ? "bg-primary text-background"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {aspect}
                  </button>
                ))}
              </div>
            </Card>

            {/* Review Text */}
            <Card className="p-6 border-2 border-border bg-card mb-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h3 className="text-lg text-foreground">
                  Tulis Ulasan Anda (Opsional)
                </h3>
              </div>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Ceritakan pengalaman Anda menggunakan TERRAVIA..."
                className="w-full h-32 p-4 rounded-lg bg-background border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {review.length} / 500 karakter
              </p>
            </Card>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className={`w-full py-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                rating > 0
                  ? "bg-primary text-background hover:bg-primary/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              <Send className="w-5 h-5" />
              <span className="text-lg">
                {rating > 0 ? "Kirim Penilaian" : "Pilih Rating Terlebih Dahulu"}
              </span>
            </button>
          </>
        ) : (
          /* Success Message */
          <Card className="p-12 border-2 border-primary bg-card text-center">
            <div className="mb-6">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-primary fill-primary" />
              </div>
              <h2 className="text-2xl text-foreground mb-2">
                Terima Kasih! 🎉
              </h2>
              <p className="text-muted-foreground">
                Penilaian Anda sangat berarti untuk kami
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Mengalihkan ke beranda...
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
