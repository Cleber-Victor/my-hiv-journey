import { ReactNode } from "react";
import { Home, Calendar, Bell, Upload, BarChart3 } from "lucide-react";
import { NavLink } from "./NavLink";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";


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

  const unreadNotificationsCount = 3;


  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="I=I Inde." className="h-20 w-20" />
            <div>
              <h1 className="text-lg font-bold text-primary">I=I Inde.</h1>
            </div>
          </div>
        </div>
      </header>


      <main className="flex-1 container mx-auto px-4 py-6 pb-24">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-around items-center py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex flex-col items-center gap-1 px-2 md:px-4 py-2 rounded-lg transition-all"
                activeClassName="text-primary bg-secondary"
              >
                {({ isActive }) => (
                  <>
                    <div className="relative">
                      <item.icon
                        className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                      />

                      {item.to === "/notificacoes" && unreadNotificationsCount > 0 && (
                        <span className="absolute -top-1 -right-2 min-w-[18px] h-[18px] px-1
                          flex items-center justify-center
                          rounded-full bg-destructive text-[10px] font-bold text-white
                          leading-none">
                          {unreadNotificationsCount}
                        </span>
                      )}
                    </div>
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
