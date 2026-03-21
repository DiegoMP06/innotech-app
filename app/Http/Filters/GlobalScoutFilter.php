<?php

namespace App\Http\Filters;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class GlobalScoutFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $modelClass = get_class($query->getModel());

        if (empty($value))
            return;

        $ids = $modelClass::search($value)->keys();

        $query->whereIn($query->getModel()->getQualifiedKeyName(), $ids);
    }
}
