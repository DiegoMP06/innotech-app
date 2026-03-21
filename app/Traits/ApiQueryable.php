<?php

namespace App\Traits;

use App\Http\Filters\GlobalScoutFilter;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;

trait ApiQueryable
{
    public function buildQuery($subject, array $filters = [], array $defaultIncludes = [], array $includes = [], array $sorts = [])
    {
        return QueryBuilder::for($subject)
            ->allowedFilters([
                AllowedFilter::custom('search', new GlobalScoutFilter()),
                ...$filters
            ])
            ->with($defaultIncludes)
            ->allowedIncludes($includes)
            ->allowedSorts($sorts)
            ->defaultSort('-id');
    }
}
