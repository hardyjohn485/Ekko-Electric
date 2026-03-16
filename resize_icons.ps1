
Add-Type -AssemblyName System.Drawing
$src = "d:\Ekko\website\assets\favicon-512.png"
$img = [System.Drawing.Image]::FromFile($src)

function Resize-Image($image, $width, $height, $outputPath) {
    $newImg = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($newImg)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($image, 0, 0, $width, $height)
    $newImg.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $newImg.Dispose()
}

Resize-Image $img 48 48 "d:\Ekko\website\assets\favicon-48.png"
Resize-Image $img 96 96 "d:\Ekko\website\assets\favicon-96.png"
Resize-Image $img 192 192 "d:\Ekko\website\assets\favicon-192.png"

$img.Dispose()
