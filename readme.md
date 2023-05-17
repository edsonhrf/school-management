<h2>API REST with Node.js and MongoDB</h2>

<h3>• Express Framework</h3>
<h3>• MongoDB with ODM Mongoose</h3>
<h3>• MongoDB Atlas</h3>
<h3>• Nodemon Package</h3>
<h3>• Yarn</h3>

________________________________________

<h2>Clean Achitecture Structure Description</h2>

<h3>src/</h3>
pasta raiz do código-fonte.

<h3>app/</h3>
amazena lógica específica da aplicação.

<h3>controllers/</h3>
controladores responsáveis por lidar com as requisições HTTP e interagir com os serviços.

<h3>models/</h3>
definições de modelos ou entidades que representam os objetos de negócio da aplicação.

<h3>repositories/</h3>
implementações dos repositórios, que são responsáveis por interagir com a camada de persistência de dados.

<h3>services/</h3>
lógica de negócio da aplicação, que não se encaixa perfeitamente em um modelo ou repositório específico.

<h3>useCases/</h3>
casos de uso da aplicação, que encapsulam a lógica de negócio e orquestram a interação entre os controladores, serviços e repositórios.

<h3>config/</h3>
armazena arquivos de configuração, como configurações de banco de dados, autenticação, etc.

<h3>database/</h3>
scripts de migração do banco de dados, seeds e outras configurações relacionadas ao banco de dados.

<h3>interfaces/</h3>
interfaces que representam contratos para as dependências externas utilizadas pela aplicação. Separação clara entre a implementação concreta e a abstração.

<h3>utils/</h3>
contém funções utilitárias que podem ser usadas em várias partes da aplicação.

________________________________________
