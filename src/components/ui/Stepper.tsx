export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="mu-stepper">
      {steps.map((label, i) => {
        const state = i < current ? 'mu-step--done' : i === current ? 'mu-step--active' : '';
        return (
          <div key={i} className={`mu-step ${state}`}>
            <span className="eyebrow">Passo {i + 1}</span>
            <div>{label}</div>
          </div>
        );
      })}
    </div>
  );
}
