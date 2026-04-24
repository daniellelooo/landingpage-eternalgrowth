import { FormEvent, useState } from "react";
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
  const [showSubscribePrompt, setShowSubscribePrompt] = useState(
    () => localStorage.getItem(SUBSCRIBED_KEY) === null
  );
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
      setSubscriptionMessage("Muy pronto recibiras las nuevas publicaciones en tu correo.");
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
            <h2>Recibe cada nueva noticia</h2>
            <p>
              Te avisamos cuando publiquemos analisis, alertas y senales utiles
              para hacer crecer tu negocio con tecnologia.
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
                <label htmlFor="news-subscribe-email">Correo electronico</label>
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
                    : "Si, quiero suscribirme"}
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
      <Footer />
    </div>
  );
};

export default NewsPage;
