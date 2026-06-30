import Cart from '../components/Cart';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Chiikawa() {
  const { cart, addToCart } = useContext(CartContext);
  const { t } = useTranslation(); // Hook de traducción
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");
    if (usuarioGuardado) setUsuario(usuarioGuardado);
  }, []);

const toggleMenu = () => setMenuAbierto(!menuAbierto);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("usuarioLogueado");
    setUsuario(null);
    window.location.reload();
  };

  return (
    <div className="pagina-chiikawa">
      <div className="burbuja burbuja-1"></div>
      <div className="burbuja burbuja-2"></div>
      <div className="burbuja burbuja-3"></div>
      <div className="burbuja burbuja-4"></div>
      <div className="burbuja burbuja-5"></div>

      <header id="inicio" style={{ textAlign: 'center' }}>
        <div className="logo" style={{ marginTop: '20px' }}>
          <img src="images/iconhachiware.webp" alt="Logo Chiikawa" style={{ width: '100px' }} />
          <h1>Mundo Chiikawa</h1>
        </div>

        <nav className="menu-principal">
          <ul>
            <li><a href="#introduccion">{t('menu.historia')}</a></li>
            <li><a href="#recetas-saladas">{t('menu.recetas')}</a></li>
            <li><a href="#postres">{t('menu.postres')}</a></li>
            <li><a href="#redes-footer">{t('menu.contacto')}</a></li>
            <li>
              <button 
                onClick={() => setCarritoAbierto(true)} 
                style={{ background: 'none', border: 'none', color: '#4980f8', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>
                🛒 {t('menu.carrito')}
              </button>
            </li>
          </ul>
        </nav>

        {/* Menú de usuario (Hamburguesa) */}
        <div className="user-menu-container">
          <button className="hamburger-btn" onClick={toggleMenu}><span></span><span></span><span></span></button>
          <div className={`dropdown-menu ${menuAbierto ? 'show' : ''}`}>
            {!usuario ? (
              <div id="auth-links" style={{ display: 'flex', flexDirection: 'column' }}>
                <Link to="/registro">{t('auth.login')}</Link>
                <Link to="/registro">{t('auth.registro')}</Link>
              </div>
            ) : (
              <div id="user-info">
                <span className="welcome-text">{t('auth.bienvenido')}, <b>{usuario}</b></span>
                <hr style={{ margin: '5px 0' }} />
                <a href="#" onClick={logout}>{t('auth.logout')}</a>
              </div>
            )}
          </div>
        </div>

        <section className="carrusel-container">
          <div className="carrusel-pista">
            <div className="carrusel-item"><img src="images/sushi.png" alt="1" /></div>
            <div className="carrusel-item"><img src="images/pan_pizza.png" alt="2" /></div>
            <div className="carrusel-item"><img src="images/puding.png" alt="3" /></div>
            <div className="carrusel-item"><img src="images/sopa.png" alt="4" /></div>
            <div className="carrusel-item"><img src="images/pancakes.png" alt="5" /></div>
            <div className="carrusel-item"><img src="images/canele.png" alt="6" /></div>
            <div className="carrusel-item"><img src="images/relleno.png" alt="7" /></div>
            <div className="carrusel-item"><img src="images/pasta.png" alt="8" /></div>
            
            {/* Duplicados para el efecto infinito */}
            <div className="carrusel-item"><img src="images/sushi.png" alt="1" /></div>
            <div className="carrusel-item"><img src="images/pan_pizza.png" alt="2" /></div>
            <div className="carrusel-item"><img src="images/puding.png" alt="3" /></div>
            <div className="carrusel-item"><img src="images/sopa.png" alt="4" /></div>
            <div className="carrusel-item"><img src="images/pancakes.png" alt="5" /></div>
            <div className="carrusel-item"><img src="images/canele.png" alt="6" /></div>
            <div className="carrusel-item"><img src="images/relleno.png" alt="7" /></div>
            <div className="carrusel-item"><img src="images/pasta.png" alt="8" /></div>
          </div>
        </section>
      </header>

      <main>
        <section aria-labelledby="introduccion">
          <h2 id="introduccion">Historia</h2>
          <p>En el <strong>Mundo de Chiikawa</strong>, cada día es una aventura llena de desafíos. A veces toca trabajar duro recolectando hierbas o enfrentando criaturas misteriosas para obtener una "recompensa". Pero lo que hace que este mundo sea realmente especial no es solo el tesoro obtenido, sino lo que sucede después.</p>
          <p>Para Chiikawa, Hachiware y Usagi, la comida no es solo sustento; es el lenguaje con el que celebran que están juntos. Ya sea compartiendo un tazón de ramen caliente tras una jornada agotadora, descubriendo una fuente mágica de pudding o preparando un pan de pizza en su pequeña cueva, cada bocado es un momento de alegría compartida.</p>
          <p>En <strong>"Cocina con Hachiware"</strong>, creemos que las mejores recetas son las que se preparan con curiosidad y se disfrutan con amigos. Porque en este mundo, no hay problema tan grande que un postre esponjoso o un plato de pasta bien hecho no puedan hacer un poquito más ligero. ¡Acompáñanos a cocinar estos pequeños momentos de felicidad!</p>
        </section>

        <section aria-labelledby="recetas-saladas">
          <h2 id="recetas-saladas">Recetas saladas</h2>

          <article>
            <h3>Pot-au-feu</h3>
            <div className="cuerpo-receta">
              <img src="images/sopa.png" alt="Imagen de Pot-au-feu" />
              <aside>
                <h4>Ingredientes</h4>
                <ul>
                  <li>1 kg de carne de vacuno para cocido</li>
                  <li>2 a 4 huesos de tuétano</li>
                  <li>4 zanahorias grandes.</li>
                  <li>2 puerros (solo la parte blanca y verde claro).</li>
                  <li>2 nabos.</li>
                  <li>4 papas medianas.</li>
                  <li>2 ramas de apio.</li>
                  <li>1 cebolla blanca.</li>
                  <li>2 clavos de olor (incrustados en la cebolla).</li>
                  <li>1 bouquet garni (tomillo, laurel y perejil atados).</li>
                  <li>Sal gruesa y pimienta en grano.</li>
                </ul>
              </aside>
            </div>
            <div className="preparacion-receta">
              <h4>Preparación</h4>
              <ol>
                <li>Sellar y Limpiar: Coloca la carne en una olla grande y cúbrela con agua fría. Lleva a ebullición y deja hervir por 2-3 minutos. Escurre y enjuaga la carne y la olla; esto ayuda a que el caldo quede transparente y libre de impurezas.</li>
                <li>El Caldo: Regresa la carne a la olla limpia. Cubre con unos 3 litros de agua fría. Añade la cebolla (con los clavos), el apio, el bouquet garni, una pizca de sal gruesa y los granos de pimienta.</li>
                <li>Cocción Lenta: Cocina a fuego muy bajo, apenas burbujeando, durante 2 horas. Es vital ir retirando la espuma que suba a la superficie con una espumadera.</li>
                <li>Incorporar Vegetales: Añade las zanahorias, los nabos y los puerros. Cocina por 40 minutos más.</li>
                <li>Las Papas: Tradicionalmente, las papas se cuecen aparte en un poco del caldo del pot-au-feu para evitar que el almidón enturbie la sopa principal. Cocínalas hasta que estén tiernas (unos 20 minutos).</li>
                <li>El Toque Final: Si usas huesos de tuétano, añádelos a la olla principal en los últimos 15 minutos de cocción.</li>
              </ol>
            </div>
          </article>

          <article>
            <h3>Pan de Pizza (Estilo Cueva)</h3>
            <div className="cuerpo-receta">
              <img src="images/pan_pizza.png" alt="Imagen de Pan de Pizza" />
              <aside>
                <h4>Ingredientes</h4>
                <p><strong>La Masa</strong></p>
                <ul>
                  <li>500 g de harina de fuerza (tipo 00).</li>
                  <li>300 ml de agua tibia.</li>
                  <li>7 g de levadura seca de panadería (o 20 g de levadura fresca).</li>
                  <li>2 cucharadas de aceite de oliva virgen extra.</li>
                  <li>1 pizca de sal.</li>
                </ul>
                <p><strong>El Relleno (Estilo Clásico)</strong></p>
                <ul>
                  <li>200 g de queso mozzarella rallado (o en cubos pequeños).</li>
                  <li>100 g de pepperoni o jamón picado.</li>
                  <li>100 ml de salsa de tomate espesa (tipo passata).</li>
                  <li>1 pimiento verde pequeño picado finamente.</li>
                </ul>
                <p><strong>Para el Barnizado y Aroma</strong></p>
                <ul>
                  <li>1 huevo batido (para dorar).</li>
                  <li>1 cucharadita de orégano seco.</li>
                  <li>1 diente de ajo picado muy fino (mezclado con un poco de aceite).</li>
                </ul>
              </aside>
            </div>
            <div className="preparacion-receta">
              <h4>Preparación</h4>
              <ol>
                <li><strong>Activar la Levadura:</strong> En un bol pequeño, mezcla el agua tibia con la levadura. Deja reposar por 5-10 minutos hasta que veas que empieza a burbujear.</li>
                <li><strong>Amasado:</strong> En un bol grande, pon la harina y la sal. Haz un hueco en el centro y añade la mezcla de levadura y el aceite de oliva. Amasa durante unos 10 minutos a mano (o 5 con robot) hasta obtener una masa elástica que no se pegue a los dedos.</li>
                <li><strong>Primer Leudado:</strong> Coloca la masa en un bol aceitado, cúbrela con un paño húmedo y déjala reposar en un lugar cálido durante 1 hora o hasta que duplique su tamaño.</li>
                <li><strong>Formado y Relleno:</strong> Desgasifica la masa presionándola suavemente. Estírala sobre una superficie enharinada formando un gran rectángulo. Extiende la salsa de tomate (sin llegar a los bordes), añade el queso, el pepperoni y el pimiento.</li>
                <li><strong>El Cierre:</strong> Enrolla la masa con cuidado como si fuera un brazo de reina (o un cilindro) y sella bien los bordes con un poco de agua para que no se escape el relleno.</li>
                <li><strong>Segundo Leudado y Horneado:</strong> Coloca el pan en una bandeja de horno. Deja reposar 20 minutos más. Mientras tanto, precalienta el horno a 200°C.</li>
                <li><strong>Cocción:</strong> Pincela con el huevo batido, añade el ajo picado y el orégano por encima. Hornea durante 25-30 minutos hasta que esté bien dorado y suene hueco al golpearlo por debajo.</li>
              </ol>
            </div>
          </article>

          <article>
            <h3>Nigiri Sushi Tradicional</h3>
            <div className="cuerpo-receta">
              <img src="images/sushi.png" alt="Imagen de Nigiri Sushi" />
              <aside>
                <h4>Ingredientes</h4>
                <p><strong>El Arroz (Shari)</strong><br />
                <small><em>Es el alma del sushi clásico. Debe estar a temperatura corporal al servir.</em></small></p>
                <ul>
                  <li>500 g de arroz de grano corto (tipo Japonica).</li>
                  <li>600 ml de agua.</li>
                  <li>Aderezo: 4 cucharadas de vinagre de arroz, 1 de azúcar y 1 pizca de sal (el estilo de Tokio lleva menos azúcar y más sal).</li>
                </ul>
                <p><strong>El Pescado (Neta)</strong></p>
                <ul>
                  <li>400 g de lomo de Salmón o Atún rojo (grado sashimi, congelado a -20°C por seguridad).</li>
                  <li>Opcional: Camarones cocidos y abiertos en mariposa o láminas de pulpo.</li>
                </ul>
                <p><strong>Complementos</strong></p>
                <ul>
                  <li>Wasabi auténtico (o en pasta de buena calidad).</li>
                  <li>Salsa de soja de fermentación natural.</li>
                  <li>Gari (jengibre encurtido) para limpiar el paladar entre piezas.</li>
                </ul>
              </aside>
            </div>
            <div className="preparacion-receta">
              <h4>Preparación</h4>
              <ol>
                <li><strong>Preparar el Arroz - Lavado:</strong> Lava el arroz frotándolo suavemente hasta que el agua salga cristalina.</li>
                <li><strong>Preparar el Arroz - Cocción:</strong> Cocina el arroz con el agua (relación 1:1.2). Una vez listo, deja reposar 10 minutos tapado.</li>
                <li><strong>Preparar el Arroz - Vinagrado:</strong> Pasa el arroz a un recipiente de madera (hangiri) y añade el aderezo con movimientos de corte. Abanica mientras mezclas para que el grano quede brillante y no se apelmace.</li>
                <li><strong>El Corte del Pescado (Saku):</strong> Toma el lomo de pescado y corta láminas de unos 6 cm de largo, 3 cm de ancho y 0.5 cm de grosor. El corte debe ser un solo movimiento fluido hacia atrás, usando toda la longitud del cuchillo para no "aserrar" la carne.</li>
                <li><strong>Formado del Nigiri - Humedecer:</strong> Ten un bol con agua y un poco de vinagre para humedecerte las manos constantemente.</li>
                <li><strong>Formado del Nigiri - La Base:</strong> Toma una pequeña cantidad de arroz (unos 15-20 g) con la mano derecha y forma un óvalo firme pero aireado. No lo aprietes demasiado; el arroz debe deshacerse en la boca.</li>
                <li><strong>Formado del Nigiri - El Armado:</strong> Toma una lámina de pescado con la mano izquierda, pon un puntito de wasabi en el centro del pescado y coloca el óvalo de arroz encima.</li>
                <li><strong>Formado del Nigiri - Presión:</strong> Usa los dedos índice y medio para presionar suavemente el arroz contra el pescado, dándole una forma arqueada elegante.</li>
              </ol>
            </div>
          </article>

          <article>
            <h3>Spaghetti Medusa (Pasta con Salchichas)</h3>
            <div className="cuerpo-receta">
              <img src="images/pasta.png" alt="Imagen de Hachiware cocinando pasta" />
              <aside>
                <h4>Ingredientes</h4>
                <p><strong>La Pasta</strong></p>
                <ul>
                  <li>400 g de spaghetti.</li>
                  <li>4 litros de agua para la cocción.</li>
                  <li>Sal a gusto.</li>
                </ul>
                <p><strong>El Acompañamiento</strong></p>
                <ul>
                  <li>6 a 8 salchichas de buena calidad (pueden ser de pavo o cerdo).</li>
                  <li>2 tazas de salsa de tomate (pomodoro o passata).</li>
                  <li>1 cebolla pequeña picada fina y 1 diente de ajo.</li>
                  <li>1 cucharadita de orégano seco y aceite.</li>
                </ul>
                <p><strong>Toques Finales</strong></p>
                <ul>
                  <li>Queso parmesano rallado.</li>
                  <li>Hojas de albahaca fresca o perejil para decorar.</li>
                </ul>
              </aside>
            </div>
            <div className="preparacion-receta">
              <h4>Preparación</h4>
              <ol>
                <li><strong>Corte Divertido:</strong> Corta las salchichas en rodajas de unos 2 cm. <em>Tip de Hachiware:</em> ¡Atraviesa los trozos con 5 o 6 spaghetti crudos para que parezcan medusas al cocerse!</li>
                <li><strong>El Sofrito:</strong> En una sartén, calienta aceite y sofríe la cebolla y el ajo hasta que estén transparentes. Añade las salchichas y dóralas un poco.</li>
                <li><strong>La Salsa:</strong> Vierte la salsa de tomate y el orégano. Cocina a fuego bajo por 10 minutos hasta que espese y tome sabor.</li>
                <li><strong>Cocer la Pasta:</strong> Hierve los spaghetti en agua con sal hasta que estén al dente. <strong>¡No olvides guardar media taza del agua de cocción antes de colar!</strong></li>
                <li><strong>Unión Final:</strong> Escurre la pasta y échala a la sartén. Añade el agua que guardaste; esto hará que la salsa quede cremosa y se pegue bien a los fideos.</li>
              </ol>
            </div>
          </article>
        </section>

        <section aria-labelledby="postres">
          <h2 id="postres">Postres</h2>
          
          <article>
            <h3>Dorayaki (Pancakes con Pasta de Frijol)</h3>
            <div className="cuerpo-receta">
              <img src="images/relleno.png" alt="Imagen de Dorayakis tiernos" />
              <aside>
                <h4>Ingredientes</h4>
                <p><strong>La Masa (Pancakes de Miel)</strong></p>
                <ul>
                  <li>2 huevos grandes.</li>
                  <li>100 g de azúcar flor (o azúcar granulada fina).</li>
                  <li>1 cucharada de miel de abeja.</li>
                  <li>160 g de harina sin polvos de hornear.</li>
                  <li>1 cucharadita de polvos de hornear (o bicarbonato de sodio).</li>
                  <li>2 a 3 cucharadas de agua (para ajustar la densidad).</li>
                  <li>Aceite de maravilla (solo para engrasar apenas la sartén).</li>
                </ul>
                <p><strong>El Relleno (Pasta de Frijol Verde)</strong></p>
                <ul>
                  <li>200 g de frijoles verdes (Mung) pelados.</li>
                  <li>100 g de azúcar.</li>
                  <li>1 pizca de sal.</li>
                  <li>Agua (la necesaria para el remojo y la cocción).</li>
                </ul>
              </aside>
            </div>
            <div className="preparacion-receta">
              <h4>Preparación</h4>
              <ol>
                <li><strong>El Relleno - Remojo:</strong> Deja los frijoles verdes en agua fría durante al menos 4 horas (o toda la noche).</li>
                <li><strong>El Relleno - Cocción:</strong> Enjuaga y cocina los frijoles en una olla con abundante agua hasta que estén muy blandos (aprox. 30-40 minutos).</li>
                <li><strong>El Relleno - Procesado:</strong> Escurre el agua sobrante y tritura los frijoles calientes con una procesadora o pasapuré hasta que no queden grumos.</li>
                <li><strong>El Relleno - Endulzado:</strong> Pasa la pasta a una sartén limpia a fuego medio-bajo. Añade el azúcar y la pizca de sal. Revuelve constantemente hasta que el azúcar se disuelva y la pasta espese lo suficiente como para mantener su forma. Deja enfriar.</li>
                <li><strong>La Masa - Mezcla Base:</strong> En un bol, bate los huevos con el azúcar y la miel hasta que la mezcla esté espumosa y un poco más clara.</li>
                <li><strong>La Masa - Tamizado:</strong> Añade la harina y los polvos de hornear tamizados sobre la mezcla de huevo. Mezcla suavemente con un batidor de mano.</li>
                <li><strong>La Masa - Reposo:</strong> Deja reposar la masa en el refrigerador durante 15 minutos. Esto ayuda a que el gluten se relaje y la superficie quede lisa.</li>
                <li><strong>La Masa - Ajuste:</strong> Saca la masa y añade las cucharadas de agua una a una. La consistencia debe ser fluida pero espesa, como una crema.</li>
                <li><strong>Horneado - Temperatura:</strong> Calienta una sartén antiadherente a fuego muy bajo. Pasa una servilleta con una gota de aceite y luego límpiala (queremos una superficie lisa, sin charcos de aceite).</li>
                <li><strong>Horneado - Formado:</strong> Vierte un poco de masa para formar círculos de unos 8-10 cm.</li>
                <li><strong>Horneado - Burbujas:</strong> Cuando veas que aparecen burbujas pequeñas en la superficie y los bordes se vean secos (aprox. 2 minutos), dalo vuelta con cuidado. Cocina por 30-40 segundos más por el otro lado.</li>
                <li><strong>Horneado - Enfriado:</strong> Deja las tapitas bajo un paño húmedo para que no se sequen y mantengan su elasticidad. ¡Luego solo rellénalas con la pasta y disfruta!</li>
              </ol>
            </div>
          </article>

          <article>
            <h3>Pudding de Vainilla</h3>
            <div className="cuerpo-receta">
              <img src="images/puding.png" alt="Imagen de Pudding de Vainilla" />
              <aside>
                <h4>Ingredientes</h4>
                <p><strong>La Base Cremosa</strong></p>
                <ul>
                  <li>500 ml de leche entera (la leche entera da mejor consistencia).</li>
                  <li>100 g de azúcar blanca.</li>
                  <li>30 g de maicena (almidón de maíz) para espesar.</li>
                  <li>3 yemas de huevo grandes.</li>
                  <li>1 pizca de sal.</li>
                </ul>
                <p><strong>Aromas y Acabado</strong></p>
                <ul>
                  <li>1 cucharadita de extracto de vainilla potente.</li>
                  <li>30 g de mantequilla sin sal (fría y en cubos).</li>
                </ul>
              </aside>
            </div>
            <div className="preparacion-receta">
              <h4>Preparación</h4>
              <ol>
                <li><strong>Mezcla Seca y Yemas:</strong> En un bol mediano, mezcla el azúcar, la maicena y la pizca de sal. Añade las yemas de huevo y un chorrito de la leche fría (unos 50 ml). Bate bien con un batidor de mano hasta que no queden grumos y la mezcla esté pálida.</li>
                <li><strong>Calentar la Leche:</strong> En una olla a fuego medio, calienta el resto de la leche hasta que empiece a humear y veas burbujitas en los bordes (pero que no llegue a hervir a borbotones).</li>
                <li><strong>Temperado (Crucial):</strong> Vierte un poco de la leche caliente sobre la mezcla de yemas muy lentamente, revolviendo sin parar. Esto sube la temperatura de los huevos suavemente para que no se cocinen y parezcan revueltos.</li>
                <li><strong>Espesado:</strong> Regresa toda la mezcla a la olla. Cocina a fuego medio-bajo, revolviendo constantemente con una cuchara de madera o batidor, hasta que la mezcla espese y empiece a burbujear suavemente (unos 5-7 minutos).</li>
                <li><strong>El Toque Final:</strong> Retira del fuego. Añade la mantequilla fría y la vainilla. Revuelve hasta que la mantequilla se derrita por completo; esto le dará un brillo espejo y una textura sedosa.</li>
                <li><strong>Enfriado:</strong> Vierte el pudding en pocillos individuales.</li>
                <li><strong>Tip Pro:</strong> Para que no se le forme esa "capita" o piel dura arriba, coloca un trozo de papel film (alusa) tocando directamente la superficie del pudding mientras se enfría.</li>
              </ol>
            </div>
          </article>

          <article>
            <h3>Soufflé Pancakes (Panqueques de Nube)</h3>
            <div className="cuerpo-receta">
              <img src="images/pancakes.png" alt="Imagen de panqueques esponjosos" />
              <aside>
                <h4>Ingredientes</h4>
                <p><strong>La Base de Yema</strong></p>
                <ul>
                  <li>4 yemas de huevo grandes.</li>
                  <li>40 ml de leche entera.</li>
                  <li>1 cucharadita de extracto de vainilla.</li>
                  <li>60 g de harina sin polvos (tamizada) y ½ cdta de polvos de hornear.</li>
                </ul>
                <p><strong>El Merengue (La Estructura)</strong></p>
                <ul>
                  <li>4 claras de huevo (frías).</li>
                  <li>50 g de azúcar granulada fina.</li>
                  <li>1 cucharadita de jugo de limón (para estabilizar).</li>
                </ul>
              </aside>
            </div>
            <div className="preparacion-receta">
              <h4>Preparación</h4>
              <ol>
                <li><strong>Mezcla de Yemas:</strong> Bate las yemas con la leche y la vainilla. Agrega la harina y los polvos tamizados. Mezcla hasta que esté suave y reserva.</li>
                <li><strong>Hacer el Merengue:</strong> Bate las claras con el limón. Agrega el azúcar en tres partes hasta obtener picos firmes y brillantes.</li>
                <li><strong>Integración Delicada:</strong> Incorpora un tercio del merengue a las yemas. Luego, añade el resto con movimientos envolventes muy suaves para no perder el aire.</li>
                <li><strong>Cocción con Vapor:</strong> En un sartén antiadherente a fuego muy bajo, pon 2 o 3 cucharadas de mezcla una sobre otra. Añade una gota de agua al sartén (lejos de la mezcla) y tapa de inmediato.</li>
                <li><strong>El Giro:</strong> Cocina 5-6 min por lado. Voltea con mucho cuidado, añade otro poquito de agua, tapa y cocina por 5 min más. ¡Sírvelos de inmediato!</li>
              </ol>
            </div>
          </article>

          <article>
            <h3>Canelés de Burdeos (El Dulce Paciente)</h3>
            <div className="cuerpo-receta">
              <img src="images/canele.png" alt="Imagen de preparación de postres" />
              <aside>
                <h4>Ingredientes</h4>
                <p><strong>La Base Líquida</strong></p>
                <ul>
                  <li>500 ml de leche entera.</li>
                  <li>50 g de mantequilla sin sal.</li>
                  <li>1 vaina de vainilla (o 2 cdtas de extracto).</li>
                </ul>
                <p><strong>Los Secos y Unión</strong></p>
                <ul>
                  <li>250 g de azúcar flor.</li>
                  <li>125 g de harina sin polvos.</li>
                  <li>2 huevos grandes + 2 yemas adicionales.</li>
                  <li>50 ml de ron oscuro y una pizca de sal.</li>
                </ul>
              </aside>
            </div>
            <div className="preparacion-receta">
              <h4>Preparación</h4>
              <ol>
                <li><strong>Infusión de Leche:</strong> Calienta la leche con la mantequilla y la vainilla hasta que hierva suavemente. Retira del fuego y deja entibiar.</li>
                <li><strong>Mezcla de Secos y Huevos:</strong> Tamiza la harina, el azúcar y la sal. Añade los huevos y yemas, integrando con un batidor sin incorporar aire.</li>
                <li><strong>Unir Líquidos:</strong> Vierte la leche tibia sobre la mezcla poco a poco, revolviendo suavemente. Finalmente, añade el ron.</li>
                <li><strong>El Reposo Sagrado:</strong> Tapa la mezcla con film y déjala en el refrigerador por <strong>mínimo 24 horas</strong>. ¡Este es el secreto para el sabor intenso!</li>
                <li><strong>Horneado Doble:</strong> Precalienta a 220°C. Llena los moldes engrasados (dejando 5mm libres). Hornea 15 min a 220°C, luego baja a 180°C y cocina por 45-50 min más hasta que estén muy oscuros por fuera.</li>
              </ol>
            </div>
          </article>
        </section>
      </main>

      <footer className="pie-pagina-oficial" id="redes-footer">
        <img src="images/icon2.png" alt="Hachiware asomándose" className="hachiware-footer" />
        <div className="footer-columnas">
          <div className="columna-izq">
            <h2 className="logo-footer">COCiNA CON HACHiWARE</h2>
            <div className="redes-sociales">
              <a href="#">📷 Instagram oficial</a>
              <a href="#">📺 Canal de YouTube</a>
              <a href="#">🎵 TikTok de recetas</a>
            </div>
          </div>
          <div className="columna-cen">
            <a href="#introduccion">Inicio</a>
            <a href="#recetas-saladas">Recetas Saladas</a>
            <a href="#postres">Postres</a>
          </div>
          <div className="columna-der">
            <strong className="titulo-der">Mundo Chiikawa</strong>
            <Link to="/registro?view=contacto" style={{ background: 'white', color: '#4980f8', padding: '10px', borderRadius: '15px', textAlign: 'center', marginBottom: '10px', textDecoration: 'none', fontWeight: 'bold' }}>
              ¡Escríbenos aquí!
            </Link>
            <a href="#">Sobre el proyecto</a>
            <a href="#">Términos de uso</a>
            <a href="#">Privacidad</a>
            <p className="creditos">Desarrollado por Kai ✨</p>
          </div>
        </div>
      </footer>

      <a href="#inicio" className="boton-subir" title="Volver al inicio">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="icono-flecha">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </a>
      {/* Si carritoAbierto es true, mostramos el componente Cart */}
   {carritoAbierto && <Cart onClose={() => setCarritoAbierto(false)} />}
    </div>
  );
}

//boton de compras//

<button onClick={() => addToCart({ id: 1, name: 'Peluche Chiikawa', price: 15 })}>
  ¡Comprar Peluche! 🤑
</button>

export default Chiikawa;