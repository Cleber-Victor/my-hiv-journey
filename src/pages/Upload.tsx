import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload as UploadIcon, FileText, Download, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Exam {
  id: number;
  name: string;
  date: string;
  type: string;
  size: string;
}

const Upload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [exams, setExams] = useState<Exam[]>([
    {
      id: 1,
      name: "Exame de Carga Viral.pdf",
      date: "15/11/2024",
      type: "Carga Viral",
      size: "2.3 MB",
    },
    {
      id: 2,
      name: "Hemograma Completo.pdf",
      date: "10/11/2024",
      type: "Hemograma",
      size: "1.8 MB",
    },
    {
      id: 3,
      name: "CD4_CD8.pdf",
      date: "05/11/2024",
      type: "CD4/CD8",
      size: "1.5 MB",
    },
  ]);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newExams: Exam[] = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      date: new Date().toLocaleDateString('pt-BR'),
      type: file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'Imagem' : 'Documento',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    }));

    setExams(prev => [...newExams, ...prev]);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = (id: number) => {
    setExams(prev => prev.filter(exam => exam.id !== id));
  };

  const handleDownload = (examName: string) => {
    toast({
      title: "Download concluído",
      description: `O arquivo "${examName}" foi baixado com sucesso.`,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3">
        <UploadIcon className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Upload de Exames</h1>
      </div>

      <Card className="p-8 shadow-md border-2 border-dashed border-border bg-gradient-card">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <UploadIcon className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">
              Faça upload dos seus exames
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Arraste e solte ou clique para selecionar arquivos
            </p>
            <p className="text-xs text-muted-foreground">
              Formatos aceitos: PDF, JPG, PNG (máx. 10MB)
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button size="lg" className="gap-2 shadow-md" onClick={handleFileSelect}>
            <UploadIcon className="h-4 w-4" />
            Selecionar arquivos
          </Button>
        </div>
      </Card>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Exames anteriores</h2>
        <div className="space-y-3">
          {exams.map((exam) => (
            <Card key={exam.id} className="p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {exam.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Enviado em {exam.date}
                      </p>
                    </div>
                    <Badge variant="secondary" className="ml-2 whitespace-nowrap">
                      {exam.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs text-muted-foreground">{exam.size}</span>
                    <div className="flex gap-2 ml-auto">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-2"
                        onClick={() => handleDownload(exam.name)}
                      >
                        <Download className="h-3 w-3" />
                        Baixar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-2 text-destructive"
                        onClick={() => handleDelete(exam.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-6 bg-secondary shadow-sm">
        <h3 className="font-semibold text-foreground mb-2">Dica importante</h3>
        <p className="text-sm text-muted-foreground">
          Mantenha seus exames organizados e sempre faça upload das versões mais recentes.
          Isso ajuda você e seu médico a acompanharem melhor sua saúde.
        </p>
      </Card>
    </div>
  );
};

export default Upload;
