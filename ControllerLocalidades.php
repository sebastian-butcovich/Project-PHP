<?php 
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Slim\Factory\AppFactory;

    require_once __DIR__ . '/vendor/autoload.php';
    require_once __DIR__ . '/Conexion/Conexion.php';

    class ControllerLocalidades {

        public static function Crear(Request $request, Response $response){
            $data =$request->getParsedBody();
            //var_dump($data['nombre']);
            if (!empty($data['nombre'])){
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
                    $src = "SELECT * FROM localidades WHERE nombre = :nombre";
                    $consulta = $c->prepare($src);
                    $consulta->bindParam(':nombre', $data['nombre']);
                    $consulta->execute();
                    if ($consulta->rowCount() > 0){
                        $response->getBody()->write(json_encode(['Bad Request'=>'Ya existe una localidad con ese nombre']));
                        return $response->withStatus(400);
                    }

                    $src = 'INSERT INTO localidades (nombre) VALUES (:nombre)';
                    $consulta = $c->prepare($src);
                    $consulta->bindValue(':nombre', $data['nombre']);
                    $consulta->execute();
                    $response->getBody()->write(json_encode(['OK' => 'Localidad agregada correctamente']));
                    return $response->withStatus(200); 
                }
                catch (Exception $e){
                    $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
                    return $response->withStatus(500);
                }
            }
        }

        public static function Editar(Request $request, Response $response, $args){
            $data =$request->getParsedBody();
            if (!empty($data['nombre'])){
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
                    $src = "SELECT * FROM localidades WHERE id = :id";
                    $consulta = $c->prepare($src);
                    $consulta->bindParam(':id', $args['id']);
                    $consulta->execute();
                    if ($consulta->rowCount() == 0){
                        $response->getBody()->write(json_encode(['Not Found'=>'No se encuentra una localidad con ese id']));
                        return $response->withStatus(404);
                    }
                    $src = "SELECT * FROM localidades WHERE nombre = :nombre";
                    $consulta = $c->prepare($src);
                    $consulta->bindParam(':nombre', $data['nombre']);
                    $consulta->execute();
                    if ($consulta->rowCount() > 0){
                        $response->getBody()->write(json_encode(['Bad Request'=>'Ya hay una localidad con ese nombre']));
                        return $response->withStatus(400);
                    }

                    $src = 'UPDATE localidades SET nombre = :nombre WHERE id = :id';
                    $consulta = $c->prepare($src);
                    $consulta->bindValue(':nombre', $data['nombre']);
                    $consulta->bindValue(':id', $args['id']);
                    $consulta->execute();
                    $response->getBody()->write(json_encode(['OK' => 'Localidad modificada correctamente']));
                    return $response->withStatus(200); 
                }
                catch (Exception $e){
                    $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
                    return $response->withStatus(500);
                }
            }
        }

        public static function Eliminar(Request $request, Response $response, $args){
            try {
                $con = new Conexion();
                $c = $con->establecerConexion();
                $src = "SELECT * FROM localidades WHERE id = " . $args['id'] . "";
                $consulta = $c->prepare($src);
                $consulta->execute();
                if ($consulta->rowCount() == 0){
                    $response->getBody()->write(json_encode(['Not Found'=>'No se encuentra una localidad con ese id']));
                    return $response->withStatus(404);
                }

                $src = "SELECT * FROM propiedades WHERE localidad_id = " . $args['id'] . "";
                $consulta = $c->prepare($src);
                $consulta->execute();
                if ($consulta->rowCount() > 0){
                    $response->getBody()->write(json_encode(['Bad Request'=>'Existen propiedades con esta localidad']));
                    return $response->withStatus(400);
                }

                $src = "DELETE FROM localidades WHERE id = " . $args['id'] . "";
                $consulta = $c->prepare($src);
                $consulta->execute();
                $response->getBody()->write(json_encode(['OK' => 'Localidad eliminada correctamente']));
                return $response->withStatus(200); 
            }
            catch (Exception $e){
                $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
                return $response->withStatus(500);
            }
        }

        public static function Listar(Request $request, Response $response){
            try {
                $con = new Conexion();
                $c = $con->establecerConexion();

                $src = "SELECT * FROM localidades";
                $consulta = $c->query($src);
                $resultados = array();
                while ($row = $consulta->fetch(PDO::FETCH_ASSOC)) {
                    $resultados[] = $row;
                }
                $response->getBody()->write(json_encode(['OK' => $resultados]));
                return $response->withStatus(200);
            }
            catch (Exception $e){
                $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
                return $response->withStatus(500);
            }
        }
    }
?>