import './Home.css';

export function Home() {
  return (
    <div className="osrs-metal-panel mx-auto w-full max-w-4xl">
      <div className="home-parchment-inner">
        <h2 className="font-osrs-title text-osrs-gold-text text-shadow-osrs mb-10 text-4xl font-bold tracking-wide md:text-6xl">
          Bienvenido a
          <br />
          Legendary Vikings
        </h2>

        <span className="font-osrs-body text-osrs-text-light mb-8 block px-4 leading-relaxed">
          <p className="text-3xl md:text-5xl">Saludos, viajero.</p>
          <br />
          <p className="text-xl md:text-4xl">
            Has superado grandes batallas y ahora te encuentras en las tierras de los Legendary Vikings.
            <br />
            Preparate porque grandes incursiones nos esperan.
          </p>
        </span>

        <a
          className="osrs-btn-red mt-8 text-xl md:text-3xl"
          href="https://discord.gg/2D9QhPXQPY"
          target="_blank"
          rel="noopener noreferrer"
        >
          UNETE A NUESTRO DISCORD
        </a>
      </div>
    </div>
  );
}

export default Home;
