import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["ru", "en"];
const defaultLocale = "ru";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Проверяем, есть ли уже язык в пути URL
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Если языка в пути нет, перенаправляем на язык по умолчанию (/ru/...)
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

// Настройка фильтра: middleware сработает для всех страниц,
// кроме системных файлов Next.js (картинок, favicon, иконок)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
