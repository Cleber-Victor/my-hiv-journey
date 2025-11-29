import { ReactNode } from "react";
import { Home, Calendar, Bell, Upload, BarChart3 } from "lucide-react";
import { NavLink } from "./NavLink";
import logo from "@/assets/logo.png";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navItems = [
    { to: "/", icon: Home, label: "Início" },
    { to: "/calendario", icon: Calendar, label: "Registro" },
    { to: "/notificacoes", icon: Bell, label: "Notificações" },
    { to: "/acompanhamento", icon: BarChart3, label: "Gráficos" },
    { to: "/upload", icon: Upload, label: "Exames" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Ema nexo" className="h-12 w-12" />
            <div>
              <h1 className="text-lg font-bold text-primary">Ema nexo</h1>
              <p className="text-xs text-muted-foreground">I=I Inde.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 pb-24">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
        <div className="container mx-auto px-2">
          <div className="flex justify-around items-center py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all"
                activeClassName="text-primary bg-secondary"
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={`text-xs ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
