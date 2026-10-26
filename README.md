# Serviciul IT

Pagina de prezentare a echipei Serviciului IT, pe care o folosim la workshopul de Git și GitHub: fiecare participant își adaugă propriul cartonaș și deschide un pull request.

## Cum îți adaugi cartonașul

Singurul fișier pe care îl modifici este **`src/members.js`**.

1. Deschide `src/members.js`.
2. Copiază o linie de membru, întreagă (de la `{` până la `},`).
3. Lipește-o la finalul listei, **înainte de `];`**.
4. Pune-ți datele tale.

```js
  { name: "Paul Birilă", role: "Co-coordonator", photo: "Paul.webp", email: "nume@mail.ro" },
  { name: "Prenume Nume", role: "Membru", photo: "prenume.webp", email: "prenume.nume@exemplu.ro" },
];
```

| Câmp | Ce scrii |
| --- | --- |
| `name` | numele tău |
| `role` | rolul tău în echipă |
| `photo` | numele pozei din `public/photos` sau un link complet (vezi mai jos) |
| `email` | emailul tău; dacă îl lași gol (`""`), iconița de email nu apare |

Atenție:

- Fiecare membru stă **pe o singură linie**. Așa, la un merge conflict compari o linie cu o linie.
- Păstrează ghilimelele și virgula de la final.
- Dacă editorul îți formatează automat fișierul la salvare și îți sparge linia în mai multe rânduri, dezactivează formatarea automată (în VS Code: `Format On Save`) sau salvează cu `Ctrl+K`, apoi `S` (salvare fără formatare).

## Poza

- Pune poza în `public/photos/`, în format portret (de exemplu 800 × 1100 px), și scrie la `photo` doar numele fișierului: `photo: "prenume.webp"`. Merg `.webp`, `.jpg` și `.png`.
- Sau folosește un link direct către o poză: `photo: "https://..."`.
- Fără poză (sau dacă poza nu se încarcă), pe cartonaș apar inițialele tale.
- Numele fișierului fără spații și fără diacritice: `Cos.webp`, nu `Tudor Coș.jpg`.
- Contează literele mari și mici: `Prenume.WEBP` nu e același fișier cu `prenume.webp`.
- Ține poza mică (sub 500 KB), ca pagina să se încarce repede.

## Pașii în GitHub Desktop

1. **Clone repository**: `File → Clone repository`, alegi repo-ul (sau lipești linkul în tab-ul `URL`).
2. **Branch nou**: `Current branch → New branch`, de exemplu `feat/card-prenume`.
3. **Modificarea**: `Repository → Open in Visual Studio Code`, adaugi linia în `src/members.js` și salvezi.
4. **Commit**: în GitHub Desktop vezi modificarea. La `Summary` scrii `feat: adaugă cartonașul lui Prenume`, apoi `Commit to feat/card-prenume`.
5. **Publish branch**. Dacă nu ai drept de scriere în repo, GitHub Desktop îți propune să faci un fork. Accepți și publici pe fork.
6. **Create Pull Request**: `Branch → Create Pull Request`. Se deschide GitHub în browser: scrii o descriere scurtă și apeși `Create pull request`.

## Aceiași pași în terminal

```bash
git clone https://github.com/alex22bledea/serviciul-it.git
cd serviciul-it
git switch -c feat/card-prenume

# modifici src/members.js (și, dacă e cazul, adaugi poza în public/photos)

git status
git add src/members.js
git add public/photos/prenume.webp   # doar dacă ai adăugat o poză
git commit -m "feat: adaugă cartonașul lui Prenume"
git push -u origin feat/card-prenume
```

Apoi intri pe GitHub și apeși `Compare & pull request`.

**Dacă nu ai drept de scriere în repo** (nu ești adăugat ca colaborator), `git push` o să dea eroare. În cazul ăsta apasă întâi `Fork` pe pagina repo-ului de pe GitHub, apoi clonează fork-ul tău, nu repo-ul original:

```bash
git clone https://github.com/NUMELE-TAU/serviciul-it.git
```

Restul pașilor sunt la fel. Pull request-ul se deschide tot către repo-ul original.

## Ce faci la un merge conflict

Dacă tu și un coleg ați adăugat câte o linie în același loc, Git nu știe pe care s-o păstreze și îți arată ambele variante:

```
  { name: "Paul Birilă", role: "Co-coordonator", photo: "Paul.webp", email: "nume@mail.ro" },
<<<<<<< HEAD
  { name: "Ion Vasile", role: "Membru", photo: "ion.jpg", email: "ion.vasile@exemplu.ro" },
=======
  { name: "Elena Dobre", role: "Membru", photo: "elena.jpg", email: "elena.dobre@exemplu.ro" },
>>>>>>> main
];
```

- Între `<<<<<<<` și `=======` e varianta de pe branch-ul tău.
- Între `=======` și `>>>>>>>` e varianta care vine de pe celălalt branch.

Aici vrem **ambele linii**: le păstrezi pe amândouă și ștergi cele trei rânduri cu marcaje.

```js
  { name: "Paul Birilă", role: "Co-coordonator", photo: "Paul.webp", email: "nume@mail.ro" },
  { name: "Ion Vasile", role: "Membru", photo: "ion.jpg", email: "ion.vasile@exemplu.ro" },
  { name: "Elena Dobre", role: "Membru", photo: "elena.jpg", email: "elena.dobre@exemplu.ro" },
];
```

Apoi salvezi, faci commit și push.

- **În GitHub Desktop**: `Branch → Update from main` (pe un fork apare `upstream/main`). La conflict, deschizi fișierul în editor, îl repari, apoi `Continue merge` și `Push origin`.
- **În terminal**:
  ```bash
  git fetch origin
  git merge origin/main
  # repari conflictul în src/members.js
  git add src/members.js
  git commit -m "fix: rezolvă conflictul din members.js"
  git push
  ```
  Dacă lucrezi pe un fork, `origin` e fork-ul tău, așa că iei modificările din repo-ul original. Înlocuiești primele două comenzi cu:
  ```bash
  git remote add upstream https://github.com/alex22bledea/serviciul-it.git
  git fetch upstream
  git merge upstream/main
  ```
- **Direct pe GitHub**: în pull request apeși `Resolve conflicts`, repari la fel, apoi `Mark as resolved` și `Commit merge`.

## Convenția pentru mesajele de commit

| Tip | Când îl folosești | Exemplu |
| --- | --- | --- |
| `feat` | adaugi ceva nou | `feat: adaugă cartonașul lui Prenume` |
| `fix` | repari o greșeală | `fix: corectează emailul lui Prenume` |
| `docs` | schimbi documentația | `docs: explică cum se adaugă poza` |

## Cum rulezi pagina local

Ai nevoie de [Node.js](https://nodejs.org) (versiunea LTS, minimum 20.19).

```bash
npm install
npm run dev
```

Deschide linkul afișat în terminal (de obicei http://localhost:5173). Când salvezi `src/members.js`, pagina se actualizează singură.

## Cartonașele colegilor

Poți modifica și cartonașele colegilor (de exemplu un rol mai amuzant), în glumă și cu bun-simț: pe un branch separat (de exemplu `fix/card-paul`) și prin pull request, ca toată lumea să vadă ce s-a schimbat. **Nu șterge cartonașele altora.**
