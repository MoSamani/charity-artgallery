# Charity-artgallery

## Projektteam

- Erfanulla Kazikhil
- Trinh Le
- Shima Navaeian
- Mohammad Samani

## Abstract

CANDU – Creativity, Art, and Democracy United
Dieses Projekt wurde im Rahmen des Moduls "Konzeption und Entwicklung einer NPO-Auktionsplattform: UI und UX" an der Hochschule Düsseldorf entwickelt. Ziel ist die Schaffung einer Webanwendung, die es Studierenden – insbesondere aus dem Designbereich – ermöglicht, ihre eigenen Kunstwerke in einer eintägigen Auktion zum Verkauf anzubieten.

Dabei können sie wählen, ob sie den Erlös behalten oder für humanitäre Zwecke spenden möchten. Das gesammelte Geld wird für wohltätige Zwecke genutzt. Gleichzeitig bietet die Plattform eine Möglichkeit, kreative Werke einem interessierten Publikum zugänglich zu machen.

Funktionen der Plattform:
Registrierung für alle Studierenden und Mitarbeitenden der Hochschule Düsseldorf

Kunstwerke hochladen und für die Auktion freigeben

Gebote auf Artworks abgeben

Favoriten liken und verfolgen

Die Auktion läuft über einen Zeitraum von 24 Stunden (12:00 Uhr bis 12:00 Uhr des Folgetags). Nach Ablauf der Auktion findet eine Veranstaltung statt, bei der sich Käufer und Künstler treffen, um die erworbenen Werke zu übergeben und den Abschluss gemeinsam zu feiern.

CANDU steht für Creativity, Art, and Democracy United – eine Plattform, die Kunst, Gemeinschaft und soziales Engagement miteinander verbindet.

## Installation/Bedienungsanleitung

1. Installiere [Node.js](https://nodejs.org/en/).

2. Installiere [Git](https://git-scm.com/downloads).

3. Öffne eine Konsole, navigiere zum gewünschten Verzeichnis und klone das [Projekt-Repository](https://github.com/MoSamani/charity-artgallery) von GitHub mit folgendem Befehl:

   ```
   git clone https://github.com/MoSamani/charity-artgallery.git
   ```

   Zugang zum Repository kann beim Projektteam angefragt werden.

4. Öffne das geklonte Projekt mit [Visual Studio Code](https://code.visualstudio.com/).

5. Navigiere zum _backend_-Ordner, erstelle eine _.env_-Datei für Umgebungsvariablen (wie z.B. API-Keys) und füge folgenden Inhalt hinzu:

   ```
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_secret
   JWT_LIFETIME=3600s  # Lebensdauer des Tokens, z. B. 1 Stunde
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   ```

6. Öffne ein [Terminal](https://code.visualstudio.com/docs/terminal/basics) in Visual Studio Code und installiere die benötigten Projekt-Pakete mit folgendem Befehl:

   ```
   npm install
   ```

7. Starte den lokalen Entwicklungsserver mit folgendem Befehl:
   ```
   npm start
   ```
   Ein neues Browserfenster http://localhost:3000/ öffnet sich und zeigt die Startseite des Projekts.
