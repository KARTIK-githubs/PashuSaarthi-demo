import { Wifi, WifiOff } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface OfflineBannerProps {
  isOffline: boolean;
}

export function OfflineBanner({ isOffline }: OfflineBannerProps) {
  if (!isOffline) return null;

  return (
    <Alert className="bg-amber-50 border-amber-200 rounded-none">
      <WifiOff className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-amber-800">
        आप ऑफ़लाइन हैं, डेटा बाद में सिंक होगा। You are offline, data will sync later.
      </AlertDescription>
    </Alert>
  );
}