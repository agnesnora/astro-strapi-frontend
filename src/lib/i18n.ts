// src/lib/i18n.ts
export function localizeHref(
  href: string | null | undefined,
  locale: string = "hu",
): string {
  if (!href) return "#";

  // Ha már teljes URL vagy külső link
  if (
    href.startsWith("/hu") ||
    href.startsWith("/en") ||
    href.startsWith("http") ||
    href.startsWith("#") ||
    href.startsWith("//")
  ) {
    return href;
  }

  return `/${locale}${href.startsWith("/") ? href : "/" + href}`;
}

export function getLocaleHref(targetLocale: string, page: any): string {
  if (!page) return `/${targetLocale}`;

  if (page.locale === targetLocale) {
    return `/${targetLocale}/${page.slug}`;
  }

  const target = page.localizations?.find(
    (l: any) => l.locale === targetLocale,
  );

  if (target) {
    return `/${targetLocale}/${target.slug}`;
  }

  return `/${targetLocale}`;
}
