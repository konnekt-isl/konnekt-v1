import React from 'react';
import konnektlady from '../img/konnektlady.svg';
import okkarsyn from '../img/okkarsyn.png'
import sky from '../img/ský.svg';
import SVGIcon from "../img/SVGIcon";

import { HashLink as Link } from 'react-router-hash-link';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Landing = () => (
  <div className="page-wrapper landing">
    <div className="section landing-section">
      <h1>Örugg samskipti, <br></br>Hraðar.</h1>
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

      </div>
    </div>

    <div className="section">
      <div className="summary-decoration">
        <video width="320" height="240" controls>
          {/* <source src="movie.mp4" type="video/mp4">
            <source src="movie.ogg" type="video/ogg"> */}
        </video>
      </div>
      <div className="summary-wrapper">
        <h3>Hvernig virkar það?</h3>
        <h4>Virkar fyrir allt og alla</h4>
        <p>Konnekt er hægt að bæta við hvaða stafræna vettvang sem er, hvort sem það sé núverandi grunnkerfi eða samfélagsmiðla tól. Hér til hliðar sérðu dæmi um notkun. Möguleikarnir eru endalausir. </p>
      </div>
    </div>

    <div className="section">
      <a id="demo" />
      <div className="summary-wrapper">
        <h3>Viltu prófa?</h3>
        <h4>Sjáðu snilldina</h4>
        <p>Segðu okkur hvort þú sért fyrirtæki eða einstaklingur og við leiðum þig áfram. </p>
        {/* <SVGIcon className="arrow" name="arrow" fill="#000" width={431} height={8}/> */}
      </div>
      <div className="summary-decoration">
        <Link to={ROUTES.CHAT}><button className="big-btn blue">Einstaklingur</button></Link>
        <button className="big-btn green">Fyrirtæki</button>
      </div>
    </div>

    <div className="section okkar-syn-section">

      {/* <img className="okkar-syn" src={okkarsyn} alt="" /> */}
      <div className="summary-decoration okkar-syn-container">
        {/* <img className="okkar-syn" src={okkarsyn} /> */}
      </div>
      <div className="summary-wrapper">
        <a id="okkar-syn" />
        <h3>Framtíðin</h3>
        <h4>Okkar sýn</h4>
        <p>Stafræn þróun hefur þann eiginleika að geta mótað framtíðina að þörfum fólks til hins betra. Fólk vill áreiðlanlega þjónustu og góða upplifun í samskiptum við fyrirtæki hvar og hvenar sem það þarf hana.</p>
        <p>Við hjálpum fyrirtækjum að ná árangi í samskiptum við viðskiptavini sína á stafrænum vettvangi.</p>
        <p>Við trúum á það að leysa vandamál fyrst. Fyrirtæki þurfa að vinna hratt við þróun á stafrænum vörum, læra af markaðnum og kynnast því hver þeirra nútíma notandi er.</p>
      </div>

    </div>

    <footer>
      <a id="samband" />
      <div>
        <p>Er þitt fyrirtæki tilbúið til þess að</p>
        <ul>
          <li><img className="konnekt-sky" src={sky} />Ræða um framtíðina?</li>
          <li><img className="konnekt-sky" src={sky} />Öryggisvæða stafrænu samskiptaleiðirnar?</li>
        </ul>
      </div>
      <div>
        <a className="contact-link">hello@konnekt.is</a>
      </div>
    </footer>
  </div >//Page wrapper end
);

export default Landing;
