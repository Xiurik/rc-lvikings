import { OsrsCard } from '@components/OsrsCard';

export function Info() {
  const goToDiscord = () => {
    window.open('https://discord.gg/2D9QhPXQPY', '_blank');
  };

  const goToX = () => {
    window.open('https://x.com/LVikingsRS', '_blank');
  };

  return (
    <section className="osrs-backdrop-wrap" aria-labelledby="clan-info-title">
      <article className="osrs-backdrop-panel">
        <div className="osrs-backdrop-top" aria-hidden="true"></div>

        <div className="osrs-backdrop-center">
          <div className="osrs-backdrop-content">
            <h1
              id="clan-info-title"
              className="font-osrs-title text-osrs-crimson-banner text-shadow-osrs mb-10 text-3xl font-bold md:text-5xl"
            >
              Informacion del Clan
            </h1>

            <div className="mt-6 flex flex-wrap justify-center gap-6">
              <OsrsCard title="Clan Chat" buttonText="LVikings" isBtnVisible={false} />
              <OsrsCard title="Home World" buttonText="377 OSRS" isBtnVisible={false} />
              <OsrsCard title="Timezone" buttonText="EST / Latinoamerica" isBtnVisible={false} />
              <OsrsCard title="Discord" buttonText="Unirse al Canal" onActionClick={goToDiscord} />
              <OsrsCard title="X - Twitter" buttonText="Seguir en X" onActionClick={goToX} />
            </div>
          </div>
        </div>

        <div className="osrs-backdrop-bottom" aria-hidden="true"></div>
      </article>
    </section>
  );
}

export default Info;
