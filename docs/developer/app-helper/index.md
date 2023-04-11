# App Helper for Laravel

[[toc]]

## Introduction

App Helper is a tool for faster app development for Heseya.

What does it do?
- It automatically creates all the necessary endpoints.
- Adds basic Api models and Api User.
- Provides custom Laravel Guard that operates on users in Core.
- It can be easily expanded or overwritten as needed.

## Get Started

Install package using Composer.

```shell
composer require heseya/app-helper
```

All endpoints are available immediately after installation thanks to Laravel auto-discovery.

### App info

Information about the application is available on root path (`/`).
If you want to customize your app info, first you must publish App Helper config using Artisan command.

```shell
php artisan vendor:publish --provider="Heseya\AppHelper\ServiceProvider"
```

Then, you can edit the default information in the `config/heseya.php` file.
