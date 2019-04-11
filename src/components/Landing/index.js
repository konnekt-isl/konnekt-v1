import React from 'react';
import konnektlady from '../img/konnektlady.svg';
import logo from '../img/logo.svg';
const Landing = () => (
  <div className="page-wrapper landing">
    <header>
    <img src={logo} />
      <nav>
        <ul>
          <li>Lausnir</li>
          <li>Demo</li>
          <li>Um okkur</li>
          <li>Hafa samband</li>
        </ul>
      </nav>
    </header>
        <div className="section">
          <h1>Örugg samskipti,<br></br>Hraðar.</h1>
          <h2>Hjálpum fyrirtækjum að auka hagkvæmni og skilvirkni í rekstri</h2>
          <button>Lausnir</button>
          <img src={konnektlady} />
        </div>
        <div className="section">
          <div className="summary-wrapper">
              <h3>Hvað er?</h3>
              <h4>Konnekt</h4>
              <p>Með Konnekt opna fyrirtæki fyrir örugga samskiptaleið á milli þeirra og viðskiptavinarins. Þar er hægt að afhenda upplýsingar og gögn á öruggan hátt á rafrænum vettvangi.</p>
              <p>Konnekt kemur til móts við þarfir fólks um að geta fengið einstaklingsmiðaða þjónustu og ráðgjöf á netinu. Það vill geta spurt strax og fengið skjót svör óháð staðsetningu. Ferlið er hratt og auðvelt í notkun. </p>
          </div>
        </div>

        <div className="section">
          <div className="summary-wrapper">
            <h3>Hvernig virkar það?</h3>
            <h4>Virkar fyrir allt og alla</h4>
            <p>Konnekt er hægt að bæta við hvaða stafræna vettvang sem er, hvort sem það sé núverandi grunnkerfi eða samfélagsmiðla tól.  Hér til hliðar sérðu dæmi um notkun. Möguleikarnir eru endalausir. </p>
          </div>
        </div>

        <div className="section">
          <div className="summary-wrapper">
            <h3>Viltu prófa?</h3>
            <h4>Sjáðu snilldina</h4>
            <p>Segðu okkur hvort þú sért fyrirtæki eða einstaklingur og við leiðum þig áfram. </p>
            <button>Einstaklingur<br></br>Meira</button>
            <button>Fyrirtæki<br></br>Meira</button>
          </div>
        </div>

        <div className="section">
          <div className="summary-wrapper">
            <h3>Framtíðin</h3>
            <h4>Okkar sýn</h4>
            <p>Stafræn þróun hefur þann eiginleika að geta mótað framtíðina að þörfum fólks til hins betra. Fólk vill áreiðlanlega þjónustu og góða upplifun í samskiptum við fyrirtæki hvar og hvenar sem það þarf hana.</p>
            <p>Við hjálpum fyrirtækjum að ná árangi í samskiptum við viðskiptavini sína á stafrænum vettvangi.</p>
            <p>Við trúum á það að leysa vandamál fyrst. Fyrirtæki þurfa að vinna hratt við þróun á stafrænum vörum, læra af markaðnum og kynnast því hver þeirra nútíma notandi er.</p>
          </div>
        </div>

        <footer>
          <p>Er þitt fyrirtæki tilbúið til þess að?</p>
          <ul>
          <li>Ræða um framtíðina?</li>
          <li>Öryggisvæða stafrænu samskiptaleiðirnar?</li>
          </ul>
          <p>hello@konnekt.is</p>
        </footer>

  </div>//Page wrapper end

);

export default Landing;
