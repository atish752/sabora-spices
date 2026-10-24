Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "..\Resources\png logo.png"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)

# Find bounding box of non-transparent pixels (Alpha > 15)
$minX = $src.Width
$maxX = 0
$minY = $src.Height
$maxY = 0

for ($y = 0; $y -lt $src.Height; $y++) {
    for ($x = 0; $x -lt $src.Width; $x++) {
        $pixel = $src.GetPixel($x, $y)
        if ($pixel.A -gt 15) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Output "Artwork bounds: X=[$minX, $maxX], Y=[$minY, $maxY], Width=$($maxX - $minX + 1), Height=$($maxY - $minY + 1)"

$artWidth = $maxX - $minX + 1
$artHeight = $maxY - $minY + 1

# Crop the raw artwork
$cropRect = [System.Drawing.Rectangle]::new($minX, $minY, $artWidth, $artHeight)
$cropped = $src.Clone($cropRect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Function to render into a centered square canvas with HighQualityBicubic
function CreateSquareImage($source, [int]$size, [float]$paddingRatio) {
    $bmp = [System.Drawing.Bitmap]::new($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    $targetMaxDim = [int]($size * (1.0 - $paddingRatio * 2))
    $scale = [Math]::Min($targetMaxDim / $source.Width, $targetMaxDim / $source.Height)
    $drawW = [int]($source.Width * $scale)
    $drawH = [int]($source.Height * $scale)
    $drawX = [int](($size - $drawW) / 2)
    $drawY = [int](($size - $drawH) / 2)

    $destRect = [System.Drawing.Rectangle]::new($drawX, $drawY, $drawW, $drawH)
    $g.DrawImage($source, $destRect, 0, 0, $source.Width, $source.Height, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    return $bmp
}

# 1. High-res logo: 512x512 with 4% padding
$logoBmp = CreateSquareImage $cropped 512 0.04
$logoPath = Join-Path $PSScriptRoot "..\public\images\logo.png"
$logoBmp.Save($logoPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Output "Saved high-res centered logo: $logoPath (512x512)"
$logoBmp.Dispose()

# 2. Crisp favicon.png: 64x64 with 2% padding
$favBmp64 = CreateSquareImage $cropped 64 0.02
$favPngPath = Join-Path $PSScriptRoot "..\public\favicon.png"
$favBmp64.Save($favPngPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Output "Saved crisp favicon.png: $favPngPath (64x64)"

# 3. Create real valid multi-resolution ICO file containing 16x16, 32x32, 48x48 PNG frames
$sizes = @(16, 32, 48)
$pngByteArrays = @()

foreach ($s in $sizes) {
    $frameBmp = CreateSquareImage $cropped $s 0.02
    $ms = [System.IO.MemoryStream]::new()
    $frameBmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    $pngByteArrays += ,$ms.ToArray()
    $ms.Dispose()
    $frameBmp.Dispose()
}

$icoPath = Join-Path $PSScriptRoot "..\public\favicon.ico"
$fs = [System.IO.File]::Create($icoPath)
$bw = [System.IO.BinaryWriter]::new($fs)

# ICONDIR header: 6 bytes
$bw.Write([uint16]0) # Reserved
$bw.Write([uint16]1) # Type: 1 = Icon
$bw.Write([uint16]$sizes.Length) # Count: 3 frames

$offset = 6 + (16 * $sizes.Length)

for ($i = 0; $i -lt $sizes.Length; $i++) {
    $s = $sizes[$i]
    $data = $pngByteArrays[$i]
    $bWidth = if ($s -ge 256) { 0 } else { [byte]$s }
    $bHeight = if ($s -ge 256) { 0 } else { [byte]$s }

    $bw.Write([byte]$bWidth)
    $bw.Write([byte]$bHeight)
    $bw.Write([byte]0) # Colors: 0 for 32bpp
    $bw.Write([byte]0) # Reserved
    $bw.Write([uint16]1) # Planes
    $bw.Write([uint16]32) # BitCount
    $bw.Write([uint32]$data.Length) # Bytes in resource
    $bw.Write([uint32]$offset) # Offset
    $offset += $data.Length
}

for ($i = 0; $i -lt $sizes.Length; $i++) {
    $bw.Write($pngByteArrays[$i])
}

$bw.Flush()
$bw.Dispose()
$fs.Dispose()
Write-Output "Saved valid multi-resolution favicon.ico with 16x16, 32x32, 48x48 PNG frames: $icoPath"

$favBmp64.Dispose()
$cropped.Dispose()
$src.Dispose()
