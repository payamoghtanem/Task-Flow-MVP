export default function FormField({ label, hint, error, id, children }) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">{label}</label>
      {hint && <span className="form-hint">{hint}</span>}
      {children}
      {error && (
        <span role="alert" className="form-error">{error}</span>
      )}
    </div>
  );
}
