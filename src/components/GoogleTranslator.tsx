"use client";
import { useEffect } from "react";

declare global {
  interface GoogleTranslate {
    translate?: {
      TranslateElement: {
        new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            layout: unknown;
            autoDisplay: boolean;
          },
          element: string | HTMLElement
        ): void;
        InlineLayout: { SIMPLE: unknown };
      };
    };
  }
  interface Window {
    google?: GoogleTranslate;
    googleTranslateElementInit: () => void;
  }
}

function killTranslateBanner() {
  document.body.style.setProperty("top", "0px", "important");

  document
    .querySelectorAll<HTMLElement>(
      ".goog-te-banner-frame, iframe.skiptranslate, .goog-te-gadget-icon, .goog-te-ftab, body > .skiptranslate"
    )
    .forEach((el) => {
      el.style.setProperty("display", "none", "important");
      el.style.setProperty("visibility", "hidden", "important");
      el.style.setProperty("height", "0px", "important");
      el.style.setProperty("width", "0px", "important");
    });
}

export default function GoogleTranslator() {
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "bn,en",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    const observer = new MutationObserver(() => killTranslateBanner());
    observer.observe(document.body, { childList: true });
    killTranslateBanner();
    const interval = setInterval(killTranslateBanner, 500);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return <div id="google_translate_element" style={{ display: "none" }} />;
}