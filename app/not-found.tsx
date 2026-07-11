import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-warm">
      <div className="text-center max-w-md px-4">
        <h1 className="font-display text-8xl font-bold text-rio">404</h1>
        <h2 className="mt-4 font-display text-2xl font-bold text-carbon">
          Página no encontrada
        </h2>
        <p className="mt-2 text-carbon/50">
          La página que buscás no existe o fue movida.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-rio px-6 py-3 text-sm font-medium text-white transition-all hover:bg-rio/90"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
