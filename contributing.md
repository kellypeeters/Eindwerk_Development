
# Bijdrage richtlijnen
Als u bijdraagt ​​aan deze repository, bespreek dan eerst de wijziging die u wilt aanbrengen via e-mail voordat u een wijziging aanbrengt.

Lees zeker ook eerst de code-of-conduct

## Raporteer bugs
* Open een ticket in Github
* Zet de applicatie naar VERBOSE in uw .env file
* Voeg uw Error logs toe
* Leg de opstelling uit
* Voeg het volgende toe

```
OS:
Docker versie:
Global npms:
npm versie:
```

## Stel nieuwe features voor
* Open een feature request in github
* Leg uit waarom het nuttig zou zijn

## Richtlijnen voor development
Als u het project wilt gebruik voor eigen doeleiden hoeft u enkele zaken eerst in orde te brengen:



## Logging

```
expected log levels:

|verbose level|code|
|---|---|
|2|console.log|
|1|console.warn|
|0|console.error|
```

## Setup for development
* Installeer de pakketen die gebruikt worden in dit project zoals Jest, Postgres, ...
* Installeer een app zoals Tableplus om te checken of de database werkt
* Voor het project te runnen moet u in de terminal: 
      * docker-compose build
      * docker-compose up
      * npm test
  invullen. Hierdoor kan je alle functionaliteiten gebruiken.

## Get in touch
peeters.kelly@outlook.com 