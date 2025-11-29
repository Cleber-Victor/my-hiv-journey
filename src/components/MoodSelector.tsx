import { Frown, Meh, Smile } from "lucide-react";

interface MoodSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const MoodSelector = ({ value, onChange }: MoodSelectorProps) => {
  const moods = [
    { value: 1, icon: Frown, color: "mood-very-sad", label: "Muito triste" },
    { value: 2, icon: Frown, color: "mood-sad", label: "Triste" },
    { value: 3, icon: Meh, color: "mood-neutral", label: "Neutro" },
    { value: 4, icon: Smile, color: "mood-happy", label: "Feliz" },
    { value: 5, icon: Smile, color: "mood-very-happy", label: "Muito feliz" },
  ];

  return (
    <div className="flex gap-3 justify-center">
      {moods.map((mood) => {
        const Icon = mood.icon;
        const isSelected = value === mood.value;
        return (
          <button
            key={mood.value}
            onClick={() => onChange(mood.value)}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
              isSelected
                ? `bg-${mood.color} scale-110 shadow-md`
                : "bg-muted hover:bg-muted/70"
            }`}
            title={mood.label}
          >
            <Icon
              className={`h-8 w-8 ${
                isSelected ? "text-white" : "text-muted-foreground"
              }`}
            />
            <span className={`text-xs ${isSelected ? "text-white font-medium" : "text-muted-foreground"}`}>
              {mood.value}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default MoodSelector;
