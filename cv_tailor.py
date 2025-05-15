# imports
import google.generativeai as genai  # used for generating tailored resume content with Google's Gemini model
from dotenv import load_dotenv  # library to load environment variables from a .env file
# from config import API_KEY
import os  # used to access file extensions and environment variables

from html_utils import tailor_resume_html
from latex import tailor_resume_latex

# from html_utils import *

from google.cloud import secretmanager

def get_secret(secret_name: str, project_id: str = "civic-replica-441419-e5") -> str:
    """
    Fetch a secret's value from Google Secret Manager.s

    Args:
        secret_name (str): The name of the secret in Secret Manager.
        project_id (str): The GCP project ID.

    Returns:
        str: The secret value.
    """
    client = secretmanager.SecretManagerServiceClient()
    secret_path = f"projects/{project_id}/secrets/{secret_name}/versions/latest"
    response = client.access_secret_version(request={"name": secret_path})
    return response.payload.data.decode("UTF-8")

API_KEY = get_secret("API_KEY")



# # Load API key from the environment
# load_dotenv()
# api_key = os.getenv('API_KEY')

# Configure the Google Generative AI library
genai.configure(api_key=API_KEY)


def tailor_resume(file_path:str, job_description:str, type='html')->None:
    """
    Main function to tailor a resume based on a job description.

    Parameters:
    file_path (str): Path to the original resume file (.docx or .pdf).
    job_description (str): Job description to tailor the resume for.
    output_path (str): Path to save the tailored resume LaTeX file.

    Raises:
    RuntimeError: If no job description is provided or if the file type is unsupported.
    """
    # tailored_resume_html(job_description,output_path)
    if type == 'html':
        output_path = "tailored_resume/tailored_resume.html"
        tailor_resume_html(file_path,job_description,output_path)
    else:
        output_path = "tailored_resume/tailored_resume.tex"
        tailor_resume_latex(file_path,job_description,output_path)
