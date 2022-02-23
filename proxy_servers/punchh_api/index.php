<?php
error_reporting(E_ALL);

require('vendor/autoload.php');

use GuzzleHttp\Psr7\Response;
use Proxy\Proxy;
use Proxy\Adapter\Guzzle\GuzzleAdapter;
use Laminas\Diactoros\ServerRequestFactory;
use Laminas\HttpHandlerRunner\Emitter\SapiEmitter;

// Create a PSR7 request based on the current browser request.
$request = ServerRequestFactory::fromGlobals();

// Create a guzzle client
$guzzle = new GuzzleHttp\Client(['http_errors' => true]);

// Create the proxy instance
$proxy = new Proxy(new GuzzleAdapter($guzzle));

const PUNCHH_API_HOST = "https://sandbox.punchh.com";
const PUNCHH_API_CLIENT_ID = "c7f0b80300f53da0f25b52b06c8b9b89afcb47397e8e2c1f3fe9b58200171a41";
const PUNCHH_API_CLIENT_SECRET = "a2e83d96525d4d6d3db3823ec86cbd0d935f223f9d7e8df6167187cb95e7fbca";
const REDIRECT_URI = "https://dpropt.com/login";


try {
    // Forward the request and get the response

    $response = $proxy
        ->forward($request)
        ->filter(function ($request, $response, $next) use ($proxy) {

            if (str_contains($proxy->getUri()->getPath(), 'fetchoauthinfo')) {
                $response = sendAccessTokenFetchRequest($proxy->getRequest()->getUri());
                (new SapiEmitter)->emit($response);
                exit;
            }
            if (str_contains($proxy->getUri()->getPath(), 'getuserauth')) {
                $response = sendUserAuthFetchRequest($proxy);
                (new SapiEmitter)->emit($response);
                exit;
            }

            $request = $request->withHeader('Accept', 'application/json');
            $request = $request->withHeader('Origin', PUNCHH_API_HOST);
            $request = $request->withHeader('Content-Type', 'application/json');
            $request = $request->withHeader('Access-Control-Allow-Origin', PUNCHH_API_HOST);

//            $request = $request->withHeader('x-pch-digest', '95eabff47c8625f83048170ffa96545998d3173f');

            $pathParams = explode('/', $proxy->getUri()->getPath());

//            if (empty($pathParams[1]) || $pathParams[1] == '' || $pathParams[1] == null) {
            if (empty($pathParams[2]) || $pathParams[2] == '') {
                $baseApiRouteResponse = new Response();
                $baseApiRouteResponse = $baseApiRouteResponse->withStatus(200, "Rubios Punchh Server");
                $baseApiRouteResponse = $baseApiRouteResponse->withHeader('X-Status', "Success!");
                (new SapiEmitter)->emit($baseApiRouteResponse);
                exit;
            }

            $x_pch_digest = getSignature($proxy, str_replace('/punchh_api', '', $proxy->getUri()->getPath()));

            $request = $request->withHeader('x-pch-digest', $x_pch_digest);

            // Call the next item in the middleware.
            $response = $next($request, $response);

            return $response;
        })
        ->to(PUNCHH_API_HOST, '/punchh_api', 443);

    // Output response to the browser.
    (new SapiEmitter)->emit($response);
} catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // Correct way to handle bad responses
    (new SapiEmitter)->emit($e->getResponse());
}

function sendAccessTokenFetchRequest($payload): \Psr\Http\Message\ResponseInterface
{
    $client = new \GuzzleHttp\Client();
    $credentials = json_decode($payload, true);
    $credentials["client_id"] = PUNCHH_API_CLIENT_ID;
    $credentials["client_secret"] = PUNCHH_API_CLIENT_SECRET;
    // Create a request
    $request = new Laminas\Diactoros\Request();
    $request = $request->withUri(new Laminas\Diactoros\Uri(PUNCHH_API_HOST . '/oauth/token'));
    $request = $request->withMethod('POST');
    $request = $request->withHeader('Accept', 'application/json');
    $request = $request->withHeader('Origin', PUNCHH_API_HOST)
        ->withAddedHeader('Content-Type', 'application/json');
    $request->getBody()->write(json_encode($credentials));
    return $client->send($request);
}

function sendUserAuthFetchRequest($proxy): \Psr\Http\Message\ResponseInterface
{
    $client = new \GuzzleHttp\Client();
    parse_str($proxy->getUri()->getQuery(), $credentials);
    $credentials["client"] = PUNCHH_API_CLIENT_ID;
    // Create a request
    $request = new Laminas\Diactoros\Request();
    $request = $request->withUri((new Laminas\Diactoros\Uri(PUNCHH_API_HOST . '/api/auth/users'))->withQuery(http_build_query($credentials)));
    $request = $request->withMethod('GET');
    $request = $request->withHeader('Accept', 'application/json');
    $request = $request->withHeader('Origin', PUNCHH_API_HOST);
    $request = $request->withHeader('x-pch-digest', getSignature($proxy, '/api/auth/users'));
    $request->getBody()->write(json_encode($credentials));
    return $client->send($request);
}

function getSignature($proxy, $uriPath): string
{
    parse_str($proxy->getUri()->getQuery(), $queryArgs);
    $newUri = (new Laminas\Diactoros\Uri($uriPath))->withQuery(http_build_query($queryArgs));
    // Body in JSON format
    $body = $proxy->getRequest()->getBody();
    if ($body->getSize()) {
        $bodyjson = json_encode($proxy->getRequest()->getBody());
        $finalStringToHash = ((string)$newUri) . $bodyjson;
    } else {
        $finalStringToHash = (string)$newUri;
    }
    // signature specific to very request using SHA1 which is to be passed in `x-pch-digest` key in header
    return hash_hmac('sha1', $finalStringToHash, PUNCHH_API_CLIENT_SECRET);
}
