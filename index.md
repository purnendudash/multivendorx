---
title: MULTIVENDORX REST API Documentation v1.0.0
language_tabs:
  - javascript: JavaScript
  - curl: cURL
  - php: PHP
language_clients:
  - javascript: ""
  - curl: ""
  - php: ""
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="multivendorx-rest-api-documentation">MULTIVENDORX REST API Documentation v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Dynamically parsed developer reference for the multivendorx platform module.

Base URLs:

* <a href="https://purnendu-multivendorx.github.io/wp-json/multivendorx/v1">https://purnendu-multivendorx.github.io/wp-json/multivendorx/v1</a>

<h1 id="multivendorx-rest-api-documentation-default">Default</h1>

## Endpoint route auto-extracted from Transactions.php

> Code samples

```javascript

fetch('https://purnendu-multivendorx.github.io/wp-json/multivendorx/v1/',
{
  method: 'PUT'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','https://purnendu-multivendorx.github.io/wp-json/multivendorx/v1/', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

`PUT /`

Dynamically generated documentation profile mapping for path endpoint `/`.

<h3 id="endpoint-route-auto-extracted-from-transactions.php-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful REST API processing transaction payload response.|None|

<aside class="success">
This operation does not require authentication
</aside>

## Endpoint route auto-extracted from Tracking.php

> Code samples

```javascript

fetch('https://purnendu-multivendorx.github.io/wp-json/multivendorx/v1/',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://purnendu-multivendorx.github.io/wp-json/multivendorx/v1/', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

`POST /`

Dynamically generated documentation profile mapping for path endpoint `/`.

<h3 id="endpoint-route-auto-extracted-from-tracking.php-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful REST API processing transaction payload response.|None|

<aside class="success">
This operation does not require authentication
</aside>

## Endpoint route auto-extracted from Stores.php

> Code samples

```javascript

fetch('https://purnendu-multivendorx.github.io/wp-json/multivendorx/v1/states/{country}',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://purnendu-multivendorx.github.io/wp-json/multivendorx/v1/states/{country}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

`GET /states/{country}`

Dynamically generated documentation profile mapping for path endpoint `/states/{country}`.

<h3 id="endpoint-route-auto-extracted-from-stores.php-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful REST API processing transaction payload response.|None|

<aside class="success">
This operation does not require authentication
</aside>

## Endpoint route auto-extracted from Rest.php

> Code samples

```javascript

fetch('https://purnendu-multivendorx.github.io/wp-json/multivendorx/v1/store-products',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://purnendu-multivendorx.github.io/wp-json/multivendorx/v1/store-products', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

`GET /store-products`

Dynamically generated documentation profile mapping for path endpoint `/store-products`.

<h3 id="endpoint-route-auto-extracted-from-rest.php-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful REST API processing transaction payload response.|None|

<aside class="success">
This operation does not require authentication
</aside>

