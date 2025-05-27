FROM python:3.10-slim

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5555

# CMD ["tail", "-f", "/dev/null"]

CMD ["python", "run.py"]