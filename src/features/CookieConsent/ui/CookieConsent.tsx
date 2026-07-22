'use client';

import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import styles from CookieConsent.module.css;
import Link from "next/link";
import { loadYandexMetrika } from "@/shared/lib";

const loadYandexMetrika = () => {
  console.log('Яндекс.Метрика успешно загружена!');
  // Тут будет ваш стандартный код инициализации счетчика Яндекса
};

const CookieConsent = () => {
	const t = useTranslations('icebergMarket');
 
	useEffect(() => {
    // при монтировании проверяем, есть ли наша кука в строке document.cookie
    const hasCookieConsent = document.cookie
      .split('; ')
      .find((row) => row.startsWith('cookie_accepted='));

    // Если куки нет, показываем плашку
    if (!hasCookieConsent) {
      setIsVisible(true);
    }
  }, []);
}

export CookieConsent;
