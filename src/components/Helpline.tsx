import { Phone, MessageSquare, Users, Clock, MapPin, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HelplineProps {
  language: string;
}

export function Helpline({ language }: HelplineProps) {
  const translations = {
    en: {
      title: "Emergency Helpline & Support",
      subtitle: "Get immediate help from poultry experts",
      tollFree: "Toll-Free Helpline",
      smsAlerts: "SMS Alert Service",
      localVet: "Find Local Veterinarian", 
      emergency: "Emergency Contacts",
      callNow: "Call Now",
      sendSms: "Send SMS",
      findVet: "Find Vet",
      available24: "Available 24/7",
      freeService: "Free Service",
      multiLang: "Multi-language Support",
      emergencyTip: "In case of sudden bird deaths or disease outbreak, call immediately!"
    },
    hi: {
      title: "आपातकालीन हेल्पलाइन और सहायता",
      subtitle: "पोल्ट्री विशेषज्ञों से तुरंत सहायता प्राप्त करें",
      tollFree: "टॉल-फ्री हेल्पलाइन",
      smsAlerts: "SMS अलर्ट सेवा",
      localVet: "स्थानीय पशु चिकित्सक खोजें",
      emergency: "आपातकालीन संपर्क",
      callNow: "अभी कॉल करें",
      sendSms: "SMS भेजें",
      findVet: "पशु चिकित्सक खोजें",
      available24: "24/7 उपलब्ध",
      freeService: "निःशुल्क सेवा",
      multiLang: "बहुभाषी सहायता",
      emergencyTip: "अचानक पक्षियों की मृत्यु या बीमारी फैलने पर तुरंत कॉल करें!"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const handleCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleSMS = () => {
    window.open('sms:1800-123-4567?body=Need help with poultry health emergency', '_self');
  };

  return (
    <div className="space-y-6 p-4 pb-20">
      <div className="text-center bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl border border-red-200">
        <h1 className="text-3xl mb-3 font-bold text-red-800">{t.title}</h1>
        <p className="text-red-600 text-lg font-medium">{t.subtitle}</p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-2xl">🚨</span>
          <span className="text-2xl">📞</span>
          <span className="text-2xl">👨‍⚕️</span>
        </div>
      </div>

      {/* Emergency Alert */}
      <Alert className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 shadow-lg">
        <AlertCircle className="h-6 w-6 text-red-600 animate-pulse" />
        <AlertDescription className="text-red-800 font-semibold text-base">
          🚨 <strong>Emergency Alert:</strong> {t.emergencyTip}
        </AlertDescription>
      </Alert>

      {/* Main Helpline Card */}
      <Card className="border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-100 shadow-xl">
        <CardHeader className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Phone className="w-10 h-10 text-white drop-shadow-sm" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-lg font-bold">!</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-green-800 font-bold">{t.tollFree}</CardTitle>
          <CardDescription className="text-lg font-semibold text-green-700">
            📞 1800-POULTRY<br />
            <span className="text-2xl font-bold">1800-768-5879</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex justify-center gap-2 flex-wrap">
            <Badge className="bg-green-600 text-white px-3 py-1 text-sm">🕒 {t.available24}</Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-3 py-1 text-sm">💰 {t.freeService}</Badge>
            <Badge variant="outline" className="border-purple-300 text-purple-700 px-3 py-1 text-sm">🌐 {t.multiLang}</Badge>
          </div>
          
          <Button 
            onClick={() => handleCall('1800-768-5879')}
            size="lg" 
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-lg py-4 font-bold shadow-lg"
          >
            <Phone className="w-6 h-6 mr-3" />
            {t.callNow}
          </Button>
          
          <p className="text-sm text-green-600 font-medium">
            🗣️ Available in Hindi, English & Regional Languages
          </p>
        </CardContent>
      </Card>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* SMS Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <MessageSquare className="w-5 h-5" />
              {t.smsAlerts}
            </CardTitle>
            <CardDescription>
              Get disease alerts and care tips via SMS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                Works on any mobile phone, no internet required
              </div>
              <Button onClick={handleSMS} variant="outline" className="w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                {t.sendSms}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Local Vet Finder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <MapPin className="w-5 h-5" />
              {t.localVet}
            </CardTitle>
            <CardDescription>
              Find veterinarians near your location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                Contact details and directions included
              </div>
              <Button variant="outline" className="w-full">
                <MapPin className="w-4 h-4 mr-2" />
                {t.findVet}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            {t.emergency}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "Disease Outbreak Hotline", number: "1800-001-1950", available: "24/7" },
            { name: "Poultry Expert Consultation", number: "1800-768-5879", available: "6 AM - 10 PM" },
            { name: "Local Animal Husbandry Dept", number: "1800-180-1551", available: "9 AM - 6 PM" }
          ].map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm">{contact.name}</div>
                <div className="text-xs text-gray-600">{contact.available}</div>
              </div>
              <Button 
                onClick={() => handleCall(contact.number)}
                size="sm" 
                variant="outline"
              >
                <Phone className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Support Image */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-32">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1679128719010-aaa99859ad97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGZhcm1lciUyMG1vYmlsZXxlbnwxfHx8fDE3NTc1MTY4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Rural farmer support"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-white text-center">
                <Users className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Expert support in your local language</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}