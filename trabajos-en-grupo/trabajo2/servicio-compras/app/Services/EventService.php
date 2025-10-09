<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class EventService
{
    protected $baseUrl;

    public function __construct()
    {
        $this->baseUrl = env('EVENTS_SERVICE_URL', 'http://localhost:4000');
    }

    public function findEventById(string $eventId, string $userToken)
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$userToken}"
            ])->get("{$this->baseUrl}/events/{$eventId}");

            if ($response->successful()) {
                return $response->json();
            }

            return null;
        } catch (\Exception $e) {
            return null;
        }
    }
}
