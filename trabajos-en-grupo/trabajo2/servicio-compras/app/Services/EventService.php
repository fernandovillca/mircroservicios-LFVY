<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class EventService
{
    protected $baseUrl;

    public function __construct()
    {
        $this->baseUrl = env('EVENTS_SERVICE_URL', 'http://localhost:5000');
    }

    /**
     * Buscar evento por ID
     */
    public function findEventById(string $eventId)
    {
        try {
            $response = Http::get("{$this->baseUrl}/api/events/{$eventId}");

            if ($response->successful()) {
                return $response->json();
            }

            return null;
        } catch (\Exception $e) {
            return null;
        }
    }
}
