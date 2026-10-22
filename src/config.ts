/**
 * Configuration principale de l'Atelier Ruska
 * Vous pouvez facilement modifier les coordonnées, le numéro WhatsApp, l'email et les horaires ici.
 */

export interface DaySchedule {
  day: string; // Ex: 'Lundi'
  dayEn: string;
  hours: string; // Ex: '10:00 – 20:30'
  openTime: string; // '10:00'
  closeTime: string; // '20:30'
  isOpen: boolean;
}

export const SALON_CONFIG = {
  // Nom et marque
  salonName: "Atelier Ruska",
  tagline: "Russian Beauty & Spa",
  locationCity: "Casablanca",

  // Coordonnées & Contact (Modifiez votre numéro et email ici)
  // Format international sans espaces ni signes pour WhatsApp : ex. '212691736736'
  whatsappNumber: "212691736736", 
  whatsappDisplay: "+212 691 736 736",
  
  phoneCall: "+212522264264",
  phoneDisplay: "05 22 26 42 64",

  email: "contact@atelierruska.ma",
  
  // Adresse & Localisation
  address: "Rue Ain El Aouda, Casablanca 20250",
  googleMapsUrl: "https://www.google.com/maps?q=33.59379959106445,-7.641176700592041",

  // Réseaux sociaux
  instagramHandle: "@atelierruskacasablanca",
  instagramUrl: "https://www.instagram.com/atelierruskacasablanca/",

  // Note & Avis
  rating: "4,4",
  reviewsCount: "130",

  // Horaires d'ouverture (10:00 – 20:30 tous les jours)
  schedules: [
    { day: "Lundi", dayEn: "Monday", hours: "10:00 – 20:30", openTime: "10:00", closeTime: "20:30", isOpen: true },
    { day: "Mardi", dayEn: "Tuesday", hours: "10:00 – 20:30", openTime: "10:00", closeTime: "20:30", isOpen: true },
    { day: "Mercredi", dayEn: "Wednesday", hours: "10:00 – 20:30", openTime: "10:00", closeTime: "20:30", isOpen: true },
    { day: "Jeudi", dayEn: "Thursday", hours: "10:00 – 20:30", openTime: "10:00", closeTime: "20:30", isOpen: true },
    { day: "Vendredi", dayEn: "Friday", hours: "10:00 – 20:30", openTime: "10:00", closeTime: "20:30", isOpen: true },
    { day: "Samedi", dayEn: "Saturday", hours: "10:00 – 20:30", openTime: "10:00", closeTime: "20:30", isOpen: true },
    { day: "Dimanche", dayEn: "Sunday", hours: "10:00 – 20:30", openTime: "10:00", closeTime: "20:30", isOpen: true },
  ] as DaySchedule[],

  generalHoursText: "Tous les jours de 10h00 à 20h30",
};

/**
 * Fonction helper pour vérifier si le salon est actuellement ouvert selon l'heure de Casablanca (UTC+1 / local)
 */
export function isSalonOpenNow(): { isOpen: boolean; statusText: string; nextInfo: string } {
  const now = new Date();
  
  // Utiliser le fuseau horaire de Casablanca (Africa/Casablanca)
  const timeString = now.toLocaleTimeString('en-GB', { timeZone: 'Africa/Casablanca', hour: '2-digit', minute: '2-digit', hour12: false });
  const [currentHour, currentMinute] = timeString.split(':').map(Number);
  const currentTimeMinutes = currentHour * 60 + currentMinute;

  // Horaires : 10:00 (600 min) à 20:30 (1230 min)
  const openTimeMinutes = 10 * 60; // 10:00
  const closeTimeMinutes = 20 * 60 + 30; // 20:30

  const isOpen = currentTimeMinutes >= openTimeMinutes && currentTimeMinutes < closeTimeMinutes;

  if (isOpen) {
    return {
      isOpen: true,
      statusText: "Ouvert actuellement",
      nextInfo: "Ferme aujourd'hui à 20h30",
    };
  } else if (currentTimeMinutes < openTimeMinutes) {
    return {
      isOpen: false,
      statusText: "Fermé actuellement",
      nextInfo: "Ouvre aujourd'hui à 10h00",
    };
  } else {
    return {
      isOpen: false,
      statusText: "Fermé actuellement",
      nextInfo: "Ouvre demain à 10h00",
    };
  }
}
