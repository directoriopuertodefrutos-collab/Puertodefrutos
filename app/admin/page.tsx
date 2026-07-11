"use client";

import { useState, useEffect, useCallback } from "react";
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
  Save,
  Copy,
  X,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn, slugify } from "@/lib/utils";
import { businessFormSchema, type BusinessFormValues } from "@/lib/schemas";
import { categories } from "@/data/categories";
import type { Business, Product } from "@/types";

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard" },
  { icon: Store, label: "Comercios", active: true },
  { icon: LayoutGrid, label: "Categorías" },
  { icon: CreditCard, label: "Planes" },
  { icon: Users, label: "Usuarios" },
  { icon: Settings, label: "Configuración" },
];

const emptySchedule = {
  monday: { open: "10:00", close: "19:00" },
  tuesday: { open: "10:00", close: "19:00" },
  wednesday: { open: "10:00", close: "19:00" },
  thursday: { open: "10:00", close: "19:00" },
  friday: { open: "10:00", close: "19:00" },
  saturday: { open: "10:00", close: "20:00" },
  sunday: { open: "11:00", close: "19:00" },
};

const dayLabels: Record<string, string> = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function defaultForm(): BusinessFormValues {
  return {
    name: "",
    slug: "",
    category: "",
    subcategory: "",
    description: "",
    shortDescription: "",
    story: "",
    image: "",
    images: [],
    logo: "",
    rating: 5,
    reviewCount: 0,
    featured: false,
    premium: false,
    schedule: emptySchedule,
    contact: { phone: "", email: "", website: "", whatsapp: "" },
    location: { address: "", latitude: -34.421, longitude: -58.579, mapUrl: "" },
    products: [],
    tags: [],
    established: "" as unknown as number,
    social: { instagram: "", facebook: "", twitter: "" },
  };
}

function businessToForm(b: Business): BusinessFormValues {
  return {
    name: b.name,
    slug: b.slug,
    category: b.category,
    subcategory: b.subcategory || "",
    description: b.description,
    shortDescription: b.shortDescription,
    story: b.story,
    image: b.image || "",
    images: b.images || [],
    logo: b.logo || "",
    rating: b.rating,
    reviewCount: b.reviewCount,
    featured: b.featured,
    premium: b.premium,
    schedule: {
      monday: b.schedule.monday,
      tuesday: b.schedule.tuesday,
      wednesday: b.schedule.wednesday,
      thursday: b.schedule.thursday,
      friday: b.schedule.friday,
      saturday: b.schedule.saturday,
      sunday: b.schedule.sunday,
    },
    contact: b.contact,
    location: b.location,
    products: b.products || [],
    tags: b.tags || [],
    established: b.established || ("" as unknown as number),
    social: b.social || { instagram: "", facebook: "", twitter: "" },
  };
}

function formToBusiness(id: string, f: BusinessFormValues): Business {
  return {
    id,
    name: f.name,
    slug: f.slug,
    category: f.category,
    subcategory: f.subcategory || undefined,
    description: f.description,
    shortDescription: f.shortDescription,
    story: f.story,
    image: f.image || "",
    images: f.images || [],
    logo: f.logo || undefined,
    rating: f.rating,
    reviewCount: f.reviewCount,
    featured: f.featured,
    premium: f.premium,
    schedule: f.schedule as Business["schedule"],
    contact: f.contact as Business["contact"],
    location: f.location as Business["location"],
    products: f.products as Product[],
    tags: f.tags,
    established:
      f.established === ("" as unknown as number)
        ? undefined
        : (f.established as number),
    social: f.social as Business["social"],
  };
}

function generateTS(b: Business): string {
  return `{
    id: "${b.id}",
    name: "${b.name}",
    slug: "${b.slug}",
    category: "${b.category}",${b.subcategory ? `\n    subcategory: "${b.subcategory}",` : ""}
    description: ${JSON.stringify(b.description)},
    shortDescription: ${JSON.stringify(b.shortDescription)},
    story: ${JSON.stringify(b.story)},
    image: "${b.image}",
    images: ${JSON.stringify(b.images)},
    ${b.logo ? `logo: "${b.logo}",` : "// logo: undefined,"}
    rating: ${b.rating},
    reviewCount: ${b.reviewCount},
    featured: ${b.featured},
    premium: ${b.premium},
    schedule: ${JSON.stringify(b.schedule, null, 6).replace(/\n/g, "\n    ").replace(/}$/, "  }")},
    contact: ${JSON.stringify(b.contact, null, 6).replace(/\n/g, "\n    ").replace(/}$/, "  }")},
    location: ${JSON.stringify(b.location, null, 6).replace(/\n/g, "\n    ").replace(/}$/, "  }")},
    products: ${JSON.stringify(b.products, null, 6).replace(/\n/g, "\n    ").replace(/}$/, "  }")},
    tags: ${JSON.stringify(b.tags)},
    ${b.established ? `established: ${b.established},` : "// established: undefined,"}
    social: ${JSON.stringify(b.social, null, 6).replace(/\n/g, "\n    ").replace(/}$/, "  }")},
  }`;
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return <p className="mt-1 text-xs text-red-500">{error}</p>;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("Comercios");
  const [localBusinesses, setLocalBusinesses] = useState<Business[]>([]);
  const [form, setForm] = useState<BusinessFormValues>(defaultForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [tableSearch, setTableSearch] = useState("");
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({ general: true, schedule: false, contact: false, location: false, products: false, social: false });

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  useEffect(() => {
    fetch("/api/businesses")
      .then((r) => (r.ok ? r.json() : []))
      .then(setLocalBusinesses)
      .catch(() => {});
  }, []);

  const refreshList = useCallback(() => {
    fetch("/api/businesses")
      .then((r) => (r.ok ? r.json() : []))
      .then(setLocalBusinesses)
      .catch(() => {});
  }, []);

  function updateField<K extends keyof BusinessFormValues>(
    key: K,
    value: BusinessFormValues[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function updateNestedField(
    section: "schedule" | "contact" | "location" | "social",
    key: string,
    value: unknown,
  ) {
    setForm((prev) => {
      const sectionObj = prev[section] as Record<string, unknown>;
      return {
        ...prev,
        [section]: { ...sectionObj, [key]: value },
      } as BusinessFormValues;
    });
  }

  function toggleSection(section: string) {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  }

  function handleNameChange(name: string) {
    setForm((prev) => ({ ...prev, name, slug: slugify(name) }));
  }

  function addProduct() {
    const product: Product = {
      id: generateId(),
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
    };
    setForm((prev) => ({ ...prev, products: [...prev.products, product] }));
  }

  function updateProduct(idx: number, key: keyof Product, value: string) {
    setForm((prev) => {
      const products = [...prev.products];
      products[idx] = { ...products[idx], [key]: value };
      return { ...prev, products };
    });
  }

  function removeProduct(idx: number) {
    setForm((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== idx),
    }));
  }

  function addTag(tag: string) {
    const t = tag.trim().toLowerCase();
    if (t && !form.tags.includes(t)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, t] }));
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  }

  function addImage(url: string) {
    if (url.trim()) {
      setForm((prev) => ({ ...prev, images: [...prev.images, url.trim()] }));
    }
  }

  function removeImage(idx: number) {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  }

  function validate(): boolean {
    const result = businessFormSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const path = issue.path.join(".");
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  }

  async function handleSave() {
    if (!validate()) {
      showToast("Corregí los errores antes de guardar");
      return;
    }
    setSaving(true);
    const id = editingId || generateId();
    const business = formToBusiness(id, form);
    try {
      const res = await fetch("/api/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(business),
      });
      if (res.ok) {
        showToast(editingId ? "Comercio actualizado" : "Comercio creado");
        resetForm();
        refreshList();
      } else {
        const data = await res.json();
        showToast(data.error || "Error al guardar");
      }
    } catch {
      showToast("Error de conexión");
    }
    setSaving(false);
  }

  function resetForm() {
    setForm(defaultForm());
    setEditingId(null);
    setErrors({});
    setTagInput("");
  }

  function handleEdit(b: Business) {
    setForm(businessToForm(b));
    setEditingId(b.id);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este comercio?")) return;
    try {
      await fetch("/api/businesses", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      refreshList();
      showToast("Comercio eliminado");
    } catch {
      showToast("Error al eliminar");
    }
  }

  async function handleExport(b: Business) {
    const code = generateTS(b);
    try {
      await navigator.clipboard.writeText(code);
      showToast("Código TS copiado al portapapeles");
    } catch {
      showToast("No se pudo copiar");
    }
  }

  const filteredLocal = localBusinesses.filter(
    (b) =>
      b.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
      b.category.toLowerCase().includes(tableSearch.toLowerCase()),
  );

  function Section({
    title,
    section,
    children,
  }: {
    title: string;
    section: string;
    children: React.ReactNode;
  }) {
    const open = expandedSections[section] ?? false;
    return (
      <div className="rounded-2xl border border-carbon/5 bg-white shadow-premium overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection(section)}
          className="flex w-full items-center justify-between px-6 py-4 text-left"
        >
          <span className="text-sm font-semibold text-carbon">{title}</span>
          {open ? (
            <ChevronUp className="h-4 w-4 text-carbon/30" />
          ) : (
            <ChevronDown className="h-4 w-4 text-carbon/30" />
          )}
        </button>
        {open && <div className="px-6 pb-6 space-y-4">{children}</div>}
      </div>
    );
  }

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
                "flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
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
            {editingId && (
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="h-4 w-4 mr-1" />
                Cancelar edición
              </Button>
            )}
          </div>
        </header>

        <div className="p-6 space-y-6">
          {activeTab === "Dashboard" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Comercios", value: localBusinesses.length.toString(), change: "Local" },
                { label: "Categorías", value: categories.length.toString(), change: "Estático" },
                { label: "Planes activos", value: "3", change: "Estático" },
                { label: "Entorno", value: process.env.NODE_ENV === "development" ? "Dev" : "Prod", change: "" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-carbon/5 bg-white p-5 shadow-premium"
                >
                  <p className="text-sm text-carbon/40">{stat.label}</p>
                  <p className="mt-2 font-display text-3xl font-bold text-carbon">
                    {stat.value}
                  </p>
                  {stat.change && (
                    <span className="mt-1 inline-block text-xs font-medium text-delta">
                      {stat.change}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "Comercios" && (
            <>
              <div className="rounded-2xl border border-carbon/5 bg-white shadow-premium overflow-hidden">
                <div className="border-b border-carbon/5 bg-gradient-to-r from-rio/5 to-transparent px-6 py-4">
                  <h2 className="font-display text-base font-bold text-carbon">
                    {editingId ? "Editar comercio" : "Nuevo comercio"}
                  </h2>
                  <p className="mt-1 text-xs text-carbon/40">
                    Los datos se guardan en{" "}
                    <code className="rounded bg-carbon/5 px-1.5 py-0.5 font-mono text-rio">
                      data/businesses.local.json
                    </code>{" "}
                    (solo en <code className="rounded bg-carbon/5 px-1.5 py-0.5 font-mono">npm run dev</code>).
                    Para producción, copiá el contenido a{" "}
                    <code className="rounded bg-carbon/5 px-1.5 py-0.5 font-mono">data/businesses.ts</code>.
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  <Section title="Información general" section="general">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                          Nombre *
                        </label>
                        <input
                          value={form.name}
                          onChange={(e) => handleNameChange(e.target.value)}
                          placeholder="Ej: Casa Delta"
                          className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30"
                        />
                        <FieldError error={errors["name"]} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                          Slug *
                        </label>
                        <input
                          value={form.slug}
                          onChange={(e) => updateField("slug", e.target.value as never)}
                          placeholder="casa-delta"
                          className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30 font-mono text-rio"
                        />
                        <FieldError error={errors["slug"]} />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                          Categoría *
                        </label>
                        <select
                          value={form.category}
                          onChange={(e) => updateField("category", e.target.value as never)}
                          className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10"
                        >
                          <option value="">Seleccionar categoría</option>
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                        <FieldError error={errors["category"]} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                          Subcategoría
                        </label>
                        <input
                          value={form.subcategory || ""}
                          onChange={(e) => updateField("subcategory", e.target.value as never)}
                          placeholder="Opcional"
                          className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                        Descripción corta *
                      </label>
                      <input
                        value={form.shortDescription}
                        onChange={(e) => updateField("shortDescription", e.target.value as never)}
                        placeholder="Breve descripción para las cards"
                        className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30"
                      />
                      <FieldError error={errors["shortDescription"]} />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                        Descripción completa *
                      </label>
                      <textarea
                        value={form.description}
                        onChange={(e) => updateField("description", e.target.value as never)}
                        rows={4}
                        placeholder="Descripción detallada del comercio"
                        className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30"
                      />
                      <FieldError error={errors["description"]} />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                        Historia *
                      </label>
                      <textarea
                        value={form.story}
                        onChange={(e) => updateField("story", e.target.value as never)}
                        rows={4}
                        placeholder="La historia detrás del comercio"
                        className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30"
                      />
                      <FieldError error={errors["story"]} />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                          Año de fundación
                        </label>
                        <input
                          type="number"
                          value={form.established === ("" as unknown as number) ? "" : form.established}
                          onChange={(e) =>
                            updateField(
                              "established",
                              (e.target.value ? Number(e.target.value) : "") as never,
                            )
                          }
                          placeholder="Ej: 2005"
                          className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30"
                        />
                      </div>
                      <div />
                    </div>

                    <div className="flex gap-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.featured}
                          onChange={(e) => updateField("featured", e.target.checked as never)}
                          className="h-5 w-5 rounded border-carbon/20 text-rio focus:ring-rio/30"
                        />
                        <span className="text-sm font-medium text-carbon">Destacado</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.premium}
                          onChange={(e) => updateField("premium", e.target.checked as never)}
                          className="h-5 w-5 rounded border-carbon/20 text-rio focus:ring-rio/30"
                        />
                        <span className="text-sm font-medium text-carbon">Premium</span>
                      </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                          Rating
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          value={form.rating}
                          onChange={(e) => updateField("rating", Number(e.target.value) as never)}
                          className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                          Reviews
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={form.reviewCount}
                          onChange={(e) =>
                            updateField("reviewCount", Number(e.target.value) as never)
                          }
                          className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                        Imagen principal (URL)
                      </label>
                      <input
                        value={form.image}
                        onChange={(e) => updateField("image", e.target.value as never)}
                        placeholder="https://..."
                        className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30 font-mono text-xs"
                      />
                      <FieldError error={errors["image"]} />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                        Galería de imágenes (URLs)
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          id="new-image-url"
                          placeholder="https://..."
                          className="flex-1 rounded-xl border border-carbon/10 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30 font-mono text-xs"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              addImage((e.target as HTMLInputElement).value);
                              (e.target as HTMLInputElement).value = "";
                            }
                          }}
                        />
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            const el = document.getElementById("new-image-url") as HTMLInputElement;
                            if (el) {
                              addImage(el.value);
                              el.value = "";
                            }
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {form.images.map((url, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-rio/5 px-3 py-1.5 text-xs text-rio"
                          >
                            <span className="max-w-[200px] truncate">{url}</span>
                            <button
                              onClick={() => removeImage(idx)}
                              className="text-rio/40 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                        Logo (URL)
                      </label>
                      <input
                        value={form.logo || ""}
                        onChange={(e) => updateField("logo", e.target.value as never)}
                        placeholder="https://..."
                        className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30 font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                        Tags
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {form.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded-full bg-rio/10 px-3 py-1 text-xs font-medium text-rio"
                          >
                            {tag}
                            <button
                              onClick={() => removeTag(tag)}
                              className="text-rio/40 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTag(tagInput);
                            }
                            if (e.key === "," || e.key === " ") {
                              e.preventDefault();
                              addTag(tagInput.replace(/,/g, ""));
                            }
                          }}
                          placeholder="Escribí un tag y presioná Enter"
                          className="flex-1 rounded-xl border border-carbon/10 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30"
                        />
                      </div>
                    </div>
                  </Section>

                  <Section title="Horarios" section="schedule">
                    {Object.entries(dayLabels).map(([key, label]) => {
                      const day = form.schedule[key as keyof typeof form.schedule];
                      return (
                        <div key={key} className="flex items-center gap-4">
                          <span className="w-24 text-sm font-medium text-carbon">
                            {label}
                          </span>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={day?.closed || false}
                              onChange={(e) => {
                                const closed = e.target.checked;
                                updateNestedField("schedule", key as keyof typeof form.schedule, {
                                  open: closed ? "" : day?.open || "10:00",
                                  close: closed ? "" : day?.close || "19:00",
                                  closed,
                                } as never);
                              }}
                              className="h-4 w-4 rounded border-carbon/20 text-rio focus:ring-rio/30"
                            />
                            <span className="text-xs text-carbon/40">Cerrado</span>
                          </label>
                          {(!day?.closed) && (
                            <div className="flex items-center gap-2">
                              <input
                                type="time"
                                value={day?.open || "10:00"}
                                onChange={(e) =>
                                  updateNestedField("schedule", key as keyof typeof form.schedule, {
                                    ...day,
                                    open: e.target.value,
                                    closed: false,
                                  } as never)
                                }
                                className="rounded-lg border border-carbon/10 px-3 py-1.5 text-sm outline-none focus:border-rio/30 focus:ring-2 focus:ring-rio/10"
                              />
                              <span className="text-xs text-carbon/30">a</span>
                              <input
                                type="time"
                                value={day?.close || "19:00"}
                                onChange={(e) =>
                                  updateNestedField("schedule", key as keyof typeof form.schedule, {
                                    ...day,
                                    close: e.target.value,
                                    closed: false,
                                  } as never)
                                }
                                className="rounded-lg border border-carbon/10 px-3 py-1.5 text-sm outline-none focus:border-rio/30 focus:ring-2 focus:ring-rio/10"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </Section>

                  <Section title="Contacto" section="contact">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                          Teléfono *
                        </label>
                        <input
                          value={form.contact.phone}
                          onChange={(e) =>
                            updateNestedField("contact", "phone", e.target.value as never)
                          }
                          placeholder="11 4728-3940"
                          className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30"
                        />
                        <FieldError error={errors["contact.phone"]} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                          WhatsApp *
                        </label>
                        <input
                          value={form.contact.whatsapp}
                          onChange={(e) =>
                            updateNestedField("contact", "whatsapp", e.target.value as never)
                          }
                          placeholder="5491147283940"
                          className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30 font-mono text-xs"
                        />
                        <FieldError error={errors["contact.whatsapp"]} />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                          Email
                        </label>
                        <input
                          value={form.contact.email || ""}
                          onChange={(e) =>
                            updateNestedField("contact", "email", e.target.value as never)
                          }
                          placeholder="info@ejemplo.com"
                          className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                          Sitio web
                        </label>
                        <input
                          value={form.contact.website || ""}
                          onChange={(e) =>
                            updateNestedField("contact", "website", e.target.value as never)
                          }
                          placeholder="https://..."
                          className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30 font-mono text-xs"
                        />
                      </div>
                    </div>
                  </Section>

                  <Section title="Ubicación" section="location">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                        Dirección *
                      </label>
                      <input
                        value={form.location.address}
                        onChange={(e) =>
                          updateNestedField("location", "address", e.target.value as never)
                        }
                        placeholder="Local 42, Puerto de Frutos, Tigre"
                        className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30"
                      />
                      <FieldError error={errors["location.address"]} />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                          Latitud
                        </label>
                        <input
                          type="number"
                          step="0.0001"
                          value={form.location.latitude}
                          onChange={(e) =>
                            updateNestedField(
                              "location",
                              "latitude",
                              Number(e.target.value) as never,
                            )
                          }
                          className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                          Longitud
                        </label>
                        <input
                          type="number"
                          step="0.0001"
                          value={form.location.longitude}
                          onChange={(e) =>
                            updateNestedField(
                              "location",
                              "longitude",
                              Number(e.target.value) as never,
                            )
                          }
                          className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                        URL del mapa
                      </label>
                      <input
                        value={form.location.mapUrl || ""}
                        onChange={(e) =>
                          updateNestedField("location", "mapUrl", e.target.value as never)
                        }
                        placeholder="https://maps.google.com/?q=..."
                        className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30 font-mono text-xs"
                      />
                    </div>
                  </Section>

                  <Section title={`Productos (${form.products.length})`} section="products">
                    {form.products.map((product, idx) => (
                      <div
                        key={product.id}
                        className="rounded-xl border border-carbon/5 bg-arena/30 p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-carbon/40 uppercase">
                            Producto #{idx + 1}
                          </span>
                          <button
                            onClick={() => removeProduct(idx)}
                            className="text-xs text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <input
                              value={product.name}
                              onChange={(e) => updateProduct(idx, "name", e.target.value)}
                              placeholder="Nombre del producto"
                              className="w-full rounded-lg border border-carbon/10 bg-white px-3 py-2 text-sm outline-none focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30"
                            />
                          </div>
                          <div>
                            <input
                              value={product.price || ""}
                              onChange={(e) => updateProduct(idx, "price", e.target.value)}
                              placeholder="Precio (Ej: $12.500)"
                              className="w-full rounded-lg border border-carbon/10 bg-white px-3 py-2 text-sm outline-none focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30"
                            />
                          </div>
                        </div>
                        <div>
                          <input
                            value={product.description}
                            onChange={(e) => updateProduct(idx, "description", e.target.value)}
                            placeholder="Descripción del producto"
                            className="w-full rounded-lg border border-carbon/10 bg-white px-3 py-2 text-sm outline-none focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30"
                          />
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <input
                              value={product.category}
                              onChange={(e) => updateProduct(idx, "category", e.target.value)}
                              placeholder="Categoría del producto"
                              className="w-full rounded-lg border border-carbon/10 bg-white px-3 py-2 text-sm outline-none focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30"
                            />
                          </div>
                          <div>
                            <input
                              value={product.image || ""}
                              onChange={(e) => updateProduct(idx, "image", e.target.value)}
                              placeholder="URL de imagen"
                              className="w-full rounded-lg border border-carbon/10 bg-white px-3 py-2 text-sm outline-none focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30 font-mono text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={addProduct}
                      icon={<Plus className="h-4 w-4" />}
                    >
                      Agregar producto
                    </Button>
                  </Section>

                  <Section title="Redes sociales" section="social">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                          Instagram
                        </label>
                        <input
                          value={form.social.instagram || ""}
                          onChange={(e) =>
                            updateNestedField("social", "instagram", e.target.value as never)
                          }
                          placeholder="@usuario"
                          className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                          Facebook
                        </label>
                        <input
                          value={form.social.facebook || ""}
                          onChange={(e) =>
                            updateNestedField("social", "facebook", e.target.value as never)
                          }
                          placeholder="NombreDePagina"
                          className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
                          Twitter
                        </label>
                        <input
                          value={form.social.twitter || ""}
                          onChange={(e) =>
                            updateNestedField("social", "twitter", e.target.value as never)
                          }
                          placeholder="@usuario"
                          className="w-full rounded-xl border border-carbon/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30"
                        />
                      </div>
                    </div>
                  </Section>

                  <div className="flex items-center gap-3 pt-2 border-t border-carbon/5">
                    <Button
                      variant="primary"
                      size="md"
                      icon={<Save className="h-4 w-4" />}
                      loading={saving}
                      onClick={handleSave}
                    >
                      {editingId ? "Actualizar comercio" : "Guardar comercio"}
                    </Button>
                    {editingId && (
                      <Button variant="ghost" size="md" onClick={resetForm}>
                        Cancelar
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-carbon/5 bg-white shadow-premium overflow-hidden">
                <div className="flex items-center justify-between border-b border-carbon/5 px-6 py-4">
                  <h2 className="text-sm font-semibold text-carbon">
                    Comercios guardados ({localBusinesses.length})
                  </h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-carbon/30" />
                    <input
                      type="text"
                      placeholder="Buscar..."
                      value={tableSearch}
                      onChange={(e) => setTableSearch(e.target.value)}
                      className="rounded-xl border border-carbon/10 bg-arena/30 py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  {filteredLocal.length === 0 ? (
                    <div className="px-6 py-12 text-center text-sm text-carbon/30">
                      {localBusinesses.length === 0
                        ? "Todavía no hay comercios guardados. Completá el formulario de arriba."
                        : "No se encontraron comercios con ese término."}
                    </div>
                  ) : (
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-carbon/5 text-xs text-carbon/40 uppercase tracking-wider">
                          <th className="px-6 py-4 font-medium">Comercio</th>
                          <th className="px-6 py-4 font-medium">Categoría</th>
                          <th className="px-6 py-4 font-medium">Premium</th>
                          <th className="px-6 py-4 font-medium">Rating</th>
                          <th className="px-6 py-4 font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLocal.map((b) => (
                          <tr
                            key={b.id}
                            className="border-b border-carbon/5 transition-colors hover:bg-arena/30"
                          >
                            <td className="px-6 py-4">
                              <span className="font-medium text-carbon">{b.name}</span>
                            </td>
                            <td className="px-6 py-4 text-carbon/50">{b.category}</td>
                            <td className="px-6 py-4">
                              {b.premium ? (
                                <span className="rounded-full bg-rio/10 px-2.5 py-0.5 text-xs font-medium text-rio">
                                  Premium
                                </span>
                              ) : b.featured ? (
                                <span className="rounded-full bg-delta/10 px-2.5 py-0.5 text-xs font-medium text-delta">
                                  Destacado
                                </span>
                              ) : (
                                <span className="text-xs text-carbon/30">—</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span className="flex items-center gap-1 text-carbon/60">
                                <span className="text-amber-500">★</span>
                                {b.rating}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEdit(b)}
                                  className="rounded-lg p-1.5 text-carbon/30 transition-colors hover:bg-carbon/5 hover:text-carbon"
                                  title="Editar"
                                >
                                  <Edit3 className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleExport(b)}
                                  className="rounded-lg p-1.5 text-carbon/30 transition-colors hover:bg-rio/5 hover:text-rio"
                                  title="Exportar a TypeScript"
                                >
                                  <Copy className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(b.id)}
                                  className="rounded-lg p-1.5 text-carbon/30 transition-colors hover:bg-red-50 hover:text-red-500"
                                  title="Eliminar"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </>
          )}

          {(activeTab !== "Dashboard" && activeTab !== "Comercios") && (
            <div className="rounded-2xl border border-carbon/5 bg-white p-12 text-center shadow-premium">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-arena">
                <LayoutGrid className="h-8 w-8 text-rio/40" />
              </div>
              <h3 className="font-display text-lg font-bold text-carbon">
                {activeTab}
              </h3>
              <p className="mt-2 text-sm text-carbon/40">
                Sección en preparación.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-carbon/5 px-6 py-4 text-center">
          <span className="text-xs text-carbon/20">
            Panel de administración — {process.env.NODE_ENV === "development" ? "Desarrollo" : "Producción"}
          </span>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2 rounded-2xl bg-rio px-5 py-3 shadow-premium-xl">
            <Check className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}
