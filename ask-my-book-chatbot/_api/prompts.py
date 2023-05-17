from langchain import PromptTemplate
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.chains.prompt_selector import (
    ConditionalPromptSelector,
    is_chat_model,
)

CONDENSE_QUESTION_PROMPT_TEMPLATE = """Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

        Chat History:
        {chat_history}
        Follow Up Input: {question}
        Standalone question:"""
CONDENSE_QUESTION_PROMPT = PromptTemplate.from_template(
    CONDENSE_QUESTION_PROMPT_TEMPLATE
)


prompt_template = """Utiliza los siguientes elementos de contexto para responder la pregunta al final. Si no puedes responder la pregunta con el CONTEXTO proporcionado, simplemente di que no sabes, no intentes inventar una respuesta.

context: {context}

question: {question}

answer:"""
PROMPT = PromptTemplate(
    template=prompt_template, input_variables=["context", "question"]
)

system_template = """Utiliza los siguientes elementos de contexto para responder la pregunta del usuario. Si no puedes responder la pregunta con el contexto proporcionado, simplemente di que no sabes, no intentes inventar una respuesta.
----------------
{context}"""
messages = [
    SystemMessagePromptTemplate.from_template(system_template),
    HumanMessagePromptTemplate.from_template("{question}"),
]
CHAT_PROMPT = ChatPromptTemplate.from_messages(messages)

ANSWER_QUESTION_PROMPT_SELECTOR = ConditionalPromptSelector(
    default_prompt=PROMPT, conditionals=[(is_chat_model, CHAT_PROMPT)]
)
