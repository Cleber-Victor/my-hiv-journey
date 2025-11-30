import { TrendingUp, Heart, CheckCircle2, Activity } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Olá, bem-vindo!</h1>
        <p className="text-muted-foreground">Aqui está seu resumo de hoje</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Dias seguidos"
          value="12"
          subtitle="Cumprindo bem a agenda"
          icon={<TrendingUp className="h-6 w-6" />}
          variant="success"
        />
        <MetricCard
          title="Adesão ao tratamento"
          value="87%"
          subtitle="Últimos 30 dias"
          icon={<CheckCircle2 className="h-6 w-6" />}
          variant="success"
        />
        <MetricCard
          title="Humor médio"
          value="3.3"
          subtitle="Última semana"
          icon={<Heart className="h-6 w-6" />}
          variant="default"
        />
      </div>

      <Card className="p-6 shadow-md">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Humor da semana
        </h3>
        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-mood-very-happy flex items-center justify-center mb-1">
              <span className="text-white font-semibold">5</span>
            </div>
            <span className="text-xs text-muted-foreground">Seg</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-mood-sad flex items-center justify-center mb-1">
              <span className="text-white font-semibold">2</span>
            </div>
            <span className="text-xs text-muted-foreground">Ter</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-mood-neutral flex items-center justify-center mb-1">
              <span className="text-white font-semibold">3</span>
            </div>
            <span className="text-xs text-muted-foreground">Qua</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-mood-very-sad flex items-center justify-center mb-1">
              <span className="text-white font-semibold">1</span>
            </div>
            <span className="text-xs text-muted-foreground">Qui</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-mood-very-happy flex items-center justify-center mb-1">
              <span className="text-white font-semibold">5</span>
            </div>
            <span className="text-xs text-muted-foreground">Sex</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-mood-happy flex items-center justify-center mb-1">
              <span className="text-white font-semibold">4</span>
            </div>
            <span className="text-xs text-muted-foreground">Sáb</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-mood-neutral flex items-center justify-center mb-1">
              <span className="text-white font-semibold">3</span>
            </div>
            <span className="text-xs text-muted-foreground">Dom</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-hero shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">Registro diário</h3>
            <p className="text-white/90 text-sm">Como você está se sentindo hoje?</p>
          </div>
          <NavLink to="/calendario">
            <Button variant="secondary" size="lg" className="font-semibold">
              Registrar
            </Button>
          </NavLink>
        </div>
      </Card>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Progresso recente
        </h2>
        <div className="space-y-3">
          <Card className="p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Medicação tomada</p>
                <p className="text-sm text-muted-foreground">Hoje às 08:30</p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-accent" />
            </div>
          </Card>
          <Card className="p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Registro de humor</p>
                <p className="text-sm text-muted-foreground">Ontem</p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-accent" />
            </div>
          </Card>
        </div>
      </div>

      <Card className="p-6 bg-secondary shadow-sm">
        <h3 className="font-semibold text-foreground mb-2">Próximas atividades</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <p className="text-sm text-foreground">Consulta médica - 15/12</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-warning" />
            <p className="text-sm text-foreground">Exame de sangue - 20/12</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
