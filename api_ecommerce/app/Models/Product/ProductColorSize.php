<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class ProductColorSize extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        "product_color_id",
        "product_size_id",
        "stock",
    ];

    public function setCreatedAtAttribute($value) 
    {
        date_default_timezone_set("America/Mexico_City");
        $this->attributes["created_at"] = Carbon::now();
    }

    public function setUpdatedAtAttribute($value) 
    {
        date_default_timezone_set("America/Mexico_City");
        $this->attributes["updated_at"] = Carbon::now();
    }

    public function product_color()
    {
        return $this->belongsTo(ProductColor::class);
    }

    public function product_size()
    {
        return $this->belongsTo(ProductSize::class);
    }
}
