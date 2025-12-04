import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ClipboardList,
  Check,
  Clock,
  Wrench,
  FileText,
  Download,
  Bell,
  Truck,
  Car,
  Calendar,
  ChevronRight,
  Package,
} from "lucide-react";

interface Appointment {
  id: string;
  carModel: string;
  serviceType: string;
  date: string;
  status: "pending" | "in-progress" | "completed";
  progress: number;
  technician: string;
  notes: string;
  spareParts: { name: string; quantity: number }[];
  hasPickup: boolean;
}

const mockAppointments: Appointment[] = [
  {
    id: "APT-001",
    carModel: "BMW 3 Series 2023",
    serviceType: "Full Service & Oil Change",
    date: "Dec 4, 2024",
    status: "in-progress",
    progress: 65,
    technician: "John Smith",
    notes: "Replacing oil filter and checking brake pads. Engine running smoothly.",
    spareParts: [
      { name: "Oil Filter", quantity: 1 },
      { name: "Engine Oil 5W-30", quantity: 5 },
    ],
    hasPickup: true,
  },
  {
    id: "APT-002",
    carModel: "Mercedes C-Class 2022",
    serviceType: "Brake Pad Replacement",
    date: "Nov 28, 2024",
    status: "completed",
    progress: 100,
    technician: "Mike Johnson",
    notes: "Front and rear brake pads replaced. Test drive completed successfully.",
    spareParts: [
      { name: "Front Brake Pads", quantity: 2 },
      { name: "Rear Brake Pads", quantity: 2 },
    ],
    hasPickup: false,
  },
  {
    id: "APT-003",
    carModel: "Audi A4 2021",
    serviceType: "Engine Diagnostics",
    date: "Dec 10, 2024",
    status: "pending",
    progress: 0,
    technician: "TBD",
    notes: "",
    spareParts: [],
    hasPickup: true,
  },
];

const RepairProgress = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(
    mockAppointments[0]
  );

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
    }
  };

  const getStatusLabel = (status: Appointment["status"]) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
    }
  };

  const progressSteps = [
    { label: "Received", icon: Car },
    { label: "Inspection", icon: ClipboardList },
    { label: "Service", icon: Wrench },
    { label: "Quality Check", icon: Check },
    { label: "Ready", icon: Bell },
  ];

  const getActiveStep = (progress: number) => {
    if (progress === 0) return 0;
    if (progress < 25) return 1;
    if (progress < 50) return 2;
    if (progress < 75) return 3;
    if (progress < 100) return 4;
    return 5;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Service Reports & Progress
            </h1>
            <p className="text-muted-foreground text-lg">
              Track your repair status and view detailed service reports.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Appointments List */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Your Appointments</h2>
              {mockAppointments.map((appointment) => (
                <Card
                  key={appointment.id}
                  className={`p-4 cursor-pointer transition-all duration-200 ${
                    selectedAppointment?.id === appointment.id
                      ? "border-primary shadow-glow"
                      : "hover:border-primary/30"
                  }`}
                  onClick={() => setSelectedAppointment(appointment)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-medium text-foreground">{appointment.carModel}</div>
                      <div className="text-sm text-muted-foreground">{appointment.serviceType}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(appointment.status)}`}>
                      {getStatusLabel(appointment.status)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {appointment.id}
                    </div>
                  </div>
                  {appointment.status === "in-progress" && (
                    <div className="mt-3">
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                          style={{ width: `${appointment.progress}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{appointment.progress}% complete</div>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Appointment Details */}
            <div className="lg:col-span-2 space-y-6">
              {selectedAppointment ? (
                <>
                  {/* Progress Tracker */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-6">Progress Tracker</h3>
                    <div className="flex items-center justify-between mb-8">
                      {progressSteps.map((step, index) => {
                        const isActive = index < getActiveStep(selectedAppointment.progress);
                        const isCurrent = index === getActiveStep(selectedAppointment.progress) - 1;
                        return (
                          <div key={index} className="flex flex-col items-center relative flex-1">
                            {index < progressSteps.length - 1 && (
                              <div
                                className={`absolute top-5 left-1/2 w-full h-0.5 ${
                                  isActive ? "bg-primary" : "bg-border"
                                }`}
                              />
                            )}
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center z-10 transition-all duration-300 ${
                                isActive
                                  ? "bg-gradient-to-br from-primary to-accent text-white shadow-glow"
                                  : "bg-secondary text-muted-foreground"
                              } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                            >
                              <step.icon className="w-5 h-5" />
                            </div>
                            <span className={`text-xs mt-2 ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    
                    {selectedAppointment.status === "in-progress" && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-blue-800">Service In Progress</div>
                          <div className="text-sm text-blue-600">Estimated completion: Today, 5:00 PM</div>
                        </div>
                      </div>
                    )}
                  </Card>

                  {/* Technician Notes */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Technician Notes</h3>
                    {selectedAppointment.technician !== "TBD" ? (
                      <>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                            {selectedAppointment.technician.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{selectedAppointment.technician}</div>
                            <div className="text-sm text-muted-foreground">Lead Technician</div>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm bg-secondary/50 rounded-xl p-4">
                          {selectedAppointment.notes || "No notes yet."}
                        </p>
                      </>
                    ) : (
                      <p className="text-muted-foreground text-sm">Technician will be assigned soon.</p>
                    )}
                  </Card>

                  {/* Spare Parts */}
                  {selectedAppointment.spareParts.length > 0 && (
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Spare Parts Used</h3>
                      <div className="space-y-3">
                        {selectedAppointment.spareParts.map((part, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Package className="w-5 h-5 text-primary" />
                              </div>
                              <span className="text-foreground">{part.name}</span>
                            </div>
                            <span className="text-muted-foreground">x{part.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Actions */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Actions</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {selectedAppointment.status === "completed" && (
                        <>
                          <Button variant="hero" size="lg">
                            <Download className="w-5 h-5" />
                            Download Report
                          </Button>
                          <Button variant="outline" size="lg">
                            <Bell className="w-5 h-5" />
                            Request Invoice
                          </Button>
                        </>
                      )}
                      {selectedAppointment.hasPickup && selectedAppointment.status === "completed" && (
                        <Button variant="glass" size="lg" className="sm:col-span-2">
                          <Truck className="w-5 h-5" />
                          Driver Returning Vehicle
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      )}
                      {selectedAppointment.status === "pending" && (
                        <Button variant="outline" size="lg" className="sm:col-span-2">
                          <Calendar className="w-5 h-5" />
                          Reschedule Appointment
                        </Button>
                      )}
                    </div>
                  </Card>
                </>
              ) : (
                <Card className="p-8 text-center">
                  <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Select an Appointment
                  </h3>
                  <p className="text-muted-foreground">
                    Choose an appointment from the list to view details.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RepairProgress;
