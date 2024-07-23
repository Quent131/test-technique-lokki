# test-technique-lokki

This repository has been built using [Nx](https://nx.dev/). It is composed of 2 apps and one library. <br/>
The apps are the frontend and the backend of the app. The library is a type library used to share type across apps. <br/>
The project is using TypeScript. The frontend is using Vite and React for an easy and fast setup. The backend is using Express and Webpack to compile, because of the little to no complexity in the backend work. <br/>

## Backend

To implement the echange rate API, I first decided to use XE, which is the first thing that came to my mind, but quickly had to change because the API free plan is a free tier for a limited time only. So i switched to [ExchangeRate-API](https://www.exchangerate-api.com/) which was advised by ChatGPT as a free exchange rate API. <br/>
I then used `axios` to request the API with the API KEY.

## Frontend

As asked in the test, I used React for the frontend. I used [TanStack Query](https://tanstack.com/query/latest) for data querying and management which is a powerful way to handle asynchronous data, along with `axios` to query the backend.<br/>
I decided to use [TailwindCSS](https://tailwindcss.com/) to style my elements and [Mantine](https://mantine.dev/) for the components library.

## Setup and quick start

The repository has been built using `yarn@4.2.2` package manager and `node@20.13.1`. <br/>
The `.env` file has been crypted using [Transcrypt](https://github.com/elasticdog/transcrypt). You can see how to install in [here](https://github.com/elasticdog/transcrypt/blob/main/INSTALL.md). Once installed, you have to run `transcrypt -c aes-256-cbc -p 'key'` where key is the crypting key I'm sending you by mail. <br/>
To install dependencies, just run `yarn install` inside the main folder. <br/>
To run the applications, you can use `yarn nx serve backend` and `yarn nx serve frontend` or transpile the apps, using `yarn nx build backend` and `yarn nx build fronend` and launching them the way you prefer.
