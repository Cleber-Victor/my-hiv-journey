import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Plus, Pill, FileText, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Notificacoes = () => {
  const notifications = [
    {
      id: 1,
      type: "medicacao",
      title: "Medicação da manhã",
      time: "08:00",
      status: "completed",
      date: "Hoje",
    },
    {
      id: 2,
      type: "medicacao",
      title: "Medicação da noite",
      time: "20:00",
      status: "pending",
      date: "Hoje",
    },
    {
      id: 3,
      type: "exame",
      title: "Exame de sangue",
      time: "09:00",
      status: "scheduled",
      date: "15/12/2024",
    },
    {
      id: 4,
      type: "consulta",
      title: "Consulta com Dr. Silva",
      time: "14:30",
      status: "scheduled",
      date: "20/12/2024",
    },
    {
      id: 5,
      type: "medicacao",
      title: "Medicação da manhã",
      time: "08:00",
      status: "completed",
      date: "Ontem",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "medicacao":
        return <Pill className="h-5 w-5" />;
      case "exame":
        return <FileText className="h-5 w-5" />;
      case "consulta":
        return <Calendar className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "scheduled":
        return "default";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído";
      case "pending":
        return "Pendente";
      case "scheduled":
        return "Agendado";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Notificações</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2 shadow-md">
              <Plus className="h-4 w-4" />
              Nova
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar nova notificação</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="tipo">Tipo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medicacao">Medicação</SelectItem>
                    <SelectItem value="exame">Exame</SelectItem>
                    <SelectItem value="consulta">Consulta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="titulo">Título</Label>
                <Input id="titulo" placeholder="Ex: Medicação da manhã" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="data">Data</Label>
                  <Input id="data" type="date" />
                </div>
                <div>
                  <Label htmlFor="hora">Hora</Label>
                  <Input id="hora" type="time" />
                </div>
              </div>
              <Button className="w-full" size="lg">
                Criar notificação
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card key={notification.id} className="p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${
                notification.status === 'completed' 
                  ? 'bg-accent/20 text-accent' 
                  : notification.status === 'pending'
                  ? 'bg-warning/20 text-warning'
                  : 'bg-primary/20 text-primary'
              }`}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{notification.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {notification.date} às {notification.time}
                    </p>
                  </div>
                  <Badge 
                    variant={getStatusColor(notification.status) as any}
                    className="ml-2"
                  >
                    {getStatusLabel(notification.status)}
                  </Badge>
                </div>
                {notification.status === 'pending' && (
                  <Button size="sm" variant="outline" className="mt-2">
                    Marcar como concluído
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notificacoes;
