# Copara-Website auf copara.co deployen (Hetzner, nginx).
# Aufruf:  powershell -ExecutionPolicy Bypass -File deploy.ps1
# Voraussetzung: SSH-Key unter ~\.ssh\copara_deploy (liegt auf dem Server).

$ErrorActionPreference = 'Stop'
$server = 'root@178.104.207.31'
$key = "$HOME\.ssh\copara_deploy"
$webroot = '/var/www/copara.co'

Set-Location $PSScriptRoot

Write-Host '1/3  Build ...'
npm run build
if ($LASTEXITCODE -ne 0) { throw 'Build fehlgeschlagen - Deploy abgebrochen.' }

Write-Host '2/3  Hochladen ...'
ssh -i $key -o BatchMode=yes $server "rm -rf $webroot.new && mkdir -p $webroot.new"
scp -i $key -q -r dist/* "${server}:$webroot.new/"

Write-Host '3/3  Umschalten ...'
# scp von Windows legt Verzeichnisse mit 700 an - nginx braucht 755/644.
ssh -i $key -o BatchMode=yes $server "find $webroot.new -type d -exec chmod 755 {} + && find $webroot.new -type f -exec chmod 644 {} + && rm -rf $webroot.old && mv $webroot $webroot.old && mv $webroot.new $webroot && rm -rf $webroot.old"

$status = curl.exe -s -o NUL -w '%{http_code}' https://copara.co/
Write-Host "Fertig - https://copara.co antwortet mit HTTP $status"
