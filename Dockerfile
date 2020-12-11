FROM python:3
COPY . /server
WORKDIR /server
RUN pip install -r requirements.txt
EXPOSE 8080
CMD [ "python", "server.py" ]