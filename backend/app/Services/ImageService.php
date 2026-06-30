<?php
namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Encoders\WebpEncoder;

class ImageService
{
    public function processAndMove(string $path, string $destDir): string
    {
        $disk = Storage::disk('public');
        $filename = basename($path);
        $finalPath = $destDir . '/' . pathinfo($filename, PATHINFO_FILENAME) . '.webp';

        if ($disk->exists($finalPath)) {
            return basename($finalPath);
        }

        try {
            $manager = ImageManager::usingDriver(Driver::class);
            $absolutePath = storage_path('app/public/' . $path);

            $image = $manager->decodePath($absolutePath);
            $encoded = $image->encode(new WebpEncoder(quality: 65));

            $disk->put($finalPath, (string) $encoded);
            $finalFilename = basename($finalPath);

        } catch (\Throwable $e) {
            $finalPath = $destDir . '/' . $filename;
            $disk->copy($path, $finalPath);
            $finalFilename = $filename;
        }

        if (str_contains($path, 'livewire-tmp')) {
            $disk->delete($path);
        }

        return $finalFilename;
    }
}
