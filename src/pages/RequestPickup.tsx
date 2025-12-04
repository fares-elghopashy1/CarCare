import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Truck,
  MapPin,
  Calendar,
  Clock,
  Car,
  User,
  Phone,
  Bell,
  Check,
  Navigation,
} from "lucide-react";
import driverService from "@/assets/driver-service.jpg";

const RequestPickup = () => {
  const [needDriver, setNeedDriver] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    location: "",
    date: "",
    time: "",
    carModel: "",
    phone: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Request Pickup & Delivery
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Can't come to us? No problem. Our professional drivers will pick up and deliver your car.
            </p>
          </div>

          {/* Driver Question */}
          {needDriver === null && !submitted && (
            <Card className="max-w-2xl mx-auto p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
                <Truck className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Do you need a driver to pick up your car?
              </h2>
              <p className="text-muted-foreground mb-8">
                Our certified drivers can pick up your car from any location and deliver it back when the service is complete.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" onClick={() => setNeedDriver(true)}>
                  Yes, Send a Driver
                </Button>
                <Button variant="outline" size="lg" onClick={() => setNeedDriver(false)}>
                  No, I'll Drop It Off
                </Button>
              </div>
            </Card>
          )}

          {/* Pickup Form */}
          {needDriver === true && !submitted && (
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Pickup Details</h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      Pickup Location
                    </label>
                    <Input
                      placeholder="Enter your address"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        Pickup Date
                      </label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        Pickup Time
                      </label>
                      <Input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Car className="w-4 h-4 text-primary" />
                      Car Model
                    </label>
                    <Input
                      placeholder="e.g., BMW 3 Series 2023"
                      value={formData.carModel}
                      onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      Contact Phone
                    </label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Special Notes (Optional)
                    </label>
                    <textarea
                      className="flex w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary resize-none"
                      rows={3}
                      placeholder="Any specific instructions for the driver..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>

                  <Button type="submit" variant="hero" className="w-full" size="lg">
                    <Truck className="w-5 h-5" />
                    Request Pickup
                  </Button>
                </form>
              </Card>

              {/* Driver Info & Map */}
              <div className="space-y-6">
                <Card className="overflow-hidden">
                  <img
                    src={driverService}
                    alt="Professional driver"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Professional Driver Service
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      All our drivers are certified, insured, and trained to handle premium vehicles with care.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary" />
                        Insured Drivers
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary" />
                        GPS Tracked
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary" />
                        Real-time Updates
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary" />
                        24/7 Support
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Simulated Map */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Navigation className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Nearest Service Center</h3>
                      <p className="text-sm text-muted-foreground">2.4 miles away</p>
                    </div>
                  </div>
                  <div className="w-full h-48 rounded-xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Map view will appear here</p>
                    </div>
                  </div>
                </Card>

                {/* Notifications */}
                <Card className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Bell className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Stay Notified</h3>
                      <p className="text-sm text-muted-foreground">
                        You'll receive SMS & email updates at every step
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Drop-off Info */}
          {needDriver === false && !submitted && (
            <Card className="max-w-2xl mx-auto p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
                <Car className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Drop Off Your Car
              </h2>
              <p className="text-muted-foreground mb-6">
                Visit any of our service centers during business hours. No appointment needed for drop-off.
              </p>
              <Button variant="hero" size="lg" asChild>
                <a href="/book-appointment">
                  Book Service Appointment
                </a>
              </Button>
              <button
                onClick={() => setNeedDriver(null)}
                className="block mx-auto mt-4 text-sm text-primary hover:underline"
              >
                ← Go back
              </button>
            </Card>
          )}

          {/* Success State */}
          {submitted && (
            <Card className="max-w-2xl mx-auto p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Pickup Request Submitted!
              </h2>
              <p className="text-muted-foreground mb-6">
                We've received your request. A driver will be assigned shortly and you'll receive a confirmation message.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <a href="/reports">
                    Track Status
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/">
                    Back to Home
                  </a>
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RequestPickup;
