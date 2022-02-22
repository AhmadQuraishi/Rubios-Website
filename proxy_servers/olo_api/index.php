<?php


require('vendor/autoload.php');

use Proxy\Proxy;
use Proxy\Adapter\Guzzle\GuzzleAdapter;
use Laminas\Diactoros\ServerRequestFactory;
use Psr\Http\Message\ResponseInterface;

// Create a PSR7 request based on the current browser request.
$request = ServerRequestFactory::fromGlobals();

// Create a guzzle client
$guzzle = new GuzzleHttp\Client(['http_errors' => true]);

// Create the proxy instance
$proxy = new Proxy(new GuzzleAdapter($guzzle));

const OLO_API_HOST = "https://ordering.api.olosandbox.com";
const OLO_API_BASE_URI = "/v1.1";
const OLO_API_KEY = "OloKey ElwEkgDhuasD9HydkYI2kp3Hs0EWPkR2";
const OLO_API_CLIENT_ENGINE = "Rubios/1.0";


// Function to get the client IP address
function get_client_ip()
{
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP'])) {
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    } else if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else if (isset($_SERVER['HTTP_X_FORWARDED'])) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    } else if (isset($_SERVER['HTTP_FORWARDED_FOR'])) {
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    } else if (isset($_SERVER['HTTP_FORWARDED'])) {
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    } else if (isset($_SERVER['REMOTE_ADDR'])) {
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    } else {
        $ipaddress = 'UNKNOWN';
    }

    return $ipaddress;
}

/**
 * User-Agent    Unique user agent value that identifies your backend. Please send this formatted as application_name/version.    User-Agent: DonutEngine/v2
 * X-Forwarded-For    End user's originating address, existing IPs and subsequent IPs.    X-Forwarded-For: 129.78.138.66, 129.78.64.103
 * X-Forwarded-UAH    End user's user agent.    X-Forwarded-UAH: Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/12.0
 * Referer    Identifies the page that the Ordering API request is being made on behalf of.    Referer: http://donuts.org/mainpage
 *
 * Header
 * Description    Example
 * Fastly-Client-IP    Fastly, explained here. We strongly recommend using VCL to prevent modification of the header.    Fastly-Client-IP: 129.78.138.66
 * Incap-Client-IP    Imperva Cloud WAF, explained here.    Incap-Client-IP: 129.78.138.66
 * X-Azure-ClientIP    Azure Front Door, explained here.    X-Azure-ClientIP: 129.78.138.66
 * X-Forwarded-CIP    Cloudflare connecting IP. This can be obatined from the cf-connecting-ip header and needs to be copied into a new header to prevent Cloudflare from dropping it on the edge.    X-Forwarded-CIP: 129.78.138.66
 **/
//echo '<pre>';
//print_r($proxy->forward($request)->getRequest()->getUri());
//echo '</pre>';
try {
    // Forward the request and get the response.
    $response = $proxy
        ->forward($request)
        ->filter(function ($request, $response, $next) use ($proxy) {

            // Manipulate the request object.
            $request = $request->withHeader('User-Agent', OLO_API_CLIENT_ENGINE);
            $request = $request->withHeader('Access-Control-Allow-Origin', OLO_API_HOST);
            $request = $request->withHeader('Origin', OLO_API_HOST);
            $request = $request->withHeader('Referer', !empty($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] :  OLO_API_HOST);
            $request = $request->withHeader('Access-Control-Allow-Headers', 'Referer, User-Agent, Origin, X-Requested-With, Content-Type, Accept, Authorization,X-Forwarded-For, X-Forwarded-UAH');
            $request = $request->withHeader('Authorization', OLO_API_KEY);
            $request = $request->withHeader('Accept', 'application/json');
            $request = $request->withHeader('X-Forwarded-For', get_client_ip());
            $request = $request->withHeader('X-Forwarded-UAH', !empty($_SERVER["HTTP_USER_AGENT"]) ? $_SERVER["HTTP_USER_AGENT"] :
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36');
//			$request = $request->withHeader('X-Forwarded-HKY', ''); // Only for Olo provided JS

//			echo '<pre>';
//			var_dump( count( $pathParams ) );
//			echo '</pre>';
//			exit;

//
            $pathParams = explode('/', $proxy->getUri()->getPath());

            if (empty($pathParams[2]) || $pathParams[2] == '') {
                $baseApiRouteResponse = new \GuzzleHttp\Psr7\Response();
                $baseApiRouteResponse->withStatus(200, "Rubios Olo API Server");
                (new Laminas\HttpHandlerRunner\Emitter\SapiEmitter)->emit($response);
                exit;
            }
            // Call the next item in the middleware.
            $response = $next($request, $response);

            // Manipulate the response object.

            return $response;
        })
        ->to(OLO_API_HOST . OLO_API_BASE_URI, '/olo_api', 443);

    // Output response to the browser.
    (new Laminas\HttpHandlerRunner\Emitter\SapiEmitter)->emit($response);
} catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // Correct way to handle bad responses
    (new Laminas\HttpHandlerRunner\Emitter\SapiEmitter)->emit($e->getResponse());
}
