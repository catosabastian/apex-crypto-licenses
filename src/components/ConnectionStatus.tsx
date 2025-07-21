import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, RotateCcw } from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

export const ConnectionStatus: React.FC = () => {
  const { isLoading } = useAdminAuth();
  const connectionStatus: 'connected' | 'disconnected' | 'reconnecting' = isLoading ? 'reconnecting' : 'connected';

  const getStatusConfig = () => {
    switch (connectionStatus) {
      case 'connected':
        return {
          icon: Wifi,
          text: 'Connected',
          variant: 'default' as const,
          className: 'bg-green-100 text-green-800 border-green-200'
        };
      case 'reconnecting':
        return {
          icon: RotateCcw,
          text: 'Reconnecting',
          variant: 'secondary' as const,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
        };
      default:
        return {
          icon: Wifi,
          text: 'Unknown',
          variant: 'secondary' as const,
          className: ''
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={`flex items-center gap-1 ${config.className}`}>
      <Icon className="h-3 w-3" />
      {config.text}
    </Badge>
  );
};