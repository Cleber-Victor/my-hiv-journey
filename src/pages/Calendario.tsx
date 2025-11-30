import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import MoodSelector from "@/components/MoodSelector";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

interface DailyRecord {
  id: number;
  date: Date;
  mood: number;
  symptoms: string[];
}

const Calendario = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [mood, setMood] = useState(3);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [records, setRecords] = useState<DailyRecord[]>([
    {
      id: 1,
      date: new Date(Date.now() - 86400000),
      mood: 4,
      symptoms: ["Fadiga", "Dor de cabeça"]
    },
    {
      id: 2,
      date: new Date(Date.now() - 2 * 86400000),
      mood: 4,
      symptoms: ["Fadiga", "Dor de cabeça"]
    },
    {
      id: 3,
      date: new Date(Date.now() - 3 * 86400000),
      mood: 4,
      symptoms: ["Fadiga", "Dor de cabeça"]
    }
  ]);

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

  const handleSaveRecord = () => {
    const newRecord: DailyRecord = {
      id: Date.now(),
      date: date || new Date(),
      mood: mood,
      symptoms: [...selectedSymptoms]
    };
    
    setRecords(prev => [newRecord, ...prev]);
    setMood(3);
    setSelectedSymptoms([]);
    setIsDialogOpen(false);
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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


            <Button className="w-full" size="lg" onClick={handleSaveRecord}>
              Salvar registro
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Últimos registros</h2>
        <div className="space-y-3">
          {records.map((record) => (
            <Card key={record.id} className="p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-foreground">
                  {record.date.toLocaleDateString('pt-BR')}
                </p>
                <Badge variant="outline" className="bg-mood-happy/20 text-mood-happy border-mood-happy/30">
                  Humor: {record.mood}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {record.symptoms.map((symptom, idx) => (
                  <Badge key={idx} variant="secondary">{symptom}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendario;
