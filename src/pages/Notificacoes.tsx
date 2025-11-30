import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Plus, Pill, FileText, Calendar, Trash2, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface RecurringNotification {
  id: number;
  type: string;
  title: string;
  times: string[];
  frequency?: string;
  date?: string;
  active: boolean;
  createdAt: string;
}

const Notificacoes = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [recurringNotifications, setRecurringNotifications] = useState<RecurringNotification[]>([
    {
      id: 1,
      type: "medicacao",
      title: "Antirretroviral",
      times: ["08:00", "20:00"],
      frequency: "daily",
      active: true,
      createdAt: "20/11/2024",
    },
    {
      id: 2,
      type: "medicacao",
      title: "Vitamina D",
      times: ["09:00"],
      frequency: "daily",
      active: true,
      createdAt: "15/11/2024",
    },
    {
      id: 3,
      type: "exame",
      title: "Carga Viral",
      times: ["09:00"],
      date: "15/12/2024",
      active: true,
      createdAt: "10/11/2024",
    },
  ]);

  const [newNotification, setNewNotification] = useState({
    type: "",
    title: "",
    frequency: "",
    date: "",
    times: [""],
  });

  const addTimeSlot = () => {
    if (newNotification.type !== "medicacao") return;
    
    setNewNotification(prev => ({
      ...prev,
      times: [...prev.times, ""]
    }));
  };

  const removeTimeSlot = (index: number) => {
    if (newNotification.type !== "medicacao") return;
    
    setNewNotification(prev => ({
      ...prev,
      times: prev.times.filter((_, i) => i !== index)
    }));
  };

  const updateTimeSlot = (index: number, value: string) => {
    setNewNotification(prev => ({
      ...prev,
      times: prev.times.map((time, i) => i === index ? value : time)
    }));
  };

  const handleCreateNotification = () => {
    const isMedication = newNotification.type === "medicacao";
    const hasRequiredFields = newNotification.type && newNotification.title && newNotification.times.every(t => t);
    const hasFrequencyOrDate = isMedication ? newNotification.frequency : newNotification.date;
    
    if (!hasRequiredFields || !hasFrequencyOrDate) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para criar a notificação.",
        variant: "destructive",
      });
      return;
    }

    const notification: RecurringNotification = {
      id: Date.now(),
      type: newNotification.type,
      title: newNotification.title,
      times: newNotification.times,
      ...(isMedication ? { frequency: newNotification.frequency } : { date: newNotification.date }),
      active: true,
      createdAt: new Date().toLocaleDateString('pt-BR'),
    };

    setRecurringNotifications(prev => [notification, ...prev]);
    setNewNotification({ type: "", title: "", frequency: "", date: "", times: [""] });
    setIsDialogOpen(false);
    
    toast({
      title: "Notificação criada",
      description: isMedication ? "Sua notificação recorrente foi configurada com sucesso." : "Seu lembrete foi criado com sucesso.",
    });
  };

  const toggleNotification = (id: number) => {
    setRecurringNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, active: !notif.active } : notif
      )
    );
  };

  const deleteNotification = (id: number) => {
    setRecurringNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notificação excluída",
      description: "A notificação foi removida com sucesso.",
    });
  };

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

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case "daily":
        return "Diariamente";
      case "weekly":
        return "Semanalmente";
      case "monthly":
        return "Mensalmente";
      default:
        return frequency;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Notificações Recorrentes</h1>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2 shadow-md">
              <Plus className="h-4 w-4" />
              Nova
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar notificação recorrente</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="tipo">Tipo</Label>
                <Select 
                  value={newNotification.type}
                  onValueChange={(value) => setNewNotification(prev => ({ ...prev, type: value }))}
                >
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
                <Input 
                  id="titulo" 
                  placeholder="Ex: Antirretroviral"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              {newNotification.type === "medicacao" ? (
                <div>
                  <Label htmlFor="frequencia">Frequência</Label>
                  <Select 
                    value={newNotification.frequency}
                    onValueChange={(value) => setNewNotification(prev => ({ ...prev, frequency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diariamente</SelectItem>
                      <SelectItem value="weekly">Semanalmente</SelectItem>
                      <SelectItem value="monthly">Mensalmente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : newNotification.type && (
                <div>
                  <Label htmlFor="data">Data</Label>
                  <Input 
                    id="data" 
                    type="date"
                    value={newNotification.date}
                    onChange={(e) => setNewNotification(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
              )}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Horários</Label>
                  {newNotification.type === "medicacao" && (
                    <Button 
                      type="button" 
                      size="sm" 
                      variant="outline" 
                      onClick={addTimeSlot}
                      className="gap-1"
                    >
                      <Plus className="h-3 w-3" />
                      Adicionar horário
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  {newNotification.times.map((time, index) => (
                    <div key={index} className="flex gap-2">
                      <Input 
                        type="time"
                        value={time}
                        onChange={(e) => updateTimeSlot(index, e.target.value)}
                        className="flex-1"
                      />
                      {newNotification.type === "medicacao" && newNotification.times.length > 1 && (
                        <Button 
                          type="button"
                          size="icon" 
                          variant="outline"
                          onClick={() => removeTimeSlot(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <Button className="w-full" size="lg" onClick={handleCreateNotification}>
                Criar notificação
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {recurringNotifications.map((notification) => (
          <Card key={notification.id} className="p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${
                notification.active 
                  ? 'bg-primary/20 text-primary' 
                  : 'bg-muted/50 text-muted-foreground'
              }`}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{notification.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {notification.frequency ? getFrequencyLabel(notification.frequency) : notification.date}
                    </p>
                  </div>
                  <Badge 
                    variant={notification.active ? "default" : "secondary"}
                    className="ml-2"
                  >
                    {notification.active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {notification.times.map((time, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-sm bg-secondary px-2 py-1 rounded">
                      <Clock className="h-3 w-3" />
                      {time}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => toggleNotification(notification.id)}
                  >
                    {notification.active ? "Desativar" : "Ativar"}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-destructive"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Excluir
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notificacoes;
