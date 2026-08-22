$ErrorActionPreference = "Stop"

$repositoryRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$workingDirectory = Join-Path $env:TEMP "infravolt-reference-preparation"
$ledSourceDirectory = Join-Path $workingDirectory "led"
$ledTargetDirectory = Join-Path $repositoryRoot "public\assets\references\led-systems"
$gBusTargetDirectory = Join-Path $repositoryRoot "public\assets\references\g-bus"

New-Item -ItemType Directory -Force -Path $ledSourceDirectory, $ledTargetDirectory, $gBusTargetDirectory | Out-Null

$ledArchive = Join-Path $repositoryRoot "catalog-source\led-lighting\LEDBUS-complete-catalog-all-files.zip"
$leftEntry = "ledbus-catalog-final-74-133/technical-only/systems/p127-left-reference.webp"
$rightEntry = "ledbus-catalog-final-74-133/technical-only/systems/p127-right-reference.webp"
tar -xf $ledArchive -C $ledSourceDirectory $leftEntry $rightEntry

$leftSource = Join-Path $ledSourceDirectory $leftEntry
$rightSource = Join-Path $ledSourceDirectory $rightEntry
$script:assetNumber = 1

function Export-LedColumn {
  param(
    [string]$Source,
    [int]$X,
    [int]$Width,
    [int[]]$Bounds
  )

  for ($index = 0; $index -lt ($Bounds.Count - 1); $index += 1) {
    $y = $Bounds[$index]
    $height = $Bounds[$index + 1] - $y
    $targetName = "{0:d2}.webp" -f $script:assetNumber
    $target = Join-Path $ledTargetDirectory $targetName
    $crop = "crop=$Width`:$height`:$X`:$y"
    & ffmpeg -y -v error -i $Source -vf $crop -frames:v 1 $target
    if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed while creating $targetName" }
    $script:assetNumber += 1
  }
}

function Export-LedCrop {
  param(
    [string]$Source,
    [int]$X,
    [int]$Y,
    [int]$Width,
    [int]$Height
  )

  $targetName = "{0:d2}.webp" -f $script:assetNumber
  $target = Join-Path $ledTargetDirectory $targetName
  $crop = "crop=$Width`:$Height`:$X`:$Y"
  & ffmpeg -y -v error -i $Source -vf $crop -frames:v 1 $target
  if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed while creating $targetName" }
  $script:assetNumber += 1
}

# Printed page 238: three catalogue columns containing 12, 12 and 8 reference marks.
Export-LedColumn -Source $leftSource -X 100 -Width 370 -Bounds @(90, 290, 440, 590, 800, 950, 1080, 1210, 1350, 1495, 1660, 1785, 1930)
Export-LedColumn -Source $leftSource -X 500 -Width 410 -Bounds @(90, 315, 450, 600, 760, 880, 1015, 1160, 1310, 1455, 1640, 1795, 1930)
Export-LedColumn -Source $leftSource -X 920 -Width 400 -Bounds @(90, 360, 570, 790, 1000, 1280, 1540, 1740, 1930)

# Printed page 239: three catalogue columns containing 12, 13 and 12 reference marks.
$rightLeftCrops = @(
  @(65, 90, 350, 190),
  @(65, 270, 350, 240),
  @(95, 520, 150, 150),
  @(225, 520, 155, 150),
  @(70, 675, 340, 185),
  @(65, 835, 350, 170),
  @(65, 980, 350, 150),
  @(65, 1120, 350, 170),
  @(25, 1260, 390, 180),
  @(65, 1420, 350, 180),
  @(65, 1580, 350, 170),
  @(65, 1730, 350, 200)
)
foreach ($cropData in $rightLeftCrops) {
  Export-LedCrop -Source $rightSource -X $cropData[0] -Y $cropData[1] -Width $cropData[2] -Height $cropData[3]
}
Export-LedColumn -Source $rightSource -X 420 -Width 380 -Bounds @(90, 290, 405, 575, 690, 850, 950, 1080, 1200, 1350, 1490, 1620, 1810, 1940)
Export-LedColumn -Source $rightSource -X 790 -Width 410 -Bounds @(90, 285, 440, 600, 720, 830, 940, 1070, 1350, 1500, 1620, 1780, 1940)

$gBusSource = Join-Path $repositoryRoot "catalog-source\g-bus\gbus_catalog_complete\series\g-bus-automation-system\assets\technical-only\tables\g-bus-reference-projects.png"
$gBusCrops = @(
  @(420, 420, 520, 440),
  @(1190, 420, 820, 440),
  @(290, 1040, 830, 530),
  @(1190, 1110, 830, 450),
  @(290, 1800, 860, 330),
  @(1190, 1800, 880, 330)
)

for ($index = 0; $index -lt $gBusCrops.Count; $index += 1) {
  $cropData = $gBusCrops[$index]
  $target = Join-Path $gBusTargetDirectory ("{0:d2}.png" -f ($index + 1))
  $crop = "crop=$($cropData[2])`:$($cropData[3])`:$($cropData[0])`:$($cropData[1])"
  & ffmpeg -y -v error -i $gBusSource -vf $crop -frames:v 1 $target
  if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed while creating G-BUS asset $($index + 1)" }
}

Write-Output "Prepared $($script:assetNumber - 1) LED reference marks and $($gBusCrops.Count) G-BUS reference marks."
