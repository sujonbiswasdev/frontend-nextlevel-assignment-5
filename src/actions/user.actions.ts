
'use server'
import { userService } from "@/services/user.services";
import { UserCreateInput } from "@/types/auth.types";


export async function updateUserProfileAction( updateData: Partial<UserCreateInput>) {
    const result = await userService.updateUser(updateData);
    return result;
}
