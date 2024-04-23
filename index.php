<?php 
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Slim\Factory\AppFactory;
    
    require_once __DIR__ . '/../vendor/autoload.php';
    require_once './ControllerLocalidades.php';
    require_once './ControllerTipoPropiedades.php';
    require_once './ControllerInquilinos.php';
    require_once './ControllerPropiedades.php';
    require_once './ControllerReservas.php';
    
    $app = AppFactory::create();
    $app->addBodyParsingMiddleware();
    $app->addErrorMiddleware(true,true,true);
    $app->addRoutingMiddleware();
    
    $app->get('/', function (Request $request, Response $response, $args) {
        $response->getBody()->write("Hello world!");
        return $response;
    });

    $app->post('/localidades', \ControllerLocalidades::class . ':Crear');
    $app->put('/localidades/{id}', \ControllerLocalidades::class . ':Editar');
    $app->delete('/localidades/{id}', \ControllerLocalidades::class . ':Eliminar');
    $app->get('/localidades', \ControllerLocalidades::class . ':Listar');
    
    $app->post('/tipo_propiedades', \ControllerTipoPropiedades::class . ':Crear');
    $app->put('/tipo_propiedades/{id}', \ControllerTipoPropiedades::class . ':Editar');
    $app->delete('/tipo_propiedades/{id}', \ControllerTipoPropiedades::class . ':Eliminar');
    $app->get('/tipo_propiedades', \ControllerTipoPropiedades::class . ':Listar');

    $app->post('/inquilinos', \ControllerInquilinos::class . ':Crear');
    $app->put('/inquilinos/{id}', \ControllerInquilinos::class . ':Editar');
    $app->delete('/inquilinos/{id}', \ControllerInquilinos::class . ':Eliminar');
    $app->get('/inquilinos', \ControllerInquilinos::class . ':Listar');
    $app->get('/inquilinos/{id}', \ControllerInquilinos::class . ':VerInquilino');
    $app->get('/inquilinos/{idInquilino}/reservas', \ControllerInquilinos::class . ':Historial');

    $app->post('/propiedades', \ControllerPropiedades::class . ':Crear');
    $app->put('/propiedades/{id}', \ControllerPropiedades::class . ':Editar');
    $app->delete('/propiedades/{id}', \ControllerPropiedades::class . ':Eliminar');
    $app->get('/propiedades', \ControllerPropiedades::class . ':Listar');
    $app->get('/propiedades/{id}', \ControllerPropiedades::class . ':VerPropiedad');

    $app->post('/reservas', \ControllerReservas::class . ':Crear');
    $app->put('/reservas/{id}', \ControllerReservas::class . ':Editar');
    $app->delete('/reservas/{id}', \ControllerReservas::class . ':Eliminar');
    $app->get('/reservas', \ControllerReservas::class . ':Listar');
    
    $app->run();
?>