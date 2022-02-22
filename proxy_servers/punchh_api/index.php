<?php
error_reporting(E_ALL);

require('vendor/autoload.php');

use Proxy\Proxy;
use Proxy\Adapter\Guzzle\GuzzleAdapter;
use Laminas\Diactoros\ServerRequestFactory;

// Create a PSR7 request based on the current browser request.
$request = ServerRequestFactory::fromGlobals();

// Create a guzzle client
$guzzle = new GuzzleHttp\Client(['http_errors' => true]);

// Create the proxy instance
$proxy = new Proxy(new GuzzleAdapter($guzzle));

const PUNCHH_API_HOST = "https://sandbox.punchh.com";
const PUNCHH_API_CLIENT_ID = "c7f0b80300f53da0f25b52b06c8b9b89afcb47397e8e2c1f3fe9b58200171a41";
const PUNCHH_API_CLIENT_SECRET = "a2e83d96525d4d6d3db3823ec86cbd0d935f223f9d7e8df6167187cb95e7fbca";


try {
    // Forward the request and get the response.
    $response = $proxy
        ->forward($request)
        ->filter(function ($request, $response, $next) use ($proxy) {

            $request = $request->withHeader('Accept', 'application/json');
            $request = $request->withHeader('Origin', PUNCHH_API_HOST);
            $request = $request->withHeader('Content-Type', 'application/json');
            $request = $request->withHeader('Access-Control-Allow-Origin', PUNCHH_API_HOST);

            $request = $request->withHeader('Referer', !empty($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] :  PUNCHH_API_HOST);
            $request = $request->withHeader('Access-Control-Allow-Headers', 'Referer, User-Agent, Origin, X-Requested-With, Content-Type, Accept, Authorization,X-Forwarded-For, X-Forwarded-UAH');
            $request = $request->withHeader('X-Forwarded-For', get_client_ip());
            $request = $request->withHeader('X-Forwarded-UAH', !empty($_SERVER["HTTP_USER_AGENT"]) ? $_SERVER["HTTP_USER_AGENT"] :
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36');

//            $request = $request->withHeader('x-pch-digest', '95eabff47c8625f83048170ffa96545998d3173f');

            $pathParams = explode('/', $proxy->getUri()->getPath());

//            if (empty($pathParams[1]) || $pathParams[1] == '' || $pathParams[1] == null) {
            if (empty($pathParams[2]) || $pathParams[2] == '') {
                $baseApiRouteResponse = new \GuzzleHttp\Psr7\Response();
                $baseApiRouteResponse = $baseApiRouteResponse->withStatus(200, "Rubios Punchh Server");
                $baseApiRouteResponse = $baseApiRouteResponse->withHeader('Code', "123456789");
                (new Laminas\HttpHandlerRunner\Emitter\SapiEmitter)->emit($baseApiRouteResponse);
                exit;
            } else {
                $response = route_interceptor($proxy->getUri()->getPath());
                if ($response != null) {
                    (new Laminas\HttpHandlerRunner\Emitter\SapiEmitter)->emit($response);
                    exit;
                }
            }

            // Call the next item in the middleware.
            $response = $next($request, $response);


            // Manipulate the response object.
//			$response = $response->withHeader('X-Proxy-Foo', 'Bar');

            return $response;
        })
        ->to(PUNCHH_API_HOST, '/punchh_api', 443);

    // Output response to the browser.
    (new Laminas\HttpHandlerRunner\Emitter\SapiEmitter)->emit($response);
} catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // Correct way to handle bad responses
    (new Laminas\HttpHandlerRunner\Emitter\SapiEmitter)->emit($e->getResponse());
}

//function route_interceptor($path): \GuzzleHttp\Psr7\Response|null // unsupported for php 7.4
function route_interceptor($path)
{
    switch ($path) {
        case str_contains($path, 'fetch-sso-info'):
            $response = new \GuzzleHttp\Psr7\Response();
            $response = $response->withStatus(200);
            $response = $response->withAddedHeader("code", "ABCD12345");
            return $response;
            break;
        default:
            return null;
    }
}

// Function to get the client IP address
function get_client_ip()
{
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if (isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if (isset($_SERVER['HTTP_X_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if (isset($_SERVER['HTTP_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if (isset($_SERVER['HTTP_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if (isset($_SERVER['REMOTE_ADDR']))
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}
