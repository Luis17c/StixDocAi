module.exports = () => `
    Crie uma documentação detalhada contendo Descrição geral e Etapas de Execução passo a passo para o projeto baseado em diretrizes específicas.
    Fale os parametros que a automação espera no contexto, pela variável ctx
    
    Na descrição geral, pesquise sobre os envolvidos e de uma descrição breve sobre eles que contribua para descrição da automação, os envolvidos
    estão descritos na pasta da serviço, por exemplo: services/controlId/CompanyService.svc.js, o envolvido é a ControlID

    Aqui estão algumas informações necessárias para entender o projeto:
    ** Casos para consideração: **

    - **Requisição HTTP**: Documente no formato abaixo para cada requisição.
    - EXEMPLO: 
        - Método: 'GET'
        - URL: 'https://rhid.com.br/v2/api.svc/report/afd/download'
        - Parâmetros necessários: 
        - 'idEquipamento'
        - 'dataIni'
        - 'dataFinal'

    - **Estrutura de Decisão (IF)**: Explique o que a automação faz se a condição for atendida. 

    - **Transformação de Dados**: Detalhe a tabela de mapeamento de dados de/para.
        - EXEMPLO:
            CONTROL / TOTVS
            cpf / CPF
            pis / PISPASEP
            name / NOME

    - **Ferramentas de Desenvolvimento**:
    - **Componentes**: Devem ser configurados de maneira genérica sem incluir regras de negócio ou parâmetros fixos para garantir reuso.
    - **Estrutura do Projeto**: 
        - **Automations**: Responsável por orquestrar as chamadas no fluxo, toda automation tem o método principal run.
        - **Data Transformations**: Executa conversões de dados de baixa complexidade. Não deve fazer chamadas externas.
        - **Services**: Executa chamadas para componentes. Trate chamadas relacionadas a uma entidade sem regras de negócio.
        - **Helpers**: Funções auxiliares para reutilização geral.
        - **Functions**: Executa processos e chamadas complexas.
        
    - **Utils**: Inclui funções reutilizáveis como LoggerUtil, SleepUtil, DictionaryUtil, TreatErrorMessageUtil, CustomExceptionUtil.

    - **Dictionary
    O dicionário é uma ferramenta da plataforma para guardar dados que serão usados em De/Para's, registrar dados que precisam ser buscados durante a automação
    e verificar duplicidades, qualquer GET, INSERT ou UPSERT deve ser especificada na documentação.

    # Exemplos de Fluxo de execução:

    1. **Fluxo Inicia:**
    - Baixar relatório usando endpoint 'GET' 'http://exemplo/listDevices' com parâmetros 'idEquipamento', 'dataIni', 'dataFinal'.
    - Realizar transformação dos dados:
        DE / PARA
        name / nome
        idEquipamento / id
        totalPersons / pessoas
    - Deletar arquivo anterior no SFTP.
    - Criar novo arquivo em formato 'TXT' com nomenclatura padrão.
    - Enviar para diretório '/import' no FTP.
    - **Fluxo Finaliza.**

    # Output Format

    Crie a documentação em formato de texto contínuo, seguindo a estrutura hierárquica descrita, abordando cada aspecto conforme especificado nos itens acima, não é necessário
    descrever cada service, apenas especifique a url e os parametros na etapa do fluxo em que ela é chamada, não especifique o nome da classe nem o método.
    Não é necessário descrever ferramentos de desenvolvimento nem os Utils
    Especifique cada etapa

    # Notes
    - A documentação só deve ter 2 partes: Descrição geral do fluxo e Fluxo de execução
    - Não divida a documentação em subtópicos
    - Assegure que a documentação cubra todas as situações mencionadas, mesmo em casos complexos.
    - Lembre-se de manter a clareza na explicação dos processos e ferramentas utilizadas.
    - Casos de uso diferentes podem requerer adaptações na estrutura explicativa. Sempre busque por uma comunicação clara e precisa.
`