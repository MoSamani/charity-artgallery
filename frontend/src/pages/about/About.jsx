import React from 'react'
import Navbar from '../../components/Navbar'
import './About.css'

function About() {
  return (
    <>
      <div>
        <Navbar />
        <div className="about-container">
          <h1>Über CANDU</h1>
          <p className="about-body-p">
            Willkommen bei CANDU, einer einzigartigen Plattform, die Kunst,
            Kreativität und soziales Engagement miteinander verbindet.
          </p>
          <h2>Was ist CANDU?</h2>
          <p className="about-body-p">
            CANDU ist eine geschlossene Online-Galerie innerhalb der
            Universität. Alle registrierten Nutzer*innen mit Uni-E-Mail können
            eigene Kunstwerke hochladen und anderen zum Kauf anbieten. Dabei
            entscheiden die Kunstschaffenden selbst, ob der Erlös behalten oder
            an eine wohltätige Organisation gespendet werden soll.
          </p>
          <h2>Wie funktioniert es?</h2>
          <ul className="about-body-ul">
            <li>
              Zugang zur Plattform erhalten ausschließlich Personen mit gültiger
              Uni-E-Mail.
            </li>
            <li>
              Beim Upload eines Werks wird festgelegt, ob der Erlös gespendet
              oder behalten wird.
            </li>
            <li>
              Spendenbereite Werke sind gekennzeichnet – Käufer*innen können in
              diesem Fall freiwillig mehr als den Mindestpreis zahlen.
            </li>
            <li>
              Ein Countdown auf der Startseite zeigt den Zeitraum der aktuellen
              Spendenaktion an.
            </li>
            <li>
              Nach Ablauf werden alle gesammelten Beträge aus Verkäufen mit
              Spendenoption an eine ausgewählte Organisation weitergeleitet.
            </li>
          </ul>
          <h2>Unsere Vision</h2>
          <p className="about-body-p">
            Wir glauben, dass Kunst nicht nur Ausdruck von Individualität ist,
            sondern auch Gemeinschaft stärken und positive Veränderung bewirken
            kann. CANDU schafft eine Plattform, auf der Kreativität sichtbar
            wird – und gleichzeitig Solidarität gelebt werden kann.
          </p>
          <p className="about-body-p">
            Ob als Künstler*in oder als Kunstliebhaber*in – werde Teil von CANDU
            und unterstütze Kunst mit Sinn.
          </p>
        </div>
      </div>
    </>
  )
}

export default About
