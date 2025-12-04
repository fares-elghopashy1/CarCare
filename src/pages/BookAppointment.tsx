import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Check,
  AlertCircle,
  Truck,
  CreditCard,
} from "lucide-react";
import serviceCenter from "@/assets/service-center.jpg";

const serviceCenters = [
  { id: 1, name: "Downtown AutoCare Center", address: "123 Main Street, City Center" },
  { id: 2, name: "Westside Service Hub", address: "456 West Avenue, Westside" },
  { id: 3, name: "Eastside Premium Garage", address: "789 East Road, Eastside" },
  { id: 4, name: "North Point Service", address: "321 North Boulevard, Northside" },
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM",
];

const BookAppointment = () => {
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [slotAvailable, setSlotAvailable] = useState<boolean | null>(null);
  const [step, setStep] = useState(1);

  const handleCheckSlot = () => {
    // Simulate slot availability check
    const available = Math.random() > 0.3;
    setSlotAvailable(available);
  };

  const handleProceed = () => {
    if (slotAvailable) {
      setStep(3);
    } else {
      setStep(4);
    }
  };

  const canCheckSlot = selectedCenter && selectedDate && selectedTime;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Book Your Service Appointment
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose your preferred service center, date, and time. We'll take care of the rest.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Select Service Center */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                    1
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Select Service Center</h2>
                    <p className="text-sm text-muted-foreground">Choose your preferred location</p>
                  </div>
                </div>

                <div className="grid gap-3">
                  {serviceCenters.map((center) => (
                    <button
                      key={center.id}
                      onClick={() => setSelectedCenter(center.id)}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                        selectedCenter === center.id
                          ? "border-primary bg-primary/5 shadow-soft"
                          : "border-border hover:border-primary/30 hover:bg-secondary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-foreground">{center.name}</div>
                          <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {center.address}
                          </div>
                        </div>
                        {selectedCenter === center.id && (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Step 2: Select Date & Time */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                    2
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Select Date & Time</h2>
                    <p className="text-sm text-muted-foreground">Pick an available slot</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      Select Date
                    </label>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setSlotAvailable(null);
                      }}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Select Time
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => {
                            setSelectedTime(time);
                            setSlotAvailable(null);
                          }}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                            selectedTime === time
                              ? "bg-primary text-white"
                              : "bg-secondary text-foreground hover:bg-primary/10"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleCheckSlot}
                    disabled={!canCheckSlot}
                    variant="outline"
                    className="flex-1"
                  >
                    Check Availability
                  </Button>
                </div>

                {slotAvailable !== null && (
                  <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
                    slotAvailable
                      ? "bg-green-50 border border-green-200"
                      : "bg-amber-50 border border-amber-200"
                  }`}>
                    {slotAvailable ? (
                      <>
                        <Check className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-medium text-green-800">Slot Available!</div>
                          <div className="text-sm text-green-600">You can proceed to payment.</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                        <div>
                          <div className="font-medium text-amber-800">Slot Not Available</div>
                          <div className="text-sm text-amber-600">Try another time or use our pickup service.</div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </Card>

              {/* Step 3: Action */}
              {slotAvailable !== null && (
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                      3
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">
                        {slotAvailable ? "Proceed to Payment" : "Alternative Options"}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {slotAvailable ? "Secure your appointment" : "We have other options for you"}
                      </p>
                    </div>
                  </div>

                  {slotAvailable ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-secondary/50 flex items-center justify-between">
                        <div>
                          <div className="font-medium text-foreground">Service Booking Fee</div>
                          <div className="text-sm text-muted-foreground">Fully refundable if cancelled 24h before</div>
                        </div>
                        <div className="text-2xl font-bold text-foreground">$25</div>
                      </div>
                      <Button variant="hero" className="w-full" size="lg">
                        <CreditCard className="w-5 h-5" />
                        Proceed to Payment
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Button variant="hero" className="w-full" size="lg" asChild>
                        <a href="/pickup">
                          <Truck className="w-5 h-5" />
                          Request Pickup Service
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        size="lg"
                        onClick={() => setSlotAvailable(null)}
                      >
                        Try Different Time
                      </Button>
                    </div>
                  )}
                </Card>
              )}
            </div>

            {/* Sidebar Image */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <img
                  src={serviceCenter}
                  alt="Service center"
                  className="w-full rounded-3xl shadow-elevated"
                />
                <Card className="mt-6 p-5">
                  <h3 className="font-semibold text-foreground mb-3">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our support team is available 24/7 to assist you with your booking.
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookAppointment;
