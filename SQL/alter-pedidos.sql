use yummies;
ALTER TABLE pedidos 
DROP COLUMN ubicacion;

use yummies;
ALTER TABLE pedidos 
DROP COLUMN latitud DECIMAL(10,7),
ADD COLUMN longitud DECIMAL(10,7);