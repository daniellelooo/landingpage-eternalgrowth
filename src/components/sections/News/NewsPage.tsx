import { FormEvent, useEffect, useRef, useState } from "react";
import { SectionId } from "../../../types";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import News from "./News";

type SubscriptionStatus = "idle" | "loading" | "success" | "error";

interface NewsPageProps {
  initialSlug?: string;
}

const SUBSCRIBED_KEY = "eg_blog_subscribed";

const NewsPage = ({ initialSlug }: NewsPageProps) => {
  // Arranca cerrado: el HTML generado en el build no puede llevar la ventana
  // encima del contenido, y a nadie se le pide el correo antes de que haya
  // leído algo. Aparece cuando llega al final de la página o tras un minuto.
  //
  // Se detecta con IntersectionObserver sobre una marca al final del contenido,
  // no escuchando el scroll: en esta web el elemento que scrollea es el <body>,
  // así que window.scrollY siempre vale 0 y un listener en window nunca salta.
  const [showSubscribePrompt, setShowSubscribePrompt] = useState(false);
  const finalDelContenido = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (localStorage.getItem(SUBSCRIBED_KEY) !== null) {
      return;
    }

    const temporizador = setTimeout(() => setShowSubscribePrompt(true), 60000);
    const marca = finalDelContenido.current;

    if (!marca) {
      return () => clearTimeout(temporizador);
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((entrada) => entrada.isIntersecting)) {
          setShowSubscribePrompt(true);
          observador.disconnect();
          clearTimeout(temporizador);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observador.observe(marca);

    return () => {
      observador.disconnect();
      clearTimeout(temporizador);
    };
  }, [initialSlug]);
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatus>("idle");
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  const handleNavigate = (sectionId: SectionId) => {
    if (sectionId === "blog") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.location.href = `/#${sectionId}`;
  };

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscriptionStatus("loading");
    setSubscriptionMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: subscriberEmail,
          newsletter: true,
          newsletter_source: "Eternal News",
        }),
      });

      if (!response.ok) {
        throw new Error("request-failed");
      }

      localStorage.setItem(SUBSCRIBED_KEY, "1");
      setSubscriptionStatus("success");
      setSubscriptionMessage("Muy pronto recibirás las nuevas publicaciones en tu correo.");
    } catch (error) {
      setSubscriptionStatus("error");
      setSubscriptionMessage("No pudimos registrar tu correo. Intenta nuevamente en unos minutos.");
    }
  };

  return (
    <div className="eternal-growth-container news-page">
      <Header activeSection="blog" onNavigate={handleNavigate} />

      {showSubscribePrompt && (
        <div className="news-subscribe-overlay" role="dialog" aria-modal="true">
          <div className="news-subscribe-modal">
            <span className="news-kicker">Sin filtro digital</span>
            <h2>Recibe cada publicación nueva</h2>
            <p>
              Te avisamos cuando publiquemos una guía o un análisis nuevo para
              hacer crecer tu negocio con tecnología.
            </p>

            {subscriptionStatus === "success" ? (
              <div className="news-subscribe-success">
                <strong>Listo, quedaste en la lista.</strong>
                <span>{subscriptionMessage}</span>
                <button
                  type="button"
                  className="news-subscribe-primary"
                  onClick={() => setShowSubscribePrompt(false)}
                >
                  Entrar a Sin filtro digital
                </button>
              </div>
            ) : (
              <form className="news-subscribe-form" onSubmit={handleSubscribe}>
                <label htmlFor="news-subscribe-email">Correo electrónico</label>
                <input
                  id="news-subscribe-email"
                  type="email"
                  value={subscriberEmail}
                  onChange={(event) => setSubscriberEmail(event.target.value)}
                  placeholder="tu@email.com"
                  autoComplete="email"
                  required
                />
                <button
                  type="submit"
                  className="news-subscribe-primary"
                  disabled={subscriptionStatus === "loading"}
                >
                  {subscriptionStatus === "loading"
                    ? "Enviando..."
                    : "Sí, quiero suscribirme"}
                </button>
                <button
                  type="button"
                  className="news-subscribe-secondary"
                  onClick={() => {
                    localStorage.setItem(SUBSCRIBED_KEY, "dismissed");
                    setShowSubscribePrompt(false);
                  }}
                  disabled={subscriptionStatus === "loading"}
                >
                  Ahora no
                </button>
                {subscriptionStatus === "error" && (
                  <span className="news-subscribe-error" role="status">
                    {subscriptionMessage}
                  </span>
                )}
              </form>
            )}
          </div>
        </div>
      )}

      <News initialSlug={initialSlug} />
      <div ref={finalDelContenido} aria-hidden="true" />
      <Footer />
    </div>
  );
};

export default NewsPage;
