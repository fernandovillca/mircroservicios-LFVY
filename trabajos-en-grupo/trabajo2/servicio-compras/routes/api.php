<?php

use App\Http\Controllers\PurchaseController;
use Illuminate\Support\Facades\Route;



Route::middleware('jwt.verify')->group(function () {
    Route::post('/purchases', [PurchaseController::class, 'store']);
    Route::post('/purchases/{id}/pay', [PurchaseController::class, 'pay']);
    Route::get('/test-jwt', [PurchaseController::class, 'testJWT']);
});
