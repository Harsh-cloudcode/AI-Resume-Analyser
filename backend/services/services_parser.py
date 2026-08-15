# from PyPDF2 import PdfReader

# from io import BytesIO

# def extract_text_from_file(file):
#     content = file.file.read()
#     filename = file.filename.lower()

#     # PDF
#     if filename.endswith(".pdf"):
#         reader = PdfReader(BytesIO(content))
#         text = ""
#         for page in reader.pages:
#             text += page.extract_text() or ""
#         return text


from PyPDF2 import PdfReader
from io import BytesIO

def extract_text_from_file(file):
    content = file.file.read()
    filename = file.filename.lower()

    # PDF
    if filename.endswith(".pdf"):
        reader = PdfReader(BytesIO(content))

        text = ""

        for page in reader.pages:
            text += page.extract_text() or ""

        return text

    return ""
   