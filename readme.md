Clean Achitecture Structure

src/
├── app/
│   ├── controllers/
│   ├── models/
│   ├── repositories/
│   ├── services/
│   └── useCases/
├── config/
├── database/
├── interfaces/
└── utils/

________________________________________

Clean Achitecture Structure Description

src/: pasta raiz do código-fonte.

app/: amazena lógica específica da aplicação.

controllers/: controladores responsáveis por lidar com as requisições HTTP e interagir com os serviços.

models/: definições de modelos ou entidades que representam os objetos de negócio da aplicação.

repositories/: implementações dos repositórios, que são responsáveis por interagir com a camada de persistência de dados.

services/: lógica de negócio da aplicação, que não se encaixa perfeitamente em um modelo ou repositório específico.

useCases/: casos de uso da aplicação, que encapsulam a lógica de negócio e orquestram a interação entre os controladores, serviços e repositórios.

config/: armazena arquivos de configuração, como configurações de banco de dados, autenticação, etc.

database/: scripts de migração do banco de dados, seeds e outras configurações relacionadas ao banco de dados.

interfaces/: Ninterfaces que representam contratos para as dependências externas utilizadas pela aplicação. Separação clara entre a implementação concreta e a abstração.

utils/: Contém funções utilitárias que podem ser usadas em várias partes da aplicação.

________________________________________