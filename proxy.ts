import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  // Нам не нужно делать редиректы или подключать сюда i18n.
  // Просто пропускаем запрос дальше к страницам приложения или к rewrites.
  return NextResponse.next();
}

export const config = {
  // Говорим Next.js: "Пропускай этот файл мимо папки api, _next и картинок"
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
