import React from 'react';
import konnektlady from '../img/konnektlady.svg';
import okkarSyn from '../img/okkarsyn.svg'
import konnektDude from '../img/konnektdude.svg';
import mobileMockup from '../img/iPhoneX.png';

import { HashLink as Link } from 'react-router-hash-link';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Landing = () => (
  <div className="page-wrapper landing">
 
    <div className="landing-section">

    <div className="landing-img-container">
      <img className="konnekt-dude" src={konnektDude} />
      <img className="konnekt-lady" src={konnektlady} />
    </div>
 
      <h1>Örugg samskipti, <br></br>hraðar.</h1>
      <h2>Hjálpum fyrirtækjum að auka hagkvæmni og skilvirkni í rekstri með því að veita þeim auðveldar og traustar auðkenningar leiðir.</h2>
      <button class="lausnir-btn">Sjá Lausnir</button>
    </div>

    <div className="section">
      <a id="lausnir" />
      <div className="summary-wrapper">
        <h3>Hvað er?</h3>
        <h4>Konnekt</h4>
        <p>Með Konnekt opna fyrirtæki fyrir örugga samskiptaleið á milli þeirra og viðskiptavinarins. Þar er hægt að afhenda upplýsingar og gögn á öruggan hátt á rafrænum vettvangi.</p>
        <p>Konnekt kemur til móts við þarfir fólks um að geta fengið einstaklingsmiðaða þjónustu og ráðgjöf á netinu. Það vill geta spurt strax og fengið skjót svör óháð staðsetningu. Ferlið er hratt og auðvelt í notkun. </p>
      </div>
      <div className="summary-decoration">
        <img className="mobile-mockup" src={mobileMockup} />
      </div>
    </div>

    <div className="section">

      <div className="summary-wrapper">
        <h3>Hvernig virkar það?</h3>
        <h4>Virkar fyrir allt og alla</h4>
        <p>Konnekt er hægt að bæta við hvaða stafræna vettvang sem er, hvort sem það sé núverandi grunnkerfi eða samfélagsmiðla tól. Hér til hliðar sérðu dæmi um notkun. Möguleikarnir eru endalausir. </p>
      </div>

      <div className="summary-decoration">
        <video width="320" height="240" controls>
          {/* <source src="movie.mp4" type="video/mp4">
            <source src="movie.ogg" type="video/ogg"> */}
        </video>
      </div>


    </div>

    <div className="section">

      <a id="demo" />
      <div className="summary-wrapper">
        <h3>Viltu prófa?</h3>
        <h4>Sjáðu snilldina</h4>
        <p>Hér til hliðar getur þú ýtt á takkana til að fá upp sýnishorn af því hvernig varan virkar. Þar getur þú prófað vöruna sem bæði fyrirtæki / þjónustufulltrúi og sem einstakling.</p>
      </div>
      
      <div className="summary-decoration">
        <Link to={ROUTES.CHAT}><button className="big-btn blue">Einstaklingur</button></Link>
        <button className="big-btn green">Fyrirtæki</button>
      </div>

    </div>

    <div className="section okkar-syn-section">
      <div className="summary-wrapper">
        <a id="okkar-syn" />
        <h3>Framtíðin</h3>
        <h4>Okkar sýn</h4>
        <p>Stafræn þróun hefur þann eiginleika að geta mótað framtíðina að þörfum fólks til hins betra. Fólk vill áreiðlanlega þjónustu og góða upplifun í samskiptum við fyrirtæki hvar og hvenar sem það þarf hana.</p>
        <p>Við hjálpum fyrirtækjum að ná árangi í samskiptum við viðskiptavini sína á stafrænum vettvangi.</p>
        <p>Við trúum á það að leysa vandamál fyrst. Fyrirtæki þurfa að vinna hratt við þróun á stafrænum vörum, læra af markaðnum og kynnast því hver þeirra nútíma notandi er.</p>
      </div>

      
      <div className="summary-decoration okkar-syn-container">
      <img className="okkar-syn" src={okkarSyn} />
      </div>

    </div>

    <footer>

      <a id="samband" />
      <div class="list-container">
        <h2>Er þitt fyrirtæki tilbúið til þess að...</h2>
        <ul>
        <div className="list-item">
          <div className="dot"></div><li>Ræða um framtíðina?</li>
        </div>
         <div className="list-item">
          <div className="dot"></div><li>Öryggisvæða stafrænu samskiptaleiðirnar?</li>
        </div>
         <div className="list-item">
          <div className="dot"></div><li>Auðvelda ferla í kringum samskiptaleiðir?</li>
        </div>
         <div className="list-item">
          <div className="dot"></div><li>Auka persónugerða þjónustu til viðskiptavina?</li>
        </div>
        </ul>
      </div>
      <div class="contact-link-container">
        <p>Sendu okkur línu á ...</p>
        <a className="contact-link">hello@konnekt.is</a>
      </div>

    </footer>
  </div>//Page wrapper end
);

export default Landing;
