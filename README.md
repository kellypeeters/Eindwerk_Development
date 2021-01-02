# Eindwerk_Development
Dit is een open source API die ontwikkeld is voor mijn vak development en mijn eindwerk. Op deze website kunnen kinderen via een interactief voorlees verhaal leren over de gevolgen van gezond/ ongezond eten. De open source api is dat je vragen, dankwoorden en technische problemen kan gebruiken in je website. 
Hierdoor hoef je geen lorem ipsum te gebruiken of hoef je geen tijd te steken in mogelijke vragen te bedenken.

# Hoe begin ik er nu aan?
## Lokaal laten draaien
- Je kan de api lokaal laten draaien via Docker. Als je dit niet hebt kan je deze makkelijk downloaden en een account op aanmaken.
- Als dit in orde is hoef je in de terminal enkel docker-compose up in te geven.
- Via een programma zoals Tableplus kan je de database live bekijken.
- Als je index.html opent in jouw browser krijg je de website te zien.

## Endpoints
 - Create: /post/formulier (Via het forumulier kan je vragen, problemen en dankwoorden invoegen)
 - Read: /get/:alleVragen (Je krijgt een overzicht van alle ingezonden forumulieren)
 - Update: /update/:id (Als er een fout is of de gegevens van de persoon moeten aangepast worden kan dit via deze endpoint eenvoudig via de id)
 - Delete: /delete/:id (Eenvoudig een ingezonden formulier verwijderen via id)


## Tests
Endpoints: Testen of de verschillend endpoints werken.

### Running the tests 
1.	Ga naar de api map
2.	Klik rechtermuisklik => open in “integrated terminal”
3.	Schrijf in de terminal “npm test”

## Problemen
Voor problemen of vragen wordt meer uitleg gegeven in de contributing file.

## Github Flow vs GIT Flow
Dit project maakt gebruik van Github flow. De reden waarom ik Github flow heb gekozen is omdat het 
bijna alle functionaliteiten biedt die Git Flow doet, zoals feature branches. Maar in tegenstelling tot Git Flow, combineert GitHub Flow de mainline en release branches tot een "master" en behandelt hotfixes net als feature branches. Dit vereenvoudigde model is beter geschikt voor modellen voor continue levering, waarbij wijzigingen snel en eenvoudig kunnen worden aangebracht, soms meerdere keren per dag. Exact wat mijn project dus nodig heeft.

## Status
Nog in development.
## Auteur
Kelly Peeters