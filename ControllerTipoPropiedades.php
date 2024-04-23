<?php 
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Slim\Factory\AppFactory;

    require_once __DIR__ . '/../vendor/autoload.php';
    require_once __DIR__ . '/Conexion/Conexion.php';

    class ControllerTipoPropiedades {

        public static function Crear(Request $request, Response $response){
            $data =$request->getParsedBody();
            //var_dump($data['nombre']);
            if (!isset($data['nombre'])){
                $response->getBody()->write(json_encode(['Bad Request'=>'El nombre es un campo requerido']));
                return $response->withStatus(400);
            }
            elseif (mb_strlen($data['nombre']) > 50){
                $response->getBody()->write(json_encode(['Bad Request'=>'El nombre no debe estar compuesto de mas de 50 caracteres']));
                return $response->withStatus(400);
            }
            else{
                try {
                    $con = new Conexion();
                    $c = $con->establecerConexion();

                    $src = "SELECT * FROM tipo_propiedades WHERE nombre = :nombre";
                    $consulta = $c->prepare($src);
                    $consulta->bindParam(':nombre', $data['nombre']);
                    $consulta->execute();
                    if ($consulta->rowCount() > 0){
                        $response->getBody()->write(json_encode(['Bad Request'=>'Ya existe un tipo de propiedad con ese nombre']));
                        return $response->withStatus(400);
                    }

                    $src = 'INSERT INTO tipo_propiedades (nombre) VALUES (:nombre)';
                    $consulta = $c->prepare($src);
                    $consulta->bindValue(':nombre', $data['nombre']);
                    $consulta->execute();
                    $response->getBody()->write(json_encode(['OK' => 'Tipo de propiedad agregado correctamente']));
                    return $response->withStatus(200); 
                }
                catch (Exeption $e){
                    $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
                    return $response->withStatus(500);
                }
            }
        }

        public static function Editar(Request $request, Response $response, $args){
            $data =$request->getParsedBody();
            if (!isset($data['nombre'])){
                $response->getBody()->write(json_encode(['Bad Request'=>'No se envió ningun dato para modificar']));
                return $response->withStatus(400);
            }
            elseif (mb_strlen($data['nombre']) > 50){
                $response->getBody()->write(json_encode(['Bad Request'=>'El nombre no debe estar compuesto de mas de 50 caracteres']));
                return $response->withStatus(400);
            }
            else{
                try {
                    $con = new Conexion();
                    $c = $con->establecerConexion();

                    $src = "SELECT * FROM tipo_propiedades WHERE id = :id";
                    $consulta = $c->prepare($src);
                    $consulta->bindParam(':id', $args['id']);
                    $consulta->execute();
                    if ($consulta->rowCount() == 0){
                        $response->getBody()->write(json_encode(['Not Found'=>'No se encuentra un tipo de propiedad con ese id']));
                        return $response->withStatus(404);
                    }

                    $src = "SELECT * FROM tipo_propiedades WHERE nombre = :nombre";
                    $consulta = $c->prepare($src);
                    $consulta->bindParam(':nombre', $data['nombre']);
                    $consulta->execute();
                    if ($consulta->rowCount() > 0){
                        $response->getBody()->write(json_encode(['Bad Request'=>'Ya hay un tipo de propiedad con ese nombre']));
                        return $response->withStatus(400);
                    }

                    $src = 'UPDATE tipo_propiedades SET nombre = :nombre WHERE id = :id';
                    $consulta = $c->prepare($src);
                    $consulta->bindValue(':nombre', $data['nombre']);
                    $consulta->bindValue(':id', $args['id']);
                    $consulta->execute();
                    $response->getBody()->write(json_encode(['OK' => 'Tipo de propiedad modificado correctamente']));
                    return $response->withStatus(200); 
                }
                catch (Exeption $e){
                    $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
                    return $response->withStatus(500);
                }
            }
        }

        public static function Eliminar(Request $request, Response $response, $args){
            try {
                $con = new Conexion();
                $c = $con->establecerConexion();

                $src = "SELECT * FROM tipo_propiedades WHERE id = " . $args['id'] . "";
                $consulta = $c->prepare($src);
                $consulta->execute();
                if ($consulta->rowCount() == 0){
                    $response->getBody()->write(json_encode(['Not Found'=>'No se encuentra un tipo de propiedad con ese id']));
                    return $response->withStatus(404);
                }

                $src = "SELECT * FROM propiedades WHERE localidad_id = " . $args['id'] . "";
                $consulta = $c->prepare($src);
                $consulta->execute();
                if ($consulta->rowCount() > 0){
                    $response->getBody()->write(json_encode(['Bad Request'=>'Existen propiedades con este tipo de propiedad']));
                    return $response->withStatus(400);
                }

                $src = "DELETE FROM tipo_propiedades WHERE id = " . $args['id'] . "";
                $consulta = $c->prepare($src);
                $consulta->execute();
                $response->getBody()->write(json_encode(['OK' => 'Tipo de propiedad eliminado correctamente']));
                return $response->withStatus(200); 
            }
            catch (Exeption $e){
                $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
                return $response->withStatus(500);
            }
        }

        public static function Listar(Request $request, Response $response){
            try {
                $con = new Conexion();
                $c = $con->establecerConexion();

                $src = "SELECT * FROM tipo_propiedades";
                $consulta = $c->query($src);
                $resultados = array();
                while ($row = $consulta->fetch(PDO::FETCH_ASSOC)) {
                    $resultados[] = $row;
                }
                $response->getBody()->write(json_encode(['OK' => $resultados]));
                return $response->withStatus(200);
            }
            catch (Exeption $e){
                $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
                return $response->withStatus(500);
            }
        }
    }
?>