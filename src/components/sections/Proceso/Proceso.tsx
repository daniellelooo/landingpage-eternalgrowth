// Esto sí es una secuencia, por eso va numerado. Los pasos estaban metidos
// dentro del formulario de contacto; aquí tienen su propia franja justo antes.
const PASOS = [
  {
    titulo: "Nos escribes",
    texto:
      "Por el formulario, por correo o por Instagram. Cuéntanos a qué se dedica tu negocio y qué te está quitando tiempo.",
  },
  {
    titulo: "Te respondemos en menos de 24 horas hábiles",
    texto: "Para agendar el diagnóstico en el horario que te sirva.",
  },
  {
    titulo: "Diagnóstico de 30 minutos, sin costo",
    texto:
      "Entendemos cómo funciona tu negocio hoy y te decimos con honestidad qué conviene hacer primero, y qué no.",
  },
];

const Proceso = () => {
  return (
    <section id="como-trabajamos" className="proceso" aria-labelledby="proceso-titulo">
      <div className="proceso-contenedor">
        <h2 id="proceso-titulo" className="proceso-titulo">
          Cómo empezamos
        </h2>
        <ol className="proceso-pasos">
          {PASOS.map((paso, i) => (
            <li className="proceso-paso" key={paso.titulo}>
              <span className="proceso-numero" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="proceso-paso-titulo">{paso.titulo}</h3>
              <p className="proceso-paso-texto">{paso.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Proceso;
