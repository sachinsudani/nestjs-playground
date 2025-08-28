import { SetMetadata } from "@nestjs/common";
import e from "express";

export const ROLES_KEY = "roles";

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
