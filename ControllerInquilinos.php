<?php 
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;

    require_once __DIR__ . '/../vendor/autoload.php';
    require_once __DIR__ . '/Conexion/Conexion.php';

    class ControllerInquilinos {

        public static function Crear(Request $request, Response $response){
            $data =$request->getParsedBody();
            //var_dump($data['nombre']);
            if (!empty($data['apellido']) || !empty($data['nombre']) || !empty($data['documento']) || 
            !empty($data['email']) || !empty($data['activo'])){
                $response->getBody()->write(json_encode(['Bad Request'=>'Faltan campos requeridos para agregar a este inquilino']));
                return $response->withStatus(400);
            }
            elseif ((mb_strlen($data['apellido']) > 15) || (mb_strlen($data['nombre']) > 25) || 
            (mb_strlen($data['documento']) > 25) || (mb_strlen($data['email']) > 20)){
                $response->getBody()->write(json_encode(['Bad Request'=>'Revise que apellido, e-mail, nombre, documento no excedan los 15, 20, 25 y 25 caracteres respectivamente']));
                return $response->withStatus(400);
            }
            else{
                try {
                    $con = new Conexion();
                    $c = $con->establecerConexion();

                    $src = "SELECT * FROM inquilinos WHERE documento = :documento";
                    $consulta = $c->prepare($src);
                    $consulta->bindParam(':documento', $data['documento']);
                    $consulta->execute();
                    if ($consulta->rowCount() > 0){
                        $response->getBody()->write(json_encode(['Bad Request'=>'Ya existe un inquilino con ese documento']));
                        return $response->withStatus(400);
                    }

                    $src = 'INSERT INTO inquilinos (apellido, nombre, documento, email, activo) 
                    VALUES (:apellido, :nombre, :documento, :email, :activo)';
                    $consulta = $c->prepare($src);
                    $consulta->bindValue(':apellido', $data['apellido']);
                    $consulta->bindValue(':nombre', $data['nombre']);
                    $consulta->bindValue(':documento', $data['documento']);
                    $consulta->bindValue(':email', $data['email']);
                    $consulta->bindValue(':activo', $data['activo']);
                    $consulta->execute();
                    $response->getBody()->write(json_encode(['OK' => 'Inquilino agregado correctamente']));
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
            if (!empty($data['apellido']) && !empty($data['nombre']) && !empty($data['documento']) && 
            !empty($data['email']) && !empty($data['activo'])){
                $response->getBody()->write(json_encode(['Bad Request'=>'No se envia ningun dato para modificar']));
                return $response->withStatus(400);
            }
            elseif ((mb_strlen($data['apellido']) > 15) || (mb_strlen($data['nombre']) > 25) 
            || (mb_strlen($data['documento']) > 25) || (mb_strlen($data['email']) > 20)){
                $response->getBody()->write(json_encode(['Bad Request'=>'Revise que apellido, e-mail, nombre , documento no excedan los 15, 20, 25 y 25 caracteres respectivamente']));
                return $response->withStatus(400);
            }
            else{
                try {
                    $con = new Conexion();
                    $c = $con->establecerConexion();

                    $src = "SELECT * FROM inquilinos WHERE id = :id";
                    $consulta = $c->prepare($src);
                    $consulta->bindParam(':id', $args['id']);
                    $consulta->execute();
                    if ($consulta->rowCount() == 0){
                        $response->getBody()->write(json_encode(['Not Found'=>'No se encuentra un inquilino con ese id']));
                        return $response->withStatus(404);
                    }
                    $datosInquilino = $consulta->fetch(PDO::FETCH_ASSOC);

                    if (isset($data['documento'])){
                        $src = "SELECT * FROM inquilinos WHERE documento = :documento";
                        $consulta = $c->prepare($src);
                        $consulta->bindParam(':documento', $data['documento']);
                        $consulta->execute();
                        if ($consulta->rowCount() > 0){
                            $response->getBody()->write(json_encode(['Bad Request'=>'Ya hay un inquilino con ese documento']));
                            return $response->withStatus(400);
                        }
                    }

                    $src = 'UPDATE inquilinos SET apellido = :apellido, nombre = :nombre, documento = :documento, email = :email, activo = :activo WHERE id = :id';
                    $consulta = $c->prepare($src);
                    $consulta->bindValue(':apellido', (isset($data['apellido'])) ? $data['apellido'] : $datosInquilino['apellido']);
                    $consulta->bindValue(':nombre', (isset($data['nombre'])) ? $data['nombre'] : $datosInquilino['nombre']);
                    $consulta->bindValue(':documento', (isset($data['documento'])) ? $data['documento'] : $datosInquilino['documento']);
                    $consulta->bindValue(':email', (isset($data['email'])) ? $data['email'] : $datosInquilino['email']);
                    $consulta->bindValue(':activo', (isset($data['activo'])) ? $data['activo'] : $datosInquilino['activo']);
                    $consulta->bindValue(':id', $args['id']);
                    $consulta->execute();
                    $response->getBody()->write(json_encode(['OK' => 'Inquilino modificado correctamente']));
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

                $src = "SELECT * FROM inquilinos WHERE id = " . $args['id'] . "";
                $consulta = $c->prepare($src);
                $consulta->execute();
                if ($consulta->rowCount() == 0){
                    $response->getBody()->write(json_encode(['Not Found'=>'No se encuentra un inquilino con ese id']));
                    return $response->withStatus(404);
                }

                $src = "SELECT * FROM reservas WHERE inquilino_id = " . $args['id'] . "";
                $consulta = $c->prepare($src);
                $consulta->execute();
                if ($consulta->rowCount() > 0){
                    $response->getBody()->write(json_encode(['Bad Request'=>'Existen reservas asociadas este inquilino']));
                    return $response->withStatus(400);
                }

                $src = "DELETE FROM inquilinos WHERE id = " . $args['id'] . "";
                $consulta = $c->prepare($src);
                $consulta->execute();
                $response->getBody()->write(json_encode(['OK' => 'Inquilino eliminado correctamente']));
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

                $src = "SELECT * FROM inquilinos";
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

        public static function VerInquilino(Request $request, Response $response, $args){
            try {
                $con = new Conexion();
                $c = $con->establecerConexion();

                $src = "SELECT * FROM inquilinos WHERE id = " . $args['id'] . "";
                $consulta = $c->query($src);
                $response->getBody()->write(json_encode(['OK' => $consulta->fetch(PDO::FETCH_ASSOC)]));
                return $response->withStatus(200);
            }
            catch (Exception $e){
                $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
                return $response->withStatus(500);
            }
        }

        public static function Historial(Request $request, Response $response, $args){
            try {
                $con = new Conexion();
                $c = $con->establecerConexion();

                $src = "SELECT * FROM reservas WHERE inquilino_id = " . $args['idInquilino'];
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