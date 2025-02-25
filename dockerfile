# Usando Windows Server Core com Node.js
FROM mcr.microsoft.com/windows/servercore:ltsc2022

# Instalar Node.js
SHELL ["powershell", "-Command"]
RUN Invoke-WebRequest -Uri "https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi" -OutFile "node.msi"; \
    Start-Process -Wait -FilePath "msiexec.exe" -ArgumentList "/i node.msi /quiet /norestart"; \
    Remove-Item -Force node.msi

# Definir diretório de trabalho
WORKDIR C:/app

# Copiar arquivos do projeto
COPY . .

ENV PORT=3000
ENV ENVIROMENT="prod"

# Instalar dependências
RUN npm install

# Expor porta
EXPOSE 3000

# Comando de início
CMD ["npm", "start"]