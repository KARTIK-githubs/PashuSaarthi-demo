import { CheckCircle, AlertTriangle, Heart, Clock, Thermometer, Shield, TrendingUp, Bell, Activity, Users, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BiosecurityChecklist } from "./BiosecurityChecklist";
import { useState } from "react";

interface DashboardProps {
  language: string;
}

export function Dashboard({ language }: DashboardProps) {
  const [showAlertDetails, setShowAlertDetails] = useState(false);
  const farmHealthScore = 82;
  const checklistCompletion = 75;

  const translations = {
    en: {
      welcome: "Welcome back, Farmer!",
      subtitle: "Your digital farming companion",
      farmHealth: "Farm Health Score",
      checklist: "Biosecurity Checklist",
      completed: "Completed",
      alerts: "Disease Alerts",
      recommendations: "AI Recommendations",
      viewDetails: "View Details",
      quickStats: "Quick Stats",
      totalBirds: "Total Birds",
      healthyBirds: "Healthy Birds",
      alertsCount: "Active Alerts",
      lastCheck: "Last Health Check",
      nearbyOutbreaks: "Nearby Outbreaks",
      weatherAlert: "Weather Alert",
      recentActivity: "Recent Activity"
    },
    hi: {
      welcome: "स्वागत है, किसान जी!",
      subtitle: "आपका डिजिटल कृषि साथी",
      farmHealth: "फार्म स्वास्थ्य स्कोर",
      checklist: "बायोसिक्योरिटी चेकलिस्ट",
      completed: "पूर्ण",
      alerts: "रोग अलर्ट",
      recommendations: "AI सुझाव",
      viewDetails: "विवरण देखें",
      quickStats: "त्वरित आंकड़े",
      totalBirds: "कुल पक्षी",
      healthyBirds: "स्वस्थ पक्षी",
      alertsCount: "सक्रिय अलर्ट",
      lastCheck: "पिछली स्वास्थ्य जांच",
      nearbyOutbreaks: "आस-पास के प्रकोप",
      weatherAlert: "मौसम चेतावनी",
      recentActivity: "हाल की गतिविधि"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const checklistItems = [
    { icon: Shield, text: "Clean water sources", completed: true },
    { icon: Thermometer, text: "Temperature monitoring", completed: true },
    { icon: Heart, text: "Bird health check", completed: false },
    { icon: Clock, text: "Feed schedule", completed: true },
  ];

  const alerts = [
    { 
      level: "high", 
      text: "Newcastle disease reported 5km away in Khatoli village", 
      textHi: "खतोली गांव में 5 किमी दूर न्यूकैसल रोग की रिपोर्ट",
      icon: AlertTriangle,
      time: "2 hours ago",
      timeHi: "2 घंटे पहले",
      action: "Isolate birds and contact vet immediately",
      actionHi: "पक्षियों को अलग करें और तुरंत पशु चिकित्सक से संपर्क करें"
    },
    { 
      level: "warning", 
      text: "Heavy rainfall expected - ensure proper coop drainage", 
      textHi: "भारी बारिश की संभावना - कूप की उचित निकासी सुनिश्चित करें",
      icon: TrendingUp,
      time: "4 hours ago", 
      timeHi: "4 घंटे पहले",
      action: "Check roof for leaks and clear drainage channels",
      actionHi: "छत में रिसाव की जांच करें और जल निकासी चैनल साफ करें"
    },
    { 
      level: "info", 
      text: "Weekly health checkup reminder for flock A", 
      textHi: "झुंड A के लिए साप्ताहिक स्वास्थ्य जांच अनुस्मारक",
      icon: Heart,
      time: "1 day ago",
      timeHi: "1 दिन पहले", 
      action: "Schedule routine health examination",
      actionHi: "नियमित स्वास्थ्य परीक्षा का समय निर्धारित करें"
    }
  ];

  return (
    <div className="space-y-6 p-4 pb-20">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-700 to-yellow-600 p-6 text-white shadow-xl">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-sm">{t.welcome}</h1>
          <p className="text-green-100 text-lg font-medium mb-4">{t.subtitle}</p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Activity className="w-4 h-4" />
              <span>Farm Status: Active</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Khatoli, Haryana</span>
            </div>
          </div>
        </div>
        <div className="absolute -right-2 -bottom-2 w-32 h-32 opacity-30">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1745302629636-804ae36b6f2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBwb3VsdHJ5JTIwY2hpY2tlbnxlbnwxfHx8fDE3NTc1MjI1Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Indian farmer with poultry"
            className="w-full h-full object-cover rounded-full border-4 border-white/20"
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-800">247</div>
            <div className="text-sm text-blue-600 font-medium">{t.totalBirds}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-800">241</div>
            <div className="text-sm text-green-600 font-medium">{t.healthyBirds}</div>
          </CardContent>
        </Card>
      </div>

      {/* Farm Health Score */}
      <Card className="bg-gradient-to-br from-white to-green-50 border-green-200 shadow-lg">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-xl flex items-center justify-center gap-2 font-bold text-green-800">
            <Heart className="w-6 h-6 text-green-600" />
            {t.farmHealth}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="relative w-36 h-36 mx-auto mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(farmHealthScore / 100) * 314} 314`}
                className="transition-all duration-500 drop-shadow-sm"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-700 drop-shadow-sm">{farmHealthScore}</div>
                <div className="text-sm text-green-600 font-semibold">Good Health</div>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800 font-semibold px-4 py-2 text-sm">
            ✓ Healthy Farm Status
          </Badge>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="font-semibold text-green-800">98%</div>
              <div className="text-green-600">Vaccination Rate</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="font-semibold text-blue-800">15°C</div>
              <div className="text-blue-600">Avg Temperature</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Biosecurity Checklist */}
      <BiosecurityChecklist language={language} />

      {/* Disease Alerts */}
      <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-orange-700">
              <Bell className="w-6 h-6" />
              <span className="font-bold">{t.alerts}</span>
            </div>
            <Badge variant="destructive" className="bg-red-500">
              {alerts.length} Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.slice(0, showAlertDetails ? alerts.length : 2).map((alert, index) => (
            <div key={index} className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              alert.level === 'high' ? 'bg-red-50 border-red-200' :
              alert.level === 'warning' ? 'bg-orange-50 border-orange-200' : 
              'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-start gap-3">
                <alert.icon className={`w-5 h-5 mt-1 ${
                  alert.level === 'high' ? 'text-red-600' :
                  alert.level === 'warning' ? 'text-orange-600' : 'text-blue-600'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-semibold ${
                      alert.level === 'high' ? 'text-red-800' :
                      alert.level === 'warning' ? 'text-orange-800' : 'text-blue-800'
                    }`}>
                      {language === 'hi' ? alert.textHi : alert.text}
                    </span>
                    <Badge variant="outline" className={`text-xs ${
                      alert.level === 'high' ? 'border-red-300 text-red-700' :
                      alert.level === 'warning' ? 'border-orange-300 text-orange-700' : 
                      'border-blue-300 text-blue-700'
                    }`}>
                      {alert.level}
                    </Badge>
                  </div>
                  <p className={`text-xs mb-2 ${
                    alert.level === 'high' ? 'text-red-600' :
                    alert.level === 'warning' ? 'text-orange-600' : 'text-blue-600'
                  }`}>
                    {language === 'hi' ? alert.timeHi : alert.time}
                  </p>
                  {showAlertDetails && (
                    <div className={`mt-2 p-3 rounded-lg text-sm ${
                      alert.level === 'high' ? 'bg-red-100 text-red-800' :
                      alert.level === 'warning' ? 'bg-orange-100 text-orange-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      <strong>Action:</strong> {language === 'hi' ? alert.actionHi : alert.action}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-3 border-orange-300 text-orange-700 hover:bg-orange-50 font-semibold"
            onClick={() => setShowAlertDetails(!showAlertDetails)}
          >
            {showAlertDetails ? 'Show Less' : t.viewDetails}
          </Button>
        </CardContent>
      </Card>

      {/* Farm Image */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-48">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1635713933184-fea0dcca3684?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtJTIwcnVyYWwlMjBjaGlja2VufGVufDF8fHx8MTc1NzUyMjU0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Rural Indian farm with chickens"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">Your Farm Today</h3>
                <p className="text-sm text-gray-200">Healthy and thriving poultry</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}