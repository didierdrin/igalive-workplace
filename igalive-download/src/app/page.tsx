import fs from "node:fs/promises";
import path from "node:path";

type AppCategory = "Student Portal" | "Instructor Tools" | "Course Materials" | "Administrative" | "Other";

type AppListing = {
  id: string;
  name: string;
  category: AppCategory;
  version: string;
  sizeBytes: number;
  releaseDate: string; // ISO string
  filePath: string; // under /apps
  isFlagship: boolean;
};

async function getApps(): Promise<AppListing[]> {
  const appsDir = path.join(process.cwd(), "public", "apps");
  try {
    const entries = await fs.readdir(appsDir, { withFileTypes: true });
    const apkFiles = entries
      .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".apk"))
      .map((e) => e.name);

    const listings: AppListing[] = [];
    for (const fileName of apkFiles) {
      const filePath = path.join(appsDir, fileName);
      const stat = await fs.stat(filePath);
      const base = fileName.replace(/\.apk$/i, "");

      // Parse simple naming convention: appname-version-category[-flagship].apk
      const parts = base.split("-");
      const name = parts[0] ?? base;
      const version = parts[1] ?? "1.0.0";
      const categoryRaw = parts[2] ?? "Other";
      const isFlagship = parts.includes("flagship");
      const category = ((): AppCategory => {
        const map: Record<string, AppCategory> = {
          student: "Student Portal",
          students: "Student Portal",
          teacher: "Instructor Tools",
          instructor: "Instructor Tools",
          course: "Course Materials",
          admin: "Administrative",
        };
        return map[categoryRaw.toLowerCase()] ?? "Other";
      })();

      listings.push({
        id: fileName,
        name,
        category,
        version,
        sizeBytes: stat.size,
        releaseDate: stat.mtime.toISOString(),
        filePath: `/apps/${fileName}`,
        isFlagship,
      });
    }

    // Sort: flagship first, then newest by date desc
    listings.sort((a, b) => {
      if (a.isFlagship !== b.isFlagship) return a.isFlagship ? -1 : 1;
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    });

    return listings;
  } catch {
    return [];
  }
}

function formatSize(bytes: number): string {
  const units = ["B", "KB", "MB", "GB"] as const;
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

export default async function Home() {
  const apps = await getApps();
  const grouped = apps.reduce<Record<AppCategory, AppListing[]>>((acc, app) => {
    acc[app.category] = acc[app.category] ?? [];
    acc[app.category].push(app);
    return acc;
  }, { "Student Portal": [], "Instructor Tools": [], "Course Materials": [], "Administrative": [], "Other": [] });

  return (
    <div className="font-sans min-h-screen p-8 sm:p-12 flex flex-col bg-gradient-to-b from-white to-emerald-200">
      <header className="mb-8 flex items-center gap-3">
        <img src="/globe.svg" alt="igaLive" className="h-8 w-8 dark:invert" />
        <h1 className="text-2xl font-semibold tracking-tight">igaLive Mobile App Downloads</h1>
      </header>

      {apps.length === 0 ? (
        <p className="text-sm text-gray-500">No APKs found. Upload files to /public/apps.</p>
      ) : (
        <div className="space-y-10">
          {Object.entries(grouped).map(([category, items]) => (
            items.length === 0 ? null : (
              <section key={category}>
                <h2 className="text-lg font-medium mb-4">{category}</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((app) => (
                    <li key={app.id} className="rounded-lg border border-black/10 dark:border-white/15 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-semibold">igaLive</span>
                            {app.isFlagship && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-600 text-white">Flagship</span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">v{app.version}</div>
                        </div>
                        <div className="text-xs text-gray-500 text-right">
                          <div>{formatSize(app.sizeBytes)}</div>
                          <div>{new Date(app.releaseDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <a className="inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/15 px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/10"
                           href={`/api/download?file=${encodeURIComponent(app.filePath)}`}>
                          Download APK
                        </a>
                        <a className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm text-blue-600 hover:underline"
                           href={app.filePath}>
                          Direct link
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )
          ))}
        </div>
      )}

      <footer className="mt-auto text-center text-xs text-gray-500">
        Copyright © 2025 igaLive. Access may be audited.
      </footer>
    </div>
  );
}
