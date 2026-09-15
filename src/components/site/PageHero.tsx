import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden surface-navy">
      {image ? (
        <>
          <img
            src={image}
            alt={imageAlt ?? ""}
            width={1920}
            height={1080}
            className="absolute inset-0 size-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-navy/65" />
        </>
      ) : null}
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-5xl leading-tight sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed opacity-80">{text}</p>
        {children ? <div className="mt-9 flex flex-wrap gap-4">{children}</div> : null}
      </div>
    </section>
  );
}