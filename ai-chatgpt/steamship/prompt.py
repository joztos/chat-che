"""Based on the example ChatBot in the LangChain docs:
https://langchain.readthedocs.io/en/latest/modules/memory/examples/chatgpt_clone.html
"""

from langchain.prompts import PromptTemplate

_TEMPLATE = """La planificación de clase es esencial para garantizar que los estudiantes reciban una educación de calidad. Una planificación efectiva asegura que se cubran todos los puntos importantes, se siga una estructura lógica y se alcancen los objetivos de aprendizaje. 

Título de la Clase: {class_title}
Objetivos de Aprendizaje:
{learning_objectives}

Temario:
{agenda}

Actividades Propuestas:
{proposed_activities}

Evaluación:
{assessment_method}

Recursos y Materiales:
{resources}

Notas adicionales:
{additional_notes}

{history}
Human: {human_input}
Assistant:"""

CHATBOT_PROMPT = PromptTemplate(input_variables=["history", "human_input"], template=_TEMPLATE)