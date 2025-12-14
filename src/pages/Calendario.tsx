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
      mood: 2,
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
      mood: 3,
      symptoms: ["Fadiga", "Dor de cabeça"]
    }
  ]);

  const symptoms = [
    "Nenhum sintoma",
    "Fadiga", "Dor de cabeça", "Náusea", "Febre",
    "Dor muscular", "Insônia", "Tontura", "Dor abdominal"
  ];

  const toggleSymptom = (symptom: string) => {
    if (symptom === "Nenhum sintoma") {
      setSelectedSymptoms([]);
      return;
    }

    setSelectedSymptoms(prev => {
      const filtered = prev.filter(s => s !== "Nenhum sintoma");
      return filtered.includes(symptom)
        ? filtered.filter(s => s !== symptom)
        : [...filtered, symptom];
    });
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

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Registro Diário</h1>
          </div>

          <Card className="shadow-md w-full max-w-[400px] p-0 overflow-hidden rounded-lg">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full border-0 p-2"
                classNames={{
                  months: "w-full flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                  month: "space-y-4 w-full flex flex-col",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex w-full",
                  row: "flex w-full mt-2",
                  cell: "text-center flex-1 p-0 relative focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full hover:bg-accent hover:text-accent-foreground",
                  head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem]",
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day_outside: "text-muted-foreground opacity-50",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                }}
            />
          </Card>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="w-full max-w-[400px] font-semibold shadow-md mx-auto flex items-center justify-center gap-2">
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
              <Label className="text-base font-semibold mb-3 block">Como está se sentindo?</Label>
              <div className="grid grid-cols-2 gap-3">
                {symptoms.map((symptom) => {
                  const isNone = symptom === "Nenhum sintoma";
                  const isSelected = isNone
                    ? selectedSymptoms.length === 0
                    : selectedSymptoms.includes(symptom);

                  return (
                    <button
                      key={symptom}
                      onClick={() => toggleSymptom(symptom)}
                      className={`p-3 rounded-lg border-2 text-sm transition-all ${
                        isSelected
                          ? isNone
                            ? "border-accent bg-accent/10 text-accent font-medium"
                            : "border-primary bg-secondary text-primary font-medium"
                          : "border-border bg-card hover:border-primary/50"
                      } ${isNone ? "col-span-2" : ""}`}
                    >
                      {symptom}
                    </button>
                  );
                })}
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
                {record.symptoms.length === 0 ? (
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                    Nenhum sintoma
                  </Badge>
                ) : (
                  record.symptoms.map((symptom, idx) => (
                    <Badge key={idx} variant="secondary">{symptom}</Badge>
                  ))
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendario;
