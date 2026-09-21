import { NEWS_BASE_PATH, NEWS_ITEMS, imagenRecortada } from "../../../data/news";

// Las tres publicaciones más recientes. Además de mostrar que el blog está vivo,
// le dicen a Google que esas páginas son importantes: las enlaza la portada.
const DelBlog = () => {
  const recientes = NEWS_ITEMS.slice(0, 3);

  return (
    <section className="del-blog" aria-labelledby="del-blog-titulo">
      <div className="del-blog-contenedor">
        <div className="del-blog-cabecera">
          <h2 id="del-blog-titulo" className="del-blog-titulo">
            Del blog
          </h2>
          <a className="del-blog-todas" href={NEWS_BASE_PATH}>
            Ver todas las publicaciones
          </a>
        </div>

        <ul className="del-blog-lista">
          {recientes.map((item) => (
            <li key={item.slug}>
              <a className="del-blog-item" href={`${NEWS_BASE_PATH}/${item.slug}`}>
                <img
                  className="del-blog-imagen"
                  src={imagenRecortada(item.image, 480, 270)}
                  srcSet={`${imagenRecortada(item.image, 480, 270)} 1x, ${imagenRecortada(item.image, 960, 540)} 2x`}
                  alt={item.alt}
                  width={480}
                  height={270}
                  loading="lazy"
                  decoding="async"
                />
                <span className="del-blog-categoria">{item.category}</span>
                <span className="del-blog-item-titulo">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DelBlog;
