import React from 'react';
import konnektlady from '../img/konnektlady.svg';
import orNidur from '../img/or-nidur-bla.svg';
import orHlidarBla from '../img/or-hlidar-bla.svg';
import orHlidarGraen from '../img/or-hlidar-graen.svg';

import okkarSyn from '../img/okkarsyn.svg';
import konnektDude from '../img/konnektdude.svg';
import { Element } from 'react-scroll';
import { Link as ScrollLink } from 'react-scroll';

import { HashLink as Link } from 'react-router-hash-link';
import * as ROUTES from '../../constants/routes';
import Slideshow from '../Landing/slideshow.js';
const Landing = () => (


  <div className="page-wrapper landing">
    <Element name="logoScroll"></Element>
    <div className="landing-section">

      <div className="landing-img-container">

        <img className="konnekt-dude" src={konnektDude} />
        <img className="konnekt-lady" src={konnektlady} />
      </div>
      <h1>Örugg samskipti, <br></br>hraðar.</h1>
      <h2>Hjálpum fyrirtækjum að auka hagkvæmni og skilvirkni í rekstri með því að veita þeim auðveldar og traustar auðkenningar leiðir.</h2>
      <ScrollLink to="videoScroll" smooth={true} duration={500} >
        <button class="lausnir-btn">
          Sjá Lausnir
          <img className="or-nidur" src={orNidur} />
        </button>
      </ScrollLink>

    </div>

    <div className="section">
      <div className="summary-wrapper m-h">
        <a id="lausnir" />

        <h3>Hvað er?</h3>
        <h4>Konnekt</h4>
        <p>Með Konnekt opna fyrirtæki fyrir örugga samskiptaleið á milli þeirra og viðskiptavinarins. Þar er hægt að afhenda upplýsingar og gögn á öruggan hátt á rafrænum vettvangi.</p>
        <p>Konnekt kemur til móts við þarfir fólks um að geta fengið einstaklingsmiðaða þjónustu og ráðgjöf á netinu. Það vill geta spurt strax og fengið skjót svör óháð staðsetningu. Ferlið er hratt og auðvelt í notkun. </p>
      </div>
      <div className="summary-decoration m-v">
        <Slideshow></Slideshow>
      </div>
    </div>

    <Element name="videoScroll"></Element>
    <div className="section">
      <div className="summary-wrapper order m-v">
        <h3>Hvernig virkar það?</h3>
        <h4>Virkar fyrir allt & alla</h4>
        <p>Konnekt er hægt að bæta við hvaða stafræna vettvang sem er, hvort sem það sé núverandi grunnkerfi eða samfélagsmiðla tól. Hér til hliðar sérðu dæmi um notkun. Möguleikarnir eru endalausir. </p>
      </div>
      <div className="summary-decoration m-h">
        {/* <video className="virkni-video" src="https://www.youtube.com/watch?v=KphI23vRfqg&feature=youtu.be" controls></video> */}
        <iframe className="virkni-video" width="900" height="506" src="https://www.youtube.com/embed/KphI23vRfqg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>

    <Element name="lausnirScroll"></Element>
    <div className="section">
      <a id="demo"></a>
      <div className="summary-wrapper m-h">
        <h3>Viltu prófa?</h3>
        <h4>Sjáðu & prófaðu snilldina</h4>
        <p>Hér til hliðar getur þú ýtt á takkana til að fá upp sýnishorn af því hvernig varan virkar. Þar getur þú prófað vöruna sem bæði fyrirtæki / þjónustufulltrúi og sem einstakling.</p>
      </div>
      <div className="summary-decoration m-v">
        <Link to={ROUTES.CHAT}><button className="big-btn blue">
          Einstaklingur
          <img className="or-hlidar-bla" src={orHlidarBla} />
        </button></Link>
        <Link to={ROUTES.SIGN_IN}><button className="big-btn green">
          Fyrirtæki
        <img className="or-hlidar-graen" src={orHlidarGraen} />
        </button></Link>
      </div>
    </div>



    <Element name="umOkkurScroll"></Element>
    <div className="section okkar-syn-section">
      <div className="summary-wrapper order m-v">
        {/* <a id="okkar-syn" /> */}
        <h3>Framtíðin</h3>
        <h4>Okkar sýn</h4>
        <p>Stafræn þróun hefur þann eiginleika að geta mótað framtíðina að þörfum fólks til hins betra. Fólk vill áreiðlanlega þjónustu og góða upplifun í samskiptum við fyrirtæki hvar og hvenar sem það þarf hana.</p>
        <p>Við hjálpum fyrirtækjum að ná árangi í samskiptum við viðskiptavini sína á stafrænum vettvangi.</p>
        <p>Við trúum á það að leysa vandamál fyrst. Fyrirtæki þurfa að vinna hratt við þróun á stafrænum vörum, læra af markaðnum og kynnast því hver þeirra nútíma notandi er.</p>
      </div>

      <div className="summary-decoration okkar-syn-container m-h">
        <img className="okkar-syn" src={okkarSyn} />
      </div>
    </div>

    <Element name="hafaSambandScroll"></Element>
    <footer>
      <div class="list-container m-h">
        <a id="samband" />
        <h2>ER ÞITT FYRIRTÆKI TILBÚIÐ TIL ÞESS AÐ...</h2>
        <ul>
          <div className="list-item">
            <div className="dot"></div><li>Ræða um framtíðina ?</li>
          </div>
          <div className="list-item">
            <div className="dot"></div><li>Öryggisvæða stafrænu viðskipti ?</li>
          </div>
          <div className="list-item">
            <div className="dot"></div><li>Auðvelda og persónuvæða samskiptaferla ?</li>
          </div>
        </ul>
      </div>
      <div class="contact-link-container m-v">
        <p class="senduokkurlinu">Sendu okkur línu á</p>
        <a className="contact-link">hello@konnekt.is</a>
      </div>

    </footer>
  </div>//Page wrapper end
);

export default Landing;
