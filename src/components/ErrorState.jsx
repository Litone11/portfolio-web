export default function ErrorState({ api, error }) {
  return (
    <div className="page">
      <div className="halo halo-one" />
      <div className="halo halo-two" />

      <div className="card error">
        <p className="eyebrow">Algo correu mal</p>
        <h2>Não foi possível carregar os dados.</h2>
        <p className="muted">{error}</p>
        <p className="muted">
          Garante que a API está acessível em{" "}
          <a href={api} target="_blank" rel="noreferrer">
            {api}
          </a>
          .
        </p>
        <div className="hero__actions">
          <a className="btn ghost" href={api} target="_blank" rel="noreferrer">
            Abrir API
          </a>
        </div>
      </div>
    </div>
  );
}
