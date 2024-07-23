if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) 
{
    Write-Host "Ruleaza acest script ca Administrator." -ForegroundColor Red
    exit
}

$userPath = $env:USERPROFILE
$appdataLocal = "$userPath\AppData\Local"
$appdataRoaming = "$userPath\AppData\Roaming"
$programData = "C:\ProgramData"
$programFiles = "C:\Program Files"
$programFilesX86 = "$programFiles (x86)"

$pathExclusions = @(
    'C:\Windows\Microsoft.NET',
    'C:\Windows\assembly',
    "$userPath\.dotnet",
    "$userPath\.librarymanager",
    "$appdataLocal\Microsoft\VisualStudio",
    "$appdataLocal\Microsoft\VisualStudio Services",
    "$appdataLocal\GitCredentialManager",
    "$appdataLocal\GitHubVisualStudio",
    "$appdataLocal\Microsoft\dotnet",
    "$appdataLocal\Microsoft\VSApplicationInsights",
    "$appdataLocal\Microsoft\VSCommon",
    "$appdataLocal\Temp\VSFeedbackIntelliCodeLogs",
    "$appdataRoaming\Microsoft\VisualStudio",
    "$appdataRoaming\NuGet",
    "$appdataRoaming\Visual Studio Setup",
    "$appdataRoaming\vstelemetry",
    "$programData\Microsoft\VisualStudio",
    "$programData\Microsoft\NetFramework",
    "$programData\Microsoft Visual Studio",
    "$programFiles\Microsoft Visual Studio",
    "$programFiles\dotnet",
    "$programFiles\Microsoft SDKs",
    "$programFiles\Microsoft SQL Server",
    "$programFiles\IIS",
    "$programFiles\IIS Express",
    "$programFilesX86\Microsoft Visual Studio",
    "$programFilesX86\dotnet",
    "$programFilesX86\Microsoft SDKs",
    "$programFilesX86\Microsoft SQL Server",
    "$programFilesX86\IIS",
    "$programFilesX86\IIS Express"
)

$processExclusions = @(
    'ServiceHub.SettingsHost.exe',
    'ServiceHub.IdentityHost.exe',
    'ServiceHub.VSDetouredHost.exe',
    'ServiceHub.Host.CLR.x86.exe',
    'Microsoft.ServiceHub.Controller.exe',
    'PerfWatson2.exe',
    'sqlwriter.exe'
)

Write-Host "Acest script va crea excluderi pentru Windows Defender pentru folderele și procesele comune ale Visual Studio 2022."
Write-Host ""
$projectsFolder = Read-Host "Care este calea către folderul proiectelor tale? (exemplu: $userPath\source\repos)"

if (-not (Test-Path $projectsFolder)) 
{
    Write-Host "Calea specificată pentru folderul proiectelor nu există. Ieșire din script." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Adăugare excludere cale: $projectsFolder"
Add-MpPreference -ExclusionPath $projectsFolder

foreach ($exclusion in $pathExclusions) 
{
    Write-Host "Adăugare excludere cale: $exclusion"
    try 
    {
        Add-MpPreference -ExclusionPath $exclusion
    } 
    catch 
    {
        Write-Host "Nu s-a reușit adăugarea excluderii pentru calea: $exclusion - $_" -ForegroundColor Yellow
    }
}

foreach ($exclusion in $processExclusions) 
{
    Write-Host "Adăugare excludere proces: $exclusion"
    try 
    {
        Add-MpPreference -ExclusionProcess $exclusion
    } 
    catch 
    {
        Write-Host "Nu s-a reușit adăugarea excluderii pentru procesul: $exclusion - $_" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Excluderile tale:"
$prefs = Get-MpPreference

Write-Host "Căile excluse:"
$prefs.ExclusionPath
Write-Host ""

Write-Host "Procesele excluse:"
$prefs.ExclusionProcess