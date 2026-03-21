<?php

use App\Models\Blog\Post;
use App\Models\Events\Event;
use App\Models\Projects\Project;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('post.{id}', function ($user, $id) {
    return (int) $user->id === (int) Post::find($id)->user_id;
});

Broadcast::channel('project.{id}', function ($user, $id) {
    return (int) $user->id === (int) Project::find($id)->user_id;
});

Broadcast::channel('event.{id}', function ($user, $id) {
    return (int) $user->id === (int) Event::find($id)->user_id;
});
