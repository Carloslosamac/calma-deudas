import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Sparkles,
  PhoneCall,
  Inbox,
  ListChecks,
  Search,
  Activity,
  LogOut,
} from "lucide-react";
import calmaLogo from "@/assets/calma-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

type Item = { title: string; url: string; icon: typeof LayoutDashboard; end?: boolean };

const panel: Item[] = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard, end: true },
];

const ventas: Item[] = [
  { title: "Diagnóstico", url: "/admin/ventas", icon: Sparkles, end: true },
  { title: "Leads llamadas", url: "/admin/ventas/leads", icon: PhoneCall },
  { title: "Leads web", url: "/admin/leads-web", icon: Inbox },
];

const contenido: Item[] = [
  { title: "Cola de publicación", url: "/admin/contenido/cola", icon: ListChecks },
  { title: "Indexación", url: "/admin/contenido/indexacion", icon: Search },
  { title: "Salud del sitio", url: "/admin/contenido/salud", icon: Activity },
];

const renderItems = (items: Item[], collapsed: boolean) =>
  items.map((item) => (
    <SidebarMenuItem key={item.url}>
      <SidebarMenuButton asChild tooltip={collapsed ? item.title : undefined}>
        <NavLink to={item.url} end={item.end}>
          {({ isActive }) => (
            <span
              className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm ${
                isActive
                  ? "bg-accent-soft/70 text-accent-deep font-medium"
                  : "text-foreground/80 hover:bg-muted/60"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.title}</span>}
            </span>
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ));

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/auth", { replace: true });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border/60">
        <div className="flex items-center gap-2 px-2 py-2">
          <img src={calmaLogo} alt="Calma" className="h-6" />
          {!collapsed && (
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Admin
            </span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Panel</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(panel, collapsed)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Ventas</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(ventas, collapsed)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Contenido</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(contenido, collapsed)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border/60">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              tooltip={collapsed ? "Cerrar sesión" : undefined}
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span>Cerrar sesión</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AdminSidebar;