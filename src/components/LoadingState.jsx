export default function LoadingState() {
  return (
    <div className="loading-screen">
      <div className="card loading">
        <div className="loader" />
        <div>
          <p className="eyebrow">A preparar o portfolio</p>
          <p className="muted">A sincronizar dados da API.</p>
        </div>
      </div>
    </div>
  );
}
