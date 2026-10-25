import { config } from "./config.js";
import { members } from "./members.js";
import MemberCard from "./components/MemberCard.jsx";

export default function App() {
  // Primii membri stau pe primul rând, restul pe rândurile de dedesubt
  const firstRow = members.slice(0, config.firstRowCount);
  const otherRows = members.slice(config.firstRowCount);

  return (
    <main className="page">
      <h1 className="title">{config.title}</h1>
      <p className="subtitle">{config.subtitle}</p>

      <div className="row">
        {firstRow.map((member, index) => (
          <MemberCard key={index} member={member} />
        ))}
      </div>

      {otherRows.length > 0 && (
        <div className="row row-rest">
          {otherRows.map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </div>
      )}
    </main>
  );
}
