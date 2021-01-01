# Eindwerk_Development

Dit is een open source API die ontwikkeld is voor mijn vak development en mijn eindwerk. Op deze website kunnen kinderen via een interactief voorlees verhaal leren over de gevolgen van gezond/ ongezond eten. De open source api is dat je vragen, dankwoorden en technische problemen kan gebruiken in je website. Hierdoor hoef je geen lorem ipsum te gebruiken of hoef je geen tijd te steken in mogelijke vragen te bedenken.

## Hoe begin ik er nu aan?
### Lokaal laten draaien
- Je kan de api lokaal laten draaien via Docker. Als je dit niet hebt kan je deze makkelijk downloaden en een account op aanmaken.
- Als dit in orde is hoef je in de terminal enkel docker-compose up in te geven.
- Via een programma zoals Tableplus kan je de database live bekijken.
- Als je index.html opent in jouw browser krijg je de website te zien.

### Endpoints
- Create: /post/formulier (Via het forumulier kan je vragen, problemen en dankwoorden invoegen)
- Read: /get/:alleVragen (Je krijgt een overzicht van alle ingezonden forumulieren)
- Update: /update/:id (Als er een fout is of de gegevens van de persoon moeten aangepast worden kan dit via deze endpoint eenvoudig via de id)
- Delete: /delete/:id (Eenvoudig een ingezonden formulier verwijderen via id)

### Tests
Endpoints: Testen of de verschillend endpoints werken.

### Running the tests
- Ga naar de api map
- Klik rechtermuisklik => open in “integrated terminal”
- Schrijf in de terminal “npm test”

## Problemen
Voor problemen of vragen wordt meer uitleg gegeven in de contributing file.

## Status
Nog in development.

## Auteur
Kelly Peeters