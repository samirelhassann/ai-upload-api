# AI Upload API

This is a project built in node + typescript + fastify that trancribe videos received via http request and store the transcription in the database

This is a project used for study purposes only • [Samir El Hassan](https://github.com/samirelhassann)

This project was built with the help of [Rocketseat](https://www.rocketseat.com.br/) ![image 3](https://user-images.githubusercontent.com/91634008/206936638-05d22d2f-4c3a-4f45-861f-ff6fe1db990d.png)


## Language and Tools

<p align="left"> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a><a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>

## Additional Libraries

- fastify
- prisma
- zod
- openai
- ai

## Demo

## Instalation

Install all the packages

```bash
yarn install
```


## Usage

Start the postgres database via docker compose:

```bash
docker compose up -d
```

create a .env file following the values on .env.example, after that run:

```bash
yarn dev
```
