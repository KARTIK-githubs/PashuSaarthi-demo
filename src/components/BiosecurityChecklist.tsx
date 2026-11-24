import { useEffect, useState } from "react";
import { Shield, Thermometer, Heart, Clock, Droplets, Trash2, Users, CheckCircle2, ChevronRight, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";

interface BiosecurityItem {
  id: string;
  icon: any;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  steps: string[];
  stepsHi: string[];
  frequency: string;
  frequencyHi: string;
}

interface BiosecurityChecklistProps {
  language: string;
}

export function BiosecurityChecklist({ language }: BiosecurityChecklistProps) {
  const [selectedItem, setSelectedItem] = useState<BiosecurityItem | null>(null);
  const [checklist, setChecklist] = useState<BiosecurityItem[]>(() => {
    const items: BiosecurityItem[] = [
    {
      id: 'water',
      icon: Droplets,
      title: 'Clean Water Sources',
      titleHi: 'स्वच्छ पानी के स्रोत',
      description: 'Ensure fresh, clean water is available at all times',
      descriptionHi: 'हर समय ताजा, स्वच्छ पानी उपलब्ध रखें',
      completed: true,
      priority: 'high',
      frequency: 'Daily',
      frequencyHi: 'दैनिक',
      steps: [
        'Check water containers for cleanliness',
        'Replace old water with fresh supply',
        'Clean water containers weekly',
        'Test water quality monthly'
      ],
      stepsHi: [
        'पानी के बर्तनों की सफाई जांचें',
        'पुराना पानी बदलकर ताजा पानी डालें',
        'साप्ताहिक रूप से पानी के बर्तन साफ करें',
        'मासिक रूप से पानी की गुणवत्ता की जांच करें'
      ]
    },
    {
      id: 'temperature',
      icon: Thermometer,
      title: 'Temperature Monitoring',
      titleHi: 'तापमान की निगरानी',
      description: 'Monitor and maintain optimal temperature for birds',
      descriptionHi: 'पक्षियों के लिए अनुकूल तापमान बनाए रखें',
      completed: true,
      priority: 'high',
      frequency: 'Twice Daily',
      frequencyHi: 'दिन में दो बार',
      steps: [
        'Check coop temperature morning and evening',
        'Ensure proper ventilation',
        'Adjust heating/cooling as needed',
        'Record temperature readings'
      ],
      stepsHi: [
        'सुबह और शाम कूप का तापमान चेक करें',
        'उचित हवादार व्यवस्था सुनिश्चित करें',
        'आवश्यकतानुसार गर्मी/ठंडक की व्यवस्था करें',
        'तापमान रीडिंग रिकॉर्ड करें'
      ]
    },
    {
      id: 'health',
      icon: Heart,
      title: 'Bird Health Check',
      titleHi: 'पक्षियों की स्वास्थ्य जांच',
      description: 'Daily observation of bird behavior and health',
      descriptionHi: 'पक्षियों के व्यवहार और स्वास्थ्य की दैनिक निगरानी',
      completed: false,
      priority: 'high',
      frequency: 'Daily',
      frequencyHi: 'दैनिक',
      steps: [
        'Observe bird activity and appetite',
        'Check for signs of illness or distress',
        'Look for abnormal behavior',
        'Isolate sick birds immediately'
      ],
      stepsHi: [
        'पक्षियों की गतिविधि और भूख देखें',
        'बीमारी या तकलीफ के संकेत देखें',
        'असामान्य व्यवहार पर ध्यान दें',
        'बीमार पक्षियों को तुरंत अलग करें'
      ]
    },
    {
      id: 'feeding',
      icon: Clock,
      title: 'Feed Schedule',
      titleHi: 'आहार कार्यक्रम',
      description: 'Maintain regular feeding times and quality feed',
      descriptionHi: 'नियमित भोजन समय और गुणवत्तापूर्ण चारा बनाए रखें',
      completed: true,
      priority: 'medium',
      frequency: '2-3 times daily',
      frequencyHi: 'दिन में 2-3 बार',
      steps: [
        'Feed at consistent times daily',
        'Check feed quality and freshness',
        'Measure appropriate quantities',
        'Store feed in dry, clean containers'
      ],
      stepsHi: [
        'रोज एक ही समय पर भोजन दें',
        'चारे की गुणवत्ता और ताजगी देखें',
        'उचित मात्रा में चारा दें',
        'चारे को सूखे, साफ बर्तनों में रखें'
      ]
    },
    {
      id: 'sanitation',
      icon: Trash2,
      title: 'Coop Sanitation',
      titleHi: 'कूप की सफाई',
      description: 'Regular cleaning and disinfection of living areas',
      descriptionHi: 'रहने के क्षेत्र की नियमित सफाई और कीटाणुशोधन',
      completed: false,
      priority: 'high',
      frequency: 'Weekly',
      frequencyHi: 'साप्ताहिक',
      steps: [
        'Remove old bedding and droppings',
        'Clean and disinfect surfaces',
        'Add fresh bedding material',
        'Check for pests and parasites'
      ],
      stepsHi: [
        'पुराना बिछावन और मल हटाएं',
        'सतहों को साफ और कीटाणुरहित करें',
        'ताजा बिछावन सामग्री डालें',
        'कीड़े और परजीवियों की जांच करें'
      ]
    },
    {
      id: 'visitors',
      icon: Users,
      title: 'Visitor Control',
      titleHi: 'आगंतुक नियंत्रण',
      description: 'Control access to prevent disease transmission',
      descriptionHi: 'रोग संचरण रोकने के लिए पहुंच नियंत्रित करें',
      completed: false,
      priority: 'medium',
      frequency: 'Always',
      frequencyHi: 'हमेशा',
      steps: [
        'Limit unnecessary visitors',
        'Use foot baths and hand sanitization',
        'Provide protective clothing if needed',
        'Record visitor details'
      ],
      stepsHi: [
        'अनावश्यक आगंतुकों को सीमित करें',
        'फुट बाथ और हाथ कीटाणुशोधन का उपयोग करें',
        'आवश्यकता पड़ने पर सुरक्षात्मक कपड़े दें',
        'आगंतुक विवरण रिकॉर्ड करें'
      ]
    }
    ];
    try {
      const saved: unknown = JSON.parse(localStorage.getItem('pashusaarthi-checklist') || 'null');
      if (Array.isArray(saved) && saved.every(id => typeof id === 'string')) {
        return items.map(item => ({ ...item, completed: saved.includes(item.id) }));
      }
    } catch { /* Use defaults when browser storage cannot be read. */ }
    return items;
  });

  useEffect(() => {
    try {
      const completedIds = checklist.filter(item => item.completed).map(item => item.id);
      localStorage.setItem('pashusaarthi-checklist', JSON.stringify(completedIds));
    } catch { /* Checklist still works when storage is disabled. */ }
  }, [checklist]);

  const toggleItemCompletion = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = checklist.filter(item => item.completed).length;
  const completionPercentage = Math.round((completedCount / checklist.length) * 100);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const t = {
    en: {
      title: 'Biosecurity Checklist',
      completed: 'Completed',
      viewDetails: 'View Details',
      priority: 'Priority',
      frequency: 'Frequency',
      steps: 'Steps to Follow',
      markComplete: 'Mark as Complete',
      markIncomplete: 'Mark as Incomplete',
      close: 'Close'
    },
    hi: {
      title: 'बायोसिक्योरिटी चेकलिस्ट',
      completed: 'पूर्ण',
      viewDetails: 'विवरण देखें',
      priority: 'प्राथमिकता',
      frequency: 'आवृत्ति',
      steps: 'अनुसरण करने योग्य चरण',
      markComplete: 'पूर्ण के रूप में चिह्नित करें',
      markIncomplete: 'अपूर्ण के रूप में चिह्नित करें',
      close: 'बंद करें'
    }
  }[language as keyof typeof t] || t.en;

  return (
    <>
      <Card className="bg-white/80 backdrop-blur-sm border-green-200 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Shield className="w-6 h-6 text-green-600" />
              <span className="font-bold">{t.title}</span>
            </CardTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-700 font-semibold">
              {completedCount}/{checklist.length} {t.completed}
            </Badge>
          </div>
          <CardDescription className="text-green-700">
            {completionPercentage}% {t.completed}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {checklist.map((item) => (
              <div key={item.id} 
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                  item.completed 
                    ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200' 
                    : 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200 hover:border-orange-300'
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <div className={`p-3 rounded-full ${
                  item.completed ? 'bg-green-200' : 'bg-orange-200'
                }`}>
                  <item.icon className={`w-5 h-5 ${
                    item.completed ? 'text-green-700' : 'text-orange-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-semibold ${
                      item.completed ? 'text-green-800' : 'text-orange-800'
                    }`}>
                      {language === 'hi' ? item.titleHi : item.title}
                    </span>
                    <Badge variant="outline" className={`text-xs px-2 py-0.5 ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </Badge>
                  </div>
                  <p className={`text-sm ${
                    item.completed ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {language === 'hi' ? item.descriptionHi : item.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {item.completed && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2 text-green-800">
                {selectedItem && <selectedItem.icon className="w-6 h-6" />}
                {selectedItem && (language === 'hi' ? selectedItem.titleHi : selectedItem.title)}
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedItem(null)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <DialogDescription className="text-green-700">
              {selectedItem && (language === 'hi' ? selectedItem.descriptionHi : selectedItem.description)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedItem && (
            <div className="space-y-4 pt-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-600 mb-1">{t.priority}</p>
                  <Badge className={getPriorityColor(selectedItem.priority)}>{selectedItem.priority}</Badge>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-600 mb-1">{t.frequency}</p>
                  <Badge variant="outline">{language === 'hi' ? selectedItem.frequencyHi : selectedItem.frequency}</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-green-800 mb-3">{t.steps}</h4>
                <div className="space-y-2">
                  {(language === 'hi' ? selectedItem.stepsHi : selectedItem.steps).map((step, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-green-700">{index + 1}</span>
                      </div>
                      <p className="text-sm text-green-800">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => {
                  toggleItemCompletion(selectedItem.id);
                  setSelectedItem(prev => prev ? { ...prev, completed: !prev.completed } : null);
                }}
                className={`w-full ${
                  selectedItem.completed 
                    ? 'bg-orange-600 hover:bg-orange-700' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {selectedItem.completed ? t.markIncomplete : t.markComplete}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
