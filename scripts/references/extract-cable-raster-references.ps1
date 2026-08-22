$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType = WindowsRuntime]
$null = [Windows.Media.Ocr.OcrEngine, Windows.Media.Ocr, ContentType = WindowsRuntime]

$repositoryRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$archive = Join-Path $repositoryRoot "catalog-source\cable-support\catalog-package\sertifikalar-ve-referanslar-images.zip"
$workingDirectory = Join-Path $env:TEMP "infravolt-cable-reference-ocr"
$output = Join-Path $repositoryRoot "src\data\references\generated\cable-raster-ocr.json"

New-Item -ItemType Directory -Force -Path $workingDirectory | Out-Null
tar -xf $archive -C $workingDirectory

function Wait-WinRtOperation {
  param(
    [object]$Operation,
    [type]$ResultType
  )

  $asTaskMethod = [System.WindowsRuntimeSystemExtensions].GetMethods() |
    Where-Object {
      $_.Name -eq "AsTask" -and
      $_.IsGenericMethod -and
      $_.GetParameters().Count -eq 1
    } |
    Select-Object -First 1
  $task = $asTaskMethod.MakeGenericMethod($ResultType).Invoke($null, @($Operation))
  $task.Wait()
  return $task.Result
}

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
if (-not $engine) { throw "Windows OCR engine is unavailable." }

$pages = @()
$images = Get-ChildItem $workingDirectory -Recurse -File |
  Where-Object { $_.Name -match '^p(16[3-9]|170)-(left|right)-full\.webp$' } |
  Sort-Object Name

foreach ($image in $images) {
  if ($image.Name -notmatch '^p(?<page>\d+)-(?<side>left|right)-full\.webp$') { continue }

  $file = Wait-WinRtOperation -Operation ([Windows.Storage.StorageFile]::GetFileFromPathAsync($image.FullName)) -ResultType ([Windows.Storage.StorageFile])
  $stream = Wait-WinRtOperation -Operation ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) -ResultType ([Windows.Storage.Streams.IRandomAccessStream])
  $decoder = Wait-WinRtOperation -Operation ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) -ResultType ([Windows.Graphics.Imaging.BitmapDecoder])
  $bitmap = Wait-WinRtOperation -Operation ($decoder.GetSoftwareBitmapAsync()) -ResultType ([Windows.Graphics.Imaging.SoftwareBitmap])
  $result = Wait-WinRtOperation -Operation ($engine.RecognizeAsync($bitmap)) -ResultType ([Windows.Media.Ocr.OcrResult])

  $lines = @()
  foreach ($line in $result.Lines) {
    $words = @()
    foreach ($word in $line.Words) {
      $words += [ordered]@{
        text = $word.Text
        x = [math]::Round($word.BoundingRect.X, 2)
        y = [math]::Round($word.BoundingRect.Y, 2)
        width = [math]::Round($word.BoundingRect.Width, 2)
        height = [math]::Round($word.BoundingRect.Height, 2)
      }
    }
    $lines += [ordered]@{ text = $line.Text; words = $words }
  }

  $pages += [ordered]@{
    sourcePdfPage = [int]$Matches.page
    side = $Matches.side
    width = $bitmap.PixelWidth
    height = $bitmap.PixelHeight
    lines = $lines
  }

  $stream.Dispose()
  $bitmap.Dispose()
}

$document = [ordered]@{
  source = "GERSAN Cable Support catalogue raster reference panels"
  pages = $pages
}
$document | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $output -Encoding utf8
Write-Output "Extracted OCR layout for $($pages.Count) raster reference panels to $output"
