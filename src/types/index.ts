export interface Stat {
  name: string;
  value: string;
  change: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  textColor: string;
  trend: 'up' | 'down';
}

export interface Notification {
  id: number;
  message: string;
  time: string;
  type: 'success' | 'warning' | 'info';
}

export interface QuickAction {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

export interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  type: 'report' | 'settings' | 'data';
}

export interface ChartData {
  name: string;
  value: number;
  value2: number;
} 