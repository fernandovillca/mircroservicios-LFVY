<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    protected $table = 'purchases';

    protected $fillable = [
        'user_id',
        'event_id',
        'event_title',
        'quantity',
        'price',
        'total',
        'status',
        'meta',
    ];

    protected $casts = [
        'event_date' => 'datetime',
        'meta' => 'array',
        'price' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    public function markAsPaid(): bool
    {
        $this->status = 'pagado';
        return $this->save();
    }
}
