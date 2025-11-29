import { ReactNode } from "react";
import { Card } from "./ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtitle?: string;
  variant?: "default" | "success" | "warning";
}

const MetricCard = ({ title, value, icon, subtitle, variant = "default" }: MetricCardProps) => {
  const variantClasses = {
    default: "bg-gradient-card",
    success: "bg-gradient-to-br from-accent/10 to-accent/5",
    warning: "bg-gradient-to-br from-warning/10 to-warning/5",
  };

  const iconClasses = {
    default: "text-primary",
    success: "text-accent",
    warning: "text-warning",
  };

  return (
    <Card className={`p-6 shadow-md transition-all hover:shadow-lg ${variantClasses[variant]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl bg-background/50 ${iconClasses[variant]}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;
