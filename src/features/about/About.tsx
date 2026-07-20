export function About() {
  return (
    <section className="osrs-backdrop-wrap" aria-labelledby="clan-info-title">
      <article className="osrs-backdrop-panel">
        <div className="osrs-backdrop-top" aria-hidden="true"></div>

        <div className="osrs-backdrop-center">
          <div className="osrs-backdrop-content">
            <h1
              id="clan-info-title"
              className="font-osrs-title text-osrs-crimson-banner text-shadow-osrs mb-6 text-3xl font-bold md:text-5xl"
            >
              Quiénes Somos
            </h1>

            <span className="font-osrs-body mb-2 block text-start text-lg leading-relaxed text-black md:text-2xl">
              <p className="text-center text-xl font-bold md:text-3xl">~ Somos un Clan PvM, Social y Skillers. ~</p>
              <br />
              <p className="font-bold">
                Legendary Vikings nace con el propósito de formar mucho más que un simple Clan; buscamos construir una
                comunidad sólida, organizada y en constante crecimiento dentro del mundo de RuneScape. Nuestro objetivo
                principal es ofrecer un espacio donde cada integrante pueda desarrollarse, compartir experiencias,
                aprender nuevas estrategias y disfrutar del juego acompañado de personas con intereses en común.
              </p>
              <p className="font-bold">
                En Legendary Vikings encontrarás una comunidad dispuesta a respaldar a sus integrantes, ofreciendo
                orientación y apoyo ante cualquier duda o inquietud relacionada con Skills, PvM o progresión dentro del
                juego. Nuestro compromiso es fomentar la cooperación, el aprendizaje colectivo y el compañerismo,
                brindando apoyo tanto a jugadores experimentados como a aquellos que están iniciando su aventura.
              </p>
              <p className="font-bold">
                La idea de crear el Clan LVikings nace originalmente en el servidor RS3, y actualmente contamos con una
                comunidad super activa también en OSRS. Nuestro Discord está completamente organizado y fusionado para
                que jugadores de ambos servidores puedan convivir, compartir conocimientos y recibir notificaciones
                sobre actualizaciones, eventos y novedades de ambos juegos.
              </p>
              <p className="font-bold">
                En nuestro Clan es prioridad la calidad de cada uno de los integrantes más que la cantidad misma.
                Nuestro interés frente a la Comunidad Latina es mantener un ambiente organizado, respetuoso y acogedor
                para todos, donde cada miembro se sienta valorado, escuchado y parte fundamental del crecimiento del
                Clan.
              </p>
              <p className="font-bold">
                Para nosotros es fundamental la equidad, por lo que no aceptamos supremacías de líderes frente a rangos
                inferiores. Sin embargo, los Altos Rangos actuarán como guías y encargados de mantener el orden cuando
                sea necesario, especialmente ante incumplimientos de las reglas de RuneScape o del Clan.
              </p>
              <p className="font-bold">
                Contamos con eventos organizados durante toda la semana y el mes, enfocados en PvM y Skills, con el
                propósito de fortalecer la integración entre miembros, mejorar el rendimiento grupal y generar
                experiencias memorables dentro del juego. Estos eventos están diseñados tanto para jugadores casuales
                como competitivos.
              </p>
              <p className="font-bold">
                Somos intolerantes al drama, malas actitudes e irrespeto. Para preservar la armonía y el buen ambiente
                dentro del Clan Chat y Discord, actuaremos con firmeza ante cualquier conducta negativa.
              </p>
              <p className="font-bold">
                Las actividades del Clan se organizan mediante votaciones o sorteos, promoviendo la participación
                democrática. La participación siempre será opcional, respetando la disponibilidad y estilo de juego de
                cada integrante.
              </p>
            </span>
          </div>
        </div>

        <div className="osrs-backdrop-bottom" aria-hidden="true"></div>
      </article>
    </section>
  );
}

export default About;
