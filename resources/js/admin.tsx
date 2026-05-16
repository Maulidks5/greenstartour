import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp, Link, router, usePage } from "@inertiajs/react";
import "../../src/index.css";
import { formatReadableDate } from "../../src/lib/dateFormat";

type Stats = {
  totalTours: number;
  totalHotels: number;
  totalBookings: number;
  hotelBookings: number;
  transportRequests: number;
  transportServices: number;
  pendingInquiries: number;
  galleryImages: number;
  testimonials: number;
  partnershipRequests: number;
};

type Field = {
  name: string;
  label: string;
  type: "text" | "number" | "password" | "textarea" | "select" | "checkbox" | "image" | "images";
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: Array<string | { id: number | string; name: string }>;
};

type RecordItem = Record<string, any> & { id: number; status?: string };
type RequestCounts = {
  bookings?: number;
  hotelBookings?: number;
  transportBookings?: number;
  inquiries?: number;
  partnershipRequests?: number;
  testimonials?: number;
};
type NavLink = [string, string, keyof RequestCounts?];

type PageProps = {
  auth?: { user?: { name: string; email: string; role: string } };
  flash?: { error?: string; success?: string };
  errors?: Record<string, string>;
  stats?: Stats;
  latestBookings?: RecordItem[];
  latestRequests?: RecordItem[];
  title?: string;
  resource?: string;
  records?: RecordItem[];
  fields?: Field[];
  columns?: string[];
  statusOnly?: boolean;
  requestCounts?: RequestCounts;
};

const pages: Record<string, React.ComponentType<any>> = {
  "Admin/Login": Login,
  "Admin/Dashboard": Dashboard,
  "Admin/ResourceIndex": ResourceIndex,
};

createInertiaApp({
  resolve: (name) => pages[name],
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});

function Login() {
  const { flash } = usePage<PageProps>().props;
  const [email, setEmail] = React.useState("admin@example.com");
  const [password, setPassword] = React.useState("password");
  const [processing, setProcessing] = React.useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);
    router.post("/admin/login", { email, password }, { onFinish: () => setProcessing(false) });
  };

  return (
    <div className="min-h-screen bg-secondary/40 px-4 py-12">
      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-5xl items-center gap-8 lg:grid-cols-2">
        <div>
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-accent">Admin Portal</div>
          <h1 className="font-display text-5xl font-semibold text-primary">Green Star Island</h1>
          <p className="mt-4 max-w-lg text-muted-foreground">Manage tours, bookings, inquiries, galleries, testimonials, and partnerships.</p>
        </div>
        <form onSubmit={submit} className="rounded-2xl border border-border/70 bg-white p-8 shadow-luxury">
          <h2 className="font-display text-3xl font-semibold text-primary">Admin Login</h2>
          {flash?.error && <Notice tone="error">{flash.error}</Notice>}
          <label className="mt-6 block">
            <span className="admin-label">Email</span>
            <input className="admin-input" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label className="mt-4 block">
            <span className="admin-label">Password</span>
            <input className="admin-input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <button disabled={processing} className="mt-6 h-12 w-full rounded-full gradient-gold font-bold text-primary shadow-gold disabled:opacity-60">
            {processing ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { auth, requestCounts = {} } = usePage<PageProps>().props;
  const isFullAdmin = auth?.user?.role === "admin";
  const navGroups: Array<{ title: string; links: NavLink[] }> = [
    {
      title: "Overview",
      links: [["Dashboard", "/admin/dashboard"]],
    },
    ...(isFullAdmin
      ? [
          {
            title: "Website Content",
            links: [
              ["Hero Slides", "/admin/hero-slides"],
              ["Tours", "/admin/tours"],
              ["Hotels", "/admin/hotels"],
              ["Transport Services", "/admin/transport-services"],
              ["Transport Routes", "/admin/transport-routes"],
              ["Categories", "/admin/categories"],
              ["Gallery", "/admin/gallery"],
            ],
          },
        ]
      : []),
    {
      title: "Customer Requests",
      links: [
        ["Tour Bookings", "/admin/bookings", "bookings"],
        ["Hotel Bookings", "/admin/hotel-bookings", "hotelBookings"],
        ["Transport Requests", "/admin/transport-bookings", "transportBookings"],
        ["Contact Inquiries", "/admin/inquiries", "inquiries"],
        ["Testimonials", "/admin/testimonials", "testimonials"],
        ["Partnerships", "/admin/partnership-requests", "partnershipRequests"],
      ],
    },
    ...(isFullAdmin
      ? [
          {
            title: "Administration",
            links: [
              ["Users", "/admin/users"],
              ["Site Settings", "/admin/site-settings"],
            ],
          },
        ]
      : []),
  ];
  const current = typeof window !== "undefined" ? window.location.pathname : "";
  const flatLinks = navGroups.flatMap((group) => group.links);

  return (
    <div className="min-h-screen bg-island-green-soft/50">
      <aside className="fixed inset-y-0 left-0 hidden w-72 overflow-y-auto border-r border-white/10 bg-primary text-white lg:block">
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[hsl(var(--island-green))]/35 to-transparent" />
        <div className="relative p-6">
          <div className="font-display text-3xl font-semibold">Green Star</div>
          <div className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-accent">Travel Admin</div>
        </div>
        <nav className="relative space-y-6 px-4 pb-8">
          {navGroups.map((group) => (
            <div key={group.title}>
              <div className="mb-2 px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">{group.title}</div>
              <div className="space-y-1">
                {group.links.map(([label, href, countKey]) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex min-h-11 items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      current === href ? "bg-white text-primary shadow-green" : "text-white/75 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{label}</span>
                    <CountBadge count={countKey ? requestCounts[countKey] : 0} active={current === href} />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
      <main className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-border/70 bg-white/95 backdrop-blur">
          <div className="flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent lg:hidden">Green Star Admin</div>
              <div className="text-sm font-semibold text-primary">{auth?.user?.name}</div>
              <div className="text-xs text-muted-foreground">{auth?.user?.email}</div>
              </div>
              <button onClick={() => router.post("/admin/logout")} className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white md:hidden">
                Logout
              </button>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                className="admin-input h-12 lg:hidden"
                value={flatLinks.find(([, href]) => href === current)?.[1] ?? "/admin/dashboard"}
                onChange={(event) => router.visit(event.target.value)}
              >
                {navGroups.map((group) => (
                  <optgroup key={group.title} label={group.title}>
                    {group.links.map(([label, href, countKey]) => {
                      const count = countKey ? requestCounts[countKey] || 0 : 0;
                      return <option key={href} value={href}>{count > 0 ? `${label} (${count})` : label}</option>;
                    })}
                  </optgroup>
                ))}
              </select>
              <button onClick={() => router.post("/admin/logout")} className="hidden rounded-full bg-primary px-5 py-2 text-sm font-bold text-white md:inline-flex">
              Logout
            </button>
            </div>
          </div>
        </header>
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}

function CountBadge({ count = 0, active = false }: { count?: number; active?: boolean }) {
  if (!count) return null;

  return (
    <span className={`min-w-6 rounded-full px-2 py-0.5 text-center text-[11px] font-extrabold ${
      active ? "bg-island-green text-white" : "bg-accent text-primary shadow-gold"
    }`}>
      {count > 99 ? "99+" : count}
    </span>
  );
}

function Dashboard({ stats, latestRequests = [] }: PageProps) {
  const cards = [
    ["Tours", stats?.totalTours ?? 0, "Website Content"],
    ["Hotels", stats?.totalHotels ?? 0, "Website Content"],
    ["Transport Services", stats?.transportServices ?? 0, "Website Content"],
    ["Tour Bookings", stats?.totalBookings ?? 0, "Customer Requests"],
    ["Hotel Bookings", stats?.hotelBookings ?? 0, "Customer Requests"],
    ["Transport", stats?.transportRequests ?? 0, "Customer Requests"],
    ["Pending Inquiries", stats?.pendingInquiries ?? 0, "Needs Attention"],
    ["Gallery Images", stats?.galleryImages ?? 0, "Media"],
    ["Testimonials", stats?.testimonials ?? 0, "Trust"],
    ["Partnerships", stats?.partnershipRequests ?? 0, "Business"],
  ];

  return (
    <AdminLayout>
      <PageTitle title="Dashboard" subtitle="Quick overview of website content and customer requests." />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map(([label, value, caption]) => (
          <div key={label} className="rounded-2xl border border-border/70 bg-white p-5 shadow-card-luxury transition-shadow hover:shadow-green md:p-6">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{caption}</div>
            <div className="mt-2 text-sm font-bold text-primary">{label}</div>
            <div className="mt-4 font-display text-4xl font-semibold text-primary md:text-5xl">{value}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-border/70 bg-white p-5 shadow-card-luxury md:p-6">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-2xl font-semibold text-primary md:text-3xl">Latest Requests</h2>
            <p className="mt-1 text-sm text-muted-foreground">Tour, hotel, and transport requests in one place.</p>
          </div>
          <Link href="/admin/bookings" className="text-sm font-bold text-accent hover:text-primary">View bookings</Link>
        </div>
        <div className="mt-5 divide-y divide-border">
          {latestRequests.length === 0 && <div className="py-6 text-sm text-muted-foreground">No customer requests yet.</div>}
          {latestRequests.map((request) => (
            <div key={request.id} className="grid gap-3 py-4 md:grid-cols-[150px_1fr_auto] md:items-center">
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-accent">{request.type}</div>
              <div>
                <div className="font-semibold text-primary">{request.name}</div>
                <div className="text-sm text-muted-foreground">{request.service} · {request.contact}</div>
              </div>
              <StatusBadge status={request.status} />
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

function ResourceIndex({ title = "Resource", resource = "", records = [], fields = [], columns = [], statusOnly = false }: PageProps) {
  const { flash, errors = {} } = usePage<PageProps>().props;
  const [query, setQuery] = React.useState("");
  const [editing, setEditing] = React.useState<RecordItem | null>(null);
  const [form, setForm] = React.useState<Record<string, any>>(initialForm(fields));
  const [modalOpen, setModalOpen] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);

  React.useEffect(() => {
    setQuery("");
    setEditing(null);
    setForm(initialForm(fields));
    setModalOpen(false);
  }, [resource]);

  const filtered = React.useMemo(() => {
    const needle = query.toLowerCase();
    return records.filter((record) => JSON.stringify(record).toLowerCase().includes(needle));
  }, [records, query]);

  const startCreate = () => {
    setEditing(null);
    setForm(initialForm(fields));
    setModalOpen(true);
  };

  const startEdit = (record: RecordItem) => {
    setEditing(record);
    setForm({ ...initialForm(fields), ...record });
    setModalOpen(true);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);
    const payload = normalizePayload(form, fields);
    const options = {
      onFinish: () => setProcessing(false),
      onSuccess: () => setModalOpen(false),
      preserveScroll: true,
      forceFormData: true,
    };
    if (editing) {
      router.post(`/admin/${resource}/${editing.id}`, { ...payload, _method: "put" }, options);
    } else {
      router.post(`/admin/${resource}`, payload, options);
    }
  };

  const destroy = (record: RecordItem) => {
    if (confirm(`Delete this ${title.toLowerCase()} record?`)) {
      router.delete(`/admin/${resource}/${record.id}`, { preserveScroll: true });
    }
  };

  return (
    <AdminLayout>
      <PageTitle title={title} subtitle={statusOnly ? "Review requests and update their status." : "Create, edit, and organize public website content."} />
      {flash?.success && <Notice tone="success">{flash.success}</Notice>}
      {flash?.error && <Notice tone="error">{flash.error}</Notice>}

      <div className="grid gap-6">
        <section className="rounded-2xl border border-border/70 bg-white shadow-card-luxury">
          <div className="flex flex-col gap-4 border-b border-border/70 p-4 md:flex-row md:items-center md:justify-between md:p-5">
            <div className="flex-1">
              <input
                className="admin-input md:max-w-sm"
                placeholder={`Search ${title.toLowerCase()}...`}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <div className="mt-2 text-xs font-semibold text-muted-foreground">
                {filtered.length} of {records.length} record{records.length === 1 ? "" : "s"}
              </div>
            </div>
            {!statusOnly && (
              <button onClick={startCreate} className="h-12 rounded-full bg-island-green px-5 text-sm font-bold text-white shadow-green transition-colors hover:bg-island-deep md:h-10">
                Add New
              </button>
            )}
          </div>
          <div className="overflow-x-auto rounded-b-2xl">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-island-green-soft text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  {columns.map((column) => <th key={column} className="px-5 py-4">{labelize(column)}</th>)}
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={columns.length + 1} className="px-5 py-10 text-center text-muted-foreground">No records found.</td>
                  </tr>
                )}
                {filtered.map((record) => (
                  <tr key={record.id} className={`align-top transition-colors hover:bg-secondary/25 ${editing?.id === record.id ? "bg-secondary/35" : ""}`}>
                    {columns.map((column) => (
                      <td key={column} className="max-w-[260px] px-5 py-4 text-primary">
                        {column === "status" ? (
                          <StatusBadge status={record.status} />
                        ) : column === "gallery_images" ? (
                          <GalleryThumbs value={record.gallery_images} />
                        ) : isImageColumn(column) ? (
                          <ImageThumb src={displayValue(record, column)} />
                        ) : (
                          displayValue(record, column)
                        )}
                      </td>
                    ))}
                    <td className="px-5 py-4 text-right">
                      <button onClick={() => startEdit(record)} className="mr-2 min-h-9 rounded-full border border-border px-3 py-1.5 text-xs font-bold text-primary hover:bg-island-green-soft">
                        {statusOnly ? "View / Status" : "Edit"}
                      </button>
                      <button onClick={() => destroy(record)} className="min-h-9 rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive hover:bg-destructive/15">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {statusOnly && !modalOpen && (
          <div className="rounded-2xl border border-border/70 bg-white p-5 text-sm text-muted-foreground shadow-card-luxury">
            Choose a request from the table to see customer details, message, and update the status.
          </div>
        )}
      </div>

      {modalOpen && (
        <AdminModal title={editing ? (statusOnly ? "Request Details" : `Edit ${title}`) : `Add ${title}`} onClose={() => setModalOpen(false)}>
          <form onSubmit={submit} className="space-y-4">
            {Object.keys(errors).length > 0 && (
              <div className="rounded-xl bg-destructive/10 p-3 text-sm font-semibold text-destructive">
                {Object.values(errors)[0]}
              </div>
            )}
            {editing && <RecordDetails record={editing} />}
            {fields.map((field) => (
              <AdminField key={field.name} field={field} form={form} value={form[field.name]} onChange={(value) => setForm((current) => ({ ...current, [field.name]: value }))} />
            ))}
            {editing && statusOnly && <WhatsAppGuestLink record={{ ...editing, ...form }} />}
            <div className="grid gap-2 pt-2 sm:grid-cols-2">
              <button disabled={processing} className="h-12 rounded-full gradient-green font-bold text-white shadow-green disabled:opacity-60">
                {processing ? "Saving..." : statusOnly ? "Save & Notify Guest" : editing ? "Save Changes" : "Create Record"}
              </button>
              <button type="button" onClick={() => setModalOpen(false)} className="h-12 rounded-full border border-border text-sm font-bold text-primary hover:bg-island-green-soft">
                Close
              </button>
            </div>
          </form>
        </AdminModal>
      )}
    </AdminLayout>
  );
}

function AdminField({ field, form, value, onChange }: { field: Field; form?: Record<string, any>; value: any; onChange: (value: any) => void }) {
  const [imageBusy, setImageBusy] = React.useState(false);
  const [imageError, setImageError] = React.useState("");
  const galleryValue = Array.isArray(value) ? value : value ? [value] : [];
  const isCurrencyValue = field.name === "value" && form?.key === "currency_symbol";

  return (
    <label className="block">
      <span className="admin-label">{field.label}</span>
      {isCurrencyValue && (
        <select className="admin-input" required={field.required} value={value ?? ""} onChange={(event) => onChange(event.target.value)}>
          <option value="">Choose currency...</option>
          <option value="€">€ Euro</option>
          <option value="$">$ US Dollar</option>
          <option value="£">£ Pound</option>
          <option value="TZS">TZS Tanzanian Shilling</option>
        </select>
      )}
      {field.type === "textarea" && !isCurrencyValue && (
        <textarea
          className="admin-input min-h-28 py-3"
          placeholder={field.placeholder}
          required={field.required}
          value={Array.isArray(value) ? value.join("\n") : value ?? ""}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {field.type === "select" && (
        <select className="admin-input" required={field.required} value={value ?? ""} onChange={(event) => onChange(event.target.value)}>
          <option value="">Choose...</option>
          {(field.options ?? []).map((option) => {
            const item = typeof option === "string" ? { id: option, name: option } : option;
            return <option key={item.id} value={item.id}>{item.name}</option>;
          })}
        </select>
      )}
      {field.type === "checkbox" && (
        <input className="h-5 w-5 rounded border-border text-accent" type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} />
      )}
      {field.type === "image" && (
        <div className="space-y-3">
          {typeof value === "string" && value && <ImageThumb src={value} large />}
          {value instanceof File && (
            <FilePreview file={value} />
          )}
          <input
            className="admin-input h-auto py-2"
            accept="image/*"
            required={field.required && !value}
            type="file"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;

              setImageBusy(true);
              setImageError("");

              try {
                const compressed = await compressImage(file);
                onChange(compressed);
              } catch {
                setImageError("Image could not be prepared. Please choose another JPG, PNG, or WebP.");
              } finally {
                setImageBusy(false);
              }
            }}
          />
          {imageBusy && <p className="text-xs font-semibold text-accent">Preparing image...</p>}
          {imageError && <p className="text-xs font-semibold text-destructive">{imageError}</p>}
          <p className="text-xs text-muted-foreground">Upload JPG, PNG, or WebP. Large images are compressed automatically.</p>
        </div>
      )}
      {field.type === "images" && (
        <div className="space-y-3">
          {galleryValue.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {galleryValue.map((item, index) => (
              <div key={`${typeof item === "string" ? item : item.name}-${index}`} className="rounded-xl border border-border bg-island-green-soft/50 p-2">
                  {typeof item === "string" ? (
                    <ImageThumb src={item} large />
                  ) : (
                    <FilePreview file={item} />
                  )}
                  <button
                    type="button"
                    onClick={() => onChange(galleryValue.filter((_, itemIndex) => itemIndex !== index))}
                    className="mt-2 w-full rounded-full bg-white px-3 py-1.5 text-xs font-bold text-destructive hover:bg-destructive/10"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-island-green-soft/50 p-4 text-sm text-muted-foreground">
              No gallery images yet.
            </div>
          )}
          <input
            className="admin-input h-auto py-2"
            accept="image/*"
            multiple
            type="file"
            onChange={async (event) => {
              const files = Array.from(event.target.files ?? []);
              if (files.length === 0) return;

              setImageBusy(true);
              setImageError("");

              const prepared: File[] = [];
              let failed = 0;

              for (const file of files) {
                try {
                  prepared.push(await compressImage(file));
                } catch {
                  failed += 1;
                }
              }

              if (prepared.length > 0) onChange([...galleryValue, ...prepared]);
              if (failed > 0) setImageError(`${failed} image${failed === 1 ? "" : "s"} could not be prepared. Please use JPG, PNG, WebP, or JPEG.`);
              event.currentTarget.value = "";
              setImageBusy(false);
            }}
          />
          {imageBusy && <p className="text-xs font-semibold text-accent">Preparing gallery images...</p>}
          {imageError && <p className="text-xs font-semibold text-destructive">{imageError}</p>}
          <p className="text-xs text-muted-foreground">Select multiple images. Drag order is not needed yet: remove and upload again to reorder.</p>
        </div>
      )}
      {(field.type === "text" || field.type === "number" || field.type === "password") && (
        <input
          autoComplete={field.type === "password" ? "new-password" : undefined}
          className="admin-input"
          placeholder={field.placeholder}
          required={field.required}
          type={field.type}
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {field.help && <p className="mt-2 text-xs font-medium text-muted-foreground">{field.help}</p>}
    </label>
  );
}

function compressImage(file: File): Promise<File> {
  if (!isAcceptableImage(file)) {
    return Promise.reject(new Error("Not an image"));
  }

  if (keepsTransparency(file)) {
    return Promise.resolve(file);
  }

  return new Promise((resolve, reject) => {
    const image = new Image();
    const reader = new FileReader();

    reader.onerror = () => resolve(file);
    reader.onload = () => {
      image.onerror = () => resolve(file);
      image.onload = () => {
        const maxSize = 1600;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");
        if (!context) {
          resolve(file);
          return;
        }

        context.drawImage(image, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }

            const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
            resolve(new File([blob], name, { type: "image/jpeg", lastModified: Date.now() }));
          },
          "image/jpeg",
          0.82,
        );
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

function isAcceptableImage(file: File) {
  if (file.type.startsWith("image/")) return true;
  return /\.(jpe?g|png|webp|svg)$/i.test(file.name);
}

function keepsTransparency(file: File) {
  return /image\/(png|webp|svg\+xml)/i.test(file.type) || /\.(png|webp|svg)$/i.test(file.name);
}

function AdminModal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-primary/70 p-4 backdrop-blur-sm">
      <button type="button" aria-label="Close modal" className="absolute inset-0 cursor-default" onClick={onClose} />
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border/70 bg-white p-4 shadow-luxury md:p-7">
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-border/70 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Admin Form</div>
            <h2 className="mt-1 font-display text-2xl font-semibold text-primary md:text-3xl">{title}</h2>
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-island-green-soft text-primary hover:bg-accent/20">
            x
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ImageThumb({ src, large = false }: { src: string; large?: boolean }) {
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || src === "—") {
    return <span className="text-sm text-muted-foreground">No image</span>;
  }

  if (failed && src.startsWith("/assets/")) {
    return (
      <div className={`${large ? "min-h-24 w-full" : "h-14 w-20"} rounded-xl border border-dashed border-border bg-secondary/45 p-3 text-xs font-semibold text-muted-foreground`}>
        Legacy image path. Upload a new image to replace it.
      </div>
    );
  }

  if (failed) {
    return <span className="text-sm text-muted-foreground">Image unavailable</span>;
  }

  return (
    <div className={`${large ? "h-36 w-full" : "h-14 w-20"} overflow-hidden rounded-xl border border-border bg-secondary`}>
      <img src={src} alt="Uploaded preview" className="h-full w-full object-cover" onError={() => setFailed(true)} />
    </div>
  );
}

function FilePreview({ file }: { file: File }) {
  const [preview, setPreview] = React.useState("");

  React.useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white">
      {preview && <img src={preview} alt={file.name} className="h-28 w-full object-cover" />}
      <div className="break-words p-2 text-xs font-semibold text-primary">{file.name}</div>
    </div>
  );
}

function PageTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6 md:mb-8">
      <h1 className="font-display text-3xl font-semibold text-primary md:text-4xl">{title}</h1>
      <p className="mt-2 text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function Notice({ children, tone }: { children: React.ReactNode; tone: "success" | "error" }) {
  return (
    <div className={`my-4 rounded-xl p-3 text-sm font-semibold ${tone === "success" ? "bg-emerald-50 text-emerald-700" : "bg-destructive/10 text-destructive"}`}>
      {children}
    </div>
  );
}

function StatusBadge({ status }: { status?: string }) {
  const current = status ?? "pending";
  const styles: Record<string, string> = {
    active: "bg-island-green-soft text-island-green",
    confirmed: "bg-island-green-soft text-island-green",
    approved: "bg-island-green-soft text-island-green",
    pending: "bg-amber-50 text-amber-700",
    contacted: "bg-sky-50 text-sky-700",
    replied: "bg-sky-50 text-sky-700",
    responded: "bg-sky-50 text-sky-700",
    inactive: "bg-slate-100 text-slate-600",
    closed: "bg-slate-100 text-slate-600",
    cancelled: "bg-red-50 text-red-700",
  };

  const label = current === "responded" ? "Replied" : current;

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ${styles[current] ?? "bg-accent/15 text-primary"}`}>{label}</span>;
}

function RecordDetails({ record }: { record: RecordItem }) {
  const keys = [
    "full_name",
    "name",
    "email",
    "whatsapp_number",
    "country",
    "tour.title",
    "hotel.name",
    "service_type",
    "pickup_location",
    "dropoff_location",
    "travel_date",
    "travel_time",
    "check_in",
    "check_out",
    "number_of_guests",
    "number_of_adults",
    "number_of_children",
    "estimated_total",
    "number_of_passengers",
    "room_type",
    "admin_note",
    "company_name",
    "partnership_type",
    "subject",
    "message",
  ].filter((key) => detailValue(record, key) !== "—");

  if (keys.length === 0) return null;

  return (
    <div className="rounded-xl bg-island-green-soft/60 p-4">
      <div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">Record Details</div>
      <dl className="space-y-3">
        {keys.map((key) => (
          <div key={key}>
            <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{labelize(key)}</dt>
            <dd className="mt-1 break-words text-sm font-medium text-primary">{detailValue(record, key)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function WhatsAppGuestLink({ record }: { record: RecordItem }) {
  const phone = String(record.whatsapp_number ?? "").replace(/\D+/g, "");

  if (!phone) return null;

  return (
    <a
      className="flex items-center justify-center rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-[0_14px_35px_-18px_rgba(37,211,102,0.9)] transition-colors hover:bg-[#1ebe5d]"
      href={`https://wa.me/${phone}?text=${encodeURIComponent(guestMessage(record))}`}
      target="_blank"
      rel="noreferrer"
    >
      Send WhatsApp Message
    </a>
  );
}

function guestMessage(record: RecordItem) {
  const status = displayValue(record, "status");
  const service =
    displayValue(record, "tour.title") !== "—"
      ? displayValue(record, "tour.title")
      : displayValue(record, "hotel.name") !== "—"
        ? displayValue(record, "hotel.name")
        : record.service_type
          ? `${record.service_type} - ${record.pickup_location} to ${record.dropoff_location}`
          : "Booking request";
  const date =
    displayValue(record, "travel_date") !== "—"
      ? displayValue(record, "travel_date")
      : [displayValue(record, "check_in"), displayValue(record, "check_out")].filter((value) => value !== "—").join(" to ");
  const total = displayValue(record, "estimated_total");
  const note = record.admin_note;

  return [
    `Hello ${record.full_name || "Guest"},`,
    status === "confirmed"
      ? "Good news. Your booking has been confirmed."
      : status === "cancelled"
        ? "Your booking request has been cancelled. Please contact us if you would like another option."
        : "We have received your booking request and our team is reviewing it.",
    `Service: ${service}`,
    date && `Date: ${date}`,
    `Status: ${status}`,
    total !== "—" && `Agreed price: ${total}`,
    note && `Note: ${note}`,
    "Green Star Island Tour & Safari",
  ].filter(Boolean).join("\n");
}

function initialForm(fields: Field[]) {
  return fields.reduce<Record<string, any>>((values, field) => {
    values[field.name] = field.type === "checkbox" ? false : field.type === "select" ? firstOption(field.options) : field.type === "images" ? [] : "";
    return values;
  }, {});
}

function firstOption(options?: Field["options"]) {
  if (!options || options.length === 0) return "";
  const first = options[0];
  return typeof first === "string" ? first : first.id;
}

function normalizePayload(form: Record<string, any>, fields: Field[]) {
  return fields.reduce<Record<string, any>>((payload, field) => {
    payload[field.name] = field.type === "checkbox" ? Boolean(form[field.name]) : form[field.name];
    return payload;
  }, {});
}

function isImageColumn(column: string) {
  return column === "image" || column === "logo" || column === "main_image" || column === "gallery_images";
}

function GalleryThumbs({ value }: { value: any }) {
  const images = Array.isArray(value) ? value : value ? [value] : [];

  if (images.length === 0) return <span className="text-sm text-muted-foreground">No images</span>;

  return (
    <div className="flex max-w-[220px] items-center gap-2">
      {images.slice(0, 3).map((src, index) => (
        <ImageThumb key={`${src}-${index}`} src={String(src)} />
      ))}
      {images.length > 3 && <span className="rounded-full bg-secondary px-2 py-1 text-xs font-bold text-primary">+{images.length - 3}</span>}
    </div>
  );
}

function displayValue(record: RecordItem, path: string) {
  const value = path.split(".").reduce<any>((current, key) => current?.[key], record);
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value === null || value === undefined || value === "") return "—";
  if (isDateColumn(path)) return formatReadableDate(String(value));
  if (path === "estimated_total") return `$${Number(value).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  if (typeof value === "object") return value.name || value.title || "—";
  return String(value);
}

function detailValue(record: RecordItem, path: string) {
  return displayValue(record, path);
}

function labelize(value: string) {
  return value.split(".").pop()!.replace(/_/g, " ");
}

function isDateColumn(path: string) {
  return ["travel_date", "check_in", "check_out"].includes(path);
}
