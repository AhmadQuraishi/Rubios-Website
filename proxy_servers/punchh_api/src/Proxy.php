<?php

namespace Proxy;

use GuzzleHttp\Exception\ClientException;
use Proxy\Adapter\AdapterInterface;
use Proxy\Exception\UnexpectedValueException;
use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\UriInterface;
use Relay\RelayBuilder;
use Laminas\Diactoros\Response;
use Laminas\Diactoros\Uri;

class Proxy
{
    /**
     * @var RequestInterface
     */
    protected $request;

    /**
     * @var AdapterInterface
     */
    protected $adapter;

    /**
     * @var callable[]
     */
    protected $filters = [];

    /**
     * @param AdapterInterface $adapter
     */
    public function __construct(AdapterInterface $adapter)
    {
        $this->adapter = $adapter;
    }

    /**
     * Prepare the proxy to forward a request instance.
     *
     * @param RequestInterface $request
     * @return $this
     */
    public function forward(RequestInterface $request)
    {
        $this->request = $request;

        return $this;
    }

    /**
     * Forward the request to the target url and return the response.
     *
     * @param string $target
     * @return ResponseInterface
     * @throws UnexpectedValueException
     */
    public function to($target, $subDirPath = null, $port = null)
    {
        if ($this->request === null) {
            throw new UnexpectedValueException('Missing request instance.');
        }

        $target = new Uri($target);

        if ($subDirPath == null) {
            $subDirPath = '';
        }
        if ($port == null) {
            $port = $target->getPort();
        }
        // Overwrite target scheme, host and port.
        $uri = $this->request->getUri()
            ->withScheme($target->getScheme())
            ->withHost($target->getHost())
            ->withPort($port);

        // Check for subdirectory.
        $path = rtrim($target->getPath(), '/') . '/' . ltrim($uri->getPath(), '/');
        $uri = $uri->withPath(str_ireplace($subDirPath, "", $path));
        $request = $this->request->withUri($uri);

        $stack = $this->filters;

        $stack[] = function (RequestInterface $request, ResponseInterface $response, callable $next) {
            try {
                $response = $this->adapter->send($request);
            } catch (ClientException $ex) {
                $response = $ex->getResponse();
            }

            return $next($request, $response);
        };

        $relay = (new RelayBuilder)->newInstance($stack);

        return $relay($request, new Response);
    }

    /**
     * Add a filter middleware.
     *
     * @param callable $callable
     * @return $this
     */
    public function filter(callable $callable)
    {
        $this->filters[] = $callable;

        return $this;
    }

    /**
     * @return RequestInterface
     */
    public function getRequest()
    {
        return $this->request;
    }

    /**
     * @return RequestInterface
     */
    public function getUri(): UriInterface
    {
        return $this->request->getUri();
    }
}
