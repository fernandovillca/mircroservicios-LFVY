<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyJwtMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $authHeader = $request->header('Authorization');

            if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
                return response()->json(['message' => 'Token no proporcionado'], 401);
            }

            $token = substr($authHeader, 7); // quitar 'Bearer '

            // Decodificar token con la misma clave secreta usada en el servicio de usuarios
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

            // Guardar información del usuario decodificada en la request
            $request->merge(['userData' => [
                'id' => $decoded->id ?? null,
                'exp' => $decoded->exp ?? null,
            ]]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Token inválido o expirado',
                'error' => $e->getMessage(),
            ], 401);
        }

        return $next($request);
    }
}
