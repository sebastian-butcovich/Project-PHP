<?php 
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Slim\Factory\AppFactory;

    require_once __DIR__ . '/../vendor/autoload.php';
    require_once __DIR__ . '/Conexion/Conexion.php';

    class ControllerPropiedades {

        public static function Crear(Request $request, Response $response){
            $data =$request->getParsedBody();
            if (!isset($data['domicilio']) || !isset($data['localidad_id']) || !isset($data['cantidad_huespedes']) || 
            !isset($data['fecha_inicio_disponibilidad']) || !isset($data['cantidad_dias']) || !isset($data['disponible']) 
            || !isset($data['valor_noche']) || !isset($data['tipo_propiedad_id'])){
                $response->getBody()->write(json_encode(['Bad Request'=>'Faltan campos requeridos para agregar esta propiedad']));
                return $response->withStatus(400);
            }
            elseif (mb_strlen($data['tipo_imagen']) > 50){
                $response->getBody()->write(json_encode(['Bad Request'=>'Tipo imagen no debe estar compuesto de mas de 50 caracteres']));
                return $response->withStatus(400);
            }
            else{
                try {
                    $con = new Conexion();
                    $c = $con->establecerConexion();

                    $src = "SELECT * FROM tipo_propiedades WHERE id = :tipo_propiedad_id";
                    $consulta = $c->prepare($src);
                    $consulta->bindParam(':tipo_propiedad_id', $data['tipo_propiedad_id']);
                    $consulta->execute();
                    if ($consulta->rowCount() == 0){
                        $response->getBody()->write(json_encode(['Not Found'=>'No se encuentra un tipo de propiedad con ese id']));
                        return $response->withStatus(404);
                    }

                    $src = "SELECT * FROM localidades WHERE id = :localidad_id";
                    $consulta = $c->prepare($src);
                    $consulta->bindParam(':localidad_id', $data['localidad_id']);
                    $consulta->execute();
                    if ($consulta->rowCount() == 0){
                        $response->getBody()->write(json_encode(['Not Found'=>'No se encuentra una localidad con ese id']));
                        return $response->withStatus(404);
                    }

                    $src = 'INSERT INTO propiedades (domicilio, localidad_id, cantidad_habitaciones, cantidad_banios, cochera, cantidad_huespedes, fecha_inicio_disponibilidad, cantidad_dias, disponible, valor_noche, tipo_propiedad_id, imagen, tipo_imagen) VALUES (:domicilio, :localidad_id, :cantidad_habitaciones, :cantidad_banios, :cochera, :cantidad_huespedes, :fecha_inicio_disponibilidad, :cantidad_dias, :disponible, :valor_noche, :tipo_propiedad_id, :imagen, :tipo_imagen)';
                    $consulta = $c->prepare($src);
                    $consulta->bindValue(':domicilio', $data['domicilio']);
                    $consulta->bindValue(':localidad_id', $data['localidad_id']);
                    $consulta->bindValue(':cantidad_huespedes', $data['cantidad_huespedes']);
                    $consulta->bindValue(':fecha_inicio_disponibilidad', $data['fecha_inicio_disponibilidad']);
                    $consulta->bindValue(':cantidad_dias', $data['cantidad_dias']);
                    $consulta->bindValue(':disponible', $data['disponible']);
                    $consulta->bindValue(':valor_noche', $data['valor_noche']);
                    $consulta->bindValue(':tipo_propiedad_id', $data['tipo_propiedad_id']);
                    $consulta->bindValue(':cantidad_habitaciones', (isset($data['cantidad_habitaciones'])) ? $data['cantidad_habitaciones'] : 0 );
                    $consulta->bindValue(':cantidad_banios', (isset($data['cantidad_banios'])) ? $data['cantidad_banios'] : 0 );
                    $consulta->bindValue(':cochera', (isset($data['cochera'])) ? $data['cochera'] : 0 );
                    $consulta->bindValue(':imagen', (isset($data['imagen'])) ? $data['imagen'] : null );
                    $consulta->bindValue(':tipo_imagen', (isset($data['tipo_imagen'])) ? $data['tipo_imagen'] : null );
                    $consulta->execute();
                    $response->getBody()->write(json_encode(['OK' => 'Propiedad agregada correctamente']));
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
            if (isset($data['domicilio']) && isset($data['localidad_id']) && isset($data['cantidad_habitaciones']) && 
            isset($data['cantidad_banios']) && isset($data['cochera']) && isset($data['cantidad_huespedes']) 
            && isset($data['fecha_inicio_disponibilidad']) && isset($data['cantidad_dias']) && isset($data['disponible']) && isset($data['valor_noche']) && isset($data['tipo_propiedad_id']) && isset($data['imagen']) && isset($data['tipo_imagen'])){
                $response->getBody()->write(json_encode(['Bad Request'=>'No se envia ningun dato para modificar']));
                return $response->withStatus(400);
            }
            elseif (mb_strlen($data['tipo_imagen']) > 50){
                $response->getBody()->write(json_encode(['Bad Request'=>'Tipo imagen no debe estar compuesto de mas de 50 caracteres']));
                return $response->withStatus(400);
            }
            else{
                try {
                    $con = new Conexion();
                    $c = $con->establecerConexion();

                    $src = "SELECT * FROM propiedades WHERE id = :id";
                    $consulta = $c->prepare($src);
                    $consulta->bindParam(':id', $args['id']);
                    $consulta->execute();
                    $datosInquilino = $consulta->fetch(PDO::FETCH_ASSOC);
                    if ($consulta->rowCount() == 0){
                        $response->getBody()->write(json_encode(['Not Found'=>'No se encuentra una propiedad con ese id']));
                        return $response->withStatus(404);
                    }

                    if (isset($data['tipo_propiedad_id'])){
                        $src = "SELECT * FROM tipo_propiedades WHERE id = :tipo_propiedad_id";
                        $consulta = $c->prepare($src);
                        $consulta->bindParam(':tipo_propiedad_id', $data['tipo_propiedad_id']);
                        $consulta->execute();
                        if ($consulta->rowCount() == 0){
                            $response->getBody()->write(json_encode(['Not Found'=>'No se encuentra un tipo de propiedad con ese id']));
                            return $response->withStatus(404);
                        }
                    }

                    if (isset($data['localidad_id'])){
                        $src = "SELECT * FROM localidades WHERE id = :localidad_id";
                        $consulta = $c->prepare($src);
                        $consulta->bindParam(':localidad_id', $data['localidad_id']);
                        $consulta->execute();
                        if ($consulta->rowCount() == 0){
                            $response->getBody()->write(json_encode(['Not Found'=>'No se encuentra una localidad con ese id']));
                            return $response->withStatus(404);
                        }
                    }

                    $arregloNombresDatos = array('domicilio', 'localidad_id', 'cantidad_habitaciones', 'cantidad_banios', 'cochera', 'cantidad_huespedes', 'fecha_inicio_disponibilidad', 'cantidad_dias', 'disponible', 'valor_noche', 'tipo_propiedad_id', 'imagen, tipo_imagen');
                    
                    $src = 'UPDATE propiedades SET';
                    $primero = true;
                    foreach ($arregloNombresDatos as $valor){
                        if (isset($data[$valor])){
                            if ($primero){
                                $src = $src . " " . $valor . " = :" . $valor;
                                $primero = false;
                            }
                            else{
                                $src = $src . ", " . $valor . " = :" . $valor;
                            }
                        }
                    }
                    $src = $src . ' ' . 'WHERE id = ' . $args['id'];

                    $consulta = $c->prepare($src);
                    foreach ($arregloNombresDatos as $valor){
                        if (isset($data[$valor])) $consulta->bindValue(":" . $valor, $data[$valor]);
                    }
                    $consulta->execute();
                    $response->getBody()->write(json_encode(['OK' => 'Propiedad editada correctamente']));
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

                $src = "SELECT * FROM propiedades WHERE id = " . $args['id'] . "";
                $consulta = $c->prepare($src);
                $consulta->execute();
                if ($consulta->rowCount() == 0){
                    $response->getBody()->write(json_encode(['Not Found'=>'No se encuentra una propiedad con ese id']));
                    return $response->withStatus(404);
                }

                $src = "SELECT * FROM reservas WHERE propiedad_id = " . $args['id'] . "";
                $consulta = $c->prepare($src);
                $consulta->execute();
                if ($consulta->rowCount() > 0){
                    $response->getBody()->write(json_encode(['Bad Request'=>'Existen reservas asociadas esta propiedad']));
                    return $response->withStatus(400);
                }

                $src = "DELETE FROM propiedades WHERE id = " . $args['id'] . "";
                $consulta = $c->prepare($src);
                $consulta->execute();
                $response->getBody()->write(json_encode(['OK' => 'Propiedad eliminada correctamente']));
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
                $data = $request->getParsedBody();
                $src = "SELECT * FROM propiedades";
                if (isset($data['disponible']) || isset($data['localidad_id'])
                 || isset($data['fecha_inicio_disponibilidad']) || isset($data['cantidad_huespedes']))
                {
                    $arreglo = array('disponible', 'localidad_id', 'fecha_inicio_disponibilidad', 'cantidad_huespedes');
                    $src = $src . " WHERE ";
                    $primero = true;
                    foreach ($arreglo as $valor){
                        if (isset($data[$valor])){
                            if ($primero){
                                $src = $src . "" . $valor . " = " . "'$data[$valor]'";
                                $primero = false;
                            }
                            else $src = $src . " AND " . $valor . " = " . "'$data[$valor]'";
                        }
                    }
                }
                echo($src);
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

        public static function VerPropiedad(Request $request, Response $response, $args){
            try {
                $con = new Conexion();
                $c = $con->establecerConexion();

                $src = "SELECT * FROM propiedades WHERE id = " . $args['id'] . "";
                $consulta = $c->query($src);
                $response->getBody()->write(json_encode(['OK' => $consulta->fetch(PDO::FETCH_ASSOC)]));
                return $response->withStatus(200);
            }
            catch (Exeption $e){
                $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
                return $response->withStatus(500);
            }
        }

    }
?>