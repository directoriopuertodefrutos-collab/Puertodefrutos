"use client";

import { useState } from "react";
import { ImageOff, Video, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  type?: "image" | "video";
  onClear?: () => void;
}

export function UrlInput({
  value,
  onChange,
  placeholder = "https://",
  label,
  error,
  type = "image",
  onClear,
}: UrlInputProps) {
  const [imgError, setImgError] = useState(false);

  const showPreview =
    value &&
    (value.startsWith("http://") || value.startsWith("https://")) &&
    type === "image";

  const isVideo =
    type === "video" ||
    value.match(/\.(mp4|webm|mov|avi|mkv)(\?|$)/i);

  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          value={value}
          onChange={(e) => {
            setImgError(false);
            onChange(e.target.value);
          }}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-xl border bg-white px-4 py-3 pr-10 text-sm outline-none transition-all placeholder:text-carbon/30 font-mono text-xs",
            error
              ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-10"
              : "border-carbon/10 focus:border-rio/30 focus:ring-2 focus:ring-rio/10",
          )}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-carbon/30 hover:text-red-400 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {showPreview && (
        <div className="mt-2 relative">
          {imgError ? (
            <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-600">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>No se pudo cargar la imagen. Verificá que la URL sea correcta.</span>
            </div>
          ) : (
            <div className="relative inline-block overflow-hidden rounded-xl border border-carbon/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Preview"
                className="max-h-[90px] w-auto object-contain"
                onError={() => setImgError(true)}
                onLoad={() => setImgError(false)}
              />
            </div>
          )}
        </div>
      )}

      {value && isVideo && type === "video" && (
        <div className="mt-2">
          <div className="inline-flex items-center gap-2 rounded-xl border border-rio/10 bg-rio/5 px-3 py-2 text-xs text-rio">
            <Video className="h-4 w-4" />
            <span>URL de video detectada</span>
          </div>
        </div>
      )}
    </div>
  );
}

interface UrlListInputProps {
  urls: string[];
  onAdd: (url: string) => void;
  onRemove: (index: number) => void;
  label?: string;
  placeholder?: string;
  max?: number;
}

export function UrlListInput({
  urls,
  onAdd,
  onRemove,
  label,
  placeholder = "https://",
  max,
}: UrlListInputProps) {
  const [inputValue, setInputValue] = useState("");

  function handleAdd() {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setInputValue("");
  }

  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-carbon/50 uppercase">
          {label} {max ? `(máx. ${max})` : ""}
        </label>
      )}

      {(!max || urls.length < max) && (
        <div className="flex gap-2 mb-2">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder={placeholder}
            className="flex-1 rounded-xl border border-carbon/10 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-rio/30 focus:ring-2 focus:ring-rio/10 placeholder:text-carbon/30 font-mono text-xs"
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={!inputValue.trim()}
            className="rounded-xl bg-rio/10 px-4 py-2.5 text-xs font-medium text-rio transition-all hover:bg-rio/20 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            + Agregar
          </button>
        </div>
      )}

      {urls.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {urls.map((url, idx) => (
            <UrlPreviewThumb
              key={`${url}-${idx}`}
              url={url}
              onRemove={() => onRemove(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function UrlPreviewThumb({ url, onRemove }: { url: string; onRemove: () => void }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-carbon/5 bg-carbon/5">
      {imgError ? (
        <div className="flex h-[90px] w-[120px] items-center justify-center">
          <ImageOff className="h-6 w-6 text-carbon/20" />
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={url}
          alt=""
          className="h-[90px] w-[120px] object-cover"
          onError={() => setImgError(true)}
        />
      )}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-all group-hover:opacity-100 hover:bg-red-500"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}
