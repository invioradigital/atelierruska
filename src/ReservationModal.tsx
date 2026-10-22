/**
 * Modal de Réservation Atelier Ruska
 * Design épuré, chaleureux (« cozy ») et élégant sans image imposante.
 */

import React, { useState, useEffect } from 'react';
import { SALON_CONFIG } from './config';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const PRESTATIONS_LIST = [
  "Manucure & pédicure russe",
  "Cils & sourcils (extensions, lash/brow lift)",
  "Coiffure & brushing",
  "Soins beauté & visage",
  "Hammam & massage relaxant",
  "Couleurs, mèches & balayages",
  "Autre soin sur-mesure",
];

const AVAILABLE_HOURS = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
  "19:00", "19:30", "20:00"
];

export default function ReservationModal({ isOpen, onClose, initialService }: ReservationModalProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService || PRESTATIONS_LIST[0]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('11:00');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Met à jour la prestation si spécifiée
  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  // Initialisation date et blocage du scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (!date) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        setDate(`${yyyy}-${mm}-${dd}`);
      }
    } else {
      document.body.style.overflow = '';
      setError('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Fermeture Échap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setError('Merci de renseigner votre nom et prénom.');
      return;
    }

    if (!phone.trim()) {
      setError('Merci de renseigner votre numéro de téléphone.');
      return;
    }

    if (!date) {
      setError('Merci de sélectionner une date.');
      return;
    }

    let formattedDate = date;
    try {
      const [year, month, day] = date.split('-');
      formattedDate = `${day}/${month}/${year}`;
    } catch {
      formattedDate = date;
    }

    const lines = [
      `*NOUVELLE DEMANDE DE RÉSERVATION — ATELIER RUSKA*`,
      ``,
      `- *Nom & Prénom :* ${fullName.trim()}`,
      `- *Téléphone (WhatsApp) :* ${phone.trim()}`,
      `- *Prestation :* ${service}`,
      `- *Date souhaitée :* ${formattedDate}`,
      `- *Heure souhaitée :* ${time}`,
    ];

    if (message.trim()) {
      lines.push(`- *Message / Précisions :* ${message.trim()}`);
    }

    lines.push(``);
    lines.push(`Merci de me confirmer la disponibilité et le tarif.`);

    const waText = encodeURIComponent(lines.join('\n'));
    const waUrl = `https://wa.me/${SALON_CONFIG.whatsappNumber}?text=${waText}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#2b221d]/65 backdrop-blur-[4px] animate-fadeIn">
      {/* Clic extérieur */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Conteneur Pop-up Cozy & Élégant */}
      <div
        className="relative w-full max-w-[480px] bg-[#fbf8f5] rounded-3xl shadow-[0_25px_60px_rgba(43,34,29,0.28)] border border-[#e8ddd6] overflow-hidden z-10 my-auto text-[#302923] transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Bouton fermer discret */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8a7569] hover:text-[#302923] hover:bg-[#ebdcd2] w-8 h-8 rounded-full flex items-center justify-center transition-colors text-base z-20"
          aria-label="Fermer"
        >
          ✕
        </button>

        {/* En-tête chaleureux et épuré */}
        <div className="px-7 pt-7 pb-4 text-center border-b border-[#eee3db]">
          <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#9a6754] block mb-1">
            Atelier Ruska · Casablanca
          </span>
          <h3 id="modal-title" className="text-2xl sm:text-[26px] font-serif font-normal text-[#302923] tracking-tight">
            Prendre rendez-vous
          </h3>
          <p className="text-xs text-[#756962] mt-1.5 max-w-xs mx-auto leading-relaxed">
            Vos coordonnées pour préparer votre venue et échanger en toute simplicité.
          </p>
        </div>

        {/* Formulaire cozy */}
        <form onSubmit={handleSubmit} className="px-6 sm:px-7 py-5 space-y-3.5 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="bg-[#fcedea] text-[#9c3426] text-xs px-3.5 py-2.5 rounded-xl border border-[#f3cac3]">
              {error}
            </div>
          )}

          {/* Nom & Prénom */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-bold text-[#5c4a40] mb-1">
              Nom & Prénom <span className="text-[#c75e4c]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Sarah Bennani"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#fffdfb] border border-[#dcc9be] rounded-xl text-base sm:text-sm text-[#302923] placeholder-[#b09e93] focus:outline-none focus:ring-2 focus:ring-[#9a6754]/30 focus:border-[#9a6754] transition shadow-sm"
            />
          </div>

          {/* Numéro de téléphone WhatsApp */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-bold text-[#5c4a40] mb-1">
              Numéro de téléphone (WhatsApp) <span className="text-[#c75e4c]">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="Ex: 06 12 34 56 78"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#fffdfb] border border-[#dcc9be] rounded-xl text-base sm:text-sm text-[#302923] placeholder-[#b09e93] focus:outline-none focus:ring-2 focus:ring-[#9a6754]/30 focus:border-[#9a6754] transition shadow-sm"
            />
          </div>

          {/* Prestation */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-bold text-[#5c4a40] mb-1">
              Prestation souhaitée
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#fffdfb] border border-[#dcc9be] rounded-xl text-base sm:text-sm text-[#302923] focus:outline-none focus:ring-2 focus:ring-[#9a6754]/30 focus:border-[#9a6754] transition shadow-sm cursor-pointer"
            >
              {PRESTATIONS_LIST.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Heure (Grille 2 colonnes) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-[#5c4a40] mb-1">
                Date <span className="text-[#c75e4c]">*</span>
              </label>
              <input
                type="date"
                required
                min={todayStr}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#fffdfb] border border-[#dcc9be] rounded-xl text-base sm:text-sm text-[#302923] focus:outline-none focus:ring-2 focus:ring-[#9a6754]/30 focus:border-[#9a6754] transition shadow-sm"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-[#5c4a40] mb-1">
                Heure <span className="text-[10px] text-[#8a7569] font-normal">(10h–20h30)</span>
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-[#fffdfb] border border-[#dcc9be] rounded-xl text-base sm:text-sm text-[#302923] focus:outline-none focus:ring-2 focus:ring-[#9a6754]/30 focus:border-[#9a6754] transition shadow-sm cursor-pointer"
              >
                {AVAILABLE_HOURS.map((hr) => (
                  <option key={hr} value={hr}>
                    {hr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message / Précisions */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-bold text-[#5c4a40] mb-1">
              Message <span className="text-[#8a7569] font-normal normal-case">(facultatif)</span>
            </label>
            <textarea
              rows={2}
              placeholder="Précisions sur votre soin, dépose, balayage, etc."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#fffdfb] border border-[#dcc9be] rounded-xl text-base sm:text-sm text-[#302923] placeholder-[#b09e93] focus:outline-none focus:ring-2 focus:ring-[#9a6754]/30 focus:border-[#9a6754] transition shadow-sm resize-none"
            />
          </div>

          {/* Bouton de confirmation */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-5 rounded-xl bg-[#25d366] hover:bg-[#1fb858] text-white font-bold text-xs uppercase tracking-wider transition-transform active:scale-[0.99] flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.52 3.49A11.85 11.85 0 0 0 12.06 0 11.89 11.89 0 0 0 1.81 17.93L.1 24l6.24-1.64a11.85 11.85 0 0 0 5.71 1.46h.01c6.55 0 11.88-5.33 11.89-11.88a11.8 11.8 0 0 0-3.43-8.45ZM12.06 21.8a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.73.98.99-3.64-.23-.37a9.9 9.9 0 1 1 8.36 4.62Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.64-2.03-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.66-1.6-.9-2.18-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.48.7.3 1.24.47 1.67.6.7.22 1.34.19 1.85.11.56-.08 1.76-.72 2-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
              </svg>
              <span>Confirmer via WhatsApp</span>
            </button>
            <p className="text-[11px] text-center text-[#8a7569] mt-2">
              Le message sera envoyé avec vos informations vers WhatsApp.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
