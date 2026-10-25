import { useState } from "react";

// Poza poate fi un link complet sau numele unui fișier din public/photos
function photoUrl(photo) {
  if (photo.startsWith("http")) return photo;
  return `${import.meta.env.BASE_URL}photos/${photo}`;
}

// Inițialele numelui, de exemplu "Ana Popescu" → "AP"
function initials(name) {
  const words = name.trim().split(" ");
  const first = words[0].charAt(0);
  const last = words.length > 1 ? words[words.length - 1].charAt(0) : "";
  return (first + last).toUpperCase();
}

// Iconița de plic (în stilul Lucide „mail”)
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  );
}

export default function MemberCard({ member }) {
  const { name, role, photo, email } = member;
  const src = photo ? photoUrl(photo) : "";

  // Ținem minte poza care nu s-a încărcat; dacă schimbi poza, se încearcă din nou
  const [failedSrc, setFailedSrc] = useState(null);
  const showPhoto = src && src !== failedSrc;

  return (
    <article className="card">
      {showPhoto ? (
        <img className="card-photo" src={src} alt={name} onError={() => setFailedSrc(src)} />
      ) : (
        <div className="card-photo card-initials" role="img" aria-label={name}>
          {initials(name)}
        </div>
      )}

      <div className="card-info">
        <div className="card-top">
          <h2 className="card-name" title={name}>{name}</h2>
          {email && (
            <a className="card-email" href={`mailto:${email}`} aria-label={`Trimite un email lui ${name}`}>
              <MailIcon />
            </a>
          )}
        </div>
        <p className="card-role">{role}</p>
      </div>
    </article>
  );
}
