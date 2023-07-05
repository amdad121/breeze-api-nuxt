# Laravel API Breeze - Nuxt 3 Edition 🏝️

## Introduction

This repository is an implementation of the [Laravel API Breeze](https://laravel.com/docs/starter-kits) application / authentication starter kit frontend in [Nuxt](https://nuxt.com). All of the authentication boilerplate is already written for you - powered by [Laravel Sanctum](https://laravel.com/docs/sanctum), allowing you to quickly begin pairing your beautiful Nuxt frontend with a powerful Laravel backend.

## Official Documentation

### Installation

First, create a Nuxt compatible Laravel backend by installing Laravel API Breeze into a [fresh Laravel application](https://laravel.com/docs/installation) and installing Breeze's API scaffolding:

```bash
# Create the Laravel application...
laravel new nuxt-backend

cd nuxt-backend

# Install Breeze and dependencies...
composer require laravel/breeze --dev

php artisan breeze:install api

# Run database migrations...
php artisan migrate
```

Next, ensure that your application's `APP_URL` and `FRONTEND_URL` environment variables are set to `http://localhost:8000` and `http://localhost:3000`, respectively.

After defining the appropriate environment variables, you may serve the Laravel application using the `serve` Artisan command:

```bash
# Serve the application...
php artisan serve
```

Next, clone this repository and install its dependencies with `yarn install` or `npm install`. Then, copy the `.env.example` file to `.env` and supply the URL of your backend:

```
NUXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

Finally, run the application via `npm run dev`. The application will be available at `http://localhost:3000`:

```
npm run dev
```

> Note: Currently, we recommend using `localhost` during local development of your backend and frontend to avoid CORS "Same-Origin" issues.

### Authentication Middleware

This Nuxt application contains a custom `auth` middleware, designed to abstract all authentication logic away from your pages. In addition, the middleware can be used to access the currently authenticated user:

```js
// ExamplePage.vue
<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
});

const { logout } = useAuthStore();
</script>

<template>
  <div>
    <p>{{ user?.name }}</p>

    <button @click="logout()">Sign out</button>
  </div>
</template>

<style scoped></style>
```

> Note: You will need to use [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) (`user?.name` instead of `user.name`) when accessing properties on the user object to account for Nuxt's initial server-side render.

## Contributing

Contribution is open. Create Pull-request and I'll add it to the project if it's good enough.

## License

Laravel API Breeze Nuxt 3 is open-sourced software licensed under the [MIT license](LICENSE.md).
