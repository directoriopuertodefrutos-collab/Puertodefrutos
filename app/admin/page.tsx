"use client";

import {
  Store,
  LayoutGrid,
  CreditCard,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Plus,
  Search,
  Edit3,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", active: true },
  { icon: Store, label: "Comercios" },
  { icon: LayoutGrid, label: "Categorías" },
  { icon: CreditCard, label: "Planes" },
  { icon: Users, label: "Usuarios" },
  { icon: Settings, label: "Configuración" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-arena/30">
      <aside className="hidden w-64 flex-col border-r border-carbon/5 bg-white p-6 lg:flex">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rio">
            <Store className="h-4 w-4 text-white" />
          </div>
          <span className="font-display text-base font-bold text-carbon">
            Admin
          </span>
        </div>

        <nav className="mt-8 flex-1 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                activeTab === item.label
                  ? "bg-rio text-white"
                  : "text-carbon/50 hover:bg-carbon/5 hover:text-carbon",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <button className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-carbon/50 transition-all hover:bg-red-50 hover:text-red-500">
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-carbon/5 bg-white px-6 py-4">
          <h1 className="font-display text-lg font-bold text-carbon">
            {activeTab}
          </h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-carbon/30" />
              <input
                type="text"
                placeholder="Buscar..."
                className="rounded-xl border border-carbon/10 bg-arena/30 py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10"
              />
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-rio px-4 py-2 text-sm font-medium text-white transition-all hover:bg-rio/90">
              <Plus className="h-4 w-4" />
              Nuevo
            </button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Comercios", value: "150", change: "+12", color: "rio" },
              { label: "Categorías", value: "10", change: "0", color: "delta" },
              { label: "Planes activos", value: "45", change: "+5", color: "madera" },
              { label: "Visitas hoy", value: "1.234", change: "+18%", color: "rio" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-carbon/5 bg-white p-5 shadow-premium"
              >
                <p className="text-sm text-carbon/40">{stat.label}</p>
                <p className="mt-2 font-display text-3xl font-bold text-carbon">
                  {stat.value}
                </p>
                <span className={cn(
                  "mt-1 inline-block text-xs font-medium",
                  stat.change.startsWith("+") ? "text-delta" : "text-carbon/30"
                )}>
                  {stat.change} este mes
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-carbon/5 bg-white shadow-premium">
            <div className="flex items-center justify-between border-b border-carbon/5 px-6 py-4">
              <h2 className="text-sm font-semibold text-carbon">
                Últimos comercios
              </h2>
              <span className="text-xs text-carbon/30">Estructura de tabla</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-carbon/5 text-xs text-carbon/40 uppercase tracking-wider">
                    <th className="px-6 py-4 font-medium">Comercio</th>
                    <th className="px-6 py-4 font-medium">Categoría</th>
                    <th className="px-6 py-4 font-medium">Plan</th>
                    <th className="px-6 py-4 font-medium">Estado</th>
                    <th className="px-6 py-4 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Casa Delta",
                      cat: "Decoración",
                      plan: "Premium",
                      active: true,
                    },
                    {
                      name: "Muebles del Río",
                      cat: "Muebles",
                      plan: "Destacado",
                      active: true,
                    },
                    {
                      name: "Luz del Delta",
                      cat: "Iluminación",
                      plan: "Gratuito",
                      active: true,
                    },
                  ].map((row) => (
                    <tr
                      key={row.name}
                      className="border-b border-carbon/5 transition-colors hover:bg-arena/30"
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium text-carbon">
                          {row.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-carbon/50">{row.cat}</td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-0.5 text-xs font-medium",
                            row.plan === "Premium"
                              ? "bg-rio/10 text-rio"
                              : row.plan === "Destacado"
                                ? "bg-delta/10 text-delta"
                                : "bg-carbon/5 text-carbon/50",
                          )}
                        >
                          {row.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-xs text-delta">
                          <span className="h-1.5 w-1.5 rounded-full bg-delta" />
                          Activo
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="rounded-lg p-1.5 text-carbon/30 transition-colors hover:bg-carbon/5 hover:text-carbon">
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg p-1.5 text-carbon/30 transition-colors hover:bg-red-50 hover:text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs text-carbon/20">
              Panel de administración — Interfaz de gestión
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
