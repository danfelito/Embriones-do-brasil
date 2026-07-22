"use client";

import { useEffect, useMemo, useState } from "react";

type Cross = {
  registry: string;
  mating: string;
  total: number;
  surcharge: number;
  featured?: boolean;
};

type VideoItem = {
  id: string;
  donor: string;
  registry: string;
  crosses: string[];
  poster: string;
  src: string;
};

const breeds = [
  { name: "F1 Girolando", code: "1/2 HOL × 1/2 GYR", note: "Equilibrio entre producción lechera y adaptación tropical.", tone: "cobre" },
  { name: "Gyr Lechero", code: "CEBÚ LECHERO", note: "Rusticidad, longevidad y desempeño en climas cálidos.", tone: "arena" },
  { name: "F1 Gyrsey", code: "GYR × JERSEY", note: "Cruza orientada a sólidos lácteos y eficiencia.", tone: "oliva" },
  { name: "F1 Jerhol", code: "JERSEY × HOLSTEIN", note: "Complementariedad entre volumen y calidad de leche.", tone: "azul" },
  { name: "F1 Brahmolando", code: "BRAHMAN × HOLSTEIN", note: "Alternativa cruzada para ambientes tropicales exigentes.", tone: "cuero" },
  { name: "Holstein", code: "LECHERO ESPECIALIZADO", note: "Línea reconocida por su potencial de producción de leche.", tone: "gris" },
  { name: "Jersey", code: "SÓLIDOS LÁCTEOS", note: "Eficiencia, tamaño moderado y alta concentración de sólidos.", tone: "miel" },
  { name: "Brahman", code: "GRIS Y ROJO", note: "Adaptación, resistencia y desempeño en condiciones tropicales.", tone: "rojo" },
];

const priceGroups = ([
  ["F1 Girolando Plus", 186.9], ["F1 Girolando Elite", 373.8], ["F1 Gyrsey Plus", 186.9],
  ["F1 Jerhol Plus", 186.9], ["F1 Brahmolando Plus", 186.9], ["Gyr Plus", 373.8],
  ["Gyr Elite", 587.4], ["Gyr Top", 854.4], ["Gyr Pincelada", 1335], ["Gyr Fátima", 1335],
  ["Holstein Plus", 373.8], ["Holstein Elite", 587.4], ["Holstein Top", 854.4],
  ["Jersey Plus", 373.8], ["Jersey Elite", 587.4], ["Jersey Top", 854.4],
  ["Brahman Gris GX3", 373.8], ["Brahman Rojo RD", 373.8],
] as const).map(([name, price]) => [name, price + 20] as const);

const crosses: Cross[] = [
  { registry: "LARU 1", mating: "ALIANÇA × GK", total: 4, surcharge: 400 },
  { registry: "LARU 5", mating: "BALBINA × DIAMANTE", total: 2, surcharge: 400 },
  { registry: "LARU 5", mating: "BALBINA × KROVIS", total: 3, surcharge: 400 },
  { registry: "BASA 796", mating: "BALDUÍNA × KROVIS", total: 3, surcharge: 700, featured: true },
  { registry: "BASA 796", mating: "BALDUÍNA × TEATRO", total: 1, surcharge: 700, featured: true },
  { registry: "LARU 8", mating: "BETINA × TEATRO", total: 1, surcharge: 500 },
  { registry: "BASA 926", mating: "CARANDAÍ × DIAMANTE", total: 5, surcharge: 400 },
  { registry: "LARU 25", mating: "CHANEL × FARDO", total: 7, surcharge: 400, featured: true },
  { registry: "LARU 25", mating: "CHANEL × MNTRSS F1", total: 6, surcharge: 200, featured: true },
  { registry: "LARU 25", mating: "CHANEL × SANSÃO", total: 5, surcharge: 400, featured: true },
  { registry: "LARU 25", mating: "CHANEL × TEATRO", total: 1, surcharge: 400, featured: true },
  { registry: "BASA 1117", mating: "COLAR × SANSÃO", total: 3, surcharge: 400 },
  { registry: "LARU 28", mating: "DAKOTA × DIAMANTE", total: 16, surcharge: 400, featured: true },
  { registry: "LARU 28", mating: "DAKOTA × GABINETE", total: 5, surcharge: 400, featured: true },
  { registry: "LARU 28", mating: "DAKOTA × IMPERATIVO", total: 5, surcharge: 400, featured: true },
  { registry: "LARU 28", mating: "DAKOTA × KROVIS", total: 5, surcharge: 400, featured: true },
  { registry: "LARU 41", mating: "ELDORADA × ANTONIONE", total: 4, surcharge: 400, featured: true },
  { registry: "LARU 41", mating: "ELDORADA × TEATRO", total: 4, surcharge: 400, featured: true },
  { registry: "LARU 73", mating: "ELEKTRA × FARDO", total: 3, surcharge: 300 },
  { registry: "LARU 38", mating: "EMANA × KROVIS", total: 2, surcharge: 300 },
  { registry: "LARU 55", mating: "ERVILHA × FARDO", total: 5, surcharge: 300 },
  { registry: "LARU 55", mating: "ERVILHA × KROVIS", total: 3, surcharge: 300 },
  { registry: "LARU 43", mating: "EVA × DIAMANTE", total: 2, surcharge: 400, featured: true },
  { registry: "LARU 51", mating: "EXTRA × MARTELO", total: 10, surcharge: 300 },
  { registry: "PRMP 501", mating: "INDAIA × ANTONIONE", total: 3, surcharge: 500 },
  { registry: "PRMP 501", mating: "INDAIA × GK", total: 8, surcharge: 500 },
  { registry: "PRMP 501", mating: "INDAIA × HAVEN F1", total: 3, surcharge: 200 },
  { registry: "PRMP 501", mating: "INDAIA × JOGRAL", total: 1, surcharge: 500 },
  { registry: "PRMP 501", mating: "INDAIA × MESSI F1", total: 4, surcharge: 200 },
  { registry: "JCVL 4272", mating: "JANGADEIRA × GABINETE", total: 2, surcharge: 400 },
  { registry: "JCVL 4272", mating: "JANGADEIRA × TEATRO", total: 1, surcharge: 400 },
  { registry: "FGVP 2054", mating: "JURA × GK", total: 7, surcharge: 400 },
  { registry: "FGVP 2054", mating: "JURA × SANSÃO", total: 10, surcharge: 400 },
  { registry: "TOLA 631", mating: "KHRUTA × FARDO", total: 4, surcharge: 400 },
  { registry: "TOLA 631", mating: "KHRUTA × SANSÃO", total: 3, surcharge: 400 },
  { registry: "CAL 12615", mating: "LOLA × DIAMANTE", total: 5, surcharge: 700 },
  { registry: "JOAD 189", mating: "MARQUESA × ANTONIONE", total: 11, surcharge: 300, featured: true },
  { registry: "TOLA 738", mating: "MOSQUETEIRA × DIAMANTE", total: 6, surcharge: 400 },
  { registry: "TOLA 738", mating: "MOSQUETEIRA × FARDO", total: 5, surcharge: 400 },
  { registry: "TOLA 786", mating: "NASA × ANTONIONE", total: 18, surcharge: 400 },
  { registry: "TOLA 786", mating: "NASA × EDNK", total: 1, surcharge: 400 },
  { registry: "TOLA 786", mating: "NASA × GK", total: 4, surcharge: 400 },
  { registry: "TOLA 786", mating: "NASA × GOPRO F1", total: 1, surcharge: 200 },
  { registry: "TOLA 786", mating: "NASA × HAVEN F1", total: 3, surcharge: 200 },
  { registry: "TOLA 786", mating: "NASA × KROVIS", total: 4, surcharge: 400 },
  { registry: "TOLA 786", mating: "NASA × MESSI F1", total: 4, surcharge: 200 },
  { registry: "TOLA 786", mating: "NASA × MNTRSS F1", total: 6, surcharge: 200 },
  { registry: "TOLA 786", mating: "NASA × SANSÃO", total: 5, surcharge: 400 },
  { registry: "TOLA 791", mating: "NENA × GABINETE", total: 3, surcharge: 700 },
  { registry: "TOLA 791", mating: "NENA × JOGRAL", total: 4, surcharge: 700 },
  { registry: "TOLA 791", mating: "NENA × TEAT", total: 2, surcharge: 700 },
  { registry: "CAL 13730", mating: "QUIXA × KROVIS", total: 8, surcharge: 400 },
  { registry: "TOLA 983", mating: "RAYA × DIAMANTE", total: 10, surcharge: 400 },
  { registry: "TOLA 983", mating: "RAYA × FARDO", total: 4, surcharge: 400 },
  { registry: "GIVR 1330", mating: "TAMY × JOGRAL", total: 1, surcharge: 400 },
  { registry: "GIVR 1330", mating: "TAMY × KROVIS", total: 10, surcharge: 400 },
].map((item) => ({ ...item, surcharge: item.surcharge + 20 }));

const catalogHighlights = [
  {
    donor: "Balduína FIV do Basa",
    registry: "BASA 796",
    production: "11,290 kg",
    detail: "Lactancia real y oficial ABCZ a 365 días. Beta-caseína A2A2 y familia materna Ginger.",
    recognition: "Reservada Gran Campeona y Campeona de Conjunto Familia en ExpoGale 2022.",
  },
  {
    donor: "Nena FIV TOL",
    registry: "TOLA 791",
    production: "8,770 kg",
    detail: "Primera lactancia real y oficial ABCZ a 365 días. Beta-caseína A2A2.",
    recognition: "Línea GK × Jaguar × Nobre, descrita por su consistencia y productividad.",
  },
  {
    donor: "Chanel LARULP",
    registry: "LARU 25",
    production: "8,963 kg",
    detail: "Primera lactancia real y oficial ABCZ a 365 días. Beta-caseína A2A2.",
    recognition: "Genealogía Jogral × Ninon × Sansão orientada a alta productividad lechera.",
  },
];

const videos: VideoItem[] = [
  { id: "eldorada", donor: "Eldorada LARULP", registry: "LARU 41", crosses: ["Antonione", "Teatro"], poster: "/media/thumbnails/eldorada-laru41.jpg", src: "/media/videos/eldorada-laru41.mp4" },
  { id: "eva", donor: "Eva LARULP", registry: "LARU 43", crosses: ["Diamante de Brasília"], poster: "/media/thumbnails/eva-laru43.jpg", src: "/media/videos/eva-laru43.mp4" },
  { id: "balduina", donor: "Balduína FIV do Basa", registry: "BASA 796", crosses: ["Krovis", "Teatro"], poster: "/media/thumbnails/balduina-basa796.jpg", src: "/media/videos/balduina-basa796.mp4" },
  { id: "chanel", donor: "Chanel LARULP", registry: "LARU 25", crosses: ["CA Sansão"], poster: "/media/thumbnails/chanel-laru25.jpg", src: "/media/videos/chanel-laru25.mp4" },
  { id: "marquesa", donor: "Marquesa FIV João Dias", registry: "JOAD 189", crosses: ["Krovis", "Antonione"], poster: "/media/thumbnails/marquesa-joad189.jpg", src: "/media/videos/marquesa-joad189.mp4" },
];

const whatsapp = "https://wa.me/522294648962?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20embriones%20y%20cruzas%20disponibles.";
const whatsappFor = (message: string) => `https://wa.me/522294648962?text=${encodeURIComponent(message)}`;

export default function Home() {
  const [query, setQuery] = useState("");
  const [surcharge, setSurcharge] = useState("todos");
  const [onlyStock, setOnlyStock] = useState(false);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [activeBreed, setActiveBreed] = useState<(typeof breeds)[number] | null>(null);

  const filteredCrosses = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return crosses.filter((item) => {
      const matchesText = !normalized || `${item.registry} ${item.mating}`.toLowerCase().includes(normalized);
      const matchesPrice = surcharge === "todos" || item.surcharge === Number(surcharge);
      return matchesText && matchesPrice && (!onlyStock || item.total >= 5);
    });
  }, [query, surcharge, onlyStock]);

  useEffect(() => {
    if (!activeVideo && !activeBreed) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && (setActiveVideo(null), setActiveBreed(null));
    document.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [activeVideo, activeBreed]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Embriones do Brasil, inicio">
          <span className="brand-mark">EB</span>
          <span><strong>EMBRIONES</strong><small>DO BRASIL · MÉXICO</small></span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#razas">Razas</a><a href="#seleccion">Selección</a><a href="#videos">Videos</a><a href="#cruzas">Cruzas</a><a href="#noticias">Noticias</a><a href="#precios">Precios</a>
        </nav>
        <a className="header-contact" href={whatsapp} target="_blank" rel="noreferrer">Hablar con ventas <span>↗</span></a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Genética brasileña seleccionada</p>
          <h1>El futuro de tu hato empieza en una <em>cruza excepcional.</em></h1>
          <p className="hero-lead">Explora donadoras, líneas raciales y disponibilidad de embriones con respaldo visual de cada genética.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#cruzas">Explorar cruzas <span>↓</span></a>
            <a className="button button-ghost" href={whatsapp} target="_blank" rel="noreferrer">Solicitar asesoría</a>
          </div>
          <div className="hero-stats" aria-label="Resumen de inventario">
            <div><strong>265</strong><span>embriones</span></div>
            <div><strong>56</strong><span>cruzas activas</span></div>
            <div><strong>8</strong><span>programas raciales</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-poster-wrap">
            <img src="/media/images/dakota-pedigree.jpeg" alt="Dakota FIV LARULP, donadora Gyr lechero y su genealogía" />
            <div className="poster-caption"><span>DONADORA DESTACADA</span><strong>Dakota FIV LARULP</strong><small>LARU 28 · 31 embriones disponibles</small></div>
          </div>
          <span className="stamp">GENÉTICA<br />TROPICAL<br />2026</span>
        </div>
      </section>

      <div className="trust-strip" aria-label="Atributos del servicio">
        <span>● TRAZABILIDAD</span><span>● SELECCIÓN GENÉTICA</span><span>● ASESORÍA EN MÉXICO</span><span>● INVENTARIO ACTUALIZADO</span>
      </div>

      <section className="section breeds-section" id="razas">
        <div className="section-heading">
          <div><p className="eyebrow"><span /> Programas disponibles</p><h2>Conoce cada <em>raza y cruza.</em></h2></div>
          <p>Selecciona una línea para conocer su propósito productivo y las categorías de embriones disponibles.</p>
        </div>
        <div className="breed-grid">
          {breeds.map((breed, index) => (
            <button className={`breed-card ${breed.tone}`} key={breed.name} onClick={() => setActiveBreed(breed)}>
              <span className="breed-number">0{index + 1}</span>
              <span className="breed-code">{breed.code}</span>
              <strong>{breed.name}</strong>
              <span className="breed-note">{breed.note}</span>
              <span className="card-link">Ver programa <b>↗</b></span>
            </button>
          ))}
        </div>
      </section>

      <section className="section selection-section" id="seleccion">
        <div className="section-heading">
          <div><p className="eyebrow"><span /> Catálogo de donadoras LARULP</p><h2>Familias que unen <em>leche, función y consistencia.</em></h2></div>
          <p>La selección de la Estância LARULP parte de familias consolidadas de Gir Lechero y combina desempeño productivo, funcionalidad, genealogía y calidad de leche.</p>
        </div>
        <div className="selection-principles">
          <article><span>01</span><strong>Producción oficial</strong><p>Referencias de lactancias reales y oficiales registradas por ABCZ para comparar el desempeño de cada donadora.</p></article>
          <article><span>02</span><strong>Leche A2A2</strong><p>El catálogo identifica donadoras con beta-caseína A2A2, un dato relevante para programas enfocados en calidad de leche.</p></article>
          <article><span>03</span><strong>Familias probadas</strong><p>La genealogía reúne madres, abuelas y descendientes con producción, campeonatos y reconocimiento dentro del Gir Lechero.</p></article>
        </div>
        <div className="catalog-highlights">
          {catalogHighlights.map((item) => (
            <article key={item.registry}>
              <div><small>{item.registry}</small><h3>{item.donor}</h3></div>
              <strong>{item.production}</strong>
              <p>{item.detail}</p>
              <span>{item.recognition}</span>
            </article>
          ))}
        </div>
        <p className="source-note">Información traducida y resumida del catálogo de donadoras Estância LARULP 2025. Los resultados históricos no garantizan el desempeño individual de la descendencia.</p>
      </section>

      <section className="section video-section" id="videos">
        <div className="section-heading light-heading">
          <div><p className="eyebrow"><span /> Archivo audiovisual</p><h2>Ve la genética <em>en movimiento.</em></h2></div>
          <p>Conoce conformación, sistema mamario y cruces disponibles de nuestras donadoras destacadas.</p>
        </div>
        <div className="video-grid">
          {videos.map((video, index) => (
            <article className={`video-card ${index === 0 ? "video-featured" : ""}`} key={video.id}>
              <button className="video-poster" onClick={() => setActiveVideo(video)} aria-label={`Reproducir video de ${video.donor}`}>
                <img src={video.poster} alt={`Miniatura de ${video.donor}`} loading="lazy" />
                <span className="play">▶</span>
                <span className="video-index">0{index + 1}</span>
              </button>
              <div className="video-info">
                <div><small>{video.registry}</small><h3>{video.donor}</h3><p>{video.crosses.join(" · ")}</p></div>
                <div className="video-links">
                  <button onClick={() => setActiveVideo(video)}>Ver video</button>
                  <a href={video.src} target="_blank" rel="noreferrer">Abrir enlace ↗</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section catalog-section" id="cruzas">
        <div className="section-heading">
          <div><p className="eyebrow"><span /> Inventario de cruzamientos</p><h2>Encuentra tu <em>cruza ideal.</em></h2></div>
          <p>Consulta registro, acasalamiento, disponibilidad y valor adicional de genética. Stock total reportado: 265 embriones.</p>
        </div>
        <div className="catalog-tools">
          <label className="search-box"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar donadora, toro o registro…" aria-label="Buscar cruza" /></label>
          <label className="select-box">Acréscimo
            <select value={surcharge} onChange={(e) => setSurcharge(e.target.value)} aria-label="Filtrar por acréscimo">
              <option value="todos">Todos</option><option value="220">USD 220</option><option value="320">USD 320</option><option value="420">USD 420</option><option value="520">USD 520</option><option value="720">USD 720</option>
            </select>
          </label>
          <label className="stock-toggle"><input type="checkbox" checked={onlyStock} onChange={(e) => setOnlyStock(e.target.checked)} /><span /> 5 o más disponibles</label>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Registro</th><th>Acasalamiento</th><th>Disponibles</th><th>Acréscimo</th><th /></tr></thead>
            <tbody>
              {filteredCrosses.map((item, index) => (
                <tr key={`${item.registry}-${item.mating}`}>
                  <td><span className="row-number">{String(index + 1).padStart(2, "0")}</span>{item.registry}</td>
                  <td><strong>{item.mating}</strong>{item.featured && <span className="video-badge">VIDEO</span>}</td>
                  <td><span className="stock-pill">{item.total}</span></td>
                  <td>USD {item.surcharge.toLocaleString("en-US")}</td>
                  <td><a href={whatsappFor(`Hola, me interesa la cruza ${item.mating}, registro ${item.registry}.`)} target="_blank" rel="noreferrer" aria-label={`Consultar ${item.mating}`}>Consultar ↗</a></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCrosses.length === 0 && <div className="empty-state">No encontramos cruces con esos filtros. Prueba otra búsqueda.</div>}
        </div>
        <p className="catalog-note">* El acréscimo es el valor adicional en USD asociado a la genética del cruzamiento. Disponibilidad sujeta a confirmación.</p>
      </section>

      <section className="section news-section" id="noticias">
        <div className="news-image">
          <img src="/media/images/nacimiento-tailandia-2026.jpeg" alt="Novilla nacida en Tailandia de la receptora 1013-2" loading="lazy" />
          <span>NACIMIENTO INTERNACIONAL · 2026</span>
        </div>
        <article className="news-copy">
          <p className="eyebrow"><span /> Noticias</p>
          <time dateTime="2026-05-04">4 de mayo de 2026</time>
          <h2>Nacimiento en <em>Tailandia</em></h2>
          <p className="news-lead">Nació una novilla a partir de un embrión congelado procedente de Brasil.</p>
          <dl>
            <div><dt>Receptora</dt><dd>1013-2</dd></div>
            <div><dt>Sexo</dt><dd>Hembra</dd></div>
            <div><dt>Donadora</dt><dd>Nena FIV</dd></div>
            <div><dt>Padre</dt><dd>Teatro</dd></div>
            <div><dt>Origen</dt><dd>Embrión congelado de Brasil</dd></div>
          </dl>
          <a className="button button-dark" href={whatsappFor("Hola, quiero información sobre embriones congelados de Brasil y la cruza Nena FIV × Teatro.")} target="_blank" rel="noreferrer">Consultar esta genética ↗</a>
        </article>
      </section>

      <section className="section prices-section" id="precios">
        <div className="price-intro">
          <p className="eyebrow"><span /> Referencia comercial</p>
          <h2>Programas para cada <em>objetivo productivo.</em></h2>
          <p>Valores base de referencia por embrión en dólares estadounidenses. Solicita una cotización para confirmar disponibilidad, logística y condiciones.</p>
          <a className="button button-dark" href={whatsapp} target="_blank" rel="noreferrer">Cotizar mi programa ↗</a>
        </div>
        <div className="price-list">
          <div className="price-list-head"><span>PROGRAMA</span><span>DESDE USD</span></div>
          {priceGroups.map(([name, price]) => (
            <div className="price-row" key={name}><span>{name}</span><strong>{price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></div>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contacto">
        <div className="contact-copy">
          <p className="eyebrow"><span /> Atención personalizada</p>
          <h2>Hablemos de la próxima generación de tu hato.</h2>
          <p>Cuéntanos tu clima, orientación productiva y objetivos. Te ayudamos a comparar las cruzas disponibles.</p>
        </div>
        <div className="contact-actions">
          <a className="contact-main" href={whatsapp} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>+52 229 464 8962</strong><b>↗</b></a>
          <a className="contact-secondary" href="mailto:ventas@brasilmx.mx"><span>Correo</span><strong>ventas@brasilmx.mx</strong><b>↗</b></a>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#inicio"><span className="brand-mark">EB</span><span><strong>EMBRIONES</strong><small>DO BRASIL · MÉXICO</small></span></a>
        <p>Catálogo informativo de genética bovina. Disponibilidad y precios sujetos a confirmación.</p>
        <div><a href="tel:+522294648962">+52 229 464 8962</a><a href="mailto:ventas@brasilmx.mx">ventas@brasilmx.mx</a></div>
      </footer>

      {activeVideo && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={`Video de ${activeVideo.donor}`} onMouseDown={(e) => e.target === e.currentTarget && setActiveVideo(null)}>
          <div className="video-modal">
            <button className="modal-close" onClick={() => setActiveVideo(null)} aria-label="Cerrar">×</button>
            <div className="modal-video-wrap"><video src={activeVideo.src} poster={activeVideo.poster} controls autoPlay playsInline /></div>
            <div className="modal-copy"><small>{activeVideo.registry} · DONADORA</small><h2>{activeVideo.donor}</h2><p>Cruzas presentadas: {activeVideo.crosses.join(" y ")}.</p><a href={whatsapp} target="_blank" rel="noreferrer">Consultar disponibilidad ↗</a></div>
          </div>
        </div>
      )}

      {activeBreed && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={`Información de ${activeBreed.name}`} onMouseDown={(e) => e.target === e.currentTarget && setActiveBreed(null)}>
          <div className="breed-modal">
            <button className="modal-close light-close" onClick={() => setActiveBreed(null)} aria-label="Cerrar">×</button>
            <span className="modal-kicker">PROGRAMA GENÉTICO</span><h2>{activeBreed.name}</h2><p className="modal-code">{activeBreed.code}</p><p>{activeBreed.note}</p>
            <div className="breed-modal-details"><div><span>Selección</span><strong>Según objetivo productivo</strong></div><div><span>Disponibilidad</span><strong>Consultar inventario vigente</strong></div></div>
            <a className="button button-primary" href={whatsappFor(`Hola, me interesa el programa ${activeBreed.name}.`)} target="_blank" rel="noreferrer">Solicitar opciones ↗</a>
          </div>
        </div>
      )}
    </main>
  );
}
