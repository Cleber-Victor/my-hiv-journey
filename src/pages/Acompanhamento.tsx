import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, TrendingDown, Activity } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import { Badge } from "@/components/ui/badge";

const Acompanhamento = () => {
  const moodHistory = [
    { date: "Seg", mood: 5 },
    { date: "Ter", mood: 2 },
    { date: "Qua", mood: 3 },
    { date: "Qui", mood: 1 },
    { date: "Sex", mood: 5 },
    { date: "Sáb", mood: 4 },
    { date: "Dom", mood: 3 },
  ];

  const symptoms = [
    { name: "Fadiga", count: 12, trend: "down" },
    { name: "Dor de cabeça", count: 8, trend: "up" },
    { name: "Náusea", count: 5, trend: "stable" },
    { name: "Insônia", count: 7, trend: "down" },
  ];

  const getMoodColor = (mood: number) => {
    if (mood === 1) return "bg-mood-very-sad";
    if (mood === 2) return "bg-mood-sad";
    if (mood === 3) return "bg-mood-neutral";
    if (mood === 4) return "bg-mood-happy";
    return "bg-mood-very-happy";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3">
        <BarChart3 className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Acompanhamento</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Adesão mensal"
          value="87%"
          icon={<Activity className="h-6 w-6" />}
          variant="success"
        />
        <MetricCard
          title="Humor médio"
          value="3.3"
          subtitle="Última semana"
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <MetricCard
          title="Dias registrados"
          value="26/30"
          subtitle="Este mês"
          icon={<BarChart3 className="h-6 w-6" />}
        />
      </div>

      <Card className="p-6 shadow-md">
        <h2 className="text-lg font-semibold text-foreground mb-4">Humor da semana</h2>
        <div className="flex items-end gap-3 h-48 w-full">
          {moodHistory.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center justify-end gap-2 h-full">
              <div className="h-full flex items-end w-full">
                <div
                  className={`w-full rounded-t-lg transition-all ${getMoodColor(day.mood)}`}
                  style={{ height: `${(day.mood / 5) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-medium">{day.date}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 shadow-md">
        <h2 className="text-lg font-semibold text-foreground mb-4">Sintomas mais frequentes</h2>
        <div className="space-y-3">
          {symptoms.map((symptom, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <div className="flex items-center gap-3">
                <span className="font-medium text-foreground">{symptom.name}</span>
                <Badge variant="secondary">{symptom.count}x</Badge>
              </div>
              <div>
                {symptom.trend === "down" && (
                  <TrendingDown className="h-5 w-5 text-accent" />
                )}
                {symptom.trend === "up" && (
                  <TrendingUp className="h-5 w-5 text-destructive" />
                )}
                {symptom.trend === "stable" && (
                  <Activity className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 shadow-md bg-gradient-card">
        <h2 className="text-lg font-semibold text-foreground mb-3">Carga viral</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Histórico dos últimos 6 meses
        </p>
        <div className="h-48 flex items-end gap-4 w-full">
          {[60, 50, 35, 38, 29, 22].map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center justify-end gap-2 h-full">
              <div className="h-full flex items-end w-full">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-primary to-primary/60"
                  style={{ height: `${(value / 60) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {`Mês ${index + 1}`}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Acompanhamento;
