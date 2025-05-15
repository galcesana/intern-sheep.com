intern-sheep.com 

A smart resume tailoring application that helps job seekers customize their resumes to match specific job descriptions using AI technology.

## Features

- Upload your resume in various formats
- Input job descriptions
- AI-powered resume customization
- Generate tailored resumes in PDF format
- Web-based interface for easy access

## Prerequisites

- Python 3.8 or higher
- Docker (optional, for containerized deployment)
- Google Cloud credentials (for AI features)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sheep-tailor.git
cd sheep-tailor
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
Create a `.env` file in the root directory and add your Google Cloud credentials:
```
GOOGLE_CLOUD_PROJECT=your-project-id
```

## Usage

1. Start the application:
```bash
python main.py
```

2. Open your web browser and navigate to `http://localhost:8080`

3. Upload your resume and paste the job description

4. Click "Process" to generate your tailored resume

## Docker Deployment

Build and run using Docker:
```bash
docker build -t sheep-tailor .
docker run -p 8080:8080 sheep-tailor
```

## Project Structure

- `main.py` - Main application entry point
- `cv_tailor.py` - Core resume tailoring logic
- `latex.py` - LaTeX template processing
- `html_utils.py` - HTML utilities
- `utils.py` - General utility functions
- `templates/` - Web application templates
- `static/` - Static assets
- `resume templates/` - Resume templates

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Cloud AI for providing the AI capabilities
- Flask framework for the web application
- All contributors and users of the project
 
