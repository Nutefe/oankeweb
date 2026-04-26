"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Lang = "fr" | "en";

export const translations = {
  fr: {
    nav: {
      services: "Services",
      support: "Support",
      aide: "Aide",
      login: "Connexion",
    },
    landing: {
      hero_title: "Gérez votre commerce avec Oanke",
      hero_sub: "La plateforme tout-en-un pour vente, restaurant et service.",
      cta: "Commencer maintenant",
      plans_title: "Nos offres d'abonnement",
      plan_basic: "Basique",
      plan_pro: "Professionnel",
      plan_enterprise: "Entreprise",
      plan_basic_price: "Gratuit",
      plan_pro_price: "9 900 FCFA / mois",
      plan_enterprise_price: "Sur devis",
      plan_basic_desc: "Idéal pour démarrer",
      plan_pro_desc: "Pour les commerces en croissance",
      plan_enterprise_desc: "Pour les grandes structures",
      features_basic: ["1 utilisateur", "Tableau de bord basique", "Support email"],
      features_pro: ["5 utilisateurs", "Rapports avancés", "Support prioritaire", "Multi-commerce"],
      features_enterprise: [
        "Utilisateurs illimités",
        "API personnalisée",
        "Manager dédié",
        "SLA garanti",
      ],
      choose_plan: "Choisir ce plan",
      recommended: "Recommandé",
      footer: "Tous droits réservés",
    },
    services: {
      title: "Nos Services",
      subtitle: "Tout ce dont vous avez besoin pour gérer votre commerce",
      s1_title: "Gestion des ventes",
      s1_desc: "Suivez vos ventes, stocks et clients en temps réel.",
      s2_title: "Gestion restaurant",
      s2_desc: "Commandes, tables, cuisine : tout en un seul endroit.",
      s3_title: "Gestion de service",
      s3_desc: "Planifiez et suivez vos prestations de service facilement.",
    },
    support: {
      title: "Support",
      subtitle: "Nous sommes là pour vous aider",
      contact_title: "Contactez-nous",
      email_label: "Email",
      phone_label: "Téléphone",
      hours_label: "Horaires",
      hours_value: "Lun - Ven, 8h - 18h",
      email_value: "support@oanke.com",
      phone_value: "+225 07 00 00 00",
      faq_title: "Questions fréquentes",
      faq_q1: "Comment réinitialiser mon mot de passe ?",
      faq_a1: "Contactez votre administrateur ou envoyez un email à support@oanke.com.",
      faq_q2: "Puis-je gérer plusieurs commerces ?",
      faq_a2: "Oui, avec notre offre Professionnel ou Entreprise.",
    },
    aide: {
      title: "Aide",
      subtitle: "Documentation et guides d'utilisation",
      start_title: "Démarrage rapide",
      start_desc:
        "Créez votre compte, configurez votre commerce et invitez votre équipe en quelques minutes.",
      guide_title: "Guides par module",
      guide_vente: "Guide Vente",
      guide_restaurant: "Guide Restaurant",
      guide_service: "Guide Service",
      video_title: "Tutoriels vidéo",
      video_desc:
        "Découvrez nos vidéos de formation pour maîtriser toutes les fonctionnalités.",
    },
    login: {
      title: "Connexion",
      subtitle: "Accédez à votre espace Oanke",
      username_label: "Nom d'utilisateur",
      username_placeholder: "Entrez votre identifiant",
      password_label: "Mot de passe",
      password_placeholder: "Entrez votre mot de passe",
      submit: "Se connecter",
      loading: "Connexion...",
      error_generic: "Identifiants invalides. Veuillez réessayer.",
    },
    choose: {
      title: "Choisir votre commerce",
      subtitle:
        "Vous avez accès à plusieurs types de commerce. Sélectionnez celui que vous souhaitez gérer.",
      vente: "Vente",
      restaurant: "Restaurant",
      service: "Service",
      vente_desc: "Gestion des ventes et du stock",
      restaurant_desc: "Gestion du restaurant",
      service_desc: "Gestion des prestations",
    },
    dashboard: {
      welcome: "Bienvenue",
      logout: "Déconnexion",
      vente_title: "Tableau de bord — Vente",
      restaurant_title: "Tableau de bord — Restaurant",
      service_title: "Tableau de bord — Service",
      admin_menu: ["Vue d'ensemble", "Utilisateurs", "Rapports", "Paramètres"],
      magasinier_menu: ["Stock", "Entrées", "Sorties", "Inventaire"],
      secretaire_menu: ["Clients", "Commandes", "Factures", "Agenda"],
      role_admin: "Administrateur",
      role_magasinier: "Magasinier",
      role_secretaire: "Secrétaire",
    },
  },
  en: {
    nav: {
      services: "Services",
      support: "Support",
      aide: "Help",
      login: "Login",
    },
    landing: {
      hero_title: "Manage your business with Oanke",
      hero_sub: "The all-in-one platform for retail, restaurant and service.",
      cta: "Get started",
      plans_title: "Our subscription plans",
      plan_basic: "Basic",
      plan_pro: "Professional",
      plan_enterprise: "Enterprise",
      plan_basic_price: "Free",
      plan_pro_price: "9,900 FCFA / month",
      plan_enterprise_price: "On request",
      plan_basic_desc: "Perfect to get started",
      plan_pro_desc: "For growing businesses",
      plan_enterprise_desc: "For large organisations",
      features_basic: ["1 user", "Basic dashboard", "Email support"],
      features_pro: ["5 users", "Advanced reports", "Priority support", "Multi-commerce"],
      features_enterprise: [
        "Unlimited users",
        "Custom API",
        "Dedicated manager",
        "Guaranteed SLA",
      ],
      choose_plan: "Choose this plan",
      recommended: "Recommended",
      footer: "All rights reserved",
    },
    services: {
      title: "Our Services",
      subtitle: "Everything you need to manage your business",
      s1_title: "Sales management",
      s1_desc: "Track your sales, stock and customers in real time.",
      s2_title: "Restaurant management",
      s2_desc: "Orders, tables, kitchen: all in one place.",
      s3_title: "Service management",
      s3_desc: "Schedule and track your service deliveries with ease.",
    },
    support: {
      title: "Support",
      subtitle: "We are here to help you",
      contact_title: "Contact us",
      email_label: "Email",
      phone_label: "Phone",
      hours_label: "Hours",
      hours_value: "Mon - Fri, 8am - 6pm",
      email_value: "support@oanke.com",
      phone_value: "+225 07 00 00 00",
      faq_title: "Frequently asked questions",
      faq_q1: "How do I reset my password?",
      faq_a1: "Contact your administrator or email support@oanke.com.",
      faq_q2: "Can I manage multiple businesses?",
      faq_a2: "Yes, with our Professional or Enterprise plan.",
    },
    aide: {
      title: "Help",
      subtitle: "Documentation and usage guides",
      start_title: "Quick start",
      start_desc:
        "Create your account, set up your business and invite your team in minutes.",
      guide_title: "Module guides",
      guide_vente: "Sales Guide",
      guide_restaurant: "Restaurant Guide",
      guide_service: "Service Guide",
      video_title: "Video tutorials",
      video_desc: "Explore our training videos to master all features.",
    },
    login: {
      title: "Login",
      subtitle: "Access your Oanke workspace",
      username_label: "Username",
      username_placeholder: "Enter your username",
      password_label: "Password",
      password_placeholder: "Enter your password",
      submit: "Sign in",
      loading: "Signing in...",
      error_generic: "Invalid credentials. Please try again.",
    },
    choose: {
      title: "Choose your business",
      subtitle:
        "You have access to several business types. Select the one you want to manage.",
      vente: "Sales",
      restaurant: "Restaurant",
      service: "Service",
      vente_desc: "Sales and inventory management",
      restaurant_desc: "Restaurant management",
      service_desc: "Service delivery management",
    },
    dashboard: {
      welcome: "Welcome",
      logout: "Logout",
      vente_title: "Dashboard — Sales",
      restaurant_title: "Dashboard — Restaurant",
      service_title: "Dashboard — Service",
      admin_menu: ["Overview", "Users", "Reports", "Settings"],
      magasinier_menu: ["Stock", "Incoming", "Outgoing", "Inventory"],
      secretaire_menu: ["Clients", "Orders", "Invoices", "Schedule"],
      role_admin: "Administrator",
      role_magasinier: "Warehouse",
      role_secretaire: "Secretary",
    },
  },
};

type Translations = typeof translations;

interface LangContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: Translations[Lang];
}

const LangContext = createContext<LangContextValue>({
  lang: "fr",
  toggleLang: () => {},
  t: translations.fr,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const stored = localStorage.getItem("oanke_lang") as Lang | null;
    if (stored === "fr" || stored === "en") {
      setLang(stored);
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "fr" ? "en" : "fr";
      localStorage.setItem("oanke_lang", next);
      return next;
    });
  }, []);

  return (
    <LangContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}

export { LangContext };
