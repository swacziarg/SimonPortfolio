import { earlierSignals } from "../data/projects";

export function EarlierSignals() {
  return (
    <section className="section-block" id="earlier-work">
      <div className="section-heading">
        <p className="eyebrow">Archive</p>
        <h2>Earlier Signals</h2>
      </div>
      <div className="signals-grid">
        {earlierSignals.map((signal) => (
          <article className="signal-card" key={signal.id}>
            <div className="signal-trigger">
              <span>
                <strong>{signal.title}</strong>
                <small>{signal.role}</small>
              </span>
            </div>
            <div className="signal-details">
              <p>{signal.summary}</p>
              <div className="stack-list">
                {signal.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
