<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Services\EventService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PurchaseController extends Controller
{
    protected $eventService;

    public function __construct(EventService $eventService)
    {
        $this->eventService = $eventService;
    }

    public function testJWT(Request $request)
    {
        $userData = $request->userData; // Datos del usuario extraídos del token JWT
        return response()->json([
            'message' => 'Token válido',
            'user' => $userData
        ]);
    }

    /**
     * Crear una compra pendiente
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'event_id' => 'required|string',
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Datos inválidos',
                'errors' => $validator->errors()
            ], 422);
        }

        // Verificar token middleware
        $userData = $request->userData;

        // Consultar evento
        $event = $this->eventService->findEventById($request->event_id);
        if (!$event) {
            return response()->json(['message' => 'Evento no encontrado'], 404);
        }

        $quantity = $request->quantity;
        $price = $event['price'] ?? 0;
        $total = $quantity * $price;

        $purchase = Purchase::create([
            'user_id' => $userData['id'],
            'event_id' => $request->event_id,
            'event_title' => $event['name'] ?? null,
            'quantity' => $quantity,
            'price' => $price,
            'total' => $total,
            'status' => 'pendiente',
        ]);

        return response()->json([
            'message' => 'Compra creada correctamente',
            'purchase' => $purchase
        ], 201);
    }

    /**
     * Marcar una compra como pagada
     */
    public function pay(Request $request, $id)
    {
        $userData = $request->userData;

        $purchase = Purchase::find($id);

        if (!$purchase) {
            return response()->json(['message' => 'Compra no encontrada'], 404);
        }

        if ($purchase->user_id !== $userData['id']) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        if ($purchase->status === 'pagado') {
            return response()->json(['message' => 'Compra ya pagada'], 400);
        }

        $purchase->status = 'pagado';
        $purchase->save();

        // Aquí luego puedes enviar mensaje a RabbitMQ para notificación
        // RabbitMQPublisher::publish('notificaciones', [...]);

        return response()->json([
            'message' => 'Compra pagada exitosamente',
            'purchase' => $purchase
        ]);
    }
}
