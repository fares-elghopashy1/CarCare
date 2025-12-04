import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Calendar,
  Truck,
  Package,
  Sparkles,
  Car,
} from "lucide-react";

interface Message {
  id: number;
  type: "user" | "bot";
  content: string;
  actions?: { label: string; icon: React.ReactNode; href: string }[];
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm your AI Car Assistant. Tell me about your car and any issues you're experiencing, and I'll help diagnose the problem and suggest solutions.",
    },
  ]);
  const [input, setInput] = useState("");
  const [carModel, setCarModel] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const diagnoses: Record<string, { diagnosis: string; actions: Message["actions"] }> = {
    "engine": {
      diagnosis: "Based on your description, this could indicate several issues:\n\n• **Low oil level** - Check your oil dipstick\n• **Worn spark plugs** - May need replacement if over 30k miles\n• **Fuel injector issues** - Could require professional cleaning\n\nI recommend scheduling a diagnostic appointment for a thorough check.",
      actions: [
        { label: "Book Appointment", icon: <Calendar className="w-4 h-4" />, href: "/book-appointment" },
        { label: "Request Driver", icon: <Truck className="w-4 h-4" />, href: "/pickup" },
      ],
    },
    "brake": {
      diagnosis: "Your brake symptoms suggest:\n\n• **Worn brake pads** - Most common cause of squeaking\n• **Warped rotors** - If you feel pulsing when braking\n• **Low brake fluid** - Check your fluid reservoir\n\n⚠️ Brake issues are safety-critical. I strongly recommend immediate inspection.",
      actions: [
        { label: "Book Urgent Service", icon: <Calendar className="w-4 h-4" />, href: "/book-appointment" },
        { label: "Request Pickup", icon: <Truck className="w-4 h-4" />, href: "/pickup" },
      ],
    },
    "battery": {
      diagnosis: "Your symptoms point to battery or charging system issues:\n\n• **Weak battery** - Average lifespan is 3-5 years\n• **Alternator problems** - Not charging the battery properly\n• **Corroded terminals** - Can prevent proper connection\n\nWe can test your battery and charging system quickly.",
      actions: [
        { label: "Book Appointment", icon: <Calendar className="w-4 h-4" />, href: "/book-appointment" },
        { label: "Order New Battery", icon: <Package className="w-4 h-4" />, href: "#" },
      ],
    },
    "default": {
      diagnosis: "Thank you for describing your issue. Based on the information provided, I recommend having a professional technician inspect your vehicle for a thorough diagnosis.\n\nWould you like to:\n• Schedule a service appointment\n• Have us pick up your car\n• Order any specific parts",
      actions: [
        { label: "Book Appointment", icon: <Calendar className="w-4 h-4" />, href: "/book-appointment" },
        { label: "Request Driver", icon: <Truck className="w-4 h-4" />, href: "/pickup" },
        { label: "Order Parts", icon: <Package className="w-4 h-4" />, href: "#" },
      ],
    },
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const lowerInput = input.toLowerCase();
    let response = diagnoses["default"];

    if (lowerInput.includes("engine") || lowerInput.includes("rough") || lowerInput.includes("noise") || lowerInput.includes("starting")) {
      response = diagnoses["engine"];
    } else if (lowerInput.includes("brake") || lowerInput.includes("squeak") || lowerInput.includes("stop")) {
      response = diagnoses["brake"];
    } else if (lowerInput.includes("battery") || lowerInput.includes("start") || lowerInput.includes("dead") || lowerInput.includes("charge")) {
      response = diagnoses["battery"];
    }

    const botMessage: Message = {
      id: messages.length + 2,
      type: "bot",
      content: response.diagnosis,
      actions: response.actions,
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-4 flex flex-col">
        <div className="container mx-auto px-4 lg:px-8 flex-1 flex flex-col max-w-4xl">
          {/* Header */}
          <div className="py-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 animate-float">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              AI Car Assistant
            </h1>
            <p className="text-muted-foreground">
              Describe your car issue and get instant diagnosis
            </p>
          </div>

          {/* Car Model Input */}
          {!carModel && (
            <Card className="p-4 mb-4">
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-primary" />
                <Input
                  placeholder="Enter your car model (e.g., BMW 3 Series 2023)"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && carModel) {
                      setMessages((prev) => [
                        ...prev,
                        {
                          id: prev.length + 1,
                          type: "bot",
                          content: `Great! I've noted that you have a ${carModel}. Now, please describe the issue you're experiencing with your vehicle.`,
                        },
                      ]);
                    }
                  }}
                />
                <Button
                  variant="hero"
                  size="sm"
                  onClick={() => {
                    if (carModel) {
                      setMessages((prev) => [
                        ...prev,
                        {
                          id: prev.length + 1,
                          type: "bot",
                          content: `Great! I've noted that you have a ${carModel}. Now, please describe the issue you're experiencing with your vehicle.`,
                        },
                      ]);
                    }
                  }}
                >
                  Set Car
                </Button>
              </div>
            </Card>
          )}

          {carModel && (
            <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
              <Car className="w-4 h-4 text-primary" />
              <span>Vehicle: <strong className="text-foreground">{carModel}</strong></span>
              <button
                onClick={() => setCarModel("")}
                className="text-primary hover:underline ml-2"
              >
                Change
              </button>
            </div>
          )}

          {/* Chat Messages */}
          <Card className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.type === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      message.type === "user"
                        ? "bg-primary"
                        : "bg-gradient-to-br from-primary to-accent"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Sparkles className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div
                    className={`flex-1 max-w-[80%] ${
                      message.type === "user" ? "text-right" : ""
                    }`}
                  >
                    <div
                      className={`inline-block p-4 rounded-2xl ${
                        message.type === "user"
                          ? "bg-primary text-white rounded-tr-md"
                          : "bg-secondary text-foreground rounded-tl-md"
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    </div>
                    {message.actions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.actions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <a href={action.href}>
                              {action.icon}
                              {action.label}
                            </a>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-secondary rounded-2xl rounded-tl-md p-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-3">
                <Input
                  placeholder="Describe your car issue..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isTyping}
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  variant="hero"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AIChatbot;
