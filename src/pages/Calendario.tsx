import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import MoodSelector from "@/components/MoodSelector";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

const Calendario = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [mood, setMood] = useState(3);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [tasks, setTasks] = useState({
    exercicio: false,
    medicacao: false,
    exame: false,
  });

  const symptoms = [
    "Fadiga", "Dor de cabeça", "Náusea", "Febre",
    "Dor muscular", "Insônia", "Tontura", "Dor abdominal"
  ];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3">
        <CalendarDays className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Registro Diário</h1>
      </div>

      <Card className="p-6 shadow-md">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border-0"
        />
      </Card>

      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" className="w-full font-semibold shadow-md">
            Registrar dia de hoje
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Como você está hoje?</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 pt-4">
            <div>
              <Label className="text-base font-semibold mb-4 block">Seu humor</Label>
              <MoodSelector value={mood} onChange={setMood} />
            </div>

            <div>
              <Label className="text-base font-semibold mb-3 block">Sintomas</Label>
              <div className="grid grid-cols-2 gap-3">
                {symptoms.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={`p-3 rounded-lg border-2 text-sm transition-all ${
                      selectedSymptoms.includes(symptom)
                        ? "border-primary bg-secondary text-primary font-medium"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold mb-3 block">Atividades</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted">
                  <Checkbox
                    id="exercicio"
                    checked={tasks.exercicio}
                    onCheckedChange={(checked) =>
                      setTasks({ ...tasks, exercicio: checked as boolean })
                    }
                  />
                  <label htmlFor="exercicio" className="text-sm cursor-pointer flex-1">
                    Fez exercício hoje?
                  </label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted">
                  <Checkbox
                    id="medicacao"
                    checked={tasks.medicacao}
                    onCheckedChange={(checked) =>
                      setTasks({ ...tasks, medicacao: checked as boolean })
                    }
                  />
                  <label htmlFor="medicacao" className="text-sm cursor-pointer flex-1">
                    Tomou a medicação?
                  </label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted">
                  <Checkbox
                    id="exame"
                    checked={tasks.exame}
                    onCheckedChange={(checked) =>
                      setTasks({ ...tasks, exame: checked as boolean })
                    }
                  />
                  <label htmlFor="exame" className="text-sm cursor-pointer flex-1">
                    Foi ao exame agendado?
                  </label>
                </div>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Salvar registro
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Últimos registros</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-foreground">
                  {new Date(Date.now() - i * 86400000).toLocaleDateString('pt-BR')}
                </p>
                <Badge variant="outline" className="bg-mood-happy/20 text-mood-happy border-mood-happy/30">
                  Humor: 4
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Fadiga</Badge>
                <Badge variant="secondary">Dor de cabeça</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendario;
