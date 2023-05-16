<h2>Clean Achitecture Structure Description</h2>

<h3>src</h3>
pasta raiz do código-fonte.

<h5>**app/**</h5>: amazena lógica específica da aplicação.

<h5>**controllers/**</h5>: controladores responsáveis por lidar com as requisições HTTP e interagir com os serviços.

<h5>**models/**</h5>: definições de modelos ou entidades que representam os objetos de negócio da aplicação.

<h5>**repositories/**</h5>: implementações dos repositórios, que são responsáveis por interagir com a camada de persistência de dados.

<h5>**services/**</h5>: lógica de negócio da aplicação, que não se encaixa perfeitamente em um modelo ou repositório específico.

<h5>**useCases/**</h5>: casos de uso da aplicação, que encapsulam a lógica de negócio e orquestram a interação entre os controladores, serviços e repositórios.

<h5>**config/**</h5>: armazena arquivos de configuração, como configurações de banco de dados, autenticação, etc.

<h5>**database/**</h5>: scripts de migração do banco de dados, seeds e outras configurações relacionadas ao banco de dados.

<h5>**interfaces/**</h5>: Ninterfaces que representam contratos para as dependências externas utilizadas pela aplicação. Separação clara entre a implementação concreta e a abstração.

<h5>**utils/**</h5>: Contém funções utilitárias que podem ser usadas em várias partes da aplicação.

________________________________________
