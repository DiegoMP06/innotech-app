<?php

namespace App\Enums\Projects;

enum RolesOfProjectCollaborators: string
{
    case LEADER = 'leader';
    case DEVELOPER = 'developer';
    case DESIGNER = 'designer';
    case ANALYST = 'analyst';
    case COLLABORATOR = 'collaborator';
}
